export async function POST(req) {
  try {
    const { text, apiKey, phase } = await req.json();

    if (!apiKey) {
      return Response.json({ error: "Missing API Key" }, { status: 400 });
    }

    if (!text) {
      return Response.json(
        { error: "No text provided for MCQ generation" },
        { status: 400 }
      );
    }

    console.log("📝 Request Payload:", { text, phase });

    const prompt = buildPrompt(text, phase);

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            topK: 40,
            topP: 0.95,
          },
        }),
      }
    );

    console.log("Google API Response Status:", geminiRes.status);

    if (!geminiRes.ok) {
      const errData = await safeJson(geminiRes);
      console.error("Gemini API Error:", errData);
      return Response.json(
        { error: errData.message || "Unknown API Error" },
        { status: geminiRes.status }
      );
    }

    const data = await geminiRes.json();
    console.log("Gemini API Response Data:", data);

    const rawOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const mcqs = parseFormattedMcqs(rawOutput);

    return Response.json({ mcqs, nextPhase: phase + 1 });
  } catch (error) {
    console.error("Server Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Build the prompt string
function buildPrompt(text, phase) {
  return `
Generate ${
    phase === 0 ? 5 : 3
  } high-quality multiple-choice questions based on the following text:

Text: ${text}

Follow these requirements exactly:
1. Each question should test understanding, not just recall
2. Provide 4 options for each question
3. Format each question as follows:
   - Question: [The question text]
   - Options:
     - [Option text 1]
     - [Option text 2]
     - [Option text 3]
     - [Option text 4]
   - Correct: [The number of the correct option, e.g., 1, 2, 3, or 4]
4. Separate each complete question with three hyphens: ---

DO NOT use any labels like "A)", "B)", etc.
DO NOT use asterisks or special marking for correct answers.
Just indicate the correct answer number in the "Correct:" field.
`;
}

// Safer JSON parsing in case of non-JSON error
async function safeJson(response) {
  try {
    return await response.json();
  } catch {
    return { message: "Non-JSON API Error" };
  }
}

// MCQ parser from formatted Gemini output
function parseFormattedMcqs(text) {
  const questionBlocks = text.split("---").filter((block) => block.trim());

  return questionBlocks
    .map((block) => {
      const questionMatch = block.match(/Question:\s*(.*?)(?=Options:|$)/s);
      const question = questionMatch ? questionMatch[1].trim() : "";

      const optionsSection = block.match(/Options:([\s\S]*?)(?=Correct:|$)/);
      let options = [];

      if (optionsSection) {
        options = optionsSection[1]
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.startsWith("-"))
          .map((line) => ({
            text: line.replace(/^-\s*/, ""),
            isCorrect: false,
          }));
      }

      const correctMatch = block.match(/Correct:\s*(\d+)/);
      const correctIndex = correctMatch ? parseInt(correctMatch[1]) - 1 : -1;

      if (correctIndex >= 0 && correctIndex < options.length) {
        options[correctIndex].isCorrect = true;
      }

      return { question, options };
    })
    .filter((q) => q.question && q.options.length > 0);
}

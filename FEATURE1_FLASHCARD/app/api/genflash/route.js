import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { text, apiKey } = await req.json();

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing API Key" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!text) {
      return new Response(JSON.stringify({ error: "Text input is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Received text input for Flashcards:", text);
    console.log("using apiKey:", apiKey);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    //  Prompt with "cont1" & "cont2" Containers
    const prompt = `Generate structured JSON flashcards from the given text.
    - Output an array of 10 flashcards (no more, no less).
    - Each flashcard should have:
      * "cont1" for the question (side 1).
      * "cont2" for the answer (side 2).
    - Answers should be concise (1-2 sentences max).
    - Avoid extra explanations, markdown, or numbering.


    Text: """ ${text} """


    Example output:
    [
      { "cont1": "What is IoT?", "cont2": "IoT stands for Internet of Things, a network of smart devices." },
      { "cont1": "What are IoT sensors?", "cont2": "Sensors in IoT collect and transmit real-world data." }
    ]`;

    console.log("🔹 Sending request to Gemini API...");
    const result = await model.generateContent(prompt);

    if (!result || !result.response) {
      throw new Error("Invalid response from Gemini API");
    }

    const responseText = await result.response.text();
    console.log("🔹 Raw API Response:", responseText);

    // Extract JSON from the response
    let jsonMatch = responseText.match(/\[.*\]/s);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in API response");
    }

    let flashcards;
    try {
      flashcards = JSON.parse(jsonMatch[0]); // Parse extracted JSON
    } catch (jsonError) {
      console.error(" JSON Parse Error:", jsonError);
      return new Response(
        JSON.stringify({ error: "Invalid JSON response from Gemini API" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ flashcards }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("error generating flashcards:", error);
    return new Response(
      JSON.stringify({
        error: "failed to generate flashcards",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

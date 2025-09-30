import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt, apiKey } = await request.json()

    if (!apiKey) {
      return NextResponse.json({ error: "API key is required" }, { status: 400 })
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are a mind map generator. Generate a hierarchical mind map structure based on the user's prompt. 
            Return ONLY a valid JSON object with this exact structure:
            {
              "nodes": [
                {"id": "1", "label": "Central Topic", "level": 0, "x": 400, "y": 300},
                {"id": "2", "label": "Subtopic 1", "level": 1, "x": 200, "y": 200},
                {"id": "3", "label": "Subtopic 2", "level": 1, "x": 600, "y": 200}
              ],
              "edges": [
                {"source": "1", "target": "2"},
                {"source": "1", "target": "3"}
              ]
            }
            
            Rules:
            - Create 8-15 nodes with meaningful, concise labels
            - Level 0 is the central node at position (400, 300) - only ONE central node
            - Level 1 nodes are main branches (3-5 nodes) positioned around the center
            - Level 2+ nodes are sub-branches
            - Arrange nodes in a radial/circular pattern around the center
            - Space level 1 nodes at least 250px apart horizontally
            - Space level 2+ nodes at least 150px from their parents
            - Each edge connects a parent to a child (source is always parent)
            - Return ONLY the JSON, no markdown, no explanations, no code blocks`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("[v0] Groq API error:", error)
      return NextResponse.json({ error: "Failed to generate mind map" }, { status: response.status })
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content

    if (!content) {
      return NextResponse.json({ error: "No content generated" }, { status: 500 })
    }

    // Parse the JSON response
    let mindMapData
    try {
      // Remove markdown code blocks if present
      const cleanContent = content.replace(/```json\n?|\n?```/g, "").trim()
      mindMapData = JSON.parse(cleanContent)
    } catch (parseError) {
      console.error("[v0] Failed to parse AI response:", content)
      return NextResponse.json({ error: "Invalid response format from AI" }, { status: 500 })
    }

    return NextResponse.json(mindMapData)
  } catch (error) {
    console.error("[v0] Error in generate-mindmap route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

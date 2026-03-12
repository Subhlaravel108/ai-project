import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "messages array required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        reply: "I'm a voice assistant. Add OPENAI_API_KEY in .env.local to enable AI replies.",
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a friendly voice assistant. Keep replies concise and natural for speaking (1-3 sentences). Be helpful and conversational.",
          },
          ...messages.map((m: { role: string; text: string }) => ({
            role: m.role === "ai" ? "assistant" : "user",
            content: m.text,
          })),
        ],
        max_tokens: 150,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.log("OpenAI API error:", data.error);

      const fallbackReply =
        data.error.code === "insufficient_quota"
          ? "My AI replies are paused because the API quota has been used. Please add billing at platform.openai.com or try again later."
          : "I'm having trouble connecting right now. Please check your OpenAI API key and try again.";

      return NextResponse.json({ reply: fallbackReply });
    }

    const reply = data.choices?.[0]?.message?.content?.trim() || "Sorry, I couldn't generate a reply.";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      reply: "Something went wrong on my end. Please try again in a moment.",
    });
  }
}

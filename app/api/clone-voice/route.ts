import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const headerKey = req.headers.get("xi-api-key");
    const apiKey = headerKey?.trim() || process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "ElevenLabs API key not configured. Add ELEVENLABS_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    const res = await fetch("https://api.elevenlabs.io/v1/voices/add", {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      const message = data.detail?.message || data.message || "Voice clone failed";
      console.error("ElevenLabs API error:", message);
      return NextResponse.json({ error: message }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Voice clone failed" },
      { status: 500 }
    );
  }
}
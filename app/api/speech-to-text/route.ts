export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const languageCode = (formData.get("language_code") as string | null)?.trim() || null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const elevenForm = new FormData();
    elevenForm.append("file", file);
    elevenForm.append("model_id", "scribe_v1"); // ElevenLabs STT model
    if (languageCode && languageCode !== "auto") {
      elevenForm.append("language_code", languageCode);
    }

    const response = await fetch(
      "https://api.elevenlabs.io/v1/speech-to-text",
      {
        method: "POST",
        headers: {
          "xi-api-key": req.headers.get("xi-api-key")?.trim() || process.env.ELEVENLABS_API_KEY!,
        },
        body: elevenForm,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log("ElevenLabs Error:", data);
      return NextResponse.json(
        { error: data.detail?.message || data.message || "Transcription failed" },
        { status: response.status || 500 }
      );
    }

    return NextResponse.json({ text: data.text });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
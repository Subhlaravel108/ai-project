import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { text, voiceId, stability, similarity } = await req.json();
    const headerKey = req.headers.get("xi-api-key");
    const apiKey = headerKey?.trim() || process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "ElevenLabs API key not configured" },
        { status: 500 }
      );
    }

    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability,
          similarity_boost: similarity,
        },
      },
      {
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer", // 🔥 VERY IMPORTANT
      }
    );

    return new NextResponse(response.data, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data || "TTS failed" },
      { status: 500 }
    );
  }
}
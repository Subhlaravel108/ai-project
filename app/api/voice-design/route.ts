import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const headerKey = req.headers.get("xi-api-key");
    const apiKey = headerKey?.trim() || process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "ElevenLabs API key not configured" },
        { status: 500 }
      );
    }

    const { voice_description } = await req.json();

    if (!voice_description || typeof voice_description !== "string") {
      return NextResponse.json(
        { error: "voice_description is required (20-1000 characters)" },
        { status: 400 }
      );
    }

    const desc = voice_description.trim();
    if (desc.length < 20 || desc.length > 1000) {
      return NextResponse.json(
        { error: "voice_description must be 20-1000 characters" },
        { status: 400 }
      );
    }

    const response = await axios.post(
      "https://api.elevenlabs.io/v1/text-to-voice/design",
      {
        voice_description: desc,
        auto_generate_text: true,
      },
      {
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Voice design error:", error.response?.data || error.message);
    const status = error.response?.status || 500;
    const message =
      error.response?.data?.detail?.message ||
      error.response?.data?.message ||
      "Voice design failed";
    return NextResponse.json(
      { error: status === 401 ? "Invalid ElevenLabs API key" : message },
      { status }
    );
  }
}

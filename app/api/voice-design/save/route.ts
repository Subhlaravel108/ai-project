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

    const { voice_name, voice_description, generated_voice_id } = await req.json();

    if (!voice_name || !voice_description || !generated_voice_id) {
      return NextResponse.json(
        { error: "voice_name, voice_description, and generated_voice_id are required" },
        { status: 400 }
      );
    }

    const response = await axios.post(
      "https://api.elevenlabs.io/v1/text-to-voice/create-voice-from-preview",
      {
        voice_name: String(voice_name).trim(),
        voice_description: String(voice_description).trim(),
        generated_voice_id: String(generated_voice_id).trim(),
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
    const status = error.response?.status || 500;
    const message =
      error.response?.data?.detail?.message ||
      error.response?.data?.message ||
      "Failed to save voice";
    return NextResponse.json(
      { error: status === 401 ? "Invalid ElevenLabs API key" : message },
      { status }
    );
  }
}

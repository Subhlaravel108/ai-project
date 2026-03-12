import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const headerKey = req.headers.get("xi-api-key");
    const apiKey = headerKey?.trim() || process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "ElevenLabs API key not configured" },
        { status: 500 }
      );
    }

    const response = await axios.get(
      "https://api.elevenlabs.io/v1/voices",
      {
        headers: {
          "xi-api-key": apiKey,
        },
      }
    );

    const voices = response.data.voices;
    const myVoices = voices.filter((v: any) => v.is_owner);

    return NextResponse.json(myVoices);
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.detail?.message || "Failed to fetch voices";
    return NextResponse.json(
      { error: status === 401 ? "Invalid ElevenLabs API key" : message },
      { status }
    );
  }
}
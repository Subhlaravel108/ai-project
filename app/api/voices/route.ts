import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get(
      "https://api.elevenlabs.io/v1/voices",
      {
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY!,
        },
      }
    );

    return NextResponse.json(response.data.voices);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data || "Failed to fetch voices" },
      { status: 500 }
    );
  }
}
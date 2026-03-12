import { NextResponse } from "next/server";
import axios from "axios";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ voiceId: string }> }
) {
  try {
    const { voiceId } = await params;

    if (!voiceId) {
      return NextResponse.json(
        { error: "Voice ID required" },
        { status: 400 }
      );
    }

    // Use API key from request header (user's key) or fallback to env
    const headerKey = req.headers.get("xi-api-key");
    const apiKey = headerKey?.trim() || process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "ElevenLabs API key not configured. Add ELEVENLABS_API_KEY in .env.local or set your API key in API Settings." },
        { status: 500 }
      );
    }

    await axios.delete(
      `https://api.elevenlabs.io/v1/voices/${voiceId}`,
      {
        headers: {
          "xi-api-key": apiKey,
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete voice error:", error.response?.data || error.message);
    const status = error.response?.status || 500;
    let message = "Failed to delete voice";

    if (status === 401) {
      message = "Invalid or expired ElevenLabs API key. Please check your API key in .env.local or API Settings.";
    } else if (error.response?.data?.detail?.message) {
      message = error.response.data.detail.message;
    } else if (error.response?.data?.message) {
      message = error.response.data.message;
    }

    return NextResponse.json({ error: message }, { status });
  }
}

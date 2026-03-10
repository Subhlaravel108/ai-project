import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const res = await fetch("https://api.elevenlabs.io/v1/voices/add", {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY!,
      },
      body: formData,
    });

    const data = await res.json();
    console.log("clone response=", data);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Voice clone failed" },
      { status: 500 }
    );
  }
}
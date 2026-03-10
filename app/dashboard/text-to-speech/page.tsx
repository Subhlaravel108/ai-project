import { Metadata } from "next";
import TextToSpeech from "./clientPage";

export const metadata: Metadata = {
    title: "Text to Speech - VoiceAI",
    description: "Experience the power of VoiceAI's text-to-speech technology, converting your written content into natural-sounding speech.",
}

export default function TextToSpeechPage() {
    return <TextToSpeech/>;
}
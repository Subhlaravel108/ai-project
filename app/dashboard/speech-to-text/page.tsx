import { Metadata } from "next";
import SpeechToText from "./clientPage";

export const metadata: Metadata = {
    title: "Speech to Text - VoiceAI",
    description: "Convert your spoken words into accurate text with VoiceAI's advanced speech recognition technology.",
}

export default function SpeechToTextPage() {
    return <SpeechToText/>;
}
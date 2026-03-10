import { Metadata } from "next";
import VoiceDialogue from "./clientPage";

export const metadata: Metadata = {
    title: "Voice Dialogue - VoiceAI",
    description: "Experience seamless voice interactions with our cutting-edge voice dialogue technology, designed to enhance communication and user engagement.",
}

export default function VoiceDialoguePage() {
    return <VoiceDialogue/>;
}
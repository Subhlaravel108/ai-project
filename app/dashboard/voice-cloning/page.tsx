import { Metadata } from "next";
import VoiceCloning from "./clientPage";

export const metadata:Metadata={
    title: "Voice Cloning - VoiceAI",
    description: "Discover our advanced voice cloning technology that allows you to create personalized voice models for various applications.",
}

export default function VoiceCloningPage() {
    return <VoiceCloning/>;
}
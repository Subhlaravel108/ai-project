import { Metadata } from "next";
import Index from "./clientHomePage";

export const metadata: Metadata = {
  title: "VoiceAI - Revolutionize Your Voice Interactions",
  description: "Experience the future of voice technology with VoiceAI. Our cutting-edge platform offers seamless voice interactions, personalized experiences, and powerful AI-driven features to enhance your daily life.",
};

export default function HomePage() {
    return <Index/>;
}
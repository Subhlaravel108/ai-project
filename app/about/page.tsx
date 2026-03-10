import About from "./clientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - VoiceAI",
  description: "Learn about our mission, values, and the team behind VoiceAI.",
};
export default function AboutPage() {
    return <About/>;
}
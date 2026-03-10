import { Metadata } from "next";
import Blog from "./clientPage";

export const metadata: Metadata = {
  title: "Blog - VoiceAI",
  description: "Read our latest articles on voice AI, product updates, and industry insights.",
};

export default function BlogPage() {
    return <Blog/>;
}
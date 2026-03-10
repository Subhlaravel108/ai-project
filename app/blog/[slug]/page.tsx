import { Metadata } from "next";
import BlogPost from "./clientPage";

export const metadata: Metadata = {
  title: "Blog - VoiceAI",
  description: "Read our latest articles on voice AI, product updates, and industry insights.",
};

export default function BlogDetailPage() {
    return <BlogPost/>;
}
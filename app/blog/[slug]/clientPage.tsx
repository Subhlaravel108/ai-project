"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";

const blogContent: Record<string, { title: string; date: string; content: string[] }> = {
  "future-of-voice-ai": {
    title: "The Future of Voice AI in Content Creation",
    date: "Feb 20, 2026",
    content: [
      "The landscape of content creation is undergoing a radical transformation. AI-powered voice synthesis has matured from robotic-sounding text readers to systems that produce speech indistinguishable from human recordings.",
      "At VoiceAI, we've seen creators increase their audio output by 10x while maintaining—and often exceeding—the quality of traditional recording methods. Podcasters, educators, and marketers are leveraging our platform to produce content in multiple languages simultaneously.",
      "The key breakthrough has been in emotional intelligence. Our latest models understand context, tone, and pacing at a level that makes the output feel genuinely human. This isn't just about converting text to audio—it's about bringing words to life.",
      "Looking ahead, we see voice AI becoming the default tool for first-draft audio content, with human creators focusing on creative direction and final polish rather than spending hours in recording booths.",
    ],
  },
  "voice-cloning-ethics": {
    title: "Voice Cloning: Balancing Innovation and Ethics",
    date: "Feb 15, 2026",
    content: [
      "Voice cloning technology presents extraordinary opportunities alongside significant ethical responsibilities. At VoiceAI, we've built our cloning features with safety and consent at the core.",
      "Every voice clone on our platform requires explicit consent verification. Users must confirm they have permission to clone a voice, and we maintain audit trails to ensure accountability.",
      "We've also implemented detection systems that can identify AI-generated audio, contributing to the broader effort to combat deepfakes and misinformation. Transparency is not optional—it's foundational.",
      "Our commitment is clear: advance the technology while protecting individuals. Voice AI should empower creators, not enable harm.",
    ],
  },
  "multilingual-tts": {
    title: "Breaking Language Barriers with Multilingual TTS",
    date: "Feb 10, 2026",
    content: [
      "Language should never be a barrier to reaching your audience. With our latest multilingual model, VoiceAI now supports 29 languages with natural prosody, proper intonation, and accent preservation.",
      "The technical challenge was immense: each language has unique phonetic systems, tonal patterns, and cultural speech norms. Our research team spent 18 months developing a unified architecture that respects these differences.",
      "Early adopters are already seeing results. One educational platform reported a 300% increase in engagement after localizing their courses using VoiceAI's multilingual capabilities.",
    ],
  },
  "api-v2-launch": {
    title: "Introducing VoiceAI API v2: Faster, Smarter, Simpler",
    date: "Feb 5, 2026",
    content: [
      "We're thrilled to announce VoiceAI API v2—a complete overhaul of our developer platform designed for speed, reliability, and developer experience.",
      "Key improvements include streaming audio support with sub-200ms latency, WebSocket connections for real-time applications, and a simplified authentication flow that gets you from signup to first API call in under 5 minutes.",
      "We've also introduced smart caching that reduces costs for repeated generations and a new batch processing endpoint for high-volume workloads.",
      "Check out our updated documentation and migration guide to get started with v2 today.",
    ],
  },
};

const BlogPost = () => {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : undefined;
  const post = slug ? blogContent[slug] : null;

  if (!post) {
    return (
      <PublicLayout>
        <div className="section-padding text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Post not found</h1>
          <Link href="/blog" className="text-primary hover:underline">Back to blog</Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <section className="section-padding">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
              <ArrowLeft size={16} /> Back to blog
            </Link>
            <p className="text-sm text-muted-foreground mb-4">{post.date}</p>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">{post.title}</h1>
            <div className="space-y-6">
              {post.content.map((paragraph: string, i: number) => (
                <p key={i} className="text-muted-foreground leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default BlogPost;

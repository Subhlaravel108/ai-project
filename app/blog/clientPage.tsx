"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";

const posts = [
  {
    slug: "future-of-voice-ai",
    title: "The Future of Voice AI in Content Creation",
    excerpt: "How AI-powered voice synthesis is revolutionizing the way creators produce audio content at scale.",
    date: "Feb 20, 2026",
    readTime: "5 min read",
    category: "Industry",
  },
  {
    slug: "voice-cloning-ethics",
    title: "Voice Cloning: Balancing Innovation and Ethics",
    excerpt: "Exploring the ethical considerations of voice cloning technology and our approach to responsible AI.",
    date: "Feb 15, 2026",
    readTime: "7 min read",
    category: "Ethics",
  },
  {
    slug: "multilingual-tts",
    title: "Breaking Language Barriers with Multilingual TTS",
    excerpt: "Our latest model now supports 29 languages with natural prosody and accent preservation.",
    date: "Feb 10, 2026",
    readTime: "4 min read",
    category: "Product",
  },
  {
    slug: "api-v2-launch",
    title: "Introducing VoiceAI API v2: Faster, Smarter, Simpler",
    excerpt: "Major improvements to our developer API including streaming support and reduced latency.",
    date: "Feb 5, 2026",
    readTime: "6 min read",
    category: "Engineering",
  },
];

const Blog = () => {
  return (
    <PublicLayout>
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Our <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-muted-foreground">Insights on voice AI, product updates, and industry trends.</p>
          </motion.div>

          <div className="space-y-6">
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                className="glass-card-hover p-6 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                    <span className="text-sm text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read more <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Blog;

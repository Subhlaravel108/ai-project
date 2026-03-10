"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mic,
  AudioWaveform,
  FileAudio,
  MessageSquare,
  ArrowRight,
  Play,
  Zap,
  Shield,
  Globe,
  Star,
  ChevronRight,
} from "lucide-react";
import PublicLayout from "@/components/PublicLayout";
// import heroBg from "@/assets/hero-bg.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: AudioWaveform,
    title: "Text to Speech",
    description: "Convert any text into natural-sounding speech with over 100 voices in 29 languages.",
  },
  {
    icon: Mic,
    title: "Voice Cloning",
    description: "Create a digital replica of any voice with just a few minutes of audio samples.",
  },
  {
    icon: FileAudio,
    title: "Speech to Text",
    description: "Transcribe audio files with industry-leading accuracy and speaker detection.",
  },
  {
    icon: MessageSquare,
    title: "Voice Dialogue",
    description: "Build interactive voice-based conversations with AI-powered dialogue systems.",
  },
];

const steps = [
  { step: "01", title: "Upload or Type", description: "Enter your text or upload audio files to get started." },
  { step: "02", title: "Configure Voice", description: "Select from 100+ voices or clone your own unique voice." },
  { step: "03", title: "Generate & Download", description: "Generate high-quality audio and download in any format." },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Content Creator",
    quote: "VoiceAI transformed my workflow. I produce 10x more audio content now with quality that rivals professional studios.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Podcast Producer",
    quote: "The voice cloning is incredibly realistic. Our listeners can't tell the difference between AI and human narration.",
    rating: 5,
  },
  {
    name: "Aisha Patel",
    role: "Game Developer",
    quote: "We use VoiceAI for all our character dialogue. The variety of voices and emotional range is outstanding.",
    rating: 5,
  },
];

const stats = [
  { value: "10M+", label: "Audio Generated" },
  { value: "100+", label: "Voice Models" },
  { value: "29", label: "Languages" },
  { value: "99.9%", label: "Uptime SLA" },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const Index = () => {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden section-padding min-h-[90vh] flex items-center">
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center"  }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

        <div className="container mx-auto relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8">
              <Zap size={14} />
              Powered by next-gen AI models
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
              Next Generation{" "}
              <span className="gradient-text">AI Voice</span>{" "}
              Platform
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Create lifelike speech, clone voices, and build voice-powered applications with the most advanced AI voice technology available.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link href="/register">
                  Try for Free
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link href="/pricing">
                  View Plans
                  <ChevronRight size={18} />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-display font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section-padding">
        <div className="container mx-auto">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Everything You Need for <span className="gradient-text">Voice AI</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A complete suite of AI-powered voice tools designed for creators, developers, and enterprises.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="glass-card-hover p-6 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Get started in minutes with our simple three-step process.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((item, i) => (
              <motion.div
                key={item.step}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <div className="text-5xl font-display font-bold gradient-text mb-4">{item.step}</div>
                <h3 className="font-display font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container mx-auto">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Loved by <span className="gradient-text">Creators</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Join thousands of creators, developers, and businesses using VoiceAI.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="glass-card-hover p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">"{t.quote}"</p>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container mx-auto">
          <motion.div
            className="glass-card p-12 md:p-16 text-center relative overflow-hidden"
            {...fadeUp}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto mb-8">
                Create your free account and start generating amazing voice content in seconds.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link href="/register">
                  Start Creating for Free
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Index;

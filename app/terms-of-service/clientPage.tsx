"use client";
import { motion } from "framer-motion";
import PublicLayout from "@/components/PublicLayout";

const sections = [
  { title: "Acceptance of Terms", content: "By using VoiceAI, you agree to these Terms of Service. If you do not agree, please do not use our services." },
  { title: "Use of Service", content: "You may use VoiceAI only for lawful purposes. You must not use the service to generate content that is illegal, harmful, or infringes on others' rights. Voice cloning requires consent from the voice owner." },
  { title: "Account & API Keys", content: "You are responsible for keeping your account credentials and API keys secure. Do not share them with others. You are responsible for all activity under your account." },
  { title: "Payment & Refunds", content: "Paid plans are billed according to the pricing you select. Refunds may be available under certain conditions as described in our billing policy." },
  { title: "Termination", content: "We may suspend or terminate your account if you violate these terms. You may close your account at any time through your dashboard." },
  { title: "Contact", content: "For questions about these terms, contact us at legal@voiceai.com or through our Contact page." },
];

const TermsOfService = () => {
  return (
    <PublicLayout>
      <section className="section-padding">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="text-muted-foreground">Last updated: March 2026</p>
          </motion.div>

          <div className="space-y-8">
            {sections.map((s, i) => (
              <motion.div
                key={s.title}
                className="glass-card p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <h2 className="font-display font-semibold text-lg mb-2">{s.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default TermsOfService;

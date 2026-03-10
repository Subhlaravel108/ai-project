"use client";
import { motion } from "framer-motion";
import PublicLayout from "@/components/PublicLayout";

const sections = [
  { title: "Information We Collect", content: "We collect information you provide when signing up (email, name), usage data related to API calls and features used, and technical data such as IP address and browser type." },
  { title: "How We Use Your Data", content: "We use your data to provide and improve our services, process transactions, send support and product updates, and ensure security and compliance." },
  { title: "Data Sharing", content: "We do not sell your personal data. We may share data with service providers who help us operate our platform, and when required by law." },
  { title: "Your Rights", content: "You have the right to access, correct, or delete your personal data. You can manage your preferences in your account settings or contact us for assistance." },
  { title: "Contact", content: "For privacy-related questions, contact us at privacy@voiceai.com or through our Contact page." },
];

const PrivacyPolicy = () => {
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
              Privacy <span className="gradient-text">Policy</span>
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

export default PrivacyPolicy;

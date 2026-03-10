"use client";
import { motion } from "framer-motion";
import PublicLayout from "@/components/PublicLayout";

const sections = [
  { title: "What Are Cookies", content: "Cookies are small text files stored on your device when you visit our website. They help us remember your preferences and improve your experience." },
  { title: "Types of Cookies We Use", content: "Essential cookies are required for the site to work (e.g., login, security). Analytics cookies help us understand how you use our site. Preference cookies remember your settings." },
  { title: "Managing Cookies", content: "You can control or delete cookies through your browser settings. Note that disabling certain cookies may affect site functionality." },
  { title: "Contact", content: "For questions about our use of cookies, contact us at privacy@voiceai.com or through our Contact page." },
];

const CookiePolicy = () => {
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
              Cookie <span className="gradient-text">Policy</span>
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

export default CookiePolicy;

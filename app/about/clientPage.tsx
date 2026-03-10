"use client"
import { motion } from "framer-motion";
import { Shield, Globe, Zap, Users } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";

const team = [
  { name: "Alex Rivera", role: "CEO & Co-Founder", bio: "Former ML lead at a major tech company with 15 years in speech synthesis." },
  { name: "Priya Sharma", role: "CTO", bio: "PhD in computational linguistics, pioneered neural voice synthesis architectures." },
  { name: "James Okonkwo", role: "Head of Product", bio: "10 years building developer tools at leading SaaS companies." },
  { name: "Lena Müller", role: "Head of Research", bio: "Published 40+ papers on generative audio models and voice AI." },
];

const values = [
  { icon: Zap, title: "Innovation First", description: "We push the boundaries of what's possible in AI-generated voice technology." },
  { icon: Shield, title: "Ethical AI", description: "Responsible development with consent-based voice cloning and usage safeguards." },
  { icon: Globe, title: "Global Access", description: "Making voice AI accessible in 29+ languages across every continent." },
  { icon: Users, title: "Community Driven", description: "Built with feedback from our community of 10M+ creators and developers." },
];

const About = () => {
  return (
    <PublicLayout>
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Our <span className="gradient-text">Mission</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We believe every creator deserves access to studio-quality voice AI. Our mission is to democratize voice technology and empower the next generation of audio content.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-20">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="glass-card-hover p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <v.icon className="text-primary mb-3" size={28} />
                <h3 className="font-display font-semibold text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold mb-4">
              Meet the <span className="gradient-text">Team</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                className="glass-card p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary font-display font-bold text-xl">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-display font-semibold">{member.name}</h3>
                <p className="text-xs text-primary mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default About;

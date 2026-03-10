"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import PublicLayout from "@/components/PublicLayout";

const plans = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Perfect for trying out VoiceAI and small projects.",
    features: [
      "10,000 characters/month",
      "3 voice models",
      "Standard quality audio",
      "Community support",
      "API access (limited)",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    monthlyPrice: 29,
    yearlyPrice: 22,
    description: "For creators and professionals who need more power.",
    features: [
      "500,000 characters/month",
      "50+ voice models",
      "HD quality audio",
      "Voice cloning (3 voices)",
      "Priority support",
      "Full API access",
      "Commercial license",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 99,
    yearlyPrice: 79,
    description: "For teams and businesses with advanced needs.",
    features: [
      "Unlimited characters",
      "100+ voice models",
      "Ultra HD quality audio",
      "Unlimited voice cloning",
      "Dedicated support",
      "Full API access",
      "Commercial license",
      "Custom models",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const Pricing = () => {
  const [yearly, setYearly] = useState(false);

  return (
    <PublicLayout>
      <section className="section-padding min-h-screen">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Choose the plan that fits your needs. Scale as you grow.
            </p>

            <div className="inline-flex items-center gap-3 p-1 rounded-full bg-secondary border border-border">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!yearly ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                onClick={() => setYearly(false)}
              >
                Monthly
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${yearly ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                onClick={() => setYearly(true)}
              >
                Yearly <span className="text-xs opacity-75">Save 20%</span>
              </button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`glass-card p-8 relative flex flex-col ${plan.popular ? "border-primary/50 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.2)]" : ""
                  }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-display font-bold text-xl mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-display font-bold">
                    ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check size={16} className="text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "hero" : "hero-outline"}
                  className="w-full"
                  asChild
                >
                  <Link href="/register">
                    {plan.cta}
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Pricing;

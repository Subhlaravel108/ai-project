"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";

const Billing = () => {
  return (
    <DashboardLayout>
      <div className="max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-semibold text-lg">Current Plan: Pro</h3>
                <p className="text-sm text-muted-foreground">$29/month · Renews March 1, 2026</p>
              </div>
              <Button variant="hero-outline" asChild>
                <Link href="/pricing">Upgrade <ArrowRight size={14} /></Link>
              </Button>
            </div>
            <div className="space-y-2">
              {["500,000 characters/month", "50+ voice models", "Voice cloning (3 voices)", "Full API access"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check size={14} className="text-primary" /> {f}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-display font-semibold text-lg mb-4">Billing History</h3>
            <div className="space-y-3">
              {[
                { date: "Feb 1, 2026", amount: "$29.00", status: "Paid" },
                { date: "Jan 1, 2026", amount: "$29.00", status: "Paid" },
                { date: "Dec 1, 2025", amount: "$29.00", status: "Paid" },
              ].map((item) => (
                <div key={item.date} className="flex items-center justify-between text-sm py-2 border-b border-border/50 last:border-0">
                  <span className="text-muted-foreground">{item.date}</span>
                  <span>{item.amount}</span>
                  <span className="text-primary text-xs">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Billing;

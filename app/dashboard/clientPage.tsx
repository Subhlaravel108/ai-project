"use client";
import { motion } from "framer-motion";
import { AudioWaveform, Mic, FileAudio, MessageSquare, TrendingUp, Clock, Zap } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { useEffect, useState } from "react";



const quickActions = [
  { icon: AudioWaveform, label: "Text to Speech", href: "/dashboard/text-to-speech", color: "text-primary" },
  { icon: Mic, label: "Voice Cloning", href: "/dashboard/voice-cloning", color: "text-primary" },
  { icon: FileAudio, label: "Speech to Text", href: "/dashboard/speech-to-text", color: "text-primary" },
  { icon: MessageSquare, label: "Voice Dialogue", href: "/dashboard/voice-dialogue", color: "text-primary" },
];

const stats = [
  { icon: Zap, label: "Characters Used", value: "124,500", sub: "of 500,000" },
  { icon: Clock, label: "Audio Generated", value: "3h 24m", sub: "this month" },
  { icon: TrendingUp, label: "API Calls", value: "1,847", sub: "this month" },
];

const DashboardOverview = () => {

  const [userName, setUserName] = useState("User");
  
  useEffect(() => {
    const user= document.cookie.split("; ").find((row) => row.startsWith("user="));
    if (user) {
      const userData = JSON.parse(decodeURIComponent(user.split("=")[1]));
      setUserName(userData.name || "User");
    }
  }, []);
  
  return (
    
    <DashboardLayout>
      <div className="w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-display font-bold mb-1">Welcome back, <span className="font-bold">{userName.toUpperCase() }</span> !</h1>
          <p className="text-sm text-muted-foreground mb-8">Here's an overview of your VoiceAI usage.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass-card p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <stat.icon className="text-primary mb-2" size={20} />
              <div className="text-2xl font-display font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label} · {stat.sub}</div>
            </motion.div>
          ))}
        </div>

        <h3 className="font-display font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, i) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <Link href={action.href} className="glass-card-hover p-5 flex flex-col items-center gap-3 text-center block">
                <action.icon size={28} className={action.color} />
                <span className="text-sm font-medium">{action.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardOverview;

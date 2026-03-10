"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Play, User, Bot } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

interface Message {
  id: number;
  role: "user" | "ai";
  text: string;
}

const VoiceDialogue = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "ai", text: "Hello! I'm your AI voice assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [voice, setVoice] = useState("sarah");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "ai",
        text: "That's a great question! I'd be happy to help you with that. Voice AI technology is advancing rapidly, and we're at the forefront of making it accessible to everyone.",
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1200);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <Select value={voice} onValueChange={setVoice}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sarah">Sarah · English</SelectItem>
              <SelectItem value="james">James · English</SelectItem>
              <SelectItem value="priya">Priya · English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 overflow-auto space-y-4 mb-4 glass-card p-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "ai" ? "bg-primary/10" : "bg-secondary"
                }`}>
                {msg.role === "ai" ? <Bot size={16} className="text-primary" /> : <User size={16} className="text-muted-foreground" />}
              </div>
              <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm ${msg.role === "ai" ? "bg-secondary" : "bg-primary/10"
                }`}>
                <p>{msg.text}</p>
                {msg.role === "ai" && (
                  <Button variant="ghost" size="sm" className="mt-2 h-7 px-2 text-xs">
                    <Play size={12} /> Play
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button variant="hero" onClick={handleSend}>
            <Send size={16} />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VoiceDialogue;

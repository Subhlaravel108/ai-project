"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Play, User, Bot, Loader2 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import axios from "axios";
import { getElevenLabsKey } from "@/lib/elevenlabs-key";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  role: "user" | "ai";
  text: string;
}

const VoiceDialogue = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "ai", text: "Hello! I'm your AI voice assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [voiceId, setVoiceId] = useState<string>("");
  const [voices, setVoices] = useState<any[]>([]);
  const [voicesLoading, setVoicesLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [speakingId, setSpeakingId] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const headers = useMemo(() => {
    const key = getElevenLabsKey();
    return key ? { "xi-api-key": key } : {};
  }, []);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        setVoicesLoading(true);
        const res = await axios.get("/api/voices/allVoices", { headers });
        setVoices(res.data || []);
        if (res.data?.length && !voiceId) {
          setVoiceId(res.data[0].voice_id);
        }
      } catch (e: any) {
        toast({
          title: "Failed to load voices",
          description: e.response?.data?.error || "Please check your ElevenLabs API key",
          variant: "destructive",
        });
      } finally {
        setVoicesLoading(false);
      }
    };

    fetchVoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const speak = async (text: string, messageId: number) => {
    if (!voiceId) {
      toast({
        title: "Select a voice",
        description: "Please select a voice first",
        variant: "destructive",
      });
      return;
    }

    try {
      setSpeakingId(messageId);
      const res = await axios.post(
        "/api/tts",
        {
          text,
          voiceId,
          stability: 0.5,
          similarity: 0.75,
        },
        { responseType: "blob", headers }
      );

      const url = URL.createObjectURL(res.data);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.play();
      audio.onended = () => {
        URL.revokeObjectURL(url);
        setSpeakingId(null);
      };
    } catch (e: any) {
      toast({
        title: "TTS failed",
        description: e.response?.data?.error || "Unable to play audio",
        variant: "destructive",
      });
      setSpeakingId(null);
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;

    const userMsg: Message = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      setSending(true);
      const res = await axios.post("/api/chat", {
        messages: [...messages, userMsg].slice(-10), // keep context small
      });
      const aiText = res.data.reply || "Sorry, I couldn't generate a reply.";
      const aiMsg: Message = { id: Date.now() + 1, role: "ai", text: aiText };
      setMessages((prev) => [...prev, aiMsg]);

      // auto speak AI reply
      void speak(aiText, aiMsg.id);
    } catch (e: any) {
      toast({
        title: "Chat failed",
        description: e.response?.data?.error || "Unable to generate reply",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <Select value={voiceId} onValueChange={setVoiceId} disabled={voicesLoading}>
            <SelectTrigger className="w-64 cursor-pointer">
              <SelectValue placeholder={voicesLoading ? "Loading voices..." : "Select voice"} />
            </SelectTrigger>
            <SelectContent>
              {voices.map((v) => (
                <SelectItem key={v.voice_id} value={v.voice_id} className="cursor-pointer">
                  {v.name}
                </SelectItem>
              ))}
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 h-7 px-2 text-xs cursor-pointer"
                    onClick={() => speak(msg.text, msg.id)}
                    disabled={speakingId === msg.id}
                  >
                    {speakingId === msg.id ? (
                      <><Loader2 size={12} className="animate-spin" /> Generating...</>
                    ) : (
                      <><Play size={12} /> Play</>
                    )}
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
          <Button variant="hero" onClick={handleSend} disabled={sending} className="cursor-pointer">
            {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VoiceDialogue;

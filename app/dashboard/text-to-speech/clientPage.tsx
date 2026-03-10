"use client";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Download, Loader2, Volume2 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const voices = [
  { id: "sarah", name: "Sarah", lang: "English (US)", gender: "Female" },
  { id: "james", name: "James", lang: "English (UK)", gender: "Male" },
  { id: "priya", name: "Priya", lang: "English (IN)", gender: "Female" },
  { id: "carlos", name: "Carlos", lang: "Spanish", gender: "Male" },
  { id: "yuki", name: "Yuki", lang: "Japanese", gender: "Female" },
  { id: "hans", name: "Hans", lang: "German", gender: "Male" },
];

const TextToSpeech = () => {
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<any[]>([]);
const [voice, setVoice] = useState("");
  const [speed, setSpeed] = useState([1.0]);
  const [stability, setStability] = useState([0.5]);
  const [similarity, setSimilarity] = useState([0.75]);
  const [generating, setGenerating] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
const [isPlaying, setIsPlaying] = useState(false);
const [duration, setDuration] = useState(0);
const [currentTime, setCurrentTime] = useState(0);

const audioRef = useRef<HTMLAudioElement | null>(null);

useEffect(() => {
  const fetchVoices = async () => {
    try {
      const res = await axios.get("/api/voices");
      setVoices(res.data);

      if (res.data.length > 0) {
        setVoice(res.data[0].voice_id);
      }
    } catch (err) {
      console.error("Failed to load voices");
    }
  };

  fetchVoices();
}, []);

const handleGenerate = async () => {
  if (!text.trim()) {
    toast({
      title: "Enter some text",
      description: "Please type or paste text to convert.",
      variant: "destructive",
    });
    return;
  }

  try {
    setGenerating(true);
    setAudioReady(false);

    const res = await axios.post(
  "/api/tts",
  {
    text,
    voiceId: voice,
    stability: stability[0],
    similarity: similarity[0],
  },
  {
    responseType: "blob", // 🔥 important for audio
  }
);
// console.log("voices=",res.data)
if (audioUrl) {
  URL.revokeObjectURL(audioUrl);
}
const url = URL.createObjectURL(res.data);

setAudioUrl(url);
setAudioReady(true);

    toast({
      title: "Audio generated!",
      description: "Your speech is ready.",
    });

  } catch (err) {
    toast({
      title: "Error",
      description: "Something went wrong.",
      variant: "destructive",
    });
  } finally {
    setGenerating(false);
  }
};
  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Text Input */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <Label className="text-sm font-medium">Text Input</Label>
                <Textarea
                  className="mt-2 min-h-50 bg-secondary/50 border-border resize-none"
                  placeholder="Enter the text you want to convert to speech..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength={5000}
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">{text.length}/5,000</p>
              </div>

              <Button
                variant="hero"
                className="w-full cursor-pointer"
                onClick={handleGenerate}
                disabled={generating}
              >
                {generating ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Volume2 size={16} /> Generate Speech
                  </>
                )}
              </Button>

              {/* Audio Player */}
              {audioReady && audioUrl && (
  <motion.div
    className="glass-card p-5"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm font-medium">Generated Audio</span>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const link = document.createElement("a");
          link.href = audioUrl;
          link.download = "speech.mp3";
          link.click();
        }}
        className="cursor-pointer"
      >
        <Download size={16} /> Download
      </Button>
    </div>

   <audio
  ref={audioRef}
  src={audioUrl}
  onLoadedMetadata={() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed[0]; // 🔥 real speed
      setDuration(audioRef.current.duration);
    }
  }}
  onTimeUpdate={() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }}
  onEnded={() => setIsPlaying(false)}
  hidden
/>

    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        className="shrink-0 h-10 w-10 rounded-full cursor-pointer"
        onClick={() => {
          if (!audioRef.current) return;

          if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
          } else {
            audioRef.current.play();
            setIsPlaying(true);
          }
        }}
      >
        <Play size={16} />
      </Button>

      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full"
          style={{
            width: `${(currentTime / duration) * 100 || 0}%`,
          }}
        />
      </div>

      <span className="text-xs text-muted-foreground shrink-0">
        {Math.floor(currentTime)}s / {Math.floor(duration)}s
      </span>
    </div>
  </motion.div>
)}
            </div>

            {/* Settings Panel */}
            <div className="space-y-6">
              <div className="glass-card p-5 space-y-5">
                <div>
                  <Label className="text-sm font-medium">Voice</Label>
                  <Select value={voice} onValueChange={setVoice}>
  <SelectTrigger className="mt-2 cursor-pointer">
    <SelectValue placeholder="Select voice" />
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

                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="text-sm">Speed</Label>
                    <span className="text-xs text-muted-foreground">{speed[0].toFixed(1)}x</span>
                  </div>
                  <Slider value={speed} onValueChange={setSpeed} min={0.5} max={2.0} step={0.1} className="cursor-pointer" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="text-sm">Stability</Label>
                    <span className="text-xs text-muted-foreground ">{Math.round(stability[0] * 100)}%</span>
                  </div>
                  <Slider value={stability} onValueChange={setStability} min={0} max={1} step={0.05} className="cursor-pointer" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="text-sm">Similarity</Label>
                    <span className="text-xs text-muted-foreground">{Math.round(similarity[0] * 100)}%</span>
                  </div>
                  <Slider value={similarity} onValueChange={setSimilarity} min={0} max={1} step={0.05} className="cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>  
      </div>
    </DashboardLayout>
  );
};

export default TextToSpeech;

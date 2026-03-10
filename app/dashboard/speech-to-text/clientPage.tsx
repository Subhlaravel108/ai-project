"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, FileAudio, Copy, Loader2 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const SpeechToText = () => {
  const { toast } = useToast();
  const [converting, setConverting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("");

 const handleConvert = async () => {
  if (!file) {
    toast({
      title: "No file selected",
      description: "Please upload an audio file first",
      variant: "destructive",
    });
    return;
  }

  try {
    setConverting(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("/api/speech-to-text", formData);

    setResult(res.data.text);

    toast({
      title: "Success",
      description: "Audio converted successfully 🎉",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: "Transcription failed",
    });
  } finally {
    setConverting(false);
  }
};

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    toast({ title: "Copied!", description: "Text copied to clipboard." });
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-8 text-center">
            <FileAudio className="mx-auto text-muted-foreground mb-4" size={40} />
            <h3 className="font-display font-semibold mb-2">Upload Audio File</h3>
            <p className="text-sm text-muted-foreground mb-6">Drag & drop or click to select an audio file</p>
            <div className="border-2 border-dashed border-border rounded-xl p-8 mb-4">
              <input
  type="file"
  accept="audio/*"
  onChange={(e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }}
  className="hidden"
  id="audioUpload"
/>

<label htmlFor="audioUpload" className="cursor-pointer block">
  <Upload className="mx-auto text-muted-foreground mb-2" size={24} />
  <p className="text-xs text-muted-foreground">
    MP3, WAV, M4A, WEBM · Max 100MB
  </p>
</label>
{file && (
  <p className="text-xs mt-3 text-muted-foreground">
    Selected: {file.name}
  </p>
)}
            </div>
            <Button variant="hero" onClick={handleConvert} disabled={converting} className="cursor-pointer">
              {converting ? <><Loader2 size={16} className="animate-spin" /> Converting...</> : "Convert to Text"}
            </Button>
          </div>

          {result && (
            <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-display font-semibold text-sm">Transcription Result</span>
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  <Copy size={14} /> Copy
                </Button>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{result}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default SpeechToText;

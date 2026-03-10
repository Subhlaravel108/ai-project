"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Plus, Play, Trash2 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const existingVoices = [
  { id: 1, name: "My Voice", samples: 3, status: "Ready" },
  { id: 2, name: "Narrator Voice", samples: 5, status: "Ready" },
];

const VoiceCloning = () => {
  const { toast } = useToast();
  const [voiceName, setVoiceName] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [voices, setVoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchVoices = async () => {
    const res = await axios.get("/api/voices");
    setVoices(res.data);
  };

  fetchVoices();
}, []);
const handleCreate = async () => {
  if (!voiceName || files.length === 0) {
    toast({
      title: "Missing data",
      description: "Voice name and audio files required",
      variant: "destructive",
    });
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("name", voiceName);

    files.forEach((file) => {
      formData.append("files", file);
    });

    await axios.post("/api/clone-voice", formData);

    toast({
      title: "Success",
      description: "Voice cloned successfully 🎉",
    });

    setVoiceName("");
    setFiles([]);
  } catch (error) {
    toast({
      title: "Error",
      description: "Voice cloning failed",
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <DashboardLayout>
      <div className="w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Upload Section */}
            <div className="glass-card p-6 space-y-5">
              <h3 className="font-display font-semibold text-lg">Create New Voice</h3>
              <div>
                <Label>Voice Name</Label>
                <Input className="mt-1" placeholder="e.g., My Custom Voice" value={voiceName} onChange={e => setVoiceName(e.target.value)} />
              </div>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">

                <input
                  type="file"
                  multiple
                  accept="audio/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setFiles(Array.from(e.target.files));
                    }
                  }}
                  className="hidden"
                  id="voiceUpload"
                />

                <label htmlFor="voiceUpload" className="cursor-pointer block">
                  <Upload className="mx-auto text-muted-foreground mb-3" size={32} />
                  <p className="text-sm text-muted-foreground mb-1">Upload voice samples</p>
                  <p className="text-xs text-muted-foreground">
                    MP3, WAV, or M4A · Min 1 minute of audio
                  </p>
                </label>
                {files.length > 0 && (
  <div className="mt-4 space-y-2 text-left">
    {files.map((file, index) => (
      <div
        key={index}
        className="text-xs bg-muted px-3 py-2 rounded-md flex justify-between items-center"
      >
        <span className="truncate">
  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
</span>
        <button
          type="button"
          onClick={() =>
            setFiles((prev) => prev.filter((_, i) => i !== index))
          }
          className="text-destructive text-xs ml-2 cursor-pointer"
        >
          Remove
        </button>
      </div>
    ))}
  </div>
)}
              </div>
              <Button variant="hero" className="w-full cursor-pointer" onClick={handleCreate}>
                <Plus size={16} /> Create Voice Clone
              </Button>
            </div>

            {/* Voice List */}
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-lg">Your Voices</h3>
              {voices.map((voice,index) => (
                <div key={index} className="glass-card p-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{voice.name}</div>
                    <div className="text-xs text-muted-foreground">
  {voice.category}
</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Play size={14} /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 size={14} /></Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default VoiceCloning;

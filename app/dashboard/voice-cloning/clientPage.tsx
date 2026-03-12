"use client";
import axios from "axios";
import { getElevenLabsKey } from "@/lib/elevenlabs-key";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Plus, Play, Pause, Trash2, Loader2, Wand2 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Voice {
  voice_id: string;
  name: string;
  category?: string;
  preview_url?: string;
}

interface VoicePreview {
  generated_voice_id: string;
  audio_base_64: string;
  duration_secs?: number;
}

const VoiceCloning = () => {
  const { toast } = useToast();
  const [voiceName, setVoiceName] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [voices, setVoices] = useState<Voice[]>([]);
  const [voicesLoading, setVoicesLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"clone" | "design">("design");
  const [voiceDescription, setVoiceDescription] = useState("");
  const [designLoading, setDesignLoading] = useState(false);
  const [previews, setPreviews] = useState<VoicePreview[]>([]);
  const [savingPreviewId, setSavingPreviewId] = useState<string | null>(null);
  const [saveNames, setSaveNames] = useState<Record<string, string>>({});

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const getVoiceHeaders = () => {
    const key = getElevenLabsKey();
    return key ? { "xi-api-key": key } : {};
  };

  const fetchVoices = async () => {
    try {
      setVoicesLoading(true);
      const res = await axios.get("/api/voices/myVoices", { headers: getVoiceHeaders() });
      setVoices(res.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch voices",
        variant: "destructive",
      });
    } finally {
      setVoicesLoading(false);
    }
  };

  useEffect(() => {
    fetchVoices();
  }, [toast]);

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
      files.forEach((file) => formData.append("files", file));

      const res = await axios.post("/api/clone-voice", formData, { headers: getVoiceHeaders() });

      // Add new voice to list immediately (ElevenLabs returns voice_id)
      const newVoice: Voice = {
        voice_id: res.data.voice_id || res.data.voice?.voice_id,
        name: voiceName,
        category: "cloned",
        preview_url: res.data.preview_url || res.data.samples?.[0]?.preview_url,
      };
      if (newVoice.voice_id) {
        setVoices((prev) => [newVoice, ...prev]);
      }

      toast({
        title: "Success",
        description: "Voice cloned successfully 🎉",
      });

      setVoiceName("");
      setFiles([]);

      // Refetch after short delay to get full data (preview_url etc) - ElevenLabs may need a moment
      setTimeout(() => fetchVoices(), 2000);
    } catch (error: any) {
      console.log("error=",error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Voice cloning failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Play/pause handler
  const handlePlayPause = (voice: Voice) => {
    if (!voice.preview_url) {
      toast({
        title: "No preview",
        description: "Preview not available for this voice",
        variant: "destructive",
      });
      return;
    }
    if (playingId === voice.voice_id) {
      audioRef.current?.pause();
      setPlayingId(null);
      setCurrentTime(0);
      setDuration(0);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(voice.preview_url);
      audioRef.current = audio;
      setCurrentTime(0);
      setDuration(0);

      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });
      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });
      audio.addEventListener("ended", () => {
        setPlayingId(null);
        setCurrentTime(0);
      });

      audio.play();
      setPlayingId(voice.voice_id);
    }
  };

  const handleDesignPreviews = async () => {
    const desc = voiceDescription.trim();
    if (desc.length < 20) {
      toast({
        title: "Description too short",
        description: "Enter at least 20 characters to describe your voice",
        variant: "destructive",
      });
      return;
    }
    try {
      setDesignLoading(true);
      setPreviews([]);
      const res = await axios.post(
        "/api/voice-design",
        { voice_description: desc },
        { headers: getVoiceHeaders() }
      );
      setPreviews(res.data.previews || []);
      if (!res.data.previews?.length) {
        toast({ title: "No previews", description: "Try a different description", variant: "destructive" });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to generate voice previews",
        variant: "destructive",
      });
    } finally {
      setDesignLoading(false);
    }
  };

  const handleSaveDesignVoice = async (preview: VoicePreview) => {
    const finalName = (saveNames[preview.generated_voice_id] || "Designed Voice").trim();
    if (!finalName) return;
    try {
      setSavingPreviewId(preview.generated_voice_id);
      const res = await axios.post(
        "/api/voice-design/save",
        {
          voice_name: finalName,
          voice_description: voiceDescription.trim(),
          generated_voice_id: preview.generated_voice_id,
        },
        { headers: getVoiceHeaders() }
      );
      const newVoice: Voice = {
        voice_id: res.data.voice_id || res.data.voice?.voice_id,
        name: finalName,
        category: "generated",
        preview_url: res.data.preview_url,
      };
      setVoices((prev) => [newVoice, ...prev]);
      setPreviews((prev) => prev.filter((p) => p.generated_voice_id !== preview.generated_voice_id));
      setSaveNames((prev) => {
        const next = { ...prev };
        delete next[preview.generated_voice_id];
        return next;
      });
      toast({ title: "Success", description: "Voice saved to your library 🎉" });
      setTimeout(() => fetchVoices(), 1500);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to save voice",
        variant: "destructive",
      });
    } finally {
      setSavingPreviewId(null);
    }
  };

  const handleDelete = async (voiceId: string) => {
    try {
      setDeletingId(voiceId);
      if (playingId === voiceId && audioRef.current) {
        audioRef.current.pause();
        setPlayingId(null);
        setCurrentTime(0);
        setDuration(0);
      }

      await axios.delete(`/api/voices/${voiceId}`, { headers: getVoiceHeaders() });
      setVoices((prev) => prev.filter((v) => v.voice_id !== voiceId));
      toast({
        title: "Deleted",
        description: "Voice removed successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to delete voice",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Create Voice Section */}
            <div className="glass-card p-6 space-y-5">
              <div className="flex gap-2 border-b border-border pb-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("design")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    activeTab === "design"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 hover:bg-secondary"
                  }`}
                >
                  <Wand2 size={16} className="inline mr-2" />
                  Voice Design
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("clone")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    activeTab === "clone"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 hover:bg-secondary"
                  }`}
                >
                  <Upload size={16} className="inline mr-2" />
                  Voice Cloning 
                </button>
              </div>

              {activeTab === "design" ? (
                <>
                  <div>
                    <Label>Describe your voice</Label>
                    <Textarea
                      className="mt-1 min-h-[100px] resize-none"
                      placeholder="e.g., A young female voice with a warm, friendly tone and slight British accent. Soft and clear."
                      value={voiceDescription}
                      onChange={(e) => setVoiceDescription(e.target.value)}
                      maxLength={1000}
                    />
                    <p className="text-xs text-muted-foreground mt-1">{voiceDescription.length}/1000 (min 20)</p>
                  </div>
                  <Button
                    variant="hero"
                    className="w-full cursor-pointer"
                    onClick={handleDesignPreviews}
                    disabled={designLoading || voiceDescription.trim().length < 20}
                  >
                    {designLoading ? (
                      <><Loader2 size={16} className="animate-spin" /> Generating...</>
                    ) : (
                      <><Wand2 size={16} /> Generate Voice Previews</>
                    )}
                  </Button>
                  {previews.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <p className="text-sm font-medium">Preview & save your favorite:</p>
                      {previews.map((preview) => (
                        <div key={preview.generated_voice_id} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 shrink-0 cursor-pointer"
                            onClick={() => {
                              const audio = new Audio(`data:audio/mp3;base64,${preview.audio_base_64}`);
                              audio.play();
                            }}
                          >
                            <Play size={14} />
                          </Button>
                          <Input
                            placeholder="Voice name"
                            className="flex-1"
                            value={saveNames[preview.generated_voice_id] || ""}
                            onChange={(e) =>
                              setSaveNames((prev) => ({
                                ...prev,
                                [preview.generated_voice_id]: e.target.value,
                              }))
                            }
                          />
                          <Button
                            variant="hero"
                            size="sm"
                            onClick={() => handleSaveDesignVoice(preview)}
                            disabled={savingPreviewId === preview.generated_voice_id}
                            className="cursor-pointer"
                          >
                            {savingPreviewId === preview.generated_voice_id ? (
                              <Loader2 size={14} className="animate-spin" />
                            ) : (
                              "Save"
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div>
                    <Label>Voice Name</Label>
                    <Input
                      className="mt-1"
                      placeholder="e.g., My Custom Voice"
                      value={voiceName}
                      onChange={(e) => setVoiceName(e.target.value)}
                    />
                  </div>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                    <input
                      type="file"
                      multiple
                      accept="audio/*"
                      onChange={(e) => {
                        if (e.target.files) setFiles(Array.from(e.target.files));
                      }}
                      className="hidden"
                      id="voiceUpload"
                    />
                    <label htmlFor="voiceUpload" className="cursor-pointer block">
                      <Upload className="mx-auto text-muted-foreground mb-3" size={32} />
                      <p className="text-sm text-muted-foreground mb-1">Upload voice samples</p>
                      <p className="text-xs text-muted-foreground">
                        MP3, WAV, or M4A · Min 1 minute of audio · Requires Starter plan
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
                              onClick={() => setFiles((prev) => prev.filter((_, i) => i !== index))}
                              className="text-destructive text-xs ml-2 cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button
                    variant="hero"
                    className="w-full cursor-pointer"
                    onClick={handleCreate}
                    disabled={loading}
                  >
                    {loading ? (
                      <><Loader2 size={16} className="animate-spin" /> Creating...</>
                    ) : (
                      <><Plus size={16} /> Create Voice Clone</>
                    )}
                  </Button>
                </>
              )}
            </div>

            {/* Voice List */}
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-lg">Your Voices</h3>
              {voicesLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="glass-card p-4 flex items-center gap-4">
                      <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : voices.length === 0 ? (
                <div className="glass-card p-8 text-center text-sm text-muted-foreground">
                  No voices yet. Create your first voice clone above.
                </div>
              ) : (
                <>
              {voices.map((voice) => (
                <div key={voice.voice_id} className="glass-card p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{voice.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {playingId === voice.voice_id ? "Playing..." : voice.category || "cloned"}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 cursor-pointer"
                        onClick={() => handlePlayPause(voice)}
                        disabled={!voice.preview_url}
                      >
                        {playingId === voice.voice_id ? <Pause size={14} /> : <Play size={14} />}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive shrink-0 cursor-pointer"
                            disabled={deletingId === voice.voice_id}
                          >
                            {deletingId === voice.voice_id ? (
                              <Loader2 size={14} className="animate-spin" />
                            ) : (
                              <Trash2 size={14} />
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete voice?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete <span className="font-medium">{voice.name}</span>. This action can’t be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              onClick={() => handleDelete(voice.voice_id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  {playingId === voice.voice_id && (
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{
                            width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {Math.floor(currentTime)}s / {Math.floor(duration) || "0"}s
                      </span>
                    </div>
                  )}
                </div>
              ))}
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default VoiceCloning;
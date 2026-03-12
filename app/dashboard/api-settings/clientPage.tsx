"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Eye, EyeOff, RefreshCw } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getElevenLabsKey, setElevenLabsKey } from "@/lib/elevenlabs-key";

const ApiSettings = () => {
  const { toast } = useToast();
  const [showKey, setShowKey] = useState(false);
  const [apiKey, setApiKeyState] = useState("");
  const [inputKey, setInputKey] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setApiKeyState(getElevenLabsKey() || "");
  }, []);

  const handleSaveKey = () => {
    if (inputKey.trim()) {
      setElevenLabsKey(inputKey);
      setApiKeyState(inputKey.trim());
      setInputKey("");
      setIsEditing(false);
      toast({ title: "API key saved" });
    }
  };

  const handleChangeKey = () => {
    setInputKey("");
    setIsEditing(true);
    setShowKey(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-display font-semibold text-lg">ElevenLabs API Key</h3>
            <p className="text-sm text-muted-foreground">Required for voice cloning, TTS, and voice operations. Get your key from elevenlabs.io</p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  value={isEditing || inputKey ? inputKey : (apiKey ? (showKey ? apiKey : "•".repeat(32)) : "")}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder="Paste your ElevenLabs API key (from elevenlabs.io)"
                  type={inputKey || showKey ? "text" : "password"}
                  readOnly={!!apiKey && !inputKey && !isEditing}
                />
                {apiKey && !inputKey && (
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowKey(!showKey)} type="button">
                    {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                )}
              </div>
              {apiKey && !inputKey && !isEditing ? (
                <Button variant="outline" onClick={handleChangeKey}>
                  Change
                </Button>
              ) : (
                <>
                  <Button variant="hero" onClick={handleSaveKey} disabled={!inputKey.trim()}>
                    Save
                  </Button>
                  {apiKey && (isEditing || inputKey) && (
                    <Button variant="ghost" onClick={() => { setInputKey(""); setIsEditing(false); }}>
                      Cancel
                    </Button>
                  )}
                </>
              )}
              {apiKey && !inputKey && (
                <Button variant="outline" size="icon" onClick={() => { navigator.clipboard.writeText(apiKey); toast({ title: "Copied!" }); }}>
                  <Copy size={16} />
                </Button>
              )}
            </div>
            {!apiKey && (
              <p className="text-xs text-amber-600 dark:text-amber-500">
                Add your ElevenLabs API key above, or set ELEVENLABS_API_KEY in .env.local for server-side use.
              </p>
            )}
          </div>

          <div className="glass-card p-6 space-y-4">
            <h3 className="font-display font-semibold text-lg">Usage</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Characters used</span>
                <span>124,500 / 500,000</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full w-1/4 bg-primary rounded-full" />
              </div>
            </div>
          </div>

          <div className="glass-card p-6 space-y-4">
            <h3 className="font-display font-semibold text-lg">Base URL</h3>
            <Input value="https://api.voiceai.com/v1" readOnly />
            <p className="text-xs text-muted-foreground">Documentation available at docs.voiceai.com</p>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ApiSettings;

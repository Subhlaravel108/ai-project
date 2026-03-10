"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Eye, EyeOff, RefreshCw } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ApiSettings = () => {
  const { toast } = useToast();
  const [showKey, setShowKey] = useState(false);
  const apiKey = "vai_sk_demo_1234567890abcdef";

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-display font-semibold text-lg">API Key</h3>
            <p className="text-sm text-muted-foreground">Use this key to authenticate your API requests.</p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input value={showKey ? apiKey : "•".repeat(32)} readOnly />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowKey(!showKey)}>
                  {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <Button variant="outline" size="icon" onClick={() => { navigator.clipboard.writeText(apiKey); toast({ title: "Copied!" }); }}>
                <Copy size={16} />
              </Button>
              <Button variant="outline" size="icon">
                <RefreshCw size={16} />
              </Button>
            </div>
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

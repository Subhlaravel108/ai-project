"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  AudioWaveform,
  Mic,
  FileAudio,
  MessageSquare,
  Key,
  User,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./ui/button";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: AudioWaveform, label: "Text to Speech", href: "/dashboard/text-to-speech" },
  { icon: Mic, label: "Voice Cloning", href: "/dashboard/voice-cloning" },
  { icon: FileAudio, label: "Speech to Text", href: "/dashboard/speech-to-text" },
  { icon: MessageSquare, label: "Voice Dialogue", href: "/dashboard/voice-dialogue" },
  { icon: Key, label: "API Settings", href: "/dashboard/api-settings" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0; samesite=strict";
    document.cookie = "user=; path=/; max-age=0; samesite=strict";
    router.push("/");
  };

  return (
    <div className="min-h-screen flex bg-background relative">

      {/* 🔥 Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* 🔥 Sidebar */}
      <aside
        className={`
        fixed md:static z-50 top-0 left-0 h-full
        ${collapsed ? "w-16" : "w-60"}
        bg-card border-r border-border/50
        transform transition-all duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        {/* Top */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border/50">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">V</span>
              </div>
              <span className="font-bold">VoiceAI</span>
            </Link>
          )}

          {/* Desktop collapse button */}
          <button
            className="hidden md:block text-muted-foreground hover:text-foreground"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>

          {/* Mobile close */}
          <button
            className="md:hidden text-muted-foreground"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon size={18} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-2 border-t border-border/50">
          <Button
            className="w-full justify-start cursor-pointer"
            variant="outline"
            size="sm"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            {!collapsed && <span className="ml-2">Sign Out</span>}
          </Button>
        </div>
      </aside>

      {/* 🔥 Main Content */}
      <main className="flex-1 overflow-auto md:ml-0">
        {/* Top bar */}
        <div className="h-16 border-b border-border/50 flex items-center px-6 justify-between">
          {/* Mobile menu button */}
          <button
            className="md:hidden text-muted-foreground"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>

          <h2 className="font-semibold">
            {sidebarItems.find((i) => i.href === pathname)?.label || "Dashboard"}
          </h2>
        </div>

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
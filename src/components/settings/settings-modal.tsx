/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  User,
  Palette,
  ShieldCheck,
  LogOut,
  Trash2,
  Copy,
  Check,
  Database,
  Image as ImageIcon,
  ExternalLink,
  HardDrive,
  KeyRound,
  UserMinus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/auth-client";
import { useTheme } from "next-themes";
import { getStorageStats } from "@/app/actions/storage";
import Image from "next/image";
import { toast } from "sonner";

type TabType = "profile" | "appearance" | "data";

interface SettingsModalProps {
  user: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsModal({
  user,
  open,
  onOpenChange,
}: SettingsModalProps) {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = React.useState<TabType>("profile");
  const [mounted, setMounted] = React.useState(false);

  const [stats, setStats] = React.useState({
    usedMB: 0,
    limitMB: 50,
    fileCount: 0,
    files: [],
  });
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleTabChange = async (tab: TabType) => {
    setActiveTab(tab);
    if (tab === "data" && user?.id) {
      setLoading(true);
      try {
        const data: any = await getStorageStats(user.id);
        setStats(data);
      } catch (err) {
        console.error("Storage fetch failed", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const sidebarItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "data", label: "Data & Media", icon: Database },
  ];

  if (!mounted) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-[720px] h-[85vh] sm:h-[540px] p-0 gap-0 border-border/40 bg-background/95 backdrop-blur-xl rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl flex flex-col sm:flex-row">
        <div className="sr-only">
          <DialogTitle>Sanctuary Settings</DialogTitle>
          <DialogDescription>Manage your profile and encrypted archives.</DialogDescription>
        </div>

        {/* 🏛️ Sidebar: Vertical on Desktop, Horizontal Pill Nav on Mobile */}
        <div className="w-full sm:w-[210px] border-b sm:border-b-0 sm:border-r border-border/20 bg-secondary/10 p-3 sm:p-4 flex flex-row sm:flex-col justify-between items-center sm:items-stretch shrink-0">
          <div className="flex flex-row sm:flex-col items-center sm:items-stretch w-full gap-2 sm:gap-1 overflow-x-auto no-scrollbar sm:overflow-x-visible">
            <div className="hidden sm:block px-3 py-4 mb-2">
              <span className="text-xl font-black tracking-tighter italic text-foreground">withink.</span>
            </div>
            
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => void handleTabChange(item.id as TabType)}
                className={cn(
                  "flex items-center gap-2.5 sm:gap-3 px-3 py-2 sm:py-2.5 rounded-full sm:rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap",
                  activeTab === item.id
                    ? "bg-foreground text-background shadow-md sm:shadow-lg sm:scale-[1.02]"
                    : "hover:bg-secondary/50 text-muted-foreground"
                )}
              >
                <item.icon size={14} className="sm:w-4 sm:h-4" />
                {item.label}
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex justify-start gap-3 rounded-xl text-muted-foreground hover:text-destructive transition-colors mt-auto"
            onClick={async () => {
              await signOut();
              window.location.href = "/";
            }}
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>

        {/* 🏛️ Right Content Area */}
        <div className="flex-1 p-5 sm:p-8 overflow-y-auto no-scrollbar pb-24 sm:pb-8">
          
          {/* PROFILE */}
          {activeTab === "profile" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 sm:slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-bold tracking-tight">Account Identity</h3>
              <div className="space-y-4">
                <div className="grid gap-1.5">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Email</label>
                  <div className="bg-secondary/20 p-3 sm:p-3.5 rounded-2xl border border-border/50 text-sm font-medium break-all">{user?.email}</div>
                </div>
                
                <div className="grid gap-1.5">
                   <label className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Password</label>
                   <Button variant="outline" className="justify-between rounded-2xl h-12 border-border/40 hover:bg-secondary/20 group transition-all" onClick={() => toast.success("Security link sent to your email.")}>
                      <div className="flex items-center gap-3">
                        <KeyRound size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-xs sm:text-sm font-medium">Change Password</span>
                      </div>
                      <ExternalLink size={14} className="opacity-40" />
                   </Button>
                </div>
              </div>

              <div className="pt-6 border-t border-destructive/20">
                <h4 className="text-sm font-bold text-destructive mb-1 flex items-center gap-2">
                  <UserMinus size={16} /> Danger Zone
                </h4>
                <p className="text-[11px] text-muted-foreground mb-4 leading-relaxed">Permanent deletion of all data and media from R2.</p>
                <Button variant="ghost" className="w-full justify-start text-destructive hover:bg-destructive/10 rounded-xl h-10 px-3 font-semibold text-xs sm:text-sm">Delete Account</Button>
              </div>
            </div>
          )}

          {/* APPEARANCE */}
          {activeTab === "appearance" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 sm:slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-bold tracking-tight">Visual Themes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { id: "light", name: "Zen", color: "bg-zinc-100", textColor: "text-zinc-900" },
                  { id: "warm-minimal", name: "Sand", color: "bg-[#D4C3A3]", textColor: "text-[#433928]" },
                  { id: "moonlight", name: "Moon", color: "bg-[#1e1b4b]", textColor: "text-[#e0e7ff]" },
                  { id: "terminal", name: "Matrix", color: "bg-[#0c0c0c]", textColor: "text-[#FFB000]" },
                ].map((t) => (
                  <button key={t.id} onClick={() => setTheme(t.id)} className={cn("h-20 sm:h-28 rounded-[20px] sm:rounded-[24px] cursor-pointer transition-all p-4 sm:p-5 flex flex-col justify-between items-start border-2 relative overflow-hidden group", t.color, theme === t.id ? "border-primary ring-2 ring-primary/10 scale-[1.01]" : "border-transparent hover:border-border/60")}>
                    {theme === t.id && (
                      <div className="absolute top-3 right-3 bg-foreground/10 backdrop-blur-md px-2 py-0.5 sm:py-1 rounded-full flex items-center gap-1">
                        <Check className={cn("w-2.5 h-2.5 sm:h-3 sm:w-3", t.textColor)} />
                        <span className={cn("text-[7px] sm:text-[8px] font-black uppercase", t.textColor)}>Active</span>
                      </div>
                    )}
                    <div className="mt-auto">
                      <span className={cn("text-[10px] sm:text-[12px] font-black uppercase tracking-[0.2em]", t.textColor)}>{t.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* DATA & MEDIA */}
          {activeTab === "data" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 sm:slide-in-from-right-4 duration-300">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold tracking-tight">Data & Media</h3>
                <div className="flex items-center gap-1.5 px-2 py-0.5 sm:py-1 bg-green-500/5 border border-green-500/20 rounded-full">
                  <ShieldCheck size={10} className="text-green-500" />
                  <span className="text-[7px] sm:text-[8px] font-bold text-green-600 uppercase">AES-256</span>
                </div>
              </div>

              <div className="bg-secondary/20 border border-border/40 p-4 sm:p-5 rounded-[24px] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary"><ImageIcon size={16} /></div>
                  <div>
                    <p className="text-sm font-bold">Media Library</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">{stats.fileCount} Objects</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono font-bold opacity-70">
                    <span>{loading ? "..." : `${stats.usedMB} MB`}</span>
                    <span>50 MB Limit</span>
                  </div>
                  <div className="h-1.5 sm:h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-1000 ease-out" style={{ width: `${(stats.usedMB / 50) * 100}%` }} />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {stats.files.length > 0 ? stats.files.map((file: any) => (
                    <div key={file.key} className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden border border-border/40 bg-muted">
                      <Image src={file.url} fill className="object-cover grayscale hover:grayscale-0 transition-all" alt="R2 Media" />
                    </div>
                  )) : [1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square rounded-lg sm:rounded-xl bg-secondary/40 border border-dashed border-border/60 flex items-center justify-center opacity-20"><ImageIcon size={12} /></div>
                  ))}
                </div>
              </div>

              <div className="grid gap-2">
                <div className="bg-secondary/10 border border-border/20 p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HardDrive size={16} className="text-muted-foreground" />
                    <span className="text-xs font-bold text-muted-foreground">JSON Export</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 text-[9px] font-bold uppercase tracking-widest">Download</Button>
                </div>
                
                <div className="pt-4 mt-2 border-t border-destructive/10">
                  <Button variant="outline" className="w-full gap-2 h-10 rounded-xl border-destructive/20 text-destructive text-xs">
                    <Trash2 size={14} /> Wipe All Archives
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Mobile-only Logout (Floating at bottom) */}
          <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border/20">
             <Button
                variant="ghost"
                className="w-full justify-center gap-3 text-muted-foreground"
                onClick={async () => {
                  await signOut();
                  window.location.href = "/";
                }}
              >
                <LogOut size={16} /> Logout
              </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
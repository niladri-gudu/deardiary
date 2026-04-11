import { ArrowRight, Sparkles, Database, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      {/* Hero Section */}
      <header className="relative max-w-5xl mx-auto text-center pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Glow - adapts to theme accent color */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-125 bg-accent/10 blur-[120px] rounded-full -z-10" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Sparkles className="h-3 w-3" />
          <span>Now with AI-Powered RAG</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1] text-main">
          Talk to your <br />
          <span className="text-muted-foreground italic font-serif">
            past self.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
          The only journal that listens. Capture your thoughts today, and ask
          your journal questions tomorrow using a private, semantic memory
          layer.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:opacity-90 px-8 h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105"
          >
            Start Your Lifetime Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="h-14 px-8 text-muted-foreground hover:text-foreground"
          >
            View Demo
          </Button>
        </div>
      </header>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6 pb-32">
        <FeatureCard
          icon={<Sparkles className="h-6 w-6 text-accent" />}
          title="Semantic Search"
          description="Don't just search for keywords. Ask 'When did I last feel truly happy?' and get instant, deep reflections."
        />
        <FeatureCard
          icon={<Database className="h-6 w-6 text-accent" />}
          title="Zero Egress Fees"
          description="Powered by Cloudflare R2. Your memories and photos are stored securely for life without hidden costs."
        />
        <FeatureCard
          icon={<Repeat className="h-6 w-6 text-accent" />}
          title="Habit Loops"
          description="Intelligent prompts and streak tracking designed to build a writing habit that actually sticks."
        />
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group p-8 border border-border rounded-3xl bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all hover:-translate-y-1">
      <div className="mb-4 p-3 rounded-2xl bg-background border border-border w-fit group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-main">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

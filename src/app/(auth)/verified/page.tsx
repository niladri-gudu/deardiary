import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifiedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background pt-16 px-4">
      <div className="flex flex-col items-center gap-6 text-center max-w-sm">

        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Email verified
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Your account is all set. Start writing your first entry.
          </p>
        </div>

        <Link href="/journal" className="w-full">
          <Button className="w-full h-11 rounded-xl font-semibold">
            Go to my journal
          </Button>
        </Link>

        <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          Back to home
        </Link>

      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await authClient.requestPasswordReset({ email, redirectTo: "/reset-password" });
    setIsLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <Card className="w-full max-w-md border-border shadow-2xl">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <Mail className="h-5 w-5 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Check your email</h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            If an account exists for <span className="text-foreground">{email}</span>, you&apos;ll receive a reset link shortly.
          </p>
          <Link href="/signin" className="text-sm text-muted-foreground hover:text-foreground transition-colors mt-2">
            Back to sign in
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md border-border shadow-2xl">
      <CardHeader className="space-y-2 pb-8">
        <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
          Forgot password?
        </CardTitle>
        <CardDescription className="text-muted-foreground text-base">
          Enter your email and we&apos;ll send you a reset link.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-muted-foreground font-medium ml-1">Email</Label>
          <div className="relative group">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/50 group-focus-within:text-foreground transition-colors" />
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="pl-10 h-11 bg-foreground/5"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <Button className="w-full h-11 rounded-xl font-semibold" onClick={handleSubmit} disabled={isLoading || !email}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send reset link"}
        </Button>

        <Link href="/signin" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3 w-3" />
          Back to sign in
        </Link>
      </CardContent>
    </Card>
  );
}
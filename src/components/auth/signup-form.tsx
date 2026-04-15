"use client";

import { useState } from "react";
import { signUp, signIn } from "@/lib/auth-client";
import Link from "next/link";
import { Loader2, User, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verifyPending, setVerifyPending] = useState(false);

  const handleSignup = async () => {
    setIsLoading(true);
    const res = await signUp.email({ name, email, password });
    setIsLoading(false);
    if (res.error) {
      toast.error(res.error.message);
      return;
    }
    setVerifyPending(true);
  };

  if (verifyPending) {
    return (
      <Card className="w-full max-w-md border-border shadow-2xl">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <Mail className="h-5 w-5 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Check your email
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            We sent a verification link to{" "}
            <span className="text-foreground">{email}</span>. Click it to
            activate your account.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md border-border shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <CardHeader className="space-y-2 pb-8">
        <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
          Begin your journey
        </CardTitle>
        <CardDescription className="text-muted-foreground text-base">
          Start capturing your thoughts, forever.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-5">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label
              htmlFor="name"
              className="text-muted-foreground font-medium ml-1"
            >
              Full Name
            </Label>
            <div className="relative group">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/50 group-focus-within:text-foreground transition-colors" />
              <Input
                id="name"
                placeholder="Your name"
                className="pl-10 h-11 bg-foreground/5"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="email-signup"
              className="text-muted-foreground font-medium ml-1"
            >
              Email
            </Label>
            <div className="relative group">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/50 group-focus-within:text-foreground transition-colors" />
              <Input
                id="email-signup"
                type="email"
                placeholder="name@example.com"
                className="pl-10 h-11 bg-foreground/5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="password-signup"
              className="text-muted-foreground font-medium ml-1"
            >
              Password
            </Label>
            <div className="relative group">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/50 group-focus-within:text-foreground transition-colors" />
              <Input
                id="password-signup"
                type="password"
                placeholder="••••••••"
                className="pl-10 h-11 bg-foreground/5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Button
          className="w-full h-11 rounded-xl font-semibold mt-2"
          onClick={handleSignup}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Create Account"
          )}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-3 text-muted-foreground tracking-widest">
              Or
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full h-11 rounded-xl"
          onClick={() =>
            signIn.social({ provider: "google", callbackURL: "/journal" })
          }
        >
          <GoogleIcon />
          Sign up with Google
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-2">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-foreground underline-offset-4 hover:underline transition-colors"
          >
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

function GoogleIcon() {
  return (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Mail, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/chat");
    }
  }, [session, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
        <Skeleton className="h-96 w-96 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-full shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Chat Assistant
          </CardTitle>
          <CardDescription className="text-base">
            Powered by Gemini with real-time data tools
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600 text-center">
            Ask about weather, F1 races, or stock prices instantly!
          </p>

          <div className="space-y-3">
            <Button
              onClick={() => signIn("google", { callbackUrl: "/chat" })}
              size="lg"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold"
            >
              <Mail className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>

            <Button
              onClick={() => signIn("github", { callbackUrl: "/chat" })}
              size="lg"
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold"
            >
              <Github className="mr-2 h-4 w-4" />
              Sign in with GitHub
            </Button>
          </div>

          <p className="text-xs text-slate-500 text-center pt-4">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

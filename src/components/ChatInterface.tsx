"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MessageList from "./MessageList";
import InputField from "./InputField";
import Navbar from "./Navbar";
import { Skeleton } from "./ui/skeleton";

export default function ChatInterface() {
  const { data: session, status } = useSession();
  const router = useRouter();

  type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm your AI assistant. I can help with:\n\n🌤️ Weather in any city\n🏎️ Next F1 race info\n📈 Stock prices (AAPL, GOOGL, etc.)\n\nWhat would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with input:", input);
    
    if (!input.trim() || isLoading) {
      console.log("Skipping submit - empty input or loading");
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };
    console.log("User message:", userMessage);

    setMessages(prev => {
      const newMessages = [...prev, userMessage];
      console.log("Updated messages:", newMessages);
      return newMessages;
    });
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      console.log("Sending request to /api/chat");
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        console.error("Response not ok:", response.status, response.statusText);
        throw new Error("Failed to get response");
      }

      const responseText = await response.text();
      console.log("Raw response text:", responseText);
      
      const assistantMessage = JSON.parse(responseText);
      console.log("Parsed assistant message:", assistantMessage);
      
      setMessages(prev => {
        const newMessages = [...prev, assistantMessage];
        console.log("Final messages:", newMessages);
        return newMessages;
      });
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
      console.log("Loading finished");
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="space-y-4 text-center">
          <Skeleton className="h-12 w-12 mx-auto rounded-full bg-primary/20" />
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navbar */}
      <Navbar />

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      {/* Input */}
      <InputField
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        disabled={isLoading}
      />

      {/* Error Toast (if any) */}
      {error && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 max-w-md">
          <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg border border-red-600">
            {error.message || "Something went wrong. Please try again."}
          </div>
        </div>
      )}
    </div>
  );
}

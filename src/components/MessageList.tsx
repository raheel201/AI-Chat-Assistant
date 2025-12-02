"use client";

import type { Message } from "ai/react";
import { useEffect, useRef } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertCircle } from "lucide-react";

import WeatherCard from "./WeatherCard";
import RaceCard from "./RaceCard";
import PriceCard from "./PriceCard";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const parseToolResult = (content: string) => {
    try {
      const parsed = JSON.parse(content);

      if (parsed.error) {
        return { type: "error", error: parsed.error };
      }

      if (parsed.location && parsed.temperature !== undefined) {
        return { type: "weather", data: parsed };
      } else if (parsed.raceName && parsed.round !== undefined) {
        return { type: "race", data: parsed };
      } else if (parsed.symbol && parsed.price !== undefined) {
        return { type: "stock", data: parsed };
      } else if (parsed.message) {
        return { type: "info", message: parsed.message };
      }
    } catch {
      return null;
    }
    return null;
  };

  return (
    <ScrollArea className="h-full w-full">
      <div className="max-w-4xl mx-auto space-y-4 p-4 pb-20">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-96 text-center">
            <div className="space-y-2 text-slate-600">
              <p className="text-lg font-semibold">Start a conversation</p>
              <p className="text-sm">
                Try asking about:
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>🌤️ Weather in any city</li>
                  <li>🏎️ Next F1 race</li>
                  <li>📈 Stock prices (e.g., AAPL, GOOGL)</li>
                </ul>
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => {
              const content = typeof message.content === "string" ? message.content : "";
              const toolResult = parseToolResult(content);
              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  {/* AI Avatar */}
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8 flex-shrink-0 bg-blue-600">
                      <AvatarFallback className="text-white font-bold">
                        AI
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`max-w-md lg:max-w-lg ${message.role === "user" ? "order-2" : ""
                      }`}
                  >
                    {toolResult ? (
                      <>
                        {toolResult.type === "weather" && (
                          <WeatherCard data={toolResult.data} />
                        )}
                        {toolResult.type === "race" && (
                          <RaceCard data={toolResult.data} />
                        )}
                        {toolResult.type === "stock" && (
                          <PriceCard data={toolResult.data} />
                        )}
                        {toolResult.type === "error" && (
                          <Alert variant="destructive" className="max-w-md">
                            <AlertCircle className="h-5 w-5" />
                            <AlertDescription>{toolResult.error}</AlertDescription>
                          </Alert>
                        )}
                        {toolResult.type === "info" && (
                          <Alert variant="default" className="max-w-md">
                            <AlertCircle className="h-5 w-5" />
                            <AlertDescription>{toolResult.message}</AlertDescription>
                          </Alert>
                        )}
                      </>
                    ) : (
                      <div
                        className={`px-4 py-2 rounded-lg ${message.role === "user"
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-gray-200 text-gray-900 rounded-bl-none"
                          }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-3 items-start">
                <Avatar className="h-8 w-8 flex-shrink-0 bg-blue-600">
                  <AvatarFallback className="text-white font-bold">AI</AvatarFallback>
                </Avatar>
                <div className="space-y-2 max-w-md w-full">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
            )}

            <div ref={endRef} />
          </>
        )}
      </div>
    </ScrollArea>
  );
}

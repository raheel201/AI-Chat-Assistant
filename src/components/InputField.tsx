"use client";

import { FormEvent, KeyboardEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send, Loader2 } from "lucide-react";

interface InputFieldProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  disabled: boolean;
}

export default function InputField({
  input,
  handleInputChange,
  handleSubmit,
  disabled,
}: InputFieldProps) {
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !disabled) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="max-w-4xl mx-auto px-4 py-6 border-t bg-background">
        <div className="flex items-end gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            disabled={disabled}
            placeholder="Ask me about weather, F1 races, or stocks..."
            className="flex-1 h-12 text-base resize-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            autoComplete="off"
          />
          <Button
            type="submit"
            disabled={disabled || input.trim().length === 0}
            size="icon"
            className="h-12 w-12 bg-primary hover:bg-primary/90 shrink-0"
          >
            {disabled ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </form>
  );
}

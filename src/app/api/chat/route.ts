import { streamText, tool } from "ai";
import { google } from "@ai-sdk/google";
import { auth } from "@/lib/auth";
import { z } from "zod";
import { getWeather } from "@/app/api/tools/weather";
import { getF1Matches } from "@/app/api/tools/f1-races";
import { getStockPrice } from "@/app/api/tools/stock-price";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!process.env.GEMINI_API_KEY) {
    return new Response("Gemini API key not configured", { status: 500 });
  }

  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return new Response("Invalid messages format", { status: 400 });
    }

    const result = await streamText({
      model: google("gemini-1.5-flash"),
      messages,
      tools: {
        getWeather: tool({
          description: "Get current weather information for a specific location.",
          parameters: z.object({
            location: z.string().describe("City name or location"),
          }),
          execute: async ({ location }: { location: string }) => {
            const data = await getWeather(location);
            return JSON.stringify(data);
          },
        }),
        getF1Matches: tool({
          description: "Get information about the next Formula 1 race.",
          parameters: z.object({}),
          execute: async () => {
            const data = await getF1Matches();
            return JSON.stringify(data);
          },
        }),
        getStockPrice: tool({
          description: "Get current stock price for a specific company.",
          parameters: z.object({
            symbol: z.string().describe("Stock symbol (e.g., AAPL, GOOGL, MSFT)"),
          }),
          execute: async ({ symbol }: { symbol: string }) => {
            const data = await getStockPrice(symbol);
            return JSON.stringify(data);
          },
        }),
      },
      system: `You are a helpful AI assistant with access to real-time data tools. 

You can help users by:
1. Getting weather information for any location
2. Providing information about the next Formula 1 race
3. Checking current stock prices

When a user asks about weather, F1 races, or stocks, use the appropriate tool to get real data and present it clearly.`,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Failed to process chat request" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

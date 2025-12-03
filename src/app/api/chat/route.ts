import { auth } from "@/lib/auth";
import { getWeather } from "@/app/api/tools/weather";
import { getStockPrice } from "@/app/api/tools/stock-price";
import { getF1Matches } from "@/app/api/tools/f1-races";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1];
    const userInput = lastMessage.content.toLowerCase();
    
    console.log("User input:", userInput);
    
    let response = "";
    
    // Check if user explicitly asks for stock
    if (userInput.includes('stock')) {
      console.log("Explicit stock request for:", userInput);
      try {
        const symbol = userInput.replace('stock', '').trim().toUpperCase();
        const stockData = await getStockPrice(symbol);
        response = `📈 Stock Price for ${stockData.symbol}:\n\n` +
                  `Current Price: $${stockData.price.toFixed(2)}\n` +
                  `Change: ${stockData.change > 0 ? '+' : ''}${stockData.change.toFixed(2)} (${stockData.changePercent})\n` +
                  `Last Updated: ${stockData.timestamp}`;
      } catch (error) {
        console.error("Stock API error:", error);
        response = `Sorry, I couldn't get stock data. Please try with a valid stock symbol like AAPL, GOOGL, MSFT.`;
      }
    }
    // Check if user is asking for F1 races
    else if (userInput.includes('f1') || userInput.includes('race') || userInput.includes('formula')) {
      console.log("Detected F1 request");
      try {
        const f1Data = await getF1Matches();
        if ('message' in f1Data) {
          response = `🏎️ F1 Info: ${f1Data.message}`;
        } else {
          response = `🏎️ Next Formula 1 Race:\n\n` +
                    `Race: ${f1Data.raceName}\n` +
                    `Circuit: ${f1Data.circuit}\n` +
                    `Location: ${f1Data.location}\n` +
                    `Date: ${f1Data.date}\n` +
                    `Time: ${f1Data.time}`;
        }
      } catch (error) {
        console.error("F1 API error:", error);
        // Fallback mock data when API is down
        response = `🏎️ Next Formula 1 Race (Mock Data):\n\n` +
                  `Race: Abu Dhabi Grand Prix\n` +
                  `Circuit: Yas Marina Circuit\n` +
                  `Location: Abu Dhabi, UAE\n` +
                  `Date: 2024-12-08\n` +
                  `Time: 13:00 UTC\n\n` +
                  `Note: Live F1 API is currently unavailable.`;
      }
    }
    // For short inputs (1-5 chars), try stock first, then weather
    else if (userInput.length <= 5 && /^[a-zA-Z]+$/.test(userInput)) {
      console.log("Short input - trying stock first:", userInput);
      try {
        const stockData = await getStockPrice(userInput.toUpperCase());
        response = `📈 Stock Price for ${stockData.symbol}:\n\n` +
                  `Current Price: $${stockData.price.toFixed(2)}\n` +
                  `Change: ${stockData.change > 0 ? '+' : ''}${stockData.change.toFixed(2)} (${stockData.changePercent})\n` +
                  `Last Updated: ${stockData.timestamp}`;
      } catch (stockError) {
        console.log("Stock failed, trying weather:", stockError.message);
        try {
          const weatherData = await getWeather(userInput);
          response = `🌤️ Weather in ${weatherData.location}, ${weatherData.country}:\n\n` +
                    `Temperature: ${weatherData.temperature}°C (feels like ${weatherData.feelsLike}°C)\n` +
                    `Condition: ${weatherData.description}\n` +
                    `Humidity: ${weatherData.humidity}%\n` +
                    `Wind: ${weatherData.windSpeed} m/s\n` +
                    `Pressure: ${weatherData.pressure} hPa`;
        } catch (weatherError) {
          response = `Sorry, "${userInput}" is not a valid stock symbol or city name.`;
        }
      }
    }
    // For longer inputs, assume weather
    else if (userInput.includes('weather') || userInput.includes('temperature') || userInput.length > 2) {
      console.log("Detected weather request for:", userInput);
      try {
        const weatherData = await getWeather(userInput.replace('weather', '').trim() || userInput);
        response = `🌤️ Weather in ${weatherData.location}, ${weatherData.country}:\n\n` +
                  `Temperature: ${weatherData.temperature}°C (feels like ${weatherData.feelsLike}°C)\n` +
                  `Condition: ${weatherData.description}\n` +
                  `Humidity: ${weatherData.humidity}%\n` +
                  `Wind: ${weatherData.windSpeed} m/s\n` +
                  `Pressure: ${weatherData.pressure} hPa`;
      } catch (error) {
        response = `Sorry, I couldn't get weather data for "${userInput}". Please try with a valid city name.`;
      }
    }
    else {
      response = `Hello! I can help you with:\n\n🌤️ Weather - just type a city name\n🏎️ F1 races - type "f1" or "race"\n📈 Stock prices - type a stock symbol like AAPL\n\nWhat would you like to know?`;
    }
    
    console.log("Response:", response);
    
    return new Response(JSON.stringify({
      id: Date.now().toString(),
      role: 'assistant',
      content: response
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Failed to process chat request" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

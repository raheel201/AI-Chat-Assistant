import axios from "axios";

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: string;
  timestamp: string;
}

export async function getStockPrice(symbol: string): Promise<StockData> {
  if (!process.env.ALPHA_VANTAGE_API_KEY) {
    throw new Error("ALPHA_VANTAGE_API_KEY not configured");
  }

  try {
    const response = await axios.get("https://www.alphavantage.co/query", {
      params: {
        function: "GLOBAL_QUOTE",
        symbol: symbol.toUpperCase(),
        apikey: process.env.ALPHA_VANTAGE_API_KEY,
      },
      timeout: 10000, // 10 second timeout for stock API
    });

    const quote = response.data["Global Quote"];

    if (!quote || !quote["01. symbol"]) {
      throw new Error(`Stock symbol "${symbol}" not found or no data available`);
    }

    const price = parseFloat(quote["05. price"]);
    const change = parseFloat(quote["09. change"]);

    if (isNaN(price)) {
      throw new Error("Invalid stock price data received from API");
    }

    return {
      symbol: quote["01. symbol"],
      price: price,
      change: change,
      changePercent: quote["10. change percent"],
      timestamp: quote["07. latest trading day"],
    };
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error(`Stock symbol "${symbol}" not found`);
    }
    if (error.code === 'ENOTFOUND' || error.message.includes('timeout')) {
      throw new Error("Stock API temporarily unavailable");
    }
    throw new Error(`Stock API error: ${error.message}`);
  }
}

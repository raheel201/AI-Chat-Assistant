import axios from "axios";
export interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  description: string;
  windSpeed: number;
  icon: string;
}
export async function getWeather(location: string): Promise<WeatherData> {
  if (!process.env.OPENWEATHER_API_KEY) {
    throw new Error("OPENWEATHER_API_KEY not configured");
  }
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: location,
          appid: process.env.OPENWEATHER_API_KEY,
          units: "metric",
        },
        timeout: 5000,
      }
    );
    const { main, weather, wind, name, sys } = response.data;
    return {
      location: name,
      country: sys.country,
      temperature: Math.round(main.temp),
      feelsLike: Math.round(main.feels_like),
      humidity: main.humidity,
      pressure: main.pressure,
      description: weather[0].description,
      icon: weather[0].icon,
      windSpeed: wind.speed,
    };
  } catch (error: unknown) {
    if (error instanceof axios.AxiosError && error.response?.status === 404) {
      throw new Error(`Location "${location}" not found`);
    }
    throw new Error(`Weather API error: ${error instanceof Error ? error.message : String(error)}`);
  }
}

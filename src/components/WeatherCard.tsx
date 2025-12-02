import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Cloud, Droplets, Wind, Thermometer, Gauge } from "lucide-react";

interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  description: string;
  windSpeed: number;
  icon?: string;
}

export default function WeatherCard({ data }: { data: WeatherData }) {
  const getWeatherIcon = (description: string) => {
    const lowerDesc = description.toLowerCase();
    if (lowerDesc.includes('clear')) return '☀️';
    if (lowerDesc.includes('cloud')) return '☁️';
    if (lowerDesc.includes('rain')) return '🌧️';
    if (lowerDesc.includes('snow')) return '❄️';
    if (lowerDesc.includes('thunder')) return '⛈️';
    return '🌤️';
  };

  return (
    <Card className="w-full max-w-md border-0 shadow-xl overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            {getWeatherIcon(data.description)}
            {data.location}, {data.country}
          </CardTitle>
        </div>
        <p className="text-blue-100 capitalize text-lg">{data.description}</p>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Temperature */}
        <div className="text-center space-y-2">
          <div className="flex items-baseline justify-center gap-2">
            <Thermometer className="h-8 w-8 text-blue-500" />
            <span className="text-5xl font-black text-foreground">
              {data.temperature}°
            </span>
            <span className="text-3xl font-bold text-muted-foreground">C</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Feels like {data.feelsLike}°C
          </p>
        </div>

        {/* Weather stats grid */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="flex flex-col items-center p-3 bg-muted rounded-lg space-y-1">
            <Droplets className="h-6 w-6 text-blue-500" />
            <span className="text-lg font-bold">{data.humidity}%</span>
            <span className="text-xs text-muted-foreground">Humidity</span>
          </div>

          <div className="flex flex-col items-center p-3 bg-muted rounded-lg space-y-1">
            <Wind className="h-6 w-6 text-blue-500" />
            <span className="text-lg font-bold">{data.windSpeed} m/s</span>
            <span className="text-xs text-muted-foreground">Wind</span>
          </div>

          <div className="flex flex-col items-center p-3 bg-muted rounded-lg space-y-1">
            <Gauge className="h-6 w-6 text-blue-500" />
            <span className="text-lg font-bold">{data.pressure} hPa</span>
            <span className="text-xs text-muted-foreground">Pressure</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

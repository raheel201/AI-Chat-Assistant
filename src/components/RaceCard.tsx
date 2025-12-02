import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, Flag, Clock } from "lucide-react";

interface RaceData {
  raceName: string;
  round: number;
  circuit: string;
  location: string;
  date: string;
  time: string;
}

export default function RaceCard({ data }: { data: RaceData }) {
  const raceDate = new Date(data.date);
  const formattedDate = raceDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const daysUntilRace = Math.ceil(
    (raceDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Card className="w-full max-w-md border-0 shadow-xl overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Flag className="h-8 w-8" />
            <div>
              <CardTitle className="text-2xl font-black">{data.raceName}</CardTitle>
              <p className="text-red-100 font-semibold">{data.circuit}</p>
            </div>
          </div>
          <Badge className="bg-white/20 backdrop-blur-sm border-white/30 text-white font-bold">
            Round {data.round}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {/* Location */}
        <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <span className="text-lg font-semibold">{data.location}</span>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Date</p>
              <p className="text-lg font-bold">{formattedDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Time</p>
              <p className="text-lg font-bold">
                {data.time === "TBA" ? "TBA" : data.time}
              </p>
            </div>
          </div>
        </div>

        {/* Countdown */}
        <div className="p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-200/50 rounded-xl">
          <p className="text-center text-2xl font-black text-orange-600">
            {daysUntilRace === 0 ? "TODAY!" : `${daysUntilRace} days`}
          </p>
          <p className="text-center text-sm text-muted-foreground">until race day</p>
        </div>
      </CardContent>
    </Card>
  );
}

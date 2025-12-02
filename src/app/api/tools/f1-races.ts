import axios from "axios";

export interface RaceData {
  raceName: string;
  round: number;
  circuit: string;
  location: string;
  date: string;
  time: string;
  message?: string;
}

export async function getF1Matches(): Promise<RaceData | { message: string }> {
  try {
    const currentYear = new Date().getFullYear();
    const response = await axios.get(
      `https://ergast.com/api/f1/${currentYear}.json`,
      { timeout: 5000 }
    );

    const races = response.data.MRData.RaceTable.Races || [];

    if (races.length === 0) {
      return { message: "No races found for this season" };
    }

    // Find the next race that hasn't happened yet
    const nextRace = races.find((race: any) => {
      const raceDate = new Date(race.date);
      return raceDate > new Date();
    });

    if (!nextRace) {
      return {
        message: "No upcoming races found for this season",
      };
    }

    return {
      raceName: nextRace.raceName,
      round: parseInt(nextRace.round, 10),
      circuit: nextRace.Circuit.circuitName,
      location: `${nextRace.Circuit.Location.locality}, ${nextRace.Circuit.Location.country}`,
      date: nextRace.date,
      time: nextRace.time || "TBA",
    };
  } catch (error: any) {
    throw new Error(`F1 API error: ${error.message}`);
  }
}

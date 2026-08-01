const API = "https://intervals.icu/api/v1";

export type RunningStats = {
  recentDistanceKm: number;
  recentRuns: number;
  ytdDistanceKm: number;
};

export type TrainingData = {
  running: RunningStats;
  longestRunKm: number;
  weeklyKm: number[];
  firstWeekStart: string;
};

type Activity = {
  type?: string;
  distance?: number;
  start_date_local?: string;
};

export const WEEKS = 52;
const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_MS = 7 * DAY_MS;
const FOUR_WEEKS_MS = 28 * DAY_MS;
const toKm = (meters: number) => Math.round(meters / 1000);
const dayKey = (ms: number) => new Date(ms).toISOString().slice(0, 10);

export async function getTrainingData(): Promise<TrainingData | null> {
  const apiKey = process.env.INTERVALS_API_KEY;
  if (!apiKey) return null;
  const athleteId = process.env.INTERVALS_ATHLETE_ID ?? "0";

  const now = Date.now();
  const daysSinceMonday = (new Date(now).getUTCDay() + 6) % 7;
  const currentWeekStart = Date.parse(dayKey(now - daysSinceMonday * DAY_MS));
  const firstWeekStart = currentWeekStart - (WEEKS - 1) * WEEK_MS;

  try {
    const res = await fetch(
      `${API}/athlete/${athleteId}/activities?oldest=${dayKey(firstWeekStart)}&fields=type,distance,start_date_local`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`API_KEY:${apiKey}`).toString("base64")}`,
        },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return null;
    const activities: Activity[] = await res.json();

    const weeklyKm = Array.from({ length: WEEKS }, () => 0);
    const recentCutoff = dayKey(now - FOUR_WEEKS_MS);
    const yearStart = `${new Date(now).getUTCFullYear()}-01-01`;
    let recentMeters = 0;
    let recentRuns = 0;
    let ytdMeters = 0;
    let longestMeters = 0;

    for (const activity of activities) {
      const date = activity.start_date_local?.slice(0, 10);
      if (!date || !activity.type?.includes("Run")) continue;

      const meters = activity.distance ?? 0;
      const week = Math.floor((Date.parse(date) - firstWeekStart) / WEEK_MS);
      if (week >= 0 && week < WEEKS) weeklyKm[week] += meters / 1000;

      longestMeters = Math.max(longestMeters, meters);
      if (date >= yearStart) ytdMeters += meters;
      if (date >= recentCutoff) {
        recentMeters += meters;
        recentRuns += 1;
      }
    }

    return {
      running: {
        recentDistanceKm: toKm(recentMeters),
        recentRuns,
        ytdDistanceKm: toKm(ytdMeters),
      },
      longestRunKm: longestMeters / 1000,
      weeklyKm,
      firstWeekStart: dayKey(firstWeekStart),
    };
  } catch {
    return null;
  }
}

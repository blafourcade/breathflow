export interface BoltMeasurement {
  recordedAt: number;
  seconds: number;
  notes?: string;
}

export type BoltCategory = "very_low" | "low" | "moderate" | "good" | "excellent";

export function classifyBolt(seconds: number): BoltCategory {
  if (seconds < 10) return "very_low";
  if (seconds < 20) return "low";
  if (seconds < 30) return "moderate";
  if (seconds < 40) return "good";
  return "excellent";
}

export function boltAdvice(category: BoltCategory): string {
  switch (category) {
    case "very_low":
      return "Significant breathing dysfunction. Focus on gentle nasal breathing and Buteyko light.";
    case "low":
      return "Below average. Coherent breathing and reduced-volume practice recommended.";
    case "moderate":
      return "Average. Maintain practice and add CO2-tolerance work.";
    case "good":
      return "Above average. Suitable for advanced retentions.";
    case "excellent":
      return "Athletic range. You can train all protocols safely.";
  }
}

export function averageBolt(measurements: BoltMeasurement[]): number | null {
  if (measurements.length === 0) return null;
  const sum = measurements.reduce((s, m) => s + m.seconds, 0);
  return sum / measurements.length;
}

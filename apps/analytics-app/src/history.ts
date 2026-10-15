export type HourPoint = {
  label: string;
  views: number;
  readers: number;
  readSeconds: number;
};

export type ArticleTotals = {
  views: number;
  readers: number;
  readSeconds: number;
  peak: HourPoint;
};

function hash(input: string) {
  let value = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    value ^= input.charCodeAt(index);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

export function articleHistory(documentId: string, now = new Date()): HourPoint[] {
  const end = new Date(now);
  end.setMinutes(0, 0, 0);

  return Array.from({length: 24}, (_, index) => {
    const at = new Date(end);
    at.setHours(end.getHours() - (23 - index));
    const noise = hash(`${documentId}:${at.toISOString().slice(0, 13)}`);
    const views = 18 + (noise % 420);
    const readers = Math.max(1, Math.round(views * (0.52 + (noise % 25) / 100)));
    const readSeconds = 40 + (noise % 200);
    const label = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).format(at);
    return {label, views, readers, readSeconds};
  });
}

export function articleTotals(points: HourPoint[]): ArticleTotals {
  const views = points.reduce((sum, point) => sum + point.views, 0);
  const readers = points.reduce((sum, point) => sum + point.readers, 0);
  const readSeconds = Math.round(
    points.reduce((sum, point) => sum + point.readSeconds, 0) / points.length,
  );
  const peak = points.reduce((best, point) => (point.views > best.views ? point : best), points[0]);
  return {views, readers, readSeconds, peak};
}

export function formatCount(value: number) {
  return new Intl.NumberFormat("en", {notation: "compact", maximumFractionDigits: 1}).format(value);
}

export function formatReadTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  if (minutes === 0) return `${remainder}s`;
  return `${minutes}m ${remainder.toString().padStart(2, "0")}s`;
}

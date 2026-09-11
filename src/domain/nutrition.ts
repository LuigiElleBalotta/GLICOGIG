export function formatConfidence(value: number | undefined): string | null {
  if (value === undefined || !Number.isFinite(value)) return null
  return value >= 0 && value <= 1 ? `${Math.round(value * 100)}%` : String(value)
}

const NUMBER_FORMAT = new Intl.NumberFormat('it-IT', { maximumFractionDigits: 1 })

export function formatNumber(value: number | null | undefined): string {
  return value == null || !Number.isFinite(value) ? 'n.d.' : NUMBER_FORMAT.format(value)
}

export function formatConfidence(value: number | undefined): string | null {
  if (value === undefined || !Number.isFinite(value)) return null
  return value >= 0 && value <= 1 ? `${Math.round(value * 100)}%` : String(value)
}

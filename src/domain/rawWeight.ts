const COOKED_NAME_PATTERN = /cott|less|bollit|risott|porridge|polenta/

const RAW_WEIGHT_RULES: ReadonlyArray<{ pattern: RegExp; factor: number }> = [
  { pattern: /pasta.*(fresc|uovo)|(fresc|uovo).*pasta/, factor: 1.9 },
  { pattern: /pasta|spaghett|penne|fusill|rigaton|maccheron|linguin|bucatin|tagliatell|lasagn|trofie|orecchiett|farfall|paccher|vermicell|bucatini|gnocch/, factor: 2.3 },
  { pattern: /venere|riso\s*ner|riso\s*ross|riso\s*integral/, factor: 3.3 },
  { pattern: /risott|\briso\b/, factor: 2.8 },
  { pattern: /couscous|cous cous|bulgur/, factor: 2.8 },
  { pattern: /quinoa/, factor: 2.8 },
  { pattern: /\bfarro\b|\borzo\b|miglio|avena|porridge/, factor: 2.5 },
  { pattern: /polenta|semolino/, factor: 4 },
  { pattern: /lenticch|\bceci\b|fagiol|pisell|\bfave\b|soia|cannellin|borlott|edamam|lupin/, factor: 2.4 },
]

export function normalizeRawWeight(value: number): number {
  if (!Number.isFinite(value)) return 0
  return Math.max(0, Math.min(2000, Math.round(value)))
}

/** Replica fattoreCrudo del modulo Hermes #18399: lowercase, guardia cottura e first-match. */
export function fattoreCrudo(name: string): number | null {
  const normalizedName = (name || '').toLowerCase()
  if (!COOKED_NAME_PATTERN.test(normalizedName)) return null
  return RAW_WEIGHT_RULES.find(({ pattern }) => pattern.test(normalizedName))?.factor ?? null
}

/** Replica grammiCrudi del modulo Hermes #18399 senza introdurre clamp nel helper di dominio. */
export function grammiCrudi(name: string, grams: number): number | null {
  const factor = fattoreCrudo(name)
  return factor === null ? null : Math.round(grams / factor)
}

export function nomeSenzaCottura(name: string): string {
  return (name || '').replace(
    /\s+(cotti al dente|al dente|cotto|cotti|cotta|cotte|lesso|lessa|lessi|lesse|bollito|bollita|bolliti|bollite)\b/gi,
    '',
  ).trim()
}

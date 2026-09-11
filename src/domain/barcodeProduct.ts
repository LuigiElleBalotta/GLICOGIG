import type { BarcodeProductBoundary, ProdottoBarcode } from '../types/barcode'

export const BARCODE_PATTERN = /^\d{6,14}$/

interface CorrezioneCarboidrati {
  carbo100: number | null
  carboCorretto: boolean
}

interface RegolaSecco {
  pattern: RegExp
  target: number
}

const REGOLE_SECCO: readonly RegolaSecco[] = [
  { pattern: /frisell|fresell|freseell/i, target: 72 },
  { pattern: /fett[ae]\s*biscottat/i, target: 75 },
  { pattern: /gallett/i, target: 80 },
  { pattern: /grissin/i, target: 72 },
  { pattern: /\bcracker/i, target: 68 },
  { pattern: /taralli|tarallo|tarallucc/i, target: 68 },
  { pattern: /pane\s*(biscottat|secco|carasau|azzimo)|carasau|pan\s*bauletto\s*tostat|crostin/i, target: 70 },
]

export function normalizzaBarcode(value: string): string | null {
  const barcode = value.trim()
  return BARCODE_PATTERN.test(barcode) ? barcode : null
}

export function num(value: unknown): number | null {
  const parsed = typeof value === 'number' ? value : Number.parseFloat(String(value))
  return Number.isFinite(parsed) ? parsed : null
}

export function porzioneGrammi(value: unknown): number | null {
  if (!value) return null

  const match = String(value).replace(',', '.').match(/([\d.]+)\s*(?:g|ml)\b/i)
  return match ? num(match[1]) : null
}

export function correggiSecco(nome: string, carbo100: number | null): CorrezioneCarboidrati {
  const regola = REGOLE_SECCO.find(({ pattern }) => pattern.test(nome))
  if (!regola) return { carbo100, carboCorretto: false }
  if (carbo100 !== null && carbo100 >= 0.85 * regola.target) {
    return { carbo100, carboCorretto: false }
  }
  return { carbo100: regola.target, carboCorretto: true }
}

function testo(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const normalized = value.trim()
  return normalized || undefined
}

export function prodottoBarcodeDaBoundary(codice: string, raw: BarcodeProductBoundary): ProdottoBarcode {
  const nome = testo(raw.product_name_it) ?? testo(raw.product_name) ?? null
  const marca = testo(raw.brands)?.split(',')[0]?.trim() || undefined
  const immagine = testo(raw.image_front_small_url)
  const nutriments = raw.nutriments ?? {}
  const correzione = correggiSecco(nome ?? '', num(nutriments.carbohydrates_100g))

  return {
    codice,
    nome,
    marca,
    immagine,
    carbo100: correzione.carbo100,
    carboCorretto: correzione.carboCorretto,
    zuccheri100: num(nutriments.sugars_100g),
    fibre100: num(nutriments.fiber_100g),
    proteine100: num(nutriments.proteins_100g),
    grassi100: num(nutriments.fat_100g),
    porzioneG: porzioneGrammi(raw.serving_size),
  }
}

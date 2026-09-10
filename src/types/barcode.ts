export interface BarcodeNutrimentsBoundary {
  carbohydrates_100g?: unknown
  sugars_100g?: unknown
  fiber_100g?: unknown
  proteins_100g?: unknown
  fat_100g?: unknown
}

export interface BarcodeProductBoundary {
  product_name?: unknown
  product_name_it?: unknown
  brands?: unknown
  nutriments?: BarcodeNutrimentsBoundary
  serving_size?: unknown
  image_front_small_url?: unknown
}

export type BarcodeApiResponse =
  | { status: 'found'; product: BarcodeProductBoundary }
  | { status: 'not_found' }

export interface ProdottoBarcode {
  codice: string
  nome: string
  marca?: string
  immagine?: string
  carbo100: number | null
  carboCorretto: boolean
  zuccheri100: number | null
  fibre100: number | null
  proteine100: number | null
  grassi100: number | null
  porzioneG: number | null
}

export type RisultatoBarcode =
  | { status: 'found'; product: ProdottoBarcode }
  | { status: 'not_found' }

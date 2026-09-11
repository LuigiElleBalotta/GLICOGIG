export type CatalogLanguage = 'it' | 'en' | 'es' | 'de' | 'fr'

export interface CatalogRevision {
  da: string
  data: string
  esito: string
  nota: string
}

export interface CatalogRipenessNote {
  sensibile: boolean
  nota: string
}

/** Schema reale del record alimentare embedded nella versione sorgente 1.0.16. */
export interface FoodCatalogEntry {
  id: string
  nome: string
  sinonimi: readonly string[]
  categoria: string
  sottocategoria: string
  origine_geografica: string
  lingua: string
  porzione_standard_g: number
  unita_misura: 'g'
  grammi_per_pezzo?: number
  energia_kcal: number | null
  carboidrati_totali_g: number
  zuccheri_g: number | null
  fibre_g: number | null
  carboidrati_disponibili_g: number
  carboidrati_disponibili_porzione_g: number
  proteine_g: number
  grassi_totali_g: number
  grassi_saturi_g: number | null
  sodio_mg: number
  ig_min: number | null
  ig_medio: number | null
  ig_max: number | null
  ig_affidabilita: string
  carico_glicemico_porzione: number | null
  formula_cg: string
  fascia_impatto: string
  fonte_macro: string
  fonte_macro_descrizione?: string
  fonte_macro_fdcId?: number | null
  fonte_macro_dataType?: string
  fonte_ig: string | null
  ig_da_verificare: boolean
  tipo_dato_macro: string
  tipo_dato_ig: string
  data_aggiornamento: string
  stato_editoriale: string
  maturazione?: CatalogRipenessNote
  nota_curatela?: string
  revisione?: CatalogRevision | null
  ig_variabile?: boolean
  nascondi?: boolean
  nome_en: string
  sinonimi_en: readonly string[]
  categoria_en: string
  sottocategoria_en: string
  nome_es: string
  sinonimi_es: readonly string[]
  categoria_es: string
  sottocategoria_es: string
  nome_de: string
  sinonimi_de: readonly string[]
  categoria_de: string
  sottocategoria_de: string
  nome_fr: string
  sinonimi_fr: readonly string[]
  categoria_fr: string
  sottocategoria_fr: string
}

export interface CatalogSourceMeta {
  descrizione: string
  macro_per: string
  regole_impatto: string
  ig: string
  totale: number
  totale_alimenti: number
  per_categoria: Readonly<Record<string, number>>
  errori: readonly unknown[]
  revisione: {
    descrizione: string
    rivisti: number
    totale_con_ig: number
    data: string
  }
}

export interface FoodCatalogDataset {
  _meta: CatalogSourceMeta
  alimenti: readonly FoodCatalogEntry[]
}

export interface CatalogExtractionMeta {
  sourceFunction: '#17813'
  version: '1.0.16'
  totalEntriesInApk: number
  extractedEntries: number
  evidence: 'VERIFIED'
}

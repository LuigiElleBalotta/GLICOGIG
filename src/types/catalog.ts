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
  energia_kcal: number
  carboidrati_totali_g: number
  zuccheri_g: number
  fibre_g: number
  carboidrati_disponibili_g: number
  carboidrati_disponibili_porzione_g: number
  proteine_g: number
  grassi_totali_g: number
  grassi_saturi_g: number
  sodio_mg: number
  ig_min: number | null
  ig_medio: number | null
  ig_max: number | null
  ig_affidabilita: string
  carico_glicemico_porzione: number | null
  formula_cg: string
  fascia_impatto: string
  fonte_macro: string
  fonte_macro_descrizione: string
  fonte_macro_fdcId: number | null
  fonte_macro_dataType: string
  fonte_ig: string | null
  ig_da_verificare: boolean
  tipo_dato_macro: string
  tipo_dato_ig: string
  data_aggiornamento: string
  stato_editoriale: string
  maturazione?: CatalogRipenessNote
  nota_curatela?: string
  revisione: CatalogRevision | null
}

export interface CatalogExtractionMeta {
  sourceFunction: '#14256'
  sourceOffset: '0x002cd72e'
  totalEntriesInApk: 228
  extractedEntries: number
  evidence: 'VERIFIED'
}

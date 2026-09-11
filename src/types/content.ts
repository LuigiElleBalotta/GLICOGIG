import type { CatalogLanguage } from './catalog'
import type { GlycemicImpactBand } from './nutrition'

export interface RecipeIngredient {
  id: string
  nome: string
  categoria: string
  grammi: number
  grammi_porzione: number
  nome_en: string
  nome_es: string
  nome_de: string
  nome_fr: string
}

export interface RecipeNutritionPerServing {
  kcal: number
  carboidrati_disponibili_g: number
  fibre_g: number
  proteine_g: number
  grassi_g: number
  carico_glicemico: number
  fascia: GlycemicImpactBand
}

export interface RecipeAlternativeOption {
  nome: string
  ig: number
  delta: number
  nome_en?: string
}

export interface RecipeAlternativeGroup {
  gruppo: string
  base: string
  base_ig: number
  opzioni: readonly RecipeAlternativeOption[]
  gruppo_en?: string
}

export interface Recipe {
  id: string
  nome: string
  categoria: string
  pasti: readonly string[]
  attivita: readonly string[]
  porzioni: number
  tempo_prep: number
  tempo_cottura: number
  difficolta: string
  descrizione: string
  ingredienti: readonly RecipeIngredient[]
  procedimento: readonly string[]
  per_porzione: RecipeNutritionPerServing
  alternative: readonly RecipeAlternativeGroup[]
  consigli: readonly string[]
  nome_en: string
  descrizione_en: string
  categoria_en: string
  procedimento_en: readonly string[]
  consigli_en: readonly string[]
  nome_es: string
  descrizione_es: string
  categoria_es: string
  procedimento_es: readonly string[]
  consigli_es: readonly string[]
  nome_de: string
  descrizione_de: string
  categoria_de: string
  procedimento_de: readonly string[]
  consigli_de: readonly string[]
  nome_fr: string
  descrizione_fr: string
  categoria_fr: string
  procedimento_fr: readonly string[]
  consigli_fr: readonly string[]
}

interface LearningLocalizedText {
  testo: string
  testo_en: string
  testo_es: string
  testo_de: string
  testo_fr: string
}

export interface LearningParagraphBlock extends LearningLocalizedText {
  t: 'p'
}

export interface LearningNoteBlock extends LearningLocalizedText {
  t: 'nota'
}

export interface LearningExampleBlock extends LearningLocalizedText {
  t: 'esempio'
  cibo: string
  foodId?: string
  cibo_en: string
  cibo_es: string
  cibo_de: string
  cibo_fr: string
}

export interface LearningPointsBlock {
  t: 'punti'
  voci: readonly string[]
  voci_en: readonly string[]
  voci_es: readonly string[]
  voci_de: readonly string[]
  voci_fr: readonly string[]
}

export interface LearningLinkBlock {
  t: 'link'
  label: string
  url: string
  label_en: string
  label_es: string
  label_de: string
  label_fr: string
}

export type LearningBlock =
  | LearningParagraphBlock
  | LearningNoteBlock
  | LearningExampleBlock
  | LearningPointsBlock
  | LearningLinkBlock

export interface LearningChapter {
  id: string
  num: number
  sezione: string
  titolo: string
  sottotitolo: string
  minuti: number
  blocchi: readonly LearningBlock[]
  titolo_en: string
  sottotitolo_en: string
  titolo_es: string
  sottotitolo_es: string
  titolo_de: string
  sottotitolo_de: string
  titolo_fr: string
  sottotitolo_fr: string
}

export type LearningSections = Readonly<Record<CatalogLanguage, readonly string[]>>

export interface QuizQuestion {
  id: string
  concetto: string
  difficolta: number
  domanda: string
  opzioni: readonly string[]
  corretta: number
  spiegazione: string
  domanda_en: string
  opzioni_en: readonly string[]
  spiegazione_en: string
  domanda_es: string
  opzioni_es: readonly string[]
  spiegazione_es: string
  domanda_de: string
  opzioni_de: readonly string[]
  spiegazione_de: string
  domanda_fr: string
  opzioni_fr: readonly string[]
  spiegazione_fr: string
}

export interface QuizMeta {
  descrizione: string
  formato: string
  stato: 'bozza-da-rivedere'
  aggiornato: string
}

export interface QuizDataset {
  _meta: QuizMeta
  domande: readonly QuizQuestion[]
}

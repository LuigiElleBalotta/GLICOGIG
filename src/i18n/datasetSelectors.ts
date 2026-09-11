import type {
  LearningBlock,
  LearningChapter,
  LearningExampleBlock,
  LearningLinkBlock,
  LearningNoteBlock,
  LearningParagraphBlock,
  LearningPointsBlock,
  LearningSections,
  QuizQuestion,
  Recipe,
  RecipeAlternativeGroup,
  RecipeAlternativeOption,
  RecipeIngredient,
} from '../types/content'
import type { FoodCatalogEntry } from '../types/catalog'
import type { SupportedLanguage } from './languages'

/**
 * Provenienza: questi selector leggono soltanto i campi localizzati dei quattro artefatti
 * verified-1.0.16 (catalogo, ricette, learning e quiz). Non leggono le risorse UI editoriali,
 * non mutano i record sorgente e non traducono ID, numeri o classificazioni canoniche.
 */
export const VERIFIED_DATASET_SELECTOR_PROVENANCE = Object.freeze({
  sourceVersion: '1.0.16',
  evidence: 'VERIFIED',
  fallbackLanguage: 'it',
  mutatesCanonicalRecords: false,
})

type NonItalianLanguage = Exclude<SupportedLanguage, 'it'>
type LocalizedStrings = Partial<Readonly<Record<NonItalianLanguage, string | null | undefined>>>
type LocalizedArrays = Partial<Readonly<Record<NonItalianLanguage, readonly string[] | null | undefined>>>

function hasText(value: string | null | undefined): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function localizedString(
  italian: string,
  localized: LocalizedStrings,
  language: SupportedLanguage,
): string {
  if (language === 'it') return italian
  const candidate = localized[language]
  return hasText(candidate) ? candidate : italian
}

function usableLocalizedArray(
  candidate: readonly string[] | null | undefined,
  italian: readonly string[],
  requireAlignedLength: boolean,
): candidate is readonly string[] {
  return Array.isArray(candidate)
    && candidate.length > 0
    && (!requireAlignedLength || candidate.length === italian.length)
    && candidate.every(hasText)
}

function localizedArray(
  italian: readonly string[],
  localized: LocalizedArrays,
  language: SupportedLanguage,
  requireAlignedLength = false,
): readonly string[] {
  if (language === 'it') return italian
  const candidate = localized[language]
  return usableLocalizedArray(candidate, italian, requireAlignedLength) ? candidate : italian
}

export interface LocalizedFoodView {
  readonly canonical: FoodCatalogEntry
  readonly id: string
  readonly displayName: string
  readonly displaySynonyms: readonly string[]
  readonly categoryLabel: string
  readonly subcategoryLabel: string
}

export function selectFoodDatasetFields(
  food: FoodCatalogEntry,
  language: SupportedLanguage,
): LocalizedFoodView {
  return {
    canonical: food,
    id: food.id,
    displayName: localizedString(food.nome, {
      en: food.nome_en,
      es: food.nome_es,
      de: food.nome_de,
      fr: food.nome_fr,
    }, language),
    displaySynonyms: localizedArray(food.sinonimi, {
      en: food.sinonimi_en,
      es: food.sinonimi_es,
      de: food.sinonimi_de,
      fr: food.sinonimi_fr,
    }, language),
    categoryLabel: localizedString(food.categoria, {
      en: food.categoria_en,
      es: food.categoria_es,
      de: food.categoria_de,
      fr: food.categoria_fr,
    }, language),
    subcategoryLabel: localizedString(food.sottocategoria, {
      en: food.sottocategoria_en,
      es: food.sottocategoria_es,
      de: food.sottocategoria_de,
      fr: food.sottocategoria_fr,
    }, language),
  }
}

export interface LocalizedRecipeIngredientView {
  readonly canonical: RecipeIngredient
  readonly id: string
  readonly displayName: string
}

export interface LocalizedRecipeAlternativeOptionView {
  readonly canonical: RecipeAlternativeOption
  readonly displayName: string
}

export interface LocalizedRecipeAlternativeGroupView {
  readonly canonical: RecipeAlternativeGroup
  readonly groupLabel: string
  readonly options: readonly LocalizedRecipeAlternativeOptionView[]
}

export interface LocalizedRecipeView {
  readonly canonical: Recipe
  readonly id: string
  readonly displayName: string
  readonly description: string
  readonly categoryLabel: string
  readonly steps: readonly string[]
  readonly advice: readonly string[]
  readonly ingredients: readonly LocalizedRecipeIngredientView[]
  readonly alternatives: readonly LocalizedRecipeAlternativeGroupView[]
}

function selectRecipeIngredient(
  ingredient: RecipeIngredient,
  language: SupportedLanguage,
): LocalizedRecipeIngredientView {
  return {
    canonical: ingredient,
    id: ingredient.id,
    displayName: localizedString(ingredient.nome, {
      en: ingredient.nome_en,
      es: ingredient.nome_es,
      de: ingredient.nome_de,
      fr: ingredient.nome_fr,
    }, language),
  }
}

function selectRecipeAlternativeOption(
  option: RecipeAlternativeOption,
  language: SupportedLanguage,
): LocalizedRecipeAlternativeOptionView {
  return {
    canonical: option,
    displayName: localizedString(option.nome, { en: option.nome_en }, language),
  }
}

function selectRecipeAlternativeGroup(
  group: RecipeAlternativeGroup,
  language: SupportedLanguage,
): LocalizedRecipeAlternativeGroupView {
  return {
    canonical: group,
    groupLabel: localizedString(group.gruppo, { en: group.gruppo_en }, language),
    options: group.opzioni.map((option) => selectRecipeAlternativeOption(option, language)),
  }
}

export function selectRecipeDatasetFields(
  recipe: Recipe,
  language: SupportedLanguage,
): LocalizedRecipeView {
  return {
    canonical: recipe,
    id: recipe.id,
    displayName: localizedString(recipe.nome, {
      en: recipe.nome_en,
      es: recipe.nome_es,
      de: recipe.nome_de,
      fr: recipe.nome_fr,
    }, language),
    description: localizedString(recipe.descrizione, {
      en: recipe.descrizione_en,
      es: recipe.descrizione_es,
      de: recipe.descrizione_de,
      fr: recipe.descrizione_fr,
    }, language),
    categoryLabel: localizedString(recipe.categoria, {
      en: recipe.categoria_en,
      es: recipe.categoria_es,
      de: recipe.categoria_de,
      fr: recipe.categoria_fr,
    }, language),
    steps: localizedArray(recipe.procedimento, {
      en: recipe.procedimento_en,
      es: recipe.procedimento_es,
      de: recipe.procedimento_de,
      fr: recipe.procedimento_fr,
    }, language, true),
    advice: localizedArray(recipe.consigli, {
      en: recipe.consigli_en,
      es: recipe.consigli_es,
      de: recipe.consigli_de,
      fr: recipe.consigli_fr,
    }, language, true),
    ingredients: recipe.ingredienti.map((ingredient) => selectRecipeIngredient(ingredient, language)),
    alternatives: recipe.alternative.map((group) => selectRecipeAlternativeGroup(group, language)),
  }
}

export interface LocalizedLearningSectionView {
  readonly index: number
  readonly canonicalName: string
  readonly displayName: string
}

export function selectLearningSections(
  sections: LearningSections,
  language: SupportedLanguage,
): readonly LocalizedLearningSectionView[] {
  return sections.it.map((canonicalName, index) => ({
    index,
    canonicalName,
    displayName: localizedString(canonicalName, {
      en: sections.en[index],
      es: sections.es[index],
      de: sections.de[index],
      fr: sections.fr[index],
    }, language),
  }))
}

export type LocalizedLearningBlockView =
  | { readonly type: 'p'; readonly canonical: LearningParagraphBlock; readonly text: string }
  | { readonly type: 'nota'; readonly canonical: LearningNoteBlock; readonly text: string }
  | { readonly type: 'esempio'; readonly canonical: LearningExampleBlock; readonly text: string; readonly foodLabel: string }
  | { readonly type: 'punti'; readonly canonical: LearningPointsBlock; readonly items: readonly string[] }
  | { readonly type: 'link'; readonly canonical: LearningLinkBlock; readonly label: string }

export function selectLearningBlock(
  block: LearningBlock,
  language: SupportedLanguage,
): LocalizedLearningBlockView {
  if (block.t === 'punti') {
    return {
      type: block.t,
      canonical: block,
      items: localizedArray(block.voci, {
        en: block.voci_en,
        es: block.voci_es,
        de: block.voci_de,
        fr: block.voci_fr,
      }, language, true),
    }
  }
  if (block.t === 'link') {
    return {
      type: block.t,
      canonical: block,
      label: localizedString(block.label, {
        en: block.label_en,
        es: block.label_es,
        de: block.label_de,
        fr: block.label_fr,
      }, language),
    }
  }
  const text = localizedString(block.testo, {
    en: block.testo_en,
    es: block.testo_es,
    de: block.testo_de,
    fr: block.testo_fr,
  }, language)
  if (block.t === 'esempio') {
    return {
      type: block.t,
      canonical: block,
      text,
      foodLabel: localizedString(block.cibo, {
        en: block.cibo_en,
        es: block.cibo_es,
        de: block.cibo_de,
        fr: block.cibo_fr,
      }, language),
    }
  }
  if (block.t === 'nota') return { type: block.t, canonical: block, text }
  return { type: block.t, canonical: block, text }
}

export interface LocalizedLearningChapterView {
  readonly canonical: LearningChapter
  readonly id: string
  readonly title: string
  readonly subtitle: string
  readonly sectionLabel: string
  readonly blocks: readonly LocalizedLearningBlockView[]
}

export function selectLearningChapterDatasetFields(
  chapter: LearningChapter,
  sections: LearningSections,
  language: SupportedLanguage,
): LocalizedLearningChapterView {
  const section = selectLearningSections(sections, language)
    .find(({ canonicalName }) => canonicalName === chapter.sezione)
  return {
    canonical: chapter,
    id: chapter.id,
    title: localizedString(chapter.titolo, {
      en: chapter.titolo_en,
      es: chapter.titolo_es,
      de: chapter.titolo_de,
      fr: chapter.titolo_fr,
    }, language),
    subtitle: localizedString(chapter.sottotitolo, {
      en: chapter.sottotitolo_en,
      es: chapter.sottotitolo_es,
      de: chapter.sottotitolo_de,
      fr: chapter.sottotitolo_fr,
    }, language),
    sectionLabel: section?.displayName ?? chapter.sezione,
    blocks: chapter.blocchi.map((block) => selectLearningBlock(block, language)),
  }
}

export interface LocalizedQuizQuestionView {
  readonly canonical: QuizQuestion
  readonly id: string
  readonly concept: string
  readonly difficulty: number
  readonly correctIndex: number
  readonly question: string
  readonly options: readonly string[]
  readonly explanation: string
}

export function selectQuizQuestionDatasetFields(
  question: QuizQuestion,
  language: SupportedLanguage,
): LocalizedQuizQuestionView {
  return {
    canonical: question,
    id: question.id,
    concept: question.concetto,
    difficulty: question.difficolta,
    correctIndex: question.corretta,
    question: localizedString(question.domanda, {
      en: question.domanda_en,
      es: question.domanda_es,
      de: question.domanda_de,
      fr: question.domanda_fr,
    }, language),
    options: localizedArray(question.opzioni, {
      en: question.opzioni_en,
      es: question.opzioni_es,
      de: question.opzioni_de,
      fr: question.opzioni_fr,
    }, language, true),
    explanation: localizedString(question.spiegazione, {
      en: question.spiegazione_en,
      es: question.spiegazione_es,
      de: question.spiegazione_de,
      fr: question.spiegazione_fr,
    }, language),
  }
}

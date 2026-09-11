import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  CATALOG_ENTRIES,
  LEARNING_CHAPTERS,
  LEARNING_DATASET,
  QUIZ_QUESTIONS,
  RECIPES,
} from '../catalog/datasets'
import type { LearningBlock, LearningChapter } from '../types/content'
import type { DiarySnapshot } from '../types/diary'
import type { MealItem } from '../types/meal'
import {
  editorialStateTranslationKey,
  recipeDifficultyTranslationKey,
  reliabilityTranslationKey,
} from './classificationKeys'
import {
  VERIFIED_DATASET_SELECTOR_PROVENANCE,
  selectFoodDatasetFields,
  selectLearningBlock,
  selectLearningChapterDatasetFields,
  selectLearningSections,
  selectQuizQuestionDatasetFields,
  selectRecipeDatasetFields,
} from './datasetSelectors'
import { selectDiaryEntryName } from './diarySelectors'
import {
  DEFAULT_LANGUAGE,
  FALLBACK_LANGUAGE,
  LANGUAGE_LOCALES,
  LANGUAGE_NATIVE_NAMES,
  SUPPORTED_LANGUAGES,
  isSupportedLanguage,
  resolveSupportedLanguage,
} from './languages'
import { selectMealItemName } from './mealSelectors'
import {
  LANGUAGE_STORAGE_KEY,
  detectInitialLanguage,
  persistLanguage,
  readStoredLanguage,
  syncDocumentLanguage,
} from './persistence'
import { UI_RESOURCE_PROVENANCE, resources } from './resources'

function requiredById<T extends { id: string }>(values: readonly T[], id: string): T {
  const value = values.find((candidate) => candidate.id === id)
  if (!value) throw new Error(`Fixture verified mancante: ${id}`)
  return value
}

function requiredBlock<T extends LearningBlock['t']>(
  chapter: LearningChapter,
  type: T,
): Extract<LearningBlock, { t: T }> {
  const block = chapter.blocchi.find((candidate) => candidate.t === type)
  if (!block) throw new Error(`Blocco ${type} mancante nel capitolo ${chapter.id}`)
  return block as Extract<LearningBlock, { t: T }>
}

function structuralMeal(overrides: Partial<MealItem> = {}): MealItem {
  return {
    source: { kind: 'catalog', foodId: 'structural-food-test-only' },
    name: 'Nome canonico test-only',
    name_en: 'English structural name',
    name_es: 'Nombre estructural',
    name_de: 'Struktureller Name',
    name_fr: 'Nom structurel',
    grams: 0,
    kcal: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
    fibre: 0,
    glycemicLoad: 0,
    band: 'trascurabile',
    unresolved: 0,
    ...overrides,
  }
}

beforeEach(() => {
  window.localStorage.clear()
  document.documentElement.lang = ''
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('lingue, detection e persistenza', () => {
  it('espone la matrice supportata e normalizza tag BCP 47 con fallback italiano', () => {
    expect(SUPPORTED_LANGUAGES).toEqual(['it', 'en', 'es', 'de', 'fr'])
    expect(DEFAULT_LANGUAGE).toBe('it')
    expect(FALLBACK_LANGUAGE).toBe('it')
    expect(LANGUAGE_LOCALES).toEqual({
      it: 'it-IT', en: 'en-GB', es: 'es-ES', de: 'de-DE', fr: 'fr-FR',
    })
    expect(LANGUAGE_NATIVE_NAMES).toEqual({
      it: 'Italiano', en: 'English', es: 'Español', de: 'Deutsch', fr: 'Français',
    })
    expect(isSupportedLanguage('en')).toBe(true)
    expect(isSupportedLanguage('EN')).toBe(false)
    expect([
      resolveSupportedLanguage(' EN_us '),
      resolveSupportedLanguage('fr-CA'),
      resolveSupportedLanguage('pt-BR'),
      resolveSupportedLanguage(null),
    ]).toEqual(['en', 'fr', 'it', 'it'])
  })

  it('dà precedenza allo storage valido e ignora JSON corrotto o lingue non supportate', () => {
    vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue(['de-DE', 'en-US'])
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, JSON.stringify('fr'))
    expect(readStoredLanguage()).toBe('fr')
    expect(detectInitialLanguage()).toBe('fr')

    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, '{rotto')
    expect(readStoredLanguage()).toBeNull()
    expect(detectInitialLanguage()).toBe('de')

    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, JSON.stringify('pt'))
    vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue(['pt-BR', 'es-MX'])
    expect(detectInitialLanguage()).toBe('es')
  })

  it('usa navigator.language solo se languages è assente e tratta un array vuoto come fallback', () => {
    vi.spyOn(window.navigator, 'languages', 'get')
      .mockReturnValueOnce(undefined as unknown as readonly string[])
      .mockReturnValueOnce([])
    vi.spyOn(window.navigator, 'language', 'get').mockReturnValue('fr-CA')
    expect(detectInitialLanguage()).toBe('fr')
    expect(detectInitialLanguage()).toBe('it')
  })

  it('serializza il codice breve, sincronizza il documento e degrada senza eccezioni su storage negato', () => {
    expect(persistLanguage('es')).toBe(true)
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe(JSON.stringify('es'))
    expect(syncDocumentLanguage('DE-de')).toBe('de')
    expect(document.documentElement.lang).toBe('de')

    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage denied')
    })
    expect(readStoredLanguage()).toBeNull()

    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('storage denied')
    })
    expect(persistLanguage('fr')).toBe(false)
  })
})

describe('provenienza, classificazioni e fallback i18next', () => {
  it('separa esplicitamente dataset verified e copy UI editoriale', () => {
    expect(VERIFIED_DATASET_SELECTOR_PROVENANCE).toEqual({
      sourceVersion: '1.0.16',
      evidence: 'VERIFIED',
      fallbackLanguage: 'it',
      mutatesCanonicalRecords: false,
    })
    expect(Object.isFrozen(VERIFIED_DATASET_SELECTOR_PROVENANCE)).toBe(true)
    expect(UI_RESOURCE_PROVENANCE).toEqual({
      kind: 'editorial-ui-copy',
      extractedFromApk: false,
      verifiedDatasetContent: false,
      locales: ['it', 'en', 'es', 'de', 'fr'],
    })
    expect(Object.keys(resources)).toEqual(['it', 'en', 'es', 'de', 'fr'])
  })

  it('mappa solo le classificazioni canoniche note', () => {
    expect(['alta', 'media', 'bassa', 'Alta', null].map(reliabilityTranslationKey)).toEqual([
      'classification.reliability.high',
      'classification.reliability.medium',
      'classification.reliability.low',
      null,
      null,
    ])
    expect(['facile', 'media', 'difficile'].map(recipeDifficultyTranslationKey)).toEqual([
      'classification.difficulty.easy',
      'classification.difficulty.medium',
      null,
    ])
    expect(editorialStateTranslationKey('bozza-da-rivedere')).toBe('classification.editorialState.draftReview')
    expect(editorialStateTranslationKey('pubblicato')).toBeNull()
  })

  it('inizializza il singleton dalla lingua browser, persiste i cambi e ricade su italiano', async () => {
    vi.resetModules()
    vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue(['fr-FR'])
    const i18n = (await import('./index')).default

    expect(i18n.resolvedLanguage).toBe('fr')
    expect(document.documentElement.lang).toBe('fr')
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe(JSON.stringify('fr'))
    expect(i18n.t('classification.reliability.high')).toBe(
      resources.fr.translation.classification.reliability.high,
    )

    await i18n.changeLanguage('en')
    expect(i18n.resolvedLanguage).toBe('en')
    expect(document.documentElement.lang).toBe('en')
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe(JSON.stringify('en'))

    await i18n.changeLanguage('pt-BR')
    expect(i18n.resolvedLanguage).toBe('it')
    expect(document.documentElement.lang).toBe('it')
    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe(JSON.stringify('it'))
    expect(i18n.t('common.actions.retry')).toBe(resources.it.translation.common.actions.retry)
    i18n.off('languageChanged')
  })
})

describe('selector dei dataset verified', () => {
  it('seleziona alimento e fallback campo-per-campo senza mutare il record canonico', () => {
    const food = requiredById(CATALOG_ENTRIES, 'pasta-cotta-al-dente')
    const before = JSON.stringify(food)
    const english = selectFoodDatasetFields(food, 'en')
    const spanish = selectFoodDatasetFields(food, 'es')

    expect(english).toMatchObject({
      canonical: food,
      id: food.id,
      displayName: food.nome_en,
      categoryLabel: food.categoria_en,
      subcategoryLabel: food.sottocategoria_en,
    })
    expect(english.displaySynonyms).toBe(food.sinonimi_en)
    expect(food.sinonimi_es).toHaveLength(0)
    expect(spanish.displaySynonyms).toBe(food.sinonimi)

    const blankName = selectFoodDatasetFields({ ...food, nome_en: '   ' }, 'en')
    expect(blankName.displayName).toBe(food.nome)
    const shortSynonyms = ['Sinonimo strutturale test-only']
    expect(selectFoodDatasetFields({ ...food, sinonimi_en: shortSynonyms }, 'en').displaySynonyms)
      .toBe(shortSynonyms)
    expect(JSON.stringify(food)).toBe(before)
  })

  it('seleziona ricetta, ingredienti e alternative con fallback atomico degli array', () => {
    const recipe = requiredById(RECIPES, 'spaghetti-al-pomodoro')
    const english = selectRecipeDatasetFields(recipe, 'en')
    expect(english.canonical).toBe(recipe)
    expect(english.displayName).toBe(recipe.nome_en)
    expect(english.description).toBe(recipe.descrizione_en)
    expect(english.categoryLabel).toBe(recipe.categoria_en)
    expect(english.steps).toBe(recipe.procedimento_en)
    expect(english.advice).toBe(recipe.consigli_en)
    expect(english.ingredients[0].canonical).toBe(recipe.ingredienti[0])
    expect(english.ingredients[0].displayName).toBe(recipe.ingredienti[0].nome_en)
    expect(english.alternatives[0].canonical).toBe(recipe.alternative[0])
    expect(english.alternatives[0].groupLabel).toBe(recipe.alternative[0].gruppo_en)

    const spanish = selectRecipeDatasetFields(recipe, 'es')
    expect(spanish.alternatives[0].groupLabel).toBe(recipe.alternative[0].gruppo)
    expect(spanish.alternatives[0].options[0].displayName).toBe(recipe.alternative[0].opzioni[0].nome)

    const misaligned = selectRecipeDatasetFields({
      ...recipe,
      procedimento_en: recipe.procedimento_en.slice(0, -1),
      consigli_en: recipe.consigli_en.map((value, index) => index === 0 ? '   ' : value),
    }, 'en')
    expect(misaligned.steps).toBe(recipe.procedimento)
    expect(misaligned.advice).toBe(recipe.consigli)
  })

  it('copre sezioni e tutti i tipi di blocco learning, inclusi fallback allineato e sezione ignota', () => {
    const sections = selectLearningSections(LEARNING_DATASET.sezioni, 'fr')
    expect(sections[0]).toEqual({
      index: 0,
      canonicalName: LEARNING_DATASET.sezioni.it[0],
      displayName: LEARNING_DATASET.sezioni.fr[0],
    })

    const glicemia = requiredById(LEARNING_CHAPTERS, 'glicemia')
    const chapterView = selectLearningChapterDatasetFields(glicemia, LEARNING_DATASET.sezioni, 'en')
    expect(chapterView.canonical).toBe(glicemia)
    expect(chapterView.title).toBe(glicemia.titolo_en)
    expect(chapterView.subtitle).toBe(glicemia.sottotitolo_en)
    expect(chapterView.blocks.map(({ type }) => type)).toEqual(['p', 'p', 'nota', 'esempio'])
    const paragraph = requiredBlock(glicemia, 'p')
    const note = requiredBlock(glicemia, 'nota')
    expect(selectLearningBlock(paragraph, 'en')).toMatchObject({
      type: 'p', text: paragraph.testo_en, canonical: paragraph,
    })
    expect(selectLearningBlock(note, 'en')).toMatchObject({
      type: 'nota', text: note.testo_en, canonical: note,
    })
    expect(selectLearningBlock({ ...paragraph, testo_en: '   ' }, 'en')).toMatchObject({
      type: 'p', text: paragraph.testo,
    })
    const example = requiredBlock(glicemia, 'esempio')
    expect(selectLearningBlock(example, 'en')).toMatchObject({
      type: 'esempio', text: example.testo_en, foodLabel: example.cibo_en, canonical: example,
    })

    const freni = requiredById(LEARNING_CHAPTERS, 'freni')
    const points = requiredBlock(freni, 'punti')
    expect(selectLearningBlock(points, 'es')).toMatchObject({ type: 'punti', items: points.voci_es })
    expect(selectLearningBlock({ ...points, voci_en: points.voci_en.slice(0, -1) }, 'en'))
      .toMatchObject({ type: 'punti', items: points.voci })

    const carboidrati = requiredById(LEARNING_CHAPTERS, 'carboidrati')
    const link = requiredBlock(carboidrati, 'link')
    expect(selectLearningBlock(link, 'de')).toMatchObject({ type: 'link', label: link.label_de })

    const unknownSection = selectLearningChapterDatasetFields(
      { ...glicemia, sezione: 'Sezione strutturale assente' },
      LEARNING_DATASET.sezioni,
      'fr',
    )
    expect(unknownSection.sectionLabel).toBe('Sezione strutturale assente')
  })

  it('preserva metadati quiz e applica fallback atomico alle opzioni localizzate', () => {
    const question = requiredById(QUIZ_QUESTIONS, 'ig-cg-1')
    const english = selectQuizQuestionDatasetFields(question, 'en')
    expect(english).toMatchObject({
      canonical: question,
      id: question.id,
      concept: question.concetto,
      difficulty: question.difficolta,
      correctIndex: question.corretta,
      question: question.domanda_en,
      explanation: question.spiegazione_en,
    })
    expect(english.options).toBe(question.opzioni_en)

    const fallback = selectQuizQuestionDatasetFields({
      ...question,
      opzioni_en: question.opzioni_en.slice(0, -1),
    }, 'en')
    expect(fallback.question).toBe(question.domanda_en)
    expect(fallback.options).toBe(question.opzioni)
  })
})

describe('selector diario e pasto', () => {
  const diaryNames: Pick<DiarySnapshot, 'nome' | 'nome_en' | 'nome_es' | 'nome_de' | 'nome_fr'> = {
    nome: 'Nome canonico',
    nome_en: '  English name  ',
    nome_es: '',
    nome_de: null,
    nome_fr: '   ',
  }

  it('seleziona il nome diario localizzato e ricade sul canonico per campi vuoti', () => {
    expect(selectDiaryEntryName(diaryNames, 'it')).toBe('Nome canonico')
    expect(selectDiaryEntryName(diaryNames, 'en')).toBe('English name')
    expect(selectDiaryEntryName(diaryNames, 'es')).toBe('Nome canonico')
    expect(selectDiaryEntryName(diaryNames, 'de')).toBe('Nome canonico')
    expect(selectDiaryEntryName(diaryNames, 'fr')).toBe('Nome canonico')
  })

  it('localizza solo sorgenti catalog/recipe e preserva nomi acquisiti o manuali', () => {
    expect(selectMealItemName(structuralMeal(), 'en')).toBe('English structural name')
    expect(selectMealItemName(structuralMeal({
      source: { kind: 'recipe', recipeId: 'recipe-structural-test-only', portions: 1 },
      name_en: '   ',
    }), 'en')).toBe('Nome canonico test-only')

    for (const source of [
      { kind: 'photo' as const },
      { kind: 'barcode' as const, code: 'structural-code', foodId: 'structural-food' },
      { kind: 'manual' as const },
    ]) {
      expect(selectMealItemName(structuralMeal({ source }), 'en')).toBe('Nome canonico test-only')
    }
    expect(selectMealItemName(structuralMeal(), 'it')).toBe('Nome canonico test-only')
  })
})

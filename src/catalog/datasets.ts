import catalogJson from '../data/verified-1.0.16-catalog.json'
import learningJson from '../data/verified-1.0.16-learning.json'
import quizJson from '../data/verified-1.0.16-quiz.json'
import recipes01Json from '../data/verified-1.0.16-recipes-01.json'
import recipes02Json from '../data/verified-1.0.16-recipes-02.json'
import recipes03Json from '../data/verified-1.0.16-recipes-03.json'
import type { FoodCatalogDataset } from '../types/catalog'
import type { LearningChapter, LearningSections, QuizDataset, Recipe } from '../types/content'

export interface RecipeDataset {
  _meta: Readonly<Record<string, unknown>>
  ricette: readonly Recipe[]
}

export interface LearningDataset {
  _provenance: Readonly<Record<string, unknown>>
  _validation: Readonly<Record<string, unknown>>
  sezioni: LearningSections
  capitoli: readonly LearningChapter[]
}

const RECIPE_DATASET_01 = recipes01Json as unknown as RecipeDataset
const RECIPE_DATASET_02 = recipes02Json as unknown as RecipeDataset
const RECIPE_DATASET_03 = recipes03Json as unknown as RecipeDataset

/** Unico boundary runtime dei quattro payload VERIFIED estratti dalla versione sorgente 1.0.16. */
export const CATALOG_DATASET = catalogJson as unknown as FoodCatalogDataset
export const RECIPE_DATASET: RecipeDataset = {
  _meta: RECIPE_DATASET_01._meta,
  ricette: [
    ...RECIPE_DATASET_01.ricette,
    ...RECIPE_DATASET_02.ricette,
    ...RECIPE_DATASET_03.ricette,
  ],
}
export const LEARNING_DATASET = learningJson as unknown as LearningDataset
export const QUIZ_DATASET = quizJson as unknown as QuizDataset

export const CATALOG_ENTRIES = CATALOG_DATASET.alimenti
export const RECIPES = RECIPE_DATASET.ricette
export const LEARNING_CHAPTERS = LEARNING_DATASET.capitoli
export const QUIZ_QUESTIONS = QUIZ_DATASET.domande

/** I metadati embedded hanno totali obsoleti: questi sono gli unici conteggi runtime. */
export const DATASET_COUNTS = Object.freeze({
  foods: CATALOG_ENTRIES.length,
  recipes: RECIPES.length,
  learningChapters: LEARNING_CHAPTERS.length,
  quizQuestions: QUIZ_QUESTIONS.length,
})

import catalogJson from '../data/glicoden-1.0.16-catalog.json'
import learningJson from '../data/glicoden-1.0.16-learning.json'
import quizJson from '../data/glicoden-1.0.16-quiz.json'
import recipesJson from '../data/glicoden-1.0.16-recipes.json'
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

/** Unico boundary runtime dei quattro payload VERIFIED estratti da GLICODEN 1.0.16. */
export const CATALOG_DATASET = catalogJson as unknown as FoodCatalogDataset
export const RECIPE_DATASET = recipesJson as unknown as RecipeDataset
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

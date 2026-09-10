import { QUIZ_QUESTIONS } from '../catalog/datasets'
import type { QuizQuestion } from '../types/content'

export const N_AL_GIORNO = 10
const DAY_MS = 86_400_000
const DAILY_SEED = 20_260_807
const OPTION_SEED_FACTOR = 100_003

/** Replica Mulberry32 #19743. */
export function mulberry32(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 1_831_565_813) | 0
    let value = Math.imul(state ^ (state >>> 15), 1 | state)
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296
  }
}

/** Replica hashStr/FNV-1a #19746. */
export function hashQuizQuestionId(value: string): number {
  let hash = 2_166_136_261
  for (let index = 0; index < value.length; index += 1) {
    hash = Math.imul(hash ^ value.charCodeAt(index), 16_777_619)
  }
  return hash >>> 0
}

function shuffledIndexes(length: number, seed: number): number[] {
  const indexes = Array.from({ length }, (_, index) => index)
  const random = mulberry32(seed)
  for (let index = indexes.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1))
    const currentValue = indexes[index]
    indexes[index] = indexes[target]
    indexes[target] = currentValue
  }
  return indexes
}

const DAILY_QUESTION_ORDER = shuffledIndexes(QUIZ_QUESTIONS.length, DAILY_SEED)

/** Cambio giorno a mezzanotte UTC, come giornoIndice #19745. */
export function giornoIndice(date: Date = new Date()): number {
  return Math.floor(date.getTime() / DAY_MS)
}

function reorderOptions(options: readonly string[], order: readonly number[]): string[] {
  return order.map((index) => options[index])
}

/**
 * Corregge il disallineamento upstream applicando la stessa permutazione a IT/EN/ES/DE/FR.
 * Il payload non viene mutato.
 */
export function mescolaOpzioni(question: QuizQuestion, seed: number): QuizQuestion {
  const optionCount = question.opzioni.length
  const localizedOptions = [
    question.opzioni_en,
    question.opzioni_es,
    question.opzioni_de,
    question.opzioni_fr,
  ]
  if (localizedOptions.some((options) => options.length !== optionCount)) {
    throw new Error(`Quiz question ${question.id} has misaligned localized options`)
  }
  if (question.corretta < 0 || question.corretta >= optionCount) {
    throw new Error(`Quiz question ${question.id} has an invalid correct option`)
  }

  const order = shuffledIndexes(optionCount, seed)
  return {
    ...question,
    opzioni: reorderOptions(question.opzioni, order),
    corretta: order.indexOf(question.corretta),
    opzioni_en: reorderOptions(question.opzioni_en, order),
    opzioni_es: reorderOptions(question.opzioni_es, order),
    opzioni_de: reorderOptions(question.opzioni_de, order),
    opzioni_fr: reorderOptions(question.opzioni_fr, order),
  }
}

/** Replica quizDelGiorno #19751 con riallineamento completo delle lingue. */
export function quizDelGiorno(date: Date = new Date()): QuizQuestion[] {
  const day = giornoIndice(date)
  const base = (day * N_AL_GIORNO) % DAILY_QUESTION_ORDER.length
  const questions: QuizQuestion[] = []

  for (let offset = 0; offset < N_AL_GIORNO; offset += 1) {
    const orderIndex = (base + offset) % DAILY_QUESTION_ORDER.length
    const question = QUIZ_QUESTIONS[DAILY_QUESTION_ORDER[orderIndex]]
    const seed = ((day * OPTION_SEED_FACTOR) + hashQuizQuestionId(question.id)) >>> 0
    questions.push(mescolaOpzioni(question, seed))
  }
  return questions
}

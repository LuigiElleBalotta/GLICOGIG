import { giornoIndice } from '../domain/dailyQuiz'
import { getJSON, setJSON } from './localJson'

export const QUIZ_STORAGE_KEYS = {
  ultimoGiorno: 'quiz_ultimo_giorno',
  streak: 'quiz_streak',
  record: 'quiz_record',
  scoreOggi: 'quiz_score_oggi',
} as const

export interface QuizState {
  fattoOggi: boolean
  streak: number
  record: number
  scoreOggi: number | null
}

function storedNumber(key: string, fallback: number): number {
  const value = getJSON<unknown>(key, fallback)
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

/** Stato del quiz rispetto al giorno UTC usato da dailyQuiz. */
export function statoQuiz(date: Date = new Date()): QuizState {
  const today = giornoIndice(date)
  const lastDay = storedNumber(QUIZ_STORAGE_KEYS.ultimoGiorno, Number.NaN)
  const storedStreak = storedNumber(QUIZ_STORAGE_KEYS.streak, 0)
  const best = storedNumber(QUIZ_STORAGE_KEYS.record, 0)
  const todayScore = storedNumber(QUIZ_STORAGE_KEYS.scoreOggi, -1)
  const doneToday = lastDay === today
  const streakIsCurrent = doneToday || lastDay === today - 1

  return {
    fattoOggi: doneToday,
    streak: streakIsCurrent ? storedStreak : 0,
    record: best,
    scoreOggi: doneToday && todayScore >= 0 ? todayScore : null,
  }
}

/** Salva il risultato senza incrementare due volte la streak nello stesso giorno. */
export function salvaRisultato(score: number, date: Date = new Date()): QuizState {
  const today = giornoIndice(date)
  const lastDay = storedNumber(QUIZ_STORAGE_KEYS.ultimoGiorno, Number.NaN)
  const previousStreak = storedNumber(QUIZ_STORAGE_KEYS.streak, 0)
  const previousBest = storedNumber(QUIZ_STORAGE_KEYS.record, 0)
  let nextStreak = previousStreak

  if (lastDay !== today) {
    nextStreak = lastDay === today - 1 ? previousStreak + 1 : 1
    setJSON(QUIZ_STORAGE_KEYS.ultimoGiorno, today)
    setJSON(QUIZ_STORAGE_KEYS.streak, nextStreak)
  }

  setJSON(QUIZ_STORAGE_KEYS.scoreOggi, score)
  const nextBest = score > previousBest ? score : previousBest
  if (nextBest !== previousBest) setJSON(QUIZ_STORAGE_KEYS.record, nextBest)

  return {
    fattoOggi: true,
    streak: nextStreak,
    record: nextBest,
    scoreOggi: score >= 0 ? score : null,
  }
}

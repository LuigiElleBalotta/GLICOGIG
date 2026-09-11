export type ReliabilityTranslationKey =
  | 'classification.reliability.high'
  | 'classification.reliability.medium'
  | 'classification.reliability.low'

export type RecipeDifficultyTranslationKey =
  | 'classification.difficulty.easy'
  | 'classification.difficulty.medium'

export type EditorialStateTranslationKey = 'classification.editorialState.draftReview'

export function reliabilityTranslationKey(value: string | null | undefined): ReliabilityTranslationKey | null {
  if (value === 'alta') return 'classification.reliability.high'
  if (value === 'media') return 'classification.reliability.medium'
  if (value === 'bassa') return 'classification.reliability.low'
  return null
}

export function recipeDifficultyTranslationKey(value: string): RecipeDifficultyTranslationKey | null {
  if (value === 'facile') return 'classification.difficulty.easy'
  if (value === 'media') return 'classification.difficulty.medium'
  return null
}

export function editorialStateTranslationKey(value: string): EditorialStateTranslationKey | null {
  return value === 'bozza-da-rivedere' ? 'classification.editorialState.draftReview' : null
}

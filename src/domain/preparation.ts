const OVERCOOKED_PATTERN = /stracott|\bscott|molto cott|ben cott|puree|pur[eè]|passat|frullat|schiacciat|vellutat|omogeneizzat/
const COOLED_PATTERN = /freddo|raffredd|avanzo|giorno prima|riposat/
const ACID_PATTERN = /aceto|limone|acidul/

/** Replica esatta di aggiustaIGperPreparazione #18406. */
export function aggiustaIGperPreparazione(
  glycemicIndex: number,
  preparation?: string | null,
  name?: string | null,
): number {
  const description = `${preparation || ''} ${name || ''}`.toLowerCase()
  let factor = /al dente/.test(description) ? 0.9 : 1
  if (OVERCOOKED_PATTERN.test(description)) factor *= 1.15
  if (COOLED_PATTERN.test(description)) factor *= 0.88
  if (ACID_PATTERN.test(description)) factor *= 0.92
  if (factor === 1) return glycemicIndex

  const boundedVariation = Math.max(
    glycemicIndex - 25,
    Math.min(glycemicIndex + 25, glycemicIndex * factor),
  )
  return Math.max(1, Math.min(100, Math.round(boundedVariation)))
}

export const adjustGlycemicIndexForPreparation = aggiustaIGperPreparazione

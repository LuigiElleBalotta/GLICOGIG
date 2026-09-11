import type { DiarySnapshot } from '../types/diary'
import type { SupportedLanguage } from './languages'

type DiaryNameFields = Pick<
  DiarySnapshot,
  'nome' | 'nome_en' | 'nome_es' | 'nome_de' | 'nome_fr'
>

/**
 * Seleziona soltanto un nome già persistito. Il fallback resta il nome canonico italiano;
 * i nomi inseriti dall’utente restano invariati perché la rinomina li replica nei campi lingua.
 */
export function selectDiaryEntryName(
  entry: DiaryNameFields,
  language: SupportedLanguage,
): string {
  const localized = language === 'en'
    ? entry.nome_en
    : language === 'es'
      ? entry.nome_es
      : language === 'de'
        ? entry.nome_de
        : language === 'fr'
          ? entry.nome_fr
          : entry.nome
  return localized?.trim() || entry.nome
}

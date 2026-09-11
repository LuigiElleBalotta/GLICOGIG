import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getFoodByCatalogId } from '../catalog/foodCatalog'
import {
  LEARNING_CHAPTERS,
  LEARNING_DATASET,
  QUIZ_DATASET,
} from '../catalog/datasets'
import {
  AlertIcon,
  BookOpenIcon,
  CheckIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  TrophyIcon,
} from '../components/Icons'
import { giornoIndice, quizDelGiorno } from '../domain/dailyQuiz'
import { editorialStateTranslationKey } from '../i18n/classificationKeys'
import {
  selectLearningChapterDatasetFields,
  selectLearningSections,
  selectQuizQuestionDatasetFields,
  type LocalizedLearningBlockView,
} from '../i18n/datasetSelectors'
import { LANGUAGE_LOCALES, resolveSupportedLanguage } from '../i18n/languages'
import { useDayKey } from '../lib/useDayKey'
import { QUIZ_STORAGE_KEYS, salvaRisultato, statoQuiz, type QuizState } from '../storage/quizStore'
import type { LearningBlock, LearningChapter, QuizQuestion } from '../types/content'

const EXCLUDED_CONTENT = /\b(fabio|autore|libro|instagram|facebook|tiktok|youtube|telegram|whatsapp|social|premium|plus|abbon\w*|acquist\w*|compr\w*|shop|referral|paywall)\b/i

function shouldExclude(value: string): boolean {
  return EXCLUDED_CONTENT.test(value)
}

function safeExternalUrl(value: string): string | null {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && !shouldExclude(`${url.hostname} ${url.pathname}`) ? url.toString() : null
  } catch {
    return null
  }
}

function formatInteger(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value)
}

function quizResultPersisted(score: number, state: QuizState): boolean {
  try {
    const readNumber = (key: string): number | null => {
      const raw = window.localStorage.getItem(key)
      const value: unknown = raw === null ? null : JSON.parse(raw)
      return typeof value === 'number' && Number.isFinite(value) ? value : null
    }
    return readNumber(QUIZ_STORAGE_KEYS.ultimoGiorno) === giornoIndice()
      && readNumber(QUIZ_STORAGE_KEYS.scoreOggi) === score
      && readNumber(QUIZ_STORAGE_KEYS.streak) === state.streak
      && readNumber(QUIZ_STORAGE_KEYS.record) === state.record
  } catch {
    return false
  }
}

function visibleBlock(block: LearningBlock): boolean {
  if (block.t === 'punti') return !shouldExclude(block.voci.join(' '))
  if (block.t === 'link') return !shouldExclude(`${block.label} ${block.url}`) && safeExternalUrl(block.url) !== null
  if (block.t === 'esempio') return !shouldExclude(`${block.testo} ${block.cibo}`)
  return !shouldExclude(block.testo)
}

function BlockRenderer({ block }: { block: LocalizedLearningBlockView }) {
  const { t } = useTranslation()

  if (block.type === 'p') return <p className="text-sm leading-7 text-muted">{block.text}</p>
  if (block.type === 'nota') return <aside className="rounded-2xl border border-amber/25 bg-amber-soft p-4 text-sm leading-6 text-amber">{block.text}</aside>
  if (block.type === 'esempio') {
    const food = block.canonical.foodId ? getFoodByCatalogId(block.canonical.foodId) : undefined
    const content = <><p className="section-label text-mint">{t('learn.block.example', { food: block.foodLabel })}</p><p className="mt-2 text-sm leading-6 text-ink">{block.text}</p>{food && <span className="mt-3 inline-flex items-center gap-1 text-xs font-extrabold text-brand">{t('learn.block.openFood', { food: block.foodLabel })} <ChevronRightIcon className="size-4" /></span>}</>
    return food ? <a className="block rounded-2xl border border-mint/25 bg-mint-soft p-4 transition hover:border-brand/45" href={`#search/${encodeURIComponent(food.id)}`}>{content}</a> : <aside className="rounded-2xl border border-mint/25 bg-mint-soft p-4">{content}</aside>
  }
  if (block.type === 'punti') return <ul className="space-y-2 rounded-2xl border border-line bg-surface p-4 text-sm leading-6 text-ink">{block.items.map((item, index) => ({ item, index })).filter(({ index }) => !shouldExclude(block.canonical.voci[index])).map(({ item, index }) => <li className="flex gap-2" key={`${index}-${item}`}><CheckIcon className="mt-1 size-4 shrink-0 text-mint" /><span>{item}</span></li>)}</ul>
  if (block.type === 'link') {
    const url = safeExternalUrl(block.canonical.url)
    return url ? <a className="inline-flex items-center gap-2 text-sm font-bold text-brand underline decoration-brand/35 underline-offset-4" href={url} target="_blank" rel="noopener noreferrer">{block.label} <ExternalLinkIcon className="size-4" /></a> : null
  }
  const exhaustive: never = block
  return exhaustive
}

function ChapterDetail({ chapter, ordinal }: { chapter: LearningChapter; ordinal: number }) {
  const { t, i18n } = useTranslation()
  const language = resolveSupportedLanguage(i18n.resolvedLanguage ?? i18n.language)
  const locale = LANGUAGE_LOCALES[language]
  const localizedChapter = selectLearningChapterDatasetFields(chapter, LEARNING_DATASET.sezioni, language)
  const blocks = localizedChapter.blocks.filter((_, index) => visibleBlock(chapter.blocchi[index]))
  const formattedOrdinal = formatInteger(ordinal, locale)
  const formattedMinutes = formatInteger(chapter.minuti, locale)

  return (
    <div>
      <a className="mb-4 inline-flex text-sm font-bold text-brand" href="#learn">{t('learn.chapter.backAll')}</a>
      <article className="app-card rounded-3xl border border-brand/35 bg-paper p-5 shadow-card sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="section-label">{t('learn.chapter.kicker', { ordinal: formattedOrdinal, section: localizedChapter.sectionLabel })}</p><h1 className="mt-1 text-3xl font-extrabold text-ink">{localizedChapter.title}</h1><p className="mt-2 text-sm leading-6 text-muted">{localizedChapter.subtitle}</p></div><span className="status-badge">{t('learn.list.chapter', { ordinal: formattedOrdinal, minutes: formattedMinutes })}</span></div>
        <div className="mt-6 space-y-4">{blocks.map((block, index) => <BlockRenderer block={block} key={`${block.type}-${index}`} />)}{!blocks.length && <p className="text-sm text-muted">{t('learn.chapter.empty')}</p>}</div>
      </article>
      <p className="mt-5 rounded-2xl border border-line bg-surface p-4 text-xs leading-5 text-muted">{t('learn.chapter.disclaimer')}</p>
    </div>
  )
}

function DailyQuiz() {
  const { t, i18n } = useTranslation()
  const language = resolveSupportedLanguage(i18n.resolvedLanguage ?? i18n.language)
  const locale = LANGUAGE_LOCALES[language]
  const editorialStateKey = editorialStateTranslationKey(QUIZ_DATASET._meta.stato)
  const editorialState = editorialStateKey ? t(editorialStateKey) : t('common.labels.notAvailable')
  const [questions] = useState<QuizQuestion[]>(() => quizDelGiorno())
  const localizedQuestions = useMemo(
    () => questions.map((question) => selectQuizQuestionDatasetFields(question, language)),
    [language, questions],
  )
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [quizState, setQuizState] = useState<QuizState>(() => statoQuiz())
  const [finished, setFinished] = useState(false)
  const [persistenceConfirmed, setPersistenceConfirmed] = useState<boolean | null>(null)
  const question = localizedQuestions[current]
  const answer = question ? answers[question.id] : undefined
  const score = useMemo(() => questions.reduce((total, item) => total + (answers[item.id] === item.corretta ? 1 : 0), 0), [answers, questions])

  function choose(option: number): void {
    if (!question || answer !== undefined || finished) return
    setAnswers((currentAnswers) => ({ ...currentAnswers, [question.id]: option }))
  }

  function finish(): void {
    const savedState = salvaRisultato(score)
    setQuizState(savedState)
    setPersistenceConfirmed(quizResultPersisted(score, savedState))
    setFinished(true)
  }

  if (!question) return <p className="empty-card">{t('learn.quiz.unavailable')}</p>

  return (
    <div><a className="mb-4 inline-flex text-sm font-bold text-brand" href="#learn">{t('learn.quiz.back')}</a><section className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="section-label">{t('learn.quiz.kicker')}</p><h1 className="mt-1 text-2xl font-extrabold text-ink">{t('learn.quiz.title')}</h1></div><div className="flex gap-2"><span className="status-badge"><TrophyIcon className="size-4" /> {t('learn.quiz.streak', { count: formatInteger(quizState.streak, locale) })}</span><span className="status-badge">{t('learn.quiz.record', { score: formatInteger(quizState.record, locale) })}</span></div></div>
      <p className="mt-5 rounded-2xl border border-amber/25 bg-amber-soft p-4 text-sm leading-6 text-amber"><AlertIcon className="mr-2 inline size-4" />{t('learn.quiz.editorialState', { state: editorialState })}</p>
      {finished ? <div className="mt-6 rounded-3xl border border-mint/25 bg-mint-soft p-7 text-center"><TrophyIcon className="mx-auto size-12 text-mint" /><p className="mt-4 section-label text-mint">{t(persistenceConfirmed ? 'learn.quiz.saved' : 'learn.quiz.sessionOnly')}</p><strong className="mt-2 block text-5xl text-ink">{formatInteger(score, locale)}/{formatInteger(10, locale)}</strong><p className="mt-3 text-sm text-muted">{t('learn.quiz.resultMeta', { record: formatInteger(quizState.record, locale), streak: formatInteger(quizState.streak, locale) })}</p>{persistenceConfirmed === false && <p className="mt-3 text-xs text-coral">{t('learn.quiz.persistenceError')}</p>}</div> : <div className="mt-6"><div className="flex items-center justify-between gap-3 text-xs text-muted"><span>{t('learn.quiz.progress', { current: formatInteger(current + 1, locale), total: formatInteger(questions.length, locale) })}</span><span>{t('learn.quiz.difficulty', { value: formatInteger(question.difficulty, locale) })}</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line"><span className="block h-full rounded-full bg-brand" style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></div><h2 className="mt-5 text-xl font-extrabold leading-8 text-ink">{question.question}</h2><div className="mt-4 grid gap-2">{question.options.map((option, index) => { const selected = answer === index; const correct = answer !== undefined && question.correctIndex === index; const wrong = selected && answer !== question.correctIndex; return <button className={`rounded-2xl border p-4 text-left text-sm font-semibold transition ${correct ? 'border-mint bg-mint-soft text-mint' : wrong ? 'border-coral bg-coral-soft text-coral' : 'border-line bg-surface text-ink hover:border-brand/50'}`} type="button" onClick={() => choose(index)} disabled={answer !== undefined} key={`${index}-${option}`}>{option}</button> })}</div>{answer !== undefined && <div className={`mt-4 rounded-2xl p-4 text-sm leading-6 ${answer === question.correctIndex ? 'bg-mint-soft text-mint' : 'bg-coral-soft text-coral'}`}><strong>{t(answer === question.correctIndex ? 'learn.quiz.correct' : 'learn.quiz.incorrect')}</strong> <span className="text-ink">{question.explanation}</span></div>}{answer !== undefined && <div className="mt-4 flex justify-end">{current < questions.length - 1 ? <button className="primary-button" type="button" onClick={() => setCurrent((value) => value + 1)}>{t('learn.quiz.next')}</button> : <button className="primary-button" type="button" onClick={finish}>{t('learn.quiz.finish')}</button>}</div>}</div>}
      {quizState.fattoOggi && !finished && <p className="mt-4 text-xs text-muted">{quizState.scoreOggi === null ? t('learn.quiz.completedToday') : t('learn.quiz.completedTodayScore', { score: formatInteger(quizState.scoreOggi, locale) })}</p>}
    </section></div>
  )
}

export default function LearnScreen({ chapterId }: { chapterId?: string }) {
  const { t, i18n } = useTranslation()
  const language = resolveSupportedLanguage(i18n.resolvedLanguage ?? i18n.language)
  const locale = LANGUAGE_LOCALES[language]
  const quizDay = useDayKey('utc')
  const sections = selectLearningSections(LEARNING_DATASET.sezioni, language)
  const chapter = chapterId && chapterId !== 'quiz' ? LEARNING_CHAPTERS.find(({ id }) => id === chapterId) : undefined
  const ordinal = chapter ? LEARNING_CHAPTERS.findIndex(({ id }) => id === chapter.id) + 1 : 0

  if (chapterId === 'quiz') return <DailyQuiz key={quizDay} />
  if (chapterId) return chapter ? <ChapterDetail chapter={chapter} ordinal={ordinal} /> : <div><a className="text-sm font-bold text-brand" href="#learn">{t('learn.quiz.back')}</a><p className="empty-card mt-4">{t('learn.chapter.missing')}</p></div>

  return (
    <div>
      <section className="mb-6 px-1"><p className="screen-kicker">{t('learn.list.kicker', { chapters: formatInteger(LEARNING_CHAPTERS.length, locale), sections: formatInteger(sections.length, locale) })}</p><h1 className="screen-title">{t('learn.list.title')} <span className="text-brand">{t('learn.list.accent')}</span></h1><p className="screen-subtitle">{t('learn.list.subtitle')}</p></section>
      <a className="group mb-5 flex items-center justify-between rounded-3xl border border-amber/30 bg-amber-soft p-5" href="#learn/quiz"><div className="flex items-center gap-3"><TrophyIcon className="size-8 text-amber" /><div><p className="section-label text-amber">{t('learn.list.dailyQuiz')}</p><h2 className="mt-1 text-xl font-extrabold text-ink">{t('learn.list.quizDataset')}</h2></div></div><ChevronRightIcon className="size-6 text-amber" /></a>
      <div className="space-y-6">{sections.map((section, sectionIndex) => { const chapters = LEARNING_CHAPTERS.filter(({ sezione }) => sezione === section.canonicalName); return <section className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-6" key={section.canonicalName}><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-2xl bg-brand-soft text-sm font-black text-brand">{formatInteger(sectionIndex + 1, locale)}</span><div><p className="section-label">{t('learn.list.section', { number: formatInteger(sectionIndex + 1, locale) })}</p><h2 className="mt-1 text-2xl font-extrabold text-ink">{section.displayName}</h2></div></div><div className="mt-4 grid gap-2 sm:grid-cols-2">{chapters.map((item) => { const itemOrdinal = LEARNING_CHAPTERS.findIndex(({ id }) => id === item.id) + 1; const localizedItem = selectLearningChapterDatasetFields(item, LEARNING_DATASET.sezioni, language); return <a className="group rounded-2xl border border-line bg-surface p-4 transition hover:border-brand/45" href={`#learn/${encodeURIComponent(item.id)}`} key={item.id}><span className="flex items-start justify-between gap-3"><span className="text-xs font-bold text-brand">{t('learn.list.chapter', { ordinal: formatInteger(itemOrdinal, locale), minutes: formatInteger(item.minuti, locale) })}</span><ChevronRightIcon className="size-4 shrink-0 text-muted group-hover:text-brand" /></span><strong className="mt-2 block text-ink">{localizedItem.title}</strong><span className="mt-1 block text-xs leading-5 text-muted">{localizedItem.subtitle}</span></a> })}</div></section> })}</div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4"><p className="flex items-center gap-2 text-xs leading-5 text-muted"><BookOpenIcon className="size-5 text-brand" />{t('learn.list.footer')}</p><a className="text-xs font-bold text-brand underline" href="#explanation">{t('learn.list.method')}</a></div>
    </div>
  )
}

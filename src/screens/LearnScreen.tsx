import { useMemo, useState } from 'react'
import {
  LEARNING_CHAPTERS,
  LEARNING_DATASET,
  QUIZ_DATASET,
} from '../catalog/datasets'
import {
  AlertIcon,
  BookOpenIcon,
  CheckIcon,
  ExternalLinkIcon,
  TrophyIcon,
} from '../components/Icons'
import { giornoIndice, quizDelGiorno } from '../domain/dailyQuiz'
import { useDayKey } from '../lib/useDayKey'
import { QUIZ_STORAGE_KEYS, salvaRisultato, statoQuiz, type QuizState } from '../storage/quizStore'
import type {
  LearningBlock,
  LearningChapter,
  QuizQuestion,
} from '../types/content'

const EXCLUDED_CONTENT = /\b(fabio|autore|libro|instagram|facebook|tiktok|youtube|telegram|whatsapp|social|premium|plus|abbon\w*|acquist\w*|compr\w*|shop|referral|paywall)\b/i

function rebrand(value: string): string {
  return value.replace(/GLICODEN/gi, 'GLICOGIG')
}

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

function BlockRenderer({ block }: { block: LearningBlock }) {
  if (block.t === 'p') return <p className="text-sm leading-7 text-muted">{rebrand(block.testo)}</p>
  if (block.t === 'nota') return <aside className="rounded-2xl border border-amber/25 bg-amber-soft p-4 text-sm leading-6 text-amber">{rebrand(block.testo)}</aside>
  if (block.t === 'esempio') return <aside className="rounded-2xl border border-mint/25 bg-mint-soft p-4"><p className="section-label text-mint">Esempio · {rebrand(block.cibo)}</p><p className="mt-2 text-sm leading-6 text-ink">{rebrand(block.testo)}</p></aside>
  if (block.t === 'punti') return <ul className="space-y-2 rounded-2xl border border-line bg-surface p-4 text-sm leading-6 text-ink">{block.voci.filter((item) => !shouldExclude(item)).map((item) => <li className="flex gap-2" key={item}><CheckIcon className="mt-1 size-4 shrink-0 text-mint" /><span>{rebrand(item)}</span></li>)}</ul>
  if (block.t === 'link') {
    const url = safeExternalUrl(block.url)
    return url ? <a className="inline-flex items-center gap-2 text-sm font-bold text-brand underline decoration-brand/35 underline-offset-4" href={url} target="_blank" rel="noopener noreferrer">{rebrand(block.label)} <ExternalLinkIcon className="size-4" /></a> : null
  }
  const exhaustive: never = block
  return exhaustive
}

function ChapterDetail({ chapter }: { chapter: LearningChapter }) {
  const blocks = chapter.blocchi.filter(visibleBlock)
  return (
    <article className="app-card rounded-3xl border border-brand/35 bg-paper p-5 shadow-card sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="section-label">Capitolo {chapter.num} · {chapter.sezione}</p><h2 className="mt-1 text-3xl font-extrabold text-ink">{rebrand(chapter.titolo)}</h2><p className="mt-2 text-sm leading-6 text-muted">{rebrand(chapter.sottotitolo)}</p></div><span className="status-badge">{chapter.minuti} min</span></div>
      <div className="mt-6 space-y-4">{blocks.map((block, index) => <BlockRenderer block={block} key={`${block.t}-${index}`} />)}{!blocks.length && <p className="text-sm text-muted">I blocchi personali o commerciali di questo capitolo sono stati esclusi.</p>}</div>
    </article>
  )
}

function DailyQuiz() {
  const [questions] = useState<QuizQuestion[]>(() => quizDelGiorno())
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [quizState, setQuizState] = useState<QuizState>(() => statoQuiz())
  const [finished, setFinished] = useState(false)
  const [persistenceConfirmed, setPersistenceConfirmed] = useState<boolean | null>(null)
  const question = questions[current]
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

  if (!question) return <p className="empty-card">Quiz quotidiano non disponibile.</p>

  return (
    <section className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><p className="section-label">Quiz quotidiano · 10 domande</p><h2 className="mt-1 text-2xl font-extrabold text-ink">Metti alla prova ciò che sai</h2></div>
        <div className="flex gap-2"><span className="status-badge"><TrophyIcon className="size-4" /> Streak {quizState.streak}</span><span className="status-badge">Record {quizState.record}/10</span></div>
      </div>

      <p className="mt-5 rounded-2xl border border-amber/25 bg-amber-soft p-4 text-sm leading-6 text-amber"><AlertIcon className="mr-2 inline size-4" />Stato editoriale: <strong>{QUIZ_DATASET._meta.stato}</strong>. Le domande sono contenuto educativo embedded ancora da revisionare, non indicazioni cliniche.</p>

      {finished ? (
        <div className="mt-6 rounded-3xl border border-mint/25 bg-mint-soft p-7 text-center"><TrophyIcon className="mx-auto size-12 text-mint" /><p className="mt-4 section-label text-mint">{persistenceConfirmed ? 'Risultato salvato in locale' : 'Risultato disponibile in questa sessione'}</p><strong className="mt-2 block text-5xl text-ink">{score}/10</strong><p className="mt-3 text-sm text-muted">Record {quizState.record}/10 · streak {quizState.streak}</p>{persistenceConfirmed === false && <p className="mt-3 text-xs text-coral">Il browser non ha confermato la persistenza nel localStorage.</p>}</div>
      ) : (
        <div className="mt-6">
          <div className="flex items-center justify-between gap-3 text-xs text-muted"><span>Domanda {current + 1} di {questions.length}</span><span>Difficoltà {question.difficolta}</span></div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line"><span className="block h-full rounded-full bg-brand" style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></div>
          <h3 className="mt-5 text-xl font-extrabold leading-8 text-ink">{rebrand(question.domanda)}</h3>
          <div className="mt-4 grid gap-2">
            {question.opzioni.map((option, index) => {
              const selected = answer === index
              const correct = answer !== undefined && question.corretta === index
              const wrong = selected && answer !== question.corretta
              return <button className={`rounded-2xl border p-4 text-left text-sm font-semibold transition ${correct ? 'border-mint bg-mint-soft text-mint' : wrong ? 'border-coral bg-coral-soft text-coral' : 'border-line bg-surface text-ink hover:border-brand/50'}`} type="button" onClick={() => choose(index)} disabled={answer !== undefined} key={`${index}-${option}`}>{option}</button>
            })}
          </div>
          {answer !== undefined && <div className={`mt-4 rounded-2xl p-4 text-sm leading-6 ${answer === question.corretta ? 'bg-mint-soft text-mint' : 'bg-coral-soft text-coral'}`}><strong>{answer === question.corretta ? 'Risposta corretta.' : 'Risposta non corretta.'}</strong> <span className="text-ink">{rebrand(question.spiegazione)}</span></div>}
          {answer !== undefined && <div className="mt-4 flex justify-end">{current < questions.length - 1 ? <button className="primary-button" type="button" onClick={() => setCurrent((value) => value + 1)}>Domanda successiva</button> : <button className="primary-button" type="button" onClick={finish}>Concludi e salva</button>}</div>}
        </div>
      )}
      {quizState.fattoOggi && !finished && <p className="mt-4 text-xs text-muted">Oggi hai già completato il quiz{quizState.scoreOggi === null ? '' : ` con ${quizState.scoreOggi}/10`}. Ripeterlo non incrementa due volte la streak.</p>}
    </section>
  )
}

export default function LearnScreen() {
  const quizDay = useDayKey('utc')
  const sectionNames = LEARNING_DATASET.sezioni.it
  const [mode, setMode] = useState<'chapters' | 'quiz'>('chapters')
  const [section, setSection] = useState(sectionNames[0] || '')
  const [selected, setSelected] = useState<LearningChapter | null>(LEARNING_CHAPTERS[0] ?? null)
  const chapters = LEARNING_CHAPTERS.filter((chapter) => chapter.sezione === section)

  return (
    <div>
      <section className="mb-6 px-1"><p className="screen-kicker">{LEARNING_CHAPTERS.length} capitoli · {sectionNames.length} sezioni</p><h1 className="screen-title">Impara, verifica, <span className="text-brand">contestualizza.</span></h1><p className="screen-subtitle">Contenuti embedded, rebrandizzati in UI senza mutare il dataset. Blocchi personali e commerciali sono esclusi.</p></section>

      <div className="mb-5 inline-flex rounded-2xl border border-line bg-surface p-1" role="tablist" aria-label="Apprendimento"><button className={`rounded-xl px-4 py-2 text-sm font-bold ${mode === 'chapters' ? 'bg-brand text-on-brand' : 'text-muted'}`} type="button" role="tab" aria-selected={mode === 'chapters'} onClick={() => setMode('chapters')}><BookOpenIcon className="mr-2 inline size-4" />Capitoli</button><button className={`rounded-xl px-4 py-2 text-sm font-bold ${mode === 'quiz' ? 'bg-brand text-on-brand' : 'text-muted'}`} type="button" role="tab" aria-selected={mode === 'quiz'} onClick={() => setMode('quiz')}><TrophyIcon className="mr-2 inline size-4" />Quiz del giorno</button></div>

      {mode === 'quiz' ? <DailyQuiz key={quizDay} /> : (
        <div className="grid items-start gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <section>
            <label className="section-label" htmlFor="learn-section">Sezione</label>
            <select id="learn-section" className="field mt-2" value={section} onChange={(event) => { const next = event.target.value; setSection(next); setSelected(LEARNING_CHAPTERS.find((chapter) => chapter.sezione === next) ?? null) }}>{sectionNames.map((value) => <option key={value}>{value}</option>)}</select>
            <div className="mt-3 space-y-2">{chapters.map((chapter) => <button className={`w-full rounded-2xl border p-4 text-left transition ${selected?.id === chapter.id ? 'border-brand bg-brand-soft/55' : 'border-line bg-surface hover:border-brand/45'}`} type="button" onClick={() => setSelected(chapter)} key={chapter.id}><span className="block text-xs font-bold text-brand">{chapter.num}. {chapter.minuti} min</span><span className="mt-1 block font-extrabold text-ink">{rebrand(chapter.titolo)}</span><span className="mt-1 block text-xs leading-5 text-muted">{rebrand(chapter.sottotitolo)}</span></button>)}</div>
          </section>
          {selected ? <ChapterDetail chapter={selected} key={selected.id} /> : <p className="empty-card">Seleziona un capitolo.</p>}
        </div>
      )}

      <p className="mt-6 rounded-2xl border border-line bg-surface p-4 text-xs leading-5 text-muted">Contenuti esclusivamente educativi: non sostituiscono diagnosi, terapia o indicazioni personalizzate di professionisti sanitari. Non sono state aggiunte fonti esterne.</p>
    </div>
  )
}

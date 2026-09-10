import { useMemo, useState } from 'react'
import { RECIPES } from '../catalog/datasets'
import {
  CheckIcon,
  ChefHatIcon,
  ClockIcon,
  SaveIcon,
  SearchIcon,
  ShareIcon,
} from '../components/Icons'
import { formatNumber } from '../domain/nutrition'
import { condividiCard } from '../services/shareCard'
import { DIARY_STORAGE_KEY, registraMangiato } from '../storage/diaryStore'
import type { Recipe } from '../types/content'

type ActionState = 'idle' | 'working' | 'success' | 'error'

function diaryEntryPersisted(id: string): boolean {
  try {
    const raw = window.localStorage.getItem(DIARY_STORAGE_KEY)
    const stored: unknown = raw ? JSON.parse(raw) : null
    return Array.isArray(stored) && stored.some((entry) => (
      typeof entry === 'object' && entry !== null && 'id' in entry && entry.id === id
    ))
  } catch {
    return false
  }
}

function RecipeDetail({ recipe }: { recipe: Recipe }) {
  const [saveState, setSaveState] = useState<ActionState>('idle')
  const [shareState, setShareState] = useState<ActionState>('idle')
  const nutrition = recipe.per_porzione
  const servingGrams = recipe.ingredienti.reduce((total, ingredient) => total + ingredient.grammi_porzione, 0)

  function save(): void {
    setSaveState('working')
    try {
      const entry = registraMangiato({
        nome: recipe.nome,
        nome_en: recipe.nome_en,
        nome_es: recipe.nome_es,
        nome_de: recipe.nome_de,
        nome_fr: recipe.nome_fr,
        fonte: 'ricetta',
        fascia: nutrition.fascia,
        cg: nutrition.carico_glicemico,
        kcal: nutrition.kcal,
        carbo: nutrition.carboidrati_disponibili_g,
        prot: nutrition.proteine_g,
        grassi: nutrition.grassi_g,
        fibre: nutrition.fibre_g,
        grammi: servingGrams,
      })
      setSaveState(diaryEntryPersisted(entry.id) ? 'success' : 'error')
    } catch {
      setSaveState('error')
    }
  }

  async function share(): Promise<void> {
    setShareState('working')
    const shared = await condividiCard({
      title: recipe.nome,
      subtitle: `${recipe.categoria} · una porzione`,
      items: [
        { label: 'Energia', value: `${formatNumber(nutrition.kcal)} kcal` },
        { label: 'Carboidrati', value: `${formatNumber(nutrition.carboidrati_disponibili_g)} g` },
        { label: 'Carico glicemico', value: `${formatNumber(nutrition.carico_glicemico)} · ${nutrition.fascia}` },
        { label: 'Proteine', value: `${formatNumber(nutrition.proteine_g)} g` },
        { label: 'Grassi', value: `${formatNumber(nutrition.grassi_g)} g` },
      ],
      note: 'Valori per porzione dal dataset ricette GLICOGIG.',
    }, { fileName: `glicogig-${recipe.id}.png` })
    setShareState(shared ? 'success' : 'error')
  }

  return (
    <article className="app-card rounded-3xl border border-brand/35 bg-paper p-5 shadow-card sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><p className="section-label">{recipe.categoria}</p><h2 className="mt-1 text-3xl font-extrabold text-ink">{recipe.nome}</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{recipe.descrizione}</p></div>
        <div className="flex flex-wrap gap-2"><span className="status-badge"><ClockIcon className="size-4" /> {recipe.tempo_prep + recipe.tempo_cottura} min</span><span className="status-badge">{recipe.difficolta}</span><span className="status-badge">{recipe.porzioni} porzioni</span></div>
      </div>

      <section className="mt-6 rounded-3xl border border-line bg-surface p-4 sm:p-5">
        <div className="flex items-end justify-between gap-3"><div><p className="section-label">Una porzione</p><h3 className="mt-1 text-xl font-extrabold text-brand">Valori nutrizionali</h3></div><span className={`status-badge ${nutrition.fascia === 'alto' ? 'border-coral/30 bg-coral-soft text-coral' : ''}`}>CG {formatNumber(nutrition.carico_glicemico)} · {nutrition.fascia}</span></div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
          <div className="data-tile"><span>Energia</span><strong>{formatNumber(nutrition.kcal)} kcal</strong></div>
          <div className="data-tile"><span>Carboidrati</span><strong>{formatNumber(nutrition.carboidrati_disponibili_g)} g</strong></div>
          <div className="data-tile"><span>Fibre</span><strong>{formatNumber(nutrition.fibre_g)} g</strong></div>
          <div className="data-tile"><span>Proteine</span><strong>{formatNumber(nutrition.proteine_g)} g</strong></div>
          <div className="data-tile"><span>Grassi</span><strong>{formatNumber(nutrition.grassi_g)} g</strong></div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section><p className="section-label">Ingredienti</p><ul className="mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line">{recipe.ingredienti.map((ingredient) => <li className="flex items-center justify-between gap-3 bg-surface px-4 py-3 text-sm" key={`${ingredient.id}-${ingredient.nome}`}><span className="font-semibold text-ink">{ingredient.nome}</span><span className="shrink-0 text-muted">{formatNumber(ingredient.grammi_porzione)} g / porzione</span></li>)}</ul></section>
        <section><p className="section-label">Procedimento</p><ol className="mt-3 space-y-3">{recipe.procedimento.map((step, index) => <li className="flex gap-3 text-sm leading-6 text-muted" key={`${index}-${step}`}><span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-soft text-xs font-black text-brand">{index + 1}</span><span>{step}</span></li>)}</ol></section>
      </div>

      {recipe.alternative.length > 0 && <section className="mt-6"><p className="section-label">Alternative</p><div className="mt-3 grid gap-3 sm:grid-cols-2">{recipe.alternative.map((group) => <div className="rounded-2xl border border-line bg-surface p-4" key={group.gruppo}><h4 className="font-extrabold text-ink">{group.gruppo}</h4><p className="mt-1 text-xs text-muted">Base: {group.base} · IG {formatNumber(group.base_ig)}</p><ul className="mt-3 space-y-2 text-sm">{group.opzioni.map((option) => <li className="flex justify-between gap-3" key={`${option.nome}-${option.delta}`}><span>{option.nome}</span><strong className={option.delta <= 0 ? 'text-mint' : 'text-amber'}>{option.delta > 0 ? '+' : ''}{formatNumber(option.delta)}</strong></li>)}</ul></div>)}</div></section>}

      {recipe.consigli.length > 0 && <section className="mt-6 rounded-2xl bg-mint-soft p-4"><p className="section-label text-mint">Consigli</p><ul className="mt-2 space-y-2 text-sm leading-6 text-ink">{recipe.consigli.map((tip) => <li key={tip}>• {tip}</li>)}</ul></section>}

      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        <button className="primary-button" type="button" onClick={save} disabled={saveState === 'working' || saveState === 'success'}>{saveState === 'success' ? <CheckIcon className="size-5" /> : <SaveIcon className="size-5" />}{saveState === 'working' ? 'Salvataggio…' : saveState === 'success' ? 'Salvata nel diario' : 'Salva una porzione'}</button>
        <button className="secondary-button" type="button" onClick={() => void share()} disabled={shareState === 'working'}><ShareIcon className="size-5" />{shareState === 'working' ? 'Preparazione…' : 'Condividi PNG'}</button>
      </div>
      <div className="mt-2 text-xs" aria-live="polite">{saveState === 'error' && <p className="text-coral">Voce disponibile nella sessione, ma persistenza locale non confermata.</p>}{shareState === 'error' && <p className="text-coral">Condivisione annullata o non disponibile.</p>}{shareState === 'success' && <p className="text-mint">Card condivisa o scaricata.</p>}</div>
    </article>
  )
}

export default function RecipesScreen() {
  const categories = useMemo(() => Array.from(new Set(RECIPES.map(({ categoria }) => categoria))).sort(), [])
  const meals = useMemo(() => Array.from(new Set(RECIPES.flatMap(({ pasti }) => pasti))).sort(), [])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [meal, setMeal] = useState('')
  const [band, setBand] = useState('')
  const [selected, setSelected] = useState<Recipe | null>(null)

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return RECIPES.filter((recipe) => {
      const matchesText = !normalized || [recipe.nome, recipe.descrizione, ...recipe.ingredienti.map(({ nome }) => nome)].some((value) => value.toLowerCase().includes(normalized))
      return matchesText
        && (!category || recipe.categoria === category)
        && (!meal || recipe.pasti.includes(meal))
        && (!band || recipe.per_porzione.fascia === band)
    })
  }, [band, category, meal, query])

  return (
    <div>
      <section className="mb-6 px-1"><p className="screen-kicker">{RECIPES.length} ricette verificate</p><h1 className="screen-title">Ricette con valori <span className="text-brand">per porzione.</span></h1><p className="screen-subtitle">Solo ingredienti, procedimento, alternative e consigli presenti nel dataset. Nessuna immagine aggiunta.</p></section>
      <section className="app-card rounded-3xl border border-line bg-paper p-4 shadow-card sm:p-5">
        <div className="relative"><SearchIcon className="pointer-events-none absolute top-3.5 left-3.5 size-5 text-muted" /><input className="field pl-11" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nome, descrizione o ingrediente" aria-label="Cerca ricette" /></div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3"><select className="field" value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Categoria ricetta"><option value="">Tutte le categorie</option>{categories.map((value) => <option key={value}>{value}</option>)}</select><select className="field" value={meal} onChange={(event) => setMeal(event.target.value)} aria-label="Pasto"><option value="">Tutti i pasti</option>{meals.map((value) => <option key={value}>{value}</option>)}</select><select className="field" value={band} onChange={(event) => setBand(event.target.value)} aria-label="Fascia glicemica"><option value="">Tutte le fasce</option>{['trascurabile', 'basso', 'medio', 'alto'].map((value) => <option key={value}>{value}</option>)}</select></div>
      </section>

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <section className="space-y-2"><p className="px-1 text-xs text-muted">{filtered.length} risultati</p>{filtered.map((recipe) => <button className={`w-full rounded-2xl border p-4 text-left transition ${selected?.id === recipe.id ? 'border-brand bg-brand-soft/55' : 'border-line bg-surface hover:border-brand/45'}`} type="button" onClick={() => setSelected(recipe)} key={recipe.id}><span className="flex items-start justify-between gap-3"><span className="font-bold text-ink">{recipe.nome}</span><span className="shrink-0 text-xs font-bold text-brand">CG {formatNumber(recipe.per_porzione.carico_glicemico)}</span></span><span className="mt-1 block text-xs text-muted">{recipe.categoria} · {recipe.tempo_prep + recipe.tempo_cottura} min · {recipe.per_porzione.fascia}</span></button>)}{!filtered.length && <p className="empty-card">Nessuna ricetta corrisponde ai filtri.</p>}</section>
        {selected ? <RecipeDetail recipe={selected} key={selected.id} /> : <div className="empty-card"><ChefHatIcon className="mx-auto size-9 text-brand" /><p className="mt-3">Seleziona una ricetta per aprire tutti i dati disponibili.</p></div>}
      </div>
    </div>
  )
}

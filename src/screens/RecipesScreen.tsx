import { useMemo, useState } from 'react'
import { RECIPES } from '../catalog/datasets'
import {
  CheckIcon,
  ChefHatIcon,
  ChevronRightIcon,
  ClockIcon,
  LayersIcon,
  SaveIcon,
  SearchIcon,
  ShareIcon,
} from '../components/Icons'
import { mealItemFromRecipe, recipeMethodEvidence, recipeReliability } from '../domain/meal'
import { formatNumber } from '../domain/nutrition'
import { RECIPE_ASSET_BY_ID } from '../generated/recipeAssetMap'
import { condividiCard } from '../services/shareCard'
import { useMealSession } from '../state/mealSession'
import { DIARY_STORAGE_KEY, registraMangiato } from '../storage/diaryStore'
import type { Recipe } from '../types/content'

const PORTIONS = [0.5, 1, 1.5, 2] as const
type ActionState = 'idle' | 'working' | 'success' | 'error'

function verifiedRecipeAsset(recipe: Recipe) {
  const asset = RECIPE_ASSET_BY_ID[recipe.id]
  return asset?.recipeId === recipe.id && asset.recipeName === recipe.nome ? asset : undefined
}

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
  const { addItem } = useMealSession()
  const [portions, setPortions] = useState<number>(1)
  const [mealState, setMealState] = useState<'idle' | 'success'>('idle')
  const [saveState, setSaveState] = useState<ActionState>('idle')
  const [shareState, setShareState] = useState<ActionState>('idle')
  const imageAsset = verifiedRecipeAsset(recipe)
  const item = mealItemFromRecipe(recipe, portions)
  const reliability = recipeReliability(recipe)
  const method = recipeMethodEvidence(recipe)
  const dominant = method.quantity
  const summary = item.band === 'alto'
    ? 'Gustosa: occhio alla porzione e alla frequenza.'
    : item.band === 'medio'
      ? 'Un buon piatto, da gustare con equilibrio.'
      : 'Un piatto a impatto leggero.'

  function changePortions(value: number): void {
    setPortions(value)
    setMealState('idle')
    setSaveState('idle')
    setShareState('idle')
  }

  function addToMeal(): void {
    addItem(item)
    setMealState('success')
  }

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
        fascia: item.band,
        cg: item.glycemicLoad,
        kcal: item.kcal,
        carbo: item.carbs,
        prot: item.protein,
        grassi: item.fat,
        fibre: item.fibre,
        grammi: item.grams,
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
      subtitle: `${recipe.categoria} · ${portions} ${portions === 1 ? 'porzione' : 'porzioni'}`,
      items: [
        { label: 'Energia', value: `${formatNumber(item.kcal)} kcal` },
        { label: 'Carboidrati', value: `${formatNumber(item.carbs)} g` },
        { label: 'Carico glicemico', value: `${formatNumber(item.glycemicLoad)} · ${item.band}` },
        { label: 'Proteine', value: `${formatNumber(item.protein)} g` },
        { label: 'Grassi', value: `${formatNumber(item.fat)} g` },
      ],
      note: 'Valori scalati dai dati embedded per porzione della ricetta.',
    }, { fileName: `glicogig-${recipe.id}.png` })
    setShareState(shared ? 'success' : 'error')
  }

  return (
    <div>
      <a className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-brand" href="#recipes">← Tutte le ricette</a>
      <article className="app-card rounded-3xl border border-brand/35 bg-paper p-5 shadow-card sm:p-7">
        {imageAsset ? (
          <img className="mb-5 h-56 w-full rounded-2xl object-cover sm:h-72" src={imageAsset.src} alt={`Foto di ${recipe.nome}`} />
        ) : (
          <div className="mb-5 grid h-56 place-items-center rounded-2xl border border-line bg-surface text-muted sm:h-72">
            <span className="grid justify-items-center gap-2 text-sm font-semibold"><ChefHatIcon className="size-9 text-brand" />Immagine non disponibile</span>
          </div>
        )}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><p className="section-label">{recipe.categoria}</p><h1 className="mt-1 text-3xl font-extrabold text-ink">{recipe.nome}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{recipe.descrizione}</p></div>
          <div className="flex flex-wrap gap-2"><span className="status-badge"><ClockIcon className="size-4" /> {recipe.tempo_prep + recipe.tempo_cottura} min</span><span className="status-badge">{recipe.difficolta}</span><span className="status-badge">Affidabilità IG {reliability ?? 'n.d.'}</span></div>
        </div>

        <section className="mt-6 rounded-3xl border border-line bg-surface p-4 sm:p-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="section-label">Quantità</p><h2 className="mt-1 text-xl font-extrabold text-brand">Porzioni da consumare</h2></div>
            <div className="inline-flex rounded-2xl border border-line bg-paper p-1" aria-label="Numero porzioni">{PORTIONS.map((value) => <button className={`min-h-10 min-w-12 rounded-xl px-3 text-sm font-bold ${portions === value ? 'bg-brand text-on-brand' : 'text-muted'}`} type="button" onClick={() => changePortions(value)} aria-pressed={portions === value} key={value}>{value === 0.5 ? '½' : value === 1.5 ? '1½' : value}</button>)}</div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2"><span className={`status-badge ${item.band === 'alto' ? 'border-coral/30 bg-coral-soft text-coral' : ''}`}>CG {formatNumber(item.glycemicLoad)} · {item.band}</span><span className="text-sm text-muted">{summary}</span></div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5"><div className="data-tile"><span>Energia</span><strong>{formatNumber(item.kcal)} kcal</strong></div><div className="data-tile"><span>Carboidrati</span><strong>{formatNumber(item.carbs)} g</strong></div><div className="data-tile"><span>Fibre</span><strong>{formatNumber(item.fibre)} g</strong></div><div className="data-tile"><span>Proteine</span><strong>{formatNumber(item.protein)} g</strong></div><div className="data-tile"><span>Grassi</span><strong>{formatNumber(item.fat)} g</strong></div></div>
        </section>

        <section className="mt-6"><p className="section-label">Metodo in quattro dimensioni</p><div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4"><div className="data-tile"><span>Quantità</span><strong>{formatNumber(item.carbs)} g carbo</strong><small>{dominant ? `${dominant.ingredient.nome}: ${formatNumber(dominant.ingredient.grammi_porzione * portions)} g` : 'Ingrediente dominante n.d.'}</small></div><div className="data-tile"><span>Velocità</span><strong>IG {formatNumber(method.speed?.food.ig_medio ?? null)}</strong><small>{reliability ? `Affidabilità ${reliability}` : 'Affidabilità n.d.'}</small></div><div className="data-tile"><span>Equilibrio</span><strong>{formatNumber(item.fibre)} g fibre</strong><small>{formatNumber(item.protein)} g proteine · {formatNumber(item.fat)} g grassi</small></div><div className="data-tile"><span>Preparazione</span><strong>{recipe.procedimento.length} passaggi</strong><small>{recipe.tempo_prep} min prep. · {recipe.tempo_cottura} min cottura</small></div></div></section>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <section><p className="section-label">Ingredienti per {portions} {portions === 1 ? 'porzione' : 'porzioni'}</p><ul className="mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line">{recipe.ingredienti.map((ingredient) => <li className="flex items-center justify-between gap-3 bg-surface px-4 py-3 text-sm" key={`${ingredient.id}-${ingredient.nome}`}><span className="font-semibold text-ink">{ingredient.nome}</span><span className="shrink-0 text-muted">{formatNumber(ingredient.grammi_porzione * portions)} g</span></li>)}</ul></section>
          <section><p className="section-label">Procedimento</p><ol className="mt-3 space-y-3">{recipe.procedimento.map((step, index) => <li className="flex gap-3 text-sm leading-6 text-muted" key={`${index}-${step}`}><span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-soft text-xs font-black text-brand">{index + 1}</span><span>{step}</span></li>)}</ol></section>
        </div>

        {recipe.alternative.length > 0 && <section className="mt-6"><p className="section-label">Alternative embedded</p><div className="mt-3 grid gap-3 sm:grid-cols-2">{recipe.alternative.map((group) => <div className="rounded-2xl border border-line bg-surface p-4" key={group.gruppo}><h3 className="font-extrabold text-ink">{group.gruppo}</h3><p className="mt-1 text-xs text-muted">Base: {group.base} · IG {formatNumber(group.base_ig)}</p><ul className="mt-3 space-y-2 text-sm">{group.opzioni.map((option) => <li className="flex justify-between gap-3" key={`${option.nome}-${option.delta}`}><span>{option.nome}</span><strong className={option.delta <= 0 ? 'text-mint' : 'text-amber'}>{option.delta > 0 ? '+' : ''}{formatNumber(option.delta)}</strong></li>)}</ul></div>)}</div></section>}

        {recipe.consigli.length > 0 && <section className="mt-6 rounded-2xl bg-mint-soft p-4"><p className="section-label text-mint">Contesto e consigli</p><ul className="mt-2 space-y-2 text-sm leading-6 text-ink">{recipe.consigli.map((tip) => <li key={tip}>• {tip}</li>)}</ul></section>}

        <div className="mt-6 grid gap-2 sm:grid-cols-3">
          <button className="primary-button" type="button" onClick={addToMeal} disabled={mealState === 'success'}>{mealState === 'success' ? <CheckIcon className="size-5" /> : <LayersIcon className="size-5" />}{mealState === 'success' ? 'Aggiunta al pasto' : 'Aggiungi al pasto'}</button>
          <button className="secondary-button" type="button" onClick={save} disabled={saveState === 'working' || saveState === 'success'}>{saveState === 'success' ? <CheckIcon className="size-5" /> : <SaveIcon className="size-5" />}{saveState === 'working' ? 'Salvataggio…' : saveState === 'success' ? 'Registrata' : 'L’ho mangiato'}</button>
          <button className="secondary-button" type="button" onClick={() => void share()} disabled={shareState === 'working'}><ShareIcon className="size-5" />{shareState === 'working' ? 'Preparazione…' : 'Condividi'}</button>
        </div>
        <div className="mt-2 text-xs" aria-live="polite">{saveState === 'error' && <p className="text-coral">Persistenza locale non confermata.</p>}{shareState === 'error' && <p className="text-coral">Condivisione annullata o non disponibile.</p>}{shareState === 'success' && <p className="text-mint">Card condivisa o scaricata.</p>}{mealState === 'success' && <a className="font-bold text-brand underline" href="#meal">Apri Pasto</a>}</div>
      </article>
    </div>
  )
}

export default function RecipesScreen({ recipeId }: { recipeId?: string }) {
  const recipe = recipeId ? RECIPES.find(({ id }) => id === recipeId) : undefined
  const categories = useMemo(() => Array.from(new Set(RECIPES.map(({ categoria }) => categoria))).sort(), [])
  const meals = useMemo(() => Array.from(new Set(RECIPES.flatMap(({ pasti }) => pasti))).sort(), [])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [meal, setMeal] = useState('')
  const [band, setBand] = useState('')

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return RECIPES.filter((item) => {
      const matchesText = !normalized || [item.nome, item.descrizione, ...item.ingredienti.map(({ nome }) => nome)].some((value) => value.toLowerCase().includes(normalized))
      return matchesText && (!category || item.categoria === category) && (!meal || item.pasti.includes(meal)) && (!band || item.per_porzione.fascia === band)
    })
  }, [band, category, meal, query])

  if (recipeId) {
    return recipe ? <RecipeDetail recipe={recipe} /> : <div><a className="text-sm font-bold text-brand" href="#recipes">← Tutte le ricette</a><div className="empty-card mt-4"><ChefHatIcon className="mx-auto size-9 text-brand" /><h1 className="mt-3 text-xl font-extrabold text-ink">Ricetta non trovata</h1><p className="mt-2">L’identificativo non corrisponde alle {RECIPES.length} ricette embedded.</p></div></div>
  }

  return (
    <div>
      <section className="mb-6 px-1"><p className="screen-kicker">{RECIPES.length} ricette verificate</p><h1 className="screen-title">Ricette con valori <span className="text-brand">per porzione.</span></h1><p className="screen-subtitle">Ogni ricetta apre un dettaglio dedicato. Le immagini sono mostrate solo quando ID e nome coincidono con la mappa verificata 1.0.16.</p></section>
      <section className="app-card rounded-3xl border border-line bg-paper p-4 shadow-card sm:p-5"><div className="relative"><SearchIcon className="pointer-events-none absolute top-3.5 left-3.5 size-5 text-muted" /><input className="field pl-11" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nome, descrizione o ingrediente" aria-label="Cerca ricette" /></div><div className="mt-3 grid gap-2 sm:grid-cols-3"><select className="field" value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Categoria ricetta"><option value="">Tutte le categorie</option>{categories.map((value) => <option key={value}>{value}</option>)}</select><select className="field" value={meal} onChange={(event) => setMeal(event.target.value)} aria-label="Pasto"><option value="">Tutti i pasti</option>{meals.map((value) => <option key={value}>{value}</option>)}</select><select className="field" value={band} onChange={(event) => setBand(event.target.value)} aria-label="Fascia glicemica"><option value="">Tutte le fasce</option>{['trascurabile', 'basso', 'medio', 'alto'].map((value) => <option key={value}>{value}</option>)}</select></div></section>
      <section className="mt-5">
        <p className="px-1 text-xs text-muted">{filtered.length} risultati</p>
        <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const imageAsset = verifiedRecipeAsset(item)
            return (
              <a className="group rounded-3xl border border-line bg-surface p-4 transition hover:-translate-y-0.5 hover:border-brand/45" href={`#recipes/${encodeURIComponent(item.id)}`} key={item.id}>
                {imageAsset ? (
                  <img className="h-36 w-full rounded-2xl object-cover" src={imageAsset.src} alt={`Foto di ${item.nome}`} loading="lazy" />
                ) : (
                  <span className="grid h-36 place-items-center rounded-2xl border border-line bg-paper text-muted">
                    <span className="grid justify-items-center gap-2 text-xs font-semibold"><ChefHatIcon className="size-7 text-brand" />Immagine non disponibile</span>
                  </span>
                )}
                <span className="mt-4 flex items-start justify-between gap-3"><strong className="text-ink">{item.nome}</strong><ChevronRightIcon className="size-5 shrink-0 text-muted group-hover:text-brand" /></span>
                <span className="mt-2 block text-xs text-muted">{item.categoria} · {item.tempo_prep + item.tempo_cottura} min</span>
                <span className="mt-3 inline-flex status-badge">CG {formatNumber(item.per_porzione.carico_glicemico)} · {item.per_porzione.fascia}</span>
              </a>
            )
          })}
        </div>
        {!filtered.length && <p className="empty-card mt-3">Nessuna ricetta corrisponde ai filtri.</p>}
      </section>
    </div>
  )
}

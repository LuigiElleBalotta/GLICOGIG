import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
import { RECIPE_ASSET_BY_ID } from '../generated/recipeAssetMap'
import { reliabilityTranslationKey, recipeDifficultyTranslationKey } from '../i18n/classificationKeys'
import { selectRecipeDatasetFields } from '../i18n/datasetSelectors'
import { LANGUAGE_LOCALES, resolveSupportedLanguage } from '../i18n/languages'
import { condividiCard } from '../services/shareCard'
import { useMealSession } from '../state/mealSessionContext'
import { DIARY_STORAGE_KEY, registraMangiato } from '../storage/diaryStore'
import type { Recipe } from '../types/content'

const PORTIONS = [0.5, 1, 1.5, 2] as const
const BANDS = ['trascurabile', 'basso', 'medio', 'alto'] as const
type ActionState = 'idle' | 'working' | 'success' | 'error'

function impactKey(value: string): 'classification.impact.negligible' | 'classification.impact.low' | 'classification.impact.medium' | 'classification.impact.high' | null {
  if (value === 'trascurabile') return 'classification.impact.negligible'
  if (value === 'basso') return 'classification.impact.low'
  if (value === 'medio') return 'classification.impact.medium'
  if (value === 'alto') return 'classification.impact.high'
  return null
}

function mealKey(value: string): 'diary.slots.breakfast' | 'diary.slots.lunch' | 'diary.slots.dinner' | 'diary.slots.snack' | null {
  if (value === 'colazione') return 'diary.slots.breakfast'
  if (value === 'pranzo') return 'diary.slots.lunch'
  if (value === 'cena') return 'diary.slots.dinner'
  if (value === 'spuntino') return 'diary.slots.snack'
  return null
}

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
  const { t, i18n } = useTranslation()
  const language = resolveSupportedLanguage(i18n.resolvedLanguage ?? i18n.language)
  const locale = LANGUAGE_LOCALES[language]
  const numberFormatter = useMemo(() => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }), [locale])
  const formatNumber = (value: number | null | undefined) => typeof value === 'number' && Number.isFinite(value)
    ? numberFormatter.format(value)
    : t('common.labels.notAvailable')
  const view = useMemo(() => selectRecipeDatasetFields(recipe, language), [language, recipe])
  const { addItem } = useMealSession()
  const [portions, setPortions] = useState<number>(1)
  const [mealState, setMealState] = useState<'idle' | 'success'>('idle')
  const [saveState, setSaveState] = useState<ActionState>('idle')
  const [shareState, setShareState] = useState<ActionState>('idle')
  const imageAsset = verifiedRecipeAsset(recipe)
  const item = mealItemFromRecipe(recipe, portions)
  const reliability = recipeReliability(recipe)
  const reliabilityKey = reliabilityTranslationKey(reliability)
  const reliabilityLabel = reliabilityKey ? t(reliabilityKey) : t('common.labels.notAvailable')
  const difficultyKey = recipeDifficultyTranslationKey(recipe.difficolta)
  const difficultyLabel = difficultyKey ? t(difficultyKey) : t('common.labels.notAvailable')
  const method = recipeMethodEvidence(recipe)
  const dominant = method.quantity
  const bandTranslationKey = impactKey(item.band)
  const bandLabel = bandTranslationKey ? t(bandTranslationKey) : item.band
  const summary = item.band === 'alto'
    ? t('recipes.impact.high')
    : item.band === 'medio'
      ? t('recipes.impact.medium')
      : t('recipes.impact.low')
  const dominantName = dominant
    ? view.ingredients.find(({ id }) => id === dominant.ingredient.id)?.displayName ?? dominant.ingredient.nome
    : null

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
      title: view.displayName,
      subtitle: t('share.recipe.subtitle', { category: view.categoryLabel, count: portions }),
      items: [
        { label: t('common.metrics.energy'), value: `${formatNumber(item.kcal)} kcal` },
        { label: t('common.metrics.carbohydrates'), value: `${formatNumber(item.carbs)} g` },
        { label: t('common.metrics.glycemicLoad'), value: `${formatNumber(item.glycemicLoad)} · ${bandLabel}` },
        { label: t('common.metrics.protein'), value: `${formatNumber(item.protein)} g` },
        { label: t('common.metrics.fat'), value: `${formatNumber(item.fat)} g` },
      ],
      note: t('share.recipe.note'),
    }, { fileName: `glicogig-${recipe.id}.png` })
    setShareState(shared ? 'success' : 'error')
  }

  return (
    <div>
      <a className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-brand" href="#recipes">{t('recipes.detail.backAll')}</a>
      <article className="app-card rounded-3xl border border-brand/35 bg-paper p-5 shadow-card sm:p-7">
        {imageAsset ? (
          <img className="mb-5 h-56 w-full rounded-2xl object-cover sm:h-72" src={imageAsset.src} alt={t('recipes.detail.photoAlt', { name: view.displayName })} />
        ) : (
          <div className="mb-5 grid h-56 place-items-center rounded-2xl border border-line bg-surface text-muted sm:h-72">
            <span className="grid justify-items-center gap-2 text-sm font-semibold"><ChefHatIcon className="size-9 text-brand" />{t('recipes.detail.imageUnavailable')}</span>
          </div>
        )}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><p className="section-label">{view.categoryLabel}</p><h1 className="mt-1 text-3xl font-extrabold text-ink">{view.displayName}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{view.description}</p></div>
          <div className="flex flex-wrap gap-2"><span className="status-badge"><ClockIcon className="size-4" /> {formatNumber(recipe.tempo_prep + recipe.tempo_cottura)} min</span><span className="status-badge">{difficultyLabel}</span><span className="status-badge">{t('recipes.detail.giReliability', { value: reliabilityLabel })}</span></div>
        </div>

        <section className="mt-6 rounded-3xl border border-line bg-surface p-4 sm:p-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="section-label">{t('common.labels.quantity')}</p><h2 className="mt-1 text-xl font-extrabold text-brand">{t('recipes.detail.servingsTitle')}</h2></div>
            <div className="inline-flex rounded-2xl border border-line bg-paper p-1" aria-label={t('recipes.detail.servingsAria')}>{PORTIONS.map((value) => <button className={`min-h-10 min-w-12 rounded-xl px-3 text-sm font-bold ${portions === value ? 'bg-brand text-on-brand' : 'text-muted'}`} type="button" onClick={() => changePortions(value)} aria-pressed={portions === value} key={value}>{value === 0.5 ? '½' : value === 1.5 ? '1½' : numberFormatter.format(value)}</button>)}</div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2"><span className={`status-badge ${item.band === 'alto' ? 'border-coral/30 bg-coral-soft text-coral' : ''}`}>{t('common.metrics.glycemicLoadShort')} {formatNumber(item.glycemicLoad)} · {bandLabel}</span><span className="text-sm text-muted">{summary}</span></div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5"><div className="data-tile"><span>{t('common.metrics.energy')}</span><strong>{formatNumber(item.kcal)} kcal</strong></div><div className="data-tile"><span>{t('common.metrics.carbohydrates')}</span><strong>{formatNumber(item.carbs)} g</strong></div><div className="data-tile"><span>{t('common.metrics.fibre')}</span><strong>{formatNumber(item.fibre)} g</strong></div><div className="data-tile"><span>{t('common.metrics.protein')}</span><strong>{formatNumber(item.protein)} g</strong></div><div className="data-tile"><span>{t('common.metrics.fat')}</span><strong>{formatNumber(item.fat)} g</strong></div></div>
        </section>

        <section className="mt-6"><p className="section-label">{t('recipes.detail.method')}</p><div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4"><div className="data-tile"><span>{t('common.labels.quantity')}</span><strong>{formatNumber(item.carbs)} g</strong><small>{dominant && dominantName ? `${dominantName}: ${formatNumber(dominant.ingredient.grammi_porzione * portions)} g` : t('recipes.detail.dominantUnavailable')}</small></div><div className="data-tile"><span>{t('common.labels.speed')}</span><strong>{t('common.metrics.glycemicIndex')} {formatNumber(method.speed?.food.ig_medio)}</strong><small>{reliabilityKey ? t('recipes.detail.reliability', { value: reliabilityLabel }) : t('recipes.detail.reliabilityUnavailable')}</small></div><div className="data-tile"><span>{t('common.labels.balance')}</span><strong>{formatNumber(item.fibre)} g</strong><small>{formatNumber(item.protein)} g · {formatNumber(item.fat)} g</small></div><div className="data-tile"><span>{t('common.labels.preparation')}</span><strong>{t('recipes.detail.steps', { count: recipe.procedimento.length })}</strong><small>{t('recipes.detail.timing', { prep: formatNumber(recipe.tempo_prep), cook: formatNumber(recipe.tempo_cottura) })}</small></div></div></section>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <section><p className="section-label">{t('recipes.detail.ingredients', { count: portions })}</p><ul className="mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line">{view.ingredients.map(({ canonical, displayName }) => <li className="flex items-center justify-between gap-3 bg-surface px-4 py-3 text-sm" key={`${canonical.id}-${canonical.nome}`}><span className="font-semibold text-ink">{displayName}</span><span className="shrink-0 text-muted">{formatNumber(canonical.grammi_porzione * portions)} g</span></li>)}</ul></section>
          <section><p className="section-label">{t('recipes.detail.procedure')}</p><ol className="mt-3 space-y-3">{view.steps.map((step, index) => <li className="flex gap-3 text-sm leading-6 text-muted" key={`${index}-${step}`}><span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-soft text-xs font-black text-brand">{numberFormatter.format(index + 1)}</span><span>{step}</span></li>)}</ol></section>
        </div>

        {view.alternatives.length > 0 && <section className="mt-6"><p className="section-label">{t('recipes.detail.alternatives')}</p><div className="mt-3 grid gap-3 sm:grid-cols-2">{view.alternatives.map((group) => <div className="rounded-2xl border border-line bg-surface p-4" key={group.canonical.gruppo}><h3 className="font-extrabold text-ink">{group.groupLabel}</h3><p className="mt-1 text-xs text-muted">{t('recipes.detail.alternativeBase', { base: group.canonical.base, gi: formatNumber(group.canonical.base_ig) })}</p><ul className="mt-3 space-y-2 text-sm">{group.options.map((option) => <li className="flex justify-between gap-3" key={`${option.canonical.nome}-${option.canonical.delta}`}><span>{option.displayName}</span><strong className={option.canonical.delta <= 0 ? 'text-mint' : 'text-amber'}>{option.canonical.delta > 0 ? '+' : ''}{formatNumber(option.canonical.delta)}</strong></li>)}</ul></div>)}</div></section>}

        {view.advice.length > 0 && <section className="mt-6 rounded-2xl bg-mint-soft p-4"><p className="section-label text-mint">{t('recipes.detail.advice')}</p><ul className="mt-2 space-y-2 text-sm leading-6 text-ink">{view.advice.map((tip) => <li key={tip}>• {tip}</li>)}</ul></section>}

        <div className="mt-6 grid gap-2 sm:grid-cols-3">
          <button className="primary-button" type="button" onClick={addToMeal} disabled={mealState === 'success'}>{mealState === 'success' ? <CheckIcon className="size-5" /> : <LayersIcon className="size-5" />}{mealState === 'success' ? t('common.actions.addedToMealFeminine') : t('common.actions.addToMeal')}</button>
          <button className="secondary-button" type="button" onClick={save} disabled={saveState === 'working' || saveState === 'success'}>{saveState === 'success' ? <CheckIcon className="size-5" /> : <SaveIcon className="size-5" />}{saveState === 'working' ? t('common.actions.saving') : saveState === 'success' ? t('common.actions.registeredFeminine') : t('common.actions.ateIt')}</button>
          <button className="secondary-button" type="button" onClick={() => void share()} disabled={shareState === 'working'}><ShareIcon className="size-5" />{shareState === 'working' ? t('common.actions.preparing') : t('common.actions.share')}</button>
        </div>
        <div className="mt-2 text-xs" aria-live="polite">{saveState === 'error' && <p className="text-coral">{t('common.feedback.persistenceUnconfirmed')}</p>}{shareState === 'error' && <p className="text-coral">{t('common.feedback.shareUnavailable')}</p>}{shareState === 'success' && <p className="text-mint">{t('common.feedback.shareSuccess')}</p>}{mealState === 'success' && <a className="font-bold text-brand underline" href="#meal">{t('common.actions.openMeal')}</a>}</div>
      </article>
    </div>
  )
}

export default function RecipesScreen({ recipeId }: { recipeId?: string }) {
  const { t, i18n } = useTranslation()
  const language = resolveSupportedLanguage(i18n.resolvedLanguage ?? i18n.language)
  const locale = LANGUAGE_LOCALES[language]
  const numberFormatter = useMemo(() => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }), [locale])
  const formatNumber = (value: number) => numberFormatter.format(value)
  const recipe = recipeId ? RECIPES.find(({ id }) => id === recipeId) : undefined
  const localizedRecipes = useMemo(() => RECIPES.map((canonical) => ({
    canonical,
    view: selectRecipeDatasetFields(canonical, language),
  })), [language])
  const categories = useMemo(() => Array.from(new Map(localizedRecipes.map(({ canonical, view }) => [canonical.categoria, view.categoryLabel])).entries()).sort((a, b) => a[1].localeCompare(b[1], locale)), [locale, localizedRecipes])
  const meals = useMemo(() => Array.from(new Set(RECIPES.flatMap(({ pasti }) => pasti))).sort(), [])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [meal, setMeal] = useState('')
  const [band, setBand] = useState('')

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(locale)
    return localizedRecipes.filter(({ canonical, view }) => {
      const matchesText = !normalized || [view.displayName, view.description, ...view.ingredients.map(({ displayName }) => displayName)].some((value) => value.toLocaleLowerCase(locale).includes(normalized))
      return matchesText && (!category || canonical.categoria === category) && (!meal || canonical.pasti.includes(meal)) && (!band || canonical.per_porzione.fascia === band)
    })
  }, [band, category, locale, localizedRecipes, meal, query])

  if (recipeId) {
    return recipe ? <RecipeDetail recipe={recipe} /> : <div><a className="text-sm font-bold text-brand" href="#recipes">{t('recipes.detail.backAll')}</a><div className="empty-card mt-4"><ChefHatIcon className="mx-auto size-9 text-brand" /><h1 className="mt-3 text-xl font-extrabold text-ink">{t('recipes.list.missingTitle')}</h1><p className="mt-2">{t('recipes.list.missingBody', { count: RECIPES.length })}</p></div></div>
  }

  return (
    <div>
      <section className="mb-6 px-1"><p className="screen-kicker">{t('recipes.list.verified', { count: RECIPES.length })}</p><h1 className="screen-title">{t('recipes.list.title')} <span className="text-brand">{t('recipes.list.accent')}</span></h1><p className="screen-subtitle">{t('recipes.list.subtitle')}</p></section>
      <section className="app-card rounded-3xl border border-line bg-paper p-4 shadow-card sm:p-5"><div className="relative"><SearchIcon className="pointer-events-none absolute top-3.5 left-3.5 size-5 text-muted" /><input className="field pl-11" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('recipes.list.searchPlaceholder')} aria-label={t('recipes.list.searchAria')} /></div><div className="mt-3 grid gap-2 sm:grid-cols-3"><select className="field" value={category} onChange={(event) => setCategory(event.target.value)} aria-label={t('recipes.list.categoryAria')}><option value="">{t('recipes.list.allCategories')}</option>{categories.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select><select className="field" value={meal} onChange={(event) => setMeal(event.target.value)} aria-label={t('recipes.list.mealAria')}><option value="">{t('recipes.list.allMeals')}</option>{meals.map((value) => { const key = mealKey(value); return <option value={value} key={value}>{key ? t(key) : value}</option> })}</select><select className="field" value={band} onChange={(event) => setBand(event.target.value)} aria-label={t('recipes.list.bandAria')}><option value="">{t('recipes.list.allBands')}</option>{BANDS.map((value) => { const key = impactKey(value); return <option value={value} key={value}>{key ? t(key) : value}</option> })}</select></div></section>
      <section className="mt-5">
        <p className="px-1 text-xs text-muted">{t('recipes.list.results', { count: filtered.length })}</p>
        <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(({ canonical, view }) => {
            const imageAsset = verifiedRecipeAsset(canonical)
            const key = impactKey(canonical.per_porzione.fascia)
            return (
              <a className="group rounded-3xl border border-line bg-surface p-4 transition hover:-translate-y-0.5 hover:border-brand/45" href={`#recipes/${encodeURIComponent(canonical.id)}`} key={canonical.id}>
                {imageAsset ? (
                  <img className="h-36 w-full rounded-2xl object-cover" src={imageAsset.src} alt={t('recipes.detail.photoAlt', { name: view.displayName })} loading="lazy" />
                ) : (
                  <span className="grid h-36 place-items-center rounded-2xl border border-line bg-paper text-muted">
                    <span className="grid justify-items-center gap-2 text-xs font-semibold"><ChefHatIcon className="size-7 text-brand" />{t('recipes.detail.imageUnavailable')}</span>
                  </span>
                )}
                <span className="mt-4 flex items-start justify-between gap-3"><strong className="text-ink">{view.displayName}</strong><ChevronRightIcon className="size-5 shrink-0 text-muted group-hover:text-brand" /></span>
                <span className="mt-2 block text-xs text-muted">{view.categoryLabel} · {formatNumber(canonical.tempo_prep + canonical.tempo_cottura)} min</span>
                <span className="mt-3 inline-flex status-badge">{t('common.metrics.glycemicLoadShort')} {formatNumber(canonical.per_porzione.carico_glicemico)} · {key ? t(key) : canonical.per_porzione.fascia}</span>
              </a>
            )
          })}
        </div>
        {!filtered.length && <p className="empty-card mt-3">{t('recipes.list.empty')}</p>}
      </section>
    </div>
  )
}

import { useTranslation } from 'react-i18next'
import { ActivityIcon, BookOpenIcon, ChevronRightIcon } from '../components/Icons'

const DIMENSIONS = ['quantity', 'speed', 'balance', 'preparation'] as const

export default function ExplanationScreen() {
  const { t } = useTranslation()

  return (
    <div>
      <section className="mb-6 px-1">
        <p className="screen-kicker">{t('method.hero.kicker')}</p>
        <h1 className="screen-title">{t('method.hero.title')} <span className="text-brand">{t('method.hero.accent')}</span></h1>
        <p className="screen-subtitle">{t('method.hero.subtitle')}</p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        {DIMENSIONS.map((dimension) => <article className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card" key={dimension}><p className="section-label">{t('method.dimensionLabel')}</p><h2 className="mt-1 text-xl font-extrabold text-ink">{t(`method.dimensions.${dimension}.title`)}</h2><p className="mt-3 text-sm leading-7 text-muted">{t(`method.dimensions.${dimension}.body`)}</p></article>)}
      </section>

      <section className="mt-5 app-card rounded-3xl border border-brand/30 bg-brand-soft/35 p-5 shadow-card sm:p-7">
        <div className="flex items-start gap-3"><ActivityIcon className="mt-1 size-7 shrink-0 text-brand" /><div><p className="section-label text-brand">{t('method.formula.kicker')}</p><h2 className="mt-1 text-2xl font-extrabold text-ink">{t('method.formula.title')}</h2></div></div>
        <div className="mt-5 rounded-2xl border border-brand/20 bg-paper p-4 font-mono text-sm font-bold text-brand sm:text-base">{t('method.formula.expression')}</div>
        <p className="mt-4 text-sm leading-7 text-muted">{t('method.formula.body')}</p>
      </section>

      <section className="mt-5 grid gap-4 lg:grid-cols-2">
        <article className="rounded-3xl border border-line bg-surface p-5"><p className="section-label">{t('method.sources.title')}</p><ul className="mt-3 space-y-3 text-sm leading-6 text-muted"><li>• {t('method.sources.catalog')}</li><li>• {t('method.sources.photo')}</li><li>• {t('method.sources.barcode')}</li><li>• {t('method.sources.missing')}</li></ul></article>
        <article className="rounded-3xl border border-line bg-surface p-5"><p className="section-label">{t('method.limitations.title')}</p><p className="mt-3 text-sm leading-7 text-muted">{t('method.limitations.body')}</p><a className="secondary-button mt-4" href="#learn">{t('method.limitations.openLearn')} <BookOpenIcon className="size-5" /><ChevronRightIcon className="size-4" /></a></article>
      </section>

      <p className="mt-6 rounded-2xl border border-line bg-paper p-4 text-xs leading-5 text-muted">{t('method.disclaimer')}</p>
    </div>
  )
}

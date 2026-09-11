import { useRef, useState, type ChangeEvent, type DragEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { CameraIcon, ImageIcon, SparklesIcon, TrashIcon } from './Icons'
import { formatFileSize, type PreparedImage } from '../services/imagePreparation'

interface PhotoCardProps {
  image: PreparedImage | null
  busy: boolean
  preparing: boolean
  analyzing: boolean
  onFile(file: File): void | Promise<void>
  onAnalyze(): void
  onClear(): void
}

export default function PhotoCard({ image, busy, preparing, analyzing, onFile, onAnalyze, onClear }: PhotoCardProps) {
  const { t } = useTranslation()
  const cameraInput = useRef<HTMLInputElement>(null)
  const galleryInput = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (file) void onFile(file)
  }

  function dropFile(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setDragging(false)
    const file = event.dataTransfer.files?.[0]
    if (file) void onFile(file)
  }

  const actionLabel = preparing
    ? t('analysis.photo.preparing')
    : analyzing
      ? t('analysis.photo.analyzing')
      : t('analysis.photo.action')

  return (
    <section className="app-card rounded-[1.75rem] border border-line bg-paper/95 p-3 shadow-card backdrop-blur sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-4 px-1">
        <div><p className="text-[11px] font-bold tracking-[0.18em] text-amber uppercase">{t('analysis.photo.step')}</p><h2 className="mt-1 font-display text-2xl font-extrabold text-ink">{t('analysis.photo.title')}</h2></div>
        <span className="rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-bold text-brand">JPEG</span>
      </div>
      <input ref={cameraInput} className="sr-only" type="file" accept="image/*" capture="environment" onChange={selectFile} />
      <input ref={galleryInput} className="sr-only" type="file" accept="image/*" onChange={selectFile} />

      {image ? (
        <div className="overflow-hidden rounded-[1.4rem] border border-line bg-surface">
          <div className="relative aspect-[4/3] overflow-hidden bg-brand-deep">
            <img className={`size-full object-cover transition duration-500 ${analyzing ? 'analysis-photo' : ''}`} src={image.previewUrl} alt={t('analysis.photo.selectedAlt')} />
            {analyzing && (
              <div className="analysis-vision absolute inset-0 z-10" aria-hidden="true">
                <div className="analysis-grid absolute inset-0" />
                <div className="analysis-scan-line absolute inset-x-0" />
                <div className="absolute inset-x-0 top-4 flex justify-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand-deep/85 px-3 py-1.5 text-[10px] font-extrabold tracking-[0.16em] text-brand uppercase backdrop-blur">
                    <span className="size-1.5 animate-pulse rounded-full bg-amber" /> {t('analysis.photo.activeVision')}
                  </span>
                </div>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between bg-gradient-to-t from-brand-deep via-brand-deep/65 to-transparent p-4 pt-16 text-ink">
              <div><p className="max-w-48 truncate text-sm font-semibold">{image.name}</p><p className="text-xs text-muted">{image.width} × {image.height} · {formatFileSize(image.bytes)}</p></div>
              <button className="grid size-10 place-items-center rounded-full border border-line bg-paper/70 text-ink transition hover:border-coral hover:text-coral disabled:opacity-50" type="button" onClick={onClear} disabled={busy} aria-label={t('analysis.photo.removeAria')}><TrashIcon className="size-4" /></button>
            </div>
          </div>
          {analyzing && <p className="sr-only" role="status">{t('analysis.photo.status')}</p>}
          <div className="grid gap-3 p-3 sm:grid-cols-[1fr_auto] sm:p-4">
            <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-brand px-5 font-extrabold text-on-brand shadow-lg shadow-brand/20 transition hover:brightness-110 disabled:opacity-60" type="button" onClick={onAnalyze} disabled={busy}><SparklesIcon className="size-5" />{actionLabel}</button>
            <button className="min-h-12 rounded-2xl border border-line bg-surface px-5 font-bold text-brand transition hover:border-brand disabled:opacity-50" type="button" onClick={() => galleryInput.current?.click()} disabled={busy}>{t('common.actions.change')}</button>
          </div>
        </div>
      ) : (
        <div className={`rounded-[1.4rem] border-2 border-dashed p-5 text-center transition sm:p-8 ${dragging ? 'border-brand bg-brand-soft' : 'border-line bg-surface/80'}`} onDragEnter={(event) => { event.preventDefault(); setDragging(true) }} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setDragging(false)} onDrop={dropFile}>
          <div className="mx-auto grid size-20 place-items-center rounded-full border border-brand/25 bg-brand-soft text-brand shadow-[0_0_32px_rgb(41_182_255_/_0.16)]"><CameraIcon className="size-9" /></div>
          <h3 className="mt-5 text-lg font-extrabold text-ink">{t('analysis.photo.emptyTitle')}</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">{t('analysis.photo.emptyHint')}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-brand px-4 font-extrabold text-on-brand transition hover:brightness-110" type="button" onClick={() => cameraInput.current?.click()}><CameraIcon className="size-5" /> {t('analysis.photo.takePhoto')}</button>
            <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-amber/35 bg-amber-soft px-4 font-bold text-amber transition hover:border-amber" type="button" onClick={() => galleryInput.current?.click()}><ImageIcon className="size-5" /> {t('analysis.photo.fromGallery')}</button>
          </div>
          <p className="mt-5 text-xs font-medium text-muted">{t('analysis.photo.dropHint')}</p>
        </div>
      )}
    </section>
  )
}

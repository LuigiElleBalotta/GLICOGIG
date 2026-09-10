import { useRef, useState, type ChangeEvent, type DragEvent } from 'react'
import { CameraIcon, ImageIcon, SparklesIcon, TrashIcon } from './Icons'
import { formatFileSize, type PreparedImage } from '../services/imagePreparation'

interface PhotoCardProps {
  image: PreparedImage | null
  busy: boolean
  onFile(file: File): void | Promise<void>
  onAnalyze(): void
  onClear(): void
}

export default function PhotoCard({ image, busy, onFile, onAnalyze, onClear }: PhotoCardProps) {
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

  return (
    <section className="rounded-[2rem] border border-white/80 bg-white/90 p-4 shadow-card backdrop-blur sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-4 px-1"><div><p className="text-xs font-bold tracking-[0.18em] text-mint uppercase">Passaggio 1</p><h2 className="mt-1 font-display text-2xl font-semibold text-brand">Inquadra il piatto</h2></div><span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand">JPEG</span></div>
      <input ref={cameraInput} className="sr-only" type="file" accept="image/*" capture="environment" onChange={selectFile} />
      <input ref={galleryInput} className="sr-only" type="file" accept="image/*" onChange={selectFile} />
      {image ? (
        <div className="overflow-hidden rounded-[1.55rem] border border-line bg-ivory">
          <div className="relative aspect-[4/3] overflow-hidden bg-brand-deep">
            <img className="size-full object-cover" src={image.previewUrl} alt="Piatto selezionato" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-brand-deep/80 to-transparent p-4 pt-14 text-white">
              <div><p className="max-w-48 truncate text-sm font-semibold">{image.name}</p><p className="text-xs text-white/75">{image.width} × {image.height} · {formatFileSize(image.bytes)}</p></div>
              <button className="grid size-10 place-items-center rounded-full bg-white/15 transition hover:bg-white/25 disabled:opacity-50" type="button" onClick={onClear} disabled={busy} aria-label="Rimuovi foto"><TrashIcon className="size-4" /></button>
            </div>
          </div>
          <div className="grid gap-3 p-4 sm:grid-cols-[1fr_auto]">
            <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-brand px-5 font-bold text-white shadow-lg shadow-brand/20 transition hover:bg-brand-deep disabled:opacity-60" type="button" onClick={onAnalyze} disabled={busy}><SparklesIcon className="size-5" />{busy ? 'Preparazione…' : 'Analizza il piatto'}</button>
            <button className="min-h-12 rounded-2xl border border-line px-5 font-bold text-brand transition hover:bg-brand-soft disabled:opacity-50" type="button" onClick={() => galleryInput.current?.click()} disabled={busy}>Cambia</button>
          </div>
        </div>
      ) : (
        <div className={`rounded-[1.55rem] border-2 border-dashed p-6 text-center transition sm:p-9 ${dragging ? 'border-mint bg-mint-soft' : 'border-brand/20 bg-ivory/80'}`} onDragEnter={(event) => { event.preventDefault(); setDragging(true) }} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setDragging(false)} onDrop={dropFile}>
          <div className="mx-auto grid size-20 place-items-center rounded-full bg-brand-soft text-brand"><CameraIcon className="size-9" /></div>
          <h3 className="mt-5 text-lg font-extrabold text-brand">Una foto nitida, dall’alto</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">Tieni tutto il piatto nell’inquadratura e usa una buona luce. Ottimizziamo noi il file prima dell’invio.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-brand px-4 font-bold text-white hover:bg-brand-deep" type="button" onClick={() => cameraInput.current?.click()}><CameraIcon className="size-5" /> Scatta foto</button>
            <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-brand/15 bg-white px-4 font-bold text-brand hover:bg-brand-soft" type="button" onClick={() => galleryInput.current?.click()}><ImageIcon className="size-5" /> Dalla galleria</button>
          </div>
          <p className="mt-5 text-xs font-medium text-muted">Puoi anche trascinare qui un’immagine · max 20 MB</p>
        </div>
      )}
    </section>
  )
}

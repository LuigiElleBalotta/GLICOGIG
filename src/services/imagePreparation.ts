const MAX_SOURCE_BYTES = 20 * 1024 * 1024
const MAX_EDGE = 1600
const MAX_OUTPUT_BYTES = 2.8 * 1024 * 1024
const JPEG_QUALITIES = [0.86, 0.76, 0.66]

export interface PreparedImage {
  base64: string
  previewUrl: string
  width: number
  height: number
  bytes: number
  mime: 'image/jpeg'
  name: string
}

interface LoadedImage {
  image: HTMLImageElement
  objectUrl: string
}

function loadImage(file: File): Promise<LoadedImage> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file)
    const image = new Image()

    image.onload = () => resolve({ image, objectUrl })
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Non riesco a leggere questa immagine. Prova con un altro file.'))
    }
    image.src = objectUrl
  })
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Non riesco a preparare la foto per l’analisi.'))
      },
      'image/jpeg',
      quality,
    )
  })
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result)
      resolve(result.slice(result.indexOf(',') + 1))
    }
    reader.onerror = () => reject(new Error('Non riesco a convertire la foto.'))
    reader.readAsDataURL(blob)
  })
}

export async function prepareImage(file: File): Promise<PreparedImage> {
  if (!file.type.startsWith('image/')) throw new Error('Il file selezionato non è un’immagine.')
  if (file.size > MAX_SOURCE_BYTES) throw new Error('La foto supera 20 MB. Scegline una più leggera.')

  const { image, objectUrl } = await loadImage(file)

  try {
    const scale = Math.min(1, MAX_EDGE / Math.max(image.naturalWidth, image.naturalHeight))
    const width = Math.max(1, Math.round(image.naturalWidth * scale))
    const height = Math.max(1, Math.round(image.naturalHeight * scale))
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    if (!context) throw new Error('Il browser non supporta l’elaborazione della foto.')

    canvas.width = width
    canvas.height = height
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, width, height)
    context.drawImage(image, 0, 0, width, height)

    let output: Blob | undefined
    for (const quality of JPEG_QUALITIES) {
      output = await canvasToBlob(canvas, quality)
      if (output.size <= MAX_OUTPUT_BYTES) break
    }

    if (!output || output.size > MAX_OUTPUT_BYTES) {
      throw new Error('La foto compressa è ancora troppo grande. Prova a ritagliarla.')
    }

    return {
      base64: await blobToBase64(output),
      previewUrl: URL.createObjectURL(output),
      width,
      height,
      bytes: output.size,
      mime: 'image/jpeg',
      name: file.name || 'foto-piatto.jpg',
    }
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}

export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes)) return ''
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

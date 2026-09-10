export interface ShareCardItem {
  label: string
  value: string
}

export interface ShareCardData {
  title: string
  subtitle?: string
  items: readonly ShareCardItem[]
  note?: string
}

export interface ShareCardOptions {
  fileName?: string
}

const CARD_WIDTH = 1_080
const MIN_CARD_HEIGHT = 1_080
const BACKGROUND = '#020611'
const PANEL = '#0b1929'
const PRIMARY = '#29b6ff'
const SECONDARY = '#f6c85f'
const TEXT = '#e8f7ff'
const MUTED = '#a9bfd3'

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): void {
  const safeRadius = Math.min(radius, width / 2, height / 2)
  context.beginPath()
  context.moveTo(x + safeRadius, y)
  context.lineTo(x + width - safeRadius, y)
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius)
  context.lineTo(x + width, y + height - safeRadius)
  context.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height)
  context.lineTo(x + safeRadius, y + height)
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius)
  context.lineTo(x, y + safeRadius)
  context.quadraticCurveTo(x, y, x + safeRadius, y)
  context.closePath()
}

function drawTextLines(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): number {
  const words = text.split(/\s+/).filter(Boolean)
  if (!words.length) return y

  let line = words[0]
  let cursorY = y
  for (let index = 1; index < words.length; index += 1) {
    const candidate = `${line} ${words[index]}`
    if (context.measureText(candidate).width <= maxWidth) {
      line = candidate
    } else {
      context.fillText(line, x, cursorY)
      line = words[index]
      cursorY += lineHeight
    }
  }
  context.fillText(line, x, cursorY)
  return cursorY
}

function createCanvas(data: ShareCardData): HTMLCanvasElement {
  if (typeof document === 'undefined') {
    throw new Error('Canvas is unavailable outside a browser')
  }

  const itemHeight = 140
  const noteHeight = data.note ? 170 : 0
  const height = Math.max(MIN_CARD_HEIGHT, 500 + data.items.length * itemHeight + noteHeight)
  const canvas = document.createElement('canvas')
  canvas.width = CARD_WIDTH
  canvas.height = height

  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas 2D is unavailable')

  const background = context.createLinearGradient(0, 0, CARD_WIDTH, height)
  background.addColorStop(0, BACKGROUND)
  background.addColorStop(1, '#07111f')
  context.fillStyle = background
  context.fillRect(0, 0, CARD_WIDTH, height)

  context.fillStyle = PRIMARY
  context.font = '700 42px system-ui, sans-serif'
  context.fillText('GLICOGIG', 84, 104)

  context.fillStyle = TEXT
  context.font = '700 72px system-ui, sans-serif'
  const titleBottom = drawTextLines(context, data.title, 84, 210, 912, 82)

  let cursorY = titleBottom + 70
  if (data.subtitle) {
    context.fillStyle = MUTED
    context.font = '400 34px system-ui, sans-serif'
    cursorY = drawTextLines(context, data.subtitle, 84, cursorY, 912, 46) + 58
  }

  for (let index = 0; index < data.items.length; index += 1) {
    const item = data.items[index]
    roundedRect(context, 84, cursorY, 912, 112, 28)
    context.fillStyle = PANEL
    context.fill()

    context.fillStyle = MUTED
    context.font = '500 30px system-ui, sans-serif'
    context.fillText(item.label, 124, cursorY + 69)

    context.fillStyle = index % 2 === 0 ? PRIMARY : SECONDARY
    context.font = '700 42px system-ui, sans-serif'
    context.textAlign = 'right'
    context.fillText(item.value, 956, cursorY + 72)
    context.textAlign = 'left'
    cursorY += itemHeight
  }

  if (data.note) {
    context.fillStyle = MUTED
    context.font = '400 28px system-ui, sans-serif'
    drawTextLines(context, data.note, 84, cursorY + 28, 912, 40)
  }

  return canvas
}

function canvasToPng(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('PNG encoding failed'))
    }, 'image/png')
  })
}

/** Disegna una card GLICOGIG usando esclusivamente i dati ricevuti. */
export async function creaCardPng(data: ShareCardData): Promise<Blob> {
  return canvasToPng(createCanvas(data))
}

function downloadBlob(blob: Blob, fileName: string): boolean {
  if (typeof document === 'undefined' || typeof URL === 'undefined') return false

  const objectUrl = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = objectUrl
  anchor.download = fileName
  anchor.style.display = 'none'
  document.body.append(anchor)

  try {
    anchor.click()
    return true
  } finally {
    anchor.remove()
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 0)
  }
}

function pngFileName(value?: string): string {
  const fileName = value?.trim() || 'glicogig-card.png'
  return fileName.toLowerCase().endsWith('.png') ? fileName : `${fileName}.png`
}

/** Condivide il PNG come File quando supportato, altrimenti avvia un download locale. */
export async function condividiCard(
  data: ShareCardData,
  options: ShareCardOptions = {},
): Promise<boolean> {
  try {
    const blob = await creaCardPng(data)
    const fileName = pngFileName(options.fileName)

    if (
      typeof navigator !== 'undefined'
      && typeof navigator.share === 'function'
      && typeof navigator.canShare === 'function'
      && typeof File !== 'undefined'
    ) {
      try {
        const file = new File([blob], fileName, { type: 'image/png' })
        const shareData: ShareData = { files: [file], title: 'GLICOGIG' }
        if (navigator.canShare(shareData)) {
          try {
            await navigator.share(shareData)
            return true
          } catch (error) {
            if (
              typeof DOMException !== 'undefined'
              && error instanceof DOMException
              && error.name === 'AbortError'
            ) return false
          }
        }
      } catch {
        // Un errore di supporto File/canShare passa al download locale.
      }
    }

    return downloadBlob(blob, fileName)
  } catch {
    return false
  }
}

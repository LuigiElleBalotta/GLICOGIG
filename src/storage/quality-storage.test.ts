import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type {
  DiaryEntry,
  DiarySnapshotInput,
  RegisterDiaryEntryInput,
} from '../types/diary'
import { getJSON, setJSON } from './localJson'
import { QUIZ_STORAGE_KEYS, salvaRisultato, statoQuiz } from './quizStore'

type DiaryStore = typeof import('./diaryStore')

const BASE_NOW = new Date(2025, 0, 2, 12).getTime()
const UTC_DAY_MS = 86_400_000

async function freshDiaryStore(): Promise<DiaryStore> {
  vi.resetModules()
  return import('./diaryStore')
}

function diaryInput(overrides: Partial<RegisterDiaryEntryInput> = {}): RegisterDiaryEntryInput {
  return {
    nome: 'Voce strutturale test-only',
    fascia: 'medio',
    cg: 4,
    kcal: 120,
    carbo: 20,
    prot: 5,
    grassi: 2,
    fibre: 3,
    grammi: 80,
    ...overrides,
  }
}

function diaryEntry(overrides: Partial<DiaryEntry> = {}): DiaryEntry {
  return {
    id: 'entry-structural-0',
    ts: BASE_NOW,
    giorno: '2025-01-02',
    nome: 'Voce strutturale test-only',
    nome_en: null,
    nome_es: null,
    nome_de: null,
    nome_fr: null,
    fonte: null,
    fascia: 'medio',
    cg: 4,
    kcal: 120,
    carbo: 20,
    prot: 5,
    grassi: 2,
    fibre: 3,
    grammi: 80,
    ...overrides,
  }
}

function dateForUtcDay(day: number): Date {
  return new Date(day * UTC_DAY_MS + 12 * 60 * 60 * 1000)
}

beforeEach(() => {
  window.localStorage.clear()
  vi.useRealTimers()
})

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('localJson best-effort', () => {
  it('restituisce lo stesso fallback per chiave assente o JSON corrotto e non valida lo schema', () => {
    const fallback = { safe: true }
    expect(getJSON('missing', fallback)).toBe(fallback)

    window.localStorage.setItem('corrupt', '{rotto')
    expect(getJSON('corrupt', fallback)).toBe(fallback)

    window.localStorage.setItem('unvalidated', JSON.stringify('not-an-object'))
    expect(getJSON<{ safe: boolean }>('unvalidated', fallback)).toBe('not-an-object')
    window.localStorage.setItem('null-value', 'null')
    expect(getJSON('null-value', fallback)).toBeNull()
  })

  it('serializza esattamente i valori validi e intercetta errori di lettura e scrittura', () => {
    const value = { nested: ['a', 1, true] }
    expect(setJSON('valid', value)).toBe(true)
    expect(window.localStorage.getItem('valid')).toBe(JSON.stringify(value))

    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('read denied')
    })
    expect(getJSON('valid', value)).toBe(value)

    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('write denied')
    })
    expect(setJSON('denied', value)).toBe(false)
  })

  it('rifiuta serializzazioni undefined o circolari senza invocare setItem', () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem')
    expect(setJSON('undefined', undefined)).toBe(false)
    const circular: { self?: unknown } = {}
    circular.self = circular
    expect(setJSON('circular', circular)).toBe(false)
    expect(setItem).not.toHaveBeenCalled()
  })
})

describe('snapshot, caricamento e query diario', () => {
  it('normalizza nullish, arrotonda dopo il calcolo kcal e rifiuta numeri non finiti', async () => {
    const { snapshotDaVoce } = await freshDiaryStore()
    const input = {
      nome: 'Snapshot strutturale test-only',
      fascia: 'medio',
      carbo: 0.49,
      prot: 0.49,
      grassi: 0.49,
      fibre: 0.49,
      cg: 1.5,
      grammi: 10.5,
      kcal: null,
    } satisfies DiarySnapshotInput
    expect(snapshotDaVoce(input)).toEqual({
      nome: input.nome,
      nome_en: null,
      nome_es: null,
      nome_de: null,
      nome_fr: null,
      fonte: null,
      fascia: 'medio',
      cg: 2,
      kcal: 9,
      carbo: 0,
      prot: 0,
      grassi: 0,
      fibre: 0,
      grammi: 11,
    })

    for (const field of ['cg', 'kcal', 'carbo', 'prot', 'grassi', 'fibre', 'grammi'] as const) {
      expect(() => snapshotDaVoce({ ...diaryInput(), [field]: Number.POSITIVE_INFINITY }))
        .toThrow(new TypeError('Il diario accetta solo valori numerici finiti.'))
    }
  })

  it('carica una sola volta, mantiene ordine e protegge il contenitore restituito', async () => {
    const persisted = [
      diaryEntry({ id: 'later', ts: 2 }),
      diaryEntry({ id: 'earlier', ts: 1 }),
    ]
    window.localStorage.setItem('glicogig_diario', JSON.stringify(persisted))
    const store = await freshDiaryStore()
    const loaded = store.caricaDiario()
    expect(loaded.map(({ id }) => id)).toEqual(['later', 'earlier'])
    loaded.pop()
    expect(store.vociTutte()).toHaveLength(2)

    window.localStorage.setItem('glicogig_diario', JSON.stringify([diaryEntry({ id: 'replacement' })]))
    expect(store.caricaDiario().map(({ id }) => id)).toEqual(['later', 'earlier'])
  })

  it.each([
    ['JSON corrotto', '{rotto'],
    ['JSON valido non-array', JSON.stringify({ invalid: true })],
  ])('degrada a diario vuoto per %s', async (_label, raw) => {
    window.localStorage.setItem('glicogig_diario', raw)
    const store = await freshDiaryStore()
    expect(store.caricaDiario()).toEqual([])
  })

  it('calcola giorno locale, filtri, ordine e totali senza mutare le voci', async () => {
    const values = [
      diaryEntry({ id: 'd4', giorno: '2025-01-04', kcal: 1, carbo: 1, prot: 1, grassi: 1, fibre: 1 }),
      diaryEntry({ id: 'd1', giorno: '2025-01-01', kcal: 2, carbo: 2, prot: 2, grassi: 2, fibre: 2 }),
      diaryEntry({ id: 'd3', giorno: '2025-01-03', kcal: 3, carbo: 3, prot: 3, grassi: 3, fibre: 3 }),
      diaryEntry({ id: 'd2', giorno: '2025-01-02', kcal: 4, carbo: 4, prot: 4, grassi: 4, fibre: 4 }),
    ]
    window.localStorage.setItem('glicogig_diario', JSON.stringify(values))
    const store = await freshDiaryStore()
    expect(store.giornoLocale(new Date(2025, 0, 2, 12))).toBe('2025-01-02')
    expect(store.vociDelGiorno('2025-01-03').map(({ id }) => id)).toEqual(['d3'])
    expect(store.vociUltimiGiorni(2.9, new Date(2025, 0, 3, 12)).map(({ id }) => id))
      .toEqual(['d4', 'd3', 'd2'])
    expect(store.vociUltimiGiorni(0, new Date(2025, 0, 3, 12)).map(({ id }) => id))
      .toEqual(['d4', 'd3'])
    expect(store.totali(values)).toEqual({ kcal: 10, carbo: 10, prot: 10, grassi: 10, fibre: 10, n: 4 })
    expect(store.totali([])).toEqual({ kcal: 0, carbo: 0, prot: 0, grassi: 0, fibre: 0, n: 0 })
  })
})

describe('CRUD, ordine, cap e copie del diario', () => {
  it('registra in ordine con ID unici, persiste e restituisce una copia', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(BASE_NOW)
    const store = await freshDiaryStore()
    const first = store.registraMangiato(diaryInput({ nome: 'Prima' }))
    const second = store.registraMangiato(diaryInput({ nome: 'Seconda' }))

    expect(first.ts).toBe(BASE_NOW)
    expect(first.giorno).toBe(store.giornoLocale(BASE_NOW))
    expect(first.id).toMatch(new RegExp(`^d${BASE_NOW.toString(36)}`))
    expect(second.id).not.toBe(first.id)
    expect(store.vociTutte().map(({ nome }) => nome)).toEqual(['Prima', 'Seconda'])
    expect(JSON.parse(window.localStorage.getItem(store.DIARY_STORAGE_KEY) ?? 'null')).toHaveLength(2)

    first.nome = 'Mutazione esterna'
    expect(store.vociTutte()[0].nome).toBe('Prima')
  })

  it('rinomina in tutte le lingue, sposta slot e distingue mutazioni da no-op', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(BASE_NOW)
    const store = await freshDiaryStore()
    const created = store.registraMangiato(diaryInput({
      nome_en: 'Old EN', nome_es: 'Old ES', nome_de: 'Old DE', nome_fr: 'Old FR',
    }))
    const listener = vi.fn()
    const unsubscribe = store.sottoscriviDiario(listener)
    expect(listener).toHaveBeenCalledTimes(1)

    const renamed = 'x'.repeat(65)
    expect(store.rinominaVoce(created.id, `  ${renamed}  `)).toBe(true)
    const entry = store.vociTutte()[0]
    expect(entry.nome).toBe('x'.repeat(60))
    expect([entry.nome_en, entry.nome_es, entry.nome_de, entry.nome_fr])
      .toEqual(Array(4).fill('x'.repeat(60)))
    expect(store.rinominaVoce(created.id, '   ')).toBe(false)
    expect(store.rinominaVoce('missing', 'Nome')).toBe(false)

    expect(store.spostaSlot(created.id, 'cena')).toBe(true)
    expect(store.vociTutte()[0].slot).toBe('cena')
    expect(store.spostaSlot(created.id, null)).toBe(true)
    expect(store.vociTutte()[0]).not.toHaveProperty('slot')
    expect(store.spostaSlot('missing', 'cena')).toBe(false)

    expect(store.rimuoviDalDiario('missing')).toBe(false)
    expect(store.rimuoviDalDiario(created.id)).toBe(true)
    expect(store.vociTutte()).toEqual([])
    expect(window.localStorage.getItem(store.DIARY_STORAGE_KEY)).toBe('[]')
    expect(listener).toHaveBeenCalledTimes(5)
    unsubscribe()
  })

  it('mantiene solo le ultime 800 voci dopo una registrazione', async () => {
    const oldEntries = Array.from({ length: 800 }, (_, index) => diaryEntry({
      id: `old-${index}`,
      ts: index,
      giorno: '2025-01-01',
    }))
    window.localStorage.setItem('glicogig_diario', JSON.stringify(oldEntries))
    vi.useFakeTimers()
    vi.setSystemTime(BASE_NOW)
    const store = await freshDiaryStore()
    store.registraMangiato(diaryInput({ nome: 'Nuova voce strutturale' }))
    const all = store.vociTutte()
    expect(all).toHaveLength(store.MAX_DIARY_ENTRIES)
    expect(all[0].id).toBe('old-1')
    expect(all.some(({ id }) => id === 'old-0')).toBe(false)
    expect(all.at(-1)?.nome).toBe('Nuova voce strutturale')
  })

  it('mantiene memoria e notifiche anche quando la persistenza fallisce', async () => {
    const store = await freshDiaryStore()
    const listener = vi.fn()
    store.sottoscriviDiario(listener)
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('write denied')
    })
    expect(() => store.registraMangiato(diaryInput())).not.toThrow()
    expect(store.vociTutte()).toHaveLength(1)
    expect(listener).toHaveBeenCalledTimes(2)
  })
})

describe('slot pendente e subscription diario', () => {
  it('applica TTL strettamente inferiore, consumo one-shot e nessuna notifica allo slot', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(BASE_NOW)
    const store = await freshDiaryStore()
    const listener = vi.fn()
    const unsubscribe = store.sottoscriviDiario(listener)
    const initialSnapshot = listener.mock.calls[0][0] as DiaryEntry[]
    initialSnapshot.push(diaryEntry({ id: 'external-array-mutation' }))
    expect(store.vociTutte()).toEqual([])

    store.impostaSlotPendente('pranzo')
    expect(listener).toHaveBeenCalledTimes(1)
    vi.setSystemTime(BASE_NOW + store.PENDING_SLOT_TTL_MS - 1)
    const withinTtl = store.registraMangiato(diaryInput({ nome: 'Nel TTL' }))
    expect(withinTtl.slot).toBe('pranzo')

    const oneShot = store.registraMangiato(diaryInput({ nome: 'One shot' }))
    expect(oneShot).not.toHaveProperty('slot')

    store.impostaSlotPendente('cena')
    const pendingCreatedAt = Date.now()
    vi.setSystemTime(pendingCreatedAt + store.PENDING_SLOT_TTL_MS)
    const expired = store.registraMangiato(diaryInput({ nome: 'Scaduto' }))
    expect(expired).not.toHaveProperty('slot')

    expect(listener).toHaveBeenCalledTimes(4)
    unsubscribe()
    store.registraMangiato(diaryInput({ nome: 'Dopo cleanup' }))
    expect(listener).toHaveBeenCalledTimes(4)
  })

  it('lo slot esplicito prevale ma consuma il pending; null recupera il pending', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(BASE_NOW)
    const store = await freshDiaryStore()
    store.impostaSlotPendente('pending-a')
    expect(store.registraMangiato(diaryInput({ slot: 'esplicito' })).slot).toBe('esplicito')
    expect(store.registraMangiato(diaryInput())).not.toHaveProperty('slot')

    store.impostaSlotPendente('pending-b')
    expect(store.registraMangiato(diaryInput({ slot: null })).slot).toBe('pending-b')
    store.impostaSlotPendente('')
    expect(store.registraMangiato(diaryInput())).not.toHaveProperty('slot')
  })
})

describe('quiz store', () => {
  const today = 20_000

  it('distingue oggi, ieri, streak scaduta e ultimo giorno futuro sul calendario UTC', () => {
    window.localStorage.setItem(QUIZ_STORAGE_KEYS.ultimoGiorno, JSON.stringify(today))
    window.localStorage.setItem(QUIZ_STORAGE_KEYS.streak, JSON.stringify(3))
    window.localStorage.setItem(QUIZ_STORAGE_KEYS.record, JSON.stringify(8))
    window.localStorage.setItem(QUIZ_STORAGE_KEYS.scoreOggi, JSON.stringify(7))
    expect(statoQuiz(dateForUtcDay(today))).toEqual({ fattoOggi: true, streak: 3, record: 8, scoreOggi: 7 })

    window.localStorage.setItem(QUIZ_STORAGE_KEYS.ultimoGiorno, JSON.stringify(today - 1))
    expect(statoQuiz(dateForUtcDay(today))).toEqual({ fattoOggi: false, streak: 3, record: 8, scoreOggi: null })

    window.localStorage.setItem(QUIZ_STORAGE_KEYS.ultimoGiorno, JSON.stringify(today - 2))
    expect(statoQuiz(dateForUtcDay(today))).toEqual({ fattoOggi: false, streak: 0, record: 8, scoreOggi: null })
    window.localStorage.setItem(QUIZ_STORAGE_KEYS.ultimoGiorno, JSON.stringify(today + 1))
    expect(statoQuiz(dateForUtcDay(today))).toEqual({ fattoOggi: false, streak: 0, record: 8, scoreOggi: null })
  })

  it('crea, prolunga e non incrementa due volte la streak aggiornando solo il record migliore', () => {
    expect(salvaRisultato(6, dateForUtcDay(today))).toEqual({
      fattoOggi: true, streak: 1, record: 6, scoreOggi: 6,
    })
    expect(statoQuiz(dateForUtcDay(today))).toEqual({
      fattoOggi: true, streak: 1, record: 6, scoreOggi: 6,
    })
    expect(salvaRisultato(5, dateForUtcDay(today))).toEqual({
      fattoOggi: true, streak: 1, record: 6, scoreOggi: 5,
    })
    expect(salvaRisultato(9, dateForUtcDay(today + 1))).toEqual({
      fattoOggi: true, streak: 2, record: 9, scoreOggi: 9,
    })
  })

  it('degrada chiavi corrotte e letture negate ai fallback indipendenti', () => {
    window.localStorage.setItem(QUIZ_STORAGE_KEYS.ultimoGiorno, '{rotto')
    window.localStorage.setItem(QUIZ_STORAGE_KEYS.streak, JSON.stringify('3'))
    window.localStorage.setItem(QUIZ_STORAGE_KEYS.record, JSON.stringify(4))
    expect(statoQuiz(dateForUtcDay(today))).toEqual({
      fattoOggi: false, streak: 0, record: 4, scoreOggi: null,
    })

    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('read denied')
    })
    expect(statoQuiz(dateForUtcDay(today))).toEqual({
      fattoOggi: false, streak: 0, record: 0, scoreOggi: null,
    })
  })

  it('restituisce lo stato calcolato senza propagare un fallimento di scrittura', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('write denied')
    })
    expect(() => salvaRisultato(7, dateForUtcDay(today))).not.toThrow()
    expect(salvaRisultato(7, dateForUtcDay(today))).toEqual({
      fattoOggi: true, streak: 1, record: 7, scoreOggi: 7,
    })
  })
})

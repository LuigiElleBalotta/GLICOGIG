import { afterEach, describe, expect, it, vi } from 'vitest'
import { createEphemeralRequestDeviceId } from './requestDeviceId'
import { createPhotoAnalysisService } from './photoAnalysisService'
import type { AnalizzaRequest } from '../types/analysis'

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('createEphemeralRequestDeviceId', () => {
  it('mantiene il prefisso VERIFIED dev_', () => {
    expect(createEphemeralRequestDeviceId()).toMatch(/^dev_[a-z0-9]+$/)
  })
})

describe('photoAnalysisService', () => {
  it('genera e scarta un device_id diverso per ogni richiesta', async () => {
    vi.spyOn(Math, 'random').mockReturnValueOnce(0.12345).mockReturnValueOnce(0.6789)
    vi.spyOn(Date, 'now').mockReturnValue(1_700_000_000_000)
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({
      e_cibo: true,
      piatto: 'Piatto',
      ingredienti: [{ nome: 'Ingrediente', catalogo_id: 'ingrediente', grammi: 100 }],
    }), { status: 200, headers: { 'Content-Type': 'application/json' } }))
    vi.stubGlobal('fetch', fetchMock)
    const service = createPhotoAnalysisService({ endpoint: '/analizza', premium: true })

    await service.analyze({ imageBase64: 'base64-a' })
    await service.analyze({ imageBase64: 'base64-b' })

    const payloads = fetchMock.mock.calls.map((call) => JSON.parse(String(call[1]?.body)) as AnalizzaRequest)
    expect(payloads[0].device_id).toMatch(/^dev_/)
    expect(payloads[1].device_id).toMatch(/^dev_/)
    expect(payloads[0].device_id).not.toBe(payloads[1].device_id)
    expect(payloads.every((payload) => payload.premium === true && payload.mime === 'image/jpeg')).toBe(true)
  })
})

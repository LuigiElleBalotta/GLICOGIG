import { describe, expect, it } from 'vitest'
import { CATALOG_EXTRACTION_META, getFoodByCatalogId } from './foodCatalog'

const EXPECTED = [
  ['spaghetti-cotti-al-dente', 'Spaghetti cotti al dente', 29.06],
  ['guanciale', 'Guanciale', 0],
  ['uovo-crudo-intero', 'Uovo crudo intero', 0.72],
  ['pecorino-romano', 'Pecorino romano', 3.63],
  ['passata-di-pomodoro', 'Passata di pomodoro', 4.5],
  ['mozzarella', 'Mozzarella', 2.4],
  ['pizza-margherita', 'Pizza margherita', 28.23],
] as const

describe('foodCatalog VERIFIED #14256', () => {
  it.each(EXPECTED)('risolve %s tramite exact catalogo_id', (id, name, availableCarbs) => {
    const food = getFoodByCatalogId(id)
    expect(food?.id).toBe(id)
    expect(food?.nome).toBe(name)
    expect(food?.carboidrati_disponibili_g).toBe(availableCarbs)
  })

  it('non inventa fallback per ID assente o non estratto', () => {
    expect(getFoodByCatalogId(undefined)).toBeUndefined()
    expect(getFoodByCatalogId('SPAGHETTI-COTTI-AL-DENTE')).toBeUndefined()
    expect(getFoodByCatalogId('id-non-presente')).toBeUndefined()
  })

  it('dichiara il catalogo completo estratto dall’APK', () => {
    expect(CATALOG_EXTRACTION_META).toMatchObject({ totalEntriesInApk: 228, extractedEntries: 228, evidence: 'VERIFIED' })
  })
})

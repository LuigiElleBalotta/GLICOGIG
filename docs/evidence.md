# Evidenze di reverse engineering

Le voci `VERIFIED` derivano dal bundle Hermes locale dell'APK. Il progetto non usa dati nutrizionali esterni e non sostituisce valori mancanti con stime inventate.

| Comportamento | Stato | Evidenza |
| --- | --- | --- |
| Payload foto con `image_base64`, `device_id`, `mime`, `premium` | VERIFIED | Hermes `#15911`, offset `0x00304fc7` |
| Formato ID `dev_` + random base36 + timestamp base36 | VERIFIED | Hermes `#9468`, offset `0x0026674b` |
| ID per-request senza persistenza nella web app | Divergenza richiesta | `requestDeviceId.ts`; l'APK lo persiste, la web app no |
| Root catalogo `{ _meta, alimenti[228] }` | VERIFIED | Hermes `#14256`, offset `0x002cd72e` |
| 228 alimenti e 228 ID univoci | VERIFIED | Estrazione e validazione di `scripts/extract_apk_catalog.py` |
| 37 campi base per alimento | VERIFIED | Literal buffer di `#14256`; 219 voci hanno 37 campi |
| Campi APK aggiuntivi preservati | VERIFIED | 8 voci con `maturazione`, 1 con `nota_curatela`; 9 voci da 38 campi |
| Dataset web completo 228/228 | VERIFIED | `src/catalog/apkCatalogData.json`, generato direttamente da `#14256` |
| Lookup esatto tramite `catalogo_id`; voce non risolta ignorata | VERIFIED | `voceFromFoto #15664` e `calcolaImpatto #15923` |
| Grammi positivi, altrimenti `porzione_standard_g` | VERIFIED | `#15664` istruzioni 35–56; `#15923` istruzioni 38–50 |
| Scaling `valore × grammi / 100` | VERIFIED | `#15664` per carboidrati, fibre, proteine, grassi |
| Scaling energia, zuccheri, saturi e sodio | INFERRED | Stesse unità per 100 g dichiarate in `_meta`; non lette da `#15664` |
| Normalizzazione per 100 g `totale × 100 / grammiTotali` | VERIFIED | `per100 #15665`, offset `0x002f8df0` |
| Modifica grammi: round e clamp `0..2000` | VERIFIED | `setGrammi #15811`, offset `0x00301e45` |
| Modifica grammi senza nuova richiesta fotografica | Implementazione web | Aggiornamento del solo stato React in `App.tsx`; ricalcolo locale nel `ResultPanel` |
| CG ingrediente `IG × carboidrati_porzione / 100` | VERIFIED | `calcolaImpatto #15923`, offset `0x00305388` |
| CG totale arrotondato a 0,1 | VERIFIED | `calcolaImpatto #15923` |
| Contributi inclusi da `CG >= 0,5` e arrotondati a 0,1 | VERIFIED | `calcolaImpatto #15923` |
| Contributi ordinati per CG decrescente | VERIFIED | Comparator `#15924` |
| Fasce CG: `<=10` basso, `<=19` medio, oltre 19 alto | VERIFIED | `fasciaDa #15922`, offset `0x00305365` |
| Affidabilità media con copertura `trovati/totali >= 0,6`, altrimenti bassa | VERIFIED | `calcolaImpatto #15923` |
| Modello/provider dietro il Worker | UNKNOWN | Sorgente Worker assente dal materiale locale |

## Estrazione del catalogo

L'estrattore supporta la versione Hermes 96 osservata e controlla prima di scrivere l'output:

- ID funzione `#14256`;
- offset `0x002cd72e`;
- root con sole chiavi `_meta` e `alimenti`;
- metadato e array entrambi pari a 228 voci;
- almeno 37 campi per voce;
- tipo di `sinonimi` e `revisione`;
- unicità di tutti gli ID;
- insieme limitato alle istruzioni bytecode effettivamente osservate.

Distribuzione dell'output corrente:

| Categoria | Voci |
| --- | ---: |
| cereali | 31 |
| legumi | 13 |
| verdura | 34 |
| frutta | 32 |
| dolci | 14 |
| latticini | 25 |
| bevande | 14 |
| carne | 24 |
| pesce | 17 |
| uova | 3 |
| grassi | 2 |
| frutta secca | 9 |
| snack | 3 |
| salse | 7 |
| **Totale** | **228** |

## Limiti dichiarati

- La web app può calcolare soltanto ingredienti per cui il backend restituisce un `catalogo_id` presente nel catalogo APK.
- Un IG `null` resta `null` ed esclude quella voce dal CG, senza fallback esterni.
- Energia, zuccheri, grassi saturi e sodio sono scalati in modo coerente con le unità per 100 g del catalogo, ma questo scaling non è stato osservato esplicitamente nella funzione `#15664`.
- Il provider e il modello usati dal Worker non sono verificabili dai file locali disponibili.

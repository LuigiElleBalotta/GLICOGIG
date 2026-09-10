# GLICODEN 1.0.16 → GLICOGIG — piano implementativo

Data: 10 settembre 2026.

Questo piano traduce il delta verificato in `version-1.0.16-delta.md` nell’architettura React esistente. Tutti i contenuti provengono dagli artefatti locali; non vengono introdotti dati nutrizionali esterni, telemetria, account, referral, paywall o campi upstream non verificati.

## Confini invarianti

- I dataset in `docs/extracted` restano evidenza immutabile; copie byte-per-byte validate vengono generate sotto `src/data` da `scripts/sync_verified_runtime_data.py`.
- I conteggi UI derivano esclusivamente da `array.length`: 307 alimenti, 209 ricette, 50 capitoli, 157 domande.
- Foto e barcode passano da Function server-side. Il browser non contatta direttamente gli upstream e non invia cookie, referrer, dominio o nome GLICOGIG.
- Diario e quiz usano solo `localStorage`; nessuna immagine/Base64 viene persistita.
- `nascondi=true` esclude un alimento da ricerca/selezione, non dal lookup esatto usato da ingredienti e ricette.
- Valori nutrizionali `null` restano sconosciuti e sono mostrati come “n.d.”; non vengono completati con zero. Carboidrati disponibili, proteine e grassi restano numerici nel dataset.
- Il contratto foto esistente (`image_base64`, `device_id`, `mime`, `premium`) non viene esteso.

## Mappa file-by-file

### Dati e tipi

- `src/data/*.json`: copie runtime validate di catalogo, ricette, learning e quiz 1.0.16.
- `src/types/catalog.ts`: schema 1.0.16 nullable, i18n e campi opzionali `ig_variabile`, `nascondi`, `grammi_per_pezzo`.
- `src/types/content.ts`: ricette, capitoli/blocchi learning e domande quiz.
- `src/types/diary.ts`, `src/types/barcode.ts`: soli campi dimostrati dagli artefatti.
- `src/catalog/datasets.ts`: unico punto di import dei quattro dataset e conteggi reali.
- `src/catalog/verifiedCatalogData.ts`: re-export compatibile del catalogo 1.0.16.
- `src/catalog/foodCatalog.ts`: lookup ID, fallback nome/sinonimi deterministico e ricerca che rispetta `nascondi`.

### Dominio puro

- `src/domain/preparation.ts`: replica di `aggiustaIGperPreparazione #18406`.
- `src/domain/impactCalculator.ts`: porting di `calcolaImpatto #18423`, incluso fallback nome, preparazione, macro, CG, rilevamento cotto, classificazione e override piatto intero.
- `src/domain/nutritionCalculator.ts`: aggregazione locale con propagazione esplicita dei valori sconosciuti.
- `src/domain/stability.ts`: qualità, indice e livello da `#18453/#18454/#18458`.
- `src/domain/dailyQuiz.ts`: giorno UTC, Fisher–Yates/Mulberry32, FNV-1a e riallineamento opzioni per tutte le lingue.
- `src/domain/barcodeProduct.ts`: regex barcode, `num`, porzione e correzioni prodotti secchi verificate.
- `src/domain/progress.ts`: aggregati derivati esclusivamente dal diario locale.

Formula di preparazione verificata:

```text
f = (al dente ? 0,90 : 1)
  × (stracotto/frullato/passato/schiacciato ? 1,15 : 1)
  × (freddo/raffreddato/riposato ? 0,88 : 1)
  × (aceto/limone/acidulo ? 0,92 : 1)

se f = 1: IG invariato
altrimenti: clamp(1,100, round(clamp(IG-25, IG+25, IG×f)))
```

I match sono cumulativi e mantengono l’ordine nativo. Nessuna euristica aggiuntiva.

### Storage e servizi

- `src/storage/localJson.ts`: accesso tollerante a Web Storage.
- `src/storage/diaryStore.ts`: singleton/listener, UID nativo, giorno locale, limite 800, CRUD e totali.
- `src/storage/quizStore.ts`: chiavi logiche native, streak/record/score senza doppio incremento giornaliero.
- `api/barcode.ts`: GET validata, timeout 9 s, allowlist OFF, `no-store`.
- `src/services/barcodeService.ts`: client same-origin e parsing runtime.
- `src/services/shareCard.ts`: Canvas → PNG → Web Share; fallback download locale.
- `src/state/mealSession.tsx`: stato sessione pasto in memoria; nessun Base64 nello storage.

### Shell e schermate

Hash navigation senza React Router, sei tab coerenti con la gerarchia osservata:

1. `home` — riepilogo locale e accessi rapidi;
2. `search` — catalogo + inserimento barcode manuale e `BarcodeDetector` progressivo;
3. `photo` — flusso esistente preservato;
4. `recipes` — ricerca/filtri e dettaglio delle 209 ricette;
5. `diary` — voci, totali, settimana e stabilità;
6. `learn` — 50 capitoli e quiz quotidiano.

File principali: `components/AppShell.tsx`, `components/BottomTabs.tsx`, `screens/*`, `App.tsx`, `ResultPanel.tsx`, `Icons.tsx`, `index.css`.

Gli screenshot guidano struttura, gerarchia e navigazione; palette, wordmark e componenti restano GLICOGIG. Il font remoto Google viene rimosso in favore dello stack di sistema.

### PWA e documentazione

- `public/sw.js`: bump cache; `/api/*` resta sempre escluso.
- `public/manifest.webmanifest`: descrizione aggiornata alle funzioni locali realmente disponibili.
- `README.md`: architettura e funzionalità aggiornate solo dopo l’implementazione.

## Ordine di implementazione

1. Sincronizzazione dati, tipi e catalogo.
2. Calcoli pasto/preparazione, stabilità, quiz e barcode.
3. Storage diario/quiz e condivisione.
4. Proxy barcode e servizio browser.
5. Shell/hash navigation e sei schermate.
6. Integrazione azioni diario/share nel risultato foto.
7. PWA, CSS e documentazione.
8. Verifica statica/manuale e `git diff --check`; nessun lint/test/typecheck/build senza richiesta.

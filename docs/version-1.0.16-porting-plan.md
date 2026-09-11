# Versione sorgente 1.0.16 → GLICOGIG — piano implementativo

Data: 10 settembre 2026.

Questo piano traduce il delta verificato in `version-1.0.16-delta.md` nell’architettura React. Tutti i contenuti e gli algoritmi portati provengono dagli artefatti locali; non vengono introdotti dati nutrizionali esterni, telemetria, account, referral, paywall o campi upstream non verificati.

## Confini invarianti

- I file sotto `docs/extracted` e `docs/hbc-functions` restano evidenza; i payload runtime validati sono generati sotto `src/data`.
- I conteggi UI derivano da `array.length`: 307 alimenti, 209 ricette, 50 capitoli, 157 domande.
- Foto, testo e barcode passano da boundary server-side same-origin. Il browser non contatta direttamente gli upstream.
- Diario e quiz usano `localStorage`; il Pasto usa solo memoria React; immagini e Base64 non vengono persistiti.
- `nascondi=true` esclude un alimento dalla ricerca, non dal lookup esatto.
- Valori nutrizionali `null` restano sconosciuti e vengono mostrati come `n.d.`.
- Il contratto foto resta `{ image_base64, device_id, mime, premium }`; quello testo resta `{ text, device_id, premium, lang }`.
- Nessuna immagine ricetta viene pubblicata senza identità verificata fra ID ricetta, chiave Hermes e nome manifest.

## Mappa file-by-file

### Dati, tipi e catalogo

- `src/data/verified-1.0.16-*.json`: copie runtime validate di alimenti, ricette, learning e quiz.
- `src/types/catalog.ts`: schema nullable, nomi i18n e campi opzionali 1.0.16.
- `src/types/analysis.ts`: contratti Foto/testo, origine analisi, preset e modalità peso.
- `src/types/content.ts`, `src/types/diary.ts`, `src/types/barcode.ts`, `src/types/meal.ts`: soli campi dimostrati.
- `src/catalog/datasets.ts`: unico boundary dei quattro dataset e conteggi reali.
- `src/catalog/foodCatalog.ts`: lookup ID, fallback deterministico nome/sinonimi e rispetto di `nascondi`.
- `src/generated/recipeAssetMap.ts`: lookup ID→immagine generato da prove locali.

### Dominio puro

- `src/domain/preparation.ts`: replica `aggiustaIGperPreparazione #18406`.
- `src/domain/impactCalculator.ts`: porting `calcolaImpatto #18423`, inclusi fallback, preparazione, CG, pesi cotti, classificazione e override piatto intero.
- `src/domain/nutritionCalculator.ts`: aggregazione locale con propagazione dei valori sconosciuti.
- `src/domain/rawWeight.ts`: replica `grammiCrudi #18400`, `fattoreCrudo #18401` e `nomeSenzaCottura #18402` con nove regex/coefficienti ordinati.
- `src/domain/stability.ts`: qualità, indice e livello da `#18453/#18454/#18458`.
- `src/domain/dailyQuiz.ts`: giorno UTC, shuffle deterministico e riallineamento opzioni.
- `src/domain/barcodeProduct.ts`: regex barcode, porzione e correzioni prodotti secchi verificate.
- `src/domain/progress.ts`: porting di `datiAnelliOggi`, `pastoPiuDifficile`, `giorniConsecutivi`, `ratioBilancio`, `bilancioOggi`, `andamentoSettimana`, `verdettoSettimana`, `piattiPiuFacili` e `reportSettimana`.

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

Formule Progressi verificate:

- equilibrio: percentuale odierna di voci `trascurabile`/`basso`;
- freni: `clamp(0,1,(2×fibre+proteine+grassi)/carbo)`, con carbo zero pari al 100%;
- varietà: `round(min(100,12×nomiUnici+8×slotUnici))`;
- bilancio: `buono` da `0,6`, `discreto` da `0,3`, altrimenti `daBilanciare`;
- andamento: scostamento di almeno `±8%`; verdetto settimanale su quota di fasce media/alta.

### Boundary, storage e servizi

- `api/analyze.ts`: boundary Foto.
- `api/analyze-text.ts`: boundary testo validato; fallback endpoint server-side esplicito.
- `api/barcode.ts`: GET validata, timeout 9 s, allowlist Open Food Facts e `no-store`.
- `src/services/photoAnalysisService.ts`, `src/services/textAnalysisService.ts`: client same-origin e parser risposta condiviso.
- `src/services/barcodeService.ts`: client barcode same-origin.
- `src/services/shareCard.ts`: Canvas → PNG → Web Share; fallback download.
- `src/storage/diaryStore.ts`, `src/storage/quizStore.ts`: persistenza locale tollerante.
- `src/state/mealSession.tsx`: Pasto in memoria; TTL quattro ore verificato anche quando la sessione è già attiva.

### Foto e Pasto

La schermata Foto supporta fotografia e descrizione testuale. Entrambi i flussi producono lo stesso `AnalizzaResponse`, ma conservano `AnalysisOrigin` per Diario e sessione. I preset porzione `0,7/1/1,4` ricalcolano dalla snapshot canonica. Il toggle cotto/secco converte soltanto il peso mostrato e riconverte gli input in grammi cotti prima dei calcoli, evitando di applicare densità nutrizionali cotte a pesi secchi.

Dopo **Aggiungi al pasto**, l’utente può aprire il Pasto o analizzare un altro piatto. Snapshot e sessione non conservano Base64 o object URL. Il salvataggio aggregato nel Diario è fail-closed quando un elemento è irrisolto o un totale nutrizionale è `null`; la sessione resta modificabile e condivisibile senza trasformare dati mancanti in zero.

### Progressi e Consigli

`DiaryScreen` mostra anelli, bilancio, consecutività, pasto più difficile, andamento e report settimanale. `AdviceScreen`, route `#advice` raggiungibile dalla Home, combina esclusivamente Pasto effimero e Diario locale. Le parti Hermes che richiedono obiettivi non configurati non vengono mostrate come suggerimenti personalizzati.

### Ricette, detail e share

- `scripts/extract_recipe_asset_map.py` prova `Recipe.id === RECIPE_IMG key === manifest asset.name`, valida 209 JPEG e genera report, lookup e cartella pubblica.
- `docs/recipe-asset-map-1.0.16.json` registra conteggi, slot `5..213`, firme JPEG, MD5 packager e duplicati dichiarati.
- `RecipesScreen` usa soltanto `RECIPE_ASSET_BY_ID` per lista e dettaglio.
- Le route detail hash per alimenti, ricette e capitoli sono effimere e deterministiche.
- `SearchScreen` espone **Condividi questa scelta** tramite la share card locale.

### Shell e navigazione

La shell mantiene sei tab (`home`, `search`, `photo`, `recipes`, `diary`, `learn`) e route ausiliarie `meal`, `barcode`, `advice`, `explanation`. `advice` evidenzia la tab Diario; i link Home e contestuali rendono ogni route raggiungibile.

### PWA e documentazione

- `public/sw.js`: `/api/*` sempre escluso dalla cache.
- `public/manifest.webmanifest`: descrizione allineata alle funzioni reali.
- `README.md`: flussi, privacy, asset e configurazione aggiornati.

## Generazione riproducibile

```powershell
python scripts/sync_verified_runtime_data.py
python scripts/extract_recipe_asset_map.py
```

Il secondo script fallisce chiuso se conteggi, header Hermes, dipendenze, identità, firme JPEG o hash del packager non coincidono.

## Ordine di implementazione completato

1. Sincronizzazione dati, tipi e catalogo.
2. Calcoli pasto/preparazione, stabilità, quiz e barcode.
3. Storage Diario/quiz, Pasto e condivisione.
4. Boundary foto/testo/barcode e servizi browser.
5. Shell/hash navigation, sei tab e route ausiliarie.
6. Foto/testo, preset, crudo/cotto, Progressi, Consigli e share.
7. Mappa immagini ricetta verificata e documentazione.
8. Verifica statica e `git diff --check`; lint/test/typecheck/build rinviati alla milestone qualità come richiesto.

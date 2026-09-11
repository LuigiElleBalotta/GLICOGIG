# GLICOGIG

Web app React/TypeScript per analizzare un piatto, consultare alimenti e ricette, comporre un Pasto, registrare un Diario locale e usare contenuti educativi verificati. L’interfaccia mantiene brand e palette GLICOGIG; non replica identità, componenti commerciali o telemetria dell’app mobile osservata.

I dataset nutrizionali ed editoriali runtime provengono esclusivamente dall’estrazione verificata della versione sorgente 1.0.16. I valori mancanti restano `null` e vengono mostrati come `n.d.`: non vengono completati con stime o fonti nutrizionali esterne.

## Stato attuale

La shell usa navigazione hash con sei tab principali e route ausiliarie:

- **Home**: riepilogo del Diario, stabilità recente, accesso al Pasto e a Consigli;
- **Cerca**: catalogo locale, dettaglio nutrizionale, quantità modificabili e barcode;
- **Foto**: analisi da fotografia o descrizione testuale, preset porzione, conversione cotto/secco e sessione multipiatto;
- **Ricette**: 209 ricette embedded, 209 immagini verificate, dettaglio e salvataggio nel Diario;
- **Diario**: voci locali, rinomina/rimozione, indicatori Progressi, settimana e condivisione PNG;
- **Impara**: 50 capitoli embedded e quiz quotidiano su 157 domande;
- **Pasto**, **Consigli** e **Spiegazione**: route ausiliarie raggiungibili dalla Home o dai flussi contestuali.

I conteggi UI derivano sempre dalla lunghezza degli array runtime:

| Dataset verificato 1.0.16 | Elementi |
| --- | ---: |
| Alimenti | 307 |
| Ricette | 209 |
| Immagini ricetta verificate | 209 |
| Capitoli | 50 |
| Domande quiz | 157 |

I dataset sono in `src/data/verified-1.0.16-*.json` e vengono esposti soltanto da `src/catalog/datasets.ts`. I metadati upstream con totali obsoleti non sono usati per i conteggi.

## Analisi Foto e testo

```text
foto locale → JPEG/Base64 → /api/analyze ─┐
descrizione testuale → /api/analyze-text ─┴→ backend /analizza
                                              → ingredienti[]
                                              → catalogo embedded → nutrienti + CG
```

- `api/analyze.ts` e `api/analyze-text.ts` richiedono `APP_ACCESS_KEY`, validano payload e risposta e applicano timeout;
- il browser accetta soltanto path same-origin e non contatta direttamente Worker o servizi Google;
- il middleware Vite riusa gli stessi handler server-side senza inoltrare cookie, origine o referrer;
- `device_id` è effimero, ha prefisso `dev_` e viene rigenerato a ogni richiesta;
- l’analisi testuale invia esclusivamente i campi verificati `{ text, device_id, premium, lang }`;
- la risposta accetta ingredienti con grammi finiti nel range operativo `0..2000`;
- i preset `0,7×`, `1×` e `1,4×` ricalcolano localmente senza ripetere la richiesta;
- la modalità cotto/secco replica `fattoreCrudo`, `grammiCrudi` e `nomeSenzaCottura` verificati dagli artefatti Hermes: il campo mostra/accetta il peso secco, mentre nutrienti e CG restano calcolati sui grammi cotti canonici della voce catalogo;
- origine (`photo` o `text`) e affidabilità restano associate al risultato e al Diario;
- immagini, Base64 e object URL non vengono persistiti.

Il Pasto è effimero e resta solo in memoria. Una sessione già iniziata scade dopo quattro ore: il primo nuovo elemento successivo avvia una nuova sessione. Dopo l’aggiunta, il flusso propone esplicitamente di aprire il Pasto o analizzare un altro piatto. Il Diario rifiuta il salvataggio aggregato quando un elemento è irrisolto o un totale è `null`, così i dati mancanti non diventano zeri o calorie derivate.

## Barcode

Il browser chiama solo `/api/barcode`. Function e middleware locale interrogano Open Food Facts server-side con codice validato, timeout di 9 secondi, redirect disabilitati, risposta `no-store` e allowlist dei soli campi necessari. Questi dati di etichetta non arricchiscono né modificano il catalogo embedded.

Un prodotto può essere salvato nel Diario soltanto quando il nome risolve univocamente un alimento locale e sono disponibili sia l’IG locale sia i carboidrati dichiarati del prodotto. CG e fascia usano la stessa base coerente; altrimenti restano non disponibili.

Lo scanner usa `@zxing/browser` e `@zxing/library` con versioni pinned per EAN-13, EAN-8, UPC-A e UPC-E da camera o foto locale. Video e immagini restano nel browser, la scansione si arresta al primo codice valido e l’inserimento manuale rimane sempre disponibile.

## Catalogo, calcoli e Progressi

`src/catalog/foodCatalog.ts` fornisce lookup per ID e fallback deterministico per nome/sinonimo. Le voci con `nascondi=true` non compaiono nella ricerca, ma restano disponibili per ingredienti e ricette. Le collisioni ambigue non vengono risolte arbitrariamente.

Per ogni ingrediente risolto:

```text
valore_porzione = valore_per_100_g × grammi / 100
CG_ingrediente = IG_aggiustato × carboidrati_disponibili_porzione / 100
```

`src/domain/preparation.ts` replica `aggiustaIGperPreparazione #18406`; `src/domain/impactCalculator.ts` replica `calcolaImpatto #18423`, inclusi contributi `CG >= 0,5`, fasce, preparazioni veloci/liquide, pesi cotti e override verificati. I valori sconosciuti non vengono convertiti implicitamente in zero nell’UI aggregata.

`src/domain/progress.ts` replica le formule Hermes per anelli giornalieri, bilancio, consecutività, pasto più difficile, andamento, verdetto e report settimanale. Le schermate Diario e Consigli derivano tutto esclusivamente dalle voci reali del Diario e dal Pasto effimero; non creano obiettivi, dati demo o raccomandazioni cliniche.

## Ricette e immagini verificate

`scripts/extract_recipe_asset_map.py` pubblica immagini solo quando sono contemporaneamente vere le identità:

```text
Recipe.id === chiave RECIPE_IMG Hermes === assets[].name del manifest
```

Lo script rifiuta ordine, slug, similarità e confronto visivo come prove. Valida 209 ricette, 209 chiavi Hermes, 209 record manifest, 209 file fisici JPEG, slot dipendenza `5..213` e 209 hash MD5 del packager. I tre gruppi di payload duplicati sono dichiarati nel report e non vengono nascosti.

Output riproducibili:

- `docs/recipe-asset-map-1.0.16.json`: evidenze e validazione;
- `src/generated/recipeAssetMap.ts`: lookup runtime ID→asset;
- `public/recipes/*.jpg`: 209 JPEG verificati.

Per rigenerarli dagli artefatti locali:

```powershell
python scripts/extract_recipe_asset_map.py
```

## Diario, quiz e condivisione

Diario e quiz usano esclusivamente `localStorage`; il Pasto usa solo memoria React. Il Diario conserva al massimo 800 voci. La streak viene incrementata al massimo una volta nello stesso giorno. Il quiz usa rollover UTC; Diario e Progressi usano il giorno locale.

Le card PNG sono generate con Canvas sul dispositivo. Web Share o download vengono avviati solo da un’azione esplicita. Cerca espone anche **Condividi questa scelta** per un alimento selezionato.

## Privacy e confini intenzionali

- nessun Firebase Analytics/Messaging, advertising ID, SSAID o telemetria;
- nessun font remoto;
- nessuna chiamata browser diretta agli upstream foto, testo o barcode;
- nessun paywall, referral, invito, chat, autore, libro o contenuto commerciale;
- link educativi cliccabili soltanto se HTTPS e non personali/commerciali;
- nessun dato demo aggiunto a Diario o Progressi;
- nessun dato nutrizionale esterno usato per completare il catalogo.

La password del sito resta nel solo `sessionStorage` della scheda. Non inserire segreti nelle variabili `VITE_*`, perché vengono incluse nel bundle pubblico.

## PWA e offline

Manifest, icone, safe area e service worker rendono l’app installabile. In produzione il service worker precachea la shell, usa network-first per le navigazioni, cache-first per gli asset ed esclude sempre `/api/*`. Analisi foto/testo, lookup barcode e altre operazioni remote richiedono rete; UI, dataset e immagini embedded possono essere riaperti offline dopo un’installazione completata.

In sviluppo Vite il service worker non viene registrato. Camera e installazione PWA richiedono HTTPS oppure `localhost`.

## Sincronizzazione e prove documentali

Per risincronizzare i quattro dataset verificati:

```powershell
python scripts/sync_verified_runtime_data.py
```

Documenti principali:

- [`docs/version-1.0.16-delta.md`](docs/version-1.0.16-delta.md): confronto VERIFIED/INFERRED/SDK-only/EXCLUDED;
- [`docs/version-1.0.16-porting-plan.md`](docs/version-1.0.16-porting-plan.md): mappa di porting e invarianti;
- [`docs/version-1.0.16-audit.json`](docs/version-1.0.16-audit.json): inventario riproducibile;
- [`docs/recipe-asset-map-1.0.16.json`](docs/recipe-asset-map-1.0.16.json): prova ID→asset;
- `docs/hbc-functions/`: disassembly e decompilati Hermes usati come evidenza.

## Stack

- React 19
- TypeScript 5.9
- Vite 7
- Tailwind CSS 4
- Vercel Functions
- PWA senza plugin runtime aggiuntivi

## Avvio locale

Requisiti: Node.js compatibile con Vite 7 e npm.

```powershell
npm install
npm run dev
```

Copia `.env.example` in `.env.local` e imposta chiave ed endpoint server-side:

```powershell
Copy-Item .env.example .env.local
```

| Variabile | Ambito | Obbligatoria | Descrizione |
| --- | --- | --- | --- |
| `VITE_ANALYSIS_PATH` | Browser | No | Endpoint foto same-origin; default `/api/analyze` |
| `VITE_ANALYSIS_TEXT_PATH` | Browser | No | Endpoint testo same-origin; default `/api/analyze-text` |
| `VITE_ANALYSIS_PREMIUM` | Browser | No | Campo payload client; default `true` |
| `APP_ACCESS_KEY` | Server/Vite dev | Sì | Chiave verificata prima dell’inoltro |
| `ANALYSIS_ENDPOINT` | Server/Vite dev | Sì | Endpoint upstream foto configurato lato server |
| `ANALYSIS_TEXT_ENDPOINT` | Server/Vite dev | No | Endpoint upstream testo; fallback a `ANALYSIS_ENDPOINT` |
| `ANALYSIS_PREMIUM` | Server/Vite dev | No | `false` disattiva il flag inoltrato; default `true` |

## Deploy Vercel

1. Importare il repository con preset **Vite**.
2. Configurare `APP_ACCESS_KEY` e `ANALYSIS_ENDPOINT`.
3. Configurare facoltativamente `ANALYSIS_TEXT_ENDPOINT` e `ANALYSIS_PREMIUM`.
4. Usare `main` come Production Branch se si desidera il deploy automatico.

Il progetto collegato è `glicogig-diabete`; il vecchio duplicato `glicogig` non deve essere ricollegato.

## Architettura essenziale

```text
api/analyze.ts                         boundary foto condiviso
api/analyze-text.ts                    boundary testo condiviso
api/barcode.ts                         proxy barcode con allowlist
public/recipes/                        209 immagini ricetta verificate
scripts/extract_recipe_asset_map.py    verifica e pubblicazione ID→asset
scripts/sync_verified_runtime_data.py  sincronizzazione dataset verificati
src/catalog/                           dataset, ricerca e lookup deterministici
src/domain/rawWeight.ts                conversioni crudo/cotto verificate
src/domain/progress.ts                 indicatori e report da Diario locale
src/generated/recipeAssetMap.ts        lookup immagini generato
src/services/                          client same-origin, immagini e share card
src/storage/                           Diario e quiz locali
src/state/mealSession.tsx              Pasto effimero con TTL quattro ore
src/screens/                           tab principali e route ausiliarie
```

## Avvertenza

Le stime e i contenuti mostrati sono informativi e non sostituiscono diagnosi, terapia o indicazioni mediche e nutrizionali professionali.

# GLICOGIG

Web app React/TypeScript per analizzare un piatto, consultare alimenti e ricette, registrare un diario locale e usare contenuti educativi verificati. L’interfaccia mantiene brand e palette GLICOGIG; non replica identità, componenti commerciali o telemetria dell’app mobile osservata.

I dataset nutrizionali ed editoriali runtime provengono esclusivamente dall’estrazione verificata di GLICODEN 1.0.16. I valori mancanti restano `null` e vengono mostrati come `n.d.`: non vengono completati con stime o fonti nutrizionali esterne.

## Stato attuale

La shell usa navigazione hash con sei sezioni:

- **Home**: riepilogo del diario, stabilità degli ultimi sette giorni e sessione multipiatto;
- **Cerca**: catalogo locale, dettaglio nutrizionale, quantità modificabili e barcode;
- **Foto**: preparazione locale JPEG/Base64, analisi remota, ricalcolo locale e sessione multipiatto;
- **Ricette**: 209 ricette embedded con valori per porzione e salvataggio nel diario;
- **Diario**: voci locali, rinomina/rimozione, progressi, stabilità e condivisione volontaria PNG;
- **Impara**: 50 capitoli embedded e quiz quotidiano su 157 domande.

I conteggi mostrati nell’interfaccia derivano sempre dalla lunghezza degli array runtime:

| Dataset verificato 1.0.16 | Elementi |
| --- | ---: |
| Alimenti | 307 |
| Ricette | 209 |
| Capitoli | 50 |
| Domande quiz | 157 |

I file sono in `src/data/glicoden-1.0.16-*.json` e vengono esposti soltanto da `src/catalog/datasets.ts`. I metadati upstream con totali obsoleti non sono usati per i conteggi.

## Flussi dati

### Foto

```text
foto locale → preparazione JPEG/Base64 → /api/analyze → backend /analizza
            → ingredienti[] → catalogo embedded → nutrienti + CG
```

- la Function `api/analyze.ts` richiede `APP_ACCESS_KEY`, valida il payload e applica un timeout;
- verso l’upstream vengono inoltrati solo `Content-Type` e il payload validato;
- `device_id` è effimero, ha prefisso `dev_` e viene rigenerato a ogni richiesta;
- il middleware Vite usa lo stesso handler della Function, senza proxy trasparente di header, cookie, origine o referrer;
- la risposta fotografica accetta ingredienti con grammi finiti nel range operativo `0..2000`;
- modificare i grammi ricalcola tutto localmente e non ripete l’upload.

Il contratto upstream della foto è rimasto invariato: non sono stati aggiunti campi non verificati.

### Barcode

Il browser chiama solo `/api/barcode`. La Function e il middleware locale interrogano Open Food Facts server-side con:

- codice validato da 6 a 14 cifre;
- timeout di 9 secondi;
- redirect disabilitati;
- risposta `no-store`;
- allowlist dei soli campi nome, marca, porzione, immagine e nutrienti dichiarati.

I dati di etichetta ottenuti su richiesta non arricchiscono né modificano il catalogo embedded. Un prodotto può essere salvato nel diario soltanto quando il nome risolve univocamente un alimento locale e sono disponibili sia l’IG locale sia i carboidrati dichiarati del prodotto. CG e fascia usano quella stessa base coerente; in caso contrario restano non disponibili.

Lo scanner da immagine usa progressivamente `BarcodeDetector` quando supportato. L’inserimento manuale resta sempre disponibile e non è stata aggiunta alcuna dipendenza npm obbligatoria.

## Catalogo e calcoli locali

`src/catalog/foodCatalog.ts` fornisce lookup per ID e fallback deterministico per nome/sinonimo. Le voci con `nascondi=true` non compaiono nella ricerca, ma restano disponibili per risolvere ingredienti ricevuti dal backend. Le collisioni ambigue non vengono risolte arbitrariamente.

Per ogni ingrediente risolto:

```text
valore_porzione = valore_per_100_g × grammi / 100
CG_ingrediente = IG_aggiustato × carboidrati_disponibili_porzione / 100
```

`aggiustaIGperPreparazione` replica la logica verificata `#18406` con fattori cumulativi:

- al dente `×0,90`;
- stracotto, frullato o passato `×1,15`;
- freddo, raffreddato o riposato `×0,88`;
- aceto, limone o acidulo `×0,92`;
- clamp finale nell’intervallo consentito dalla funzione osservata.

`src/domain/impactCalculator.ts` implementa il calcolo `#18423`, inclusi contributi `CG >= 0,5`, fascia `trascurabile/basso/medio/alto`, riconoscimento di preparazioni veloci/liquide, pesi cotti e override verificato per alcuni piatti interi. I nutrienti assenti non vengono convertiti implicitamente in dati conosciuti nell’UI aggregata.

## Diario, quiz e condivisione

Diario e quiz usano esclusivamente `localStorage`:

- nessun account o identificatore persistente;
- massimo 800 voci diario;
- slot pendente monouso con TTL di 120 secondi;
- rollover locale per diario/progressi e UTC per il quiz quotidiano;
- streak incrementata al massimo una volta nello stesso giorno;
- immagini e Base64 non vengono mai persistiti.

Le card PNG sono generate con Canvas sul dispositivo. Web Share o il download vengono avviati solo da un’azione esplicita dell’utente.

## Privacy e confini intenzionali

- nessun Firebase Analytics/Messaging, advertising ID, SSAID o evento di telemetria;
- nessun font remoto: viene usato lo stack di sistema;
- nessuna chiamata browser diretta agli upstream foto o barcode;
- nessun paywall, referral, invito, chat, autore, libro o contenuto commerciale;
- nessuna immagine ricetta associata senza una mappa ID→asset verificata;
- link educativi cliccabili soltanto se HTTPS e non personali/commerciali;
- nessun dato demo aggiunto al diario o ai progressi.

La password del sito resta nel solo `sessionStorage` della scheda. Non inserire segreti nelle variabili `VITE_*`, perché vengono incluse nel bundle pubblico.

## PWA e offline

Manifest, icone, safe area e service worker rendono l’app installabile. In produzione il service worker:

- scarica l’HTML corrente durante l’installazione;
- precachea gli asset same-origin referenziati dall’HTML, inclusi i bundle hashati JS/CSS;
- usa network-first per le navigazioni e cache-first per gli asset;
- esclude sempre `/api/*` dalla cache;
- elimina le versioni precedenti della shell.

L’interfaccia e i dataset embedded possono essere riaperti offline dopo un’installazione completata. Analisi foto, lookup barcode e qualsiasi altra operazione remota richiedono la rete.

## Sincronizzazione e prove documentali

Per risincronizzare i quattro dataset verificati dalla documentazione estratta:

```powershell
python scripts/sync_verified_runtime_data.py
```

Lo script valida origine, struttura e conteggi prima di scrivere i file runtime. Approfondimenti:

- [`docs/version-1.0.16-delta.md`](docs/version-1.0.16-delta.md): confronto VERIFIED/INFERRED/SDK-only/EXCLUDED;
- [`docs/version-1.0.16-porting-plan.md`](docs/version-1.0.16-porting-plan.md): mappa di porting e invarianti;
- [`docs/version-1.0.16-audit.json`](docs/version-1.0.16-audit.json): inventario riproducibile;
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

Copia `.env.example` in `.env.local` e imposta una chiave privata per usare anche il flusso foto locale:

```powershell
Copy-Item .env.example .env.local
```

| Variabile | Ambito | Obbligatoria | Descrizione |
| --- | --- | --- | --- |
| `VITE_ANALYSIS_PATH` | Browser | No | Endpoint same-origin; default `/api/analyze` |
| `VITE_ANALYSIS_PREMIUM` | Browser | No | Campo del payload client; default `true` |
| `APP_ACCESS_KEY` | Server/Vite dev | Sì | Chiave confrontata prima dell’inoltro foto |
| `ANALYSIS_ENDPOINT` | Server/Vite dev | No | Endpoint foto configurabile lato server |
| `ANALYSIS_PREMIUM` | Server/Vite dev | No | `false` disattiva il flag inoltrato; default `true` |

## Deploy Vercel

1. Importare il repository con framework preset **Vite**.
2. Configurare `APP_ACCESS_KEY` nel progetto.
3. Configurare facoltativamente `ANALYSIS_ENDPOINT` e `ANALYSIS_PREMIUM`.
4. Usare `main` come Production Branch se si desidera il deploy automatico a ogni push.

Il progetto collegato è `glicogig-diabete`; il vecchio duplicato `glicogig` non deve essere ricollegato, per evitare deployment doppi con output errato.

## Architettura essenziale

```text
api/analyze.ts                         boundary foto condiviso da Vercel e Vite dev
api/barcode.ts                         proxy barcode con allowlist
public/manifest.webmanifest            metadati PWA
public/sw.js                           precache shell/asset ed esclusione /api/
scripts/sync_verified_runtime_data.py  sincronizzazione dataset verificati
src/catalog/datasets.ts                unico boundary dei quattro dataset 1.0.16
src/catalog/foodCatalog.ts              ricerca e risoluzione deterministica
src/domain/                             preparazione, nutrienti, impatto, stabilità e quiz
src/services/                           client foto/barcode, immagini e share card
src/storage/                            diario e quiz locali
src/state/mealSession.tsx               sessione multipiatto solo in memoria
src/screens/                            sei sezioni della shell hash
```

## Avvertenza

Le stime e i contenuti mostrati sono informativi e non sostituiscono diagnosi, terapia o indicazioni mediche e nutrizionali professionali.

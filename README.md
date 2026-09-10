# GLICOGIG

Web app personale per analizzare la foto di un piatto e trasformare la risposta del backend GLICOGIG in ingredienti, quantità e dati nutrizionali verificabili.

Il progetto è una riscrittura web in React e TypeScript della pipeline fotografica osservata nell'APK GLICODEN. Non usa cataloghi nutrizionali esterni e non inventa valori mancanti.

## Stato del progetto

La pipeline disponibile è:

```text
foto → /api/analyze → /analizza → ingredienti[] → catalogo_id → catalogo locale → calcoli
```

Implementato:

- acquisizione da fotocamera, selezione file e drag-and-drop;
- conversione e ridimensionamento locale in JPEG/Base64;
- richiesta tipizzata al backend con `image_base64`, `device_id`, `mime` e `premium`;
- nuovo `device_id` con prefisso `dev_` per ogni richiesta, senza persistenza;
- Function Vercel protetta da chiave personale;
- parsing rigoroso della risposta fotografica;
- lookup esatto tramite `catalogo_id`;
- scaling nutrizionale in base ai grammi e aggregazione del piatto;
- test automatici con Vitest;
- interfaccia responsive con React 19 e Tailwind CSS 4.

### Catalogo locale

L'APK contiene un catalogo di **228 alimenti** con 37 campi per voce. Nel repository è attualmente presente un sottoinsieme verificato di **7/228 voci** in `src/catalog/verifiedCatalogData.ts`.

Le altre 221 voci devono ancora essere estratte automaticamente dal literal buffer Hermes. Fino a quel momento, un `catalogo_id` non presente nel sottoinsieme viene segnalato come non risolto e non riceve valori inventati.

Le evidenze e il livello di affidabilità di ogni comportamento ricostruito sono documentati in [`docs/evidence.md`](docs/evidence.md).

## Stack

- React 19
- TypeScript 5.9
- Vite 7
- Tailwind CSS 4
- Vitest 3
- ESLint 9
- Vercel Functions

## Avvio locale

Requisiti: una versione recente di Node.js compatibile con Vite 7 e npm.

```bash
npm install
npm run dev
```

In sviluppo, Vite inoltra `/api/analyze` al Worker configurato in `vite.config.ts`. L'app è disponibile all'indirizzo mostrato da Vite nel terminale.

## Variabili ambiente

Copia `.env.example` in `.env.local` per personalizzare il client:

```bash
cp .env.example .env.local
```

Variabili client:

| Variabile | Default | Descrizione |
| --- | --- | --- |
| `VITE_ANALYSIS_PATH` | `/api/analyze` | Endpoint chiamato dal browser |
| `VITE_ANALYSIS_PREMIUM` | `true` | Valore `premium` nel payload client |

Variabili server da configurare su Vercel:

| Variabile | Obbligatoria | Descrizione |
| --- | --- | --- |
| `APP_ACCESS_KEY` | Sì | Chiave personale verificata dalla Function |
| `ANALYSIS_ENDPOINT` | No | Endpoint upstream; usa quello previsto dal progetto se assente |
| `ANALYSIS_PREMIUM` | No | Imposta `false` per disattivare il campo premium inoltrato; default `true` |

Non inserire segreti nelle variabili `VITE_*`: vengono incluse nel bundle pubblico del browser.

## Comandi

```bash
npm run typecheck  # controllo TypeScript
npm test           # test non interattivi
npm run lint       # analisi ESLint
npm run build      # typecheck e build di produzione
npm run preview    # anteprima locale della build
```

## Deploy su Vercel

1. Importa il repository GitHub in Vercel.
2. Seleziona il framework preset **Vite**.
3. Configura `APP_ACCESS_KEY` nelle variabili ambiente del progetto.
4. Configura opzionalmente `ANALYSIS_ENDPOINT` e `ANALYSIS_PREMIUM`.
5. Esegui il deploy.

Il browser invia la chiave nell'header `X-App-Access-Key`; `api/analyze.ts` la confronta in modo timing-safe prima di inoltrare la richiesta. La chiave viene conservata soltanto nel `sessionStorage` del browser.

## Architettura essenziale

```text
api/analyze.ts                         Function Vercel e proxy protetto
src/services/imagePreparation.ts       Preparazione JPEG/Base64
src/services/requestDeviceId.ts        ID effimero per richiesta
src/services/photoAnalysisService.ts   Client e parsing della risposta
src/catalog/                           Dataset locale e lookup esatto
src/domain/nutritionCalculator.ts      Scaling e aggregazione nutrizionale
src/components/                        Interfaccia utente
```

## Avvertenza

Le stime mostrate sono informative e non sostituiscono indicazioni mediche o nutrizionali professionali.

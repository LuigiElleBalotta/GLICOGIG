# GLICOGIG

Web app personale per analizzare la foto di un piatto e trasformare la risposta del backend GLICOGIG in ingredienti, quantità, valori nutrizionali e carico glicemico consultabili.

È una riscrittura web in React e TypeScript della pipeline fotografica osservata nell'APK GLICODEN. Il catalogo è estratto direttamente dal bundle Hermes dell'APK: il progetto non usa fonti nutrizionali esterne e non completa i dati mancanti con valori inventati.

## Stato del progetto

```text
foto → /api/analyze → backend /analizza → ingredienti[] → catalogo_id
     → catalogo APK locale → nutrienti + carico glicemico
```

Funzionalità disponibili:

- acquisizione da fotocamera, selezione file e drag-and-drop;
- conversione e ridimensionamento locale in JPEG/Base64;
- richiesta tipizzata con `image_base64`, `device_id`, `mime` e `premium`;
- nuovo `device_id` effimero con prefisso `dev_` per ogni richiesta;
- Function Vercel protetta da `APP_ACCESS_KEY`;
- parsing rigoroso della risposta fotografica;
- catalogo APK completo di 228 alimenti e lookup esatto tramite `catalogo_id`;
- nutrienti totali e normalizzati per 100 g;
- carico glicemico totale, fascia, affidabilità e contributi principali;
- grammi modificabili con ricalcolo immediato e interamente locale;
- interfaccia responsive in React 19, Tailwind CSS 4 e font Inter;
- wordmark testuale, senza asset usati come logo.

## Catalogo APK completo

`src/catalog/apkCatalogData.json` contiene tutte le **228 voci** esportate dalla funzione Hermes `#14256` all'offset `0x002cd72e` del bundle APK:

- 228 ID univoci;
- 37 campi base per ogni alimento;
- 219 voci con 37 campi e 9 con 38;
- campo extra `maturazione` conservato in 8 voci;
- campo extra `nota_curatela` conservato in 1 voce;
- stringhe, numeri, booleani, `null`, array e oggetti preservati senza arricchimenti esterni.

`src/catalog/verifiedCatalogData.ts` espone il JSON completo mantenendo separati i metadati originali. Se il backend restituisce un `catalogo_id` assente o nullo, l'ingrediente viene segnalato e non riceve valori di ripiego inventati.

### Rigenerazione dal bundle

Lo script riproducibile `scripts/extract_apk_catalog.py` emula solo le istruzioni lineari osservate in `#14256` e interrompe l'operazione se versione, offset, struttura, conteggio o unicità degli ID non corrispondono alle evidenze.

Requisiti aggiuntivi: Python 3 e il pacchetto `hermes-dec` disponibile nell'ambiente Python. Con la struttura di questa workspace:

```bash
python scripts/extract_apk_catalog.py
```

Percorsi alternativi possono essere passati esplicitamente:

```bash
python scripts/extract_apk_catalog.py --bundle path/to/index.android.bundle --output src/catalog/apkCatalogData.json
```

## Calcoli locali

Per ogni ingrediente risolto, i valori nutrizionali sono scalati con:

```text
valore_porzione = valore_per_100_g × grammi / 100
```

Il carico glicemico replica `calcolaImpatto #15923`:

```text
carboidrati_porzione = carboidrati_disponibili_g × grammi / 100
CG_ingrediente = IG_medio × carboidrati_porzione / 100
```

Comportamento mantenuto dall'APK:

- usa i grammi positivi ricevuti, altrimenti `porzione_standard_g`;
- arrotonda CG totale e contributi a un decimale;
- mostra tra i contributi soltanto valori `CG >= 0,5`;
- ordina i contributi per CG decrescente;
- assegna fascia `basso` fino a 10, `medio` fino a 19 e `alto` oltre 19;
- assegna affidabilità `media` con copertura del catalogo almeno 0,6, altrimenti `bassa`.

La modifica dei grammi applica round e clamp `0..2000` allo stato React. Non ripete l'upload e non effettua una nuova richiesta HTTP: nutrienti, valori per 100 g, CG e contributi vengono ricalcolati dal catalogo locale.

Le evidenze puntuali sono in [`docs/evidence.md`](docs/evidence.md).

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
| `APP_ACCESS_KEY` | Sì | Password privata verificata dalla Function |
| `ANALYSIS_ENDPOINT` | No | Endpoint upstream; usa quello previsto dal progetto se assente |
| `ANALYSIS_PREMIUM` | No | Imposta `false` per disattivare `premium`; default `true` |

### A cosa serve la “Password del sito”

La password richiesta nell'interfaccia è il valore di `APP_ACCESS_KEY` configurato nel progetto Vercel. Non appartiene al backend GLICODEN: protegge la Function pubblica `/api/analyze` dall'uso da parte di terzi.

Il browser la invia nell'header `X-App-Access-Key`; `api/analyze.ts` la confronta prima di inoltrare la foto. Il valore resta nel solo `sessionStorage` della scheda e viene eliminato alla chiusura della sessione. Non inserire segreti nelle variabili `VITE_*`, perché vengono incluse nel bundle pubblico.

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
5. Imposta `main` come Production Branch.

Con l'integrazione Git del progetto attiva, Vercel crea un deployment di produzione per ogni push su `main` e deployment di anteprima per gli altri branch.

L'automazione è stata verificata sul progetto Vercel **`glicogig-diabete`**: il push su `main` del commit applicativo ha creato e completato il relativo deployment Production. Non va aggiunta una GitHub Action con `vercel deploy`, perché duplicherebbe i deployment già generati dall'integrazione nativa.

Il repository risulta collegato anche a un secondo progetto Vercel chiamato **`glicogig`**, il cui deployment dello stesso commit è fallito. Per mantenere un solo deployment e uno stato GitHub complessivo pulito, scollega il repository dal progetto duplicato `glicogig` nel pannello Vercel, conservando `glicogig-diabete`.

## Architettura essenziale

```text
api/analyze.ts                         Function Vercel e proxy protetto
scripts/extract_apk_catalog.py         Estrazione riproducibile da Hermes
src/services/imagePreparation.ts       Preparazione JPEG/Base64
src/services/requestDeviceId.ts        ID effimero per richiesta
src/services/photoAnalysisService.ts   Client e parsing della risposta
src/catalog/apkCatalogData.json        Dataset APK completo
src/catalog/foodCatalog.ts             Lookup esatto per catalogo_id
src/domain/nutritionCalculator.ts      Scaling e aggregazione nutrizionale
src/domain/impactCalculator.ts         CG, fascia, copertura e contributi
src/components/ResultPanel.tsx         Report e modifica locale dei grammi
```

## Avvertenza

Le stime mostrate sono informative e non sostituiscono indicazioni mediche o nutrizionali professionali.

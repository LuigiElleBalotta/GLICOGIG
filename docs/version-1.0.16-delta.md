# Versione sorgente 1.0.16 — delta verificato rispetto a 1.0.0

Data analisi: 10 settembre 2026.

## Scopo e livelli di evidenza

Questo documento confronta integralmente gli artefatti locali delle versioni sorgente 1.0.0 e 1.0.16 per stabilire cosa sia realmente nuovo o corretto e cosa possa essere portato in GLICOGIG. Non sono stati usati dati nutrizionali recuperati da Internet e non sono stati inventati contenuti o algoritmi.

- **VERIFIED**: dimostrato da manifest, bytecode/disassembly Hermes, dataset estratti o screenshot locali.
- **INFERRED**: collegamento plausibile tra evidenze, ma non dimostrato end-to-end nel runtime.
- **SDK-only**: libreria/configurazione inclusa senza prova sufficiente di una funzione applicativa.
- **EXCLUDED**: funzione verificata ma non portabile per anonimato, telemetria, branding personale o natura commerciale.

I dump e i report raw versionati nel repository redigono deterministicamente il marchio storico come `[SOURCE_BRAND]`; versioni, ID e contenuto sostanziale restano invariati.

Fonti principali:

- `docs/version-1.0.16-audit.json`
- `docs/version-1.0.16-datasets.json`
- `docs/version-1.0.16-dataset-delta.json`
- `docs/extracted/source-1.0.16-catalog-17813.json`
- `docs/extracted/source-1.0.16-recipes-17814.json`
- `docs/extracted/source-1.0.16-learning-19701.json`
- `docs/extracted/source-1.0.16-quiz-19765.json`
- `docs/hbc-functions/source-1.0.16-function-*.disasm.txt`
- `docs/hbc-stability-search/search-results.json`
- manifest Android della candidate sorgente
- `screenshots_app/*.png`

## 1. Inventario binario — VERIFIED

| Proprietà | 1.0.0 | 1.0.16 | Delta |
|---|---:|---:|---:|
| Bundle Hermes | 3.349.908 byte | 5.320.192 byte | +1.970.284 |
| Versione Hermes | 96 | 96 | invariata |
| Funzioni | 17.350 | 19.879 | +2.529 |
| Stringhe | 35.382 | 56.417 | +21.035 |
| Stringhe uniche aggiunte | — | — | 21.340 |
| Split APK 1.0.16 | — | 32 | nuovo pacchetto analizzato |
| Asset 1.0.16 | — | 302 totali, 227 applicativi | 18 immagini + 209 immagini ricette |

La crescita è sostanziale e contiene nuove funzioni applicative; non è un semplice aggiornamento SDK.

## 2. Catalogo e ricette — VERIFIED

### 2.1 Conteggi reali

| Dataset | 1.0.0 | 1.0.16 | Comuni | Aggiunti | Rimossi |
|---|---:|---:|---:|---:|---:|
| Alimenti | 228 | 307 | 228 | 79 | 0 |
| Ricette | 200 | 209 | 200 | 9 | 0 |

I metadati embedded di 1.0.16 sono incoerenti con gli array reali:

- catalogo: `_meta.totale=228`, `_meta.totale_alimenti=240`, ma 307 record reali;
- ricette: `_meta.totale=200`, ma 209 record reali.

GLICOGIG deve derivare i conteggi da `array.length`, mai dai totali `_meta`.

### 2.2 Classificazione ricorsiva corretta

`compare_hbc_datasets.py` esclude ricorsivamente i campi `*_en`, `*_es`, `*_de`, `*_fr`. La precedenza di riepilogo è:

1. `behavior_or_visibility`;
2. `editorial_or_source`;
3. `nutrition_or_portion`;
4. `italian_content_or_structure`.

Questo impedisce a `ig_da_verificare`, `ig_affidabilita` e `tipo_dato_ig` di essere conteggiati erroneamente come nutrizione dal generico match `ig_`.

Risultato sui 228 alimenti comuni, con classi sovrapponibili:

- 51 record modificati solo nelle traduzioni;
- 177 record con almeno un delta non-localizzazione;
- 176 con delta editoriale/fonte;
- 33 con delta nutrizionale/porzione;
- 18 con delta italiano/strutturale;
- 8 con delta di comportamento/visibilità.

Risultato sulle 200 ricette comuni:

- 192 cambiate solo nelle traduzioni;
- 8 con delta nutrizionale;
- nessun altro tipo di delta non-localizzazione.

### 2.3 Nuovi alimenti

Gli 79 ID aggiunti sono conservati integralmente nel dataset estratto e nel report JSON. Comprendono, tra gli altri, alimenti e piatti prima assenti come `amaranto-cotto`, `brioche`, `crepe`, `fiocchi-di-avena`, `gallette-di-riso`, `hummus`, `pasta-cotta-al-dente`, `pizza-sfoglia-cotta`, `riso-parboiled-cotto`, `riso-per-sushi`, `semi-di-chia`, `taralli`, `tiramisu`, `tortellini` e `zuppa-di-miso`. L’elenco autorevole completo è `catalog.added_ids` in `version-1.0.16-dataset-delta.json`.

### 2.4 Nuove ricette

- `avocado-uovo-in-camicia`
- `budino-di-chia-mirtilli`
- `fiocchi-di-latte-fragole`
- `frittatina-zucchine-ricotta`
- `frullato-verde-spinaci`
- `omelette-funghi-formaggio`
- `ricotta-frutti-di-bosco-noci`
- `uova-sode-avocado-pomodorini`
- `yogurt-greco-frutti-di-bosco-mandorle`

### 2.5 Correzioni reali macro/porzione più rilevanti

Sono VERIFIED i valori old→new nel report, senza giudizio clinico aggiunto:

- `anguria`: 30→16 kcal/100 g; carbo disponibili 7,15→3,7; totali 7,55→3,9; porzione disponibile 14,3→7,4; CG 10,9→5,6; fascia medio→basso; fibre 0,4→0,2; proteine 0,61→0,4; grassi 0,15→0; saturi 0,02→0; sodio 1→3; zuccheri 6,2→3,7.
- `gnocchi-di-patate`: carbo disponibili 25,5→31; totali 27→32; disponibili per porzione 51→62; CG 34,7→42.
- `pizza-margherita`: porzione 250→350 g; carbo disponibili 28,23→30; totali 29,93→31,7; disponibili per porzione 70,6→105; IG min/medio/max 36/60/80→65/70/78; CG 42,4→74.
- `ricotta`: 150→135 kcal; carbo disponibili e totali 7,27→3,5; disponibili per porzione 7,3→3,5; zuccheri 0,27→3,5; fascia n/d→trascurabile.
- `savoiardi`: carbo disponibili 58,7→78; totali 59,7→79; disponibili per porzione 17,6→23,4; zuccheri null→35; CG 12→16.
- `latte-intero`: zuccheri 5,05→4,8.
- `latte-scremato`: zuccheri 5,09→4,86.

Gli altri delta nutrizionali sono soprattutto introduzioni/correzioni IG, CG e fascia:

- nuovo intervallo IG e CG per `arachidi`, `avocado`, `cacao-amaro-in-polvere`, `cappuccino`, `cocco-fresco`, `limone`, `mandorle`, `nocciole`, `noci`, `pinoli`, `tempeh`, `tofu`;
- `baguette`: IG medio 80→90, CG 27,7→31,1;
- `polenta-semolino-di-mais-cotto`: IG min/medio/max 68/79/90→62/69/79, CG 20,8→18;
- `zucca-cotta`: IG min/medio/max 64/75/90→51/65/75, CG 5,7→5;
- fascia: `birra` basso→medio; `caramelle` medio→alto; `cioccolato-al-latte` basso→medio; `crema-alla-nocciola` basso→medio; `mandarino` basso→medio; `marmellata`, `miele`, `succo-di-mela`, `uva`, `zucchero-bianco` basso→alto; `succo-darancia` medio→alto; `tempeh` n/d→basso.

Tutti i 33 record e i campi editoriali associati sono riportati senza perdita in `version-1.0.16-dataset-delta.json`.

### 2.6 Comportamento e visibilità

`ig_variabile=true` viene aggiunto a:

- `baguette`
- `cornetto-croissant`
- `datteri`
- `focaccia`
- `lenticchie-cotte`
- `riso-basmati`
- `zucca-cotta`

`farina-00` riceve `nascondi=true`: resta utilizzabile come ingrediente, ma è esclusa dalla ricerca/foto come alimento consumato da solo. Non esistono delta `grammi_per_pezzo`.

### 2.7 Otto ricette comuni corrette

Per ciascuna cambiano esclusivamente `per_porzione.carboidrati_disponibili_g` e `per_porzione.kcal`:

| Ricetta | Carbo disponibili | kcal |
|---|---:|---:|
| `fette-ricotta-fragole` | 31,4→28,4 | 263→251 |
| `involtini-melanzane-ricotta` | 12,1→10,2 | 161→153 |
| `pane-integrale-ricotta-miele` | 27,3→25 | 221→212 |
| `pasta-alla-norma` | 60,5→59,7 | 354→351 |
| `ricotta-e-fragole` | 22,6→18,1 | 242→224 |
| `ricotta-e-miele` | 21,1→16,6 | 226→208 |
| `segale-ricotta-miele` | 39,4→36,4 | 295→283 |
| `spinaci-e-ricotta` | 6→3,7 | 152→143 |

## 3. Calcolo del pasto — VERIFIED

### 3.1 Baseline

- `fasciaDa #15922`: basso per CG `<=10`, medio per `<=19`, alto per `>=20`.
- `calcolaImpatto #15923`: per ogni ingrediente `CG = IG × (carboidrati_disponibili_g × grammi / 100) / 100`.
- Somma CG arrotondata a una cifra decimale.
- Contributi mostrati se `>=0,5`.
- Affidabilità `media` se `trovati/totali >=0,6`, altrimenti `bassa`.

### 3.2 1.0.16

`#18423` conserva il nucleo e aggiunge:

- fallback del catalogo per nome oltre a `catalogo_id`;
- rilevamento del peso cotto;
- `aggiustaIGperPreparazione`;
- somme di carboidrati, fibre, proteine, grassi e CG;
- normalizzazione per 100 g;
- override per “piatto intero”.

Output verificato: `cg`, `carbo`, `fibre`, `prot`, `grassi`, `ig`, `fascia`, `trovati`, `totali`, `affidabilita`, `contributi`, `cotto`, `pianoIntero`.

## 4. Stabilità e Progressi — VERIFIED

`#18427` è il barrel JavaScript degli algoritmi Progressi, non un export utente CSV/PDF/JSON. Esporta tra gli altri `andamentoSettimana`, `bilancioOggi`, `datiAnelliOggi`, `datiCardOggi`, `datiCardProgressi`, `giorniConsecutivi`, `indiceStabilita`, `livelloStabilita`, `pastoPiuDifficile`, `piattiPiuFacili`, `reportSettimana` e `settimanaPerGiorni`.

Formule ricostruite:

- `qualitaPasto #18453`: `base = max(15, min(100, 100 - 2.2 × max(0, cg - 10)))`; cap fascia alto 45, medio 80, altrimenti 100.
- `indiceStabilita #18454`: media pesata delle qualità, con peso `max(cg, 8)`, poi `Math.round`.
- `livelloStabilita #18458`: `>=85 moltoStabile`, `>=70 bellaGiornata`, `>=55 nellaMedia`, altrimenti `impegnativa`.
- `datiAnelliOggi #18459`: produce gli anelli Equilibrio, Freni e Varietà.

Gli screenshot `IMG_1352.png` e `IMG_1353.png` confermano struttura e gerarchia della schermata Progressi, diario, settimana, card social e stati vuoti. I dati demo visibili negli screenshot non vanno importati come dati utente.

## 5. Diario — VERIFIED

Il modulo singleton `#18346` è nuovo in 1.0.16. Mantiene array voci, flag di caricamento, `Set` listener, contatore UID e slot pendente con TTL 120.000 ms.

### 5.1 Giorno e schema

`giornoLocale #18348`:

```text
d = input nullish ? new Date() : new Date(input)
YYYY-MM-DD = new Date(d.getTime() - d.getTimezoneOffset()*60000)
  .toISOString().slice(0, 10)
```

`snapshotDaVoce #18349` produce:

```text
nome, nome_en, nome_es, nome_de, nome_fr, fonte,
fascia, cg, kcal, carbo, prot, grassi, fibre, grammi
```

Usa `metodoPasto([voce])`; `fascia`, `cg` e `kcal` possono essere sovrascritti dai metadati. Se `kcal` manca usa `4*carbo + 4*prot + 9*grassi + 2*fibre`. I valori numerici dello snapshot sono arrotondati con `Math.round(x || 0)`.

### 5.2 Registrazione

`registraMangiato #18358`:

1. consuma lo slot pendente se più recente di 120.000 ms;
2. preferisce `input.slot` se non nullish;
3. aggiunge `id`, `ts`, `giorno`, `slot` alla copia della voce;
4. conserva le ultime 800 voci con `.slice(-800)`;
5. notifica, persiste e registra l’evento analytics `pasto_mangiato`.

UID `#18376`: `"d" + Date.now().toString(36) + counter++`.

### 5.3 Persistenza e operazioni

- `emit #18350`: invia `[...voci]` ai listener, poi chiama senza `await` `setJSON(K.diario, voci)`.
- `caricaDiario #18352/#18355`: legge `getJSON(K.diario, [])`; accetta solo array; fallback `[]`; aggiorna listener; nessuna migrazione delle singole voci.
- `rimuoviDalDiario #18359`: elimina tutte le voci con ID uguale.
- `rinominaVoce #18361`: `trim().slice(0,60)`; se non vuoto aggiorna tutti i campi nome lingua.
- `spostaSlot #18363`: cambia solo `slot`, non giorno o timestamp.
- `vociDelGiorno #18365`: confronto stretto su `giorno`.
- `vociUltimiGiorni #18367`: default 7; cutoff con `(n-1)*86400000`; include chiavi `giorno >= cutoff`.
- `vociTutte #18369`: copia superficiale array.
- `totali #18370`: somma kcal, carbo, prot, grassi, fibre e conta `n`.
- `useDiario #18372`: sottoscrizione React con cleanup e caricamento iniziale.

Per GLICOGIG la persistenza portabile è `localStorage`, senza account, sync remoto o identificatore stabile esterno.

## 6. Barcode e bugfix etichette — VERIFIED

La scansione barcode esiste già in 1.0.0; non è nuova in assoluto. È però assente in GLICOGIG e portabile sul Web.

Comportamento comune:

- endpoint Open Food Facts `https://world.openfoodfacts.org/api/v2/product/`;
- barcode valido `^\d{6,14}$`;
- timeout 9.000 ms;
- campi usati: `product_name`, `product_name_it`, `brands`, `nutriments`, `serving_size`, `image_front_small_url`.

Correzione 1.0.16, catena `#19251 → #19257 → #19258 → #19259`:

- `num`: numero diretto o `parseFloat`; ritorna solo valori `Number.isFinite`, altrimenti `null`.
- `porzioneGrammi`: sostituisce virgola con punto, estrae `/([\d.]+)\s*(?:g|ml)\b/i`, poi usa `num`; `ml` non applica una densità inventata.
- `correggiSecco(nome,c)`: trova la prima regola; senza regola mantiene `c`; se `c != null && c >= 0.85*target` mantiene il valore; altrimenti usa il target e imposta `carboCorretto=true`.

Target secchi:

| Regex | carbo/100 g |
|---|---:|
| `frisell|fresell|freseell` | 72 |
| `fett[ae]\s*biscottat` | 75 |
| `gallett` | 80 |
| `grissin` | 72 |
| `\bcracker` | 68 |
| `taralli|tarallo|tarallucc` | 68 |
| pane biscottato/secco/carasau/azzimo, pan bauletto tostato, crostini | 70 |

`carbo100` è il valore finale; `carboCorretto` è il booleano esplicativo.

Per anonimato GLICOGIG non deve contattare OFF direttamente dal browser: il lookup va instradato da un proxy server-side che non inoltri IP, cookie, referrer, dominio o altri identificatori applicativi. La fotocamera web può essere implementata senza dipendenza obbligatoria, con `BarcodeDetector` quando disponibile e inserimento manuale sempre disponibile.

## 7. ScanScreen — VERIFIED

Mapping: `ScanScreen #15937` (1.0.0) → `#19106` (1.0.16).

Invariato:

- permesso camera;
- scansione o inserimento manuale, minimo 6 cifre;
- lookup prodotto, stati risultato/non trovato/errore;
- porzione limitata a 1–2.000 g;
- calcolo impatto e aggiunta al pasto.

Nuovo/cambiato in 1.0.16:

- quota commerciale tramite `puoiScansionare` e `registraScansione` sia per camera sia per ricerca manuale;
- testi `scan.*` localizzati;
- back hardware verso FotoPiatto;
- UI “5 scansioni a settimana” e paywall/Plus.

La quota, il paywall e il contatore Plus sono **EXCLUDED**. Il motore barcode e il bugfix prodotti secchi sono **VERIFIED/PORTABLE**.

## 8. FotoPiattoScreen — VERIFIED

Mapping: `#15790` (8.981 byte, 1.996 istruzioni, 27 closure) → `#18885` (13.178 byte, 2.945 istruzioni, 44 closure).

Funzioni aggiunte o ampliate:

- localizzazione `useT`/`useTf`;
- modalità “Pasto completo” e sessione multi-piatto;
- analisi testuale oltre alla foto;
- distinzione cotto/secco e `pesatoCotto`;
- preset porzione piccola/media/grande;
- snapshot/sessione e domanda “Vuoi aggiungere un altro piatto?”;
- fonti e spiegazioni più ricche;
- gating commerciale Foto/Plus.

Il ricettario visibile direttamente nel vecchio corpo non compare nel nuovo corpo; questo prova una rimozione o riallocazione locale, non la rimozione dall’intera app.

Portabilità:

- modalità multi-piatto, pesi cotto/secco, preset e sessione sono portabili;
- quota/paywall sono **EXCLUDED**;
- nessuna chiamata diretta browser al backend foto è accettabile: eventuale analisi deve passare dal proxy server-side già previsto per non esporre utente, referrer o brand.

## 9. Quiz quotidiano — VERIFIED

Dataset `#19765`: 157 domande, 19 campi, IT/EN/ES/DE/FR. `_meta.stato` è `bozza-da-rivedere`: è contenuto educativo embedded, non validazione clinica definitiva.

Il factory `#19741` esporta `N_AL_GIORNO`, `giornoIndice`, `quizDelGiorno`, `statoQuiz`, `salvaRisultato`, `livello`. `N_AL_GIORNO=10`.

### 9.1 Selezione esatta

- `giornoIndice(data) = floor(data.getTime() / 86400000)`: cambio a mezzanotte UTC.
- All’avvio del modulo viene creata una permutazione Fisher–Yates dei 157 indici con Mulberry32 e seed fisso `20260807`.
- Base giornaliera: `(giorno * 10) % 157`.
- Si prendono 10 elementi consecutivi circolari.
- Seed opzioni per domanda: `((giorno * 100003) + FNV1a32(domanda.id)) >>> 0`.
- `mescolaOpzioni` riallinea `opzioni`, `corretta` e `opzioni_en`. Il bytecode non riallinea direttamente ES/DE/FR: è un rischio localizzazione da non replicare.

`QuizScreen #19783` memoizza il quiz con dipendenze vuote; se resta montato oltre mezzanotte UTC non cambia finché non viene rimontato.

### 9.2 Stato

Chiavi logiche: `quizGiorno`, `quizStreak`, `quizBest`, `quizScoreOggi`; literal embedded: `quiz_ultimo_giorno`, `quiz_streak`, `quiz_record`, `quiz_score_oggi`.

- `statoQuiz`: fatto oggi se `ultimo===oggi`; mantiene streak se ultimo è oggi o ieri, altrimenti restituisce 0; score oggi solo se fatto e `>=0`.
- `salvaRisultato`: al primo completamento del giorno imposta streak a `precedente+1` se ieri, altrimenti 1; non incrementa due volte nello stesso giorno; sovrascrive sempre lo score di oggi; aggiorna il record solo se superiore.
- Nessun export reset nel modulo.

In GLICOGIG lo stato resta esclusivamente locale e anonimo.

## 10. Impara — VERIFIED

Dataset unificato estratto replicando il merge Hermes di `#19701/#19702/#19703/#19704` e payload ES/DE/FR `#19714/#19716/#19718`:

- 50 capitoli, 50 ID univoci;
- 4 sezioni: “Le basi”, “Il metodo e la pratica”, “Contesti e miti”, “Fonti e affidabilità”;
- 226 blocchi: 97 `p`, 50 `nota`, 29 `esempio`, 40 `link`, 10 `punti`.

I payload raw restano conservati per non perdere asimmetrie o chiavi. In UI ogni riferimento personale/commerciale o al brand sorgente va sostituito con GLICOGIG o escluso; contenuto e dati non vanno integrati con fonti esterne.

## 11. Deep-link, app-link e condivisione — VERIFIED/INFERRED

### 11.1 Manifest

1.0.0 espone solo `MAIN/LAUNCHER`. 1.0.16 aggiunge:

- schema browsable custom dell’app sorgente, redatto nei dump come `[SOURCE_BRAND]://`;
- app-link `[SOURCE_APP_HOST]/i/` con `autoVerify=true`.

È VERIFIED la dichiarazione manifest. Non è verificato localmente l’`assetlinks.json` remoto né il dispatcher JS completo delle route: la riuscita end-to-end è **INFERRED**.

Il path `/i/%{codice}` e i messaggi sono referral Plus personali/commerciali: **EXCLUDED**.

### 11.2 Card social

Catena verificata:

- caller applicativi `#18634`, `#18642`, `CondividiButton #18834`, Food/Recipe/Pasto/Consigli/Progressi;
- `condividiCard #18646` delega a `_condividiCard #18647`;
- coroutine `#18649` verifica `ref.current`, esegue `captureRef` con `{format:'png', quality:1, result:'tmpfile'}`;
- controlla `isAvailableAsync`;
- usa `shareAsync` con `{mimeType:'image/png', dialogTitle:'Condividi', UTI:'public.png'}`;
- restituisce `true` al successo, `false` per ref assente, sharing indisponibile o eccezione.

La condivisione generica della propria card è portabile tramite Web Share API/download locale, senza referral, dominio sorgente o analytics.

## 12. Localizzazione — VERIFIED

1.0.16 introduce `useT`, `useTf`, chiavi namespaced e `linguaDispositivo #15371`. Contenuti applicativi completi estratti includono almeno IT/EN/ES/DE/FR. Gli split APK per altre lingue provano solo packaging Android e sono **SDK-only**, non traduzioni complete.

Non è emersa una funzione applicativa GPS: match AndroidX come `TwilightManager` sono **SDK-only** e i manifest non dimostrano permessi fine/coarse location. “Localizzazione” in questo delta significa i18n, non geolocalizzazione.

## 13. Firebase, analytics e notifiche

- Manifest 1.0.16: Firebase Analytics, Messaging e raccolte analytics/ad ID/SSAID abilitate.
- Il codice applicativo chiama `logEvento` in vari flussi, incluso `pasto_mangiato` e `card_condivisa`: analytics non è soltanto SDK-only.
- Firebase/analytics, ID pubblicitari, reporting automatico e telemetria sono **VERIFIED ma EXCLUDED** perché incompatibili con anonimato GLICOGIG.
- Le notifiche Firebase/push non vengono portate. Eventuali promemoria futuri dovrebbero essere opt-in e locali, senza token remoto; non fanno parte di questo porting finché non richiesti.

## 14. Matrice di porting

| Funzione 1.0.16 | Evidenza | Decisione GLICOGIG |
|---|---|---|
| Catalogo 307 + ricette 209 | VERIFIED | Portare dataset embedded validato |
| Correzioni macro/IG/porzioni | VERIFIED | Portare valori 1.0.16, inclusi `nascondi` e `ig_variabile` |
| Calcolo avanzato cotto/secco | VERIFIED | Portare senza dati esterni |
| Barcode OFF + correzione secchi | VERIFIED | Portare via proxy anonimo; manuale sempre disponibile |
| Diario locale | VERIFIED | Portare in `localStorage`, nessun account |
| Stabilità, anelli, report | VERIFIED | Portare formule ricostruite |
| Impara 50 capitoli | VERIFIED | Portare payload embedded; rebrand/rimozione personale |
| Quiz 157 / 10 al giorno | VERIFIED | Portare algoritmo esatto e stato locale; indicare bozza educativa |
| Foto multi-piatto/cotto-secco | VERIFIED | Portare UX; rete solo via proxy anonimo |
| Card social | VERIFIED | Portare Web Share/download senza referral né analytics |
| Schema custom sorgente e app-link `/i/` | VERIFIED manifest, INFERRED runtime | Non portare referral/domain sorgente |
| Paywall, Plus, quote | VERIFIED | EXCLUDED |
| Libro, autore, social personali | VERIFIED | EXCLUDED |
| Firebase Analytics/Messaging | VERIFIED | EXCLUDED |
| Geolocalizzazione | SDK-only/non dimostrata | Non portare |
| Export Progressi CSV/PDF/JSON | non trovato | Non inventare |

## 15. Vincoli di implementazione

1. Brand e palette restano GLICOGIG (`#29b6ff`, `#f6c85f`, `#020611`, `#07111f`, `#0b1929`, `#ff7182`).
2. Gli screenshot sono riferimento per shell mobile, gerarchia e flussi, non per logo, verde, autore, libro o componenti commerciali.
3. Tutti i dati nutrizionali/educativi provengono esclusivamente dagli artefatti embedded locali.
4. Nessuna telemetria, fingerprinting, account o sincronizzazione remota.
5. Barcode e foto non devono esporre direttamente a upstream IP applicativo, cookie, referrer, dominio o brand; usare proxy server-side.
6. Nessun paywall, referral, invito commerciale, libro, autore o chat.
7. Quiz e contenuti educativi non sostituiscono indicazioni cliniche; il quiz è esplicitamente `bozza-da-rivedere`.
8. Nessun dato demo degli screenshot viene salvato o mostrato come dato reale dell’utente.

# Piano di esecuzione autonomo

Ultimo aggiornamento: 2026-09-10

## Obiettivo e vincoli

Completare nell'ordine seguente, con un commit e un push distinti per ogni milestone:

1. porting completo delle funzionalità verificabili della versione 1.0.16;
2. localizzazione IT/EN/ES/DE/FR con selettore lingua nella barra superiore e `i18next`/`react-i18next`;
3. qualità locale con lint, typecheck/build, unit/integration test, coverage globale reale almeno 80% ed E2E.

Vincoli invarianti:

- non verificare né interrogare Vercel;
- non inventare dati, associazioni o funzionalità;
- non usare dati nutrizionali esterni per IG, CG o contenuti applicativi;
- usare come fonti funzionali soltanto gli artefatti locali verificati della 1.0.16;
- non portare paywall/Plus/quote, referral/app-link sorgente, Firebase/analytics/telemetria, account/sync, contenuti personali dell'autore, dati demo da screenshot o export non dimostrati;
- mantenere separati e ordinati i tre commit/push;
- non eseguire lint, test, typecheck o build prima del primo commit funzionale;
- eseguire gli E2E soltanto in locale.

## Fonti autorevoli

- `docs/version-1.0.16-delta.md`
- `docs/version-1.0.16-porting-plan.md`
- `docs/version-1.0.16-audit.json`
- `docs/extracted/source-1.0.16-*.json`
- `docs/hbc-functions/source-1.0.16-function-*.decompiled.js`
- `docs/hbc-functions/source-1.0.16-function-*.disasm.txt`
- `docs/recipe-asset-map-1.0.16.json`

## Checklist operativa

- [x] 1. Leggere permessi, stato Git/branch/remoti, documenti 1.0.16 e configurazione corrente.
- [x] 2. Creare il piano/tasklist Markdown persistente con criteri di completamento e registro avanzamento.
- [x] 3. Analizzare in profondità le funzionalità portabili mancanti di Foto, Progressi, immagini/detail/share e relative prove Hermes.
- [x] 4. Implementare tutte le funzionalità portabili mancanti senza inventare dati e aggiornare documentazione/piano.
- [x] 5. Verificare staticamente la milestone funzionale senza Vercel, lint, test, typecheck o build.
- [x] 6. Milestone funzionale registrata nel commit `7ce4380` e pubblicata su `origin/main`; `HEAD` e `origin/main` sono stati verificati coincidenti.
- [x] 7. Verificare compatibilità i18next/react-i18next con React e selezionare dipendenze pinned appropriate.
- [x] 8. Estrarre e organizzare tutte le traduzioni UI e contenuto portabili per IT/EN/ES/DE/FR.
- [x] 9. Integrare provider i18next/react-i18next, persistenza lingua e selettore nella barra superiore.
- [x] 10. Localizzare tutte le schermate e i componenti portabili, aggiornare documentazione/piano.
- [x] 11. Verificare staticamente la milestone i18n mediante lettura e grep ragionato, senza Vercel, lint, test, typecheck o build.
- [ ] 12. Creare il secondo commit i18n e fare push.
- [ ] 13. Inventariare test/config esistenti e installare dipendenze di test/E2E pinned necessarie.
- [ ] 14. Correggere ed eseguire lint e typecheck/build necessari alla validazione locale.
- [ ] 15. Implementare/eseguire unit e integration test fino a coverage globale >=80% reale.
- [ ] 16. Implementare/eseguire test E2E sui flussi principali senza verificare Vercel.
- [ ] 17. Correggere ogni regressione emersa e aggiornare piano/documentazione con risultati reali.
- [ ] 18. Creare il terzo commit qualità e fare push finale.
- [ ] 19. Verificare stato Git finale pulito e riepilogare commit, push, coverage ed eventuali limiti non portabili.

## Milestone 1 — Porting funzionale 1.0.16

### Ambito implementato

- Foto/testo: boundary same-origin, preset porzione, cotto/secco, affidabilità e origine, snapshot, TTL Pasto quattro ore e bivio altro piatto;
- Progressi: anelli, bilancio, consecutività, pasto più difficile, andamento, verdetto, piatti più facili e report settimanale dove dimostrati;
- Ricette: 209 immagini pubblicate soltanto tramite mappa ID→asset verificata, detail hash e salvataggio Diario;
- share Food: **Condividi questa scelta** da Cerca, limitata a valori e classificazioni presenti nel catalogo;
- Consigli: route `#advice` basata esclusivamente su Pasto e Diario locali;
- modifiche intenzionali preesistenti per rebranding, route/detail, barcode, scanner e PWA incluse nella milestone.

### Criteri di completamento

- ogni comportamento aggiunto è riconducibile a una prova locale 1.0.16;
- nessun dato o mapping è stato dedotto arbitrariamente;
- tutte le route previste sono raggiungibili;
- barcode usa proxy same-origin e non abilita IG/CG/Diario con match locale ambiguo;
- scanner mantiene fallback manuale e cleanup camera/object URL;
- `git diff --check` senza errori;
- nessuna verifica Vercel e nessuna esecuzione prematura di lint/test/typecheck/build;
- commit e push registrati sotto.

## Milestone 2 — Localizzazione i18next/react-i18next IT/EN/ES/DE/FR

### Ambito

- pin exact `i18next@26.4.2` e `react-i18next@17.0.13`, compatibili con React 19;
- risorse UI editoriali IT/EN/ES/DE/FR dichiarate esplicitamente come non estratte dall’APK;
- selector dei campi localizzati dei dataset verified 1.0.16 con fallback italiano, senza mutare record canonici né inventare traduzioni;
- provider, persistenza e selettore accessibile nella barra superiore;
- localizzazione di schermate, componenti, numeri, fallback ed errori visibili tramite code/status stabili ai boundary React;
- titolo e lingua documento sincronizzati a runtime, con HTML e manifest unico statici in italiano come fallback pre-boot/installazione documentato.

### Criteri di completamento

- italiano, inglese, spagnolo, tedesco e francese selezionabili;
- cambio immediato e persistente;
- copy UI editoriale distinta dalla provenienza APK e traduzioni dataset mai inventate;
- fallback deterministico italiano per campi verified assenti e nessuna chiave visibile;
- errori renderizzati localizzati senza mostrare input remoto; contratti, payload, parsing, limiti e regex invariati;
- limite dei metadati statici pre-boot/installazione documentato;
- controlli statici senza Vercel e senza pipeline prima del secondo commit;
- commit e push registrati sotto.

## Milestone 3 — Qualità locale

### Ambito

- lint, typecheck e build;
- unit/integration test per dominio, servizi, storage, stato e UI;
- coverage globale reale almeno 80%, senza esclusioni artificiali;
- E2E locali sui flussi principali;
- correzione delle regressioni.

### Criteri di completamento

- lint, typecheck e build senza errori;
- unit/integration tutti verdi;
- statements, branches, functions e lines almeno 80%, oppure limite reale documentato senza dichiarazioni false;
- E2E locali verdi;
- nessuna verifica Vercel;
- commit/push finale e working tree pulito.

## Registro avanzamento

| Data/ora | Task | Esito/Evidenza |
|---|---:|---|
| 2026-09-10 | 1 | `permissions.yaml`: shell consentita; branch `main`; remoto SSH `origin`; `HEAD` e `origin/main` iniziali `0084b68`; index iniziale pulito; working tree intenzionale preservato. |
| 2026-09-10 | 2 | Piano persistente creato in questo file. |
| 2026-09-10 | 3 | Audit Hermes completato: `analizzaTesto #19043/#19046`, `grammiCrudi #18400`, `fattoreCrudo #18401`, `nomeSenzaCottura #18402`, formule Progressi, detail/share e relazione asset ricette. |
| 2026-09-10 | 4 | Implementazione completata; revisione semantica: corretti peso secco come rappresentazione senza alterare nutrienti/CG, salvataggio Pasto incompleto fail-closed, TTL quattro ore anche su sessione attiva e share Food limitata ai campi del dataset. La stima manuale 55/65 è mantenuta perché replica `stimaImpattoManuale #18594`. |
| 2026-09-10 | 5 | `git diff --check`: OK (soli avvisi LF→CRLF); nessun marker Git; route `#advice` completa; client foto/testo fail-closed su path same-origin e barcode su `/api/barcode`; 209 record/report/JPEG/lookup, 209 SHA-256 payload e 209 MD5 packager coincidenti. Hash correnti: report `D90A3062608F14515AB63AF54AE150F9A661AF0F574A778BCB100CC75DF6CC4C`, lookup `6CBF92ED218C81DC8644C22D8C51EFCD64E5095667413F91564C186DF235ABFC`. Nessun lint/test/typecheck/build/Vercel eseguito. |
| 2026-09-10 | 6 | Milestone 1 registrata nel commit `7ce4380` e pubblicata su `origin/main`; `HEAD` e `origin/main` verificati coincidenti. |
| 2026-09-10 | 7–10 | Integrati `i18next@26.4.2` e `react-i18next@17.0.13` exact, provider/persistenza/selettore e risorse editoriali IT/EN/ES/DE/FR. I campi localizzati verified mantengono fallback IT senza mutare dati canonici. |
| 2026-09-10 | 11 | Lettura e grep statico ragionato: rimossi fallback italiani visibili dal dominio, errori mappati ai boundary da code/status e titolo documento sincronizzato. Restano intenzionalmente commenti/contratti canonici, diagnostica non renderizzata e fallback statico italiano HTML/manifest. Nessun lint, test, typecheck, build o Vercel eseguito. |
| 2026-09-10 | 11 | Revisione semantica finale `APPROVED`: lookup manuale lingua attiva con fallback IT solo su `not_found`; classificazioni tradotte ai boundary; errori asincroni ritraducibili; non-food senza copy remoto; nomi Diario e sessione Pasto localizzati preservando rinomine e dati canonici. I test sono differiti alla Milestone 3. |

## Registro commit e push

| Milestone | Commit | Branch/remoto | Push | Note |
|---|---|---|---|---|
| 1 — Porting funzionale | `7ce4380` | `main` → `origin/main` | verificato | Nessuna interrogazione Vercel; `HEAD` e `origin/main` coincidevano dopo il push. |
| 2 — i18n | da registrare | `main` → `origin/main` | da eseguire | IT/EN/ES/DE/FR e selettore top bar; nessuna pipeline eseguita. |
| 3 — Qualità | da registrare | `main` → `origin/main` | da eseguire | Lint, build/typecheck, coverage ed E2E locali. |

## Registro validazione finale

| Controllo | Comando/configurazione | Risultato |
|---|---|---|
| Lint | da registrare | non ancora eseguito |
| Typecheck | da registrare | non ancora eseguito |
| Build | da registrare | non ancora eseguito |
| Unit/integration | da registrare | non ancora eseguito |
| Coverage globale | da registrare | non ancora misurata |
| E2E locale | da registrare | non ancora eseguito |
| Stato Git finale | da registrare | non ancora verificato |

## Limiti/non portabile

- integrazioni escluse dai vincoli sopra: non portate intenzionalmente;
- suggerimenti basati su obiettivi non configurati: non mostrati come personalizzati;
- ogni ulteriore limite dovrà citare l'evidenza locale mancante o incompatibile.

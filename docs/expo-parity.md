# Parità con l'app Expo originale

Questo documento confronta soltanto comportamenti osservati nel bundle Hermes e nel manifest APK con quanto è realmente implementato nella web app GLICOGIG. Non attribuisce alla web app funzioni non presenti e non interpreta automaticamente le dipendenze native come funzionalità utente.

Legenda:

- **Completo**: disponibile nella web app con flusso operativo.
- **Parziale**: presente solo una parte verificabile del comportamento originale.
- **Assente**: non ancora implementato nella web app.
- **UNKNOWN**: il bundle non basta per stabilire il comportamento effettivo.

## Matrice funzionale

| Area osservata nell'app Expo | Stato web | Note |
| --- | --- | --- |
| Foto del piatto e selezione galleria | **Completo** | Preparazione JPEG/Base64, upload, parsing e gestione errori |
| Catalogo alimentare locale | **Completo** | 228/228 voci estratte dal bundle Hermes |
| Nutrienti per porzione e per 100 g | **Completo** | Calcoli locali senza dati esterni |
| Carico glicemico, fascia e contributi | **Completo** | Replica delle funzioni Hermes ricostruite |
| Correzione grammi | **Completo** | Ricalcolo locale senza nuova richiesta HTTP |
| Scheda alimento e confronto | **Assente** | La web app usa il catalogo nei risultati ma non espone il catalogo navigabile |
| Preferiti | **Assente** | Nessuno store locale dedicato |
| Obiettivo, streak e diario | **Assente** | Nessuna schermata o persistenza equivalente |
| “I miei piatti” | **Assente** | I risultati non vengono salvati come raccolta |
| Scanner barcode | **Assente** | Nessuna camera barcode e nessuna chiamata Open Food Facts |
| Composizione pasto | **Parziale** | Il singolo piatto analizzato è calcolato; manca il compositore multi-alimento |
| Ricette e dettaglio ricetta | **Assente** | Nessun dataset o schermata ricette |
| Piano e lista della spesa | **Assente** | Nessun piano, checklist o condivisione di sistema |
| Contenuti educativi e onboarding | **Parziale** | Sono mostrati eventuali testi restituiti dall'analisi; mancano capitoli e onboarding |
| Promemoria giornaliero | **Assente** | La PWA non programma notifiche locali |
| Premium e ripristino acquisti | **Assente** | Nessuna integrazione RevenueCat/Store nella web app |
| Geolocalizzazione | **Non applicabile** | Nessuna evidenza di una funzione di geolocalizzazione nell'app Expo |

**Conclusione:** la web app è completa per il flusso fotografico, il catalogo e i calcoli nutrizionali/glicemici. Non è ancora una replica funzionale completa dell'app Expo.

## URL osservati e relativo uso

| URL o schema | Uso osservato | Presenza nella web app |
| --- | --- | --- |
| `[SOURCE_APP_HOST]` | Backend dell'analisi fotografica | Sì, come upstream protetto dalla Function Vercel |
| `https://world.openfoodfacts.org/api/v2/product/` | Lookup prodotto tramite barcode | No, perché lo scanner non è implementato |
| `https://generativelanguage.googleapis.com/v1beta/models/` | Client Gemini presente nel bundle; raggiungibilità effettiva non dimostrata | No chiamata diretta dal browser |
| `https://diabete.denuzzogaming.com` | Link esterno informativo | No |
| `https://diabete.denuzzogaming.com/privacy` | Privacy esterna | No |
| `https://diabete.denuzzogaming.com/termini` | Termini esterni | No |
| `https://amzn.eu/d/02rFqvAW` | Link esterno al libro | No |
| `https://instagram.com/fabio_denuzzo_` | Profilo social esterno | No |
| `mailto:` | Apertura del client email per assistenza | No |
| `https://api.revenuecat.com` e `https://e.revenue.cat` | SDK acquisti/premium | No |
| Endpoint Expo push | Supporto SDK notifiche; registrazione push applicativa non dimostrata | No |

Gli URL di documentazione, CDN, font, namespace e messaggi d'errore inclusi dalle dipendenze non sono considerati funzionalità dell'app.

## Ordine consigliato per la parità futura

1. Catalogo navigabile, scheda alimento, ricerca, confronto e preferiti.
2. Compositore pasto e salvataggio dei piatti.
3. Scanner barcode con Open Food Facts e regole di stima dichiarate.
4. Diario, obiettivo e streak.
5. Ricette, piano, lista della spesa e condivisione.
6. Contenuti educativi, onboarding e promemoria.
7. Premium web soltanto dopo aver definito prodotto, entitlement e provider reali.

Ogni area deve essere ricostruita da dati e comportamento verificati; non vanno creati dataset o contratti API inventati per colmare i gap.

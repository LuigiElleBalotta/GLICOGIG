# Evidenze di reverse engineering

| Comportamento | Stato | Evidenza |
| --- | --- | --- |
| Payload foto con `image_base64`, `device_id`, `mime`, `premium` | VERIFIED | Hermes `#15911`, offset `0x00304fc7` |
| Formato ID `dev_` + random base36 + timestamp base36 | VERIFIED | Hermes `#9468`, offset `0x0026674b` |
| ID per-request senza persistenza nella web app | Divergenza richiesta | `requestDeviceId.ts`; l'APK lo persiste, la web app no |
| Catalogo `{ _meta, alimenti[228] }`, 37 campi | VERIFIED | Hermes `#14256`, offset `0x002cd72e` |
| Dataset web corrente: 7 voci obbligatorie | VERIFIED subset | Literal buffer di `#14256`; il resto resta da estrarre |
| Lookup tramite `catalogo_id`; voce non risolta ignorata | VERIFIED | `voceFromFoto #15664` e `calcolaImpatto #15923` |
| Grammi positivi, altrimenti `porzione_standard_g` | VERIFIED | `#15664` istruzioni 35–56; `#15923` istruzioni 38–50 |
| Scaling `valore × grammi / 100` | VERIFIED | `#15664` per carboidrati, fibre, proteine, grassi |
| Scaling energia, zuccheri, saturi e sodio | INFERRED | Stesse unità per 100 g dichiarate in `_meta`; non lette da `#15664` |
| Normalizzazione per 100 g `totale × 100 / grammiTotali` | VERIFIED | `per100 #15665`, offset `0x002f8df0` |
| Modifica grammi: round e clamp `0..2000` | VERIFIED | `setGrammi #15811`, offset `0x00301e45` |
| Modello/provider dietro il Worker | UNKNOWN | Sorgente Worker assente dal materiale locale |

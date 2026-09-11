/** Redaktionelle deutsche UI-Texte; für diese Web-App übersetzt, nicht aus verifizierten APK-Datensätzen extrahiert. */
import type { UiTranslation } from './it'

export const de = {
  brand: { name: 'GLICOGIG', tagline: 'Lebensmittelintelligenz' },
  common: {
    actions: {
      retry: 'Erneut versuchen', clear: 'Leeren', change: 'Ändern', search: 'Suchen', searching: 'Suche…', share: 'Teilen', sharePng: 'PNG teilen',
      preparing: 'Vorbereitung…', saving: 'Speichern…', registered: 'Gespeichert', registeredFeminine: 'Gespeichert', ateIt: 'Ich habe es gegessen',
      addToMeal: 'Zur Mahlzeit hinzufügen', addedToMeal: 'Zur Mahlzeit hinzugefügt', addedToMealFeminine: 'Zur Mahlzeit hinzugefügt',
      openMeal: 'Mahlzeit öffnen', openTheMeal: 'Die Mahlzeit öffnen', openProgress: 'Fortschritt öffnen', emptyMeal: 'Mahlzeit leeren', understood: 'Verstanden',
    },
    aria: { removeFromMeal: '{{name}} aus der Mahlzeit entfernen', gramsOf: 'Gramm von {{name}}', rename: '{{name}} umbenennen', delete: '{{name}} löschen', ringValue: '{{label}}: {{value}}%' },
    labels: {
      today: 'Heute', notAvailable: 'k. A.', localSource: 'lokale Quelle', noSlot: 'Ohne Zeitfenster', index: 'Index', level: 'Stufe', band: 'Bereich',
      quantity: 'Menge', preparation: 'Zubereitung', balance: 'Ausgewogenheit', speed: 'Geschwindigkeit', actions: 'Aktionen',
    },
    metrics: {
      energy: 'Energie', carbohydrates: 'Kohlenhydrate', availableCarbohydrates: 'Verfügbare Kohlenhydrate', availableCarbohydratesShort: 'Verfügbare KH',
      sugars: 'Zucker', fibre: 'Ballaststoffe', protein: 'Eiweiß', fat: 'Fett', glycemicLoad: 'Glykämische Last', glycemicLoadShort: 'GL',
      glycemicIndex: 'GI', weight: 'Gewicht', plates: 'Gerichte', entries: 'Einträge', activeDays: 'Aktive Tage', kcalPerDay: 'Kcal / Tag',
      glycemicLoadTrend: 'GL-Trend', stabilityIndex: 'Stabilitätsindex', portion: 'Portion', totalGlycemicLoad: 'GL gesamt',
    },
    progress: { balance: 'Ausgewogenheit', brakes: 'Bremsen', variety: 'Vielfalt', assessment: 'Bilanz', continuity: 'Kontinuität', trend: 'Verlauf', verdict: 'Bewertung' },
    feedback: {
      persistenceUnconfirmed: 'Lokale Speicherung nicht bestätigt.',
      sessionPersistenceUnconfirmed: 'Der Eintrag ist in dieser Sitzung verfügbar, aber der Browser hat die lokale Speicherung nicht bestätigt.',
      shareSuccess: 'Karte geteilt oder heruntergeladen.', shareSaved: 'Karte geteilt oder auf dem Gerät gespeichert.',
      shareUnavailable: 'Teilen abgebrochen oder nicht verfügbar.', shareIncomplete: 'Teilen nicht abgeschlossen.',
    },
  },
  classification: {
    stability: { veryStable: 'Sehr stabil', goodDay: 'Guter Tag', average: 'Im Durchschnitt', demanding: 'Anspruchsvoll', unavailable: 'Stabilität k. A.' },
    balance: { good: 'Gut', fair: 'Ordentlich', improve: 'Auszugleichen' },
    verdict: { balanced: 'Ausgewogen', moderate: 'Moderat', intense: 'Intensiv', insufficient: 'Unzureichende Daten' },
    impact: { negligible: 'vernachlässigbar', low: 'niedrig', medium: 'mittel', high: 'hoch' },
    reliability: { high: 'Hoch', medium: 'Mittel', low: 'Niedrig' },
    difficulty: { easy: 'Einfach', medium: 'Mittel' },
    editorialState: { draftReview: 'Entwurf – Überprüfung erforderlich' },
  },
  shell: { homeAria: 'GLICOGIG, zur Startseite', localDataBadge: 'Lokale Daten', languageLabel: 'App-Sprache' },
  nav: { mainAria: 'Hauptnavigation', tabs: { home: 'Start', search: 'Suchen', photo: 'Foto', recipes: 'Rezepte', diary: 'Tagebuch', learn: 'Lernen' } },
  install: {
    action: 'App installieren',
    ios: {
      kicker: 'Installation auf iPhone und iPad', title: 'GLICOGIG zum Home-Bildschirm hinzufügen', closeAria: 'Anleitung schließen',
      intro: 'Unter iOS kann der Browser den Installationsdialog nicht automatisch öffnen. Führe diese Schritte aus:',
      shareTitle: 'Auf Teilen tippen', shareLocation: 'Du findest die Schaltfläche {{location}}.', locationChrome: 'rechts neben der Adressleiste',
      locationSafari: 'in der Safari-Werkzeugleiste', addHomeTitle: 'Zum Home-Bildschirm',
      addHomeHint: 'Wenn die Aktion nicht sofort erscheint, scrolle durch die verfügbaren Aktionen.', confirmTitle: 'Mit Hinzufügen bestätigen',
      confirmHint: 'GLICOGIG wird vom Home-Bildschirm als eigenständige App geöffnet.',
    },
  },
  home: {
    hero: {
      kicker: 'Lokaler Überblick', title: 'Kenne deine Mahlzeit.', accent: 'Entscheide mit mehr Kontext.',
      subtitle: 'Katalog, Rezepte, Tagebuch und Lerninhalte funktionieren auf dem Gerät. Keine Demo-Nutzerdaten.',
    },
    verified: {
      aria: 'Verfügbare Inhalte', foods_one: '{{count}} Lebensmittel', foods_other: '{{count}} Lebensmittel', recipes_one: '{{count}} Rezept', recipes_other: '{{count}} Rezepte',
      chapters_one: '{{count}} Kapitel', chapters_other: '{{count}} Kapitel', questions_one: '{{count}} Quizfrage', questions_other: '{{count}} Quizfragen',
    },
    today: {
      entries_one: '{{count}} Eintrag', entries_other: '{{count}} Einträge', empty: 'Leeres Tagebuch', openDiaryAria: 'Tagebuch öffnen',
      emptyHint: 'Speichere ein Lebensmittel, ein Rezept oder eine Mahlzeit, um hier deinen echten Fortschritt zu sehen.', index: 'Index {{value}}',
      localData_one: 'Die angezeigten Daten stammen ausschließlich aus dem heutigen lokalen Eintrag.',
      localData_other: 'Die angezeigten Daten stammen ausschließlich aus den heutigen {{count}} lokalen Einträgen.',
    },
    week: {
      title: 'Letzte sieben Tage', activeDays: '{{days}} von 7 aktiven Tagen', entriesAria: 'Tagebucheinträge pro Tag',
      stabilityEmpty: 'Die Stabilität erscheint nach dem ersten Speichern.', summary: 'Index {{index}} · {{level}}',
    },
    meal: { title: 'Laufende Mahlzeit', plates_one: '{{count}} Gericht', plates_other: '{{count}} Gerichte', summary: '{{carbs}} g Kohlenhydrate · GL {{glycemicLoad}}' },
    quick: {
      kicker: 'Schnellzugriff', title: 'Was möchtest du tun?', analyze: { label: 'Gericht analysieren', note: 'Von einem Foto' },
      search: { label: 'Lebensmittel suchen', note: 'Lebensmittelkatalog' }, barcode: { label: 'Etikett lesen', note: 'Daten von Open Food Facts' },
      recipes: { label: 'Rezepte ansehen', note: 'Werte pro Portion' }, meal: { label: 'Mahlzeit zusammenstellen', note: 'Mehrere Gerichte, eine Summe' },
      advice: { label: 'Tipps', note: 'Aus Mahlzeit und lokalem Tagebuch' }, learn: { label: 'Lernen', note: 'Kapitel und Quiz' },
      explanation: { label: 'Erklärung', note: 'Methode und Formeln' },
    },
  },
  analysis: {
    session: {
      aria: 'Aktuelle Mahlzeitensitzung', title: 'Laufende Mahlzeit', summary_one: '{{count}} Gericht · {{carbs}} g Kohlenhydrate',
      summary_other: '{{count}} Gerichte · {{carbs}} g Kohlenhydrate', totals: 'Kumulierte GL {{glycemicLoad}} · {{grams}} g gesamt', clear: 'Leeren',
      unresolved_one: '{{count}} nicht aufgelöstes Element trägt nicht zu den Nährwerten bei.',
      unresolved_other: '{{count}} nicht aufgelöste Elemente tragen nicht zu den Nährwerten bei.',
    },
    hero: {
      kicker: 'Gerichtsanalyse', title: 'Dein Gericht,', accent: 'blitzschnell gelesen.',
      subtitle: 'Nutze ein Foto oder beschreibe das Gericht. Korrigiere danach Mengen und Gewichte: Nährwerte und glykämische Last werden auf dem Gerät aktualisiert.',
    },
    mode: {
      input: 'Eingabe', aria: 'Analysemodus', photo: 'Foto', text: 'Text', session: 'Sitzung', mealAria: 'Mahlzeitenmodus',
      singleDish: 'Einzelnes Gericht', completeMeal: 'Komplette Mahlzeit',
      completeMealHint: 'Beim Start einer kompletten Mahlzeit wird eine Sitzung, die älter als 4 Stunden ist, vor dem Fortfahren geleert.',
    },
    accessKey: {
      label: 'Website-Passwort', placeholder: 'Passwort eingeben', showAria: 'Passwort anzeigen', hideAria: 'Passwort ausblenden',
      hint: 'Es wird für die Analyse verwendet und bleibt nur in der Sitzung dieses Tabs.',
    },
    text: {
      step: 'Schritt 1', title: 'Gericht beschreiben', maxCharacters: 'max. 2000', label: 'Zutaten und Mengen des Gerichts',
      placeholder: 'Z. B. 80 g gekochter Vollkornreis, 120 g Kichererbsen und Gemüse…', hint: 'Gib Zubereitung und Gramm an, wenn du sie kennst.',
      analyzing: 'Analyse läuft…', action: 'Beschreibung analysieren',
      privacy: 'Der Browser sendet nur die Beschreibung, die Sprache und einen temporären Code für die Analyse. In diesem Modus wird kein Bild gesendet.',
    },
    photo: {
      preparing: 'Vorbereitung…', analyzing: 'Analyse läuft…', action: 'Gericht analysieren', step: 'Schritt 1', title: 'Gericht aufnehmen',
      selectedAlt: 'Ausgewähltes Gericht', activeVision: 'Erkennung aktiv', removeAria: 'Foto entfernen', status: 'GLICOGIG analysiert das Foto des Gerichts.',
      emptyTitle: 'Ein scharfes Foto von oben', emptyHint: 'Halte das ganze Gericht im Bild und nutze gutes Licht. Die Datei wird vor dem Senden optimiert.',
      takePhoto: 'Foto aufnehmen', fromGallery: 'Aus der Galerie', dropHint: 'Du kannst auch ein Bild hierher ziehen · max. 20 MB',
    },
    result: {
      loadingKicker: 'Analyse läuft', loadingTitle: 'Wir betrachten dein Gericht', loadingBody: 'Zutaten werden erkannt und Daten vorbereitet.',
      emptyStep: 'Schritt 2', emptyTitle: 'Entdecke, was im Gericht steckt.',
      emptyBody: 'Nach der Analyse kannst du die Grammangaben korrigieren: Nährwerte und Auswirkung werden sofort aus dem lokalen Katalog neu berechnet.',
      errorKicker: 'Etwas ist schiefgelaufen', errorTitle: 'Analyse nicht abgeschlossen', totalKicker: 'Gericht gesamt', nutritionTitle: 'Nährwerte',
      notRecognized: 'Kein Gericht erkannt', notRecognizedHint: 'Versuche ein näheres, helleres Foto.', recognized: 'Gericht erkannt', unnamedDish: 'Unbenanntes Gericht',
      reliability: 'Zuverlässigkeit {{value}}', fromText: 'Aus Text', fromPhoto: 'Aus Foto', dryWeight: 'Trockengewicht', cookedWeight: 'Gekochtes Gewicht',
      wholeDishOverride: 'Werte für das gesamte Gericht',
    },
    pump: {
      kicker: 'Kohlenhydratübersicht', title: 'Geschätzte Kohlenhydrate',
      body: 'Schätzung anhand der erkannten Zutaten und Mengen. Prüfe die Angaben: Dies ist keine Dosierungsempfehlung.',
      outputAria: 'Geschätzte Kohlenhydrate: {{carbs}} Gramm',
      partial_one: 'Teilschätzung: {{count}} Zutat ist nicht in der Berechnung enthalten. Korrigiere Zutaten und Mengen, bevor du den Wert verwendest.',
      partial_other: 'Teilschätzung: {{count}} Zutaten sind nicht in der Berechnung enthalten. Korrigiere Zutaten und Mengen, bevor du den Wert verwendest.',
      complete: 'Vollständige Schätzung: Alle erkannten Zutaten sind enthalten. Prüfe trotzdem Zutaten und Mengen: Dies ist keine Dosierungsempfehlung.',
    },
    impact: {
      includedAll: 'Alle Zutaten enthalten', includedCount: '{{found}} von {{total}} Zutaten enthalten', incidence: 'Beitrag der Zutaten',
      empty: 'Keine Zutat trägt wesentlich zur Last bei.',
    },
    portion: {
      aria: 'Portionsgröße', small: 'Klein', medium: 'Mittel', large: 'Groß',
      hint: 'Die Optionen beginnen mit den in der Analyse erkannten Mengen; wenn du die Grammzahl änderst, wird die ausgewählte Option aufgehoben.',
    },
    weight: {
      title: 'Gewichtsbasis', aria: 'Gekochtes oder trockenes Gewicht', cooked: 'Gekocht', dry: 'Trocken',
      conversion_one: 'Umrechnung für {{count}} erkannte Zutat mit dem zugehörigen Koch-/Trockenfaktor verfügbar.',
      conversion_other: 'Umrechnung für {{count}} erkannte Zutaten mit den zugehörigen Koch-/Trockenfaktoren verfügbar.',
      unavailable: 'Keine Zutat enthält eine gekochte Zubereitung, die mit den verfügbaren Regeln umgerechnet werden kann.',
    },
    ingredients: {
      kicker: 'Zutaten', title: 'Mengen korrigieren', liveHint: 'Änderungen aktualisieren sofort alle Werte', rawFactor: 'Koch-/Trockenfaktor ×{{factor}}',
      carbs: '{{category}} · {{carbs}} g Kohlenhydrate', insufficient: 'Unzureichende Daten für diese Zutat', dryGrams: 'Gramm trocken', grams: 'Gramm',
      per100: 'Werte pro 100 g anzeigen', lesson: 'Lektion:', context: 'Wann es sinnvoll ist:',
    },
    actions: { dishAdded: 'Gericht hinzugefügt. Möchtest du ein weiteres hinzufügen?', openMealCount: 'Mahlzeit öffnen ({{count}})', analyzeAnother: 'Weiteres Gericht analysieren' },
    disclaimer: 'Die Schätzungen dienen nur zur Information und ersetzen keine professionelle medizinische oder ernährungsbezogene Beratung.',
  },
  catalog: {
    detail: {
      also: 'Auch: {{synonyms}}', impactSummary: 'GL {{value}} · {{band}}', gramsLabel: 'Menge in Gramm', averageGi: 'Mittlerer GI',
      giRange: 'GI min.–max.', giReliability: 'GI-Zuverlässigkeit', shareChoice: 'Diese Auswahl teilen',
    },
    list: {
      backCatalog: '← Lebensmittelkatalog', backAll: '← Alle Lebensmittel', missing: 'Das angeforderte Lebensmittel existiert nicht im lokalen Katalog.',
      kicker: 'Lebensmittelkatalog', title: 'Suche, was du', accent: 'gerade isst.',
      subtitle: 'Ausgeblendete Lebensmittel bleiben ausgeschlossen. Jedes Ergebnis öffnet eine verlinkbare Detailseite; fehlende Werte bleiben k. A.',
      searchLabel: 'Name oder Synonym', searchPlaceholder: 'Z. B. Linsen, Brot, Apfel…', category: 'Kategorie', allCategories: 'Alle Kategorien',
      cardMeta: '{{category}} · Portion {{grams}} g · GI {{gi}}', empty: 'Kein sichtbares Lebensmittel entspricht den Filtern.',
      barcodeTitle: 'Hast du ein Etikett?', barcodeBody: 'Öffne den eigenen Ablauf, um den Code einzugeben oder zu scannen.', openBarcode: 'Barcode öffnen',
    },
  },
  barcode: {
    camera: {
      permission: 'Kamerazugriff verweigert. Aktiviere ihn in den Browsereinstellungen oder nutze ein Foto bzw. den manuellen Code.',
      missing: 'Keine Kamera verfügbar. Nutze ein Foto oder gib den Code manuell ein.',
      busy: 'Die Kamera ist belegt oder kann nicht gestartet werden. Schließe andere Apps, die sie verwenden, und versuche es erneut.',
      constraints: 'Die Kamera unterstützt die erforderlichen Einstellungen nicht. Nutze ein Foto oder den manuellen Code.',
      generic: 'Kamera kann nicht gestartet werden. Nutze ein Foto oder gib den Code manuell ein.',
    },
    product: {
      normalized: 'Produkt gefunden · {{code}}', per100: '{{label}} / 100 g', declaredServing: 'Angegebene Portion: {{value}}',
      dryCorrection: 'Werte für das Trockenprodukt angepasst', uniqueMatch: 'Lebensmittel im Katalog erkannt:',
      uniqueMatchBody: '{{food}}. GL {{glycemicLoad}} · {{band}}, berechnet mit lokalem GI und angegebenen Kohlenhydraten.',
      missingGi: 'Es sind nicht genügend Daten vorhanden, um GI und GL zu berechnen. Diese Werte werden nicht geschätzt.',
      ambiguous: 'Der Name bezeichnet kein einzelnes Lebensmittel im lokalen Katalog. Es sind nicht genügend Daten vorhanden, um GI und GL zu berechnen, und das Produkt kann nicht hinzugefügt werden.',
    },
    scan: {
      invalidCode: 'Gib einen Code mit 6–14 Ziffern ein.', notFound: 'Produkt nicht gefunden.', timeout: 'Die Suche dauerte länger als 9 Sekunden. Versuche es erneut.',
      genericError: 'Barcode-Suche fehlgeschlagen.', secureContext: 'Die Live-Kamera erfordert HTTPS (oder localhost) und einen kompatiblen Browser. Du kannst ein Foto oder den manuellen Code verwenden.',
      previewUnavailable: 'Kameravorschau nicht verfügbar. Nutze ein Foto oder den manuellen Code.', starting: 'Kamera wird gestartet…',
      detected: 'Code {{code}} erkannt. Suche läuft…', frameHint: 'Richte den Barcode im mittleren Bereich aus.', readingImage: 'Bild wird gelesen…',
      invalidImageCode: 'Kein gültiger EAN-/UPC-Barcode erkannt. Gib ihn manuell ein.',
      unreadableImage: 'Kein lesbarer EAN-/UPC-Barcode im Foto. Nutze ein anderes Bild oder den manuellen Code.', cameraClosed: 'Kamera geschlossen. Du kannst den Code manuell eingeben.',
    },
    panel: {
      kicker: 'Etikett', title: 'Barcode',
      body: 'Open Food Facts liefert den angegebenen Namen und die Makronährstoffe. GLICOGIG berechnet die Auswirkung nur, wenn der Name im lokalen Katalog eindeutig ist.',
      placeholder: '6–14 Ziffern', inputAria: 'Barcode', closeCamera: 'Kamera schließen', liveScan: 'Live scannen', scanPhoto: 'Aus einem Foto lesen',
      privacy: 'Live-Scannen ist nur mit einer sicheren Verbindung und einem kompatiblen Browser verfügbar. Fotos und Videos bleiben auf dem Gerät; nur der gelesene Code wird gesendet. Das Produktbild stammt, falls verfügbar, von Open Food Facts.',
    },
  },
  recipes: {
    impact: { high: 'Lecker: Achte auf Portionsgröße und Häufigkeit.', medium: 'Ein gutes Gericht, ausgewogen zu genießen.', low: 'Ein Gericht mit leichter Auswirkung.' },
    detail: {
      backAll: '← Alle Rezepte', photoAlt: 'Foto von {{name}}', imageUnavailable: 'Bild nicht verfügbar', giReliability: 'GI-Zuverlässigkeit {{value}}',
      servingsTitle: 'Zu verzehrende Portionen', servingsAria: 'Anzahl der Portionen', method: 'Methode in vier Dimensionen', dominantUnavailable: 'Dominierende Zutat k. A.',
      reliability: 'Zuverlässigkeit {{value}}', reliabilityUnavailable: 'Zuverlässigkeit k. A.', steps_one: '{{count}} Schritt', steps_other: '{{count}} Schritte',
      timing: '{{prep}} Min. Vorbereitung · {{cook}} Min. Garzeit', ingredients_one: 'Zutaten für {{count}} Portion', ingredients_other: 'Zutaten für {{count}} Portionen',
      procedure: 'Zubereitung', alternatives: 'Weitere Möglichkeiten', alternativeBase: 'Basis: {{base}} · GI {{gi}}', advice: 'Kontext und Tipps',
    },
    list: {
      missingTitle: 'Rezept nicht gefunden', missingBody: 'Die Kennung entspricht keinem der {{count}} verfügbaren Rezepte.',
      verified_one: '{{count}} verfügbares Rezept', verified_other: '{{count}} verfügbare Rezepte', title: 'Rezepte mit Werten', accent: 'pro Portion.',
      subtitle: 'Jedes Rezept öffnet eine eigene Detailseite. Bilder werden angezeigt, wenn sie zum Rezept gehören.',
      searchPlaceholder: 'Name, Beschreibung oder Zutat', searchAria: 'Rezepte suchen', categoryAria: 'Rezeptkategorie', mealAria: 'Mahlzeit',
      bandAria: 'Glykämischer Bereich', allCategories: 'Alle Kategorien', allMeals: 'Alle Mahlzeiten', allBands: 'Alle Bereiche',
      results_one: '{{count}} Ergebnis', results_other: '{{count}} Ergebnisse', empty: 'Kein Rezept entspricht den Filtern.',
    },
  },
  meal: {
    hero: {
      kicker: 'Zusammenstellung mehrerer Gerichte', title: 'Stelle deine', accent: 'Mahlzeit zusammen.',
      subtitle: 'Fotos, Lebensmittel, Etiketten und Rezepte fließen in dieselbe Sitzung. Das Tagebuch erhält nur dann einen zusammengefassten Eintrag, wenn du „Ich habe es gegessen“ wählst.',
    },
    form: { name: 'Name der Mahlzeit', startedAt: 'Begonnen um {{time}}' },
    unresolved_one: '{{count}} nicht aufgelöstes Element trägt nicht zu den Nährwerten bei. Werte mit k. A. bleiben in der Sitzung unverändert.',
    unresolved_other: '{{count}} nicht aufgelöste Elemente tragen nicht zu den Nährwerten bei. Werte mit k. A. bleiben in der Sitzung unverändert.',
    cannotSave: 'Das Tagebuch akzeptiert diese Mahlzeit nur, wenn alle Nährwerte verfügbar und alle Elemente aufgelöst sind. Du kannst die Sitzung trotzdem korrigieren, entfernen oder teilen, ohne fehlende Daten zu erzeugen.',
    saved: 'Mahlzeit gespeichert', empty: { title: 'Die Mahlzeit ist leer', body: 'Füge jedes Gericht über die zugehörige Aktion hinzu. Nichts wird automatisch im Tagebuch gespeichert.' },
    addAria: 'Zur Mahlzeit hinzufügen',
    shortcuts: {
      photo: { label: 'Foto', note: 'Gericht analysieren' }, catalog: { label: 'Katalog', note: 'Lebensmittel und Gramm wählen' },
      barcode: { label: 'Etikett', note: 'Barcode suchen' }, recipes: { label: 'Rezepte', note: 'Eine oder mehrere Portionen hinzufügen' },
    },
  },
  diary: {
    slots: { breakfast: 'Frühstück', lunch: 'Mittagessen', dinner: 'Abendessen', snack: 'Snack', moment: 'Zeitpunkt' },
    row: { newNameAria: 'Neuer Eintragsname', confirmNameAria: 'Name bestätigen' },
    manual: {
      name: 'Name des Lebensmittels oder Gerichts', placeholder: 'Z. B. selbst gemachtes Sandwich', grams: 'Gramm', carbs: 'Kohlenhydrate g', fibre: 'Ballaststoffe g',
      protein: 'Eiweiß g', fat: 'Fett g', catalogGi: 'Katalog-GI', estimatedGi: 'Geschätzter GI',
      estimateNote: 'Schätzung: Nutzt ein entsprechendes Lebensmittel aus dem Katalog, wenn verfügbar; andernfalls gelten vorsichtige lokale Regeln für Zero-/Light-Produkte, Zucker und Flüssigkeiten. Es werden keine externen Nährwertdaten verwendet.',
      saved: 'Eintrag heute gespeichert', action: 'Manuellen Eintrag speichern',
    },
    hero: {
      kicker: 'Fortschritt auf dem Gerät', title: 'Deine Mahlzeiten,', accent: 'ohne Konto.',
      subtitle: 'Sieh sieben echte Tage ein, korrigiere das Zeitfenster und ergänze Fehlendes manuell. Keine Demo-Daten.',
    },
    day: {
      selectAria: 'Tag auswählen', entries_one: '{{count}} Eintrag', entries_other: '{{count}} Einträge', entriesMetric: 'Einträge an diesem Tag',
      carbsMetric: 'g Kohlenhydrate', activeDaysMetric: 'aktive Tage', emptyTitle: 'Keine Einträge', emptyBody: 'Dieser Tag enthält keine lokalen Aufzeichnungen.',
    },
    rings: { title: 'Deine Ringe', streak_one: '{{count}} Tag', streak_other: '{{count}} Tage' },
    week: {
      title: 'Letzte sieben Tage', report: 'Wochenbericht', glycemicSeries: 'Reihe der glykämischen Last', glycemicTitle: 'GL {{value}}',
      hardestMeal: 'Schwierigste Mahlzeit', hardestMeta: 'GL {{value}} · Bereich {{band}}', noHardMealReport: 'Keine Einträge im mittleren oder hohen Bereich im Bericht.',
      sevenDays: 'Sieben Tage', stability: 'Stabilität', noDataTitle: 'Keine Daten', indexTitle: 'Index {{index}}', periodIndex: 'Periodenindex',
      addEntry: 'Eintrag hinzufügen', manual: 'Manuell', totals: 'Summen für sieben Tage', share: 'Fortschritt teilen',
    },
    trend: { better: '{{pct}}% besser', margin: '{{pct}}% Spielraum', aligned: 'Im Rahmen' },
  },
  advice: {
    hero: {
      kicker: 'Tipps aus deinen lokalen Daten', title: 'Mehr Kontext,', accent: 'ohne Ziele zu erfinden.',
      subtitle: 'Diese Ansicht kombiniert die laufende Mahlzeit und echte Tagebucheinträge. Bereiche, die nicht konfigurierte Einstellungen erfordern, werden nicht angezeigt.',
    },
    meal: {
      unresolved_one: '{{count}} nicht aufgelöstes Element macht die Summen unvollständig.', unresolved_other: '{{count}} nicht aufgelöste Elemente machen die Summen unvollständig.',
      emptyTitle: 'Keine laufende Mahlzeit', emptyBody: 'Stelle eine Mahlzeit zusammen, um hier ihre lokale Zusammenfassung zu sehen.', compose: 'Mahlzeit zusammenstellen',
    },
    todayTitle: 'Lokale Indikatoren', weekTitle: 'Wochenübersicht', noHardMeal: 'Keine Einträge im mittleren oder hohen Bereich in dieser Woche.',
    disclaimer: 'Die Zusammenfassungen stammen nur aus der flüchtigen Mahlzeit und dem lokalen Tagebuch. Sie enthalten keine Paywalls, Empfehlungen, Analysen oder klinischen Ratschläge.',
  },
  learn: {
    block: { example: 'Beispiel · {{food}}', openFood: '{{food}} öffnen' },
    chapter: {
      backAll: '← Alle Kapitel', kicker: 'Kapitel {{ordinal}} · {{section}}', empty: 'Persönliche oder kommerzielle Blöcke dieses Kapitels wurden ausgeschlossen.',
      disclaimer: 'Bildungsinhalt: Er ersetzt keine Diagnose, Therapie oder personalisierte Beratung durch medizinisches Fachpersonal.',
      missing: 'Das angeforderte Kapitel gehört nicht zu den verfügbaren Inhalten.',
    },
    quiz: {
      unavailable: 'Tägliches Quiz nicht verfügbar.', back: '← Lernen', kicker: 'Tägliches Quiz · 10 Fragen', title: 'Teste dein Wissen',
      streak: 'Serie {{count}}', record: 'Rekord {{score}}/10',
      editorialState: 'Redaktioneller Status: {{state}}. Die Fragen müssen noch geprüft werden und sind keine klinischen Hinweise.',
      saved: 'Ergebnis lokal gespeichert', sessionOnly: 'Ergebnis in dieser Sitzung verfügbar', resultMeta: 'Rekord {{record}}/10 · Serie {{streak}}',
      persistenceError: 'Der Browser hat nicht bestätigt, dass das Ergebnis auf dem Gerät gespeichert wurde.', progress: 'Frage {{current}} von {{total}}', difficulty: 'Schwierigkeit {{value}}',
      correct: 'Richtige Antwort.', incorrect: 'Falsche Antwort.', next: 'Nächste Frage', finish: 'Beenden und speichern',
      completedToday: 'Du hast das heutige Quiz bereits abgeschlossen. Eine Wiederholung erhöht die Serie nicht doppelt.',
      completedTodayScore: 'Du hast das heutige Quiz bereits mit {{score}}/10 abgeschlossen. Eine Wiederholung erhöht die Serie nicht doppelt.',
    },
    list: {
      kicker: '{{chapters}} Kapitel · {{sections}} Abschnitte', title: 'Lernen, prüfen,', accent: 'einordnen.',
      subtitle: 'Alle verfügbaren Abschnitte sind sichtbar. Beispiele öffnen eine Lebensmittelseite nur, wenn ein Link verfügbar ist.',
      dailyQuiz: 'Tägliches Quiz', quizDataset: '10 verfügbare Fragen', section: 'Abschnitt {{number}}',
      chapter: 'Kapitel {{ordinal}} · {{minutes}} Min.', footer: 'Bildungsinhalte; persönliche und kommerzielle Blöcke ausgeschlossen.', method: 'So funktioniert die Methode',
    },
  },
  method: {
    hero: {
      kicker: 'GLICOGIG-Methode', title: 'So lesen wir', accent: 'ein Gericht.',
      subtitle: 'Vier überprüfbare Dimensionen, eine lokale Berechnung und offen gezeigte Grenzen. Die Bewertung ergibt sich aus der Gesamtlast, nicht allein aus dem GI.',
    },
    dimensionLabel: 'Dimension',
    dimensions: {
      quantity: { title: '1. Menge', body: 'Die Menge verfügbarer Kohlenhydrate in der Portion ist der erste Faktor: Eine Verdopplung der Portion verdoppelt die glykämische Last.' },
      speed: { title: '2. Geschwindigkeit', body: 'Der glykämische Index misst die Anstiegsgeschwindigkeit bei gleicher Kohlenhydratmenge. Allein beschreibt er nicht die tatsächliche Auswirkung der Portion.' },
      balance: { title: '3. Ausgewogenheit', body: 'Ballaststoffe, Eiweiß und Fett werden gemeinsam mit den Kohlenhydraten betrachtet: Sie können den Anstieg verlangsamen, heben die Menge aber nicht auf.' },
      preparation: { title: '4. Zubereitung', body: 'Die Zubereitung zählt: Langes Garen und pürierte Konsistenz können beschleunigen; al dente, Abkühlen und Säure können verlangsamen.' },
    },
    formula: {
      kicker: 'So wird die GL berechnet', title: 'Von der einzelnen Zutat zum Gericht', expression: 'GL = GI × verfügbare Kohlenhydrate der Portion ÷ 100',
      body: 'Die glykämische Last des Gerichts ist die Summe der Beiträge erkannter Zutaten. Unter 5 g Kohlenhydraten ist der Bereich vernachlässigbar; ansonsten ist der Basiswert bis GL 10 niedrig, bis 19 mittel und ab 20 hoch. Die Berechnungsregeln können den Bereich bei schnellen oder flüssigen Profilen anheben.',
    },
    sources: {
      title: 'Woher die Zahlen stammen', catalog: 'Katalog und Rezepte verwenden nur die in der App verfügbaren Lebensmitteldaten.',
      photo: 'Das Foto gleicht Zutaten mit demselben lokalen Katalog ab.',
      barcode: 'Das Etikett nutzt die von Open Food Facts angegebenen Werte; GI und GL erscheinen nur, wenn ein einzelnes Lebensmittel im lokalen Katalog erkannt wird.',
      missing: 'In Ergebnissen und Mahlzeit bleiben fehlende Werte k. A. und werden nicht durch externe Nährwertdaten ersetzt.',
    },
    limitations: {
      title: 'Was nicht gemessen wird', body: 'Die Schätzung beschreibt Lebensmittel und Portion, nicht die persönliche Reaktion. Fotos, unsichtbare Gewürze, tatsächliche Zubereitung und individuelle Unterschiede können das Ergebnis verändern.',
      openLearn: 'Lernen öffnen',
    },
    disclaimer: 'Lebensmittel- und Bildungsinformationen: Sie ersetzen keine Diagnose, Therapie oder personalisierte Beratung durch medizinisches Fachpersonal.',
  },
  share: {
    analysis: { subtitle: 'Von GLICOGIG berechnete Zusammenfassung', note: 'Informative Schätzung auf Basis des lokalen Katalogs. Zutaten und Mengen prüfen.' },
    food: { impactBand: 'Auswirkungsbereich', note: 'Werte und Klassifizierung aus dem lokalen Katalog.' },
    recipe: { subtitle_one: '{{category}} · {{count}} Portion', subtitle_other: '{{category}} · {{count}} Portionen', note: 'Aus den Rezeptdaten pro Portion berechnete Werte.' },
    meal: { fallbackTitle: 'Meine Mahlzeit', subtitle_one: '{{count}} Gericht · {{grams}} g', subtitle_other: '{{count}} Gerichte · {{grams}} g', note: 'Summe der ausdrücklich zur Mahlzeitensitzung hinzugefügten Gerichte.' },
    progress: { title: 'GLICOGIG-Fortschritt', activeDays: 'Tage mit Einträgen', totalEntries: 'Einträge gesamt', noData: 'Keine Daten verfügbar.' },
  },
  errors: {
    accessKeyRequired: 'Gib das Website-Passwort ein, bevor du die Analyse startest.', analysisGeneric: 'Analyse fehlgeschlagen. Versuche es gleich noch einmal.',
    textRequired: 'Beschreibe das Gericht, bevor du die Analyse startest.', textNotFood: 'Die Beschreibung kennzeichnet kein analysierbares Gericht.',
    image: {
      prepareFallback: 'Dieses Foto kann nicht vorbereitet werden.', read: 'Dieses Bild kann nicht gelesen werden. Versuche eine andere Datei.',
      prepare: 'Das Foto kann nicht für die Analyse vorbereitet werden.', convert: 'Das Foto kann nicht konvertiert werden.', type: 'Die ausgewählte Datei ist kein Bild.',
      sourceTooLarge: 'Das Foto ist größer als 20 MB. Wähle ein kleineres.', unsupported: 'Der Browser unterstützt die Fotoverarbeitung nicht.',
      compressedTooLarge: 'Das komprimierte Foto ist noch zu groß. Versuche es zuzuschneiden.',
    },
    photo: {
      invalidResponse: 'Das Ergebnis konnte nicht interpretiert werden. Versuche es mit genaueren Daten.', badRequest: 'Dieses Foto kann nicht analysiert werden. Versuche ein schärferes.',
      badPassword: 'Falsches Passwort. Prüfe es und versuche es erneut.', unavailable: 'Derzeit kann keine weitere Analyse gestartet werden.',
      tooLarge: 'Das Foto ist zu groß. Wähle ein kleineres.', rateLimit: 'Du hast zu viele Analysen kurz hintereinander gestartet. Warte einen Moment und versuche es erneut.',
      network: 'Verbindung fehlgeschlagen. Prüfe das Netzwerk und versuche es erneut.', sameOrigin: 'Der Dienst zur Fotoanalyse ist nicht verfügbar. Versuche es später erneut.',
    },
    text: {
      invalid: 'Ungültige Beschreibung. Gib Lebensmittel und Mengen genauer an.', badPassword: 'Falsches Passwort. Prüfe es und versuche es erneut.',
      unavailable: 'Derzeit kann keine weitere Analyse gestartet werden.', tooLong: 'Die Beschreibung ist zu lang.',
      rateLimit: 'Du hast zu viele Analysen kurz hintereinander gestartet. Warte einen Moment und versuche es erneut.', required: 'Beschreibe das Gericht vor der Analyse.',
      network: 'Verbindung fehlgeschlagen. Prüfe das Netzwerk und versuche es erneut.', sameOrigin: 'Der Dienst zur Textanalyse ist nicht verfügbar. Versuche es später erneut.',
    },
    barcode: {
      invalidResponse: 'Die Produktdaten konnten nicht gelesen werden.', invalidCode: 'Ungültiger Code.', network: 'Der Dienst zur Produktsuche ist nicht erreichbar.',
      proxyUnavailable: 'Die Produktsuche ist derzeit nicht verfügbar.', invalidJson: 'Die Produktdaten konnten nicht gelesen werden.', lookupFailed: 'Produktsuche fehlgeschlagen.',
    },
  },
} as const satisfies UiTranslation

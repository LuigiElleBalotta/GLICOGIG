/** Copy UI éditorial en français, traduit pour cette app web et non extrait des datasets APK vérifiés. */
import type { UiTranslation } from './it'

export const fr = {
  brand: { name: 'GLICOGIG', tagline: 'Intelligence alimentaire' },
  common: {
    actions: {
      retry: 'Réessayer', clear: 'Effacer', change: 'Changer', search: 'Rechercher', searching: 'Recherche…', share: 'Partager', sharePng: 'Partager le PNG',
      preparing: 'Préparation…', saving: 'Enregistrement…', registered: 'Enregistré', registeredFeminine: 'Enregistrée', ateIt: 'Je l’ai mangé',
      addToMeal: 'Ajouter au repas', addedToMeal: 'Ajouté au repas', addedToMealFeminine: 'Ajoutée au repas', openMeal: 'Ouvrir Repas',
      openTheMeal: 'Ouvrir le Repas', openProgress: 'Ouvrir la progression', emptyMeal: 'Vider le repas', understood: 'J’ai compris',
    },
    aria: { removeFromMeal: 'Retirer {{name}} du repas', gramsOf: 'Grammes de {{name}}', rename: 'Renommer {{name}}', delete: 'Supprimer {{name}}', ringValue: '{{label}} : {{value}} %' },
    labels: {
      today: 'Aujourd’hui', notAvailable: 'n.d.', localSource: 'source locale', noSlot: 'Sans créneau', index: 'Indice', level: 'Niveau', band: 'Tranche',
      quantity: 'Quantité', preparation: 'Préparation', balance: 'Équilibre', speed: 'Vitesse', actions: 'Actions',
    },
    metrics: {
      energy: 'Énergie', carbohydrates: 'Glucides', availableCarbohydrates: 'Glucides disponibles', availableCarbohydratesShort: 'Glucides disp.',
      sugars: 'Sucres', fibre: 'Fibres', protein: 'Protéines', fat: 'Lipides', glycemicLoad: 'Charge glycémique', glycemicLoadShort: 'CG',
      glycemicIndex: 'IG', weight: 'Poids', plates: 'Plats', entries: 'Entrées', activeDays: 'Jours actifs', kcalPerDay: 'Kcal / jour',
      glycemicLoadTrend: 'Tendance CG', stabilityIndex: 'Indice de stabilité', portion: 'Portion', totalGlycemicLoad: 'CG totale',
    },
    progress: { balance: 'Équilibre', brakes: 'Freins', variety: 'Variété', assessment: 'Bilan', continuity: 'Régularité', trend: 'Tendance', verdict: 'Verdict' },
    feedback: {
      persistenceUnconfirmed: 'Persistance locale non confirmée.',
      sessionPersistenceUnconfirmed: 'L’entrée est disponible dans cette session, mais le navigateur n’a pas confirmé sa persistance locale.',
      shareSuccess: 'Carte partagée ou téléchargée.', shareSaved: 'Carte partagée ou enregistrée sur l’appareil.',
      shareUnavailable: 'Partage annulé ou indisponible.', shareIncomplete: 'Partage non terminé.',
    },
  },
  classification: {
    stability: { veryStable: 'Très stable', goodDay: 'Bonne journée', average: 'Dans la moyenne', demanding: 'Exigeante', unavailable: 'stabilité n.d.' },
    balance: { good: 'Bon', fair: 'Correct', improve: 'À équilibrer' },
    verdict: { balanced: 'Équilibrée', moderate: 'Modérée', intense: 'Intense', insufficient: 'Données insuffisantes' },
    impact: { negligible: 'négligeable', low: 'faible', medium: 'moyen', high: 'élevé' },
    reliability: { high: 'Élevée', medium: 'Moyenne', low: 'Faible' },
    difficulty: { easy: 'Facile', medium: 'Moyenne' },
    editorialState: { draftReview: 'Brouillon à réviser' },
  },
  shell: { homeAria: 'GLICOGIG, aller à l’accueil', localDataBadge: 'Données locales', languageLabel: 'Langue de l’app' },
  nav: { mainAria: 'Navigation principale', tabs: { home: 'Accueil', search: 'Rechercher', photo: 'Photo', recipes: 'Recettes', diary: 'Journal', learn: 'Apprendre' } },
  install: {
    action: 'Installer l’app',
    ios: {
      kicker: 'Installation sur iPhone et iPad', title: 'Ajouter GLICOGIG à l’écran d’accueil', closeAria: 'Fermer les instructions',
      intro: 'Sur iOS, le navigateur ne peut pas ouvrir automatiquement le panneau d’installation. Suivez ces étapes :',
      shareTitle: 'Touchez Partager', shareLocation: 'Le bouton se trouve {{location}}.', locationChrome: 'à droite de la barre d’adresse',
      locationSafari: 'dans la barre d’outils de Safari', addHomeTitle: 'Ajouter à l’écran d’accueil',
      addHomeHint: 'S’il n’apparaît pas immédiatement, faites défiler les actions disponibles.', confirmTitle: 'Confirmez avec Ajouter',
      confirmHint: 'GLICOGIG s’ouvrira depuis l’écran d’accueil comme une app autonome.',
    },
  },
  home: {
    hero: {
      kicker: 'Aperçu local', title: 'Connaissez votre repas.', accent: 'Choisissez avec plus de contexte.',
      subtitle: 'Le catalogue, les recettes, le journal et l’apprentissage fonctionnent sur l’appareil. Aucune donnée utilisateur de démonstration.',
    },
    verified: {
      aria: 'Contenus vérifiés disponibles', foods_one: '{{count}} aliment', foods_other: '{{count}} aliments', recipes_one: '{{count}} recette', recipes_other: '{{count}} recettes',
      chapters_one: '{{count}} chapitre', chapters_other: '{{count}} chapitres', questions_one: '{{count}} question de quiz', questions_other: '{{count}} questions de quiz',
    },
    today: {
      entries_one: '{{count}} entrée', entries_other: '{{count}} entrées', empty: 'Journal vide', openDiaryAria: 'Ouvrir le journal',
      emptyHint: 'Enregistrez un aliment, une recette ou un Repas pour voir ici votre progression réelle.', index: 'Indice {{value}}',
      localData_one: 'Les données affichées proviennent exclusivement de l’entrée locale d’aujourd’hui.',
      localData_other: 'Les données affichées proviennent exclusivement des {{count}} entrées locales d’aujourd’hui.',
    },
    week: {
      title: 'Sept derniers jours', activeDays: '{{days}} jours actifs sur 7', entriesAria: 'Entrées du journal par jour',
      stabilityEmpty: 'La stabilité apparaît après le premier enregistrement.', summary: 'Indice {{index}} · {{level}}',
    },
    meal: { title: 'Repas en cours', plates_one: '{{count}} plat', plates_other: '{{count}} plats', summary: '{{carbs}} g de glucides · CG {{glycemicLoad}}' },
    quick: {
      kicker: 'Accès rapides', title: 'Que voulez-vous faire ?', analyze: { label: 'Analyser un plat', note: 'À partir d’une photo' },
      search: { label: 'Rechercher un aliment', note: 'Catalogue vérifié' }, barcode: { label: 'Lire une étiquette', note: 'Open Food Facts via proxy' },
      recipes: { label: 'Parcourir les recettes', note: 'Valeurs par portion' }, meal: { label: 'Composer un Repas', note: 'Plusieurs plats, un seul total' },
      advice: { label: 'Conseils', note: 'Du Repas et du Journal local' }, learn: { label: 'Apprendre', note: 'Chapitres et quiz' },
      explanation: { label: 'Explication', note: 'Méthode et formules' },
    },
  },
  analysis: {
    session: {
      aria: 'Session de repas actuelle', title: 'Repas en cours', summary_one: '{{count}} plat · {{carbs}} g de glucides',
      summary_other: '{{count}} plats · {{carbs}} g de glucides', totals: 'CG cumulée {{glycemicLoad}} · {{grams}} g au total', clear: 'Vider',
      unresolved_one: '{{count}} élément non résolu ne contribue pas aux nutriments.', unresolved_other: '{{count}} éléments non résolus ne contribuent pas aux nutriments.',
    },
    hero: {
      kicker: 'Analyse du plat', title: 'Votre plat,', accent: 'lu en un instant.',
      subtitle: 'Utilisez une photo ou décrivez le plat. Corrigez ensuite quantités et poids : les nutriments et la charge glycémique se mettent à jour sur l’appareil.',
    },
    mode: {
      input: 'Entrée', aria: 'Mode d’analyse', photo: 'Photo', text: 'Texte', session: 'Session', mealAria: 'Mode repas', singleDish: 'Plat unique',
      completeMeal: 'Repas complet', completeMealHint: 'Au démarrage d’un repas complet, une session de plus de 4 heures est vidée avant de continuer.',
    },
    accessKey: {
      label: 'Mot de passe du site', placeholder: 'Saisissez le mot de passe', showAria: 'Afficher le mot de passe', hideAria: 'Masquer le mot de passe',
      hint: 'Il sert à l’analyse et reste uniquement dans la session de cet onglet.',
    },
    text: {
      step: 'Étape 1', title: 'Décrivez le plat', maxCharacters: 'max. 2000', label: 'Ingrédients et quantités du plat',
      placeholder: 'Ex. 80 g de riz complet cuit, 120 g de pois chiches et des légumes…', hint: 'Indiquez la préparation et les grammes quand vous les connaissez.',
      analyzing: 'Analyse en cours…', action: 'Analyser la description',
      privacy: 'Le navigateur n’envoie que le texte, la langue et un identifiant éphémère à la frontière same-origin. Aucune image n’est associée à ce mode.',
    },
    photo: {
      preparing: 'Préparation…', analyzing: 'Analyse en cours…', action: 'Analyser le plat', step: 'Étape 1', title: 'Cadrez le plat',
      selectedAlt: 'Plat sélectionné', activeVision: 'Vision active', removeAria: 'Retirer la photo', status: 'GLICOGIG analyse la photo du plat.',
      emptyTitle: 'Une photo nette, vue du dessus', emptyHint: 'Gardez tout le plat dans le cadre et utilisez un bon éclairage. Le fichier est optimisé avant l’envoi.',
      takePhoto: 'Prendre une photo', fromGallery: 'Depuis la galerie', dropHint: 'Vous pouvez aussi déposer une image ici · max. 20 Mo',
    },
    result: {
      loadingKicker: 'Analyse en cours', loadingTitle: 'Nous observons votre plat', loadingBody: 'Reconnaissance des ingrédients et préparation des données.',
      emptyStep: 'Étape 2', emptyTitle: 'Découvrez ce que contient le plat.',
      emptyBody: 'Après l’analyse, vous pouvez corriger les grammes : nutriments et impact sont immédiatement recalculés depuis le catalogue local.',
      errorKicker: 'Un problème est survenu', errorTitle: 'Analyse non terminée', totalKicker: 'Total du plat', nutritionTitle: 'Valeurs nutritionnelles',
      notRecognized: 'Aucun plat reconnu', notRecognizedHint: 'Essayez une photo plus proche et plus lumineuse.', recognized: 'Plat reconnu', unnamedDish: 'Plat sans nom',
      reliability: 'Fiabilité {{value}}', fromText: 'Depuis le texte', fromPhoto: 'Depuis la photo', dryWeight: 'Poids sec', cookedWeight: 'Poids cuit',
      wholeDishOverride: 'Ajustement du plat entier',
    },
    pump: {
      kicker: 'Contrôleur de pompe à insuline', title: 'Glucides à saisir',
      body: 'Valeur calculée à partir de l’impact complet, y compris un éventuel ajustement du plat entier.', outputAria: 'Glucides à saisir : {{carbs}} grammes',
      partial_one: 'Estimation partielle : {{count}} ingrédient est exclu du calcul nutritionnel. Corrigez les ingrédients et les quantités avant d’utiliser la valeur.',
      partial_other: 'Estimation partielle : {{count}} ingrédients sont exclus du calcul nutritionnel. Corrigez les ingrédients et les quantités avant d’utiliser la valeur.',
      complete: 'Calcul complet : tous les ingrédients reconnus sont inclus. Vérifiez malgré tout les ingrédients et les grammes avant de confirmer sur l’appareil.',
    },
    impact: { includedAll: 'Tous les ingrédients inclus', includedCount: '{{found}} ingrédients sur {{total}} inclus', incidence: 'Contribution des ingrédients', empty: 'Aucun ingrédient ne contribue sensiblement à la charge.' },
    portion: {
      aria: 'Préréglage de portion', small: 'Petite', medium: 'Moyenne', large: 'Grande',
      hint: 'Chaque préréglage repart de l’instantané original de l’analyse ; une modification manuelle des grammes désélectionne le préréglage.',
    },
    weight: {
      title: 'Base du poids', aria: 'Poids cuit ou sec', cooked: 'Cuit', dry: 'Sec',
      conversion_one: 'Conversion disponible pour {{count}} ingrédient reconnu avec son facteur cuit/sec.',
      conversion_other: 'Conversion disponible pour {{count}} ingrédients reconnus avec leurs facteurs cuit/sec.',
      unavailable: 'Aucun ingrédient ne contient une préparation cuite convertible avec les règles disponibles.',
    },
    ingredients: {
      kicker: 'Ingrédients', title: 'Corrigez les quantités', liveHint: 'Les modifications mettent immédiatement à jour toutes les valeurs',
      rawFactor: 'Facteur cuit/sec ×{{factor}}', carbs: '{{category}} · {{carbs}} g de glucides', insufficient: 'Données insuffisantes pour inclure cet ingrédient',
      dryGrams: 'Grammes secs', grams: 'Grammes', per100: 'Afficher les valeurs pour 100 g', lesson: 'Leçon :', context: 'Quand cela a du sens :',
    },
    actions: { dishAdded: 'Plat ajouté. Voulez-vous en ajouter un autre ?', openMealCount: 'Ouvrir Repas ({{count}})', analyzeAnother: 'Analyser un autre plat' },
    disclaimer: 'Les estimations sont informatives et ne remplacent pas les conseils médicaux ou nutritionnels professionnels.',
  },
  catalog: {
    detail: {
      also: 'Aussi : {{synonyms}}', impactSummary: 'CG {{value}} · {{band}}', gramsLabel: 'Quantité en grammes', averageGi: 'IG moyen',
      giRange: 'IG min.–max.', giReliability: 'Fiabilité de l’IG', shareChoice: 'Partager ce choix',
    },
    list: {
      backCatalog: '← Catalogue des aliments', backAll: '← Tous les aliments', missing: 'L’aliment demandé n’existe pas dans le catalogue intégré.',
      kicker: 'Catalogue vérifié', title: 'Recherchez ce que', accent: 'vous mangez.',
      subtitle: 'Les aliments masqués restent exclus. Chaque résultat ouvre une fiche partageable et les valeurs manquantes restent n.d.',
      searchLabel: 'Nom ou synonyme', searchPlaceholder: 'Ex. lentilles, pain, pomme…', category: 'Catégorie', allCategories: 'Toutes les catégories',
      cardMeta: '{{category}} · portion {{grams}} g · IG {{gi}}', empty: 'Aucun aliment visible ne correspond aux filtres.',
      barcodeTitle: 'Vous avez une étiquette ?', barcodeBody: 'Ouvrez le parcours dédié pour saisir ou lire le code.', openBarcode: 'Ouvrir le code-barres',
    },
  },
  barcode: {
    camera: {
      permission: 'Autorisation de la caméra refusée. Activez-la dans les réglages du navigateur ou utilisez une photo ou le code manuel.',
      missing: 'Aucune caméra disponible. Utilisez une photo ou saisissez le code manuellement.',
      busy: 'La caméra est occupée ou ne peut pas démarrer. Fermez les autres apps qui l’utilisent et réessayez.',
      constraints: 'La caméra ne prend pas en charge les paramètres demandés. Utilisez une photo ou le code manuel.',
      generic: 'Impossible de démarrer la caméra. Utilisez une photo ou saisissez le code manuellement.',
    },
    product: {
      normalized: 'Produit normalisé · {{code}}', per100: '{{label}} / 100 g', declaredServing: 'Portion déclarée : {{value}}',
      dryCorrection: 'Correction vérifiée du produit sec', uniqueMatch: 'Correspondance locale unique :',
      uniqueMatchBody: '{{food}}. CG {{glycemicLoad}} · {{band}}, calculées avec l’IG local et les glucides déclarés.',
      missingGi: 'La correspondance locale ne dispose pas d’IG ou le produit ne déclare pas de glucides valides. L’IG et la CG ne sont pas inventés.',
      ambiguous: 'Le nom ne se résout pas de façon unique dans le catalogue local. L’IG et la CG ne sont pas inventés et le produit ne peut pas être ajouté.',
    },
    scan: {
      invalidCode: 'Saisissez un code de 6 à 14 chiffres.', notFound: 'Produit introuvable.', timeout: 'La recherche a dépassé 9 secondes. Réessayez.',
      genericError: 'La recherche du code-barres a échoué.', secureContext: 'La caméra en direct nécessite HTTPS (ou localhost) et un navigateur compatible. Vous pouvez utiliser une photo ou le code manuel.',
      previewUnavailable: 'Aperçu de la caméra indisponible. Utilisez une photo ou le code manuel.', starting: 'Démarrage de la caméra…',
      detected: 'Code {{code}} détecté. Recherche en cours…', frameHint: 'Cadrez le code-barres dans la zone centrale.', readingImage: 'Lecture de l’image…',
      invalidImageCode: 'Aucun code-barres EAN/UPC valide détecté. Saisissez-le manuellement.',
      unreadableImage: 'Aucun code-barres EAN/UPC lisible sur la photo. Utilisez une autre image ou le code manuel.', cameraClosed: 'Caméra fermée. Vous pouvez saisir le code manuellement.',
    },
    panel: {
      kicker: 'Étiquette', title: 'Code-barres',
      body: 'Open Food Facts fournit le nom et les macronutriments déclarés. GLICOGIG calcule l’impact uniquement si le nom se résout de façon unique dans le catalogue local.',
      placeholder: '6–14 chiffres', inputAria: 'Code-barres', closeCamera: 'Fermer la caméra', liveScan: 'Scanner en direct', scanPhoto: 'Lire depuis une photo',
      privacy: 'La caméra en direct nécessite HTTPS ou localhost. Les images et vidéos restent dans le navigateur ; seul le code détecté passe par le proxy same-origin. L’image distante du produit n’est pas chargée.',
    },
  },
  recipes: {
    impact: { high: 'Savoureux : surveillez la portion et la fréquence.', medium: 'Un bon plat, à savourer avec équilibre.', low: 'Un plat à impact léger.' },
    detail: {
      backAll: '← Toutes les recettes', photoAlt: 'Photo de {{name}}', imageUnavailable: 'Image indisponible', giReliability: 'Fiabilité de l’IG {{value}}',
      servingsTitle: 'Portions à consommer', servingsAria: 'Nombre de portions', method: 'Méthode en quatre dimensions', dominantUnavailable: 'Ingrédient dominant n.d.',
      reliability: 'Fiabilité {{value}}', reliabilityUnavailable: 'Fiabilité n.d.', steps_one: '{{count}} étape', steps_other: '{{count}} étapes',
      timing: '{{prep}} min de prép. · {{cook}} min de cuisson', ingredients_one: 'Ingrédients pour {{count}} portion', ingredients_other: 'Ingrédients pour {{count}} portions',
      procedure: 'Préparation', alternatives: 'Alternatives intégrées', alternativeBase: 'Base : {{base}} · IG {{gi}}', advice: 'Contexte et conseils',
    },
    list: {
      missingTitle: 'Recette introuvable', missingBody: 'L’identifiant ne correspond pas aux {{count}} recettes intégrées.',
      verified_one: '{{count}} recette vérifiée', verified_other: '{{count}} recettes vérifiées', title: 'Recettes avec valeurs', accent: 'par portion.',
      subtitle: 'Chaque recette ouvre une fiche dédiée. Les images sont affichées uniquement lorsque l’ID et le nom correspondent à la carte vérifiée 1.0.16.',
      searchPlaceholder: 'Nom, description ou ingrédient', searchAria: 'Rechercher des recettes', categoryAria: 'Catégorie de recette', mealAria: 'Repas',
      bandAria: 'Tranche glycémique', allCategories: 'Toutes les catégories', allMeals: 'Tous les repas', allBands: 'Toutes les tranches',
      results_one: '{{count}} résultat', results_other: '{{count}} résultats', empty: 'Aucune recette ne correspond aux filtres.',
    },
  },
  meal: {
    hero: {
      kicker: 'Composition de plusieurs plats', title: 'Construisez votre', accent: 'Repas.',
      subtitle: 'Photos, aliments, étiquettes et recettes convergent dans la même session. Le journal ne reçoit qu’une entrée agrégée, uniquement lorsque vous choisissez « Je l’ai mangé ».',
    },
    form: { name: 'Nom du repas', startedAt: 'Commencé à {{time}}' },
    unresolved_one: '{{count}} élément non résolu ne contribue pas aux nutriments. Les totaux n.d. restent inchangés dans la session.',
    unresolved_other: '{{count}} éléments non résolus ne contribuent pas aux nutriments. Les totaux n.d. restent inchangés dans la session.',
    cannotSave: 'Le Journal accepte ce Repas uniquement lorsque tous les nutriments sont disponibles et qu’aucun élément n’est irrésolu. Vous pouvez tout de même corriger, retirer ou partager la session sans créer de données manquantes.',
    saved: 'Repas enregistré', empty: { title: 'Le repas est vide', body: 'Ajoutez chaque plat avec son action dédiée. Rien n’est enregistré automatiquement dans le journal.' },
    addAria: 'Ajouter au repas',
    shortcuts: {
      photo: { label: 'Photo', note: 'Analyser un plat' }, catalog: { label: 'Catalogue', note: 'Choisir l’aliment et les grammes' },
      barcode: { label: 'Étiquette', note: 'Rechercher le code-barres' }, recipes: { label: 'Recettes', note: 'Ajouter une ou plusieurs portions' },
    },
  },
  diary: {
    slots: { breakfast: 'Petit-déjeuner', lunch: 'Déjeuner', dinner: 'Dîner', snack: 'Collation', moment: 'Moment' },
    row: { newNameAria: 'Nouveau nom de l’entrée', confirmNameAria: 'Confirmer le nom' },
    manual: {
      name: 'Nom de l’aliment ou du plat', placeholder: 'Ex. sandwich préparé à la maison', grams: 'Grammes', carbs: 'Glucides g', fibre: 'Fibres g',
      protein: 'Protéines g', fat: 'Lipides g', catalogGi: 'IG du catalogue', estimatedGi: 'IG estimé',
      estimateNote: 'Estimation vérifiée : correspondance unique dans le catalogue si disponible ; sinon règles locales pour zéro/light, sucres/liquides et repli prudent. Aucune donnée nutritionnelle externe.',
      saved: 'Entrée enregistrée aujourd’hui', action: 'Enregistrer une entrée manuelle',
    },
    hero: {
      kicker: 'Progression sur l’appareil', title: 'Vos repas,', accent: 'sans compte.',
      subtitle: 'Consultez sept jours réels, corrigez le créneau et ajoutez manuellement ce qui manque. Aucune donnée de démonstration.',
    },
    day: {
      selectAria: 'Sélectionner le jour', entries_one: '{{count}} entrée', entries_other: '{{count}} entrées', entriesMetric: 'entrées du jour',
      carbsMetric: 'g de glucides', activeDaysMetric: 'jours actifs', emptyTitle: 'Aucune entrée', emptyBody: 'Ce jour ne contient aucun enregistrement local.',
    },
    rings: { title: 'Vos anneaux', streak_one: '{{count}} jour', streak_other: '{{count}} jours' },
    week: {
      title: 'Sept derniers jours', report: 'Rapport de la semaine', glycemicSeries: 'Série de charge glycémique', glycemicTitle: 'CG {{value}}',
      hardestMeal: 'Repas le plus difficile', hardestMeta: 'CG {{value}} · tranche {{band}}', noHardMealReport: 'Aucune entrée de tranche moyenne ou élevée dans le rapport.',
      sevenDays: 'Sept jours', stability: 'Stabilité', noDataTitle: 'Aucune donnée', indexTitle: 'Indice {{index}}', periodIndex: 'Indice de la période',
      addEntry: 'Ajouter une entrée', manual: 'Manuel', totals: 'Totaux sur sept jours', share: 'Partager la progression',
    },
    trend: { better: '{{pct}} % de mieux', margin: '{{pct}} % de marge', aligned: 'Dans la tendance' },
  },
  advice: {
    hero: {
      kicker: 'Conseils issus de vos données locales', title: 'Plus de contexte,', accent: 'sans inventer d’objectifs.',
      subtitle: 'Cette vue combine le Repas en cours et les enregistrements réels du Journal. Les sections exigeant des préférences non configurées ne sont pas affichées.',
    },
    meal: {
      unresolved_one: '{{count}} élément non résolu rend les totaux partiels.', unresolved_other: '{{count}} éléments non résolus rendent les totaux partiels.',
      emptyTitle: 'Aucun Repas en cours', emptyBody: 'Composez un Repas pour afficher ici son résumé local.', compose: 'Composer un Repas',
    },
    todayTitle: 'Indicateurs locaux', weekTitle: 'Résumé de la semaine', noHardMeal: 'Aucune entrée de tranche moyenne ou élevée cette semaine.',
    disclaimer: 'Les résumés proviennent uniquement du Repas éphémère et du Journal local. Ils ne contiennent ni paywall, ni parrainage, ni analytics, ni recommandations cliniques.',
  },
  learn: {
    block: { example: 'Exemple · {{food}}', openFood: 'Ouvrir {{food}}' },
    chapter: {
      backAll: '← Tous les chapitres', kicker: 'Chapitre {{ordinal}} · {{section}}', empty: 'Les blocs personnels ou commerciaux de ce chapitre ont été exclus.',
      disclaimer: 'Contenu éducatif : il ne remplace pas un diagnostic, un traitement ou les conseils personnalisés de professionnels de santé.',
      missing: 'Le chapitre demandé n’existe pas dans le dataset intégré.',
    },
    quiz: {
      unavailable: 'Quiz quotidien indisponible.', back: '← Apprendre', kicker: 'Quiz quotidien · 10 questions', title: 'Testez vos connaissances',
      streak: 'Série {{count}}', record: 'Record {{score}}/10',
      editorialState: 'Statut éditorial : {{state}}. Les questions intégrées doivent encore être révisées et ne constituent pas des indications cliniques.',
      saved: 'Résultat enregistré localement', sessionOnly: 'Résultat disponible dans cette session', resultMeta: 'Record {{record}}/10 · série {{streak}}',
      persistenceError: 'Le navigateur n’a pas confirmé la persistance dans localStorage.', progress: 'Question {{current}} sur {{total}}', difficulty: 'Difficulté {{value}}',
      correct: 'Bonne réponse.', incorrect: 'Réponse incorrecte.', next: 'Question suivante', finish: 'Terminer et enregistrer',
      completedToday: 'Vous avez déjà terminé le quiz aujourd’hui. Le refaire n’augmente pas deux fois la série.',
      completedTodayScore: 'Vous avez déjà terminé le quiz aujourd’hui avec {{score}}/10. Le refaire n’augmente pas deux fois la série.',
    },
    list: {
      kicker: '{{chapters}} chapitres · {{sections}} sections', title: 'Apprenez, vérifiez,', accent: 'contextualisez.',
      subtitle: 'Toutes les sections intégrées sont visibles. Les exemples ouvrent une fiche aliment uniquement lorsque le lien `foodId` est vérifié.',
      dailyQuiz: 'Quiz quotidien', quizDataset: '10 questions du dataset intégré', section: 'Section {{number}}',
      chapter: 'Chapitre {{ordinal}} · {{minutes}} min', footer: 'Contenus éducatifs intégrés ; blocs personnels et commerciaux exclus.', method: 'Comment fonctionne la méthode',
    },
  },
  method: {
    hero: {
      kicker: 'Méthode GLICOGIG', title: 'Comment nous lisons', accent: 'un plat.',
      subtitle: 'Quatre dimensions vérifiables, un calcul local et des limites affichées ouvertement. Le verdict vient de la charge globale, pas seulement de l’IG.',
    },
    dimensionLabel: 'Dimension',
    dimensions: {
      quantity: { title: '1. Quantité', body: 'La quantité de glucides disponibles de la portion est le premier facteur : doubler la portion double la charge glycémique.' },
      speed: { title: '2. Vitesse', body: 'L’indice glycémique mesure la vitesse d’élévation à quantité égale de glucides. Seul, il ne décrit pas l’impact réel de la portion.' },
      balance: { title: '3. Équilibre', body: 'Fibres, protéines et lipides sont lus avec les glucides : ils peuvent rendre l’élévation plus progressive, mais n’annulent pas la quantité.' },
      preparation: { title: '4. Préparation', body: 'La préparation compte : cuisson longue et texture mixée peuvent accélérer ; cuisson al dente, refroidissement et acidité peuvent ralentir.' },
    },
    formula: {
      kicker: 'Formule vérifiée', title: 'De l’ingrédient au plat', expression: 'CG = IG × glucides disponibles de la portion ÷ 100',
      body: 'La charge glycémique du plat est la somme des contributions des ingrédients résolus. Sous 5 g de glucides, la tranche est négligeable ; sinon la valeur de base est faible jusqu’à CG 10, moyenne jusqu’à 19 et élevée à partir de 20. Les règles vérifiées peuvent relever la tranche pour les profils rapides ou liquides.',
    },
    sources: {
      title: 'D’où viennent les chiffres', catalog: 'Le catalogue et les recettes utilisent exclusivement les datasets intégrés vérifiés.',
      photo: 'La photo résout les ingrédients par rapport au même catalogue local.',
      barcode: 'L’étiquette utilise les macronutriments déclarés par Open Food Facts via un proxy same-origin ; l’IG et la CG n’apparaissent qu’avec une correspondance locale unique.',
      missing: 'Dans les résultats et le Repas, les valeurs manquantes restent n.d. et ne sont pas remplacées par des données nutritionnelles externes.',
    },
    limitations: {
      title: 'Ce qui n’est pas mesuré', body: 'L’estimation décrit l’aliment et la portion, pas la réponse personnelle. Photos, condiments invisibles, préparation réelle et différences individuelles peuvent modifier le résultat.',
      openLearn: 'Ouvrir Apprendre',
    },
    disclaimer: 'Informations alimentaires et éducatives : elles ne remplacent pas un diagnostic, un traitement ou les conseils personnalisés de professionnels de santé.',
  },
  share: {
    analysis: { subtitle: 'Résumé calculé par GLICOGIG', note: 'Estimation informative basée sur le catalogue local. Vérifiez les ingrédients et les quantités.' },
    food: { impactBand: 'Tranche d’impact', note: 'Valeurs et classification du catalogue local vérifié.' },
    recipe: { subtitle_one: '{{category}} · {{count}} portion', subtitle_other: '{{category}} · {{count}} portions', note: 'Valeurs mises à l’échelle à partir des données intégrées par portion de recette.' },
    meal: { fallbackTitle: 'Mon repas', subtitle_one: '{{count}} plat · {{grams}} g', subtitle_other: '{{count}} plats · {{grams}} g', note: 'Total des plats ajoutés explicitement à la session Repas.' },
    progress: { title: 'Progression GLICOGIG', activeDays: 'Jours avec entrées', totalEntries: 'Total des entrées', noData: 'Aucune donnée disponible.' },
  },
  errors: {
    accessKeyRequired: 'Saisissez le mot de passe du site avant de lancer l’analyse.', analysisGeneric: 'L’analyse a échoué. Réessayez dans un instant.',
    textRequired: 'Décrivez le plat avant de lancer l’analyse.', textNotFood: 'La description n’identifie pas un plat analysable.',
    image: {
      prepareFallback: 'Impossible de préparer cette photo.', read: 'Impossible de lire cette image. Essayez un autre fichier.', prepare: 'Impossible de préparer la photo pour l’analyse.',
      convert: 'Impossible de convertir la photo.', type: 'Le fichier sélectionné n’est pas une image.', sourceTooLarge: 'La photo dépasse 20 Mo. Choisissez-en une plus légère.',
      unsupported: 'Le navigateur ne prend pas en charge le traitement de la photo.', compressedTooLarge: 'La photo compressée est encore trop grande. Essayez de la recadrer.',
    },
    photo: {
      invalidResponse: 'Impossible d’interpréter le résultat. Réessayez avec des données plus précises.', badRequest: 'Impossible d’analyser cette photo. Essayez-en une plus nette.',
      badPassword: 'Mot de passe incorrect. Vérifiez-le et réessayez.', unavailable: 'Impossible de lancer une autre analyse pour le moment.',
      tooLarge: 'La photo est trop grande. Choisissez-en une plus légère.', rateLimit: 'Vous avez lancé trop d’analyses à la suite. Attendez un instant et réessayez.',
      network: 'Échec de la connexion. Vérifiez le réseau et réessayez.', sameOrigin: 'Le point d’accès d’analyse photo doit être same-origin.',
    },
    text: {
      invalid: 'Description invalide. Indiquez plus précisément les aliments et les quantités.', badPassword: 'Mot de passe incorrect. Vérifiez-le et réessayez.',
      unavailable: 'Impossible de lancer une autre analyse pour le moment.', tooLong: 'La description est trop longue.',
      rateLimit: 'Vous avez lancé trop d’analyses à la suite. Attendez un instant et réessayez.', required: 'Décrivez le plat avant de l’analyser.',
      network: 'Échec de la connexion. Vérifiez le réseau et réessayez.', sameOrigin: 'Le point d’accès d’analyse texte doit être same-origin.',
    },
    barcode: {
      invalidResponse: 'Réponse de code-barres invalide.', invalidCode: 'Code invalide.', network: 'Service de code-barres inaccessible.',
      proxyUnavailable: 'Proxy de code-barres indisponible ou non configuré.', invalidJson: 'Réponse JSON invalide du proxy de code-barres.', lookupFailed: 'La recherche du code-barres a échoué.',
    },
  },
} as const satisfies UiTranslation


==== Falling back to Disassembly ====
=> [Function #19718 "" of 4738 bytes]: 8 params, frame size=19, strict=1, exc handler=0, debug info=0  @ offset 0x00501ec7

Bytecode listing:

==> 00000000: <CreateEnvironment>: <Reg8: 1>
==> 00000002: <LoadParam>: <Reg8: 5, UInt8: 6>
==> 00000005: <GetGlobalObject>: <Reg8: 2>
==> 00000007: <TryGetById>: <Reg8: 7, Reg8: 2, UInt8: 1, string_id: 14>  # String: 'Object' (Identifier)
==> 0000000d: <GetByIdShort>: <Reg8: 6, Reg8: 7, UInt8: 2, string_id: 96>  # String: 'defineProperty' (Identifier)
==> 00000012: <NewObject>: <Reg8: 4>
==> 00000014: <LoadConstTrue>: <Reg8: 0>
==> 00000016: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 0, string_id: 251>  # String: 'value' (Identifier)
==> 0000001a: <LoadConstString>: <Reg8: 3, string_id: 27>  # String: '__esModule' (Identifier)
==> 0000001e: <Call4>: <Reg8: 3, Reg8: 6, Reg8: 7, Reg8: 5, Reg8: 3, Reg8: 4>
==> 00000025: <TryGetById>: <Reg8: 4, Reg8: 2, UInt8: 1, string_id: 14>  # String: 'Object' (Identifier)
==> 0000002b: <GetByIdShort>: <Reg8: 3, Reg8: 4, UInt8: 2, string_id: 96>  # String: 'defineProperty' (Identifier)
==> 00000030: <NewObject>: <Reg8: 2>
==> 00000032: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 0, string_id: 110>  # String: 'enumerable' (Identifier)
==> 00000036: <CreateClosure>: <Reg8: 0, Reg8: 1, function_id: 19719>  # Function: [#19719 get of 9 bytes]: 1 params @ offset 0x002e8262
==> 0000003b: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 0, string_id: 133>  # String: 'get' (Identifier)
==> 0000003f: <LoadConstString>: <Reg8: 0, string_id: 39280>  # String: 'LEARN_FR' (Identifier)
==> 00000043: <Call4>: <Reg8: 0, Reg8: 3, Reg8: 4, Reg8: 5, Reg8: 0, Reg8: 2>
==> 0000004a: <NewObject>: <Reg8: 0>
==> 0000004c: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195251>  # Object: {'t': 'Qu’est-ce que la glycémie', 's': 'Ce n’est pas réservé aux diabétiques'}
==> 0000005a: <NewObject>: <Reg8: 4>
==> 0000005c: <LoadConstString>: <Reg8: 3, string_id: 26574>  # String: 'La glycémie, c’est simplement la quantité de sucre (glucose) dans le sang. On l’a tous, tout le temps : c’est le carburant qui donne de l’énergie au corps et au cerveau.' (String)
==> 00000060: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000064: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000068: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 0000006c: <NewObject>: <Reg8: 4>
==> 0000006e: <LoadConstString>: <Reg8: 5, string_id: 28604>  # String: 'Quand tu manges, la glycémie monte ; puis elle redescend. Si elle monte doucement et descend doucement, tu as de l’énergie constante. Si elle grimpe puis s’effondre, arrivent fatigue et faim peu après le repas.' (String)
==> 00000072: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000076: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000007a: <NewObject>: <Reg8: 4>
==> 0000007c: <LoadConstString>: <Reg8: 5, string_id: 23780>  # String: 'Cette app ne parle pas de maladies ni de traitements. Elle parle de comment la nourriture bouge ton énergie : utile à quiconque veut mieux manger.' (String)
==> 00000080: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000084: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000088: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195256>  # Object: {'cibo': 'Pain blanc', 'testo': 'Une tranche de pain blanc fait monter la glycémie vite. Ce n’est pas « interdit » : c’est juste une information pour choisir quand et avec quoi le manger.'}
==> 00000096: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000009a: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000009e: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 32974>  # String: 'glicemia' (Identifier)
==> 000000a3: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195261>  # Object: {'t': 'Index glycémique : la vitesse', 's': 'À quelle vitesse un aliment fait monter la glycémie'}
==> 000000b1: <NewObject>: <Reg8: 4>
==> 000000b3: <LoadConstString>: <Reg8: 3, string_id: 27255>  # String: 'L’index glycémique (IG) mesure à quelle VITESSE un aliment fait monter la glycémie, sur une échelle de 0 à 100. Élevé veut dire rapide, faible veut dire lent.' (String)
==> 000000b7: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000000bb: <NewArray>: <Reg8: 3, UInt16: 4>
==> 000000bf: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000000c3: <NewObject>: <Reg8: 4>
==> 000000c5: <LoadConstString>: <Reg8: 5, string_id: 29048>  # String: 'Seul, il ne suffit pas, car il ne dit pas COMBIEN tu en manges. Un IG élevé en petite portion compte peu.' (String)
==> 000000c9: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000000cd: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000000d1: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195266>  # Object: {'cibo': 'Banane', 'testo': 'La banane change d’IG avec la maturité : verte autour de 30, mûre autour de 51. Le même fruit, deux vitesses différentes.'}
==> 000000df: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000000e3: <NewObject>: <Reg8: 4>
==> 000000e5: <LoadConstString>: <Reg8: 5, string_id: 27200>  # String: 'L’IG est la photo de la vitesse, pas de la quantité. Pour l’impact réel il faut la charge glycémique, le prochain chapitre.' (String)
==> 000000e9: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000000ed: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000000f1: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000000f5: <PutNewOwnByIdShort>: <Reg8: 0, Reg8: 2, string_id: 31>  # String: 'ig' (Identifier)
==> 000000f9: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195271>  # Object: {'t': 'Charge glycémique : l’impact réel', 's': 'Le chiffre le plus utile de tous'}
==> 00000107: <NewObject>: <Reg8: 4>
==> 00000109: <LoadConstString>: <Reg8: 3, string_id: 26480>  # String: 'La charge glycémique (CG) réunit deux choses : la vitesse (l’IG) et combien de glucides il y a vraiment dans la portion. C’est le chiffre le plus utile pour comprendre un plat.' (String)
==> 0000010d: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000111: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00000115: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000119: <NewObject>: <Reg8: 4>
==> 0000011b: <LoadConstString>: <Reg8: 5, string_id: 27041>  # String: 'Les niveaux, par portion, sont : faible jusqu’à 10, moyen de 11 à 19, élevé à partir de 20. Dans l’app tu le vois comme une barre avec un curseur.' (String)
==> 0000011f: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000123: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000127: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195276>  # Object: {'cibo': 'Pastèque', 'testo': 'La pastèque a un IG élevé (~76) et semble à première vue un problème. Mais c’est presque que de l’eau : une portion a peu de glucides, donc sa charge reste faible. Voilà pourquoi la portion compte, pas seulement l’IG.'}
==> 00000135: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000139: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195281>  # Object: {'cibo': 'Pain blanc', 'testo': 'Le pain blanc, lui, a un IG élevé ET une charge élevée : ici l’impact est réel.'}
==> 00000147: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000014b: <NewObject>: <Reg8: 4>
==> 0000014d: <LoadConstString>: <Reg8: 5, string_id: 28818>  # String: 'Règle d’or : quand tu regardes un aliment dans l’app, regarde la charge (la barre), pas seulement l’index glycémique.' (String)
==> 00000151: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000155: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000159: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000015d: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 32303>  # String: 'cg' (Identifier)
==> 00000162: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195286>  # Object: {'t': 'Fibres, graisses et protéines : les freins', 's': 'Pourquoi une assiette complète est mieux'}
==> 00000170: <NewObject>: <Reg8: 4>
==> 00000172: <LoadConstString>: <Reg8: 3, string_id: 27012>  # String: 'Les glucides seuls montent vite. Mais s’il y a aussi dans l’assiette des fibres, des graisses et des protéines, la montée ralentit : ce sont les freins naturels de la glycémie.' (String)
==> 00000176: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000017a: <NewArray>: <Reg8: 3, UInt16: 4>
==> 0000017e: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000182: <NewObject>: <Reg8: 4>
==> 00000184: <NewArrayWithBuffer>: <Reg8: 5, UInt16: 3, UInt16: 3, UInt16: 51632>  # Array: ['Fibres (légumes, légumineuses, complets) : ralentissent la montée et rassasient.', 'Protéines (œufs, poisson, viande, légumineuses) : allongent la digestion.', 'Bonnes graisses (huile d’olive, fruits à coque) : ralentissent la vidange de l’estomac.']
==> 0000018c: <PutNewOwnById>: <Reg8: 4, Reg8: 5, string_id: 34177>  # String: 'voci' (Identifier)
==> 00000191: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000195: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195291>  # Object: {'cibo': 'Lentilles cuites', 'testo': 'Les lentilles réunissent fibres et protéines : charge faible et montée lente et prolongée. Un glucide qui libère l’énergie tout doucement.'}
==> 000001a3: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000001a7: <NewObject>: <Reg8: 4>
==> 000001a9: <LoadConstString>: <Reg8: 5, string_id: 27452>  # String: 'Morale : une assiette complète bat presque toujours un glucide seul. Ne retire pas, ajoute.' (String)
==> 000001ad: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000001b1: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000001b5: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000001b9: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 35354>  # String: 'freni' (Identifier)
==> 000001be: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195296>  # Object: {'t': 'Glucides : lesquels et combien', 's': 'Ce sont eux qui bougent le plus la glycémie'}
==> 000001cc: <NewObject>: <Reg8: 4>
==> 000001ce: <LoadConstString>: <Reg8: 3, string_id: 27013>  # String: 'Les glucides sont l’énergie des aliments : pain, pâtes, riz, pommes de terre, fruits, légumineuses, sucre. C’est la partie du repas qui fait le plus monter la glycémie ; protéines et graisses bien moins.' (String)
==> 000001d2: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000001d6: <NewArray>: <Reg8: 3, UInt16: 5>
==> 000001da: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000001de: <NewObject>: <Reg8: 4>
==> 000001e0: <LoadConstString>: <Reg8: 5, string_id: 27319>  # String: 'Mais ils ne sont pas tous pareils. Deux choses comptent : LESQUELS (raffinés et rapides, ou complets et avec fibres) et COMBIEN (la portion). Un « bon » glucide en énorme portion pèse quand même ; un « rapide » en petite quantité pèse peu.' (String)
==> 000001e4: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000001e8: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000001ec: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195301>  # Object: {'cibo': 'Riz blanc cuit', 'testo': 'Le riz blanc est un glucide raffiné : il monte vite. Le riz complet, avec plus de fibres, monte plus doucement. Même céréale, deux vitesses.'}
==> 000001fa: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000001fe: <NewObject>: <Reg8: 4>
==> 00000200: <LoadConstString>: <Reg8: 5, string_id: 27011>  # String: 'Les glucides ne sont pas l’ennemi : c’est de l’énergie. Le jeu est de choisir LESQUELS et de régler COMBIEN.' (String)
==> 00000204: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000208: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000020c: <NewObject>: <Reg8: 4>
==> 0000020e: <LoadConstString>: <Reg8: 5, string_id: 23059>  # String: 'American Diabetes Association — Glucides' (String)
==> 00000212: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 00000216: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 0000021a: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000021e: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 32042>  # String: 'carboidrati' (Identifier)
==> 00000223: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195306>  # Object: {'t': 'Sucres simples vs complexes', 's': 'Rapides ou lents, mais avec des surprises'}
==> 00000231: <NewObject>: <Reg8: 4>
==> 00000233: <LoadConstString>: <Reg8: 3, string_id: 27067>  # String: 'Les sucres simples (sucre, miel, jus) arrivent en général vite. Les glucides complexes (les amidons du pain, des pâtes, du riz) en général plus lentement, car le corps doit les « démonter ».' (String)
==> 00000237: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000023b: <NewArray>: <Reg8: 3, UInt16: 5>
==> 0000023f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000243: <NewObject>: <Reg8: 4>
==> 00000245: <LoadConstString>: <Reg8: 5, string_id: 26710>  # String: 'La surprise : « complexe » ne veut pas dire automatiquement « lent ». Le pain blanc est un amidon complexe mais il monte très vite. Ce qui compte vraiment, c’est la vitesse mesurée (l’index glycémique) plus la quantité.' (String)
==> 00000249: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000024d: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000251: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195311>  # Object: {'cibo': 'Jus d’orange', 'testo': 'Le jus est du sucre simple liquide : il monte vite. L’orange entière, avec sa fibre, bien plus doucement. Même fruit, formes différentes.'}
==> 0000025f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000263: <NewObject>: <Reg8: 4>
==> 00000265: <LoadConstString>: <Reg8: 5, string_id: 30670>  # String: '« Simple » et « complexe » sont une étiquette approximative. La vraie boussole reste IG + charge glycémique.' (String)
==> 00000269: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000026d: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000271: <NewObject>: <Reg8: 4>
==> 00000273: <LoadConstString>: <Reg8: 5, string_id: 27875>  # String: 'OMS — Directives sur les sucres libres (OMS, 2015)' (String)
==> 00000277: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 0000027b: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 0000027f: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000283: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 32785>  # String: 'zuccheri' (Identifier)
==> 00000288: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195316>  # Object: {'t': 'Les portions : la quantité compte', 's': 'La moitié de l’histoire, c’est combien tu manges'}
==> 00000296: <NewObject>: <Reg8: 4>
==> 00000298: <LoadConstString>: <Reg8: 3, string_id: 29788>  # String: 'Un aliment rapide (IG élevé) en petite portion pèse peu. Un aliment lent en énorme portion peut peser lourd. La vitesse seule ne suffit pas : il faut la quantité.' (String)
==> 0000029c: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000002a0: <NewArray>: <Reg8: 3, UInt16: 5>
==> 000002a4: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000002a8: <NewObject>: <Reg8: 4>
==> 000002aa: <LoadConstString>: <Reg8: 5, string_id: 24235>  # String: 'C’est exactement la charge glycémique : vitesse × quantité de glucides de la portion. C’est pourquoi dans l’app tu peux changer les grammes et voir l’impact s’adapter.' (String)
==> 000002ae: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000002b2: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000002b6: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195321>  # Object: {'cibo': 'Banane', 'testo': 'Une petite banane a une charge contenue ; deux grosses changent la donne. Même fruit, impact différent selon la quantité.'}
==> 000002c4: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000002c8: <NewObject>: <Reg8: 4>
==> 000002ca: <LoadConstString>: <Reg8: 5, string_id: 23239>  # String: 'Aucun aliment n’est à craindre en absolu : c’est presque toujours une question de portion.' (String)
==> 000002ce: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000002d2: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000002d6: <NewObject>: <Reg8: 4>
==> 000002d8: <LoadConstString>: <Reg8: 6, string_id: 23403>  # String: 'Université de Sydney — Base de données de l’index glycémique' (String)
==> 000002dc: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 000002e0: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 000002e4: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000002e8: <PutNewOwnByIdShort>: <Reg8: 0, Reg8: 2, string_id: 206>  # String: 'porzioni' (Identifier)
==> 000002ec: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195326>  # Object: {'t': 'Cuit vs cru', 's': 'La cuisson change l’impact'}
==> 000002fa: <NewObject>: <Reg8: 4>
==> 000002fc: <LoadConstString>: <Reg8: 3, string_id: 26528>  # String: 'La façon de cuire change la vitesse d’un aliment. Les pâtes al dente montent plus doucement que trop cuites. Pommes de terre et riz refroidis forment de l’« amidon résistant » et pèsent un peu moins que chauds.' (String)
==> 00000300: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000304: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00000308: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 0000030c: <NewObject>: <Reg8: 4>
==> 0000030e: <LoadConstString>: <Reg8: 5, string_id: 23208>  # String: 'Attention aussi au poids : céréales et légumineuses crues absorbent l’eau et « grossissent » en cuisant. 100 g de pâtes crues deviennent bien plus de grammes une fois cuites, avec bien plus de glucides.' (String)
==> 00000312: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000316: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000031a: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195331>  # Object: {'cibo': 'Pâtes cuites al dente', 'testo': 'Les pâtes al dente sont l’un des trucs les plus simples : mêmes pâtes, montée plus douce que les mêmes trop cuites.'}
==> 00000328: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 0000032c: <NewObject>: <Reg8: 4>
==> 0000032e: <LoadConstString>: <Reg8: 5, string_id: 22925>  # String: 'Al dente et refroidissement sont de petits gestes qui baissent l’impact, sans rien retirer de l’assiette.' (String)
==> 00000332: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000336: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000033a: <NewObject>: <Reg8: 4>
==> 0000033c: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 00000340: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000344: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000348: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 35628>  # String: 'cotto-crudo' (Identifier)
==> 0000034d: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195336>  # Object: {'t': 'Liquides vs solides', 's': 'Pourquoi le jus n’est pas comme le fruit'}
==> 0000035b: <NewObject>: <Reg8: 4>
==> 0000035d: <LoadConstString>: <Reg8: 3, string_id: 26868>  # String: 'Le même sucre, bu, arrive plus vite que mangé. Un jus ou un soda n’ont pas de fibre à mâcher et s’absorbent en un instant : montée rapide. Le fruit entier, avec sa fibre, freine.' (String)
==> 00000361: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000365: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000369: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 0000036d: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195341>  # Object: {'cibo': 'Jus d’orange', 'testo': 'Un verre de jus renferme le sucre de plusieurs oranges, sans leur fibre. L’orange entière rassasie plus et monte plus doucement.'}
==> 0000037b: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000037f: <NewObject>: <Reg8: 4>
==> 00000381: <LoadConstString>: <Reg8: 5, string_id: 28820>  # String: 'Règle simple : mieux vaut le fruit entier que son jus, et pour te désaltérer, de l’eau.' (String)
==> 00000385: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000389: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 0000038d: <NewObject>: <Reg8: 4>
==> 0000038f: <LoadConstString>: <Reg8: 5, string_id: 23014>  # String: 'American Diabetes Association — Boissons et sucres' (String)
==> 00000393: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 00000397: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000039b: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000039f: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 38529>  # String: 'liquidi-solidi' (Identifier)
==> 000003a4: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195391>  # Object: {'t': 'Lire l’étiquette', 's': 'Les 3 chiffres qui comptent vraiment'}
==> 000003b2: <NewObject>: <Reg8: 4>
==> 000003b4: <LoadConstString>: <Reg8: 3, string_id: 29276>  # String: 'Sur l’étiquette, pour la glycémie regarde surtout : les GLUCIDES (et « dont sucres »), les FIBRES (plus il y en a, plus ça freine) et la PORTION réelle que tu manges.' (String)
==> 000003b8: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000003bc: <NewArray>: <Reg8: 3, UInt16: 4>
==> 000003c0: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000003c4: <NewObject>: <Reg8: 4>
==> 000003c6: <LoadConstString>: <Reg8: 5, string_id: 23209>  # String: 'Attention aux pièges : « sans sucre » peut avoir beaucoup de graisses ou d’édulcorants ; les valeurs sont souvent pour 100 g, pas pour la portion — lis bien combien de grammes tu manges vraiment.' (String)
==> 000003ca: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000003ce: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000003d2: <NewObject>: <Reg8: 4>
==> 000003d4: <LoadConstString>: <Reg8: 5, string_id: 26799>  # String: 'Le chiffre le plus utile pour la glycémie, c’est « glucides, dont sucres » rapporté à ta portion. Le reste est accessoire.' (String)
==> 000003d8: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000003dc: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000003e0: <NewObject>: <Reg8: 4>
==> 000003e2: <LoadConstString>: <Reg8: 5, string_id: 24695>  # String: 'EFSA — Étiquetage nutritionnel (Règl. UE 1169/2011)' (String)
==> 000003e6: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 000003ea: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000003ee: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000003f2: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 34144>  # String: 'etichetta' (Identifier)
==> 000003f7: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195396>  # Object: {'t': 'La Méthode [SOURCE_BRAND]', 's': 'Lire chaque plat avec 4 questions'}
==> 00000405: <NewObject>: <Reg8: 4>
==> 00000407: <LoadConstString>: <Reg8: 3, string_id: 28047>  # String: 'Pas besoin d’apprendre par cœur mille aliments. Il suffit de regarder chaque plat avec 4 questions toujours identiques : c’est la Méthode [SOURCE_BRAND]. Tu les retrouves sur chaque fiche de l’app.' (String)
==> 0000040b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000040f: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000413: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000417: <NewObject>: <Reg8: 4>
==> 00000419: <NewArrayWithBuffer>: <Reg8: 5, UInt16: 4, UInt16: 4, UInt16: 51639>  # Array: ['Quantité : combien de glucides dans la portion ? C’est le facteur qui pèse le plus.', 'Vitesse : à quelle vitesse ils montent, c’est-à-dire l’index glycémique ?', 'Équilibre : y a-t-il des fibres, des protéines ou des graisses qui font office de frein ?', 'Préparation : comment est-ce cuit ou transformé (al dente, complet, frit) ?']
==> 00000421: <PutNewOwnById>: <Reg8: 4, Reg8: 5, string_id: 34177>  # String: 'voci' (Identifier)
==> 00000426: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000042a: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 150810>  # Object: {'cibo': 'Spaghetti al dente', 'testo': 'Spaghetti al dente : quantité de glucides moyenne, vitesse faible (l’al dente freine), équilibre à compléter avec la sauce, préparation qui aide. Quatre regards, un plat compris.'}
==> 00000438: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 0000043c: <NewObject>: <Reg8: 4>
==> 0000043e: <LoadConstString>: <Reg8: 5, string_id: 28603>  # String: 'Quand tu auras ces 4 questions en tête, tu sauras lire même un plat que l’app n’a jamais vu. C’est le but de [SOURCE_BRAND] : te rendre bon tout seul.' (String)
==> 00000442: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000446: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000044a: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000044e: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 35650>  # String: 'metodo' (Identifier)
==> 00000453: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195401>  # Object: {'t': 'Calories et glycémie : deux lentilles', 's': 'Elles semblent pareilles, mais non'}
==> 00000461: <NewObject>: <Reg8: 4>
==> 00000463: <LoadConstString>: <Reg8: 3, string_id: 25465>  # String: '[SOURCE_BRAND] te montre deux choses sur chaque aliment : l’impact sur la glycémie et les calories. Elles semblent pareilles, mais les confondre mène à l’erreur.' (String)
==> 00000467: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000046b: <NewArray>: <Reg8: 3, UInt16: 4>
==> 0000046f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000473: <NewObject>: <Reg8: 4>
==> 00000475: <NewArrayWithBuffer>: <Reg8: 5, UInt16: 3, UInt16: 3, UInt16: 1312>  # Array: ['Glycémie : combien et à quelle vitesse le sucre monte dans le sang. Pour ça, regarde la charge.', 'Calories : combien d’énergie apporte cet aliment. Pour ça, regarde portion et objectif.', 'Un aliment peut peu faire monter la glycémie et être très calorique. Et inversement.']
==> 0000047d: <PutNewOwnById>: <Reg8: 4, Reg8: 5, string_id: 34177>  # String: 'voci' (Identifier)
==> 00000482: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000486: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195406>  # Object: {'cibo': 'Huile et fruits à coque', 'testo': 'L’huile d’olive et les fruits à coque ne font presque pas monter la glycémie, mais font partie des aliments les plus caloriques : parfaits pour l’énergie, à doser si tu veux maigrir.'}
==> 00000494: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000498: <NewObject>: <Reg8: 4>
==> 0000049a: <LoadConstString>: <Reg8: 5, string_id: 24262>  # String: 'Dans l’app, à côté de l’impact, tu trouves l’étiquette Léger / Moyen / Consistant. Utilise les deux lentilles ensemble, selon ton objectif dans la section Progrès.' (String)
==> 0000049e: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000004a2: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000004a6: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000004aa: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 35345>  # String: 'calorie' (Identifier)
==> 000004af: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195411>  # Object: {'t': 'L’ordre à table et le mouvement', 's': 'Deux gestes simples qui marchent'}
==> 000004bd: <NewObject>: <Reg8: 4>
==> 000004bf: <LoadConstString>: <Reg8: 3, string_id: 23746>  # String: 'Ce qui compte, ce n’est pas seulement ce que tu manges, mais aussi dans quel ordre, et ce que tu fais après.' (String)
==> 000004c3: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000004c7: <NewArray>: <Reg8: 3, UInt16: 4>
==> 000004cb: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000004cf: <NewObject>: <Reg8: 4>
==> 000004d1: <NewArrayWithBuffer>: <Reg8: 5, UInt16: 2, UInt16: 2, UInt16: 1714>  # Array: ['Commence par les légumes et les protéines, laisse les glucides pour la fin : la glycémie monte plus doucement.', 'Une marche après le repas aide le corps à utiliser ce sucre au lieu de le stocker.']
==> 000004d9: <PutNewOwnById>: <Reg8: 4, Reg8: 5, string_id: 34177>  # String: 'voci' (Identifier)
==> 000004de: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000004e2: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195416>  # Object: {'cibo': 'Spaghetti al dente', 'testo': 'Le même plat de pâtes : si tu manges d’abord une garniture de légumes, l’impact s’adoucit.'}
==> 000004f0: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000004f4: <NewObject>: <Reg8: 4>
==> 000004f6: <LoadConstString>: <Reg8: 5, string_id: 23752>  # String: 'Ce sont des habitudes, pas des règles médicales. De petits gestes que chacun peut essayer à table.' (String)
==> 000004fa: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000004fe: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000502: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000506: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 42827>  # String: 'ordine' (Identifier)
==> 0000050b: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195421>  # Object: {'t': 'Astuces de cuisine', 's': 'La façon de cuire change aussi l’impact'}
==> 00000519: <NewObject>: <Reg8: 4>
==> 0000051b: <LoadConstString>: <Reg8: 3, string_id: 26863>  # String: 'Le même aliment peut avoir des impacts différents selon la préparation. Trois astuces faciles :' (String)
==> 0000051f: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000523: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000527: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 0000052b: <NewObject>: <Reg8: 4>
==> 0000052d: <NewArrayWithBuffer>: <Reg8: 5, UInt16: 3, UInt16: 3, UInt16: 51648>  # Array: ['Pâtes et riz AL DENTE montent moins qu’une cuisson très longue.', 'Refroidir pâtes, riz ou pommes de terre (ex. les pâtes froides) crée de l’« amidon résistant », qui fait moins monter la glycémie.', 'Le fruit plus mûr a un IG plus élevé : une banane verte et une tachetée ne sont pas pareilles.']
==> 00000535: <PutNewOwnById>: <Reg8: 4, Reg8: 5, string_id: 34177>  # String: 'voci' (Identifier)
==> 0000053a: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000053e: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 183493>  # Object: {'cibo': 'Orge perlé cuit', 'testo': 'En changeant de céréale tu changes tout : l’orge perlé a un index glycémique très bas, bien plus doux que le riz blanc.'}
==> 0000054c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000550: <NewObject>: <Reg8: 4>
==> 00000552: <LoadConstString>: <Reg8: 5, string_id: 22991>  # String: 'Dans les recettes de l’app tu trouves souvent ces « Alternatives à moindre impact » déjà prêtes.' (String)
==> 00000556: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000055a: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000055e: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000562: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 46308>  # String: 'cucina' (Identifier)
==> 00000567: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195426>  # Object: {'t': 'Petit-déjeuner : bien partir', 's': 'Le premier repas donne le rythme de la journée'}
==> 00000575: <NewObject>: <Reg8: 4>
==> 00000577: <LoadConstString>: <Reg8: 3, string_id: 29850>  # String: 'Un petit-déjeuner de sucres rapides seulement (biscottes avec confiture, croissant, jus) fait un pic puis une chute : faim et fatigue en milieu de matinée. Ajouter un frein change tout.' (String)
==> 0000057b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000057f: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00000583: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000587: <NewObject>: <Reg8: 4>
==> 00000589: <LoadConstString>: <Reg8: 5, string_id: 27235>  # String: 'L’astuce : associe aux glucides quelque chose qui ralentit — bonnes graisses, protéines ou fibres. Yaourt, fruits à coque, avoine, œufs : la montée devient douce et l’énergie dure.' (String)
==> 0000058d: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000591: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000595: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195431>  # Object: {'cibo': 'Porridge d’avoine', 'testo': 'L’avoine avec yaourt et fruits à coque monte doucement et rassasie longtemps : un petit-déjeuner avec les freins déjà dedans.'}
==> 000005a3: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000005a7: <NewObject>: <Reg8: 4>
==> 000005a9: <LoadConstString>: <Reg8: 5, string_id: 28045>  # String: 'Pas besoin de renoncer : il suffit d’accompagner. Ajoute un frein et le même petit-déjeuner pèse moins.' (String)
==> 000005ad: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000005b1: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000005b5: <NewObject>: <Reg8: 4>
==> 000005b7: <LoadConstString>: <Reg8: 5, string_id: 23081>  # String: 'American Diabetes Association — Petit-déjeuner' (String)
==> 000005bb: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 000005bf: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 000005c3: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000005c7: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 35372>  # String: 'colazione' (Identifier)
==> 000005cc: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195436>  # Object: {'t': 'La collation intelligente', 's': 'Petite, mais avec des freins'}
==> 000005da: <NewObject>: <Reg8: 4>
==> 000005dc: <LoadConstString>: <Reg8: 3, string_id: 26637>  # String: 'La pire collation, c’est un glucide rapide seul (galettes, crackers, un fruit à la va-vite) : ça monte et ça descend, et peu après tu as de nouveau faim. La meilleure lui met un frein à côté.' (String)
==> 000005e0: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000005e4: <NewArray>: <Reg8: 3, UInt16: 5>
==> 000005e8: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000005ec: <NewObject>: <Reg8: 4>
==> 000005ee: <LoadConstString>: <Reg8: 5, string_id: 23199>  # String: 'Associe : fruit + fruits à coque, yaourt + quelques amandes, une galette avec quelque chose de protéiné. La fibre et les graisses aplatissent la montée.' (String)
==> 000005f2: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000005f6: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000005fa: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195441>  # Object: {'cibo': 'Amandes', 'testo': 'Une poignée d’amandes à côté d’un fruit transforme une collation rapide en collation équilibrée.'}
==> 00000608: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 0000060c: <NewObject>: <Reg8: 4>
==> 0000060e: <LoadConstString>: <Reg8: 5, string_id: 28819>  # String: 'Règle d’or de la collation : jamais un glucide rapide seul. Mets-lui toujours un frein à côté.' (String)
==> 00000612: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000616: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000061a: <NewObject>: <Reg8: 4>
==> 0000061c: <LoadConstString>: <Reg8: 5, string_id: 23027>  # String: 'American Diabetes Association — Collations' (String)
==> 00000620: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 00000624: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000628: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000062c: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 41698>  # String: 'spuntino' (Identifier)
==> 00000631: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195446>  # Object: {'t': 'Le dessert : comment l’intégrer', 's': 'Sans culpabilité, avec la tête'}
==> 0000063f: <NewObject>: <Reg8: 4>
==> 00000641: <LoadConstString>: <Reg8: 3, string_id: 26815>  # String: 'Le dessert n’est pas interdit : ce qui compte c’est quand et comment. Après un repas complet (avec légumes, protéines, graisses) l’impact est plus doux qu’à jeun, où ça monte vite.' (String)
==> 00000645: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000649: <NewArray>: <Reg8: 3, UInt16: 5>
==> 0000064d: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000651: <NewObject>: <Reg8: 4>
==> 00000653: <LoadConstString>: <Reg8: 5, string_id: 25189>  # String: 'Et la portion compte : un petit morceau, c’est une chose, un demi-pot, c’en est une autre. Avec l’app tu peux voir l’impact s’adapter aux grammes choisis.' (String)
==> 00000657: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000065b: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000065f: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195451>  # Object: {'cibo': 'Chocolat noir', 'testo': 'Le chocolat noir a moins de sucre et plus de graisse : en petite portion, après un repas, c’est un dessert « doux ».'}
==> 0000066d: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000671: <NewObject>: <Reg8: 4>
==> 00000673: <LoadConstString>: <Reg8: 5, string_id: 26814>  # String: 'Le dessert en fin de repas et en portion mesurée pèse bien moins que seul et sans contrôle.' (String)
==> 00000677: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000067b: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000067f: <NewObject>: <Reg8: 4>
==> 00000681: <LoadConstString>: <Reg8: 5, string_id: 27881>  # String: 'OMS — Sucres libres (OMS, 2015)' (String)
==> 00000685: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 00000689: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 0000068d: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000691: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 36535>  # String: 'dolce' (Identifier)
==> 00000696: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195456>  # Object: {'t': 'Marcher après les repas', 's': 'Dix minutes qui changent la montée'}
==> 000006a4: <NewObject>: <Reg8: 4>
==> 000006a6: <LoadConstString>: <Reg8: 3, string_id: 23553>  # String: 'Bouger après manger aide les muscles à utiliser le sucre qui vient d’arriver : la montée de la glycémie s’aplatit. 10-15 minutes de marche légère suffisent.' (String)
==> 000006aa: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000006ae: <NewArray>: <Reg8: 3, UInt16: 4>
==> 000006b2: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000006b6: <NewObject>: <Reg8: 4>
==> 000006b8: <LoadConstString>: <Reg8: 5, string_id: 28046>  # String: 'Pas besoin de salle de sport : une promenade après le déjeuner ou le dîner est l’un des gestes les plus efficaces et simples. Mieux vaut juste après, quand la montée démarre.' (String)
==> 000006bc: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000006c0: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000006c4: <NewObject>: <Reg8: 4>
==> 000006c6: <LoadConstString>: <Reg8: 5, string_id: 26593>  # String: 'La marche après le repas est un « frein » gratuit : rien retiré du repas, juste la montée rendue plus douce.' (String)
==> 000006ca: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000006ce: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000006d2: <NewObject>: <Reg8: 4>
==> 000006d4: <LoadConstString>: <Reg8: 5, string_id: 28764>  # String: 'Reynolds et al., Diabetologia 2016 — marche après le repas' (String)
==> 000006d8: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 000006dc: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000006e0: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000006e4: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 36850>  # String: 'camminata' (Identifier)
==> 000006e9: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195461>  # Object: {'t': 'Dehors et au restaurant', 's': 'Bien choisir sur la carte'}
==> 000006f7: <NewObject>: <Reg8: 4>
==> 000006f9: <LoadConstString>: <Reg8: 3, string_id: 24320>  # String: 'Dehors tu ne pèses pas les grammes, mais la méthode reste : commence par les légumes, choisis une protéine, et surveille la quantité de glucides (pain, pâtes, pommes de terre, dessert).' (String)
==> 000006fd: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000701: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00000705: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000709: <NewObject>: <Reg8: 4>
==> 0000070b: <LoadConstString>: <Reg8: 5, string_id: 23200>  # String: 'Astuces pratiques : légumes ou salade d’abord, de l’eau au lieu des sodas, le pain avec modération, et s’il y a un dessert mets-le en fin de repas, pas à jeun.' (String)
==> 0000070f: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000713: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000717: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195466>  # Object: {'cibo': 'Salade d’algues (wakame)', 'testo': 'Commencer par une garniture de légumes crée le « frein » avant que les glucides n’arrivent.'}
==> 00000725: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000729: <NewObject>: <Reg8: 4>
==> 0000072b: <LoadConstString>: <Reg8: 5, string_id: 28043>  # String: 'Pas besoin de balance pour bien manger dehors : il suffit du bon ordre et d’un œil sur la portion.' (String)
==> 0000072f: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000733: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000737: <NewObject>: <Reg8: 4>
==> 00000739: <LoadConstString>: <Reg8: 5, string_id: 29059>  # String: 'Shukla et al., Diabetes Care 2015 — ordre des aliments' (String)
==> 0000073d: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 00000741: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000745: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000749: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 40309>  # String: 'fuori-casa' (Identifier)
==> 0000074e: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195471>  # Object: {'t': 'Planifier les courses', 's': 'Les choix se font au supermarché'}
==> 0000075c: <NewObject>: <Reg8: 4>
==> 0000075e: <LoadConstString>: <Reg8: 3, string_id: 26607>  # String: 'La moitié du travail se fait dans le caddie. Si tu as chez toi des fibres et des protéines (légumes, légumineuses, yaourt, fruits à coque, complets), c’est facile de construire des plats avec des freins. Si tu n’as que des aliments rapides, ce sera difficile.' (String)
==> 00000762: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000766: <NewArray>: <Reg8: 3, UInt16: 5>
==> 0000076a: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 0000076e: <NewObject>: <Reg8: 4>
==> 00000770: <LoadConstString>: <Reg8: 5, string_id: 23221>  # String: 'Au supermarché, utilise le scanner de code-barres et lis l’étiquette : regarde les glucides « dont sucres » et la fibre, et choisis avant de mettre dans le caddie.' (String)
==> 00000774: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000778: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000077c: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195476>  # Object: {'cibo': 'Lentilles cuites', 'testo': 'Garder des légumineuses en réserve, c’est avoir toujours un glucide avec les freins déjà prêt.'}
==> 0000078a: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 0000078e: <NewObject>: <Reg8: 4>
==> 00000790: <LoadConstString>: <Reg8: 5, string_id: 29741>  # String: 'Tu ne décides pas devant l’assiette : tu décides au supermarché. Remplis le placard de freins.' (String)
==> 00000794: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000798: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000079c: <NewObject>: <Reg8: 4>
==> 0000079e: <LoadConstString>: <Reg8: 5, string_id: 23029>  # String: 'American Diabetes Association — Courses et planification' (String)
==> 000007a2: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 000007a6: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 000007aa: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000007ae: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 37370>  # String: 'spesa' (Identifier)
==> 000007b3: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195481>  # Object: {'t': 'IG élevé n’est pas toujours un ennemi', 's': 'Quand la montée rapide sert (sport)'}
==> 000007c1: <NewObject>: <Reg8: 4>
==> 000007c3: <LoadConstString>: <Reg8: 3, string_id: 28040>  # String: 'Parfois une montée rapide est exactement ce qu’il te faut. Le cas le plus clair est le sport intense.' (String)
==> 000007c7: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000007cb: <NewArray>: <Reg8: 3, UInt16: 5>
==> 000007cf: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000007d3: <NewObject>: <Reg8: 4>
==> 000007d5: <LoadConstString>: <Reg8: 5, string_id: 23278>  # String: 'Autour d’un entraînement dur, le corps brûle vite et a besoin d’énergie prête : un aliment à IG plus élevé a sa place, ce n’est pas une erreur.' (String)
==> 000007d9: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000007dd: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000007e1: <NewObject>: <Reg8: 4>
==> 000007e3: <NewArrayWithBuffer>: <Reg8: 5, UInt16: 3, UInt16: 3, UInt16: 51655>  # Array: ['Avant un effort intense : un peu de glucides prêts donnent de l’élan.', 'Après l’effort : ils aident à la récupération.', 'Immobile, au bureau, cette même montée rapide sert bien moins.']
==> 000007eb: <PutNewOwnById>: <Reg8: 4, Reg8: 5, string_id: 34177>  # String: 'voci' (Identifier)
==> 000007f0: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000007f4: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195486>  # Object: {'cibo': 'Banane', 'testo': 'Une banane mûre avant de courir, c’est du carburant rapide. La même banane au petit-déjeuner, immobile, donne une montée dont tu n’as peut-être pas besoin.'}
==> 00000802: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000806: <NewObject>: <Reg8: 4>
==> 00000808: <LoadConstString>: <Reg8: 5, string_id: 26808>  # String: 'Le contexte compte. « Élevé » ne veut pas dire « mauvais » : ça veut dire « rapide », et parfois rapide est ce que tu cherches.' (String)
==> 0000080c: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000810: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000814: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000818: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 35868>  # String: 'sport' (Identifier)
==> 0000081d: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195491>  # Object: {'t': 'Mythes à démolir', 's': 'Ce qu’on dit, et ce qui est vrai'}
==> 0000082b: <NewObject>: <Reg8: 4>
==> 0000082d: <LoadConstString>: <Reg8: 3, string_id: 29273>  # String: 'Sur la nourriture et la glycémie circulent beaucoup d’idées reçues. Démolissons-en quelques-unes, tranquillement.' (String)
==> 00000831: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000835: <NewArray>: <Reg8: 3, UInt16: 3>
==> 00000839: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 0000083d: <NewObject>: <Reg8: 4>
==> 0000083f: <NewArrayWithBuffer>: <Reg8: 5, UInt16: 4, UInt16: 4, UInt16: 1836>  # Array: ['« Le fruit est mauvais, il a du sucre » → Non. Le fruit entier a des fibres et de l’eau qui freinent la montée. Compte la quantité et le type, pas l’interdit.', '« Le pain complet ne fait pas monter la glycémie » → Il fait monter moins que le blanc, mais il fait monter. Mieux, pas gratuit.', '« Le sucre de canne est plus sain que le blanc » → Pour la glycémie ils sont quasi identiques.', '« Sans sucre = libre » → Attention : souvent il y a d’autres glucides ou graisses. Lis l’étiquette.']
==> 00000847: <PutNewOwnById>: <Reg8: 4, Reg8: 5, string_id: 34177>  # String: 'voci' (Identifier)
==> 0000084c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000850: <NewObject>: <Reg8: 4>
==> 00000852: <LoadConstString>: <Reg8: 5, string_id: 24630>  # String: 'Démolir les mythes, c’est la moitié du travail. L’autre moitié, c’est regarder les vrais chiffres, que l’app te met sous les yeux.' (String)
==> 00000856: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000085a: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 0000085e: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000862: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 33008>  # String: 'miti' (Identifier)
==> 00000867: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195496>  # Object: {'t': 'Comment la garder plus stable', 's': 'Le résumé de tout'}
==> 00000875: <NewObject>: <Reg8: 4>
==> 00000877: <LoadConstString>: <Reg8: 3, string_id: 25013>  # String: 'En réunissant les chapitres, voici les gestes simples pour une glycémie, et une énergie, plus stables :' (String)
==> 0000087b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000087f: <NewArray>: <Reg8: 3, UInt16: 3>
==> 00000883: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000887: <NewObject>: <Reg8: 4>
==> 00000889: <NewArrayWithBuffer>: <Reg8: 5, UInt16: 5, UInt16: 5, UInt16: 51662>  # Array: ['Regarde la charge, pas seulement l’index glycémique.', 'Complète l’assiette avec des fibres, des protéines et de bonnes graisses.', 'Choisis des alternatives à IG plus bas : l’app te les propose.', 'Commence par les légumes et bouge un peu après les repas.', 'Cuis al dente et profite de l’amidon résistant.']
==> 00000891: <PutNewOwnById>: <Reg8: 4, Reg8: 5, string_id: 34177>  # String: 'voci' (Identifier)
==> 00000896: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000089a: <NewObject>: <Reg8: 4>
==> 0000089c: <LoadConstString>: <Reg8: 5, string_id: 23750>  # String: 'Ce sont des conseils généraux et éducatifs, pas des indications médicales. Chacun est différent : si tu as une condition particulière, suis toujours le plan de ton médecin ou de ton équipe de soins.' (String)
==> 000008a0: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000008a4: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000008a8: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000008ac: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 36034>  # String: 'stabile' (Identifier)
==> 000008b1: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195501>  # Object: {'t': '« Le fruit est mauvais » ?', 's': 'Non : ça dépend lequel, combien et comment'}
==> 000008bf: <NewObject>: <Reg8: 4>
==> 000008c1: <LoadConstString>: <Reg8: 3, string_id: 26824>  # String: 'Le fruit a du sucre, vrai, mais aussi des fibres, de l’eau et des vitamines. La fibre ralentit l’absorption : la plupart des fruits entiers ont un impact contenu en portion normale.' (String)
==> 000008c5: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000008c9: <NewArray>: <Reg8: 3, UInt16: 5>
==> 000008cd: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000008d1: <NewObject>: <Reg8: 4>
==> 000008d3: <LoadConstString>: <Reg8: 5, string_id: 23745>  # String: 'Ce qui change tout, c’est la FORME : le fruit entier freine, le jus non. Et la quantité : un fruit, c’est une chose, quatre, c’en est une autre.' (String)
==> 000008d7: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000008db: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000008df: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195506>  # Object: {'cibo': 'Pomme avec peau', 'testo': 'Une pomme avec la peau apporte de la fibre : elle monte doucement. Son jus, sans fibre, monte vite. Même fruit, deux histoires.'}
==> 000008ed: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000008f1: <NewObject>: <Reg8: 4>
==> 000008f3: <LoadConstString>: <Reg8: 5, string_id: 26830>  # String: 'Le fruit entier n’est pas l’ennemi : c’est l’un des glucides avec les freins déjà dedans.' (String)
==> 000008f7: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000008fb: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000008ff: <NewObject>: <Reg8: 4>
==> 00000901: <LoadConstString>: <Reg8: 5, string_id: 23047>  # String: 'American Diabetes Association — Fruits' (String)
==> 00000905: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 00000909: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 0000090d: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000911: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 45391>  # String: 'mito-frutta' (Identifier)
==> 00000916: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 150986>  # Object: {'t': '« Le complet, c’est toujours mieux » ?', 's': 'Souvent oui, mais ce n’est pas magique'}
==> 00000924: <NewObject>: <Reg8: 4>
==> 00000926: <LoadConstString>: <Reg8: 3, string_id: 26807>  # String: 'Le complet a plus de fibres que la version raffinée, donc il tend à monter un peu plus doucement. C’est un vrai avantage, mais ça ne transforme pas un glucide en « libre ».' (String)
==> 0000092a: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000092e: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00000932: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000936: <NewObject>: <Reg8: 4>
==> 00000938: <LoadConstString>: <Reg8: 5, string_id: 23207>  # String: 'Attention au marketing : « complet » sur un produit très transformé et sucré compte peu. Et la portion reste décisive : du pain complet en énorme quantité pèse quand même.' (String)
==> 0000093c: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000940: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000944: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195511>  # Object: {'cibo': 'Pain complet', 'testo': 'Le pain complet monte un peu plus doucement que le blanc grâce à la fibre : une amélioration, pas un laissez-passer.'}
==> 00000952: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000956: <NewObject>: <Reg8: 4>
==> 00000958: <LoadConstString>: <Reg8: 5, string_id: 23925>  # String: 'Complet = un peu plus de frein. Excellent, mais la quantité commande quand même.' (String)
==> 0000095c: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000960: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000964: <NewObject>: <Reg8: 4>
==> 00000966: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 0000096a: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 0000096e: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000972: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 42206>  # String: 'mito-integrale' (Identifier)
==> 00000977: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195516>  # Object: {'t': '« Sans sucre » = feu vert ?', 's': 'Pas vraiment : lis bien'}
==> 00000985: <NewObject>: <Reg8: 4>
==> 00000987: <LoadConstString>: <Reg8: 3, string_id: 30668>  # String: '« Sans sucres ajoutés » ne veut pas dire sans glucides : un produit peut avoir des amidons qui font monter la glycémie quand même. Et « light » veut souvent dire moins de graisses mais plus de sucre, ou l’inverse.' (String)
==> 0000098b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000098f: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000993: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000997: <NewObject>: <Reg8: 4>
==> 00000999: <LoadConstString>: <Reg8: 5, string_id: 26929>  # String: 'Le texte sur le devant sert à vendre ; la vérité est dans le tableau nutritionnel. Regarde les glucides totaux « dont sucres », pas seulement le mot sur le devant.' (String)
==> 0000099d: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000009a1: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000009a5: <NewObject>: <Reg8: 4>
==> 000009a7: <LoadConstString>: <Reg8: 5, string_id: 30665>  # String: '« Sans sucre » n’est pas un laissez-passer : retourne le produit et lis les vrais glucides.' (String)
==> 000009ab: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000009af: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000009b3: <NewObject>: <Reg8: 4>
==> 000009b5: <LoadConstString>: <Reg8: 5, string_id: 24680>  # String: 'EFSA — Allégations nutritionnelles et de santé' (String)
==> 000009b9: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 000009bd: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000009c1: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000009c5: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 51493>  # String: 'mito-zero' (Identifier)
==> 000009ca: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195521>  # Object: {'t': '« Les pâtes le soir font grossir » ?', 's': 'C’est le total qui compte, pas l’horloge'}
==> 000009d8: <NewObject>: <Reg8: 4>
==> 000009da: <LoadConstString>: <Reg8: 3, string_id: 23733>  # String: 'Ce n’est pas l’heure qui fait la différence, mais combien et comment. Une assiette de pâtes avec des légumes et un assaisonnement équilibré, en bonne portion, va très bien même le soir.' (String)
==> 000009de: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000009e2: <NewArray>: <Reg8: 3, UInt16: 5>
==> 000009e6: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000009ea: <NewObject>: <Reg8: 4>
==> 000009ec: <LoadConstString>: <Reg8: 7, string_id: 29690>  # String: 'Tout au plus, le soir on tend à manger plus et à bouger moins : alors la portion et une marche après comptent encore plus. Mais les pâtes « interdites le soir » sont un mythe.' (String)
==> 000009f0: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 000009f4: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000009f8: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 100369>  # Object: {'cibo': 'Pâtes cuites al dente', 'testo': 'Des pâtes al dente, avec des légumes avant et une marche après : le même dîner pèse bien moins.'}
==> 00000a06: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000a0a: <NewObject>: <Reg8: 4>
==> 00000a0c: <LoadConstString>: <Reg8: 7, string_id: 23735>  # String: 'Ce n’est pas l’horloge le problème : ce sont la quantité et ce que tu mets dans l’assiette.' (String)
==> 00000a10: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000a14: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000a18: <NewObject>: <Reg8: 4>
==> 00000a1a: <LoadConstString>: <Reg8: 7, string_id: 23076>  # String: 'American Diabetes Association — Mythes alimentaires' (String)
==> 00000a1e: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000a22: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000a26: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000a2a: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 49019>  # String: 'mito-pasta-sera' (Identifier)
==> 00000a2f: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195526>  # Object: {'t': 'Alcool et glycémie', 's': 'Une relation compliquée'}
==> 00000a3d: <NewObject>: <Reg8: 4>
==> 00000a3f: <LoadConstString>: <Reg8: 3, string_id: 27219>  # String: 'L’alcool est une relation compliquée : certaines boissons (bière, cocktails sucrés, vins liquoreux) apportent des glucides ; l’alcool lui-même est géré par le foie d’une façon qui peut influencer la glycémie de manière non linéaire.' (String)
==> 00000a43: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000a47: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000a4b: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000a4f: <NewObject>: <Reg8: 4>
==> 00000a51: <LoadConstString>: <Reg8: 7, string_id: 25009>  # String: 'En pratique : si tu bois, mieux avec modération et avec de la nourriture, jamais à jeun. Et attention aux cocktails sucrés, qui additionnent alcool et sucre.' (String)
==> 00000a55: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000a59: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000a5d: <NewObject>: <Reg8: 4>
==> 00000a5f: <LoadConstString>: <Reg8: 7, string_id: 23756>  # String: 'Ceci est de l’éducation, pas une indication médicale : pour ta situation précise, parles-en avec ton médecin.' (String)
==> 00000a63: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000a67: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000a6b: <NewObject>: <Reg8: 4>
==> 00000a6d: <LoadConstString>: <Reg8: 7, string_id: 22950>  # String: 'American Diabetes Association — Alcool' (String)
==> 00000a71: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000a75: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000a79: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000a7d: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 34725>  # String: 'alcol' (Identifier)
==> 00000a82: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195531>  # Object: {'t': 'Café et glycémie', 's': 'Noir peu, sucré beaucoup'}
==> 00000a90: <NewObject>: <Reg8: 4>
==> 00000a92: <LoadConstString>: <Reg8: 3, string_id: 26794>  # String: 'Le café noir, seul, a un impact quasi nul sur la glycémie. Le problème n’est pas le café : c’est ce que tu mets dedans — sucre, sirops, crème, biscuits — et le lait dans les versions sucrées.' (String)
==> 00000a96: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000a9a: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000a9e: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000aa2: <NewObject>: <Reg8: 4>
==> 00000aa4: <LoadConstString>: <Reg8: 7, string_id: 29801>  # String: 'Un cappuccino avec deux morceaux et un croissant est un repas riche en sucres rapides, pas « un café ». Le café en soi reste neutre.' (String)
==> 00000aa8: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000aac: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000ab0: <NewObject>: <Reg8: 4>
==> 00000ab2: <LoadConstString>: <Reg8: 7, string_id: 23732>  # String: 'Ce n’est pas le café le problème, mais le sucre et les douceurs qui l’accompagnent.' (String)
==> 00000ab6: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000aba: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000abe: <NewObject>: <Reg8: 4>
==> 00000ac0: <LoadConstString>: <Reg8: 7, string_id: 23020>  # String: 'American Diabetes Association — Caféine' (String)
==> 00000ac4: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000ac8: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000acc: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000ad0: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 38546>  # String: 'caffe' (Identifier)
==> 00000ad5: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195536>  # Object: {'t': 'Édulcorants : lesquels et comment', 's': 'Du sucré sans (ou presque) impact'}
==> 00000ae3: <NewObject>: <Reg8: 4>
==> 00000ae5: <LoadConstString>: <Reg8: 3, string_id: 27071>  # String: 'Les édulcorants (érythritol, stévia, aspartame…) donnent le sucré avec très peu ou zéro glucides : ils ne font pas monter la glycémie comme le sucre. C’est une façon de sucrer sans le pic.' (String)
==> 00000ae9: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000aed: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00000af1: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000af5: <NewObject>: <Reg8: 4>
==> 00000af7: <LoadConstString>: <Reg8: 7, string_id: 23210>  # String: 'Attention quand même au produit entier : un dessert « avec édulcorant » peut quand même avoir des farines et des graisses qui pèsent. L’édulcorant enlève le sucre, pas tout le reste.' (String)
==> 00000afb: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000aff: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000b03: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195541>  # Object: {'cibo': 'Érythritol', 'testo': 'L’érythritol sucre avec un impact négligeable sur la glycémie : utile à la place du sucre, mais le reste du dessert compte encore.'}
==> 00000b11: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000b15: <NewObject>: <Reg8: 4>
==> 00000b17: <LoadConstString>: <Reg8: 7, string_id: 27279>  # String: 'L’édulcorant aide à enlever le sucre, mais regarde toujours le produit entier.' (String)
==> 00000b1b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000b1f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000b23: <NewObject>: <Reg8: 4>
==> 00000b25: <LoadConstString>: <Reg8: 7, string_id: 24693>  # String: 'EFSA — Édulcorants (sécurité et usage)' (String)
==> 00000b29: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000b2d: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000b31: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000b35: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 39694>  # String: 'dolcificanti' (Identifier)
==> 00000b3a: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195546>  # Object: {'t': 'Sources et méthode', 's': 'D’où viennent les chiffres de cette app'}
==> 00000b48: <NewObject>: <Reg8: 4>
==> 00000b4a: <LoadConstString>: <Reg8: 3, string_id: 27069>  # String: 'Les valeurs de cette app ne sont pas inventées : elles viennent de sources scientifiques reconnues. Voici lesquelles, pour que tu puisses les vérifier toi-même.' (String)
==> 00000b4e: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000b52: <NewArray>: <Reg8: 3, UInt16: 10>
==> 00000b56: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000b5a: <NewObject>: <Reg8: 4>
==> 00000b5c: <LoadConstString>: <Reg8: 7, string_id: 26107>  # String: 'Index glycémique (IG) : des International Tables of Glycemic Index and Glycemic Load Values (Atkinson, Foster-Powell et Brand-Miller), la référence académique mondiale, tenue par l’équipe de recherche de l’Université de Sydney.' (String)
==> 00000b60: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000b64: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000b68: <NewObject>: <Reg8: 4>
==> 00000b6a: <LoadConstString>: <Reg8: 7, string_id: 23402>  # String: 'Base de données IG de l’Université de Sydney' (String)
==> 00000b6e: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000b72: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000b76: <NewObject>: <Reg8: 4>
==> 00000b78: <LoadConstString>: <Reg8: 7, string_id: 13332>  # String: 'International Tables 2021 (Am. J. Clinical Nutrition)' (String)
==> 00000b7c: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000b80: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000b84: <NewObject>: <Reg8: 4>
==> 00000b86: <LoadConstString>: <Reg8: 7, string_id: 25601>  # String: 'Glucides, protéines, graisses et fibres : des tables de composition des aliments du CREA (Centre de recherche Aliments et Nutrition, Italie) et de la base de données USDA FoodData Central (États-Unis).' (String)
==> 00000b8a: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000b8e: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000b92: <NewObject>: <Reg8: 4>
==> 00000b94: <LoadConstString>: <Reg8: 7, string_id: 23636>  # String: 'CREA · Tables de composition des aliments' (String)
==> 00000b98: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000b9c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 5>
==> 00000ba0: <NewObject>: <Reg8: 4>
==> 00000ba2: <LoadConstString>: <Reg8: 7, string_id: 7954>  # String: 'USDA FoodData Central' (String)
==> 00000ba6: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000baa: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 6>
==> 00000bae: <NewObject>: <Reg8: 4>
==> 00000bb0: <LoadConstString>: <Reg8: 8, string_id: 27199>  # String: 'L’IG d’un même aliment change avec la variété, la maturité et la cuisson : c’est pourquoi, là où il est très variable, on montre un intervalle et pas un seul chiffre.' (String)
==> 00000bb4: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 8, string_id: 243>  # String: 'testo' (Identifier)
==> 00000bb8: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 7>
==> 00000bbc: <NewObject>: <Reg8: 4>
==> 00000bbe: <LoadConstString>: <Reg8: 8, string_id: 23911>  # String: 'Comment on lit un plat : la Méthode [SOURCE_BRAND] regarde quatre choses ensemble : quantité de glucides, vitesse (IG), équilibre (fibres, protéines et graisses qui freinent la montée) et préparation (cuisson). Le verdict naît de la charge globale, pas de l’IG seul.' (String)
==> 00000bc2: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 8, string_id: 243>  # String: 'testo' (Identifier)
==> 00000bc6: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 8>
==> 00000bca: <NewObject>: <Reg8: 4>
==> 00000bcc: <LoadConstString>: <Reg8: 8, string_id: 26123>  # String: 'Information éducative, pas un dispositif médical ni un avis médical. Ne remplace pas l’avis du diabétologue ou du diététicien : les décisions sur le régime, l’insuline ou le traitement se prennent toujours avec eux.' (String)
==> 00000bd0: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 8, string_id: 243>  # String: 'testo' (Identifier)
==> 00000bd4: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 9>
==> 00000bd8: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000bdc: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 36490>  # String: 'fonti' (Identifier)
==> 00000be1: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195551>  # Object: {'t': 'D’où viennent les valeurs', 's': 'Pas inventées : elles ont une source'}
==> 00000bef: <NewObject>: <Reg8: 4>
==> 00000bf1: <LoadConstString>: <Reg8: 3, string_id: 26991>  # String: 'Les données nutritionnelles (calories, glucides, sucres, fibres) viennent de bases de données officielles comme l’USDA FoodData Central. L’index glycémique vient des tables internationales de la littérature.' (String)
==> 00000bf5: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000bf9: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000bfd: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000c01: <NewObject>: <Reg8: 4>
==> 00000c03: <LoadConstString>: <Reg8: 8, string_id: 29272>  # String: 'Sur chaque fiche tu vois l’état de la donnée : « vérifiée » (contrôlée à la main contre les tables) ou « estimation ». Une façon d’être honnête sur ce qui est contrôlé et ce qui est approximatif.' (String)
==> 00000c07: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 8, string_id: 243>  # String: 'testo' (Identifier)
==> 00000c0b: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000c0f: <NewObject>: <Reg8: 4>
==> 00000c11: <LoadConstString>: <Reg8: 8, string_id: 23249>  # String: 'Aucune valeur n’est inventée : chacune a une source, et on te dit à quel point elle est fiable.' (String)
==> 00000c15: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 8, string_id: 243>  # String: 'testo' (Identifier)
==> 00000c19: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000c1d: <NewObject>: <Reg8: 4>
==> 00000c1f: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000c23: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000c27: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000c2b: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 48579>  # String: 'fonti-valori' (Identifier)
==> 00000c30: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195556>  # Object: {'t': 'Pourquoi l’IG est « en niveaux »', 's': 'Un chiffre net tromperait'}
==> 00000c3e: <NewObject>: <Reg8: 4>
==> 00000c40: <LoadConstString>: <Reg8: 3, string_id: 26864>  # String: 'Le même aliment peut avoir un IG différent selon la variété, la maturité, la cuisson et même selon qui le mesure. C’est pourquoi on montre un niveau (minimum–moyen–maximum), pas un seul chiffre : ce serait une fausse précision.' (String)
==> 00000c44: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000c48: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000c4c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000c50: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195561>  # Object: {'cibo': 'Banane', 'testo': 'La banane verte a un IG autour de 30, mûre autour de 51. Même fruit, IG différent : voilà pourquoi un niveau est plus honnête qu’un chiffre.'}
==> 00000c5e: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000c62: <NewObject>: <Reg8: 4>
==> 00000c64: <LoadConstString>: <Reg8: 7, string_id: 26869>  # String: 'Le niveau n’est pas de l’imprécision : c’est de l’honnêteté. La réalité varie, et on te le dit.' (String)
==> 00000c68: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000c6c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000c70: <NewObject>: <Reg8: 4>
==> 00000c72: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 00000c76: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000c7a: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000c7e: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 32246>  # String: 'ig-fascia' (Identifier)
==> 00000c83: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195566>  # Object: {'t': 'Les limites de l’index glycémique', 's': 'Chacun répond un peu à sa façon'}
==> 00000c91: <NewObject>: <Reg8: 4>
==> 00000c93: <LoadConstString>: <Reg8: 3, string_id: 27201>  # String: 'L’IG est une moyenne mesurée sur des groupes de personnes : très utile comme boussole, mais la réponse réelle varie d’une personne à l’autre. Même aliment, deux corps, deux montées un peu différentes.' (String)
==> 00000c97: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000c9b: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000c9f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000ca3: <NewObject>: <Reg8: 4>
==> 00000ca5: <LoadConstString>: <Reg8: 7, string_id: 24411>  # String: 'Des études avec capteurs continus (MCG) ont montré combien il y a de variabilité individuelle. C’est pourquoi l’IG et la charge sont un guide pour mieux choisir, pas une loi mathématique sur ton corps.' (String)
==> 00000ca9: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000cad: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000cb1: <NewObject>: <Reg8: 4>
==> 00000cb3: <LoadConstString>: <Reg8: 7, string_id: 29985>  # String: 'Utilise l’IG comme boussole, pas comme oracle : ton corps a le dernier mot.' (String)
==> 00000cb7: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000cbb: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000cbf: <NewObject>: <Reg8: 4>
==> 00000cc1: <LoadConstString>: <Reg8: 7, string_id: 30315>  # String: 'Zeevi et al., Cell 2015 — réponse glycémique personnalisée' (String)
==> 00000cc5: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000cc9: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000ccd: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000cd1: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 39245>  # String: 'ig-limiti' (Identifier)
==> 00000cd6: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195571>  # Object: {'t': 'Études vs anecdotes', 's': 'Comment ne pas se faire avoir'}
==> 00000ce4: <NewObject>: <Reg8: 4>
==> 00000ce6: <LoadConstString>: <Reg8: 3, string_id: 30645>  # String: '« Chez moi ça marche » n’est pas une preuve : c’est une anecdote. Sur un seul cas, mille autres facteurs peuvent jouer. Une preuve sérieuse mesure beaucoup de personnes, compare à un groupe témoin et est publiée.' (String)
==> 00000cea: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000cee: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000cf2: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000cf6: <NewObject>: <Reg8: 4>
==> 00000cf8: <LoadConstString>: <Reg8: 7, string_id: 27503>  # String: 'Méfie-toi de ceux qui promettent des miracles ou « le secret qu’on ne te dit pas ». La vraie science est prudente, cite ses sources et admet ses propres limites.' (String)
==> 00000cfc: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000d00: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000d04: <NewObject>: <Reg8: 4>
==> 00000d06: <LoadConstString>: <Reg8: 7, string_id: 29934>  # String: 'Une anecdote est un indice, pas une preuve. Les choix importants méritent de vraies sources.' (String)
==> 00000d0a: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000d0e: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000d12: <NewObject>: <Reg8: 4>
==> 00000d14: <LoadConstString>: <Reg8: 7, string_id: 23113>  # String: 'American Diabetes Association — Éducation au diabète' (String)
==> 00000d18: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000d1c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000d20: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000d24: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 46040>  # String: 'studi-aneddoti' (Identifier)
==> 00000d29: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195576>  # Object: {'t': 'Pourquoi « éducatif, pas médical »', 's': 'On t’aide à comprendre, pas à te soigner'}
==> 00000d37: <NewObject>: <Reg8: 4>
==> 00000d39: <LoadConstString>: <Reg8: 3, string_id: 23779>  # String: 'Cette app explique comment la nourriture peut bouger la glycémie et l’énergie. Elle ne pose pas de diagnostic, ne prescrit pas de traitement, ne dit pas de doses : c’est le travail de ton médecin, qui connaît ta situation.' (String)
==> 00000d3d: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000d41: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000d45: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000d49: <NewObject>: <Reg8: 4>
==> 00000d4b: <LoadConstString>: <Reg8: 7, string_id: 26469>  # String: 'La capacité de comprendre ce que tu manges est utile à quiconque — avec ou sans diabète. Mais les décisions cliniques restent entre toi et ceux qui te soignent.' (String)
==> 00000d4f: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000d53: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000d57: <NewObject>: <Reg8: 4>
==> 00000d59: <LoadConstString>: <Reg8: 7, string_id: 25014>  # String: 'En savoir plus te rend plus conscient, ça ne te remplace pas le médecin. Ce sont deux choses différentes, et justes toutes les deux.' (String)
==> 00000d5d: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000d61: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000d65: <NewObject>: <Reg8: 4>
==> 00000d67: <LoadConstString>: <Reg8: 7, string_id: 6148>  # String: 'American Diabetes Association' (String)
==> 00000d6b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000d6f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000d73: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000d77: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 47908>  # String: 'non-medico' (Identifier)
==> 00000d7c: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195581>  # Object: {'t': 'Les recommandations', 's': 'À qui on fait confiance'}
==> 00000d8a: <NewObject>: <Reg8: 4>
==> 00000d8c: <LoadConstString>: <Reg8: 3, string_id: 27911>  # String: 'On se base sur des sources reconnues : l’American Diabetes Association (ADA), l’association européenne (EASD), l’Organisation mondiale de la santé (OMS), les tables IG de l’Université de Sydney, les données USDA.' (String)
==> 00000d90: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000d94: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000d98: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000d9c: <NewObject>: <Reg8: 4>
==> 00000d9e: <LoadConstString>: <Reg8: 7, string_id: 28599>  # String: 'Quand ces sources mettent à jour leurs recommandations, on se met à jour aussi. On ne suit pas les modes : on suit les preuves les plus solides disponibles.' (String)
==> 00000da2: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000da6: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000daa: <NewObject>: <Reg8: 4>
==> 00000dac: <LoadConstString>: <Reg8: 7, string_id: 27910>  # String: 'On n’invente pas les règles : on les prend chez ceux qui font vraiment de la recherche.' (String)
==> 00000db0: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000db4: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000db8: <NewObject>: <Reg8: 4>
==> 00000dba: <LoadConstString>: <Reg8: 7, string_id: 22737>  # String: 'ADA · EASD · OMS (recommandations officielles)' (String)
==> 00000dbe: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000dc2: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000dc6: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000dca: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 43923>  # String: 'linee-guida' (Identifier)
==> 00000dcf: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195586>  # Object: {'t': 'Comment on garde les données propres', 's': 'Des règles et des contrôles, pas des opinions'}
==> 00000ddd: <NewObject>: <Reg8: 4>
==> 00000ddf: <LoadConstString>: <Reg8: 3, string_id: 26806>  # String: 'Le classement d’un aliment (faible/moyen/élevé) n’est pas décidé par une opinion au cas par cas, mais par des règles identiques pour tous : par exemple un sucre presque pur est toujours traité comme impact élevé.' (String)
==> 00000de3: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000de7: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000deb: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000def: <NewObject>: <Reg8: 4>
==> 00000df1: <LoadConstString>: <Reg8: 7, string_id: 25187>  # String: 'Et chaque fois qu’on ajoute ou change une donnée, des contrôles automatiques vérifient que tout est cohérent (les chiffres, les niveaux, l’ordre de l’IG). Si quelque chose ne va pas, ça se bloque avant d’arriver à toi.' (String)
==> 00000df5: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000df9: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000dfd: <NewObject>: <Reg8: 4>
==> 00000dff: <LoadConstString>: <Reg8: 7, string_id: 24409>  # String: 'Des règles claires + des contrôles automatiques = moins d’erreurs humaines. C’est ainsi qu’on garde une fiabilité élevée.' (String)
==> 00000e03: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000e07: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000e0b: <NewObject>: <Reg8: 4>
==> 00000e0d: <LoadConstString>: <Reg8: 7, string_id: 29771>  # String: 'USDA FoodData Central · Université de Sydney (IG)' (String)
==> 00000e11: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000e15: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000e19: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000e1d: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 43516>  # String: 'dati-aggiornati' (Identifier)
==> 00000e22: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195591>  # Object: {'t': 'Manger pour ton objectif', 's': 'Maigrir, maintenir ou prendre de la masse'}
==> 00000e30: <NewObject>: <Reg8: 4>
==> 00000e32: <LoadConstString>: <Reg8: 3, string_id: 26865>  # String: 'Le même aliment peut servir des objectifs différents. Voici comment t’orienter, avec la glycémie toujours comme boussole.' (String)
==> 00000e36: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000e3a: <NewArray>: <Reg8: 3, UInt16: 6>
==> 00000e3e: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000e42: <NewObject>: <Reg8: 4>
==> 00000e44: <LoadConstString>: <Reg8: 7, string_id: 27317>  # String: 'Maigrir : donne au corps un peu moins d’énergie qu’il n’en consomme, avec constance. Choisis des aliments qui rassasient avec peu de calories et garde la charge glycémique basse, pour éviter les pics qui te redonnent faim peu après.' (String)
==> 00000e48: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000e4c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000e50: <NewObject>: <Reg8: 4>
==> 00000e52: <NewArrayWithBuffer>: <Reg8: 7, UInt16: 2, UInt16: 2, UInt16: 12944>  # Array: ['Amis : légumes à volonté, protéines maigres, yaourt grec, fruits à IG bas, complets mesurés.', 'À limiter : fritures, sucreries et boissons sucrées, pain et pâtes raffinés en grandes portions.']
==> 00000e5a: <PutNewOwnById>: <Reg8: 4, Reg8: 7, string_id: 34177>  # String: 'voci' (Identifier)
==> 00000e5f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000e63: <NewObject>: <Reg8: 4>
==> 00000e65: <LoadConstString>: <Reg8: 7, string_id: 27318>  # String: 'Maintenir : mange à peu près autant d’énergie que tu en consommes, avec équilibre. Des assiettes variées, des légumes toujours, une source de protéines à chaque repas et des glucides surtout complets.' (String)
==> 00000e69: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000e6d: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000e71: <NewObject>: <Reg8: 4>
==> 00000e73: <LoadConstString>: <Reg8: 7, string_id: 28391>  # String: 'Prendre de la masse : donne un peu plus d’énergie que tu n’en consommes, avec assez de protéines réparties sur les repas. La nourriture donne les briques, la musculation les met à la bonne place. Choisis des sources de qualité : une charge élevée et continue n’aide pas.' (String)
==> 00000e77: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000e7b: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000e7f: <NewObject>: <Reg8: 4>
==> 00000e81: <LoadConstString>: <Reg8: 7, string_id: 23987>  # String: 'Conseils éducatifs, pas des indications médicales. Ton objectif se choisit dans la section Progrès, et le rapport hebdomadaire te donne des conseils sur mesure.' (String)
==> 00000e85: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000e89: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 5>
==> 00000e8d: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000e91: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 35248>  # String: 'obiettivi' (Identifier)
==> 00000e96: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195596>  # Object: {'t': 'La sensibilité à l’insuline', 's': 'Peut-être le plus important de tout'}
==> 00000ea4: <NewObject>: <Reg8: 4>
==> 00000ea6: <LoadConstString>: <Reg8: 3, string_id: 26691>  # String: 'Pour un diabétique c’est peut-être le plus important de tout. La sensibilité à l’insuline, c’est combien tes cellules « écoutent » l’insuline : plus tu es sensible, moins il faut d’insuline pour faire entrer le sucre dans les cellules. Plus de sensibilité veut dire des glycémies plus stables et moins de hauts et de bas.' (String)
==> 00000eaa: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000eae: <NewArray>: <Reg8: 3, UInt16: 6>
==> 00000eb2: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000eb6: <NewObject>: <Reg8: 4>
==> 00000eb8: <LoadConstString>: <Reg8: 7, string_id: 26861>  # String: 'Le muscle est l’éponge du sucre : les muscles sont l’endroit où finit la majeure partie du glucose. Plus tu as de muscle et plus tu l’utilises, plus ils absorbent de sucre du sang, même sans beaucoup d’insuline. Un corps entraîné gère la même assiette avec moins d’effort.' (String)
==> 00000ebc: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000ec0: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000ec4: <NewObject>: <Reg8: 4>
==> 00000ec6: <LoadConstString>: <Reg8: 7, string_id: 23552>  # String: 'Bouger après les repas abaisse le pic : les muscles en activité brûlent le glucose qui vient d’arriver. C’est l’un des outils les plus simples et puissants que tu aies.' (String)
==> 00000eca: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000ece: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000ed2: <NewObject>: <Reg8: 4>
==> 00000ed4: <LoadConstString>: <Reg8: 7, string_id: 26541>  # String: 'La force change les règles dans le temps : construire du muscle augmente la sensibilité pendant des heures et des jours après. Un investissement qui rapporte toujours. Et la constance bat l’intensité : pas besoin d’être un athlète.' (String)
==> 00000ed8: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000edc: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000ee0: <NewObject>: <Reg8: 4>
==> 00000ee2: <NewArrayWithBuffer>: <Reg8: 7, UInt16: 4, UInt16: 4, UInt16: 1536>  # Array: ['Marche 10-15 minutes après les repas principaux.', 'Fais de la musculation 2-3 fois par semaine.', 'Bouge chaque jour, même juste un peu.', 'Sois constant : les bénéfices s’accumulent avec le temps.']
==> 00000eea: <PutNewOwnById>: <Reg8: 4, Reg8: 7, string_id: 34177>  # String: 'voci' (Identifier)
==> 00000eef: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000ef3: <NewObject>: <Reg8: 4>
==> 00000ef5: <LoadConstString>: <Reg8: 7, string_id: 27208>  # String: 'L’activité physique change ta réponse à l’insuline. Ce sont des conseils éducatifs, pas des indications médicales : pour les ajustements, parle avec ton médecin.' (String)
==> 00000ef9: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000efd: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 5>
==> 00000f01: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000f05: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 39813>  # String: 'sensibilita' (Identifier)
==> 00000f0a: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195601>  # Object: {'t': 'Maturité et conservation', 's': 'Le même aliment change avec le temps'}
==> 00000f18: <NewObject>: <Reg8: 4>
==> 00000f1a: <LoadConstString>: <Reg8: 3, string_id: 28261>  # String: 'Plus un fruit mûrit, plus ses amidons deviennent des sucres simples : il monte plus vite. Une banane verte est plus « lente » qu’une très mûre. Même le pain rassis ou refroidi peut monter un peu moins que chaud.' (String)
==> 00000f1e: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000f22: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000f26: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000f2a: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195606>  # Object: {'cibo': 'Banane', 'testo': 'La banane verte a un IG plus bas que la mûre : même fruit, vitesses différentes selon la maturité.'}
==> 00000f38: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000f3c: <NewObject>: <Reg8: 4>
==> 00000f3e: <LoadConstString>: <Reg8: 7, string_id: 26721>  # String: 'La valeur d’un aliment n’est pas fixe : elle change avec la maturité et la conservation. C’est normal, et le niveau en tient compte.' (String)
==> 00000f42: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000f46: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000f4a: <NewObject>: <Reg8: 4>
==> 00000f4c: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 00000f50: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000f54: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000f58: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 36720>  # String: 'maturazione' (Identifier)
==> 00000f5d: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195611>  # Object: {'t': 'L’assiette équilibrée', 's': 'Un modèle simple à retenir'}
==> 00000f6b: <NewObject>: <Reg8: 4>
==> 00000f6d: <LoadConstString>: <Reg8: 3, string_id: 29943>  # String: 'Une façon facile de construire un repas avec des freins : la moitié de l’assiette de légumes, un quart de protéines (viande, poisson, œufs, légumineuses), un quart de glucides (pâtes, riz, pain, pommes de terre).' (String)
==> 00000f71: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000f75: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00000f79: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000f7d: <NewObject>: <Reg8: 4>
==> 00000f7f: <LoadConstString>: <Reg8: 6, string_id: 22857>  # String: 'Ainsi la fibre des légumes et les protéines ralentissent l’absorption des glucides, et la montée devient douce. Ce n’est pas une règle rigide : c’est une boussole pour l’œil.' (String)
==> 00000f83: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 00000f87: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000f8b: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195616>  # Object: {'cibo': 'Lentilles cuites', 'testo': 'Les légumineuses sont glucide ET protéine à la fois : une excellente « brique » de l’assiette équilibrée.'}
==> 00000f99: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000f9d: <NewObject>: <Reg8: 4>
==> 00000f9f: <LoadConstString>: <Reg8: 6, string_id: 27428>  # String: 'Moitié légumes, un quart protéines, un quart glucides : une telle assiette a les freins déjà dedans.' (String)
==> 00000fa3: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 00000fa7: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000fab: <NewObject>: <Reg8: 4>
==> 00000fad: <LoadConstString>: <Reg8: 6, string_id: 23077>  # String: 'American Diabetes Association — Méthode de l’assiette' (String)
==> 00000fb1: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 00000fb5: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000fb9: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000fbd: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 34138>  # String: 'piatto-bilanciato' (Identifier)
==> 00000fc2: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195621>  # Object: {'t': 'Le dîner : les charges du soir', 's': 'Ce n’est pas l’heure, c’est le total'}
==> 00000fd0: <NewObject>: <Reg8: 4>
==> 00000fd2: <LoadConstString>: <Reg8: 3, string_id: 26920>  # String: 'Le soir on tend à manger plus et à bouger moins. Pas besoin de sauter les glucides : il faut une portion raisonnable, des légumes dans l’assiette et peut-être une marche après.' (String)
==> 00000fd6: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000fda: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00000fde: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000fe2: <NewObject>: <Reg8: 4>
==> 00000fe4: <LoadConstString>: <Reg8: 6, string_id: 29822>  # String: 'Un dîner trop chargé et sur un estomac déjà plein de sucreries pèse ; un dîner équilibré, même avec des pâtes, va très bien. C’est le total de la journée qui compte, pas l’horloge.' (String)
==> 00000fe8: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 00000fec: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000ff0: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195626>  # Object: {'cibo': 'Pâtes cuites al dente', 'testo': 'Des pâtes al dente, des légumes avant, une bonne portion et deux pas après : un dîner tranquille.'}
==> 00000ffe: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00001002: <NewObject>: <Reg8: 4>
==> 00001004: <LoadConstString>: <Reg8: 6, string_id: 27556>  # String: 'Ne diabolise pas le dîner : équilibre-le. C’est le total de la journée qui compte.' (String)
==> 00001008: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 0000100c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00001010: <NewObject>: <Reg8: 4>
==> 00001012: <LoadConstString>: <Reg8: 6, string_id: 23086>  # String: 'American Diabetes Association — Planifier les repas' (String)
==> 00001016: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 0000101a: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 0000101e: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00001022: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 35100>  # String: 'cena' (Identifier)
==> 00001027: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 184003>  # Object: {'t': 'Apprendre de ton journal', 's': 'Tes schémas, tu te les dis tout seul'}
==> 00001035: <NewObject>: <Reg8: 4>
==> 00001037: <LoadConstString>: <Reg8: 3, string_id: 27816>  # String: 'Noter ce que tu manges, même juste quelques jours, fait ressortir des schémas que de mémoire tu ne vois pas : quels repas te laissent de l’énergie et lesquels te font t’effondrer en milieu de journée.' (String)
==> 0000103b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000103f: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00001043: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00001047: <NewObject>: <Reg8: 4>
==> 00001049: <LoadConstString>: <Reg8: 6, string_id: 28044>  # String: 'Pas besoin de perfection : il faut de la constance. Quelques notes honnêtes valent plus qu’un journal parfait tenu un seul jour. Avec le temps tu comprends ce qui marche pour TOI.' (String)
==> 0000104d: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 00001051: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00001055: <NewObject>: <Reg8: 4>
==> 00001057: <LoadConstString>: <Reg8: 6, string_id: 26856>  # String: 'Le meilleur maître, c’est toi : tes schémas, écrits, t’apprennent plus que n’importe quelle règle générale.' (String)
==> 0000105b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 0000105f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00001063: <NewObject>: <Reg8: 4>
==> 00001065: <LoadConstString>: <Reg8: 6, string_id: 23110>  # String: 'American Diabetes Association — Tenir un journal alimentaire' (String)
==> 00001069: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 0000106d: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00001071: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00001075: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 43945>  # String: 'diario-schemi' (Identifier)
==> 0000107a: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195631>  # Object: {'t': 'Préparer à l’avance', 's': 'La hâte est l’ennemie des bons choix'}
==> 00001088: <NewObject>: <Reg8: 4>
==> 0000108a: <LoadConstString>: <Reg8: 3, string_id: 28602>  # String: 'Quand tu as faim et que tu es pressé, tu choisis l’aliment le plus rapide, qui est souvent aussi le plus « rapide » pour la glycémie. Avoir quelque chose de déjà prêt et équilibré renverse la situation.' (String)
==> 0000108e: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00001092: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00001096: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 0000109a: <NewObject>: <Reg8: 4>
==> 0000109c: <LoadConstString>: <Reg8: 6, string_id: 24130>  # String: 'Cuis des légumineuses ou des céréales à l’avance, garde des légumes lavés et des fruits à coque à portée : de petites réserves suffisent à rendre le bon choix facile même à la course.' (String)
==> 000010a0: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 000010a4: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000010a8: <NewObject>: <Reg8: 4>
==> 000010aa: <LoadConstString>: <Reg8: 6, string_id: 26791>  # String: 'Le bon choix se prépare avant : s’il est prêt, la hâte ne te piège pas.' (String)
==> 000010ae: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 000010b2: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000010b6: <NewObject>: <Reg8: 4>
==> 000010b8: <LoadConstString>: <Reg8: 6, string_id: 23091>  # String: 'American Diabetes Association — Préparation des repas' (String)
==> 000010bc: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 000010c0: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000010c4: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000010c8: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 42253>  # String: 'meal-prep' (Identifier)
==> 000010cd: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195636>  # Object: {'t': 'Aliments « light » et marketing', 's': 'Le grand texte, la petite vérité'}
==> 000010db: <NewObject>: <Reg8: 4>
==> 000010dd: <LoadConstString>: <Reg8: 3, string_id: 30657>  # String: '« Light », « fit », « protéiné », « sans » : ce sont des mots qui vendent, pas des garanties. Un produit « allégé en graisses » peut avoir plus de sucre ; un « protéiné » peut quand même être riche en glucides.' (String)
==> 000010e1: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000010e5: <NewArray>: <Reg8: 3, UInt16: 4>
==> 000010e9: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000010ed: <NewObject>: <Reg8: 4>
==> 000010ef: <LoadConstString>: <Reg8: 6, string_id: 26696>  # String: 'La seule façon de savoir, c’est de retourner le produit et de lire le tableau : glucides, dont sucres, fibres, et la portion réelle. Le grand texte, c’est de la pub.' (String)
==> 000010f3: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 000010f7: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000010fb: <NewObject>: <Reg8: 4>
==> 000010fd: <LoadConstString>: <Reg8: 6, string_id: 27563>  # String: 'Ne te fie pas au mot sur le devant : la vérité est dans le tableau au dos.' (String)
==> 00001101: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 00001105: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00001109: <NewObject>: <Reg8: 4>
==> 0000110b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 0000110f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00001113: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00001117: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 37120>  # String: 'mito-light' (Identifier)
==> 0000111c: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195641>  # Object: {'t': '« Les graisses font monter la glycémie » ?', 's': 'Seules presque pas, mais elles changent le rythme'}
==> 0000112a: <NewObject>: <Reg8: 4>
==> 0000112c: <LoadConstString>: <Reg8: 3, string_id: 26579>  # String: 'La graisse seule fait très peu monter la glycémie : ce n’est pas du sucre. Au contraire, avec les glucides elle les ralentit, abaissant le pic immédiat — c’est l’un des « freins ».' (String)
==> 00001130: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00001134: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00001138: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 0000113c: <NewObject>: <Reg8: 4>
==> 0000113e: <LoadConstString>: <Reg8: 5, string_id: 26709>  # String: 'La surprise : beaucoup de graisse avec beaucoup de glucides (sucreries grasses, fritures, pizza) prolonge la montée dans le temps — la « seconde vague ». Elle freine le pic, mais allonge la traîne.' (String)
==> 00001142: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00001146: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000114a: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195646>  # Object: {'cibo': 'Noix', 'testo': 'Les noix sont presque que de bonnes graisses : seules elles ont un impact négligeable et à côté d’un glucide elles le ralentissent.'}
==> 00001158: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 0000115c: <NewObject>: <Reg8: 4>
==> 0000115e: <LoadConstString>: <Reg8: 5, string_id: 26575>  # String: 'La graisse n’est pas du sucre : seule elle pèse peu, mais avec beaucoup de glucides elle allonge la montée.' (String)
==> 00001162: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00001166: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000116a: <NewObject>: <Reg8: 4>
==> 0000116c: <LoadConstString>: <Reg8: 5, string_id: 30238>  # String: 'Wolpert et al., Diabetes Care 2013 — graisse et glycémie' (String)
==> 00001170: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 00001174: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00001178: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000117c: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 41465>  # String: 'mito-grassi' (Identifier)
==> 00001181: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195651>  # Object: {'t': 'Stress, sommeil et glycémie', 's': 'Ce n’est pas seulement l’assiette'}
==> 0000118f: <NewObject>: <Reg8: 4>
==> 00001191: <LoadConstString>: <Reg8: 3, string_id: 26573>  # String: 'La glycémie ne répond pas qu’à la nourriture. Le stress et le manque de sommeil peuvent l’influencer : le corps, sous pression ou fatigué, gère le sucre différemment. Ce n’est pas ta faute, c’est de la physiologie.' (String)
==> 00001195: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00001199: <NewArray>: <Reg8: 3, UInt16: 4>
==> 0000119d: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000011a1: <NewObject>: <Reg8: 4>
==> 000011a3: <LoadConstString>: <Reg8: 5, string_id: 24243>  # String: 'C’est pourquoi le même repas « se comporte » parfois différemment selon les jours. Le repos et la gestion du stress ne sont pas un luxe : ils font partie du tableau.' (String)
==> 000011a7: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000011ab: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000011af: <NewObject>: <Reg8: 4>
==> 000011b1: <LoadConstString>: <Reg8: 5, string_id: 29071>  # String: 'Si un jour « ça ne colle pas », ce n’est pas forcément la nourriture : sommeil et stress comptent. Ce sont des notes éducatives, pas médicales.' (String)
==> 000011b5: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000011b9: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000011bd: <NewObject>: <Reg8: 4>
==> 000011bf: <LoadConstString>: <Reg8: 5, string_id: 23104>  # String: 'American Diabetes Association — Stress et sommeil' (String)
==> 000011c3: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 000011c7: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000011cb: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000011cf: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 49064>  # String: 'stress-sonno' (Identifier)
==> 000011d4: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195656>  # Object: {'t': 'Qu’est-ce qu’une source fiable', 's': 'Comment la reconnaître en 3 étapes'}
==> 000011e2: <NewObject>: <Reg8: 4>
==> 000011e4: <LoadConstString>: <Reg8: 3, string_id: 29961>  # String: 'Une source fiable : 1) est publiée et vérifiable (un organisme, une revue scientifique, pas un post anonyme) ; 2) cite d’autres études ; 3) admet ses propres limites au lieu de promettre des certitudes absolues.' (String)
==> 000011e8: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000011ec: <NewArray>: <Reg8: 3, UInt16: 4>
==> 000011f0: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000011f4: <NewObject>: <Reg8: 4>
==> 000011f6: <LoadConstString>: <Reg8: 5, string_id: 27504>  # String: 'Méfie-toi du contraire : aucune source, un ton de « secret révélé », des promesses miraculeuses, et aucun moyen de vérifier d’où vient l’information.' (String)
==> 000011fa: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000011fe: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00001202: <NewObject>: <Reg8: 4>
==> 00001204: <LoadConstString>: <Reg8: 5, string_id: 24336>  # String: 'Demande-toi toujours : qui le dit, sur quoi ça se base, et puis-je le vérifier ? Si tu ne trouves pas de réponse, suspends ton jugement.' (String)
==> 00001208: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000120c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00001210: <NewObject>: <Reg8: 4>
==> 00001212: <LoadConstString>: <Reg8: 5, string_id: 27878>  # String: 'OMS — Information sanitaire fiable' (String)
==> 00001216: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 0000121a: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000121e: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00001222: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 54177>  # String: 'fonte-affidabile' (Identifier)
==> 00001227: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195661>  # Object: {'t': 'Questions fréquentes', 's': 'Les réponses courtes, avec les bases'}
==> 00001235: <NewObject>: <Reg8: 4>
==> 00001237: <LoadConstString>: <Reg8: 3, string_id: 30647>  # String: '« Dois-je éliminer les glucides ? » Non : c’est de l’énergie. Tu apprends LESQUELS et COMBIEN. « Le fruit est interdit ? » Non, mieux entier qu’en jus. « Jamais de dessert ? » Non : après un repas et en portion mesurée.' (String)
==> 0000123b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000123f: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00001243: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00001247: <NewObject>: <Reg8: 4>
==> 00001249: <LoadConstString>: <Reg8: 5, string_id: 30658>  # String: '« L’app me soigne ? » Non : elle est éducative, pas médicale. « Les valeurs sont fiables ? » Elles ont une source et un état (vérifiée/estimation), et des contrôles automatiques gardent les données cohérentes.' (String)
==> 0000124d: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00001251: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00001255: <NewObject>: <Reg8: 4>
==> 00001257: <LoadConstString>: <Reg8: 5, string_id: 26676>  # String: 'La règle qui résume tout : aucun aliment n’est interdit en absolu, c’est presque toujours une question de lesquels, combien et comment.' (String)
==> 0000125b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000125f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00001263: <NewObject>: <Reg8: 4>
==> 00001265: <LoadConstString>: <Reg8: 5, string_id: 23094>  # String: 'American Diabetes Association — Questions fréquentes' (String)
==> 00001269: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 0000126d: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00001271: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00001275: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 47721>  # String: 'faq' (Identifier)
==> 0000127a: <StoreToEnvironment>: <Reg8: 1, UInt8: 0, Reg8: 0>
==> 0000127e: <LoadConstUndefined>: <Reg8: 0>
==> 00001280: <Ret>: <Reg8: 0>


===============

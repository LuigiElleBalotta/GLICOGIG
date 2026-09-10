
==== Falling back to Disassembly ====
=> [Function #19716 "" of 4722 bytes]: 8 params, frame size=19, strict=1, exc handler=0, debug info=0  @ offset 0x00500c55

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
==> 00000036: <CreateClosure>: <Reg8: 0, Reg8: 1, function_id: 19717>  # Function: [#19717 get of 9 bytes]: 1 params @ offset 0x002e8262
==> 0000003b: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 0, string_id: 133>  # String: 'get' (Identifier)
==> 0000003f: <LoadConstString>: <Reg8: 0, string_id: 38704>  # String: 'LEARN_DE' (Identifier)
==> 00000043: <Call4>: <Reg8: 0, Reg8: 3, Reg8: 4, Reg8: 5, Reg8: 0, Reg8: 2>
==> 0000004a: <NewObject>: <Reg8: 0>
==> 0000004c: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194911>  # Object: {'t': 'Was ist Blutzucker', 's': 'Nicht nur eine Sache für Diabetiker'}
==> 0000005a: <NewObject>: <Reg8: 4>
==> 0000005c: <LoadConstString>: <Reg8: 3, string_id: 23526>  # String: 'Blutzucker ist einfach die Menge Zucker (Glukose) im Blut. Wir alle haben ihn, immer: Er ist der Treibstoff, der Körper und Gehirn Energie gibt.' (String)
==> 00000060: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000064: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000068: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 0000006c: <NewObject>: <Reg8: 4>
==> 0000006e: <LoadConstString>: <Reg8: 5, string_id: 30199>  # String: 'Wenn du isst, steigt der Blutzucker; dann kommt er wieder herunter. Steigt er langsam und fällt langsam, hast du gleichmäßige Energie. Schießt er hoch und stürzt dann ab, kommen Müdigkeit und Hunger kurz nach dem Essen.' (String)
==> 00000072: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000076: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000007a: <NewObject>: <Reg8: 4>
==> 0000007c: <LoadConstString>: <Reg8: 5, string_id: 24532>  # String: 'Diese App spricht nicht von Krankheiten oder Therapien. Sie spricht davon, wie Essen deine Energie bewegt: etwas Nützliches für jeden, der besser essen will.' (String)
==> 00000080: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000084: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000088: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 194916>  # Object: {'cibo': 'Weißbrot', 'testo': 'Eine Scheibe Weißbrot hebt den Blutzucker schnell. Sie ist nicht „verboten“: Es ist nur eine Information, um zu wählen, wann und womit du sie isst.'}
==> 00000096: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000009a: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000009e: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 32974>  # String: 'glicemia' (Identifier)
==> 000000a3: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194921>  # Object: {'t': 'Glykämischer Index: die Geschwindigkeit', 's': 'Wie schnell ein Lebensmittel den Blutzucker hebt'}
==> 000000b1: <NewObject>: <Reg8: 4>
==> 000000b3: <LoadConstString>: <Reg8: 3, string_id: 24386>  # String: 'Der glykämische Index (GI) misst, wie SCHNELL ein Lebensmittel den Blutzucker hebt, auf einer Skala von 0 bis 100. Hoch heißt schnell, niedrig heißt langsam.' (String)
==> 000000b7: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000000bb: <NewArray>: <Reg8: 3, UInt16: 4>
==> 000000bf: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000000c3: <NewObject>: <Reg8: 4>
==> 000000c5: <LoadConstString>: <Reg8: 5, string_id: 22981>  # String: 'Allein reicht er aber nicht, denn er sagt nicht, WIE VIEL du isst. Ein hoher GI in einer kleinen Portion zählt wenig.' (String)
==> 000000c9: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000000cd: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000000d1: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 178095>  # Object: {'cibo': 'Banane', 'testo': 'Die Banane ändert ihren GI mit der Reife: grün um die 30, reif um die 51. Dieselbe Frucht, zwei verschiedene Geschwindigkeiten.'}
==> 000000df: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000000e3: <NewObject>: <Reg8: 4>
==> 000000e5: <LoadConstString>: <Reg8: 5, string_id: 24357>  # String: 'Der GI ist das Foto der Geschwindigkeit, nicht der Menge. Für die echte Wirkung braucht es die glykämische Last, das nächste Kapitel.' (String)
==> 000000e9: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000000ed: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000000f1: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000000f5: <PutNewOwnByIdShort>: <Reg8: 0, Reg8: 2, string_id: 31>  # String: 'ig' (Identifier)
==> 000000f9: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 183519>  # Object: {'t': 'Glykämische Last: die echte Wirkung', 's': 'Die nützlichste Zahl von allen'}
==> 00000107: <NewObject>: <Reg8: 4>
==> 00000109: <LoadConstString>: <Reg8: 3, string_id: 24510>  # String: 'Die glykämische Last (GL) verbindet zwei Dinge: die Geschwindigkeit (den GI) und wie viele Kohlenhydrate wirklich in der Portion stecken. Es ist die nützlichste Zahl, um ein Gericht zu verstehen.' (String)
==> 0000010d: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000111: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00000115: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000119: <NewObject>: <Reg8: 4>
==> 0000011b: <LoadConstString>: <Reg8: 5, string_id: 10029>  # String: 'Die Stufen pro Portion sind: niedrig bis 10, mittel von 11 bis 19, hoch ab 20. In der App siehst du sie als Balken mit einer Anzeige.' (String)
==> 0000011f: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000123: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000127: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 194926>  # Object: {'cibo': 'Wassermelone', 'testo': 'Die Wassermelone hat einen hohen GI (~76) und wirkt auf den ersten Blick wie ein Problem. Aber sie ist fast nur Wasser: Eine Portion hat wenig Kohlenhydrate, daher bleibt ihre Last niedrig. Deshalb zählt die Portion, nicht nur der GI.'}
==> 00000135: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000139: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 194931>  # Object: {'cibo': 'Weißbrot', 'testo': 'Weißbrot dagegen hat einen hohen GI UND eine hohe Last: Hier ist die Wirkung real.'}
==> 00000147: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000014b: <NewObject>: <Reg8: 4>
==> 0000014d: <LoadConstString>: <Reg8: 5, string_id: 25617>  # String: 'Goldene Regel: Wenn du ein Lebensmittel in der App ansiehst, schau auf die Last (den Balken), nicht nur auf den glykämischen Index.' (String)
==> 00000151: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000155: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000159: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000015d: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 32303>  # String: 'cg' (Identifier)
==> 00000162: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194936>  # Object: {'t': 'Ballaststoffe, Fett und Eiweiß: die Bremsen', 's': 'Warum ein vollständiges Gericht besser ist'}
==> 00000170: <NewObject>: <Reg8: 4>
==> 00000172: <LoadConstString>: <Reg8: 3, string_id: 23066>  # String: 'Kohlenhydrate allein steigen schnell. Aber wenn im Gericht auch Ballaststoffe, Fett und Eiweiß sind, verlangsamt sich der Anstieg: Sie sind die natürlichen Bremsen des Blutzuckers.' (String)
==> 00000176: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000017a: <NewArray>: <Reg8: 3, UInt16: 4>
==> 0000017e: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000182: <NewObject>: <Reg8: 4>
==> 00000184: <NewArrayWithBuffer>: <Reg8: 5, UInt16: 3, UInt16: 3, UInt16: 51583>  # Array: ['Ballaststoffe (Gemüse, Hülsenfrüchte, Vollkorn): bremsen den Anstieg und sättigen.', 'Eiweiß (Eier, Fisch, Fleisch, Hülsenfrüchte): verlängert die Verdauung.', 'Gute Fette (Olivenöl, Nüsse): verlangsamen die Magenentleerung.']
==> 0000018c: <PutNewOwnById>: <Reg8: 4, Reg8: 5, string_id: 34177>  # String: 'voci' (Identifier)
==> 00000191: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000195: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 194941>  # Object: {'cibo': 'Linsen gekocht', 'testo': 'Linsen vereinen Ballaststoffe und Eiweiß: niedrige Last und langsamer, langer Anstieg. Ein Kohlenhydrat, das die Energie ganz allmählich abgibt.'}
==> 000001a3: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000001a7: <NewObject>: <Reg8: 4>
==> 000001a9: <LoadConstString>: <Reg8: 5, string_id: 25284>  # String: 'Fazit: Ein vollständiges Gericht schlägt fast immer ein Kohlenhydrat allein. Nicht weglassen, hinzufügen.' (String)
==> 000001ad: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000001b1: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000001b5: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000001b9: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 35354>  # String: 'freni' (Identifier)
==> 000001be: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 150477>  # Object: {'t': 'Kohlenhydrate: welche und wie viele', 's': 'Sie bewegen den Blutzucker am stärksten'}
==> 000001cc: <NewObject>: <Reg8: 4>
==> 000001ce: <LoadConstString>: <Reg8: 3, string_id: 26341>  # String: 'Kohlenhydrate sind die Energie der Lebensmittel: Brot, Pasta, Reis, Kartoffeln, Obst, Hülsenfrüchte, Zucker. Sie sind der Teil der Mahlzeit, der den Blutzucker am stärksten hebt; Eiweiß und Fett viel weniger.' (String)
==> 000001d2: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000001d6: <NewArray>: <Reg8: 3, UInt16: 5>
==> 000001da: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000001de: <NewObject>: <Reg8: 4>
==> 000001e0: <LoadConstString>: <Reg8: 5, string_id: 22758>  # String: 'Aber sie sind nicht alle gleich. Zwei Dinge zählen: WELCHE (raffiniert und schnell, oder Vollkorn und mit Ballaststoffen) und WIE VIELE (die Portion). Ein „gutes“ Kohlenhydrat in riesiger Portion wiegt trotzdem; ein „schnelles“ in kleiner Menge wiegt wenig.' (String)
==> 000001e4: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000001e8: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000001ec: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 194946>  # Object: {'cibo': 'Weißer Reis gekocht', 'testo': 'Weißer Reis ist ein raffiniertes Kohlenhydrat: Er steigt schnell. Naturreis, mit mehr Ballaststoffen, steigt langsamer. Dasselbe Getreide, zwei Geschwindigkeiten.'}
==> 000001fa: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000001fe: <NewObject>: <Reg8: 4>
==> 00000200: <LoadConstString>: <Reg8: 5, string_id: 26343>  # String: 'Kohlenhydrate sind nicht der Feind: Sie sind Energie. Das Spiel ist, WELCHE zu wählen und WIE VIELE zu regeln.' (String)
==> 00000204: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000208: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000020c: <NewObject>: <Reg8: 4>
==> 0000020e: <LoadConstString>: <Reg8: 5, string_id: 23065>  # String: 'American Diabetes Association — Kohlenhydrate' (String)
==> 00000212: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 00000216: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 0000021a: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000021e: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 32042>  # String: 'carboidrati' (Identifier)
==> 00000223: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 150686>  # Object: {'t': 'Einfache vs. komplexe Zucker', 's': 'Schnell oder langsam, aber mit ein paar Überraschungen'}
==> 00000231: <NewObject>: <Reg8: 4>
==> 00000233: <LoadConstString>: <Reg8: 3, string_id: 24779>  # String: 'Einfache Zucker (Zucker, Honig, Säfte) kommen meist schnell an. Komplexe Kohlenhydrate (die Stärke von Brot, Pasta, Reis) meist langsamer, weil der Körper sie „zerlegen“ muss.' (String)
==> 00000237: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000023b: <NewArray>: <Reg8: 3, UInt16: 5>
==> 0000023f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000243: <NewObject>: <Reg8: 4>
==> 00000245: <LoadConstString>: <Reg8: 5, string_id: 24528>  # String: 'Die Überraschung: „komplex“ heißt nicht automatisch „langsam“. Weißbrot ist eine komplexe Stärke, steigt aber blitzschnell. Was wirklich zählt, ist die gemessene Geschwindigkeit (der glykämische Index) plus die Menge.' (String)
==> 00000249: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000024d: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000251: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 194951>  # Object: {'cibo': 'Orangensaft', 'testo': 'Saft ist flüssiger Einfachzucker: Er steigt schnell. Die ganze Orange, mit ihren Ballaststoffen, viel langsamer. Dieselbe Frucht, verschiedene Formen.'}
==> 0000025f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000263: <NewObject>: <Reg8: 4>
==> 00000265: <LoadConstString>: <Reg8: 5, string_id: 31484>  # String: '„Einfach“ und „komplex“ sind eine grobe Etikette. Der echte Kompass bleibt GI + glykämische Last.' (String)
==> 00000269: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000026d: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000271: <NewObject>: <Reg8: 4>
==> 00000273: <LoadConstString>: <Reg8: 5, string_id: 30141>  # String: 'WHO — Leitlinien zu freien Zuckern (WHO, 2015)' (String)
==> 00000277: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 0000027b: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 0000027f: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000283: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 32785>  # String: 'zuccheri' (Identifier)
==> 00000288: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194956>  # Object: {'t': 'Die Portionen: die Menge zählt', 's': 'Die halbe Geschichte ist, wie viel du isst'}
==> 00000296: <NewObject>: <Reg8: 4>
==> 00000298: <LoadConstString>: <Reg8: 3, string_id: 10573>  # String: 'Ein schnelles Lebensmittel (hoher GI) in kleiner Portion wiegt wenig. Ein langsames in riesiger Portion kann ordentlich wiegen. Die Geschwindigkeit allein reicht nicht: Es braucht die Menge.' (String)
==> 0000029c: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000002a0: <NewArray>: <Reg8: 3, UInt16: 5>
==> 000002a4: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000002a8: <NewObject>: <Reg8: 4>
==> 000002aa: <LoadConstString>: <Reg8: 5, string_id: 24294>  # String: 'Das ist genau die glykämische Last: Geschwindigkeit × Kohlenhydratmenge der Portion. Deshalb kannst du in der App die Gramm ändern und sehen, wie sich die Wirkung anpasst.' (String)
==> 000002ae: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000002b2: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000002b6: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 194961>  # Object: {'cibo': 'Banane', 'testo': 'Eine kleine Banane hat eine begrenzte Last; zwei große ändern die Sache. Dieselbe Frucht, verschiedene Wirkung je nach Menge.'}
==> 000002c4: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000002c8: <NewObject>: <Reg8: 4>
==> 000002ca: <LoadConstString>: <Reg8: 5, string_id: 26296>  # String: 'Kein Lebensmittel muss absolut gefürchtet werden: Fast immer ist es eine Frage der Portion.' (String)
==> 000002ce: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000002d2: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000002d6: <NewObject>: <Reg8: 4>
==> 000002d8: <LoadConstString>: <Reg8: 6, string_id: 25463>  # String: 'Universität Sydney — Glykämischer-Index-Datenbank' (String)
==> 000002dc: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 000002e0: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 000002e4: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000002e8: <PutNewOwnByIdShort>: <Reg8: 0, Reg8: 2, string_id: 206>  # String: 'porzioni' (Identifier)
==> 000002ec: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194966>  # Object: {'t': 'Gegart vs. roh', 's': 'Das Garen verändert die Wirkung'}
==> 000002fa: <NewObject>: <Reg8: 4>
==> 000002fc: <LoadConstString>: <Reg8: 3, string_id: 30214>  # String: 'Wie du ein Lebensmittel garst, verändert seine Geschwindigkeit. Bissfeste Pasta steigt langsamer als verkochte. Abgekühlte Kartoffeln und Reis bilden „resistente Stärke“ und wiegen etwas weniger als warm.' (String)
==> 00000300: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000304: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00000308: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 0000030c: <NewObject>: <Reg8: 4>
==> 0000030e: <LoadConstString>: <Reg8: 5, string_id: 22788>  # String: 'Achte auch aufs Gewicht: Getreide und Hülsenfrüchte nehmen roh Wasser auf und „wachsen“ beim Garen. 100 g rohe Pasta werden gegart zu viel mehr Gramm, mit viel mehr Kohlenhydraten.' (String)
==> 00000312: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000316: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000031a: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 194971>  # Object: {'cibo': 'Bissfeste Pasta', 'testo': 'Bissfeste Pasta ist einer der einfachsten Tricks: dieselbe Pasta, sanfterer Anstieg als dieselbe verkochte.'}
==> 00000328: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 0000032c: <NewObject>: <Reg8: 4>
==> 0000032e: <LoadConstString>: <Reg8: 5, string_id: 23511>  # String: 'Bissfest und Abkühlen sind kleine Gesten, die die Wirkung senken, ohne etwas vom Teller wegzunehmen.' (String)
==> 00000332: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000336: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000033a: <NewObject>: <Reg8: 4>
==> 0000033c: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 00000340: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000344: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000348: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 35628>  # String: 'cotto-crudo' (Identifier)
==> 0000034d: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194976>  # Object: {'t': 'Flüssig vs. fest', 's': 'Warum Saft nicht wie die Frucht ist'}
==> 0000035b: <NewObject>: <Reg8: 4>
==> 0000035d: <LoadConstString>: <Reg8: 3, string_id: 9837>  # String: 'Derselbe Zucker kommt getrunken schneller an als gegessen. Ein Saft oder Softdrink hat keine Ballaststoffe zum Kauen und wird im Nu aufgenommen: schneller Anstieg. Die ganze Frucht, mit ihren Ballaststoffen, bremst.' (String)
==> 00000361: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000365: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000369: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 0000036d: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 194981>  # Object: {'cibo': 'Orangensaft', 'testo': 'Ein Glas Saft enthält den Zucker mehrerer Orangen, ohne ihre Ballaststoffe. Die ganze Orange sättigt mehr und steigt langsamer.'}
==> 0000037b: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000037f: <NewObject>: <Reg8: 4>
==> 00000381: <LoadConstString>: <Reg8: 5, string_id: 24778>  # String: 'Einfache Regel: Lieber die ganze Frucht als ihren Saft, und zum Durstlöschen Wasser.' (String)
==> 00000385: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000389: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 0000038d: <NewObject>: <Reg8: 4>
==> 0000038f: <LoadConstString>: <Reg8: 5, string_id: 23056>  # String: 'American Diabetes Association — Getränke und Zucker' (String)
==> 00000393: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 00000397: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000039b: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000039f: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 38529>  # String: 'liquidi-solidi' (Identifier)
==> 000003a4: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194986>  # Object: {'t': 'Das Etikett lesen', 's': 'Die 3 Zahlen, die wirklich zählen'}
==> 000003b2: <NewObject>: <Reg8: 4>
==> 000003b4: <LoadConstString>: <Reg8: 3, string_id: 23250>  # String: 'Auf dem Etikett schau für den Blutzucker vor allem auf: die KOHLENHYDRATE (und „davon Zucker“), die BALLASTSTOFFE (je mehr, desto stärker die Bremse) und die echte PORTION, die du isst.' (String)
==> 000003b8: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000003bc: <NewArray>: <Reg8: 3, UInt16: 4>
==> 000003c0: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000003c4: <NewObject>: <Reg8: 4>
==> 000003c6: <LoadConstString>: <Reg8: 5, string_id: 22790>  # String: 'Achtung bei Tricks: „ohne Zucker“ kann viel Fett oder Süßstoffe haben; die Werte sind oft pro 100 g, nicht pro Portion — lies genau, wie viele Gramm du wirklich isst.' (String)
==> 000003ca: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000003ce: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000003d2: <NewObject>: <Reg8: 4>
==> 000003d4: <LoadConstString>: <Reg8: 5, string_id: 24523>  # String: 'Die nützlichste Zahl für den Blutzucker ist „Kohlenhydrate, davon Zucker“ bezogen auf deine Portion. Der Rest ist Beiwerk.' (String)
==> 000003d8: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000003dc: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000003e0: <NewObject>: <Reg8: 4>
==> 000003e2: <LoadConstString>: <Reg8: 5, string_id: 24690>  # String: 'EFSA — Nährwertkennzeichnung (VO EU 1169/2011)' (String)
==> 000003e6: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 000003ea: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000003ee: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000003f2: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 34144>  # String: 'etichetta' (Identifier)
==> 000003f7: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194991>  # Object: {'t': 'Die GLICODEN-Methode', 's': 'Jedes Gericht mit 4 Fragen lesen'}
==> 00000405: <NewObject>: <Reg8: 4>
==> 00000407: <LoadConstString>: <Reg8: 3, string_id: 10343>  # String: 'Du musst nicht tausend Lebensmittel auswendig lernen. Es reicht, jedes Gericht mit 4 immer gleichen Fragen anzusehen: Das ist die GLICODEN-Methode. Du findest sie auf jeder Karte der App.' (String)
==> 0000040b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000040f: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000413: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000417: <NewObject>: <Reg8: 4>
==> 00000419: <NewArrayWithBuffer>: <Reg8: 5, UInt16: 4, UInt16: 4, UInt16: 26115>  # Array: ['Menge: Wie viele Kohlenhydrate stecken in der Portion? Das ist der Faktor, der am stärksten wiegt.', 'Geschwindigkeit: Wie schnell steigen sie, also der glykämische Index?', 'Gleichgewicht: Gibt es Ballaststoffe, Eiweiß oder Fett, die als Bremse wirken?', 'Zubereitung: Wie ist es gegart oder verarbeitet (bissfest, Vollkorn, frittiert)?']
==> 00000421: <PutNewOwnById>: <Reg8: 4, Reg8: 5, string_id: 34177>  # String: 'voci' (Identifier)
==> 00000426: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000042a: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 194996>  # Object: {'cibo': 'Bissfeste Spaghetti', 'testo': 'Bissfeste Spaghetti: mittlere Kohlenhydratmenge, niedrige Geschwindigkeit (bissfest bremst), Gleichgewicht mit der Sauce zu ergänzen, Zubereitung, die hilft. Vier Blicke, ein verstandenes Gericht.'}
==> 00000438: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 0000043c: <NewObject>: <Reg8: 4>
==> 0000043e: <LoadConstString>: <Reg8: 5, string_id: 20682>  # String: 'Wenn du diese 4 Fragen im Kopf hast, kannst du auch ein Gericht lesen, das die App nie gesehen hat. Das ist das Ziel von GLICODEN: dich selbst gut machen.' (String)
==> 00000442: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000446: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000044a: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000044e: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 35650>  # String: 'metodo' (Identifier)
==> 00000453: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195001>  # Object: {'t': 'Kalorien und Blutzucker: zwei Linsen', 's': 'Sie wirken gleich, sind es aber nicht'}
==> 00000461: <NewObject>: <Reg8: 4>
==> 00000463: <LoadConstString>: <Reg8: 3, string_id: 25474>  # String: 'GLICODEN zeigt dir zwei Dinge zu jedem Lebensmittel: die Wirkung auf den Blutzucker und die Kalorien. Sie wirken gleich, aber sie zu verwechseln führt in die Irre.' (String)
==> 00000467: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000046b: <NewArray>: <Reg8: 3, UInt16: 4>
==> 0000046f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000473: <NewObject>: <Reg8: 4>
==> 00000475: <NewArrayWithBuffer>: <Reg8: 5, UInt16: 3, UInt16: 3, UInt16: 51590>  # Array: ['Blutzucker: wie stark und wie schnell der Zucker im Blut steigt. Dafür schau auf die Last.', 'Kalorien: wie viel Energie das Lebensmittel bringt. Dafür schau auf Portion und Ziel.', 'Ein Lebensmittel kann den Blutzucker wenig heben und sehr kalorienreich sein. Und umgekehrt.']
==> 0000047d: <PutNewOwnById>: <Reg8: 4, Reg8: 5, string_id: 34177>  # String: 'voci' (Identifier)
==> 00000482: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000486: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195006>  # Object: {'cibo': 'Öl und Nüsse', 'testo': 'Olivenöl und Nüsse heben den Blutzucker kaum, gehören aber zu den kalorienreichsten Lebensmitteln überhaupt: super für Energie, zu dosieren, wenn du abnehmen willst.'}
==> 00000494: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000498: <NewObject>: <Reg8: 4>
==> 0000049a: <LoadConstString>: <Reg8: 5, string_id: 9725>  # String: 'In der App findest du neben der Wirkung das Label Leicht / Mittel / Deftig. Nutze die beiden Linsen zusammen, je nach deinem Ziel im Bereich Fortschritt.' (String)
==> 0000049e: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000004a2: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000004a6: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000004aa: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 35345>  # String: 'calorie' (Identifier)
==> 000004af: <NewObjectWithBuffer>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt16: 49840, UInt16: 3175>  # Object: {'t': 'Die Reihenfolge bei Tisch und Bewegung', 's': 'Zwei einfache Gesten, die wirken'}
==> 000004b9: <NewObject>: <Reg8: 4>
==> 000004bb: <LoadConstString>: <Reg8: 3, string_id: 25129>  # String: 'Es zählt nicht nur, was du isst, sondern auch in welcher Reihenfolge und was du danach tust.' (String)
==> 000004bf: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000004c3: <NewArray>: <Reg8: 3, UInt16: 4>
==> 000004c7: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000004cb: <NewObject>: <Reg8: 4>
==> 000004cd: <NewArrayWithBuffer>: <Reg8: 5, UInt16: 2, UInt16: 2, UInt16: 51597>  # Array: ['Beginne mit Gemüse und Eiweiß, lass die Kohlenhydrate für zuletzt: Der Blutzucker steigt langsamer.', 'Ein Spaziergang nach dem Essen hilft dem Körper, diesen Zucker zu nutzen, statt ihn zu speichern.']
==> 000004d5: <PutNewOwnById>: <Reg8: 4, Reg8: 5, string_id: 34177>  # String: 'voci' (Identifier)
==> 000004da: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000004de: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195011>  # Object: {'cibo': 'Bissfeste Spaghetti', 'testo': 'Dasselbe Pastagericht: Wenn du vorher eine Gemüsebeilage isst, wird die Wirkung sanfter.'}
==> 000004ec: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000004f0: <NewObject>: <Reg8: 4>
==> 000004f2: <LoadConstString>: <Reg8: 5, string_id: 9668>  # String: 'Das sind Gewohnheiten, keine medizinischen Regeln. Kleine Gesten, die jeder bei Tisch probieren kann.' (String)
==> 000004f6: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000004fa: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000004fe: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000502: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 42827>  # String: 'ordine' (Identifier)
==> 00000507: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195016>  # Object: {'t': 'Küchentricks', 's': 'Auch wie du kochst, verändert die Wirkung'}
==> 00000515: <NewObject>: <Reg8: 4>
==> 00000517: <LoadConstString>: <Reg8: 3, string_id: 4913>  # String: 'Dasselbe Lebensmittel kann je nach Zubereitung verschiedene Wirkungen haben. Drei einfache Tricks:' (String)
==> 0000051b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000051f: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000523: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000527: <NewObject>: <Reg8: 4>
==> 00000529: <NewArrayWithBuffer>: <Reg8: 5, UInt16: 3, UInt16: 3, UInt16: 51602>  # Array: ['Pasta und Reis BISSFEST steigen weniger als eine sehr lange Garung.', 'Pasta, Reis oder Kartoffeln abkühlen (z. B. kalte Pasta) bildet „resistente Stärke“, die den Blutzucker weniger hebt.', 'Reiferes Obst hat einen höheren GI: Eine grüne Banane und eine mit Flecken sind nicht dasselbe.']
==> 00000531: <PutNewOwnById>: <Reg8: 4, Reg8: 5, string_id: 34177>  # String: 'voci' (Identifier)
==> 00000536: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000053a: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195021>  # Object: {'cibo': 'Perlgraupen gekocht', 'testo': 'Mit einem anderen Getreide änderst du alles: Perlgraupen haben einen sehr niedrigen glykämischen Index, viel sanfter als Weißreis.'}
==> 00000548: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 0000054c: <NewObject>: <Reg8: 4>
==> 0000054e: <LoadConstString>: <Reg8: 5, string_id: 26076>  # String: 'In den Rezepten der App findest du oft diese „Alternativen mit geringerer Wirkung“ schon fertig.' (String)
==> 00000552: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000556: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000055a: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000055e: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 46308>  # String: 'cucina' (Identifier)
==> 00000563: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195026>  # Object: {'t': 'Frühstück: gut starten', 's': 'Die erste Mahlzeit gibt dem Tag den Takt'}
==> 00000571: <NewObject>: <Reg8: 4>
==> 00000573: <LoadConstString>: <Reg8: 3, string_id: 24728>  # String: 'Ein Frühstück aus nur schnellen Zuckern (Zwieback mit Marmelade, Croissant, Saft) macht eine Spitze und dann einen Absturz: Hunger und Müdigkeit am Vormittag. Eine Bremse hinzuzufügen ändert alles.' (String)
==> 00000577: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000057b: <NewArray>: <Reg8: 3, UInt16: 5>
==> 0000057f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000583: <NewObject>: <Reg8: 4>
==> 00000585: <LoadConstString>: <Reg8: 5, string_id: 24378>  # String: 'Der Trick: Verbinde die Kohlenhydrate mit etwas, das bremst — gute Fette, Eiweiß oder Ballaststoffe. Joghurt, Nüsse, Hafer, Eier: Der Anstieg wird sanft und die Energie hält.' (String)
==> 00000589: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000058d: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000591: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195031>  # Object: {'cibo': 'Haferbrei (Porridge)', 'testo': 'Hafer mit Joghurt und Nüssen steigt langsam und sättigt lange: ein Frühstück mit den Bremsen schon drin.'}
==> 0000059f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000005a3: <NewObject>: <Reg8: 4>
==> 000005a5: <LoadConstString>: <Reg8: 5, string_id: 24603>  # String: 'Du musst nicht verzichten: Es reicht, zu begleiten. Füge eine Bremse hinzu und dasselbe Frühstück wiegt weniger.' (String)
==> 000005a9: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000005ad: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000005b1: <NewObject>: <Reg8: 4>
==> 000005b3: <LoadConstString>: <Reg8: 5, string_id: 23053>  # String: 'American Diabetes Association — Frühstück' (String)
==> 000005b7: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 000005bb: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 000005bf: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000005c3: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 35372>  # String: 'colazione' (Identifier)
==> 000005c8: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195036>  # Object: {'t': 'Der kluge Snack', 's': 'Klein, aber mit Bremsen'}
==> 000005d6: <NewObject>: <Reg8: 4>
==> 000005d8: <LoadConstString>: <Reg8: 3, string_id: 24397>  # String: 'Der schlechteste Snack ist ein schnelles Kohlenhydrat allein (Reiswaffeln, Cracker, schnell eine Frucht): Er steigt und fällt, und kurz danach hast du wieder Hunger. Der beste stellt eine Bremse daneben.' (String)
==> 000005dc: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000005e0: <NewArray>: <Reg8: 3, UInt16: 5>
==> 000005e4: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000005e8: <NewObject>: <Reg8: 4>
==> 000005ea: <LoadConstString>: <Reg8: 5, string_id: 26351>  # String: 'Kombiniere: Obst + Nüsse, Joghurt + ein paar Mandeln, eine Waffel mit etwas Eiweißreichem. Ballaststoffe und Fette flachen den Anstieg ab.' (String)
==> 000005ee: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000005f2: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000005f6: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195041>  # Object: {'cibo': 'Mandeln', 'testo': 'Eine Handvoll Mandeln neben einer Frucht macht aus einem schnellen Snack einen ausgewogenen.'}
==> 00000604: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000608: <NewObject>: <Reg8: 4>
==> 0000060a: <LoadConstString>: <Reg8: 5, string_id: 12208>  # String: 'Goldene Snack-Regel: nie ein schnelles Kohlenhydrat allein. Stell ihm immer eine Bremse zur Seite.' (String)
==> 0000060e: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000612: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000616: <NewObject>: <Reg8: 4>
==> 00000618: <LoadConstString>: <Reg8: 5, string_id: 23098>  # String: 'American Diabetes Association — Snacks' (String)
==> 0000061c: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 00000620: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000624: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000628: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 41698>  # String: 'spuntino' (Identifier)
==> 0000062d: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195046>  # Object: {'t': 'Das Dessert: wie du es einbaust', 's': 'Ohne Schuldgefühl, mit Köpfchen'}
==> 0000063b: <NewObject>: <Reg8: 4>
==> 0000063d: <LoadConstString>: <Reg8: 3, string_id: 24272>  # String: 'Das Dessert ist nicht verboten: Es zählt wann und wie. Nach einer vollständigen Mahlzeit (mit Gemüse, Eiweiß, Fett) ist die Wirkung sanfter als auf nüchternen Magen, wo es schnell steigt.' (String)
==> 00000641: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000645: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00000649: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 0000064d: <NewObject>: <Reg8: 4>
==> 0000064f: <LoadConstString>: <Reg8: 5, string_id: 29929>  # String: 'Und die Portion zählt: Ein Stückchen ist das eine, ein halber Becher das andere. Mit der App kannst du sehen, wie sich die Wirkung an die gewählten Gramm anpasst.' (String)
==> 00000653: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000657: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000065b: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195051>  # Object: {'cibo': 'Zartbitterschokolade', 'testo': 'Zartbitter hat weniger Zucker und mehr Fett: in kleiner Portion, nach dem Essen, ein „sanftes“ Dessert.'}
==> 00000669: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 0000066d: <NewObject>: <Reg8: 4>
==> 0000066f: <LoadConstString>: <Reg8: 5, string_id: 9649>  # String: 'Das Dessert am Ende der Mahlzeit und in gemessener Portion wiegt viel weniger als allein und unkontrolliert.' (String)
==> 00000673: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000677: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000067b: <NewObject>: <Reg8: 4>
==> 0000067d: <LoadConstString>: <Reg8: 5, string_id: 30139>  # String: 'WHO — Freie Zucker (WHO, 2015)' (String)
==> 00000681: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 00000685: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000689: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000068d: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 36535>  # String: 'dolce' (Identifier)
==> 00000692: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195056>  # Object: {'t': 'Nach dem Essen spazieren gehen', 's': 'Zehn Minuten, die den Anstieg verändern'}
==> 000006a0: <NewObject>: <Reg8: 4>
==> 000006a2: <LoadConstString>: <Reg8: 3, string_id: 18728>  # String: 'Sich nach dem Essen zu bewegen hilft den Muskeln, den frisch angekommenen Zucker zu nutzen: Der Blutzuckeranstieg flacht ab. 10-15 Minuten leichter Spaziergang reichen.' (String)
==> 000006a6: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000006aa: <NewArray>: <Reg8: 3, UInt16: 4>
==> 000006ae: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000006b2: <NewObject>: <Reg8: 4>
==> 000006b4: <LoadConstString>: <Reg8: 5, string_id: 26295>  # String: 'Kein Fitnessstudio nötig: Ein Spaziergang nach dem Mittag- oder Abendessen ist eine der wirksamsten und einfachsten Gesten. Am besten gleich danach, wenn der Anstieg beginnt.' (String)
==> 000006b8: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000006bc: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000006c0: <NewObject>: <Reg8: 4>
==> 000006c2: <LoadConstString>: <Reg8: 5, string_id: 24374>  # String: 'Der Spaziergang nach dem Essen ist eine gratis „Bremse“: nichts vom Essen weggenommen, nur der Anstieg sanfter gemacht.' (String)
==> 000006c6: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000006ca: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000006ce: <NewObject>: <Reg8: 4>
==> 000006d0: <LoadConstString>: <Reg8: 5, string_id: 25152>  # String: 'Reynolds et al., Diabetologia 2016 — Spaziergang nach dem Essen' (String)
==> 000006d4: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 000006d8: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000006dc: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000006e0: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 36850>  # String: 'camminata' (Identifier)
==> 000006e5: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195061>  # Object: {'t': 'Auswärts und im Restaurant', 's': 'Gut wählen von der Karte'}
==> 000006f3: <NewObject>: <Reg8: 4>
==> 000006f5: <LoadConstString>: <Reg8: 3, string_id: 23273>  # String: 'Auswärts wiegst du die Gramm nicht, aber die Methode bleibt: Beginne mit dem Gemüse, wähle ein Eiweiß und behalte die Kohlenhydratmenge im Blick (Brot, Pasta, Kartoffeln, Dessert).' (String)
==> 000006f9: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000006fd: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00000701: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000705: <NewObject>: <Reg8: 4>
==> 00000707: <LoadConstString>: <Reg8: 5, string_id: 28380>  # String: 'Praktische Tricks: Gemüse oder Salat zuerst, Wasser statt Softdrinks, Brot in Maßen, und wenn es ein Dessert gibt, ans Ende der Mahlzeit, nicht auf nüchternen Magen.' (String)
==> 0000070b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000070f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000713: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195066>  # Object: {'cibo': 'Algensalat (Wakame)', 'testo': 'Mit einer Gemüsebeilage zu beginnen, schafft die „Bremse“, bevor die Kohlenhydrate kommen.'}
==> 00000721: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000725: <NewObject>: <Reg8: 4>
==> 00000727: <LoadConstString>: <Reg8: 5, string_id: 24580>  # String: 'Du brauchst keine Waage, um auswärts gut zu essen: Es reicht die richtige Reihenfolge und ein Auge auf die Portion.' (String)
==> 0000072b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000072f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000733: <NewObject>: <Reg8: 4>
==> 00000735: <LoadConstString>: <Reg8: 5, string_id: 22467>  # String: 'Shukla et al., Diabetes Care 2015 — Reihenfolge der Lebensmittel' (String)
==> 00000739: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 0000073d: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000741: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000745: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 40309>  # String: 'fuori-casa' (Identifier)
==> 0000074a: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195071>  # Object: {'t': 'Den Einkauf planen', 's': 'Die Entscheidungen fallen im Supermarkt'}
==> 00000758: <NewObject>: <Reg8: 4>
==> 0000075a: <LoadConstString>: <Reg8: 3, string_id: 24519>  # String: 'Die halbe Arbeit passiert im Einkaufswagen. Wenn du zu Hause Ballaststoffe und Eiweiß hast (Gemüse, Hülsenfrüchte, Joghurt, Nüsse, Vollkorn), ist es leicht, Gerichte mit Bremsen zu bauen. Wenn du nur schnelle Lebensmittel hast, wird es schwer.' (String)
==> 0000075e: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000762: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00000766: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 0000076a: <NewObject>: <Reg8: 4>
==> 0000076c: <LoadConstString>: <Reg8: 5, string_id: 26031>  # String: 'Im Supermarkt nutze den Barcode-Scanner und lies das Etikett: Schau auf die Kohlenhydrate „davon Zucker“ und die Ballaststoffe und wähle, bevor du es in den Wagen legst.' (String)
==> 00000770: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000774: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000778: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195076>  # Object: {'cibo': 'Linsen gekocht', 'testo': 'Hülsenfrüchte in der Vorratskammer zu haben heißt, immer ein Kohlenhydrat mit den Bremsen schon parat zu haben.'}
==> 00000786: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 0000078a: <NewObject>: <Reg8: 4>
==> 0000078c: <LoadConstString>: <Reg8: 5, string_id: 24581>  # String: 'Du entscheidest nicht vor dem Teller: Du entscheidest im Supermarkt. Fülle die Vorratskammer mit Bremsen.' (String)
==> 00000790: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000794: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000798: <NewObject>: <Reg8: 4>
==> 0000079a: <LoadConstString>: <Reg8: 5, string_id: 23040>  # String: 'American Diabetes Association — Einkauf und Planung' (String)
==> 0000079e: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 000007a2: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 000007a6: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000007aa: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 37370>  # String: 'spesa' (Identifier)
==> 000007af: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195081>  # Object: {'t': 'Hoher GI ist nicht immer ein Feind', 's': 'Wann der schnelle Anstieg nützt (Sport)'}
==> 000007bd: <NewObject>: <Reg8: 4>
==> 000007bf: <LoadConstString>: <Reg8: 3, string_id: 14884>  # String: 'Manchmal ist ein schneller Anstieg genau das, was du brauchst. Der klarste Fall ist intensiver Sport.' (String)
==> 000007c3: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000007c7: <NewArray>: <Reg8: 3, UInt16: 5>
==> 000007cb: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000007cf: <NewObject>: <Reg8: 4>
==> 000007d1: <LoadConstString>: <Reg8: 5, string_id: 28814>  # String: 'Rund um ein hartes Training verbrennt der Körper schnell und braucht sofortige Energie: Ein Lebensmittel mit höherem GI passt, es ist kein Fehler.' (String)
==> 000007d5: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000007d9: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000007dd: <NewObject>: <Reg8: 4>
==> 000007df: <NewArrayWithBuffer>: <Reg8: 5, UInt16: 3, UInt16: 3, UInt16: 51609>  # Array: ['Vor einer intensiven Anstrengung: etwas sofort verfügbare Kohlenhydrate geben Schub.', 'Nach der Anstrengung: helfen sie der Erholung.', 'In Ruhe, am Schreibtisch, nützt derselbe schnelle Anstieg viel weniger.']
==> 000007e7: <PutNewOwnById>: <Reg8: 4, Reg8: 5, string_id: 34177>  # String: 'voci' (Identifier)
==> 000007ec: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000007f0: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195086>  # Object: {'cibo': 'Banane', 'testo': 'Eine reife Banane vor dem Laufen ist schneller Treibstoff. Dieselbe Banane zum Frühstück, in Ruhe, gibt einen Anstieg, den du vielleicht nicht brauchst.'}
==> 000007fe: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000802: <NewObject>: <Reg8: 4>
==> 00000804: <LoadConstString>: <Reg8: 5, string_id: 24366>  # String: 'Der Kontext zählt. „Hoch“ heißt nicht „schlecht“: Es heißt „schnell“, und manchmal ist schnell genau das, was du suchst.' (String)
==> 00000808: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000080c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000810: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000814: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 35868>  # String: 'sport' (Identifier)
==> 00000819: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195091>  # Object: {'t': 'Mythen aufräumen', 's': 'Was man sagt und was wahr ist'}
==> 00000827: <NewObject>: <Reg8: 4>
==> 00000829: <LoadConstString>: <Reg8: 3, string_id: 30898>  # String: 'Über Essen und Blutzucker kursieren viele Gemeinplätze. Räumen wir ein paar auf, in Ruhe.' (String)
==> 0000082d: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000831: <NewArray>: <Reg8: 3, UInt16: 3>
==> 00000835: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000839: <NewObject>: <Reg8: 4>
==> 0000083b: <NewArrayWithBuffer>: <Reg8: 5, UInt16: 4, UInt16: 4, UInt16: 1635>  # Array: ['«Obst ist schlecht, es hat Zucker» → Nein. Ganzes Obst hat Ballaststoffe und Wasser, die den Anstieg bremsen. Es zählen Menge und Art, nicht das Verbot.', '«Vollkornbrot hebt den Blutzucker nicht» → Es hebt weniger als weißes, aber es hebt. Besser, nicht gratis.', '«Rohrzucker ist gesünder als weißer» → Für den Blutzucker sind sie praktisch gleich.', '«Ohne Zucker = frei» → Achtung: oft sind andere Kohlenhydrate oder Fette drin. Lies das Etikett.']
==> 00000843: <PutNewOwnById>: <Reg8: 4, Reg8: 5, string_id: 34177>  # String: 'voci' (Identifier)
==> 00000848: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000084c: <NewObject>: <Reg8: 4>
==> 0000084e: <LoadConstString>: <Reg8: 5, string_id: 27484>  # String: 'Mythen aufzuräumen ist die halbe Arbeit. Die andere Hälfte ist, auf die echten Zahlen zu schauen, die dir die App vorlegt.' (String)
==> 00000852: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000856: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 0000085a: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000085e: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 33008>  # String: 'miti' (Identifier)
==> 00000863: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195096>  # Object: {'t': 'Wie du ihn stabiler hältst', 's': 'Die Zusammenfassung von allem'}
==> 00000871: <NewObject>: <Reg8: 4>
==> 00000873: <LoadConstString>: <Reg8: 3, string_id: 27620>  # String: 'Nimmt man die Kapitel zusammen, hier die einfachen Gesten für einen stabileren Blutzucker und eine stabilere Energie:' (String)
==> 00000877: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000087b: <NewArray>: <Reg8: 3, UInt16: 3>
==> 0000087f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000883: <NewObject>: <Reg8: 4>
==> 00000885: <NewArrayWithBuffer>: <Reg8: 5, UInt16: 5, UInt16: 5, UInt16: 51616>  # Array: ['Schau auf die Last, nicht nur auf den glykämischen Index.', 'Ergänze das Gericht mit Ballaststoffen, Eiweiß und guten Fetten.', 'Wähle Alternativen mit niedrigerem GI: Die App schlägt sie dir vor.', 'Beginne mit dem Gemüse und beweg dich nach dem Essen ein wenig.', 'Gare bissfest und nutze die resistente Stärke.']
==> 0000088d: <PutNewOwnById>: <Reg8: 4, Reg8: 5, string_id: 34177>  # String: 'voci' (Identifier)
==> 00000892: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000896: <NewObject>: <Reg8: 4>
==> 00000898: <LoadConstString>: <Reg8: 5, string_id: 9670>  # String: 'Das sind allgemeine, bildende Tipps, keine medizinischen Anweisungen. Jeder ist anders: Wenn du eine bestimmte Erkrankung hast, folge immer dem Plan deines Arztes oder deines Behandlungsteams.' (String)
==> 0000089c: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000008a0: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000008a4: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000008a8: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 36034>  # String: 'stabile' (Identifier)
==> 000008ad: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195101>  # Object: {'t': '„Obst ist schlecht“?', 's': 'Nein: Es kommt darauf an, welches, wie viel und wie'}
==> 000008bb: <NewObject>: <Reg8: 4>
==> 000008bd: <LoadConstString>: <Reg8: 3, string_id: 27886>  # String: 'Obst hat Zucker, stimmt, aber auch Ballaststoffe, Wasser und Vitamine. Die Ballaststoffe bremsen die Aufnahme: Die meisten ganzen Früchte haben in normaler Portion eine begrenzte Wirkung.' (String)
==> 000008c1: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000008c5: <NewArray>: <Reg8: 3, UInt16: 5>
==> 000008c9: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000008cd: <NewObject>: <Reg8: 4>
==> 000008cf: <LoadConstString>: <Reg8: 5, string_id: 22982>  # String: 'Alles ändert die FORM: Die ganze Frucht bremst, der Saft nicht. Und die Menge: eine Frucht ist das eine, vier sind das andere.' (String)
==> 000008d3: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000008d7: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000008db: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195106>  # Object: {'cibo': 'Apfel mit Schale', 'testo': 'Ein Apfel mit Schale bringt Ballaststoffe: Er steigt langsam. Sein Saft, ohne Ballaststoffe, steigt schnell. Dieselbe Frucht, zwei Geschichten.'}
==> 000008e9: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000008ed: <NewObject>: <Reg8: 4>
==> 000008ef: <LoadConstString>: <Reg8: 5, string_id: 7496>  # String: 'Ganzes Obst ist nicht der Feind: Es ist eines der Kohlenhydrate mit den Bremsen schon drin.' (String)
==> 000008f3: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000008f7: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000008fb: <NewObject>: <Reg8: 4>
==> 000008fd: <LoadConstString>: <Reg8: 5, string_id: 23079>  # String: 'American Diabetes Association — Obst' (String)
==> 00000901: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 00000905: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000909: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000090d: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 45391>  # String: 'mito-frutta' (Identifier)
==> 00000912: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195111>  # Object: {'t': '„Vollkorn ist immer besser“?', 's': 'Oft ja, aber es ist keine Zauberei'}
==> 00000920: <NewObject>: <Reg8: 4>
==> 00000922: <LoadConstString>: <Reg8: 3, string_id: 30100>  # String: 'Vollkorn hat mehr Ballaststoffe als die raffinierte Version, steigt also tendenziell etwas langsamer. Ein echter Vorteil, aber es macht aus einem Kohlenhydrat kein „freies“.' (String)
==> 00000926: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000092a: <NewArray>: <Reg8: 3, UInt16: 5>
==> 0000092e: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000932: <NewObject>: <Reg8: 4>
==> 00000934: <LoadConstString>: <Reg8: 5, string_id: 22792>  # String: 'Achtung beim Marketing: „Vollkorn“ auf einem stark verarbeiteten und gezuckerten Produkt zählt wenig. Und die Portion bleibt entscheidend: Vollkornbrot in riesiger Menge wiegt trotzdem.' (String)
==> 00000938: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000093c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000940: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195116>  # Object: {'cibo': 'Vollkornbrot', 'testo': 'Vollkornbrot steigt dank der Ballaststoffe etwas langsamer als weißes: eine Verbesserung, kein Freibrief.'}
==> 0000094e: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000952: <NewObject>: <Reg8: 4>
==> 00000954: <LoadConstString>: <Reg8: 5, string_id: 20578>  # String: 'Vollkorn = etwas mehr Bremse. Super, aber die Menge bestimmt trotzdem.' (String)
==> 00000958: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000095c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000960: <NewObject>: <Reg8: 4>
==> 00000962: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 00000966: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 0000096a: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000096e: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 42206>  # String: 'mito-integrale' (Identifier)
==> 00000973: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195121>  # Object: {'t': '„Ohne Zucker“ = freie Bahn?', 's': 'Nicht ganz: lies genau'}
==> 00000981: <NewObject>: <Reg8: 4>
==> 00000983: <LoadConstString>: <Reg8: 3, string_id: 31491>  # String: '„Ohne Zuckerzusatz“ heißt nicht ohne Kohlenhydrate: Ein Produkt kann Stärke haben, die den Blutzucker trotzdem hebt. Und „light“ heißt oft weniger Fett, aber mehr Zucker, oder umgekehrt.' (String)
==> 00000987: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000098b: <NewArray>: <Reg8: 3, UInt16: 4>
==> 0000098f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000993: <NewObject>: <Reg8: 4>
==> 00000995: <LoadConstString>: <Reg8: 5, string_id: 24351>  # String: 'Der Aufdruck vorne dient dem Verkauf; die Wahrheit steht in der Nährwerttabelle. Schau auf die Gesamtkohlenhydrate „davon Zucker“, nicht nur auf das Wort auf der Vorderseite.' (String)
==> 00000999: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000099d: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000009a1: <NewObject>: <Reg8: 4>
==> 000009a3: <LoadConstString>: <Reg8: 5, string_id: 31496>  # String: '„Ohne Zucker“ ist kein Freibrief: Dreh das Produkt um und lies die echten Kohlenhydrate.' (String)
==> 000009a7: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000009ab: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000009af: <NewObject>: <Reg8: 4>
==> 000009b1: <LoadConstString>: <Reg8: 5, string_id: 24689>  # String: 'EFSA — Nährwert- und gesundheitsbezogene Angaben' (String)
==> 000009b5: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 000009b9: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000009bd: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000009c1: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 51493>  # String: 'mito-zero' (Identifier)
==> 000009c6: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195126>  # Object: {'t': '„Pasta am Abend macht dick“?', 's': 'Es zählt die Gesamtmenge, nicht die Uhr'}
==> 000009d4: <NewObject>: <Reg8: 4>
==> 000009d6: <LoadConstString>: <Reg8: 3, string_id: 27608>  # String: 'Nicht die Uhrzeit macht den Unterschied, sondern wie viel und wie. Ein Teller Pasta mit Gemüse und einer ausgewogenen Sauce, in richtiger Portion, geht auch am Abend.' (String)
==> 000009da: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000009de: <NewArray>: <Reg8: 3, UInt16: 5>
==> 000009e2: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000009e6: <NewObject>: <Reg8: 4>
==> 000009e8: <LoadConstString>: <Reg8: 7, string_id: 25833>  # String: 'Höchstens neigt man abends dazu, mehr zu essen und sich weniger zu bewegen: Dann zählen die Portion und ein Spaziergang danach umso mehr. Aber die „abends verbotene Pasta“ ist ein Mythos.' (String)
==> 000009ec: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 000009f0: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000009f4: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195131>  # Object: {'cibo': 'Bissfeste Pasta', 'testo': 'Bissfeste Pasta, mit Gemüse davor und einem Spaziergang danach: Dasselbe Abendessen wiegt viel weniger.'}
==> 00000a02: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000a06: <NewObject>: <Reg8: 4>
==> 00000a08: <LoadConstString>: <Reg8: 7, string_id: 15664>  # String: 'Nicht die Uhr ist das Problem: Es sind die Menge und was du auf den Teller tust.' (String)
==> 00000a0c: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000a10: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000a14: <NewObject>: <Reg8: 4>
==> 00000a16: <LoadConstString>: <Reg8: 7, string_id: 23041>  # String: 'American Diabetes Association — Ernährungsmythen' (String)
==> 00000a1a: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000a1e: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000a22: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000a26: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 49019>  # String: 'mito-pasta-sera' (Identifier)
==> 00000a2b: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195136>  # Object: {'t': 'Alkohol und Blutzucker', 's': 'Eine komplizierte Beziehung'}
==> 00000a39: <NewObject>: <Reg8: 4>
==> 00000a3b: <LoadConstString>: <Reg8: 3, string_id: 22977>  # String: 'Alkohol ist eine komplizierte Beziehung: Manche Getränke (Bier, süße Drinks, Likörweine) bringen Kohlenhydrate; den Alkohol selbst verarbeitet die Leber so, dass er den Blutzucker nicht linear beeinflussen kann.' (String)
==> 00000a3f: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000a43: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000a47: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000a4b: <NewObject>: <Reg8: 4>
==> 00000a4d: <LoadConstString>: <Reg8: 7, string_id: 26077>  # String: 'In der Praxis: Wenn du trinkst, besser in Maßen und zusammen mit Essen, nie auf nüchternen Magen. Und Achtung bei süßen Drinks, die Alkohol und Zucker addieren.' (String)
==> 00000a51: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000a55: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000a59: <NewObject>: <Reg8: 4>
==> 00000a5b: <LoadConstString>: <Reg8: 7, string_id: 24292>  # String: 'Das ist Bildung, keine medizinische Anweisung: Für deine konkrete Situation sprich mit deinem Arzt.' (String)
==> 00000a5f: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000a63: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000a67: <NewObject>: <Reg8: 4>
==> 00000a69: <LoadConstString>: <Reg8: 7, string_id: 22976>  # String: 'American Diabetes Association — Alkohol' (String)
==> 00000a6d: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000a71: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000a75: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000a79: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 34725>  # String: 'alcol' (Identifier)
==> 00000a7e: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195141>  # Object: {'t': 'Kaffee und Blutzucker', 's': 'Schwarz wenig, gezuckert viel'}
==> 00000a8c: <NewObject>: <Reg8: 4>
==> 00000a8e: <LoadConstString>: <Reg8: 3, string_id: 18458>  # String: 'Schwarzer Kaffee ohne Zucker hat eine fast null Wirkung auf den Blutzucker. Das Problem ist nicht der Kaffee: Es ist, was du hineingibst (Zucker, Sirupe, Sahne, Kekse) und die Milch in den gezuckerten Varianten.' (String)
==> 00000a92: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000a96: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000a9a: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000a9e: <NewObject>: <Reg8: 4>
==> 00000aa0: <LoadConstString>: <Reg8: 7, string_id: 24724>  # String: 'Ein Cappuccino mit zwei Stück Zucker und ein Croissant ist eine Mahlzeit voller schneller Zucker, kein „Kaffee“. Der Kaffee selbst bleibt neutral.' (String)
==> 00000aa4: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000aa8: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000aac: <NewObject>: <Reg8: 4>
==> 00000aae: <LoadConstString>: <Reg8: 7, string_id: 27607>  # String: 'Nicht der Kaffee ist das Problem, sondern der Zucker und die Süßspeisen, die ihn begleiten.' (String)
==> 00000ab2: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000ab6: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000aba: <NewObject>: <Reg8: 4>
==> 00000abc: <LoadConstString>: <Reg8: 7, string_id: 23064>  # String: 'American Diabetes Association — Koffein' (String)
==> 00000ac0: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000ac4: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000ac8: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000acc: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 38546>  # String: 'caffe' (Identifier)
==> 00000ad1: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 183788>  # Object: {'t': 'Süßstoffe: welche und wie', 's': 'Süß ohne (fast) Wirkung'}
==> 00000adf: <NewObject>: <Reg8: 4>
==> 00000ae1: <LoadConstString>: <Reg8: 3, string_id: 29516>  # String: 'Süßstoffe (Erythrit, Stevia, Aspartam…) geben Süße mit sehr wenig oder null Kohlenhydraten: Sie heben den Blutzucker nicht wie Zucker. Sie sind ein Weg, ohne die Spitze zu süßen.' (String)
==> 00000ae5: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000ae9: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00000aed: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000af1: <NewObject>: <Reg8: 4>
==> 00000af3: <LoadConstString>: <Reg8: 7, string_id: 22789>  # String: 'Achtung aber beim ganzen Produkt: Ein Dessert „mit Süßstoff“ kann trotzdem Mehl und Fett haben, die wiegen. Der Süßstoff nimmt den Zucker weg, nicht den ganzen Rest.' (String)
==> 00000af7: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000afb: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000aff: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195146>  # Object: {'cibo': 'Erythrit', 'testo': 'Erythrit süßt mit vernachlässigbarer Wirkung auf den Blutzucker: nützlich anstelle von Zucker, aber der Rest des Desserts zählt weiter.'}
==> 00000b0d: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000b11: <NewObject>: <Reg8: 4>
==> 00000b13: <LoadConstString>: <Reg8: 7, string_id: 24377>  # String: 'Der Süßstoff hilft, den Zucker wegzunehmen, aber schau immer aufs ganze Produkt.' (String)
==> 00000b17: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000b1b: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000b1f: <NewObject>: <Reg8: 4>
==> 00000b21: <LoadConstString>: <Reg8: 7, string_id: 24692>  # String: 'EFSA — Süßstoffe (Sicherheit und Verwendung)' (String)
==> 00000b25: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000b29: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000b2d: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000b31: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 39694>  # String: 'dolcificanti' (Identifier)
==> 00000b36: <NewObjectWithBuffer>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt16: 49840, UInt16: 2139>  # Object: {'t': 'Quellen und Methode', 's': 'Woher die Zahlen dieser App kommen'}
==> 00000b40: <NewObject>: <Reg8: 4>
==> 00000b42: <LoadConstString>: <Reg8: 3, string_id: 24503>  # String: 'Die Werte dieser App sind nicht erfunden: Sie stammen aus anerkannten wissenschaftlichen Quellen. Hier welche, damit du sie selbst prüfen kannst.' (String)
==> 00000b46: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000b4a: <NewArray>: <Reg8: 3, UInt16: 10>
==> 00000b4e: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000b52: <NewObject>: <Reg8: 4>
==> 00000b54: <LoadConstString>: <Reg8: 7, string_id: 25611>  # String: 'Glykämischer Index (GI): aus den International Tables of Glycemic Index and Glycemic Load Values (Atkinson, Foster-Powell und Brand-Miller), der weltweiten akademischen Referenz, erstellt von der Forschungsgruppe der Universität Sydney.' (String)
==> 00000b58: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000b5c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000b60: <NewObject>: <Reg8: 4>
==> 00000b62: <LoadConstString>: <Reg8: 7, string_id: 25462>  # String: 'GI-Datenbank der Universität Sydney' (String)
==> 00000b66: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000b6a: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000b6e: <NewObject>: <Reg8: 4>
==> 00000b70: <LoadConstString>: <Reg8: 7, string_id: 13332>  # String: 'International Tables 2021 (Am. J. Clinical Nutrition)' (String)
==> 00000b74: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000b78: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000b7c: <NewObject>: <Reg8: 4>
==> 00000b7e: <LoadConstString>: <Reg8: 7, string_id: 26346>  # String: 'Kohlenhydrate, Eiweiß, Fett und Ballaststoffe: aus den Lebensmittel-Zusammensetzungstabellen des CREA (Forschungszentrum Lebensmittel und Ernährung, Italien) und aus der Datenbank USDA FoodData Central (USA).' (String)
==> 00000b82: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000b86: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000b8a: <NewObject>: <Reg8: 4>
==> 00000b8c: <LoadConstString>: <Reg8: 7, string_id: 23633>  # String: 'CREA · Lebensmittel-Zusammensetzungstabellen' (String)
==> 00000b90: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000b94: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 5>
==> 00000b98: <NewObject>: <Reg8: 4>
==> 00000b9a: <LoadConstString>: <Reg8: 7, string_id: 7954>  # String: 'USDA FoodData Central' (String)
==> 00000b9e: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000ba2: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 6>
==> 00000ba6: <NewObject>: <Reg8: 4>
==> 00000ba8: <LoadConstString>: <Reg8: 8, string_id: 24356>  # String: 'Der GI desselben Lebensmittels ändert sich mit Sorte, Reife und Garung: Deshalb zeigen wir dort, wo er stark variabel ist, ein Intervall und keine einzige Zahl.' (String)
==> 00000bac: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 8, string_id: 243>  # String: 'testo' (Identifier)
==> 00000bb0: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 7>
==> 00000bb4: <NewObject>: <Reg8: 4>
==> 00000bb6: <LoadConstString>: <Reg8: 8, string_id: 30228>  # String: 'Wie wir ein Gericht lesen: Die GLICODEN-Methode schaut auf vier Dinge zugleich: Kohlenhydratmenge, Geschwindigkeit (GI), Gleichgewicht (Ballaststoffe, Eiweiß und Fett, die den Anstieg bremsen) und Zubereitung (Garung). Das Urteil entsteht aus der Gesamtlast, nicht aus dem GI allein.' (String)
==> 00000bba: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 8, string_id: 243>  # String: 'testo' (Identifier)
==> 00000bbe: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 8>
==> 00000bc2: <NewObject>: <Reg8: 4>
==> 00000bc4: <LoadConstString>: <Reg8: 8, string_id: 23491>  # String: 'Bildungsinformation, kein Medizinprodukt und kein medizinischer Rat. Ersetzt nicht die Meinung des Diabetologen oder Ernährungsberaters: Entscheidungen zu Diät, Insulin oder Therapie werden immer mit ihnen abgestimmt.' (String)
==> 00000bc8: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 8, string_id: 243>  # String: 'testo' (Identifier)
==> 00000bcc: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 9>
==> 00000bd0: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000bd4: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 36490>  # String: 'fonti' (Identifier)
==> 00000bd9: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195151>  # Object: {'t': 'Woher die Werte kommen', 's': 'Nicht erfunden: Sie haben eine Quelle'}
==> 00000be7: <NewObject>: <Reg8: 4>
==> 00000be9: <LoadConstString>: <Reg8: 3, string_id: 24483>  # String: 'Die Nährwertdaten (Kalorien, Kohlenhydrate, Zucker, Ballaststoffe) stammen aus offiziellen Datenbanken wie USDA FoodData Central. Der glykämische Index stammt aus den internationalen Tabellen der Fachliteratur.' (String)
==> 00000bed: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000bf1: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000bf5: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000bf9: <NewObject>: <Reg8: 4>
==> 00000bfb: <LoadConstString>: <Reg8: 8, string_id: 23252>  # String: 'Auf jeder Karte siehst du den Status des Werts: „geprüft“ (von Hand gegen die Tabellen verifiziert) oder „Schätzung“. Ein Weg, ehrlich zu sein, was kontrolliert und was ungefähr ist.' (String)
==> 00000bff: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 8, string_id: 243>  # String: 'testo' (Identifier)
==> 00000c03: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000c07: <NewObject>: <Reg8: 4>
==> 00000c09: <LoadConstString>: <Reg8: 8, string_id: 26297>  # String: 'Kein Wert ist erfunden: Jeder hat eine Quelle, und wir sagen dir, wie verlässlich er ist.' (String)
==> 00000c0d: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 8, string_id: 243>  # String: 'testo' (Identifier)
==> 00000c11: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000c15: <NewObject>: <Reg8: 4>
==> 00000c17: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000c1b: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000c1f: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000c23: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 48579>  # String: 'fonti-valori' (Identifier)
==> 00000c28: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195156>  # Object: {'t': 'Warum der GI „in Stufen“ ist', 's': 'Eine exakte Zahl würde täuschen'}
==> 00000c36: <NewObject>: <Reg8: 4>
==> 00000c38: <LoadConstString>: <Reg8: 3, string_id: 24301>  # String: 'Dasselbe Lebensmittel kann je nach Sorte, Reife, Garung und sogar je nach Messenden einen anderen GI haben. Deshalb zeigen wir eine Stufe (Minimum–Mittel–Maximum), keine einzige Zahl: Das wäre falsche Genauigkeit.' (String)
==> 00000c3c: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000c40: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000c44: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000c48: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195161>  # Object: {'cibo': 'Banane', 'testo': 'Die grüne Banane hat einen GI um die 30, reif um die 51. Dieselbe Frucht, anderer GI: Deshalb ist eine Stufe ehrlicher als eine Zahl.'}
==> 00000c56: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000c5a: <NewObject>: <Reg8: 4>
==> 00000c5c: <LoadConstString>: <Reg8: 7, string_id: 24492>  # String: 'Die Stufe ist keine Ungenauigkeit: Sie ist Ehrlichkeit. Die Realität variiert, und wir sagen es dir.' (String)
==> 00000c60: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000c64: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000c68: <NewObject>: <Reg8: 4>
==> 00000c6a: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 00000c6e: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000c72: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000c76: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 32246>  # String: 'ig-fascia' (Identifier)
==> 00000c7b: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195166>  # Object: {'t': 'Die Grenzen des glykämischen Index', 's': 'Jeder reagiert ein bisschen anders'}
==> 00000c89: <NewObject>: <Reg8: 4>
==> 00000c8b: <LoadConstString>: <Reg8: 3, string_id: 24358>  # String: 'Der GI ist ein an Personengruppen gemessener Durchschnitt: sehr nützlich als Kompass, aber die echte Reaktion variiert von Person zu Person. Dasselbe Lebensmittel, zwei Körper, zwei etwas verschiedene Anstiege.' (String)
==> 00000c8f: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000c93: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000c97: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000c9b: <NewObject>: <Reg8: 4>
==> 00000c9d: <LoadConstString>: <Reg8: 7, string_id: 29244>  # String: 'Studien mit kontinuierlichen Sensoren (CGM) haben gezeigt, wie viel individuelle Variabilität es gibt. Deshalb sind GI und Last eine Hilfe zur besseren Wahl, kein mathematisches Gesetz über deinen Körper.' (String)
==> 00000ca1: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000ca5: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000ca9: <NewObject>: <Reg8: 4>
==> 00000cab: <LoadConstString>: <Reg8: 7, string_id: 27833>  # String: 'Nutze den GI als Kompass, nicht als Orakel: Dein Körper hat das letzte Wort.' (String)
==> 00000caf: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000cb3: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000cb7: <NewObject>: <Reg8: 4>
==> 00000cb9: <LoadConstString>: <Reg8: 7, string_id: 30311>  # String: 'Zeevi et al., Cell 2015 — personalisierte glykämische Reaktion' (String)
==> 00000cbd: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000cc1: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000cc5: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000cc9: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 39245>  # String: 'ig-limiti' (Identifier)
==> 00000cce: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195171>  # Object: {'t': 'Studien vs. Anekdoten', 's': 'Wie du dich nicht täuschen lässt'}
==> 00000cdc: <NewObject>: <Reg8: 4>
==> 00000cde: <LoadConstString>: <Reg8: 3, string_id: 31481>  # String: '„Bei mir wirkt es“ ist kein Beweis: Es ist eine Anekdote. Auf einen einzigen Fall können tausend andere Faktoren einwirken. Ein ernsthafter Beweis misst viele Menschen, vergleicht mit einer Kontrollgruppe und wird veröffentlicht.' (String)
==> 00000ce2: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000ce6: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000cea: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000cee: <NewObject>: <Reg8: 4>
==> 00000cf0: <LoadConstString>: <Reg8: 7, string_id: 27407>  # String: 'Misstraue denen, die Wunder oder „das Geheimnis, das dir keiner sagt“ versprechen. Echte Wissenschaft ist vorsichtig, nennt die Quellen und gibt ihre eigenen Grenzen zu.' (String)
==> 00000cf4: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000cf8: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000cfc: <NewObject>: <Reg8: 4>
==> 00000cfe: <LoadConstString>: <Reg8: 7, string_id: 10576>  # String: 'Eine Anekdote ist ein Hinweis, kein Beweis. Wichtige Entscheidungen verdienen echte Quellen.' (String)
==> 00000d02: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000d06: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000d0a: <NewObject>: <Reg8: 4>
==> 00000d0c: <LoadConstString>: <Reg8: 7, string_id: 23036>  # String: 'American Diabetes Association — Diabetes-Aufklärung' (String)
==> 00000d10: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000d14: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000d18: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000d1c: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 46040>  # String: 'studi-aneddoti' (Identifier)
==> 00000d21: <NewObjectWithBuffer>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt16: 49840, UInt16: 2228>  # Object: {'t': 'Warum „bildend, nicht medizinisch“', 's': 'Wir helfen dir zu verstehen, nicht dich zu behandeln'}
==> 00000d2b: <NewObject>: <Reg8: 4>
==> 00000d2d: <LoadConstString>: <Reg8: 3, string_id: 24531>  # String: 'Diese App erklärt, wie Essen den Blutzucker und die Energie bewegen kann. Sie stellt keine Diagnosen, verschreibt keine Therapien, nennt keine Dosen: Das ist die Aufgabe deines Arztes, der deine Situation kennt.' (String)
==> 00000d31: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000d35: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000d39: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000d3d: <NewObject>: <Reg8: 4>
==> 00000d3f: <LoadConstString>: <Reg8: 7, string_id: 24466>  # String: 'Die Fähigkeit, zu verstehen, was du isst, ist für jeden nützlich, mit oder ohne Diabetes. Aber die klinischen Entscheidungen bleiben zwischen dir und deinen Behandelnden.' (String)
==> 00000d43: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000d47: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000d4b: <NewObject>: <Reg8: 4>
==> 00000d4d: <LoadConstString>: <Reg8: 7, string_id: 15053>  # String: 'Mehr zu wissen macht dich bewusster, ersetzt dir aber nicht den Arzt. Das sind zwei verschiedene Dinge, und beide richtig.' (String)
==> 00000d51: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000d55: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000d59: <NewObject>: <Reg8: 4>
==> 00000d5b: <LoadConstString>: <Reg8: 7, string_id: 6148>  # String: 'American Diabetes Association' (String)
==> 00000d5f: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000d63: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000d67: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000d6b: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 47908>  # String: 'non-medico' (Identifier)
==> 00000d70: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195176>  # Object: {'t': 'Die Leitlinien', 's': 'Auf wen wir hören'}
==> 00000d7e: <NewObject>: <Reg8: 4>
==> 00000d80: <LoadConstString>: <Reg8: 3, string_id: 30234>  # String: 'Wir stützen uns auf anerkannte Quellen: die American Diabetes Association (ADA), die europäische Vereinigung (EASD), die Weltgesundheitsorganisation (WHO), die GI-Tabellen der Universität Sydney, die USDA-Daten.' (String)
==> 00000d84: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000d88: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000d8c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000d90: <NewObject>: <Reg8: 4>
==> 00000d92: <LoadConstString>: <Reg8: 7, string_id: 30196>  # String: 'Wenn diese Quellen ihre Empfehlungen aktualisieren, aktualisieren wir uns auch. Wir folgen keinen Moden: Wir folgen den solidesten verfügbaren Belegen.' (String)
==> 00000d96: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000d9a: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000d9e: <NewObject>: <Reg8: 4>
==> 00000da0: <LoadConstString>: <Reg8: 7, string_id: 30232>  # String: 'Wir erfinden die Regeln nicht: Wir übernehmen sie von denen, die echte Forschung betreiben.' (String)
==> 00000da4: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000da8: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000dac: <NewObject>: <Reg8: 4>
==> 00000dae: <LoadConstString>: <Reg8: 7, string_id: 22739>  # String: 'ADA · EASD · WHO (offizielle Leitlinien)' (String)
==> 00000db2: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000db6: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000dba: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000dbe: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 43923>  # String: 'linee-guida' (Identifier)
==> 00000dc3: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195181>  # Object: {'t': 'Wie wir die Daten sauber halten', 's': 'Regeln und Kontrollen, keine Meinungen'}
==> 00000dd1: <NewObject>: <Reg8: 4>
==> 00000dd3: <LoadConstString>: <Reg8: 3, string_id: 24465>  # String: 'Die Einstufung eines Lebensmittels (niedrig/mittel/hoch) entscheidet keine Meinung Eintrag für Eintrag, sondern Regeln, die für alle gleich sind: Ein fast reiner Zucker wird zum Beispiel immer als hohe Wirkung behandelt.' (String)
==> 00000dd7: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000ddb: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000ddf: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000de3: <NewObject>: <Reg8: 4>
==> 00000de5: <LoadConstString>: <Reg8: 7, string_id: 29930>  # String: 'Und jedes Mal, wenn wir einen Wert hinzufügen oder ändern, prüfen automatische Kontrollen, dass alles stimmig ist (die Zahlen, die Stufen, die Reihenfolge des GI). Passt etwas nicht, wird es blockiert, bevor es dich erreicht.' (String)
==> 00000de9: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000ded: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000df1: <NewObject>: <Reg8: 4>
==> 00000df3: <LoadConstString>: <Reg8: 7, string_id: 26309>  # String: 'Klare Regeln + automatische Kontrollen = weniger menschliche Fehler. So halten wir die Verlässlichkeit hoch.' (String)
==> 00000df7: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000dfb: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000dff: <NewObject>: <Reg8: 4>
==> 00000e01: <LoadConstString>: <Reg8: 7, string_id: 29770>  # String: 'USDA FoodData Central · Universität Sydney (GI)' (String)
==> 00000e05: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000e09: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000e0d: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000e11: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 43516>  # String: 'dati-aggiornati' (Identifier)
==> 00000e16: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195186>  # Object: {'t': 'Für dein Ziel essen', 's': 'Abnehmen, halten oder Masse aufbauen'}
==> 00000e24: <NewObject>: <Reg8: 4>
==> 00000e26: <LoadConstString>: <Reg8: 3, string_id: 9680>  # String: 'Dasselbe Lebensmittel kann verschiedenen Zielen dienen. So orientierst du dich, mit dem Blutzucker immer als Kompass.' (String)
==> 00000e2a: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000e2e: <NewArray>: <Reg8: 3, UInt16: 6>
==> 00000e32: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000e36: <NewObject>: <Reg8: 4>
==> 00000e38: <LoadConstString>: <Reg8: 7, string_id: 22760>  # String: 'Abnehmen: Gib dem Körper etwas weniger Energie, als er verbraucht, mit Beständigkeit. Wähle Lebensmittel, die mit wenig Kalorien sättigen, und halte die glykämische Last niedrig, um die Spitzen zu vermeiden, die dich kurz danach wieder hungrig machen.' (String)
==> 00000e3c: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000e40: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000e44: <NewObject>: <Reg8: 4>
==> 00000e46: <NewArrayWithBuffer>: <Reg8: 7, UInt16: 2, UInt16: 2, UInt16: 51627>  # Array: ['Freunde: Gemüse nach Belieben, mageres Eiweiß, griechischer Joghurt, Obst mit niedrigem GI, gemessenes Vollkorn.', 'Einzuschränken: Frittiertes, Süßes und gezuckerte Getränke, raffiniertes Brot und Pasta in reichlichen Portionen.']
==> 00000e4e: <PutNewOwnById>: <Reg8: 4, Reg8: 7, string_id: 34177>  # String: 'voci' (Identifier)
==> 00000e53: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000e57: <NewObject>: <Reg8: 4>
==> 00000e59: <LoadConstString>: <Reg8: 7, string_id: 25725>  # String: 'Halten: Iss ungefähr so viel Energie, wie du verbrauchst, mit Gleichgewicht. Abwechslungsreiche Teller, immer Gemüse, eine Eiweißquelle bei jeder Mahlzeit und Kohlenhydrate vor allem als Vollkorn.' (String)
==> 00000e5d: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000e61: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000e65: <NewObject>: <Reg8: 4>
==> 00000e67: <LoadConstString>: <Reg8: 7, string_id: 27353>  # String: 'Masse aufbauen: Gib etwas mehr Energie, als du verbrauchst, mit genug Eiweiß, verteilt über die Mahlzeiten. Das Essen liefert die Bausteine, das Krafttraining setzt sie an die richtige Stelle. Wähle Qualitätsquellen: eine hohe, dauerhafte Last hilft nicht.' (String)
==> 00000e6b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000e6f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000e73: <NewObject>: <Reg8: 4>
==> 00000e75: <LoadConstString>: <Reg8: 7, string_id: 23489>  # String: 'Bildende Tipps, keine medizinischen Anweisungen. Dein Ziel wählst du im Bereich Fortschritt, und der Wochenbericht gibt dir maßgeschneiderte Vorschläge.' (String)
==> 00000e79: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000e7d: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 5>
==> 00000e81: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000e85: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 35248>  # String: 'obiettivi' (Identifier)
==> 00000e8a: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195191>  # Object: {'t': 'Die Insulinsensitivität', 's': 'Vielleicht das Wichtigste von allem'}
==> 00000e98: <NewObject>: <Reg8: 4>
==> 00000e9a: <LoadConstString>: <Reg8: 3, string_id: 24473>  # String: 'Für einen Diabetiker ist es vielleicht das Wichtigste von allem. Die Insulinsensitivität ist, wie stark deine Zellen auf das Insulin „hören“: Je sensibler du bist, desto weniger Insulin braucht es, um den Zucker in die Zellen zu bringen. Mehr Sensitivität bedeutet stabilere Blutzuckerwerte und weniger Höhen und Tiefen.' (String)
==> 00000e9e: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000ea2: <NewArray>: <Reg8: 3, UInt16: 6>
==> 00000ea6: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000eaa: <NewObject>: <Reg8: 4>
==> 00000eac: <LoadConstString>: <Reg8: 7, string_id: 24369>  # String: 'Der Muskel ist der Schwamm für Zucker: Die Muskeln sind der Ort, wo der Großteil der Glukose landet. Je mehr Muskeln du hast und je mehr du sie nutzt, desto mehr Zucker nehmen sie aus dem Blut auf, auch ohne viel Insulin. Ein trainierter Körper bewältigt dasselbe Gericht mit weniger Mühe.' (String)
==> 00000eb0: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000eb4: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000eb8: <NewObject>: <Reg8: 4>
==> 00000eba: <LoadConstString>: <Reg8: 7, string_id: 29074>  # String: 'Sich nach dem Essen zu bewegen senkt die Spitze: Aktive Muskeln verbrennen die frisch angekommene Glukose. Es ist eines der einfachsten und stärksten Werkzeuge, die du hast.' (String)
==> 00000ebe: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000ec2: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000ec6: <NewObject>: <Reg8: 4>
==> 00000ec8: <LoadConstString>: <Reg8: 7, string_id: 26357>  # String: 'Kraft ändert die Regeln über die Zeit: Muskeln aufzubauen erhöht die Sensitivität für Stunden und Tage danach. Eine Investition, die sich immer auszahlt. Und Beständigkeit schlägt Intensität: Du musst kein Athlet sein.' (String)
==> 00000ecc: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000ed0: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000ed4: <NewObject>: <Reg8: 4>
==> 00000ed6: <NewArrayWithBuffer>: <Reg8: 7, UInt16: 4, UInt16: 4, UInt16: 1506>  # Array: ['Geh 10-15 Minuten nach den Hauptmahlzeiten.', 'Trainiere Kraft 2-3 Mal pro Woche.', 'Beweg dich jeden Tag, wenn auch nur ein wenig.', 'Sei beständig: Die Vorteile summieren sich über die Zeit.']
==> 00000ede: <PutNewOwnById>: <Reg8: 4, Reg8: 7, string_id: 34177>  # String: 'voci' (Identifier)
==> 00000ee3: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000ee7: <NewObject>: <Reg8: 4>
==> 00000ee9: <LoadConstString>: <Reg8: 7, string_id: 26374>  # String: 'Körperliche Aktivität verändert deine Reaktion auf das Insulin. Das sind bildende Tipps, keine medizinischen Anweisungen: Für die Anpassungen sprich mit deinem Arzt.' (String)
==> 00000eed: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000ef1: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 5>
==> 00000ef5: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000ef9: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 39813>  # String: 'sensibilita' (Identifier)
==> 00000efe: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195196>  # Object: {'t': 'Reife und Lagerung', 's': 'Dasselbe Lebensmittel ändert sich über die Zeit'}
==> 00000f0c: <NewObject>: <Reg8: 4>
==> 00000f0e: <LoadConstString>: <Reg8: 3, string_id: 26245>  # String: 'Je reifer eine Frucht, desto mehr wird ihre Stärke zu einfachen Zuckern: Sie steigt schneller. Eine grüne Banane ist „langsamer“ als eine sehr reife. Auch altbackenes oder abgekühltes Brot kann etwas weniger steigen als warmes.' (String)
==> 00000f12: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000f16: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000f1a: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000f1e: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195201>  # Object: {'cibo': 'Banane', 'testo': 'Die grüne Banane hat einen niedrigeren GI als die reife: dieselbe Frucht, verschiedene Geschwindigkeiten je nach Reifegrad.'}
==> 00000f2c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000f30: <NewObject>: <Reg8: 4>
==> 00000f32: <LoadConstString>: <Reg8: 7, string_id: 24381>  # String: 'Der Wert eines Lebensmittels ist nicht fest: Er ändert sich mit Reife und Lagerung. Das ist normal, und die Stufe berücksichtigt es.' (String)
==> 00000f36: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000f3a: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000f3e: <NewObject>: <Reg8: 4>
==> 00000f40: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 00000f44: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000f48: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000f4c: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 36720>  # String: 'maturazione' (Identifier)
==> 00000f51: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195206>  # Object: {'t': 'Der ausgewogene Teller', 's': 'Ein einfaches Modell zum Merken'}
==> 00000f5f: <NewObject>: <Reg8: 4>
==> 00000f61: <LoadConstString>: <Reg8: 3, string_id: 24744>  # String: 'Ein einfacher Weg, eine Mahlzeit mit Bremsen zu bauen: halber Teller Gemüse, ein Viertel Eiweiß (Fleisch, Fisch, Eier, Hülsenfrüchte), ein Viertel Kohlenhydrate (Pasta, Reis, Brot, Kartoffeln).' (String)
==> 00000f65: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000f69: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00000f6d: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000f71: <NewObject>: <Reg8: 4>
==> 00000f73: <LoadConstString>: <Reg8: 6, string_id: 29122>  # String: 'So bremsen die Ballaststoffe des Gemüses und das Eiweiß die Aufnahme der Kohlenhydrate, und der Anstieg wird sanft. Es ist keine starre Regel: Es ist ein Kompass fürs Auge.' (String)
==> 00000f77: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 00000f7b: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000f7f: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195211>  # Object: {'cibo': 'Linsen gekocht', 'testo': 'Hülsenfrüchte sind Kohlenhydrat UND Eiweiß zugleich: ein hervorragender „Baustein“ des ausgewogenen Tellers.'}
==> 00000f8d: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000f91: <NewObject>: <Reg8: 4>
==> 00000f93: <LoadConstString>: <Reg8: 6, string_id: 25722>  # String: 'Halb Gemüse, ein Viertel Eiweiß, ein Viertel Kohlenhydrate: Ein solcher Teller hat die Bremsen schon drin.' (String)
==> 00000f97: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 00000f9b: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000f9f: <NewObject>: <Reg8: 4>
==> 00000fa1: <LoadConstString>: <Reg8: 6, string_id: 23107>  # String: 'American Diabetes Association — Teller-Methode' (String)
==> 00000fa5: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 00000fa9: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000fad: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000fb1: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 34138>  # String: 'piatto-bilanciato' (Identifier)
==> 00000fb6: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195216>  # Object: {'t': 'Das Abendessen: die Lasten am Abend', 's': 'Es ist nicht die Uhrzeit, es ist die Gesamtmenge'}
==> 00000fc4: <NewObject>: <Reg8: 4>
==> 00000fc6: <LoadConstString>: <Reg8: 3, string_id: 22756>  # String: 'Abends neigt man dazu, mehr zu essen und sich weniger zu bewegen. Man muss die Kohlenhydrate nicht weglassen: Es braucht eine vernünftige Portion, Gemüse auf dem Teller und vielleicht einen Spaziergang danach.' (String)
==> 00000fca: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000fce: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00000fd2: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000fd6: <NewObject>: <Reg8: 4>
==> 00000fd8: <LoadConstString>: <Reg8: 6, string_id: 24756>  # String: 'Ein zu üppiges Abendessen auf einen schon mit Süßem vollen Magen wiegt; ein ausgewogenes Abendessen, auch mit Pasta, geht sehr gut. Es zählt die Tagesgesamtmenge, nicht die Uhr.' (String)
==> 00000fdc: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 00000fe0: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000fe4: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195221>  # Object: {'cibo': 'Bissfeste Pasta', 'testo': 'Bissfeste Pasta, Gemüse davor, richtige Portion und ein paar Schritte danach: ein entspanntes Abendessen.'}
==> 00000ff2: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000ff6: <NewObject>: <Reg8: 4>
==> 00000ff8: <LoadConstString>: <Reg8: 6, string_id: 30060>  # String: 'Verteufle das Abendessen nicht: Gleiche es aus. Es ist die Tagesgesamtmenge, die zählt.' (String)
==> 00000ffc: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 00001000: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00001004: <NewObject>: <Reg8: 4>
==> 00001006: <LoadConstString>: <Reg8: 6, string_id: 23068>  # String: 'American Diabetes Association — Mahlzeiten planen' (String)
==> 0000100a: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 0000100e: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00001012: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00001016: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 35100>  # String: 'cena' (Identifier)
==> 0000101b: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195226>  # Object: {'t': 'Aus deinem Tagebuch lernen', 's': 'Deine Muster sagst du dir selbst'}
==> 00001029: <NewObject>: <Reg8: 4>
==> 0000102b: <LoadConstString>: <Reg8: 3, string_id: 23257>  # String: 'Aufzuschreiben, was du isst, auch nur für ein paar Tage, bringt Muster ans Licht, die du aus dem Gedächtnis nicht siehst: welche Mahlzeiten dir Energie lassen und welche dich mitten am Tag abstürzen lassen.' (String)
==> 0000102f: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00001033: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00001037: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 0000103b: <NewObject>: <Reg8: 4>
==> 0000103d: <LoadConstString>: <Reg8: 6, string_id: 24579>  # String: 'Du brauchst keine Perfektion: Du brauchst Beständigkeit. Ein paar ehrliche Notizen sind mehr wert als ein perfektes Tagebuch für einen Tag. Mit der Zeit verstehst du, was für DICH funktioniert.' (String)
==> 00001041: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 00001045: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00001049: <NewObject>: <Reg8: 4>
==> 0000104b: <LoadConstString>: <Reg8: 6, string_id: 9808>  # String: 'Der beste Lehrer bist du: Deine Muster, aufgeschrieben, lehren dich mehr als jede allgemeine Regel.' (String)
==> 0000104f: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 00001053: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00001057: <NewObject>: <Reg8: 4>
==> 00001059: <LoadConstString>: <Reg8: 6, string_id: 23039>  # String: 'American Diabetes Association — Ein Ernährungstagebuch führen' (String)
==> 0000105d: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 00001061: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00001065: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00001069: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 43945>  # String: 'diario-schemi' (Identifier)
==> 0000106e: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195231>  # Object: {'t': 'Im Voraus vorbereiten', 's': 'Eile ist der Feind guter Entscheidungen'}
==> 0000107c: <NewObject>: <Reg8: 4>
==> 0000107e: <LoadConstString>: <Reg8: 3, string_id: 30198>  # String: 'Wenn du hungrig und in Eile bist, wählst du das schnellste Essen, das oft auch das „schnellste“ für den Blutzucker ist. Etwas schon Fertiges und Ausgewogenes zu haben dreht die Lage um.' (String)
==> 00001082: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00001086: <NewArray>: <Reg8: 3, UInt16: 4>
==> 0000108a: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 0000108e: <NewObject>: <Reg8: 4>
==> 00001090: <LoadConstString>: <Reg8: 6, string_id: 26317>  # String: 'Koch Hülsenfrüchte oder Getreide im Voraus, halte gewaschenes Gemüse und Nüsse griffbereit: Kleine Vorräte reichen, um die richtige Wahl auch in Eile leicht zu machen.' (String)
==> 00001094: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 00001098: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000109c: <NewObject>: <Reg8: 4>
==> 0000109e: <LoadConstString>: <Reg8: 6, string_id: 10062>  # String: 'Die gute Wahl wird vorher vorbereitet: Ist sie fertig, legt dich die Eile nicht herein.' (String)
==> 000010a2: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 000010a6: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000010aa: <NewObject>: <Reg8: 4>
==> 000010ac: <LoadConstString>: <Reg8: 6, string_id: 23069>  # String: 'American Diabetes Association — Meal Prep' (String)
==> 000010b0: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 000010b4: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000010b8: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000010bc: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 42253>  # String: 'meal-prep' (Identifier)
==> 000010c1: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195236>  # Object: {'t': '„Light“-Lebensmittel und Marketing', 's': 'Der große Aufdruck, die kleine Wahrheit'}
==> 000010cf: <NewObject>: <Reg8: 4>
==> 000010d1: <LoadConstString>: <Reg8: 3, string_id: 31487>  # String: '„Light“, „fit“, „proteinreich“, „ohne“: Das sind Wörter, die verkaufen, keine Garantien. Ein „fettarmes“ Produkt kann mehr Zucker haben; ein „proteinreiches“ kann trotzdem reich an Kohlenhydraten sein.' (String)
==> 000010d5: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000010d9: <NewArray>: <Reg8: 3, UInt16: 4>
==> 000010dd: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000010e1: <NewObject>: <Reg8: 4>
==> 000010e3: <LoadConstString>: <Reg8: 6, string_id: 24382>  # String: 'Der einzige Weg, es zu wissen, ist das Produkt umzudrehen und die Tabelle zu lesen: Kohlenhydrate, davon Zucker, Ballaststoffe und die echte Portion. Der große Aufdruck ist Werbung.' (String)
==> 000010e7: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 000010eb: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000010ef: <NewObject>: <Reg8: 4>
==> 000010f1: <LoadConstString>: <Reg8: 6, string_id: 29695>  # String: 'Trau dem Wort auf der Vorderseite nicht: Die Wahrheit steht in der Tabelle auf der Rückseite.' (String)
==> 000010f5: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 000010f9: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000010fd: <NewObject>: <Reg8: 4>
==> 000010ff: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 00001103: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00001107: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000110b: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 37120>  # String: 'mito-light' (Identifier)
==> 00001110: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 98055>  # Object: {'t': '„Fett hebt den Blutzucker“?', 's': 'Allein kaum, aber es ändert den Rhythmus'}
==> 0000111e: <NewObject>: <Reg8: 4>
==> 00001120: <LoadConstString>: <Reg8: 3, string_id: 25299>  # String: 'Fett allein hebt den Blutzucker sehr wenig: Es ist kein Zucker. Im Gegenteil, zusammen mit den Kohlenhydraten bremst es sie und senkt die sofortige Spitze — es ist eine der „Bremsen“.' (String)
==> 00001124: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00001128: <NewArray>: <Reg8: 3, UInt16: 5>
==> 0000112c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00001130: <NewObject>: <Reg8: 4>
==> 00001132: <LoadConstString>: <Reg8: 5, string_id: 24527>  # String: 'Die Überraschung: viel Fett zusammen mit vielen Kohlenhydraten (fette Süßspeisen, Frittiertes, Pizza) verlängert den Anstieg über die Zeit — die „zweite Welle“. Es bremst die Spitze, aber verlängert den Ausläufer.' (String)
==> 00001136: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000113a: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000113e: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 195241>  # Object: {'cibo': 'Walnüsse', 'testo': 'Walnüsse sind fast nur gute Fette: Allein haben sie eine vernachlässigbare Wirkung, und neben einem Kohlenhydrat bremsen sie es.'}
==> 0000114c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00001150: <NewObject>: <Reg8: 4>
==> 00001152: <LoadConstString>: <Reg8: 5, string_id: 25300>  # String: 'Fett ist kein Zucker: Allein wiegt es wenig, aber mit vielen Kohlenhydraten verlängert es den Anstieg.' (String)
==> 00001156: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000115a: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000115e: <NewObject>: <Reg8: 4>
==> 00001160: <LoadConstString>: <Reg8: 5, string_id: 23525>  # String: 'Wolpert et al., Diabetes Care 2013 — Fett und Blutzucker' (String)
==> 00001164: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 00001168: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 0000116c: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00001170: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 41465>  # String: 'mito-grassi' (Identifier)
==> 00001175: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 195246>  # Object: {'t': 'Stress, Schlaf und Blutzucker', 's': 'Es zählt nicht nur der Teller'}
==> 00001183: <NewObject>: <Reg8: 4>
==> 00001185: <LoadConstString>: <Reg8: 3, string_id: 24352>  # String: 'Der Blutzucker reagiert nicht nur auf Essen. Stress und wenig Schlaf können ihn beeinflussen: Der Körper, unter Druck oder müde, handhabt den Zucker anders. Es ist nicht deine Schuld, es ist Physiologie.' (String)
==> 00001189: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000118d: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00001191: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00001195: <NewObject>: <Reg8: 4>
==> 00001197: <LoadConstString>: <Reg8: 5, string_id: 24423>  # String: 'Deshalb „verhält“ sich dieselbe Mahlzeit an verschiedenen Tagen manchmal anders. Ruhe und Stressbewältigung sind kein Luxus: Sie gehören zum Bild.' (String)
==> 0000119b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000119f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000011a3: <NewObject>: <Reg8: 4>
==> 000011a5: <LoadConstString>: <Reg8: 5, string_id: 30200>  # String: 'Wenn ein Tag „nicht aufgeht“, ist es nicht zwangsläufig das Essen: Schlaf und Stress zählen. Das sind bildende, keine medizinischen Anmerkungen.' (String)
==> 000011a9: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000011ad: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000011b1: <NewObject>: <Reg8: 4>
==> 000011b3: <LoadConstString>: <Reg8: 5, string_id: 23105>  # String: 'American Diabetes Association — Stress und Schlaf' (String)
==> 000011b7: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 000011bb: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000011bf: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000011c3: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 49064>  # String: 'stress-sonno' (Identifier)
==> 000011c8: <NewObjectWithBuffer>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt16: 49840, UInt16: 1741>  # Object: {'t': 'Was eine verlässliche Quelle ist', 's': 'Wie du sie in 3 Schritten erkennst'}
==> 000011d2: <NewObject>: <Reg8: 4>
==> 000011d4: <LoadConstString>: <Reg8: 3, string_id: 24773>  # String: 'Eine verlässliche Quelle: 1) ist veröffentlicht und überprüfbar (eine Institution, eine wissenschaftliche Zeitschrift, kein anonymer Post); 2) zitiert andere Studien; 3) gibt ihre eigenen Grenzen zu, statt absolute Gewissheiten zu versprechen.' (String)
==> 000011d8: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000011dc: <NewArray>: <Reg8: 3, UInt16: 4>
==> 000011e0: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000011e4: <NewObject>: <Reg8: 4>
==> 000011e6: <LoadConstString>: <Reg8: 5, string_id: 27406>  # String: 'Misstraue dem Gegenteil: keine Quelle, ein Ton wie „enthülltes Geheimnis“, wundersame Versprechen und keine Möglichkeit zu prüfen, woher die Information kommt.' (String)
==> 000011ea: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000011ee: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000011f2: <NewObject>: <Reg8: 4>
==> 000011f4: <LoadConstString>: <Reg8: 5, string_id: 25386>  # String: 'Frag dich immer: Wer sagt es, worauf stützt es sich, und kann ich es überprüfen? Findest du keine Antwort, setz das Urteil aus.' (String)
==> 000011f8: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000011fc: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00001200: <NewObject>: <Reg8: 4>
==> 00001202: <LoadConstString>: <Reg8: 5, string_id: 30143>  # String: 'WHO — Verlässliche Gesundheitsinformation' (String)
==> 00001206: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 0000120a: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000120e: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00001212: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 54177>  # String: 'fonte-affidabile' (Identifier)
==> 00001217: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 130601>  # Object: {'t': 'Häufige Fragen', 's': 'Die kurzen Antworten, mit den Grundlagen'}
==> 00001225: <NewObject>: <Reg8: 4>
==> 00001227: <LoadConstString>: <Reg8: 3, string_id: 31489>  # String: '„Muss ich Kohlenhydrate weglassen?“ Nein: Sie sind Energie. Du lernst WELCHE und WIE VIELE. „Ist Obst verboten?“ Nein, ganz besser als Saft. „Süßes nie?“ Nein: nach einer Mahlzeit und in gemessener Portion.' (String)
==> 0000122b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000122f: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00001233: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00001237: <NewObject>: <Reg8: 4>
==> 00001239: <LoadConstString>: <Reg8: 5, string_id: 31480>  # String: '„Behandelt mich die App?“ Nein: Sie ist bildend, nicht medizinisch. „Sind die Werte verlässlich?“ Sie haben eine Quelle und einen Status (geprüft/Schätzung), und automatische Kontrollen halten die Daten stimmig.' (String)
==> 0000123d: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00001241: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00001245: <NewObject>: <Reg8: 4>
==> 00001247: <LoadConstString>: <Reg8: 5, string_id: 10025>  # String: 'Die Regel, die alles zusammenfasst: Kein Lebensmittel ist absolut verboten, fast immer ist es eine Frage von welchen, wie vielen und wie.' (String)
==> 0000124b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000124f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00001253: <NewObject>: <Reg8: 4>
==> 00001255: <LoadConstString>: <Reg8: 5, string_id: 23061>  # String: 'American Diabetes Association — Häufige Fragen' (String)
==> 00001259: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 0000125d: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00001261: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00001265: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 47721>  # String: 'faq' (Identifier)
==> 0000126a: <StoreToEnvironment>: <Reg8: 1, UInt8: 0, Reg8: 0>
==> 0000126e: <LoadConstUndefined>: <Reg8: 0>
==> 00001270: <Ret>: <Reg8: 0>


===============

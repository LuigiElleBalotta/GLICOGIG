
==== Falling back to Disassembly ====
=> [Function #19714 "" of 4730 bytes]: 8 params, frame size=19, strict=1, exc handler=0, debug info=0  @ offset 0x004ff9db

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
==> 00000036: <CreateClosure>: <Reg8: 0, Reg8: 1, function_id: 19715>  # Function: [#19715 get of 9 bytes]: 1 params @ offset 0x002e8262
==> 0000003b: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 0, string_id: 133>  # String: 'get' (Identifier)
==> 0000003f: <LoadConstString>: <Reg8: 0, string_id: 36645>  # String: 'LEARN_ES' (Identifier)
==> 00000043: <Call4>: <Reg8: 0, Reg8: 3, Reg8: 4, Reg8: 5, Reg8: 0, Reg8: 2>
==> 0000004a: <NewObject>: <Reg8: 0>
==> 0000004c: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194622>  # Object: {'t': 'Qué es la glucosa en sangre', 's': 'No es cosa solo de diabéticos'}
==> 0000005a: <NewObject>: <Reg8: 4>
==> 0000005c: <LoadConstString>: <Reg8: 3, string_id: 26571>  # String: 'La glucosa en sangre es sencillamente la cantidad de azúcar (glucosa) que hay en la sangre. La tenemos todos, siempre: es el combustible que da energía al cuerpo y al cerebro.' (String)
==> 00000060: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000064: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000068: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 0000006c: <NewObject>: <Reg8: 4>
==> 0000006e: <LoadConstString>: <Reg8: 5, string_id: 24094>  # String: 'Cuando comes, la glucosa sube; luego vuelve a bajar. Si sube despacio y baja despacio, tienes energía constante. Si se dispara y luego se desploma, llegan el cansancio y el hambre poco después de comer.' (String)
==> 00000072: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000076: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000007a: <NewObject>: <Reg8: 4>
==> 0000007c: <LoadConstString>: <Reg8: 5, string_id: 25159>  # String: 'Esta app no habla de enfermedades ni de tratamientos. Habla de cómo la comida mueve tu energía: algo útil para cualquiera que quiera comer mejor.' (String)
==> 00000080: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000084: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000088: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 182115>  # Object: {'cibo': 'Pan blanco', 'testo': 'Una rebanada de pan blanco sube la glucosa deprisa. No está “prohibido”: es solo una información para elegir cuándo y con qué comerlo.'}
==> 00000096: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000009a: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000009e: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 32974>  # String: 'glicemia' (Identifier)
==> 000000a3: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194627>  # Object: {'t': 'Índice glucémico: la velocidad', 's': 'Con qué rapidez un alimento sube la glucosa'}
==> 000000b1: <NewObject>: <Reg8: 4>
==> 000000b3: <LoadConstString>: <Reg8: 3, string_id: 24955>  # String: 'El índice glucémico (IG) mide con qué RAPIDEZ un alimento sube la glucosa, en una escala de 0 a 100. Alto significa rápido, bajo significa lento.' (String)
==> 000000b7: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000000bb: <NewArray>: <Reg8: 3, UInt16: 4>
==> 000000bf: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000000c3: <NewObject>: <Reg8: 4>
==> 000000c5: <LoadConstString>: <Reg8: 5, string_id: 28118>  # String: 'Pero por sí solo no basta, porque no dice CUÁNTO comes. Un IG alto en una porción pequeña cuenta poco.' (String)
==> 000000c9: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000000cd: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000000d1: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 182360>  # Object: {'cibo': 'Plátano', 'testo': 'El plátano cambia de IG con la maduración: verde ronda los 30, maduro ronda los 51. La misma fruta, dos velocidades distintas.'}
==> 000000df: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000000e3: <NewObject>: <Reg8: 4>
==> 000000e5: <LoadConstString>: <Reg8: 5, string_id: 24814>  # String: 'El IG es la foto de la velocidad, no de la cantidad. Para el impacto real hace falta la carga glucémica, el próximo capítulo.' (String)
==> 000000e9: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000000ed: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000000f1: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000000f5: <PutNewOwnByIdShort>: <Reg8: 0, Reg8: 2, string_id: 31>  # String: 'ig' (Identifier)
==> 000000f9: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 182436>  # Object: {'t': 'Carga glucémica: el impacto real', 's': 'El número más útil de todos'}
==> 00000107: <NewObject>: <Reg8: 4>
==> 00000109: <LoadConstString>: <Reg8: 3, string_id: 26471>  # String: 'La carga glucémica (CG) une dos cosas: la velocidad (el IG) y cuántos carbohidratos hay de verdad en la porción. Es el número más útil para entender un plato.' (String)
==> 0000010d: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000111: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00000115: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000119: <NewObject>: <Reg8: 4>
==> 0000011b: <LoadConstString>: <Reg8: 5, string_id: 26747>  # String: 'Las franjas, por porción, son: baja hasta 10, media de 11 a 19, alta de 20 en adelante. En la app la ves como una barra con un indicador.' (String)
==> 0000011f: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000123: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000127: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 194632>  # Object: {'cibo': 'Sandía', 'testo': 'La sandía tiene un IG alto (~76) y a primera vista parece un problema. Pero es casi toda agua: una porción tiene pocos carbohidratos, así que su carga se mantiene baja. Por eso cuenta la porción, no solo el IG.'}
==> 00000135: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000139: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 182583>  # Object: {'cibo': 'Pan blanco', 'testo': 'El pan blanco, en cambio, tiene IG alto Y carga alta: aquí el impacto es real.'}
==> 00000147: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000014b: <NewObject>: <Reg8: 4>
==> 0000014d: <LoadConstString>: <Reg8: 5, string_id: 28726>  # String: 'Regla de oro: cuando miras un alimento en la app, mira la carga (la barra), no solo el índice glucémico.' (String)
==> 00000151: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000155: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000159: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000015d: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 32303>  # String: 'cg' (Identifier)
==> 00000162: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194637>  # Object: {'t': 'Fibra, grasas y proteínas: los frenos', 's': 'Por qué un plato completo es mejor'}
==> 00000170: <NewObject>: <Reg8: 4>
==> 00000172: <LoadConstString>: <Reg8: 3, string_id: 27135>  # String: 'Los carbohidratos solos suben deprisa. Pero si en el plato hay también fibra, grasas y proteínas, la subida se ralentiza: son los frenos naturales de la glucosa.' (String)
==> 00000176: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000017a: <NewArray>: <Reg8: 3, UInt16: 4>
==> 0000017e: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000182: <NewObject>: <Reg8: 4>
==> 00000184: <NewArrayWithBuffer>: <Reg8: 5, UInt16: 3, UInt16: 3, UInt16: 51537>  # Array: ['Fibra (verduras, legumbres, integrales): ralentiza la subida y sacia.', 'Proteínas (huevos, pescado, carne, legumbres): alargan la digestión.', 'Grasas buenas (aceite de oliva, frutos secos): ralentizan el vaciado del estómago.']
==> 0000018c: <PutNewOwnById>: <Reg8: 4, Reg8: 5, string_id: 34177>  # String: 'voci' (Identifier)
==> 00000191: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000195: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 194642>  # Object: {'cibo': 'Lentejas cocidas', 'testo': 'Las lentejas unen fibra y proteína: carga baja y subida lenta y prolongada. Un carbohidrato que libera energía poco a poco.'}
==> 000001a3: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000001a7: <NewObject>: <Reg8: 4>
==> 000001a9: <LoadConstString>: <Reg8: 5, string_id: 27453>  # String: 'Moraleja: un plato completo casi siempre gana a un carbohidrato solo. No quites, añade.' (String)
==> 000001ad: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000001b1: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000001b5: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000001b9: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 35354>  # String: 'freni' (Identifier)
==> 000001be: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 150324>  # Object: {'t': 'Carbohidratos: cuáles y cuántos', 's': 'Son los que más mueven la glucosa'}
==> 000001cc: <NewObject>: <Reg8: 4>
==> 000001ce: <LoadConstString>: <Reg8: 3, string_id: 27136>  # String: 'Los carbohidratos son la energía de los alimentos: pan, pasta, arroz, patatas, fruta, legumbres, azúcar. Son la parte de la comida que más sube la glucosa; las proteínas y las grasas mucho menos.' (String)
==> 000001d2: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000001d6: <NewArray>: <Reg8: 3, UInt16: 5>
==> 000001da: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000001de: <NewObject>: <Reg8: 4>
==> 000001e0: <LoadConstString>: <Reg8: 5, string_id: 28117>  # String: 'Pero no son todos iguales. Cuentan dos cosas: CUÁLES (refinados y rápidos, o integrales y con fibra) y CUÁNTOS (la porción). Un carbohidrato “bueno” en porción enorme pesa igual; uno “rápido” en poca cantidad pesa poco.' (String)
==> 000001e4: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000001e8: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000001ec: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 182605>  # Object: {'cibo': 'Arroz blanco cocido', 'testo': 'El arroz blanco es un carbohidrato refinado: sube deprisa. El arroz integral, con más fibra, sube más despacio. Mismo cereal, dos velocidades.'}
==> 000001fa: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000001fe: <NewObject>: <Reg8: 4>
==> 00000200: <LoadConstString>: <Reg8: 5, string_id: 27134>  # String: 'Los carbohidratos no son el enemigo: son energía. El juego está en elegir CUÁLES y regular CUÁNTOS.' (String)
==> 00000204: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000208: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000020c: <NewObject>: <Reg8: 4>
==> 0000020e: <LoadConstString>: <Reg8: 5, string_id: 23022>  # String: 'American Diabetes Association — Carbohidratos' (String)
==> 00000212: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 00000216: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 0000021a: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000021e: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 32042>  # String: 'carboidrati' (Identifier)
==> 00000223: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194647>  # Object: {'t': 'Azúcares simples vs complejos', 's': 'Rápidos o lentos, pero con alguna sorpresa'}
==> 00000231: <NewObject>: <Reg8: 4>
==> 00000233: <LoadConstString>: <Reg8: 3, string_id: 27133>  # String: 'Los azúcares simples (azúcar, miel, zumos) suelen llegar deprisa. Los carbohidratos complejos (los almidones del pan, la pasta, el arroz) suelen llegar más despacio, porque el cuerpo tiene que “desmontarlos”.' (String)
==> 00000237: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000023b: <NewArray>: <Reg8: 3, UInt16: 5>
==> 0000023f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000243: <NewObject>: <Reg8: 4>
==> 00000245: <LoadConstString>: <Reg8: 5, string_id: 26701>  # String: 'La sorpresa: “complejo” no significa automáticamente “lento”. El pan blanco es un almidón complejo pero sube rapidísimo. Lo que cuenta de verdad es la velocidad medida (el índice glucémico) más la cantidad.' (String)
==> 00000249: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000024d: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000251: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 182676>  # Object: {'cibo': 'Zumo de naranja', 'testo': 'El zumo es azúcar simple líquido: sube deprisa. La naranja entera, con su fibra, mucho más despacio. La misma fruta, formas distintas.'}
==> 0000025f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000263: <NewObject>: <Reg8: 4>
==> 00000265: <LoadConstString>: <Reg8: 5, string_id: 31464>  # String: '“Simple” y “complejo” son una etiqueta a grandes rasgos. La brújula de verdad sigue siendo IG + carga glucémica.' (String)
==> 00000269: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000026d: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000271: <NewObject>: <Reg8: 4>
==> 00000273: <LoadConstString>: <Reg8: 5, string_id: 27876>  # String: 'OMS — Directrices sobre azúcares libres (OMS, 2015)' (String)
==> 00000277: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 0000027b: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 0000027f: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000283: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 32785>  # String: 'zuccheri' (Identifier)
==> 00000288: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194652>  # Object: {'t': 'Las porciones: la cantidad cuenta', 's': 'La mitad de la historia es cuánto comes'}
==> 00000296: <NewObject>: <Reg8: 4>
==> 00000298: <LoadConstString>: <Reg8: 3, string_id: 29791>  # String: 'Un alimento rápido (IG alto) en porción pequeña pesa poco. Un alimento lento en porción enorme puede pesar bastante. La velocidad por sí sola no basta: hace falta la cantidad.' (String)
==> 0000029c: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000002a0: <NewArray>: <Reg8: 3, UInt16: 5>
==> 000002a4: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000002a8: <NewObject>: <Reg8: 4>
==> 000002aa: <LoadConstString>: <Reg8: 5, string_id: 25106>  # String: 'Es exactamente la carga glucémica: velocidad × cantidad de carbohidratos de la porción. Por eso en la app puedes cambiar los gramos y ver cómo se adapta el impacto.' (String)
==> 000002ae: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000002b2: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000002b6: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 184332>  # Object: {'cibo': 'Plátano', 'testo': 'Un plátano pequeño tiene una carga contenida; dos plátanos grandes cambian la cosa. La misma fruta, impacto distinto según cuánto.'}
==> 000002c4: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000002c8: <NewObject>: <Reg8: 4>
==> 000002ca: <LoadConstString>: <Reg8: 5, string_id: 27625>  # String: 'Ningún alimento hay que temerlo en absoluto: casi siempre es una cuestión de porción.' (String)
==> 000002ce: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000002d2: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000002d6: <NewObject>: <Reg8: 4>
==> 000002d8: <LoadConstString>: <Reg8: 6, string_id: 23401>  # String: 'Universidad de Sídney — Base de datos del índice glucémico' (String)
==> 000002dc: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 000002e0: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 000002e4: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000002e8: <PutNewOwnByIdShort>: <Reg8: 0, Reg8: 2, string_id: 206>  # String: 'porzioni' (Identifier)
==> 000002ec: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194657>  # Object: {'t': 'Cocido vs crudo', 's': 'La cocción cambia el impacto'}
==> 000002fa: <NewObject>: <Reg8: 4>
==> 000002fc: <LoadConstString>: <Reg8: 3, string_id: 24207>  # String: 'Cómo cocinas un alimento cambia su velocidad. La pasta al dente sube más despacio que la pasada. Las patatas y el arroz enfriados forman “almidón resistente” y pesan un poco menos que cuando están calientes.' (String)
==> 00000300: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000304: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00000308: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 0000030c: <NewObject>: <Reg8: 4>
==> 0000030e: <LoadConstString>: <Reg8: 5, string_id: 24126>  # String: 'Cuidado también con el peso: los cereales y las legumbres en crudo absorben agua y “crecen” al cocer. 100 g de pasta cruda se convierten en muchos más gramos ya cocida, con muchos más carbohidratos.' (String)
==> 00000312: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000316: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000031a: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 194662>  # Object: {'cibo': 'Pasta cocida al dente', 'testo': 'La pasta al dente es uno de los trucos más sencillos: la misma pasta, subida más suave que la misma pasada.'}
==> 00000328: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 0000032c: <NewObject>: <Reg8: 4>
==> 0000032e: <LoadConstString>: <Reg8: 5, string_id: 22926>  # String: 'Al dente y enfriar son pequeños gestos que bajan el impacto, sin quitar nada del plato.' (String)
==> 00000332: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000336: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000033a: <NewObject>: <Reg8: 4>
==> 0000033c: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 00000340: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000344: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000348: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 35628>  # String: 'cotto-crudo' (Identifier)
==> 0000034d: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194667>  # Object: {'t': 'Líquidos vs sólidos', 's': 'Por qué el zumo no es como la fruta'}
==> 0000035b: <NewObject>: <Reg8: 4>
==> 0000035d: <LoadConstString>: <Reg8: 3, string_id: 24890>  # String: 'El mismo azúcar, bebido, llega más deprisa que comido. Un zumo o un refresco no tienen fibra que masticar y se absorben en un momento: subida rápida. La fruta entera, con su fibra, frena.' (String)
==> 00000361: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000365: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000369: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 0000036d: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 185422>  # Object: {'cibo': 'Zumo de naranja', 'testo': 'Un vaso de zumo encierra el azúcar de varias naranjas, sin su fibra. La naranja entera sacia más y sube más despacio.'}
==> 0000037b: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000037f: <NewObject>: <Reg8: 4>
==> 00000381: <LoadConstString>: <Reg8: 5, string_id: 17837>  # String: 'Regla sencilla: mejor la fruta entera que su zumo, y para quitar la sed, agua.' (String)
==> 00000385: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000389: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 0000038d: <NewObject>: <Reg8: 4>
==> 0000038f: <LoadConstString>: <Reg8: 5, string_id: 23012>  # String: 'American Diabetes Association — Bebidas y azúcares' (String)
==> 00000393: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 00000397: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000039b: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000039f: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 38529>  # String: 'liquidi-solidi' (Identifier)
==> 000003a4: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194672>  # Object: {'t': 'Leer la etiqueta', 's': 'Los 3 números que cuentan de verdad'}
==> 000003b2: <NewObject>: <Reg8: 4>
==> 000003b4: <LoadConstString>: <Reg8: 3, string_id: 24999>  # String: 'En la etiqueta, para la glucosa mira sobre todo: los CARBOHIDRATOS (y “de los cuales azúcares”), la FIBRA (cuanta más haya, más frena) y la PORCIÓN real que comes.' (String)
==> 000003b8: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000003bc: <NewArray>: <Reg8: 3, UInt16: 4>
==> 000003c0: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000003c4: <NewObject>: <Reg8: 4>
==> 000003c6: <LoadConstString>: <Reg8: 5, string_id: 27898>  # String: 'Ojo con los trucos: “sin azúcar” puede tener muchas grasas o edulcorantes; los valores suelen ser por 100 g, no por porción: lee bien cuántos gramos comes de verdad.' (String)
==> 000003ca: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000003ce: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000003d2: <NewObject>: <Reg8: 4>
==> 000003d4: <LoadConstString>: <Reg8: 5, string_id: 24897>  # String: 'El número más útil para la glucosa es “carbohidratos, de los cuales azúcares” en relación con tu porción. El resto es acompañamiento.' (String)
==> 000003d8: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000003dc: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000003e0: <NewObject>: <Reg8: 4>
==> 000003e2: <LoadConstString>: <Reg8: 5, string_id: 24686>  # String: 'EFSA — Etiquetado nutricional (Reg. UE 1169/2011)' (String)
==> 000003e6: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 000003ea: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000003ee: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000003f2: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 34144>  # String: 'etichetta' (Identifier)
==> 000003f7: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194677>  # Object: {'t': 'El Método [SOURCE_BRAND]', 's': 'Leer cada plato con 4 preguntas'}
==> 00000405: <NewObject>: <Reg8: 4>
==> 00000407: <LoadConstString>: <Reg8: 3, string_id: 27637>  # String: 'No hace falta aprenderse de memoria mil alimentos. Basta mirar cada plato con 4 preguntas siempre iguales: es el Método [SOURCE_BRAND]. Las encuentras en cada ficha de la app.' (String)
==> 0000040b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000040f: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000413: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000417: <NewObject>: <Reg8: 4>
==> 00000419: <NewArrayWithBuffer>: <Reg8: 5, UInt16: 4, UInt16: 4, UInt16: 51544>  # Array: ['Cantidad: ¿cuántos carbohidratos hay en la porción? Es el factor que más pesa.', 'Velocidad: ¿con qué rapidez suben, es decir, el índice glucémico?', 'Equilibrio: ¿hay fibra, proteínas o grasas que hagan de freno?', 'Preparación: ¿cómo está cocido o procesado (al dente, integral, frito)?']
==> 00000421: <PutNewOwnById>: <Reg8: 4, Reg8: 5, string_id: 34177>  # String: 'voci' (Identifier)
==> 00000426: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000042a: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 194682>  # Object: {'cibo': 'Espaguetis al dente', 'testo': 'Espaguetis al dente: cantidad de carbohidratos media, velocidad baja (el al dente frena), equilibrio por completar con la salsa, preparación que ayuda. Cuatro miradas, un plato entendido.'}
==> 00000438: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 0000043c: <NewObject>: <Reg8: 4>
==> 0000043e: <LoadConstString>: <Reg8: 5, string_id: 24097>  # String: 'Cuando tengas en la cabeza estas 4 preguntas, sabrás leer también un plato que la app no ha visto nunca. Es el objetivo de [SOURCE_BRAND]: que sepas hacerlo tú solo.' (String)
==> 00000442: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000446: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000044a: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000044e: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 35650>  # String: 'metodo' (Identifier)
==> 00000453: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194687>  # Object: {'t': 'Calorías y glucosa: dos lentes', 's': 'Parecen lo mismo, pero no lo son'}
==> 00000461: <NewObject>: <Reg8: 4>
==> 00000463: <LoadConstString>: <Reg8: 3, string_id: 25467>  # String: '[SOURCE_BRAND] te muestra dos cosas de cada alimento: el impacto en la glucosa y las calorías. Parecen lo mismo, pero confundirlas te lleva por mal camino.' (String)
==> 00000467: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000046b: <NewArray>: <Reg8: 3, UInt16: 4>
==> 0000046f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000473: <NewObject>: <Reg8: 4>
==> 00000475: <NewArrayWithBuffer>: <Reg8: 5, UInt16: 3, UInt16: 3, UInt16: 527>  # Array: ['Glucosa: cuánto y con qué rapidez sube el azúcar en la sangre. Para esto, mira la carga.', 'Calorías: cuánta energía aporta ese alimento. Para esto, mira porción y objetivo.', 'Un alimento puede subir poco la glucosa y ser muy calórico. Y al revés.']
==> 0000047d: <PutNewOwnById>: <Reg8: 4, Reg8: 5, string_id: 34177>  # String: 'voci' (Identifier)
==> 00000482: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000486: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 194692>  # Object: {'cibo': 'Aceite y frutos secos', 'testo': 'El aceite de oliva y los frutos secos casi no suben la glucosa, pero son de los alimentos más calóricos que existen: estupendos para la energía, a dosificar si quieres adelgazar.'}
==> 00000494: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000498: <NewObject>: <Reg8: 4>
==> 0000049a: <LoadConstString>: <Reg8: 5, string_id: 24997>  # String: 'En la app, junto al impacto, encuentras la etiqueta Ligero / Medio / Contundente. Usa las dos lentes juntas, según tu objetivo en la sección Progreso.' (String)
==> 0000049e: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000004a2: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000004a6: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000004aa: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 35345>  # String: 'calorie' (Identifier)
==> 000004af: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194697>  # Object: {'t': 'El orden en la mesa y el movimiento', 's': 'Dos gestos sencillos que funcionan'}
==> 000004bd: <NewObject>: <Reg8: 4>
==> 000004bf: <LoadConstString>: <Reg8: 3, string_id: 27630>  # String: 'No cuenta solo qué comes, sino también en qué orden, y qué haces después.' (String)
==> 000004c3: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000004c7: <NewArray>: <Reg8: 3, UInt16: 4>
==> 000004cb: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000004cf: <NewObject>: <Reg8: 4>
==> 000004d1: <NewArrayWithBuffer>: <Reg8: 5, UInt16: 2, UInt16: 2, UInt16: 676>  # Array: ['Empieza por la verdura y la proteína, deja los carbohidratos para el final: la glucosa sube más despacio.', 'Un paseo después de comer ayuda al cuerpo a usar ese azúcar en vez de acumularlo.']
==> 000004d9: <PutNewOwnById>: <Reg8: 4, Reg8: 5, string_id: 34177>  # String: 'voci' (Identifier)
==> 000004de: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000004e2: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 182765>  # Object: {'cibo': 'Espaguetis al dente', 'testo': 'El mismo plato de pasta: si antes comes una guarnición de verdura, el impacto se suaviza.'}
==> 000004f0: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000004f4: <NewObject>: <Reg8: 4>
==> 000004f6: <LoadConstString>: <Reg8: 5, string_id: 29151>  # String: 'Son hábitos, no reglas médicas. Pequeños gestos que cualquiera puede probar en la mesa.' (String)
==> 000004fa: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000004fe: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000502: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000506: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 42827>  # String: 'ordine' (Identifier)
==> 0000050b: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 183678>  # Object: {'t': 'Trucos de cocina', 's': 'También cómo cocinas cambia el impacto'}
==> 00000519: <NewObject>: <Reg8: 4>
==> 0000051b: <LoadConstString>: <Reg8: 3, string_id: 24888>  # String: 'El mismo alimento puede tener impactos distintos según cómo lo prepares. Tres trucos fáciles:' (String)
==> 0000051f: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000523: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000527: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 0000052b: <NewObject>: <Reg8: 4>
==> 0000052d: <NewArrayWithBuffer>: <Reg8: 5, UInt16: 3, UInt16: 3, UInt16: 51553>  # Array: ['La pasta y el arroz AL DENTE suben menos que una cocción muy larga.', 'Enfriar pasta, arroz o patatas (ej. la pasta fría) crea “almidón resistente”, que sube menos la glucosa.', 'La fruta más madura tiene un IG más alto: un plátano verde y uno con manchas no son lo mismo.']
==> 00000535: <PutNewOwnById>: <Reg8: 4, Reg8: 5, string_id: 34177>  # String: 'voci' (Identifier)
==> 0000053a: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000053e: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 194702>  # Object: {'cibo': 'Cebada perlada cocida', 'testo': 'Cambiando de cereal lo cambias todo: la cebada perlada tiene un índice glucémico bajísimo, mucho más suave que el arroz blanco.'}
==> 0000054c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000550: <NewObject>: <Reg8: 4>
==> 00000552: <LoadConstString>: <Reg8: 5, string_id: 25002>  # String: 'En las recetas de la app encuentras a menudo estas “Alternativas de menor impacto” ya listas.' (String)
==> 00000556: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000055a: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000055e: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000562: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 46308>  # String: 'cucina' (Identifier)
==> 00000567: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194707>  # Object: {'t': 'Desayuno: empezar bien', 's': 'La primera comida marca el ritmo del día'}
==> 00000575: <NewObject>: <Reg8: 4>
==> 00000577: <LoadConstString>: <Reg8: 3, string_id: 29815>  # String: 'Un desayuno de solo azúcares rápidos (biscotes con mermelada, cruasán, zumo) hace un pico y luego un bajón: hambre y cansancio a media mañana. Añadir un freno lo cambia todo.' (String)
==> 0000057b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000057f: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00000583: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000587: <NewObject>: <Reg8: 4>
==> 00000589: <LoadConstString>: <Reg8: 5, string_id: 24947>  # String: 'El truco: une a los carbohidratos algo que ralentice: grasas buenas, proteínas o fibra. Yogur, frutos secos, avena, huevos: la subida se vuelve suave y la energía dura.' (String)
==> 0000058d: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000591: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000595: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 194712>  # Object: {'cibo': 'Porridge de avena', 'testo': 'La avena con yogur y frutos secos sube despacio y sacia mucho tiempo: un desayuno con los frenos ya dentro.'}
==> 000005a3: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000005a7: <NewObject>: <Reg8: 4>
==> 000005a9: <LoadConstString>: <Reg8: 5, string_id: 27641>  # String: 'No hace falta renunciar: basta con acompañar. Añade un freno y el mismo desayuno pesa menos.' (String)
==> 000005ad: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000005b1: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000005b5: <NewObject>: <Reg8: 4>
==> 000005b7: <LoadConstString>: <Reg8: 5, string_id: 23030>  # String: 'American Diabetes Association — Desayuno' (String)
==> 000005bb: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 000005bf: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 000005c3: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000005c7: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 35372>  # String: 'colazione' (Identifier)
==> 000005cc: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194717>  # Object: {'t': 'El tentempié inteligente', 's': 'Pequeño, pero con frenos'}
==> 000005da: <NewObject>: <Reg8: 4>
==> 000005dc: <LoadConstString>: <Reg8: 3, string_id: 24910>  # String: 'El peor tentempié es un carbohidrato rápido solo (tortitas de arroz, crackers, una fruta a toda prisa): sube y baja, y al poco tienes hambre otra vez. El mejor le pone un freno al lado.' (String)
==> 000005e0: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000005e4: <NewArray>: <Reg8: 3, UInt16: 5>
==> 000005e8: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000005ec: <NewObject>: <Reg8: 4>
==> 000005ee: <LoadConstString>: <Reg8: 5, string_id: 8524>  # String: 'Combina: fruta + frutos secos, yogur + unas almendras, una tortita con algo proteico. La fibra y las grasas aplanan la subida.' (String)
==> 000005f2: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000005f6: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000005fa: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 185879>  # Object: {'cibo': 'Almendras', 'testo': 'Un puñado de almendras junto a una fruta convierte un tentempié rápido en uno equilibrado.'}
==> 00000608: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 0000060c: <NewObject>: <Reg8: 4>
==> 0000060e: <LoadConstString>: <Reg8: 5, string_id: 28725>  # String: 'Regla de oro del tentempié: nunca un carbohidrato rápido solo. Ponle siempre un freno al lado.' (String)
==> 00000612: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000616: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000061a: <NewObject>: <Reg8: 4>
==> 0000061c: <LoadConstString>: <Reg8: 5, string_id: 23111>  # String: 'American Diabetes Association — Tentempiés' (String)
==> 00000620: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 00000624: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000628: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000062c: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 41698>  # String: 'spuntino' (Identifier)
==> 00000631: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194722>  # Object: {'t': 'El dulce: cómo incluirlo', 's': 'Sin sentimiento de culpa, con cabeza'}
==> 0000063f: <NewObject>: <Reg8: 4>
==> 00000641: <LoadConstString>: <Reg8: 3, string_id: 24868>  # String: 'El dulce no está prohibido: cuenta cuándo y cómo. Después de una comida completa (con verdura, proteínas, grasas) el impacto es más suave que con el estómago vacío, donde sube deprisa.' (String)
==> 00000645: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000649: <NewArray>: <Reg8: 3, UInt16: 5>
==> 0000064d: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000651: <NewObject>: <Reg8: 4>
==> 00000653: <LoadConstString>: <Reg8: 5, string_id: 30256>  # String: 'Y cuenta la porción: un trocito es una cosa, media tarrina otra. Con la app puedes ver el impacto adaptarse a los gramos que elijas.' (String)
==> 00000657: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000065b: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000065f: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 182898>  # Object: {'cibo': 'Chocolate negro', 'testo': 'El chocolate negro tiene menos azúcar y más grasa: en porción pequeña, después de comer, es un dulce “suave”.'}
==> 0000066d: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000671: <NewObject>: <Reg8: 4>
==> 00000673: <LoadConstString>: <Reg8: 5, string_id: 24867>  # String: 'El dulce al final de la comida y en porción medida pesa mucho menos que solo y sin control.' (String)
==> 00000677: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000067b: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000067f: <NewObject>: <Reg8: 4>
==> 00000681: <LoadConstString>: <Reg8: 5, string_id: 27874>  # String: 'OMS — Azúcares libres (OMS, 2015)' (String)
==> 00000685: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 00000689: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 0000068d: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000691: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 36535>  # String: 'dolce' (Identifier)
==> 00000696: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194727>  # Object: {'t': 'Caminar después de comer', 's': 'Diez minutos que cambian la subida'}
==> 000006a4: <NewObject>: <Reg8: 4>
==> 000006a6: <LoadConstString>: <Reg8: 3, string_id: 27461>  # String: 'Moverte después de comer ayuda a los músculos a usar el azúcar recién llegado: la subida de la glucosa se aplana. Bastan 10-15 minutos de paseo suave.' (String)
==> 000006aa: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000006ae: <NewArray>: <Reg8: 3, UInt16: 4>
==> 000006b2: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000006b6: <NewObject>: <Reg8: 4>
==> 000006b8: <LoadConstString>: <Reg8: 5, string_id: 27638>  # String: 'No hace falta gimnasio: un paseo después de comer o cenar es uno de los gestos más eficaces y sencillos. Mejor justo después, cuando la subida está empezando.' (String)
==> 000006bc: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000006c0: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000006c4: <NewObject>: <Reg8: 4>
==> 000006c6: <LoadConstString>: <Reg8: 5, string_id: 24909>  # String: 'El paseo tras la comida es un “freno” gratis: nada de comida quitada, solo la subida hecha más suave.' (String)
==> 000006ca: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000006ce: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000006d2: <NewObject>: <Reg8: 4>
==> 000006d4: <LoadConstString>: <Reg8: 5, string_id: 28765>  # String: 'Reynolds et al., Diabetologia 2016 — paseo tras la comida' (String)
==> 000006d8: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 000006dc: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000006e0: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000006e4: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 36850>  # String: 'camminata' (Identifier)
==> 000006e9: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 182917>  # Object: {'t': 'Fuera de casa y en el restaurante', 's': 'Elegir bien del menú'}
==> 000006f7: <NewObject>: <Reg8: 4>
==> 000006f9: <LoadConstString>: <Reg8: 3, string_id: 25428>  # String: 'Fuera no pesas los gramos, pero el método sigue: empieza por la verdura, elige una proteína y vigila la cantidad de carbohidratos (pan, pasta, patatas, postre).' (String)
==> 000006fd: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000701: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00000705: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000709: <NewObject>: <Reg8: 4>
==> 0000070b: <LoadConstString>: <Reg8: 5, string_id: 29709>  # String: 'Trucos prácticos: verdura o ensalada primero, agua en vez de refrescos, el pan con moderación, y si hay postre déjalo para el final, no con el estómago vacío.' (String)
==> 0000070f: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000713: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000717: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 183003>  # Object: {'cibo': 'Ensalada de algas (wakame)', 'testo': 'Empezar con una guarnición de verdura crea el “freno” antes de que lleguen los carbohidratos.'}
==> 00000725: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000729: <NewObject>: <Reg8: 4>
==> 0000072b: <LoadConstString>: <Reg8: 5, string_id: 27639>  # String: 'No hace falta la báscula para comer bien fuera: basta el orden correcto y un ojo a la porción.' (String)
==> 0000072f: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000733: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000737: <NewObject>: <Reg8: 4>
==> 00000739: <LoadConstString>: <Reg8: 5, string_id: 29057>  # String: 'Shukla et al., Diabetes Care 2015 — orden de los alimentos' (String)
==> 0000073d: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 00000741: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000745: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000749: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 40309>  # String: 'fuori-casa' (Identifier)
==> 0000074e: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194732>  # Object: {'t': 'Planificar la compra', 's': 'Las elecciones se hacen en el supermercado'}
==> 0000075c: <NewObject>: <Reg8: 4>
==> 0000075e: <LoadConstString>: <Reg8: 3, string_id: 26605>  # String: 'La mitad del trabajo se hace en el carrito. Si en casa tienes fibra y proteína (verduras, legumbres, yogur, frutos secos, integrales), es fácil montar platos con frenos. Si solo tienes alimentos rápidos, será difícil.' (String)
==> 00000762: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000766: <NewArray>: <Reg8: 3, UInt16: 5>
==> 0000076a: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 0000076e: <NewObject>: <Reg8: 4>
==> 00000770: <LoadConstString>: <Reg8: 5, string_id: 24990>  # String: 'En el supermercado usa el escáner del código de barras y lee la etiqueta: mira los carbohidratos “de los cuales azúcares” y la fibra, y elige antes de meter en el carrito.' (String)
==> 00000774: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000778: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000077c: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 194737>  # Object: {'cibo': 'Lentejas cocidas', 'testo': 'Tener legumbres en la despensa significa tener siempre a mano un carbohidrato con los frenos ya listos.'}
==> 0000078a: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 0000078e: <NewObject>: <Reg8: 4>
==> 00000790: <LoadConstString>: <Reg8: 5, string_id: 15714>  # String: 'No decides delante del plato: decides en el supermercado. Llena la despensa de frenos.' (String)
==> 00000794: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000798: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000079c: <NewObject>: <Reg8: 4>
==> 0000079e: <LoadConstString>: <Reg8: 5, string_id: 23028>  # String: 'American Diabetes Association — Compra y planificación' (String)
==> 000007a2: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 000007a6: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 000007aa: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000007ae: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 37370>  # String: 'spesa' (Identifier)
==> 000007b3: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194742>  # Object: {'t': 'IG alto no siempre es un enemigo', 's': 'Cuando la subida rápida sirve (deporte)'}
==> 000007c1: <NewObject>: <Reg8: 4>
==> 000007c3: <LoadConstString>: <Reg8: 3, string_id: 22725>  # String: 'A veces una subida rápida es exactamente lo que necesitas. El caso más claro es el deporte intenso.' (String)
==> 000007c7: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000007cb: <NewArray>: <Reg8: 3, UInt16: 5>
==> 000007cf: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000007d3: <NewObject>: <Reg8: 4>
==> 000007d5: <LoadConstString>: <Reg8: 5, string_id: 22987>  # String: 'Alrededor de un entrenamiento duro el cuerpo quema deprisa y necesita energía lista: un alimento de IG más alto encaja, no es un error.' (String)
==> 000007d9: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000007dd: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000007e1: <NewObject>: <Reg8: 4>
==> 000007e3: <NewArrayWithBuffer>: <Reg8: 5, UInt16: 3, UInt16: 3, UInt16: 51560>  # Array: ['Antes de un esfuerzo intenso: algo de carbohidratos listos da empuje.', 'Después del esfuerzo: ayudan a la recuperación.', 'Parado, en el escritorio, esa misma subida rápida sirve mucho menos.']
==> 000007eb: <PutNewOwnById>: <Reg8: 4, Reg8: 5, string_id: 34177>  # String: 'voci' (Identifier)
==> 000007f0: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000007f4: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 185946>  # Object: {'cibo': 'Plátano', 'testo': 'Un plátano maduro antes de correr es gasolina rápida. El mismo plátano en el desayuno, parado, da una subida que quizá no necesitas.'}
==> 00000802: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000806: <NewObject>: <Reg8: 4>
==> 00000808: <LoadConstString>: <Reg8: 5, string_id: 24862>  # String: 'El contexto cuenta. “Alto” no significa “malo”: significa “rápido”, y a veces rápido es justo lo que buscas.' (String)
==> 0000080c: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000810: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000814: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000818: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 35868>  # String: 'sport' (Identifier)
==> 0000081d: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194747>  # Object: {'t': 'Mitos que derribar', 's': 'Lo que se dice, y lo que es verdad'}
==> 0000082b: <NewObject>: <Reg8: 4>
==> 0000082d: <LoadConstString>: <Reg8: 3, string_id: 29124>  # String: 'Sobre la comida y la glucosa circulan muchos tópicos. Derribemos algunos, con calma.' (String)
==> 00000831: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000835: <NewArray>: <Reg8: 3, UInt16: 3>
==> 00000839: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 0000083d: <NewObject>: <Reg8: 4>
==> 0000083f: <NewArrayWithBuffer>: <Reg8: 5, UInt16: 4, UInt16: 4, UInt16: 1257>  # Array: ['«La fruta es mala, tiene azúcar» → No. La fruta entera tiene fibra y agua que frenan la subida. Cuenta la cantidad y el tipo, no la prohibición.', '«El pan integral no sube la glucosa» → Sube menos que el blanco, pero sube. Mejor, no gratis.', '«El azúcar moreno es más sano que el blanco» → Para la glucosa son prácticamente iguales.', '«Sin azúcar = libre» → Ojo: a menudo hay otros carbohidratos o grasas. Lee la etiqueta.']
==> 00000847: <PutNewOwnById>: <Reg8: 4, Reg8: 5, string_id: 34177>  # String: 'voci' (Identifier)
==> 0000084c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000850: <NewObject>: <Reg8: 4>
==> 00000852: <LoadConstString>: <Reg8: 5, string_id: 24401>  # String: 'Derribar los mitos es la mitad del trabajo. La otra mitad es mirar los números reales, que la app te pone delante.' (String)
==> 00000856: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000085a: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 0000085e: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000862: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 33008>  # String: 'miti' (Identifier)
==> 00000867: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194752>  # Object: {'t': 'Cómo mantenerla más estable', 's': 'El resumen de todo'}
==> 00000875: <NewObject>: <Reg8: 4>
==> 00000877: <LoadConstString>: <Reg8: 3, string_id: 26260>  # String: 'Juntando los capítulos, estos son los gestos sencillos para una glucosa, y una energía, más estables:' (String)
==> 0000087b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000087f: <NewArray>: <Reg8: 3, UInt16: 3>
==> 00000883: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000887: <NewObject>: <Reg8: 4>
==> 00000889: <NewArrayWithBuffer>: <Reg8: 5, UInt16: 5, UInt16: 5, UInt16: 51567>  # Array: ['Mira la carga, no solo el índice glucémico.', 'Completa el plato con fibra, proteínas y grasas buenas.', 'Elige alternativas de IG más bajo: la app te las propone.', 'Empieza por la verdura y muévete un poco después de comer.', 'Cocina al dente y aprovecha el almidón resistente.']
==> 00000891: <PutNewOwnById>: <Reg8: 4, Reg8: 5, string_id: 34177>  # String: 'voci' (Identifier)
==> 00000896: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000089a: <NewObject>: <Reg8: 4>
==> 0000089c: <LoadConstString>: <Reg8: 5, string_id: 25175>  # String: 'Estos son consejos generales y educativos, no indicaciones médicas. Cada persona es distinta: si tienes una condición específica, sigue siempre el plan de tu médico o de tu equipo de cuidado.' (String)
==> 000008a0: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000008a4: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000008a8: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000008ac: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 36034>  # String: 'stabile' (Identifier)
==> 000008b1: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194757>  # Object: {'t': '¿“La fruta es mala”?', 's': 'No: depende cuál, cuánta y cómo'}
==> 000008bf: <NewObject>: <Reg8: 4>
==> 000008c1: <LoadConstString>: <Reg8: 3, string_id: 26557>  # String: 'La fruta tiene azúcar, es verdad, pero también fibra, agua y vitaminas. La fibra ralentiza la absorción: la mayoría de las frutas enteras tienen un impacto contenido en porción normal.' (String)
==> 000008c5: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000008c9: <NewArray>: <Reg8: 3, UInt16: 5>
==> 000008cd: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000008d1: <NewObject>: <Reg8: 4>
==> 000008d3: <LoadConstString>: <Reg8: 5, string_id: 14652>  # String: 'Lo cambia todo la FORMA: la fruta entera frena, el zumo no. Y la cantidad: una fruta es una cosa, cuatro son otra.' (String)
==> 000008d7: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000008db: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000008df: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 94462>  # Object: {'cibo': 'Manzana con piel', 'testo': 'Una manzana con piel aporta fibra: sube despacio. Su zumo, sin fibra, sube deprisa. La misma fruta, dos historias.'}
==> 000008ed: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000008f1: <NewObject>: <Reg8: 4>
==> 000008f3: <LoadConstString>: <Reg8: 5, string_id: 14126>  # String: 'La fruta entera no es el enemigo: es uno de los carbohidratos con los frenos ya dentro.' (String)
==> 000008f7: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000008fb: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000008ff: <NewObject>: <Reg8: 4>
==> 00000901: <LoadConstString>: <Reg8: 5, string_id: 23049>  # String: 'American Diabetes Association — Fruta' (String)
==> 00000905: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 00000909: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 0000090d: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000911: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 45391>  # String: 'mito-frutta' (Identifier)
==> 00000916: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194762>  # Object: {'t': '¿“El integral es siempre mejor”?', 's': 'A menudo sí, pero no es magia'}
==> 00000924: <NewObject>: <Reg8: 4>
==> 00000926: <LoadConstString>: <Reg8: 3, string_id: 24882>  # String: 'El integral tiene más fibra que la versión refinada, así que tiende a subir un poco más despacio. Es una ventaja real, pero no convierte un carbohidrato en “libre”.' (String)
==> 0000092a: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000092e: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00000932: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000936: <NewObject>: <Reg8: 4>
==> 00000938: <LoadConstString>: <Reg8: 5, string_id: 24125>  # String: 'Cuidado con el marketing: “integral” en un producto muy procesado y azucarado cuenta poco. Y la porción sigue siendo decisiva: pan integral en cantidad enorme pesa igual.' (String)
==> 0000093c: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000940: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000944: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 183038>  # Object: {'cibo': 'Pan integral', 'testo': 'El pan integral sube un poco más despacio que el blanco gracias a la fibra: una mejora, no un salvoconducto.'}
==> 00000952: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000956: <NewObject>: <Reg8: 4>
==> 00000958: <LoadConstString>: <Reg8: 5, string_id: 26143>  # String: 'Integral = un poco más de freno. Estupendo, pero la cantidad manda igual.' (String)
==> 0000095c: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00000960: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000964: <NewObject>: <Reg8: 4>
==> 00000966: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 0000096a: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 0000096e: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000972: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 42206>  # String: 'mito-integrale' (Identifier)
==> 00000977: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194767>  # Object: {'t': '¿“Sin azúcar” = vía libre?', 's': 'No del todo: lee bien'}
==> 00000985: <NewObject>: <Reg8: 4>
==> 00000987: <LoadConstString>: <Reg8: 3, string_id: 31466>  # String: '“Sin azúcares añadidos” no significa sin carbohidratos: un producto puede tener almidones que suben igual la glucosa. Y “light” a menudo significa menos grasa pero más azúcar, o al revés.' (String)
==> 0000098b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000098f: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000993: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000997: <NewObject>: <Reg8: 4>
==> 00000999: <LoadConstString>: <Reg8: 5, string_id: 24943>  # String: 'El texto de delante sirve para vender; la verdad está en la tabla nutricional. Mira los carbohidratos totales “de los cuales azúcares”, no solo la palabra de la parte de delante.' (String)
==> 0000099d: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000009a1: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000009a5: <NewObject>: <Reg8: 4>
==> 000009a7: <LoadConstString>: <Reg8: 5, string_id: 31468>  # String: '“Sin azúcar” no es un salvoconducto: gira el producto y lee los carbohidratos de verdad.' (String)
==> 000009ab: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000009af: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000009b3: <NewObject>: <Reg8: 4>
==> 000009b5: <LoadConstString>: <Reg8: 5, string_id: 24682>  # String: 'EFSA — Declaraciones nutricionales y de propiedades saludables' (String)
==> 000009b9: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 000009bd: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000009c1: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000009c5: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 51493>  # String: 'mito-zero' (Identifier)
==> 000009ca: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194772>  # Object: {'t': '¿“La pasta por la noche engorda”?', 's': 'Cuenta el total, no el reloj'}
==> 000009d8: <NewObject>: <Reg8: 4>
==> 000009da: <LoadConstString>: <Reg8: 3, string_id: 27634>  # String: 'No es la hora lo que marca la diferencia, sino cuánto y cómo. Un plato de pasta con verdura y un aliño equilibrado, en porción justa, va bien también en la cena.' (String)
==> 000009de: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000009e2: <NewArray>: <Reg8: 3, UInt16: 5>
==> 000009e6: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000009ea: <NewObject>: <Reg8: 4>
==> 000009ec: <LoadConstString>: <Reg8: 7, string_id: 29060>  # String: 'Si acaso, por la noche se tiende a comer más y a moverse menos: entonces la porción y un paseo después cuentan aún más. Pero la pasta “prohibida por la noche” es un mito.' (String)
==> 000009f0: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 000009f4: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000009f8: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 194777>  # Object: {'cibo': 'Pasta cocida al dente', 'testo': 'Pasta al dente, con verdura antes y un paseo después: la misma cena pesa mucho menos.'}
==> 00000a06: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000a0a: <NewObject>: <Reg8: 4>
==> 00000a0c: <LoadConstString>: <Reg8: 7, string_id: 15718>  # String: 'No es el reloj el problema: son la cantidad y lo que pones en el plato.' (String)
==> 00000a10: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000a14: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000a18: <NewObject>: <Reg8: 4>
==> 00000a1a: <LoadConstString>: <Reg8: 7, string_id: 23075>  # String: 'American Diabetes Association — Mitos alimentarios' (String)
==> 00000a1e: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000a22: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000a26: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000a2a: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 49019>  # String: 'mito-pasta-sera' (Identifier)
==> 00000a2f: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 189084>  # Object: {'t': 'Alcohol y glucosa', 's': 'Una relación complicada'}
==> 00000a3d: <NewObject>: <Reg8: 4>
==> 00000a3f: <LoadConstString>: <Reg8: 3, string_id: 24827>  # String: 'El alcohol es una relación complicada: algunas bebidas (cerveza, combinados dulces, vinos licorosos) aportan carbohidratos; el alcohol en sí lo gestiona el hígado de una forma que puede influir en la glucosa de manera no lineal.' (String)
==> 00000a43: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000a47: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000a4b: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000a4f: <NewObject>: <Reg8: 4>
==> 00000a51: <LoadConstString>: <Reg8: 7, string_id: 25001>  # String: 'En la práctica: si bebes, mejor con moderación y junto a la comida, nunca con el estómago vacío. Y ojo con los combinados azucarados, que suman alcohol y azúcar.' (String)
==> 00000a55: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000a59: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000a5d: <NewObject>: <Reg8: 4>
==> 00000a5f: <LoadConstString>: <Reg8: 7, string_id: 25173>  # String: 'Esto es educación, no una indicación médica: para tu situación específica háblalo con tu médico.' (String)
==> 00000a63: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000a67: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000a6b: <NewObject>: <Reg8: 4>
==> 00000a6d: <LoadConstString>: <Reg8: 7, string_id: 23008>  # String: 'American Diabetes Association — Alcohol' (String)
==> 00000a71: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000a75: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000a79: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000a7d: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 34725>  # String: 'alcol' (Identifier)
==> 00000a82: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194782>  # Object: {'t': 'Café y glucosa', 's': 'Solo poco, azucarado mucho'}
==> 00000a90: <NewObject>: <Reg8: 4>
==> 00000a92: <LoadConstString>: <Reg8: 3, string_id: 24848>  # String: 'El café solo, sin azúcar, tiene un impacto casi nulo en la glucosa. El problema no es el café: es lo que le pones dentro (azúcar, siropes, nata, galletas) y la leche en las versiones azucaradas.' (String)
==> 00000a96: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000a9a: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000a9e: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000aa2: <NewObject>: <Reg8: 4>
==> 00000aa4: <LoadConstString>: <Reg8: 7, string_id: 29803>  # String: 'Un capuchino con dos terrones y un cruasán es una comida rica en azúcares rápidos, no “un café”. El café en sí sigue siendo neutro.' (String)
==> 00000aa8: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000aac: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000ab0: <NewObject>: <Reg8: 4>
==> 00000ab2: <LoadConstString>: <Reg8: 7, string_id: 27633>  # String: 'No es el café el problema, sino el azúcar y los dulces que lo acompañan.' (String)
==> 00000ab6: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000aba: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000abe: <NewObject>: <Reg8: 4>
==> 00000ac0: <LoadConstString>: <Reg8: 7, string_id: 23017>  # String: 'American Diabetes Association — Cafeína' (String)
==> 00000ac4: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000ac8: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000acc: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000ad0: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 38546>  # String: 'caffe' (Identifier)
==> 00000ad5: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194787>  # Object: {'t': 'Edulcorantes: cuáles y cómo', 's': 'Dulce sin (o casi) impacto'}
==> 00000ae3: <NewObject>: <Reg8: 4>
==> 00000ae5: <LoadConstString>: <Reg8: 3, string_id: 27143>  # String: 'Los edulcorantes (eritritol, estevia, aspartamo…) dan el dulce con poquísimos o cero carbohidratos: no suben la glucosa como el azúcar. Son una forma de endulzar sin el pico.' (String)
==> 00000ae9: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000aed: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00000af1: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000af5: <NewObject>: <Reg8: 4>
==> 00000af7: <LoadConstString>: <Reg8: 7, string_id: 24127>  # String: 'Cuidado, eso sí, con el producto entero: un dulce “con edulcorante” puede tener igualmente harinas y grasas que pesan. El edulcorante quita el azúcar, no todo lo demás.' (String)
==> 00000afb: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000aff: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000b03: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 183179>  # Object: {'cibo': 'Eritritol', 'testo': 'El eritritol endulza con un impacto insignificante en la glucosa: útil en lugar del azúcar, pero el resto del dulce cuenta igual.'}
==> 00000b11: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000b15: <NewObject>: <Reg8: 4>
==> 00000b17: <LoadConstString>: <Reg8: 7, string_id: 24870>  # String: 'El edulcorante ayuda a quitar el azúcar, pero mira siempre el producto entero.' (String)
==> 00000b1b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000b1f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000b23: <NewObject>: <Reg8: 4>
==> 00000b25: <LoadConstString>: <Reg8: 7, string_id: 24684>  # String: 'EFSA — Edulcorantes (seguridad y uso)' (String)
==> 00000b29: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000b2d: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000b31: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000b35: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 39694>  # String: 'dolcificanti' (Identifier)
==> 00000b3a: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194792>  # Object: {'t': 'Fuentes y método', 's': 'De dónde vienen los números de esta app'}
==> 00000b48: <NewObject>: <Reg8: 4>
==> 00000b4a: <LoadConstString>: <Reg8: 3, string_id: 27156>  # String: 'Los valores de esta app no están inventados: vienen de fuentes científicas reconocidas. Estas son cuáles, para que puedas verificarlas tú mismo.' (String)
==> 00000b4e: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000b52: <NewArray>: <Reg8: 3, UInt16: 10>
==> 00000b56: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000b5a: <NewObject>: <Reg8: 4>
==> 00000b5c: <LoadConstString>: <Reg8: 7, string_id: 30880>  # String: 'Índice glucémico (IG): de las International Tables of Glycemic Index and Glycemic Load Values (Atkinson, Foster-Powell y Brand-Miller), la referencia académica mundial, elaborada por el grupo de investigación de la Universidad de Sídney.' (String)
==> 00000b60: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000b64: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000b68: <NewObject>: <Reg8: 4>
==> 00000b6a: <LoadConstString>: <Reg8: 7, string_id: 23400>  # String: 'Base de datos del IG de la Universidad de Sídney' (String)
==> 00000b6e: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000b72: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000b76: <NewObject>: <Reg8: 4>
==> 00000b78: <LoadConstString>: <Reg8: 7, string_id: 13332>  # String: 'International Tables 2021 (Am. J. Clinical Nutrition)' (String)
==> 00000b7c: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000b80: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000b84: <NewObject>: <Reg8: 4>
==> 00000b86: <LoadConstString>: <Reg8: 7, string_id: 23700>  # String: 'Carbohidratos, proteínas, grasas y fibra: de las tablas de composición de los alimentos del CREA (Centro de investigación de Alimentos y Nutrición, Italia) y de la base de datos USDA FoodData Central (Estados Unidos).' (String)
==> 00000b8a: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000b8e: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000b92: <NewObject>: <Reg8: 4>
==> 00000b94: <LoadConstString>: <Reg8: 7, string_id: 23635>  # String: 'CREA · Tablas de composición de los alimentos' (String)
==> 00000b98: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000b9c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 5>
==> 00000ba0: <NewObject>: <Reg8: 4>
==> 00000ba2: <LoadConstString>: <Reg8: 7, string_id: 7954>  # String: 'USDA FoodData Central' (String)
==> 00000ba6: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000baa: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 6>
==> 00000bae: <NewObject>: <Reg8: 4>
==> 00000bb0: <LoadConstString>: <Reg8: 8, string_id: 24812>  # String: 'El IG de un mismo alimento cambia con la variedad, la maduración y la cocción: por eso, donde es muy variable, mostramos un intervalo y no un número único.' (String)
==> 00000bb4: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 8, string_id: 243>  # String: 'testo' (Identifier)
==> 00000bb8: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 7>
==> 00000bbc: <NewObject>: <Reg8: 4>
==> 00000bbe: <LoadConstString>: <Reg8: 8, string_id: 24213>  # String: 'Cómo leemos un plato: el Método [SOURCE_BRAND] mira cuatro cosas a la vez: cantidad de carbohidratos, velocidad (IG), equilibrio (fibra, proteínas y grasas que frenan la subida) y preparación (cocción). El veredicto nace de la carga total, no del IG solo.' (String)
==> 00000bc2: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 8, string_id: 243>  # String: 'testo' (Identifier)
==> 00000bc6: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 8>
==> 00000bca: <NewObject>: <Reg8: 4>
==> 00000bcc: <LoadConstString>: <Reg8: 8, string_id: 26121>  # String: 'Información educativa, no un dispositivo médico ni un consejo médico. No sustituye la opinión del diabetólogo o del dietista: las decisiones sobre dieta, insulina o tratamiento se acuerdan siempre con ellos.' (String)
==> 00000bd0: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 8, string_id: 243>  # String: 'testo' (Identifier)
==> 00000bd4: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 9>
==> 00000bd8: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000bdc: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 36490>  # String: 'fonti' (Identifier)
==> 00000be1: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194797>  # Object: {'t': 'De dónde vienen los valores', 's': 'No están inventados: tienen una fuente'}
==> 00000bef: <NewObject>: <Reg8: 4>
==> 00000bf1: <LoadConstString>: <Reg8: 3, string_id: 27141>  # String: 'Los datos nutricionales (calorías, carbohidratos, azúcares, fibra) vienen de bases de datos oficiales como la USDA FoodData Central. El índice glucémico viene de las tablas internacionales de la literatura.' (String)
==> 00000bf5: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000bf9: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000bfd: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000c01: <NewObject>: <Reg8: 4>
==> 00000c03: <LoadConstString>: <Reg8: 8, string_id: 24983>  # String: 'En cada ficha ves el estado del dato: “revisado” (verificado a mano contra las tablas) o “estimación”. Es una forma de ser honestos sobre qué está controlado y qué es aproximado.' (String)
==> 00000c07: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 8, string_id: 243>  # String: 'testo' (Identifier)
==> 00000c0b: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000c0f: <NewObject>: <Reg8: 4>
==> 00000c11: <LoadConstString>: <Reg8: 8, string_id: 27628>  # String: 'Ningún valor está inventado: cada uno tiene una fuente, y te decimos cuánto es de fiable.' (String)
==> 00000c15: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 8, string_id: 243>  # String: 'testo' (Identifier)
==> 00000c19: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000c1d: <NewObject>: <Reg8: 4>
==> 00000c1f: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000c23: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000c27: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000c2b: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 48579>  # String: 'fonti-valori' (Identifier)
==> 00000c30: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 189105>  # Object: {'t': 'Por qué el IG es “por franjas”', 's': 'Un número exacto engañaría'}
==> 00000c3e: <NewObject>: <Reg8: 4>
==> 00000c40: <LoadConstString>: <Reg8: 3, string_id: 24889>  # String: 'El mismo alimento puede tener un IG distinto según la variedad, la maduración, la cocción e incluso según quién lo mida. Por eso mostramos una franja (mínimo–medio–máximo), no un solo número: sería una falsa precisión.' (String)
==> 00000c44: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000c48: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000c4c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000c50: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 183198>  # Object: {'cibo': 'Plátano', 'testo': 'El plátano verde tiene un IG en torno a 30, maduro en torno a 51. La misma fruta, IG distinto: por eso una franja es más honesta que un número.'}
==> 00000c5e: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000c62: <NewObject>: <Reg8: 4>
==> 00000c64: <LoadConstString>: <Reg8: 7, string_id: 26544>  # String: 'La franja no es imprecisión: es honestidad. La realidad varía, y nosotros te lo decimos.' (String)
==> 00000c68: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000c6c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000c70: <NewObject>: <Reg8: 4>
==> 00000c72: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 00000c76: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000c7a: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000c7e: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 32246>  # String: 'ig-fascia' (Identifier)
==> 00000c83: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194802>  # Object: {'t': 'Los límites del índice glucémico', 's': 'Cada uno responde un poco a su manera'}
==> 00000c91: <NewObject>: <Reg8: 4>
==> 00000c93: <LoadConstString>: <Reg8: 3, string_id: 24815>  # String: 'El IG es una media medida en grupos de personas: utilísimo como brújula, pero la respuesta real varía de persona a persona. Mismo alimento, dos cuerpos, dos subidas algo distintas.' (String)
==> 00000c97: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000c9b: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000c9f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000ca3: <NewObject>: <Reg8: 4>
==> 00000ca5: <LoadConstString>: <Reg8: 7, string_id: 25179>  # String: 'Estudios con sensores continuos (MCG) han mostrado cuánta variabilidad individual hay. Por eso el IG y la carga son una guía para elegir mejor, no una ley matemática sobre tu cuerpo.' (String)
==> 00000ca9: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000cad: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000cb1: <NewObject>: <Reg8: 4>
==> 00000cb3: <LoadConstString>: <Reg8: 7, string_id: 29981>  # String: 'Usa el IG como brújula, no como oráculo: tu cuerpo tiene la última palabra.' (String)
==> 00000cb7: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000cbb: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000cbf: <NewObject>: <Reg8: 4>
==> 00000cc1: <LoadConstString>: <Reg8: 7, string_id: 30313>  # String: 'Zeevi et al., Cell 2015 — respuesta glucémica personalizada' (String)
==> 00000cc5: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000cc9: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000ccd: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000cd1: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 39245>  # String: 'ig-limiti' (Identifier)
==> 00000cd6: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194807>  # Object: {'t': 'Estudios vs anécdotas', 's': 'Cómo no dejarse engañar'}
==> 00000ce4: <NewObject>: <Reg8: 4>
==> 00000ce6: <LoadConstString>: <Reg8: 3, string_id: 30155>  # String: '“A mí me funciona” no es una prueba: es una anécdota. Sobre un solo caso pueden actuar mil factores más. Una prueba seria mide a muchas personas, compara con un grupo de control y se publica.' (String)
==> 00000cea: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000cee: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000cf2: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000cf6: <NewObject>: <Reg8: 4>
==> 00000cf8: <LoadConstString>: <Reg8: 7, string_id: 24420>  # String: 'Desconfía de quien promete milagros o “el secreto que nadie te cuenta”. La ciencia de verdad es cauta, cita las fuentes y admite sus propios límites.' (String)
==> 00000cfc: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000d00: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000d04: <NewObject>: <Reg8: 4>
==> 00000d06: <LoadConstString>: <Reg8: 7, string_id: 29897>  # String: 'Una anécdota es un indicio, no una prueba. Las decisiones importantes merecen fuentes de verdad.' (String)
==> 00000d0a: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000d0e: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000d12: <NewObject>: <Reg8: 4>
==> 00000d14: <LoadConstString>: <Reg8: 7, string_id: 23038>  # String: 'American Diabetes Association — Educación en diabetes' (String)
==> 00000d18: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000d1c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000d20: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000d24: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 46040>  # String: 'studi-aneddoti' (Identifier)
==> 00000d29: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194812>  # Object: {'t': 'Por qué “educativo, no médico”', 's': 'Te ayudamos a entender, no a curarte'}
==> 00000d37: <NewObject>: <Reg8: 4>
==> 00000d39: <LoadConstString>: <Reg8: 3, string_id: 25158>  # String: 'Esta app explica cómo la comida puede mover la glucosa y la energía. No da diagnósticos, no prescribe tratamientos, no dice dosis: eso es el trabajo de tu médico, que conoce tu situación.' (String)
==> 00000d3d: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000d41: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000d45: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000d49: <NewObject>: <Reg8: 4>
==> 00000d4b: <LoadConstString>: <Reg8: 7, string_id: 26467>  # String: 'La capacidad de entender lo que comes es útil para cualquiera, con o sin diabetes. Pero las decisiones clínicas quedan entre tú y quien te cuida.' (String)
==> 00000d4f: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000d53: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000d57: <NewObject>: <Reg8: 4>
==> 00000d59: <LoadConstString>: <Reg8: 7, string_id: 28847>  # String: 'Saber más te hace más consciente, no te sustituye al médico. Son dos cosas distintas, y ambas correctas.' (String)
==> 00000d5d: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000d61: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000d65: <NewObject>: <Reg8: 4>
==> 00000d67: <LoadConstString>: <Reg8: 7, string_id: 6148>  # String: 'American Diabetes Association' (String)
==> 00000d6b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000d6f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000d73: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000d77: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 47908>  # String: 'non-medico' (Identifier)
==> 00000d7c: <NewObjectWithBuffer>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt16: 49840, UInt16: 44798>  # Object: {'t': 'Las guías de referencia', 's': 'A quién hacemos caso'}
==> 00000d86: <NewObject>: <Reg8: 4>
==> 00000d88: <LoadConstString>: <Reg8: 3, string_id: 27814>  # String: 'Nos basamos en fuentes reconocidas: la American Diabetes Association (ADA), la asociación europea (EASD), la Organización Mundial de la Salud (OMS), las tablas de IG de la Universidad de Sídney, los datos de la USDA.' (String)
==> 00000d8c: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000d90: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000d94: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000d98: <NewObject>: <Reg8: 4>
==> 00000d9a: <LoadConstString>: <Reg8: 7, string_id: 24095>  # String: 'Cuando estas fuentes actualizan sus recomendaciones, nos actualizamos también. No seguimos modas: seguimos las pruebas más sólidas disponibles.' (String)
==> 00000d9e: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000da2: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000da6: <NewObject>: <Reg8: 4>
==> 00000da8: <LoadConstString>: <Reg8: 7, string_id: 15734>  # String: 'No nos inventamos las reglas: las tomamos de quien investiga de verdad.' (String)
==> 00000dac: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000db0: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000db4: <NewObject>: <Reg8: 4>
==> 00000db6: <LoadConstString>: <Reg8: 7, string_id: 22735>  # String: 'ADA · EASD · OMS (guías oficiales)' (String)
==> 00000dba: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000dbe: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000dc2: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000dc6: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 43923>  # String: 'linee-guida' (Identifier)
==> 00000dcb: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194817>  # Object: {'t': 'Cómo mantenemos los datos limpios', 's': 'Reglas y controles, no opiniones'}
==> 00000dd9: <NewObject>: <Reg8: 4>
==> 00000ddb: <LoadConstString>: <Reg8: 3, string_id: 26485>  # String: 'La clasificación de un alimento (bajo/medio/alto) no la decide una opinión caso por caso, sino reglas iguales para todos: por ejemplo, un azúcar casi puro se trata siempre como impacto alto.' (String)
==> 00000ddf: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000de3: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000de7: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000deb: <NewObject>: <Reg8: 4>
==> 00000ded: <LoadConstString>: <Reg8: 7, string_id: 24701>  # String: 'Y cada vez que añadimos o cambiamos un dato, unos controles automáticos verifican que todo sea coherente (los números, las franjas, el orden del IG). Si algo no cuadra, se bloquea antes de llegar a ti.' (String)
==> 00000df1: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000df5: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000df9: <NewObject>: <Reg8: 4>
==> 00000dfb: <LoadConstString>: <Reg8: 7, string_id: 28727>  # String: 'Reglas claras + controles automáticos = menos errores humanos. Así mantenemos alta la fiabilidad.' (String)
==> 00000dff: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000e03: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000e07: <NewObject>: <Reg8: 4>
==> 00000e09: <LoadConstString>: <Reg8: 7, string_id: 22754>  # String: 'USDA FoodData Central · Universidad de Sídney (IG)' (String)
==> 00000e0d: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 41>  # String: 'label' (Identifier)
==> 00000e11: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000e15: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000e19: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 43516>  # String: 'dati-aggiornati' (Identifier)
==> 00000e1e: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194822>  # Object: {'t': 'Comer para tu objetivo', 's': 'Adelgazar, mantener o ganar masa'}
==> 00000e2c: <NewObject>: <Reg8: 4>
==> 00000e2e: <LoadConstString>: <Reg8: 3, string_id: 24887>  # String: 'El mismo alimento puede servir a objetivos distintos. Así puedes orientarte, con la glucosa siempre como brújula.' (String)
==> 00000e32: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000e36: <NewArray>: <Reg8: 3, UInt16: 6>
==> 00000e3a: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000e3e: <NewObject>: <Reg8: 4>
==> 00000e40: <LoadConstString>: <Reg8: 7, string_id: 22817>  # String: 'Adelgazar: dale al cuerpo un poco menos de energía de la que consume, con constancia. Elige alimentos que sacian con pocas calorías y mantén la carga glucémica baja, para evitar los picos que poco después te devuelven el hambre.' (String)
==> 00000e44: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000e48: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000e4c: <NewObject>: <Reg8: 4>
==> 00000e4e: <NewArrayWithBuffer>: <Reg8: 7, UInt16: 2, UInt16: 2, UInt16: 51578>  # Array: ['Amigos: verdura a voluntad, proteínas magras, yogur griego, fruta de IG bajo, integrales medidos.', 'A limitar: fritos, dulces y bebidas azucaradas, pan y pasta refinados en porciones abundantes.']
==> 00000e56: <PutNewOwnById>: <Reg8: 4, Reg8: 7, string_id: 34177>  # String: 'voci' (Identifier)
==> 00000e5b: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000e5f: <NewObject>: <Reg8: 4>
==> 00000e61: <LoadConstString>: <Reg8: 7, string_id: 27341>  # String: 'Mantener: come más o menos la energía que consumes, con equilibrio. Platos variados, verdura siempre, una fuente de proteína en cada comida y carbohidratos sobre todo integrales.' (String)
==> 00000e65: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000e69: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000e6d: <NewObject>: <Reg8: 4>
==> 00000e6f: <LoadConstString>: <Reg8: 7, string_id: 25478>  # String: 'Ganar masa: da un poco más de energía de la que consumes, con suficiente proteína repartida en las comidas. La comida da los ladrillos, el entrenamiento de fuerza los coloca en su sitio. Elige fuentes de calidad: una carga alta y continua no ayuda.' (String)
==> 00000e73: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000e77: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000e7b: <NewObject>: <Reg8: 4>
==> 00000e7d: <LoadConstString>: <Reg8: 7, string_id: 23157>  # String: 'Consejos educativos, no indicaciones médicas. Tu objetivo lo eliges en la sección Progreso, y el informe semanal te da los consejos a medida.' (String)
==> 00000e81: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000e85: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 5>
==> 00000e89: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000e8d: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 35248>  # String: 'obiettivi' (Identifier)
==> 00000e92: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194827>  # Object: {'t': 'La sensibilidad a la insulina', 's': 'Quizá lo más importante de todo'}
==> 00000ea0: <NewObject>: <Reg8: 4>
==> 00000ea2: <LoadConstString>: <Reg8: 3, string_id: 28033>  # String: 'Para un diabético es quizá lo más importante de todo. La sensibilidad a la insulina es cuánto “escuchan” tus células a la insulina: cuanto más sensible eres, menos insulina hace falta para meter el azúcar en las células. Más sensibilidad significa glucemias más estables y menos altibajos.' (String)
==> 00000ea6: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000eaa: <NewArray>: <Reg8: 3, UInt16: 6>
==> 00000eae: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000eb2: <NewObject>: <Reg8: 4>
==> 00000eb4: <LoadConstString>: <Reg8: 7, string_id: 24895>  # String: 'El músculo es la esponja del azúcar: los músculos son el sitio donde va a parar la mayor parte de la glucosa. Cuanto más músculo tengas y más lo uses, más azúcar absorben de la sangre, incluso sin mucha insulina. Un cuerpo entrenado gestiona el mismo plato con menos esfuerzo.' (String)
==> 00000eb8: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000ebc: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000ec0: <NewObject>: <Reg8: 4>
==> 00000ec2: <LoadConstString>: <Reg8: 7, string_id: 27462>  # String: 'Moverte después de comer baja el pico: los músculos en actividad queman la glucosa recién llegada. Es una de las herramientas más sencillas y potentes que tienes.' (String)
==> 00000ec6: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000eca: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000ece: <NewObject>: <Reg8: 4>
==> 00000ed0: <LoadConstString>: <Reg8: 7, string_id: 26565>  # String: 'La fuerza cambia las reglas con el tiempo: construir músculo aumenta la sensibilidad durante horas y días después. Es una inversión que siempre rinde. Y la constancia gana a la intensidad: no hace falta ser atleta.' (String)
==> 00000ed4: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000ed8: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000edc: <NewObject>: <Reg8: 4>
==> 00000ede: <NewArrayWithBuffer>: <Reg8: 7, UInt16: 4, UInt16: 4, UInt16: 192>  # Array: ['Camina 10-15 minutos después de las comidas principales.', 'Entrena la fuerza 2-3 veces por semana.', 'Muévete cada día, aunque sea un poco.', 'Sé constante: los beneficios se acumulan con el tiempo.']
==> 00000ee6: <PutNewOwnById>: <Reg8: 4, Reg8: 7, string_id: 34177>  # String: 'voci' (Identifier)
==> 00000eeb: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000eef: <NewObject>: <Reg8: 4>
==> 00000ef1: <LoadConstString>: <Reg8: 7, string_id: 26433>  # String: 'La actividad física cambia tu respuesta a la insulina. Son consejos educativos, no indicaciones médicas: para los ajustes habla con tu médico.' (String)
==> 00000ef5: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000ef9: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 5>
==> 00000efd: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000f01: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 39813>  # String: 'sensibilita' (Identifier)
==> 00000f06: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194832>  # Object: {'t': 'Maduración y conservación', 's': 'El mismo alimento cambia con el tiempo'}
==> 00000f14: <NewObject>: <Reg8: 4>
==> 00000f16: <LoadConstString>: <Reg8: 3, string_id: 24102>  # String: 'Cuanto más madura una fruta, más se convierten sus almidones en azúcares simples: sube más deprisa. Un plátano verde es más “lento” que uno muy maduro. También el pan del día anterior o enfriado puede subir un poco menos que el caliente.' (String)
==> 00000f1a: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000f1e: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00000f22: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000f26: <NewObjectWithBuffer>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt16: 49843, UInt16: 4449>  # Object: {'cibo': 'Plátano', 'testo': 'El plátano verde tiene un IG más bajo que el maduro: la misma fruta, velocidades distintas según lo maduro que esté.'}
==> 00000f30: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000f34: <NewObject>: <Reg8: 4>
==> 00000f36: <LoadConstString>: <Reg8: 7, string_id: 24948>  # String: 'El valor de un alimento no es fijo: cambia con la maduración y la conservación. Es normal, y la franja lo tiene en cuenta.' (String)
==> 00000f3a: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 7, string_id: 243>  # String: 'testo' (Identifier)
==> 00000f3e: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000f42: <NewObject>: <Reg8: 4>
==> 00000f44: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 00000f48: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000f4c: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000f50: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 36720>  # String: 'maturazione' (Identifier)
==> 00000f55: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194837>  # Object: {'t': 'El plato equilibrado', 's': 'Un modelo sencillo de recordar'}
==> 00000f63: <NewObject>: <Reg8: 4>
==> 00000f65: <LoadConstString>: <Reg8: 3, string_id: 29914>  # String: 'Una forma fácil de montar una comida con frenos: medio plato de verdura, un cuarto de proteína (carne, pescado, huevos, legumbres), un cuarto de carbohidratos (pasta, arroz, pan, patatas).' (String)
==> 00000f69: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000f6d: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00000f71: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000f75: <NewObject>: <Reg8: 4>
==> 00000f77: <LoadConstString>: <Reg8: 6, string_id: 23202>  # String: 'Así la fibra de las verduras y las proteínas ralentizan la absorción de los carbohidratos, y la subida se vuelve suave. No es una regla rígida: es una brújula para el ojo.' (String)
==> 00000f7b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 00000f7f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000f83: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 194842>  # Object: {'cibo': 'Lentejas cocidas', 'testo': 'Las legumbres son carbohidrato Y proteína a la vez: un estupendo “ladrillo” del plato equilibrado.'}
==> 00000f91: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000f95: <NewObject>: <Reg8: 4>
==> 00000f97: <LoadConstString>: <Reg8: 6, string_id: 27360>  # String: 'Medio de verdura, un cuarto de proteína, un cuarto de carbohidratos: un plato así tiene los frenos ya dentro.' (String)
==> 00000f9b: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 00000f9f: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00000fa3: <NewObject>: <Reg8: 4>
==> 00000fa5: <LoadConstString>: <Reg8: 6, string_id: 23078>  # String: 'American Diabetes Association — Método del plato' (String)
==> 00000fa9: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 00000fad: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00000fb1: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00000fb5: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 34138>  # String: 'piatto-bilanciato' (Identifier)
==> 00000fba: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194847>  # Object: {'t': 'La cena: las cargas de la noche', 's': 'No es la hora, es el total'}
==> 00000fc8: <NewObject>: <Reg8: 4>
==> 00000fca: <LoadConstString>: <Reg8: 3, string_id: 28334>  # String: 'Por la noche se tiende a comer más y a moverse menos. No hace falta saltarse los carbohidratos: hace falta una porción razonable, verdura en el plato y quizá un paseo después.' (String)
==> 00000fce: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00000fd2: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00000fd6: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00000fda: <NewObject>: <Reg8: 4>
==> 00000fdc: <LoadConstString>: <Reg8: 6, string_id: 29903>  # String: 'Una cena demasiado cargada y sobre un estómago ya lleno de dulces pesa; una cena equilibrada, incluso con pasta, va muy bien. Cuenta el total del día, no el reloj.' (String)
==> 00000fe0: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 00000fe4: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00000fe8: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 194852>  # Object: {'cibo': 'Pasta cocida al dente', 'testo': 'Pasta al dente, verdura antes, porción justa y un paseíto después: una cena tranquila.'}
==> 00000ff6: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00000ffa: <NewObject>: <Reg8: 4>
==> 00000ffc: <LoadConstString>: <Reg8: 6, string_id: 27631>  # String: 'No demonices la cena: equilíbrala. Es el total del día lo que cuenta.' (String)
==> 00001000: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 00001004: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00001008: <NewObject>: <Reg8: 4>
==> 0000100a: <LoadConstString>: <Reg8: 6, string_id: 23085>  # String: 'American Diabetes Association — Planificar las comidas' (String)
==> 0000100e: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 00001012: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00001016: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000101a: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 35100>  # String: 'cena' (Identifier)
==> 0000101f: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194857>  # Object: {'t': 'Aprender de tu diario', 's': 'Tus patrones te los dices tú solo'}
==> 0000102d: <NewObject>: <Reg8: 4>
==> 0000102f: <LoadConstString>: <Reg8: 3, string_id: 23167>  # String: 'Apuntar qué comes, aunque sea unos días, hace aflorar patrones que de memoria no ves: qué comidas te dejan energía y cuáles te hacen desplomarte a media jornada.' (String)
==> 00001033: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00001037: <NewArray>: <Reg8: 3, UInt16: 4>
==> 0000103b: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 0000103f: <NewObject>: <Reg8: 4>
==> 00001041: <LoadConstString>: <Reg8: 6, string_id: 27640>  # String: 'No hace falta la perfección: hace falta la constancia. Unas pocas notas honestas valen más que un diario perfecto llevado un solo día. Con el tiempo entiendes qué funciona para TI.' (String)
==> 00001045: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 00001049: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000104d: <NewObject>: <Reg8: 4>
==> 0000104f: <LoadConstString>: <Reg8: 6, string_id: 24886>  # String: 'El mejor maestro eres tú: tus patrones, escritos, te enseñan más que cualquier regla general.' (String)
==> 00001053: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 00001057: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 0000105b: <NewObject>: <Reg8: 4>
==> 0000105d: <LoadConstString>: <Reg8: 6, string_id: 23067>  # String: 'American Diabetes Association — Llevar un diario de comidas' (String)
==> 00001061: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 00001065: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00001069: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000106d: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 43945>  # String: 'diario-schemi' (Identifier)
==> 00001072: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194881>  # Object: {'t': 'Preparar con antelación', 's': 'La prisa es enemiga de las buenas elecciones'}
==> 00001080: <NewObject>: <Reg8: 4>
==> 00001082: <LoadConstString>: <Reg8: 3, string_id: 24098>  # String: 'Cuando tienes hambre y prisa, eliges la comida más rápida, que a menudo es también la más “rápida” para la glucosa. Tener algo ya listo y equilibrado le da la vuelta a la situación.' (String)
==> 00001086: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000108a: <NewArray>: <Reg8: 3, UInt16: 4>
==> 0000108e: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00001092: <NewObject>: <Reg8: 4>
==> 00001094: <LoadConstString>: <Reg8: 6, string_id: 24118>  # String: 'Cuece legumbres o cereales con antelación, ten verduras lavadas y frutos secos a mano: bastan pequeñas reservas para que la elección correcta sea fácil incluso con prisa.' (String)
==> 00001098: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 0000109c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000010a0: <NewObject>: <Reg8: 4>
==> 000010a2: <LoadConstString>: <Reg8: 6, string_id: 26458>  # String: 'La buena elección se prepara antes: si está lista, la prisa no te engaña.' (String)
==> 000010a6: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 000010aa: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000010ae: <NewObject>: <Reg8: 4>
==> 000010b0: <LoadConstString>: <Reg8: 6, string_id: 23089>  # String: 'American Diabetes Association — Preparación de comidas' (String)
==> 000010b4: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 41>  # String: 'label' (Identifier)
==> 000010b8: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000010bc: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000010c0: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 42253>  # String: 'meal-prep' (Identifier)
==> 000010c5: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 183474>  # Object: {'t': 'Alimentos “light” y marketing', 's': 'El texto grande, la verdad pequeña'}
==> 000010d3: <NewObject>: <Reg8: 4>
==> 000010d5: <LoadConstString>: <Reg8: 3, string_id: 31450>  # String: '“Light”, “fit”, “proteico”, “sin”: son palabras que venden, no garantías. Un producto “light en grasas” puede tener más azúcar; uno “proteico” puede ser igualmente rico en carbohidratos.' (String)
==> 000010d9: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000010dd: <NewArray>: <Reg8: 3, UInt16: 4>
==> 000010e1: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000010e5: <NewObject>: <Reg8: 4>
==> 000010e7: <LoadConstString>: <Reg8: 6, string_id: 26726>  # String: 'La única forma de saberlo es girar el producto y leer la tabla: carbohidratos, de los cuales azúcares, fibra y la porción real. El texto grande es publicidad.' (String)
==> 000010eb: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 000010ef: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000010f3: <NewObject>: <Reg8: 4>
==> 000010f5: <LoadConstString>: <Reg8: 6, string_id: 27658>  # String: 'No te fíes de la palabra de delante: la verdad está en la tabla de detrás.' (String)
==> 000010f9: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 6, string_id: 243>  # String: 'testo' (Identifier)
==> 000010fd: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00001101: <NewObject>: <Reg8: 4>
==> 00001103: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 00001107: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 0000110b: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000110f: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 37120>  # String: 'mito-light' (Identifier)
==> 00001114: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194886>  # Object: {'t': '¿“Las grasas suben la glucosa”?', 's': 'Solas casi no, pero cambian el ritmo'}
==> 00001122: <NewObject>: <Reg8: 4>
==> 00001124: <LoadConstString>: <Reg8: 3, string_id: 26584>  # String: 'La grasa sola sube poquísimo la glucosa: no es azúcar. Es más, junto a los carbohidratos los ralentiza, bajando el pico inmediato: es uno de los “frenos”.' (String)
==> 00001128: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 0000112c: <NewArray>: <Reg8: 3, UInt16: 5>
==> 00001130: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00001134: <NewObject>: <Reg8: 4>
==> 00001136: <LoadConstString>: <Reg8: 5, string_id: 26699>  # String: 'La sorpresa: mucha grasa junto a muchos carbohidratos (dulces grasos, fritos, pizza) prolonga la subida en el tiempo, la “segunda onda”. Frena el pico, pero alarga la cola.' (String)
==> 0000113a: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000113e: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 00001142: <NewObjectWithBufferLong>: <Reg8: 4, UInt16: 2, UInt16: 2, UInt32: 49843, UInt32: 194891>  # Object: {'cibo': 'Nueces', 'testo': 'Las nueces son casi todo grasas buenas: solas tienen un impacto insignificante y junto a un carbohidrato lo ralentizan.'}
==> 00001150: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00001154: <NewObject>: <Reg8: 4>
==> 00001156: <LoadConstString>: <Reg8: 5, string_id: 26583>  # String: 'La grasa no es azúcar: sola pesa poco, pero con muchos carbohidratos alarga la subida.' (String)
==> 0000115a: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 0000115e: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00001162: <NewObject>: <Reg8: 4>
==> 00001164: <LoadConstString>: <Reg8: 5, string_id: 30239>  # String: 'Wolpert et al., Diabetes Care 2013 — grasa y glucosa' (String)
==> 00001168: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 0000116c: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 4>
==> 00001170: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 00001174: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 41465>  # String: 'mito-grassi' (Identifier)
==> 00001179: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194896>  # Object: {'t': 'Estrés, sueño y glucosa', 's': 'No cuenta solo el plato'}
==> 00001187: <NewObject>: <Reg8: 4>
==> 00001189: <LoadConstString>: <Reg8: 3, string_id: 26572>  # String: 'La glucosa no responde solo a la comida. El estrés y el poco sueño pueden influir en ella: el cuerpo, bajo presión o cansado, gestiona el azúcar de otra manera. No es culpa tuya, es fisiología.' (String)
==> 0000118d: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00001191: <NewArray>: <Reg8: 3, UInt16: 4>
==> 00001195: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 00001199: <NewObject>: <Reg8: 4>
==> 0000119b: <LoadConstString>: <Reg8: 5, string_id: 28329>  # String: 'Por eso a veces la misma comida “se comporta” de forma distinta en días distintos. El descanso y el manejo del estrés no son un lujo: forman parte del cuadro.' (String)
==> 0000119f: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000011a3: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000011a7: <NewObject>: <Reg8: 4>
==> 000011a9: <LoadConstString>: <Reg8: 5, string_id: 29070>  # String: 'Si un día “no cuadra”, no es por fuerza la comida: el sueño y el estrés cuentan. Son notas educativas, no médicas.' (String)
==> 000011ad: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000011b1: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 000011b5: <NewObject>: <Reg8: 4>
==> 000011b7: <LoadConstString>: <Reg8: 5, string_id: 23042>  # String: 'American Diabetes Association — Estrés y sueño' (String)
==> 000011bb: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 000011bf: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 000011c3: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 000011c7: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 49064>  # String: 'stress-sonno' (Identifier)
==> 000011cc: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194901>  # Object: {'t': 'Qué es una fuente fiable', 's': 'Cómo reconocerla en 3 pasos'}
==> 000011da: <NewObject>: <Reg8: 4>
==> 000011dc: <LoadConstString>: <Reg8: 3, string_id: 29915>  # String: 'Una fuente fiable: 1) está publicada y es verificable (un organismo, una revista científica, no un post anónimo); 2) cita otros estudios; 3) admite sus propios límites en vez de prometer certezas absolutas.' (String)
==> 000011e0: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 000011e4: <NewArray>: <Reg8: 3, UInt16: 4>
==> 000011e8: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 000011ec: <NewObject>: <Reg8: 4>
==> 000011ee: <LoadConstString>: <Reg8: 5, string_id: 24419>  # String: 'Desconfía de lo contrario: ninguna fuente, tono de “secreto revelado”, promesas milagrosas y ninguna forma de comprobar de dónde viene la información.' (String)
==> 000011f2: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 000011f6: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 000011fa: <NewObject>: <Reg8: 4>
==> 000011fc: <LoadConstString>: <Reg8: 5, string_id: 28385>  # String: 'Pregúntate siempre: quién lo dice, en qué se basa, y ¿puedo verificarlo? Si no encuentras respuesta, suspende el juicio.' (String)
==> 00001200: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00001204: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 00001208: <NewObject>: <Reg8: 4>
==> 0000120a: <LoadConstString>: <Reg8: 5, string_id: 27877>  # String: 'OMS — Información sanitaria fiable' (String)
==> 0000120e: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 00001212: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00001216: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000121a: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 54177>  # String: 'fonte-affidabile' (Identifier)
==> 0000121f: <NewObjectWithBufferLong>: <Reg8: 2, UInt16: 3, UInt16: 2, UInt32: 49840, UInt32: 194906>  # Object: {'t': 'Preguntas frecuentes', 's': 'Las respuestas breves, con lo básico'}
==> 0000122d: <NewObject>: <Reg8: 4>
==> 0000122f: <LoadConstString>: <Reg8: 3, string_id: 31477>  # String: '“¿Debo eliminar los carbohidratos?” No: son energía. Aprendes CUÁLES y CUÁNTOS. “¿La fruta está prohibida?” No, mejor entera que en zumo. “¿Los dulces nunca?” No: después de comer y en porción medida.' (String)
==> 00001233: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 3, string_id: 243>  # String: 'testo' (Identifier)
==> 00001237: <NewArray>: <Reg8: 3, UInt16: 4>
==> 0000123b: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 0>
==> 0000123f: <NewObject>: <Reg8: 4>
==> 00001241: <LoadConstString>: <Reg8: 5, string_id: 31478>  # String: '“¿La app me cura?” No: es educativa, no médica. “¿Los valores son fiables?” Tienen una fuente y un estado (revisado/estimación), y unos controles automáticos mantienen los datos coherentes.' (String)
==> 00001245: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00001249: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 1>
==> 0000124d: <NewObject>: <Reg8: 4>
==> 0000124f: <LoadConstString>: <Reg8: 5, string_id: 26671>  # String: 'La regla que lo resume todo: ningún alimento está prohibido en absoluto, casi siempre es una cuestión de cuáles, cuántos y cómo.' (String)
==> 00001253: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 243>  # String: 'testo' (Identifier)
==> 00001257: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 2>
==> 0000125b: <NewObject>: <Reg8: 4>
==> 0000125d: <LoadConstString>: <Reg8: 5, string_id: 23088>  # String: 'American Diabetes Association — Preguntas frecuentes' (String)
==> 00001261: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 5, string_id: 41>  # String: 'label' (Identifier)
==> 00001265: <PutOwnByIndex>: <Reg8: 3, Reg8: 4, UInt8: 3>
==> 00001269: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 3, string_id: 16>  # String: 'b' (Identifier)
==> 0000126d: <PutNewOwnById>: <Reg8: 0, Reg8: 2, string_id: 47721>  # String: 'faq' (Identifier)
==> 00001272: <StoreToEnvironment>: <Reg8: 1, UInt8: 0, Reg8: 0>
==> 00001276: <LoadConstUndefined>: <Reg8: 0>
==> 00001278: <Ret>: <Reg8: 0>


===============

ERROR:root:Error while decompiling function "" (pass output): Traceback (most recent call last):
  File "C:\Users\l.balotta\AppData\Roaming\Python\Python314\site-packages\hermes_dec\decompilation\hbc_decompiler.py", line 80, in decompile_function
    dehydrated.output_code(state)
    ~~~~~~~~~~~~~~~~~~~~~~^^^^^^^
  File "C:\Users\l.balotta\AppData\Roaming\Python\Python314\site-packages\hermes_dec\decompilation\defs.py", line 167, in output_code
    assert self.function_name
           ^^^^^^^^^^^^^^^^^^
AssertionError


==== Falling back to Disassembly ====
=> [Function #17916 "" of 3898 bytes]: 8 params, frame size=20, strict=1, exc handler=0, debug info=0  @ offset 0x004b0200

Bytecode listing:

==> 00000000: <CreateEnvironment>: <Reg8: 2>
==> 00000002: <LoadParam>: <Reg8: 4, UInt8: 2>
==> 00000005: <LoadParam>: <Reg8: 7, UInt8: 6>
==> 00000008: <LoadParam>: <Reg8: 5, UInt8: 7>
==> 0000000b: <GetGlobalObject>: <Reg8: 1>
==> 0000000d: <TryGetById>: <Reg8: 9, Reg8: 1, UInt8: 1, string_id: 14>  # String: 'Object' (Identifier)
==> 00000013: <GetByIdShort>: <Reg8: 8, Reg8: 9, UInt8: 2, string_id: 96>  # String: 'defineProperty' (Identifier)
==> 00000018: <NewObject>: <Reg8: 6>
==> 0000001a: <LoadConstTrue>: <Reg8: 0>
==> 0000001c: <PutNewOwnByIdShort>: <Reg8: 6, Reg8: 0, string_id: 251>  # String: 'value' (Identifier)
==> 00000020: <LoadConstString>: <Reg8: 3, string_id: 27>  # String: '__esModule' (Identifier)
==> 00000024: <Call4>: <Reg8: 3, Reg8: 8, Reg8: 9, Reg8: 7, Reg8: 3, Reg8: 6>
==> 0000002b: <TryGetById>: <Reg8: 9, Reg8: 1, UInt8: 1, string_id: 14>  # String: 'Object' (Identifier)
==> 00000031: <GetByIdShort>: <Reg8: 8, Reg8: 9, UInt8: 2, string_id: 96>  # String: 'defineProperty' (Identifier)
==> 00000036: <NewObject>: <Reg8: 6>
==> 00000038: <PutNewOwnByIdShort>: <Reg8: 6, Reg8: 0, string_id: 110>  # String: 'enumerable' (Identifier)
==> 0000003c: <CreateClosure>: <Reg8: 3, Reg8: 2, function_id: 17917>  # Function: [#17917 get of 9 bytes]: 1 params @ offset 0x002e8262
==> 00000041: <PutNewOwnByIdShort>: <Reg8: 6, Reg8: 3, string_id: 133>  # String: 'get' (Identifier)
==> 00000045: <LoadConstString>: <Reg8: 3, string_id: 38186>  # String: 'HERO' (Identifier)
==> 00000049: <Call4>: <Reg8: 3, Reg8: 8, Reg8: 9, Reg8: 7, Reg8: 3, Reg8: 6>
==> 00000050: <TryGetById>: <Reg8: 9, Reg8: 1, UInt8: 1, string_id: 14>  # String: 'Object' (Identifier)
==> 00000056: <GetByIdShort>: <Reg8: 8, Reg8: 9, UInt8: 2, string_id: 96>  # String: 'defineProperty' (Identifier)
==> 0000005b: <NewObject>: <Reg8: 6>
==> 0000005d: <PutNewOwnByIdShort>: <Reg8: 6, Reg8: 0, string_id: 110>  # String: 'enumerable' (Identifier)
==> 00000061: <CreateClosure>: <Reg8: 3, Reg8: 2, function_id: 17918>  # Function: [#17918 get of 9 bytes]: 1 params @ offset 0x002e95e6
==> 00000066: <PutNewOwnByIdShort>: <Reg8: 6, Reg8: 3, string_id: 133>  # String: 'get' (Identifier)
==> 0000006a: <LoadConstString>: <Reg8: 3, string_id: 11946>  # String: 'MEAL_IMG' (String)
==> 0000006e: <Call4>: <Reg8: 3, Reg8: 8, Reg8: 9, Reg8: 7, Reg8: 3, Reg8: 6>
==> 00000075: <TryGetById>: <Reg8: 9, Reg8: 1, UInt8: 1, string_id: 14>  # String: 'Object' (Identifier)
==> 0000007b: <GetByIdShort>: <Reg8: 8, Reg8: 9, UInt8: 2, string_id: 96>  # String: 'defineProperty' (Identifier)
==> 00000080: <NewObject>: <Reg8: 6>
==> 00000082: <PutNewOwnByIdShort>: <Reg8: 6, Reg8: 0, string_id: 110>  # String: 'enumerable' (Identifier)
==> 00000086: <CreateClosure>: <Reg8: 3, Reg8: 2, function_id: 17919>  # Function: [#17919 get of 9 bytes]: 1 params @ offset 0x00305491
==> 0000008b: <PutNewOwnByIdShort>: <Reg8: 6, Reg8: 3, string_id: 133>  # String: 'get' (Identifier)
==> 0000008f: <LoadConstString>: <Reg8: 3, string_id: 2306>  # String: 'RECIPE_IMG' (String)
==> 00000093: <Call4>: <Reg8: 3, Reg8: 8, Reg8: 9, Reg8: 7, Reg8: 3, Reg8: 6>
==> 0000009a: <TryGetById>: <Reg8: 9, Reg8: 1, UInt8: 1, string_id: 14>  # String: 'Object' (Identifier)
==> 000000a0: <GetByIdShort>: <Reg8: 8, Reg8: 9, UInt8: 2, string_id: 96>  # String: 'defineProperty' (Identifier)
==> 000000a5: <NewObject>: <Reg8: 6>
==> 000000a7: <PutNewOwnByIdShort>: <Reg8: 6, Reg8: 0, string_id: 110>  # String: 'enumerable' (Identifier)
==> 000000ab: <CreateClosure>: <Reg8: 3, Reg8: 2, function_id: 17920>  # Function: [#17920 get of 9 bytes]: 1 params @ offset 0x0030bd7f
==> 000000b0: <PutNewOwnByIdShort>: <Reg8: 6, Reg8: 3, string_id: 133>  # String: 'get' (Identifier)
==> 000000b4: <LoadConstString>: <Reg8: 3, string_id: 37470>  # String: 'recipeImage' (Identifier)
==> 000000b8: <Call4>: <Reg8: 3, Reg8: 8, Reg8: 9, Reg8: 7, Reg8: 3, Reg8: 6>
==> 000000bf: <TryGetById>: <Reg8: 6, Reg8: 1, UInt8: 1, string_id: 14>  # String: 'Object' (Identifier)
==> 000000c5: <GetByIdShort>: <Reg8: 3, Reg8: 6, UInt8: 2, string_id: 96>  # String: 'defineProperty' (Identifier)
==> 000000ca: <NewObject>: <Reg8: 1>
==> 000000cc: <PutNewOwnByIdShort>: <Reg8: 1, Reg8: 0, string_id: 110>  # String: 'enumerable' (Identifier)
==> 000000d0: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 17921>  # Function: [#17921 get of 9 bytes]: 1 params @ offset 0x002f68f4
==> 000000d5: <PutNewOwnByIdShort>: <Reg8: 1, Reg8: 0, string_id: 133>  # String: 'get' (Identifier)
==> 000000d9: <LoadConstString>: <Reg8: 0, string_id: 42631>  # String: 'mealImage' (Identifier)
==> 000000dd: <Call4>: <Reg8: 0, Reg8: 3, Reg8: 6, Reg8: 7, Reg8: 0, Reg8: 1>
==> 000000e4: <LoadConstZero>: <Reg8: 0>
==> 000000e6: <GetByVal>: <Reg8: 1, Reg8: 5, Reg8: 0>
==> 000000ea: <LoadConstUndefined>: <Reg8: 0>
==> 000000ec: <Call2>: <Reg8: 1, Reg8: 4, Reg8: 0, Reg8: 1>
==> 000000f1: <StoreToEnvironment>: <Reg8: 2, UInt8: 0, Reg8: 1>
==> 000000f5: <NewObject>: <Reg8: 1>
==> 000000f7: <LoadConstUInt8>: <Reg8: 3, UInt8: 1>
==> 000000fa: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000000fe: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000103: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 35372>  # String: 'colazione' (Identifier)
==> 00000108: <LoadConstUInt8>: <Reg8: 3, UInt8: 2>
==> 0000010b: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 0000010f: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000114: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 35099>  # String: 'pranzo' (Identifier)
==> 00000119: <LoadConstUInt8>: <Reg8: 3, UInt8: 3>
==> 0000011c: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000120: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000125: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 35100>  # String: 'cena' (Identifier)
==> 0000012a: <LoadConstUInt8>: <Reg8: 3, UInt8: 4>
==> 0000012d: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000131: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000136: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 41698>  # String: 'spuntino' (Identifier)
==> 0000013b: <StoreToEnvironment>: <Reg8: 2, UInt8: 1, Reg8: 1>
==> 0000013f: <NewObject>: <Reg8: 1>
==> 00000141: <LoadConstUInt8>: <Reg8: 3, UInt8: 5>
==> 00000144: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000148: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000014d: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 43592>  # String: 'tiramisu' (Identifier)
==> 00000152: <LoadConstUInt8>: <Reg8: 3, UInt8: 6>
==> 00000155: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000159: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000015e: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 38997>  # String: 'bresaola-rucola-grana' (Identifier)
==> 00000163: <LoadConstUInt8>: <Reg8: 3, UInt8: 7>
==> 00000166: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 0000016a: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000016f: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 53864>  # String: 'finocchi-gratinati' (Identifier)
==> 00000174: <LoadConstUInt8>: <Reg8: 3, UInt8: 8>
==> 00000177: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 0000017b: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000180: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 45412>  # String: 'spiedini-pollo-verdure' (Identifier)
==> 00000185: <LoadConstUInt8>: <Reg8: 3, UInt8: 9>
==> 00000188: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 0000018c: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000191: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 51161>  # String: 'banana-e-miele' (Identifier)
==> 00000196: <LoadConstUInt8>: <Reg8: 3, UInt8: 10>
==> 00000199: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 0000019d: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000001a2: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 46017>  # String: 'risi-e-bisi' (Identifier)
==> 000001a7: <LoadConstUInt8>: <Reg8: 3, UInt8: 11>
==> 000001aa: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000001ae: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000001b3: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 43833>  # String: 'vitello-tonnato' (Identifier)
==> 000001b8: <LoadConstUInt8>: <Reg8: 3, UInt8: 12>
==> 000001bb: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000001bf: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000001c4: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 46990>  # String: 'pasta-al-ragu' (Identifier)
==> 000001c9: <LoadConstUInt8>: <Reg8: 3, UInt8: 13>
==> 000001cc: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000001d0: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000001d5: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 36531>  # String: 'risotto-al-pomodoro' (Identifier)
==> 000001da: <LoadConstUInt8>: <Reg8: 3, UInt8: 14>
==> 000001dd: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000001e1: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000001e6: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 35931>  # String: 'risotto-agli-asparagi' (Identifier)
==> 000001eb: <LoadConstUInt8>: <Reg8: 3, UInt8: 15>
==> 000001ee: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000001f2: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000001f7: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 53785>  # String: 'pane-e-cioccolato' (Identifier)
==> 000001fc: <LoadConstUInt8>: <Reg8: 3, UInt8: 16>
==> 000001ff: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000203: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000208: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 34609>  # String: 'banana-e-cioccolato' (Identifier)
==> 0000020d: <LoadConstUInt8>: <Reg8: 3, UInt8: 17>
==> 00000210: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000214: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000219: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 42189>  # String: 'riso-integrale-verdure' (Identifier)
==> 0000021e: <LoadConstUInt8>: <Reg8: 3, UInt8: 18>
==> 00000221: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000225: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000022a: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 52698>  # String: 'zuppa-farro-fagioli' (Identifier)
==> 0000022f: <LoadConstUInt8>: <Reg8: 3, UInt8: 19>
==> 00000232: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000236: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000023b: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 44985>  # String: 'pasta-patate-provola' (Identifier)
==> 00000240: <LoadConstUInt8>: <Reg8: 3, UInt8: 20>
==> 00000243: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000247: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000024c: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 36810>  # String: 'melanzane-a-funghetto' (Identifier)
==> 00000251: <LoadConstUInt8>: <Reg8: 3, UInt8: 21>
==> 00000254: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000258: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000025d: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 51160>  # String: 'porridge-con-banana' (Identifier)
==> 00000262: <LoadConstUInt8>: <Reg8: 3, UInt8: 22>
==> 00000265: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000269: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000026e: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 40603>  # String: 'avocado-e-gamberi' (Identifier)
==> 00000273: <LoadConstUInt8>: <Reg8: 3, UInt8: 23>
==> 00000276: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 0000027a: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000027f: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 34887>  # String: 'insalata-con-avocado' (Identifier)
==> 00000284: <LoadConstUInt8>: <Reg8: 3, UInt8: 24>
==> 00000287: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 0000028b: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000290: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 34449>  # String: 'segale-salmone-affumicato' (Identifier)
==> 00000295: <LoadConstUInt8>: <Reg8: 3, UInt8: 25>
==> 00000298: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 0000029c: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000002a1: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 39473>  # String: 'segale-salmone-avocado' (Identifier)
==> 000002a6: <LoadConstUInt8>: <Reg8: 3, UInt8: 26>
==> 000002a9: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000002ad: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000002b2: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 46744>  # String: 'crackers-e-formaggio' (Identifier)
==> 000002b7: <LoadConstUInt8>: <Reg8: 3, UInt8: 27>
==> 000002ba: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000002be: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000002c3: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 54553>  # String: 'grissini-e-prosciutto' (Identifier)
==> 000002c8: <LoadConstUInt8>: <Reg8: 3, UInt8: 28>
==> 000002cb: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000002cf: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000002d4: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 50555>  # String: 'zuppa-di-ceci' (Identifier)
==> 000002d9: <LoadConstUInt8>: <Reg8: 3, UInt8: 29>
==> 000002dc: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000002e0: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000002e5: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 45628>  # String: 'pasta-fredda' (Identifier)
==> 000002ea: <LoadConstUInt8>: <Reg8: 3, UInt8: 30>
==> 000002ed: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000002f1: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000002f6: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 52407>  # String: 'cous-cous-verdure-ceci' (Identifier)
==> 000002fb: <LoadConstUInt8>: <Reg8: 3, UInt8: 31>
==> 000002fe: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000302: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000307: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 39854>  # String: 'tacchino-alla-pizzaiola' (Identifier)
==> 0000030c: <LoadConstUInt8>: <Reg8: 3, UInt8: 32>
==> 0000030f: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000313: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000318: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 37683>  # String: 'scaloppine-ai-funghi' (Identifier)
==> 0000031d: <LoadConstUInt8>: <Reg8: 3, UInt8: 33>
==> 00000320: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000324: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000329: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 44983>  # String: 'straccetti-con-rucola' (Identifier)
==> 0000032e: <LoadConstUInt8>: <Reg8: 3, UInt8: 34>
==> 00000331: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000335: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000033a: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 45955>  # String: 'calamari-coi-piselli' (Identifier)
==> 0000033f: <LoadConstUInt8>: <Reg8: 3, UInt8: 35>
==> 00000342: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000346: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000034b: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 39586>  # String: 'cozze-alla-marinara' (Identifier)
==> 00000350: <LoadConstUInt8>: <Reg8: 3, UInt8: 36>
==> 00000353: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000357: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000035c: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 43406>  # String: 'tonno-e-fagioli' (Identifier)
==> 00000361: <LoadConstUInt8>: <Reg8: 3, UInt8: 37>
==> 00000364: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000368: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000036d: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 35958>  # String: 'barbabietole-in-insalata' (Identifier)
==> 00000372: <LoadConstUInt8>: <Reg8: 3, UInt8: 38>
==> 00000375: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000379: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000037e: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 43217>  # String: 'insalata-di-pomodori' (Identifier)
==> 00000383: <LoadConstUInt8>: <Reg8: 3, UInt8: 39>
==> 00000386: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 0000038a: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000038f: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 35635>  # String: 'pancake' (Identifier)
==> 00000394: <LoadConstUInt8>: <Reg8: 3, UInt8: 40>
==> 00000397: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 0000039b: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000003a0: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 40650>  # String: 'yogurt-e-corn-flakes' (Identifier)
==> 000003a5: <LoadConstUInt8>: <Reg8: 3, UInt8: 41>
==> 000003a8: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000003ac: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000003b1: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 42234>  # String: 'risotto-ai-gamberi' (Identifier)
==> 000003b6: <LoadConstUInt8>: <Reg8: 3, UInt8: 42>
==> 000003b9: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000003bd: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000003c2: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 37171>  # String: 'pasta-e-piselli' (Identifier)
==> 000003c7: <LoadConstUInt8>: <Reg8: 3, UInt8: 43>
==> 000003ca: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000003ce: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000003d3: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 42083>  # String: 'pasta-cacio-e-pepe' (Identifier)
==> 000003d8: <LoadConstUInt8>: <Reg8: 3, UInt8: 44>
==> 000003db: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000003df: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000003e4: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 39011>  # String: 'pollo-al-limone' (Identifier)
==> 000003e9: <LoadConstUInt8>: <Reg8: 3, UInt8: 45>
==> 000003ec: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000003f0: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000003f5: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 47632>  # String: 'pollo-con-peperoni' (Identifier)
==> 000003fa: <LoadConstUInt8>: <Reg8: 3, UInt8: 46>
==> 000003fd: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000401: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000406: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 50819>  # String: 'involtini-melanzane-ricotta' (Identifier)
==> 0000040b: <LoadConstUInt8>: <Reg8: 3, UInt8: 47>
==> 0000040e: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000412: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000417: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 43423>  # String: 'zucchine-trifolate' (Identifier)
==> 0000041c: <LoadConstUInt8>: <Reg8: 3, UInt8: 48>
==> 0000041f: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000423: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000428: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 44727>  # String: 'piselli-al-prosciutto' (Identifier)
==> 0000042d: <LoadConstUInt8>: <Reg8: 3, UInt8: 49>
==> 00000430: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000434: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000439: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 52268>  # String: 'cavolfiore-all-olio' (Identifier)
==> 0000043e: <LoadConstUInt8>: <Reg8: 3, UInt8: 50>
==> 00000441: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000445: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000044a: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 35548>  # String: 'fette-ricotta-fragole' (Identifier)
==> 0000044f: <LoadConstUInt8>: <Reg8: 3, UInt8: 51>
==> 00000452: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000456: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000045b: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 36980>  # String: 'mela-cotta' (Identifier)
==> 00000460: <LoadConstUInt8>: <Reg8: 3, UInt8: 52>
==> 00000463: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000467: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000046c: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 40678>  # String: 'yogurt-e-miele' (Identifier)
==> 00000471: <LoadConstUInt8>: <Reg8: 3, UInt8: 53>
==> 00000474: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000478: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000047d: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 32260>  # String: 'insalata-finocchi-arance' (Identifier)
==> 00000482: <LoadConstUInt8>: <Reg8: 3, UInt8: 54>
==> 00000485: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000489: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000048e: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 40066>  # String: 'toast-con-avocado' (Identifier)
==> 00000493: <LoadConstUInt8>: <Reg8: 3, UInt8: 55>
==> 00000496: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 0000049a: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000049f: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 45670>  # String: 'sardine-al-pomodoro' (Identifier)
==> 000004a4: <LoadConstUInt8>: <Reg8: 3, UInt8: 56>
==> 000004a7: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000004ab: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000004b0: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 54342>  # String: 'spinaci-all-olio' (Identifier)
==> 000004b5: <LoadConstUInt8>: <Reg8: 3, UInt8: 57>
==> 000004b8: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000004bc: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000004c1: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 43427>  # String: 'broccoli-ripassati' (Identifier)
==> 000004c6: <LoadConstUInt8>: <Reg8: 3, UInt8: 58>
==> 000004c9: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000004cd: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000004d2: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 52103>  # String: 'carciofi-trifolati' (Identifier)
==> 000004d7: <LoadConstUInt8>: <Reg8: 3, UInt8: 59>
==> 000004da: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000004de: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000004e3: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 43738>  # String: 'peperonata' (Identifier)
==> 000004e8: <LoadConstUInt8>: <Reg8: 3, UInt8: 60>
==> 000004eb: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000004ef: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000004f4: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 38799>  # String: 'caponata-di-melanzane' (Identifier)
==> 000004f9: <LoadConstUInt8>: <Reg8: 3, UInt8: 61>
==> 000004fc: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000500: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000505: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 37785>  # String: 'pane-integrale-burro-miele' (Identifier)
==> 0000050a: <LoadConstUInt8>: <Reg8: 3, UInt8: 62>
==> 0000050d: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000511: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000516: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 40176>  # String: 'yogurt-banana-mandorle' (Identifier)
==> 0000051b: <LoadConstUInt8>: <Reg8: 3, UInt8: 63>
==> 0000051e: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000522: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000527: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 43023>  # String: 'frullato-di-frutta' (Identifier)
==> 0000052c: <LoadConstUInt8>: <Reg8: 3, UInt8: 64>
==> 0000052f: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000533: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000538: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 35182>  # String: 'fette-crema-nocciola' (Identifier)
==> 0000053d: <LoadConstUInt8>: <Reg8: 3, UInt8: 65>
==> 00000540: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000544: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000549: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 39699>  # String: 'ricotta-e-miele' (Identifier)
==> 0000054e: <LoadConstUInt8>: <Reg8: 3, UInt8: 66>
==> 00000551: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000555: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000055a: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 43457>  # String: 'gamberi-e-cannellini' (Identifier)
==> 0000055f: <LoadConstUInt8>: <Reg8: 3, UInt8: 67>
==> 00000562: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000566: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000056b: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 50915>  # String: 'sgombro-alla-griglia' (Identifier)
==> 00000570: <LoadConstUInt8>: <Reg8: 3, UInt8: 68>
==> 00000573: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000577: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000057c: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 42734>  # String: 'trota-al-cartoccio' (Identifier)
==> 00000581: <LoadConstUInt8>: <Reg8: 3, UInt8: 69>
==> 00000584: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000588: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000058d: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 43405>  # String: 'salmone-al-forno-patate' (Identifier)
==> 00000592: <LoadConstUInt8>: <Reg8: 3, UInt8: 70>
==> 00000595: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000599: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000059e: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 52848>  # String: 'coniglio-in-umido' (Identifier)
==> 000005a3: <LoadConstUInt8>: <Reg8: 3, UInt8: 71>
==> 000005a6: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000005aa: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000005af: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 37976>  # String: 'hamburger-con-insalata' (Identifier)
==> 000005b4: <LoadConstUInt8>: <Reg8: 3, UInt8: 72>
==> 000005b7: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000005bb: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000005c0: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 54504>  # String: 'polpette-al-sugo' (Identifier)
==> 000005c5: <LoadConstUInt8>: <Reg8: 3, UInt8: 73>
==> 000005c8: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000005cc: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000005d1: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 47744>  # String: 'salsiccia-e-cavolo-nero' (Identifier)
==> 000005d6: <LoadConstUInt8>: <Reg8: 3, UInt8: 74>
==> 000005d9: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000005dd: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000005e2: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 37700>  # String: 'scaloppine-al-limone' (Identifier)
==> 000005e7: <LoadConstUInt8>: <Reg8: 3, UInt8: 75>
==> 000005ea: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000005ee: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000005f3: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 51687>  # String: 'branzino-al-forno-con-patate' (Identifier)
==> 000005f8: <LoadConstUInt8>: <Reg8: 3, UInt8: 76>
==> 000005fb: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000005ff: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000604: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 51870>  # String: 'calamari-in-umido' (Identifier)
==> 00000609: <LoadConstUInt8>: <Reg8: 3, UInt8: 77>
==> 0000060c: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000610: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000615: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 37978>  # String: 'farro-con-verdure' (Identifier)
==> 0000061a: <LoadConstUInt8>: <Reg8: 3, UInt8: 78>
==> 0000061d: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000621: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000626: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 37753>  # String: 'fette-biscottate-marmellata' (Identifier)
==> 0000062b: <LoadConstUInt8>: <Reg8: 3, UInt8: 79>
==> 0000062e: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000632: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000637: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 47157>  # String: 'frittata-di-patate' (Identifier)
==> 0000063c: <LoadConstUInt8>: <Reg8: 3, UInt8: 80>
==> 0000063f: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000643: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000648: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 54343>  # String: 'frittata-di-zucchine' (Identifier)
==> 0000064d: <LoadConstUInt8>: <Reg8: 3, UInt8: 81>
==> 00000650: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000654: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000659: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 44750>  # String: 'gamberi-e-zucchine' (Identifier)
==> 0000065e: <LoadConstUInt8>: <Reg8: 3, UInt8: 82>
==> 00000661: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000665: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000066a: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 37380>  # String: 'insalata-caprese' (Identifier)
==> 0000066f: <LoadConstUInt8>: <Reg8: 3, UInt8: 83>
==> 00000672: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000676: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000067b: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 45223>  # String: 'insalata-ceci-tonno' (Identifier)
==> 00000680: <LoadConstUInt8>: <Reg8: 3, UInt8: 84>
==> 00000683: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000687: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000068c: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 43627>  # String: 'insalata-di-riso' (Identifier)
==> 00000691: <LoadConstUInt8>: <Reg8: 3, UInt8: 85>
==> 00000694: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000698: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000069d: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 38002>  # String: 'insalata-mista' (Identifier)
==> 000006a2: <LoadConstUInt8>: <Reg8: 3, UInt8: 86>
==> 000006a5: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000006a9: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000006ae: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 45347>  # String: 'latte-e-corn-flakes' (Identifier)
==> 000006b3: <LoadConstUInt8>: <Reg8: 3, UInt8: 87>
==> 000006b6: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000006ba: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000006bf: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 42931>  # String: 'macedonia-di-frutta' (Identifier)
==> 000006c4: <LoadConstUInt8>: <Reg8: 3, UInt8: 88>
==> 000006c7: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000006cb: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000006d0: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 49379>  # String: 'mela-e-mandorle' (Identifier)
==> 000006d5: <LoadConstUInt8>: <Reg8: 3, UInt8: 89>
==> 000006d8: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000006dc: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000006e1: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 42425>  # String: 'merluzzo-al-pomodoro' (Identifier)
==> 000006e6: <LoadConstUInt8>: <Reg8: 3, UInt8: 90>
==> 000006e9: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000006ed: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000006f2: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 35127>  # String: 'minestrone-di-verdure' (Identifier)
==> 000006f7: <LoadConstUInt8>: <Reg8: 3, UInt8: 91>
==> 000006fa: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000006fe: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000703: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 53818>  # String: 'pane-integrale-prosciutto' (Identifier)
==> 00000708: <LoadConstUInt8>: <Reg8: 3, UInt8: 92>
==> 0000070b: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 0000070f: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000714: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 53831>  # String: 'pane-integrale-ricotta-miele' (Identifier)
==> 00000719: <LoadConstUInt8>: <Reg8: 3, UInt8: 93>
==> 0000071c: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000720: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000725: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 44756>  # String: 'parmigiana-di-melanzane' (Identifier)
==> 0000072a: <LoadConstUInt8>: <Reg8: 3, UInt8: 94>
==> 0000072d: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000731: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000736: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 46350>  # String: 'pasta-al-pesto' (Identifier)
==> 0000073b: <LoadConstUInt8>: <Reg8: 3, UInt8: 95>
==> 0000073e: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000742: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000747: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 35273>  # String: 'pasta-al-tonno' (Identifier)
==> 0000074c: <LoadConstUInt8>: <Reg8: 3, UInt8: 96>
==> 0000074f: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000753: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000758: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 41006>  # String: 'pasta-all-amatriciana' (Identifier)
==> 0000075d: <LoadConstUInt8>: <Reg8: 3, UInt8: 97>
==> 00000760: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000764: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000769: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 49456>  # String: 'pasta-alla-carbonara' (Identifier)
==> 0000076e: <LoadConstUInt8>: <Reg8: 3, UInt8: 98>
==> 00000771: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000775: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000077a: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 48557>  # String: 'pasta-alla-norma' (Identifier)
==> 0000077f: <LoadConstUInt8>: <Reg8: 3, UInt8: 99>
==> 00000782: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000786: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000078b: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 35842>  # String: 'pasta-e-ceci' (Identifier)
==> 00000790: <LoadConstUInt8>: <Reg8: 3, UInt8: 100>
==> 00000793: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000797: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000079c: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 53544>  # String: 'pasta-e-fagioli' (Identifier)
==> 000007a1: <LoadConstUInt8>: <Reg8: 3, UInt8: 101>
==> 000007a4: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000007a8: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000007ad: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 48301>  # String: 'pasta-e-lenticchie' (Identifier)
==> 000007b2: <LoadConstUInt8>: <Reg8: 3, UInt8: 102>
==> 000007b5: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000007b9: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000007be: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 33200>  # String: 'pasta-integrale-al-pomodoro' (Identifier)
==> 000007c3: <LoadConstUInt8>: <Reg8: 3, UInt8: 103>
==> 000007c6: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000007ca: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000007cf: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 39884>  # String: 'patate-al-forno' (Identifier)
==> 000007d4: <LoadConstUInt8>: <Reg8: 3, UInt8: 104>
==> 000007d7: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000007db: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000007e0: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 34651>  # String: 'penne-all-arrabbiata' (Identifier)
==> 000007e5: <LoadConstUInt8>: <Reg8: 3, UInt8: 105>
==> 000007e8: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000007ec: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000007f1: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 45698>  # String: 'petto-di-pollo-e-zucchine' (Identifier)
==> 000007f6: <LoadConstUInt8>: <Reg8: 3, UInt8: 106>
==> 000007f9: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000007fd: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000802: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 40616>  # String: 'pollo-alla-cacciatora' (Identifier)
==> 00000807: <LoadConstUInt8>: <Reg8: 3, UInt8: 107>
==> 0000080a: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 0000080e: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000813: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 42171>  # String: 'polpo-e-patate' (Identifier)
==> 00000818: <LoadConstUInt8>: <Reg8: 3, UInt8: 108>
==> 0000081b: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 0000081f: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000824: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 50791>  # String: 'porridge-avena-mela-noci' (Identifier)
==> 00000829: <LoadConstUInt8>: <Reg8: 3, UInt8: 109>
==> 0000082c: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000830: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000835: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 39171>  # String: 'ricotta-e-fragole' (Identifier)
==> 0000083a: <LoadConstUInt8>: <Reg8: 3, UInt8: 110>
==> 0000083d: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000841: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000846: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 40647>  # String: 'riso-pollo-verdure' (Identifier)
==> 0000084b: <LoadConstUInt8>: <Reg8: 3, UInt8: 111>
==> 0000084e: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000852: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000857: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 39806>  # String: 'risotto-ai-funghi' (Identifier)
==> 0000085c: <LoadConstUInt8>: <Reg8: 3, UInt8: 112>
==> 0000085f: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000863: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000868: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 43695>  # String: 'risotto-alla-parmigiana' (Identifier)
==> 0000086d: <LoadConstUInt8>: <Reg8: 3, UInt8: 113>
==> 00000870: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000874: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000879: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 45102>  # String: 'risotto-frutti-di-mare' (Identifier)
==> 0000087e: <LoadConstUInt8>: <Reg8: 3, UInt8: 114>
==> 00000881: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000885: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000088a: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 34613>  # String: 'salmone-con-broccoli' (Identifier)
==> 0000088f: <LoadConstUInt8>: <Reg8: 3, UInt8: 115>
==> 00000892: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000896: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000089b: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 44979>  # String: 'spaghetti-aglio-olio' (Identifier)
==> 000008a0: <LoadConstUInt8>: <Reg8: 3, UInt8: 116>
==> 000008a3: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000008a7: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000008ac: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 44988>  # String: 'spaghetti-al-pomodoro' (Identifier)
==> 000008b1: <LoadConstUInt8>: <Reg8: 3, UInt8: 117>
==> 000008b4: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000008b8: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000008bd: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 44999>  # String: 'spaghetti-alle-vongole' (Identifier)
==> 000008c2: <LoadConstUInt8>: <Reg8: 3, UInt8: 118>
==> 000008c5: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000008c9: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000008ce: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 32407>  # String: 'spezzatino-di-manzo' (Identifier)
==> 000008d3: <LoadConstUInt8>: <Reg8: 3, UInt8: 119>
==> 000008d6: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000008da: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000008df: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 52431>  # String: 'uova-strapazzate-spinaci' (Identifier)
==> 000008e4: <LoadConstUInt8>: <Reg8: 3, UInt8: 120>
==> 000008e7: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000008eb: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000008f0: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 37784>  # String: 'uovo-e-pane-integrale' (Identifier)
==> 000008f5: <LoadConstUInt8>: <Reg8: 3, UInt8: 121>
==> 000008f8: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000008fc: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000901: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 36604>  # String: 'verdure-grigliate' (Identifier)
==> 00000906: <LoadConstUInt8>: <Reg8: 3, UInt8: 122>
==> 00000909: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 0000090d: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000912: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 40750>  # String: 'yogurt-greco-frutta-noci' (Identifier)
==> 00000917: <LoadConstUInt8>: <Reg8: 3, UInt8: 123>
==> 0000091a: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 0000091e: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000923: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 40808>  # String: 'yogurt-greco-mirtilli' (Identifier)
==> 00000928: <LoadConstUInt8>: <Reg8: 3, UInt8: 124>
==> 0000092b: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 0000092f: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000934: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 47099>  # String: 'zuppa-di-lenticchie' (Identifier)
==> 00000939: <LoadConstUInt8>: <Reg8: 3, UInt8: 125>
==> 0000093c: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000940: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000945: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 37456>  # String: 'fagioli-all-uccelletto' (Identifier)
==> 0000094a: <LoadConstUInt8>: <Reg8: 3, UInt8: 126>
==> 0000094d: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000951: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000956: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 52430>  # String: 'insalata-tonno-fagioli-uova' (Identifier)
==> 0000095b: <LoadConstUInt8>: <Reg8: 3, UInt8: 127>
==> 0000095e: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000962: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000967: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 49205>  # String: 'zuppa-di-piselli' (Identifier)
==> 0000096c: <LoadConstUInt8>: <Reg8: 3, UInt8: 128>
==> 0000096f: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000973: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000978: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 43878>  # String: 'peperoni-e-patate' (Identifier)
==> 0000097d: <LoadConstUInt8>: <Reg8: 3, UInt8: 129>
==> 00000980: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000984: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000989: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 50919>  # String: 'spinaci-e-ricotta' (Identifier)
==> 0000098e: <LoadConstUInt8>: <Reg8: 3, UInt8: 130>
==> 00000991: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000995: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000099a: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 40067>  # String: 'insalata-ceci-feta' (Identifier)
==> 0000099f: <LoadConstUInt8>: <Reg8: 3, UInt8: 131>
==> 000009a2: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000009a6: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000009ab: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 54344>  # String: 'frittata-zucchine-patate' (Identifier)
==> 000009b0: <LoadConstUInt8>: <Reg8: 3, UInt8: 132>
==> 000009b3: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000009b7: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000009bc: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 42781>  # String: 'frutta-secca-mista' (Identifier)
==> 000009c1: <LoadConstUInt8>: <Reg8: 3, UInt8: 133>
==> 000009c4: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000009c8: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000009cd: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 40222>  # String: 'toast-con-miele' (Identifier)
==> 000009d2: <LoadConstUInt8>: <Reg8: 3, UInt8: 134>
==> 000009d5: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000009d9: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000009de: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 33761>  # String: 'pane-e-marmellata' (Identifier)
==> 000009e3: <LoadConstUInt8>: <Reg8: 3, UInt8: 135>
==> 000009e6: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000009ea: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000009ef: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 37525>  # String: 'fette-con-miele' (Identifier)
==> 000009f4: <LoadConstUInt8>: <Reg8: 3, UInt8: 136>
==> 000009f7: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000009fb: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000a00: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 55704>  # String: 'porridge-banana-miele' (Identifier)
==> 00000a05: <LoadConstUInt8>: <Reg8: 3, UInt8: 137>
==> 00000a08: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000a0c: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000a11: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 36237>  # String: 'datteri-e-mandorle' (Identifier)
==> 00000a16: <LoadConstUInt8>: <Reg8: 3, UInt8: 138>
==> 00000a19: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000a1d: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000a22: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 54359>  # String: 'frullato-banana-latte' (Identifier)
==> 00000a27: <LoadConstUInt8>: <Reg8: 3, UInt8: 139>
==> 00000a2a: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000a2e: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000a33: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 38387>  # String: 'riso-pre-gara' (Identifier)
==> 00000a38: <LoadConstUInt8>: <Reg8: 3, UInt8: 140>
==> 00000a3b: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000a3f: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000a44: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 36236>  # String: 'mela-e-datteri' (Identifier)
==> 00000a49: <LoadConstUInt8>: <Reg8: 3, UInt8: 141>
==> 00000a4c: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000a50: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000a55: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 40289>  # String: 'yogurt-banana-miele' (Identifier)
==> 00000a5a: <LoadConstUInt8>: <Reg8: 3, UInt8: 142>
==> 00000a5d: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000a61: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000a66: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 33672>  # String: 'riso-tonno-piselli' (Identifier)
==> 00000a6b: <LoadConstUInt8>: <Reg8: 3, UInt8: 143>
==> 00000a6e: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000a72: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000a77: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 38955>  # String: 'pasta-al-forno' (Identifier)
==> 00000a7c: <LoadConstUInt8>: <Reg8: 3, UInt8: 144>
==> 00000a7f: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000a83: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000a88: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 40699>  # String: 'insalata-greca' (Identifier)
==> 00000a8d: <LoadConstUInt8>: <Reg8: 3, UInt8: 145>
==> 00000a90: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000a94: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000a99: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 40625>  # String: 'uova-al-pomodoro' (Identifier)
==> 00000a9e: <LoadConstUInt8>: <Reg8: 3, UInt8: 146>
==> 00000aa1: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000aa5: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000aaa: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 44185>  # String: 'risotto-alla-zucca' (Identifier)
==> 00000aaf: <LoadConstUInt8>: <Reg8: 3, UInt8: 147>
==> 00000ab2: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000ab6: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000abb: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 39400>  # String: 'toast-prosciutto-formaggio' (Identifier)
==> 00000ac0: <LoadConstUInt8>: <Reg8: 3, UInt8: 148>
==> 00000ac3: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000ac7: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000acc: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 34477>  # String: 'torta-di-mele' (Identifier)
==> 00000ad1: <LoadConstUInt8>: <Reg8: 3, UInt8: 149>
==> 00000ad4: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000ad8: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000add: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 42126>  # String: 'crostata-di-marmellata' (Identifier)
==> 00000ae2: <LoadConstUInt8>: <Reg8: 3, UInt8: 150>
==> 00000ae5: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000ae9: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000aee: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 46678>  # String: 'panna-cotta' (Identifier)
==> 00000af3: <LoadConstUInt8>: <Reg8: 3, UInt8: 151>
==> 00000af6: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000afa: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000aff: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 43360>  # String: 'budino-al-cioccolato' (Identifier)
==> 00000b04: <LoadConstUInt8>: <Reg8: 3, UInt8: 152>
==> 00000b07: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000b0b: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000b10: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 36398>  # String: 'ciambellone' (Identifier)
==> 00000b15: <LoadConstUInt8>: <Reg8: 3, UInt8: 153>
==> 00000b18: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000b1c: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000b21: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 39585>  # String: 'spaghetti-con-le-cozze' (Identifier)
==> 00000b26: <LoadConstUInt8>: <Reg8: 3, UInt8: 154>
==> 00000b29: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000b2d: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000b32: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 40752>  # String: 'pasta-alle-zucchine' (Identifier)
==> 00000b37: <LoadConstUInt8>: <Reg8: 3, UInt8: 155>
==> 00000b3a: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000b3e: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000b43: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 36733>  # String: 'pasta-e-broccoli' (Identifier)
==> 00000b48: <LoadConstUInt8>: <Reg8: 3, UInt8: 156>
==> 00000b4b: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000b4f: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000b54: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 35578>  # String: 'pasta-integrale-broccoli' (Identifier)
==> 00000b59: <LoadConstUInt8>: <Reg8: 3, UInt8: 157>
==> 00000b5c: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000b60: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000b65: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 35959>  # String: 'insalata-di-bresaola' (Identifier)
==> 00000b6a: <LoadConstUInt8>: <Reg8: 3, UInt8: 158>
==> 00000b6d: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000b71: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000b76: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 47156>  # String: 'frittata-di-cipolle' (Identifier)
==> 00000b7b: <LoadConstUInt8>: <Reg8: 3, UInt8: 159>
==> 00000b7e: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000b82: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000b87: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 37977>  # String: 'insalata-di-farro' (Identifier)
==> 00000b8c: <LoadConstUInt8>: <Reg8: 3, UInt8: 160>
==> 00000b8f: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000b93: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000b98: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 54360>  # String: 'frullato-pre-gara' (Identifier)
==> 00000b9d: <LoadConstUInt8>: <Reg8: 3, UInt8: 161>
==> 00000ba0: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000ba4: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000ba9: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 32956>  # String: 'frullato-proteico' (Identifier)
==> 00000bae: <LoadConstUInt8>: <Reg8: 3, UInt8: 162>
==> 00000bb1: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000bb5: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000bba: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 34962>  # String: 'pollo-e-riso' (Identifier)
==> 00000bbf: <LoadConstUInt8>: <Reg8: 3, UInt8: 163>
==> 00000bc2: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000bc6: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000bcb: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 48080>  # String: 'frittata-patate-dolci' (Identifier)
==> 00000bd0: <LoadConstUInt8>: <Reg8: 3, UInt8: 164>
==> 00000bd3: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000bd7: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000bdc: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 42170>  # String: 'insalata-di-polpo' (Identifier)
==> 00000be1: <LoadConstUInt8>: <Reg8: 3, UInt8: 165>
==> 00000be4: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000be8: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000bed: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 53040>  # String: 'cozze-e-patate' (Identifier)
==> 00000bf2: <LoadConstUInt8>: <Reg8: 3, UInt8: 166>
==> 00000bf5: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000bf9: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000bfe: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 40619>  # String: 'pomodori-col-riso' (Identifier)
==> 00000c03: <LoadConstUInt8>: <Reg8: 3, UInt8: 167>
==> 00000c06: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000c0a: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000c0f: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 50837>  # String: 'minestra-orzo-verdura' (Identifier)
==> 00000c14: <LoadConstUInt8>: <Reg8: 3, UInt8: 168>
==> 00000c17: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000c1b: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000c20: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 46012>  # String: 'vellutata-di-zucca' (Identifier)
==> 00000c25: <LoadConstUInt8>: <Reg8: 3, UInt8: 169>
==> 00000c28: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000c2c: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000c31: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 41501>  # String: 'insalata-di-pollo' (Identifier)
==> 00000c36: <LoadConstUInt8>: <Reg8: 3, UInt8: 170>
==> 00000c39: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000c3d: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000c42: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 51095>  # String: 'baccala-alla-vicentina' (Identifier)
==> 00000c47: <LoadConstUInt8>: <Reg8: 3, UInt8: 171>
==> 00000c4a: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000c4e: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000c53: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 41473>  # String: 'insalata-di-mare' (Identifier)
==> 00000c58: <LoadConstUInt8>: <Reg8: 3, UInt8: 172>
==> 00000c5b: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000c5f: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000c64: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 47831>  # String: 'baccala-con-ceci' (Identifier)
==> 00000c69: <LoadConstUInt8>: <Reg8: 3, UInt8: 173>
==> 00000c6c: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000c70: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000c75: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 53545>  # String: 'fagiolini-all-olio' (Identifier)
==> 00000c7a: <LoadConstUInt8>: <Reg8: 3, UInt8: 174>
==> 00000c7d: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000c81: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000c86: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 52269>  # String: 'cavolfiore-gratinato' (Identifier)
==> 00000c8b: <LoadConstUInt8>: <Reg8: 3, UInt8: 175>
==> 00000c8e: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000c92: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000c97: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 45149>  # String: 'zucca-al-forno' (Identifier)
==> 00000c9c: <LoadConstUInt8>: <Reg8: 3, UInt8: 176>
==> 00000c9f: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000ca3: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000ca8: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 46170>  # String: 'bruschetta-al-pomodoro' (Identifier)
==> 00000cad: <LoadConstUInt8>: <Reg8: 3, UInt8: 177>
==> 00000cb0: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000cb4: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000cb9: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 37235>  # String: 'pere-e-noci' (Identifier)
==> 00000cbe: <LoadConstUInt8>: <Reg8: 3, UInt8: 178>
==> 00000cc1: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000cc5: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000cca: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 39491>  # String: 'spaghetti-alla-puttanesca' (Identifier)
==> 00000ccf: <LoadConstUInt8>: <Reg8: 3, UInt8: 179>
==> 00000cd2: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000cd6: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000cdb: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 32610>  # String: 'riso-al-tonno' (Identifier)
==> 00000ce0: <LoadConstUInt8>: <Reg8: 3, UInt8: 180>
==> 00000ce3: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000ce7: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000cec: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 39460>  # String: 'merluzzo-al-forno-verdure' (Identifier)
==> 00000cf1: <LoadConstUInt8>: <Reg8: 3, UInt8: 181>
==> 00000cf4: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000cf8: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000cfd: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 40532>  # String: 'yogurt-datteri-noci' (Identifier)
==> 00000d02: <LoadConstUInt8>: <Reg8: 3, UInt8: 182>
==> 00000d05: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000d09: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000d0e: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 38951>  # String: 'pasta-alla-gricia' (Identifier)
==> 00000d13: <LoadConstUInt8>: <Reg8: 3, UInt8: 183>
==> 00000d16: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000d1a: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000d1f: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 34612>  # String: 'pasta-al-salmone' (Identifier)
==> 00000d24: <LoadConstUInt8>: <Reg8: 3, UInt8: 184>
==> 00000d27: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000d2b: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000d30: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 39146>  # String: 'trofie-al-pesto' (Identifier)
==> 00000d35: <LoadConstUInt8>: <Reg8: 3, UInt8: 185>
==> 00000d38: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000d3c: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000d41: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 41124>  # String: 'pasta-e-zucca' (Identifier)
==> 00000d46: <LoadConstUInt8>: <Reg8: 3, UInt8: 186>
==> 00000d49: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000d4d: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000d52: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 41483>  # String: 'quinoa-con-verdure' (Identifier)
==> 00000d57: <LoadConstUInt8>: <Reg8: 3, UInt8: 187>
==> 00000d5a: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000d5e: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000d63: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 54341>  # String: 'frittata-di-spinaci' (Identifier)
==> 00000d68: <LoadConstUInt8>: <Reg8: 3, UInt8: 188>
==> 00000d6b: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000d6f: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000d74: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 47743>  # String: 'pasta-broccoli-salsiccia' (Identifier)
==> 00000d79: <LoadConstUInt8>: <Reg8: 3, UInt8: 189>
==> 00000d7c: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000d80: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000d85: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 55135>  # String: 'pasta-con-le-sarde' (Identifier)
==> 00000d8a: <LoadConstUInt8>: <Reg8: 3, UInt8: 190>
==> 00000d8d: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000d91: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000d96: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 48947>  # String: 'orzotto-alle-verdure' (Identifier)
==> 00000d9b: <LoadConstUInt8>: <Reg8: 3, UInt8: 191>
==> 00000d9e: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000da2: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000da7: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 36142>  # String: 'orzotto-ai-funghi' (Identifier)
==> 00000dac: <LoadConstUInt8>: <Reg8: 3, UInt8: 192>
==> 00000daf: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000db3: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000db8: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 35552>  # String: 'uova-sode-maionese' (Identifier)
==> 00000dbd: <LoadConstUInt8>: <Reg8: 3, UInt8: 193>
==> 00000dc0: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000dc4: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000dc9: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 41468>  # String: 'insalata-di-finocchi' (Identifier)
==> 00000dce: <LoadConstUInt8>: <Reg8: 3, UInt8: 194>
==> 00000dd1: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000dd5: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000dda: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 34611>  # String: 'segale-ricotta-miele' (Identifier)
==> 00000ddf: <LoadConstUInt8>: <Reg8: 3, UInt8: 195>
==> 00000de2: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000de6: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000deb: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 46750>  # String: 'insalata-farro-avocado' (Identifier)
==> 00000df0: <LoadConstUInt8>: <Reg8: 3, UInt8: 196>
==> 00000df3: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000df7: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000dfc: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 34450>  # String: 'salmone-affumicato-e-uova' (Identifier)
==> 00000e01: <LoadConstUInt8>: <Reg8: 3, UInt8: 197>
==> 00000e04: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000e08: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000e0d: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 49304>  # String: 'pasta-alla-boscaiola' (Identifier)
==> 00000e12: <LoadConstUInt8>: <Reg8: 3, UInt8: 198>
==> 00000e15: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000e19: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000e1e: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 40026>  # String: 'pasta-zucchine-gamberi' (Identifier)
==> 00000e23: <LoadConstUInt8>: <Reg8: 3, UInt8: 199>
==> 00000e26: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000e2a: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000e2f: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 39646>  # String: 'riso-e-lenticchie' (Identifier)
==> 00000e34: <LoadConstUInt8>: <Reg8: 3, UInt8: 200>
==> 00000e37: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000e3b: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000e40: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 46804>  # String: 'arista-con-patate' (Identifier)
==> 00000e45: <LoadConstUInt8>: <Reg8: 3, UInt8: 201>
==> 00000e48: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000e4c: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000e51: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 48971>  # String: 'insalata-riso-integrale' (Identifier)
==> 00000e56: <LoadConstUInt8>: <Reg8: 3, UInt8: 202>
==> 00000e59: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000e5d: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000e62: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 44474>  # String: 'farro-tonno-pomodoro' (Identifier)
==> 00000e67: <LoadConstUInt8>: <Reg8: 3, UInt8: 203>
==> 00000e6a: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000e6e: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000e73: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 35967>  # String: 'insalata-ceci-verdure' (Identifier)
==> 00000e78: <LoadConstUInt8>: <Reg8: 3, UInt8: 204>
==> 00000e7b: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000e7f: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000e84: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 34620>  # String: 'bulgur-con-verdure' (Identifier)
==> 00000e89: <LoadConstUInt8>: <Reg8: 3, UInt8: 205>
==> 00000e8c: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000e90: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000e95: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 45838>  # String: 'frittatina-zucchine-ricotta' (Identifier)
==> 00000e9a: <LoadConstUInt8>: <Reg8: 3, UInt8: 206>
==> 00000e9d: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000ea1: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000ea6: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 40786>  # String: 'yogurt-greco-frutti-di-bosco-mandorle' (Identifier)
==> 00000eab: <LoadConstUInt8>: <Reg8: 3, UInt8: 207>
==> 00000eae: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000eb2: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000eb7: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 51771>  # String: 'budino-di-chia-mirtilli' (Identifier)
==> 00000ebc: <LoadConstUInt8>: <Reg8: 3, UInt8: 208>
==> 00000ebf: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000ec3: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000ec8: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 40718>  # String: 'ricotta-frutti-di-bosco-noci' (Identifier)
==> 00000ecd: <LoadConstUInt8>: <Reg8: 3, UInt8: 209>
==> 00000ed0: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000ed4: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000ed9: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 40609>  # String: 'avocado-uovo-in-camicia' (Identifier)
==> 00000ede: <LoadConstUInt8>: <Reg8: 3, UInt8: 210>
==> 00000ee1: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000ee5: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000eea: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 48000>  # String: 'fiocchi-di-latte-fragole' (Identifier)
==> 00000eef: <LoadConstUInt8>: <Reg8: 3, UInt8: 211>
==> 00000ef2: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000ef6: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000efb: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 43103>  # String: 'omelette-funghi-formaggio' (Identifier)
==> 00000f00: <LoadConstUInt8>: <Reg8: 3, UInt8: 212>
==> 00000f03: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000f07: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000f0c: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 44889>  # String: 'uova-sode-avocado-pomodorini' (Identifier)
==> 00000f11: <LoadConstUInt8>: <Reg8: 3, UInt8: 213>
==> 00000f14: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 00000f18: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000f1d: <PutNewOwnById>: <Reg8: 1, Reg8: 3, string_id: 50918>  # String: 'frullato-verde-spinaci' (Identifier)
==> 00000f22: <StoreToEnvironment>: <Reg8: 2, UInt8: 2, Reg8: 1>
==> 00000f26: <CreateClosure>: <Reg8: 1, Reg8: 2, function_id: 17922>  # Function: [#17922 recipeImage of 24 bytes]: 2 params @ offset 0x004b113a
==> 00000f2b: <StoreToEnvironment>: <Reg8: 2, UInt8: 3, Reg8: 1>
==> 00000f2f: <CreateClosure>: <Reg8: 1, Reg8: 2, function_id: 17923>  # Function: [#17923 mealImage of 24 bytes]: 2 params @ offset 0x004b1152
==> 00000f34: <StoreToEnvironment>: <Reg8: 2, UInt8: 4, Reg8: 1>
==> 00000f38: <Ret>: <Reg8: 0>


===============

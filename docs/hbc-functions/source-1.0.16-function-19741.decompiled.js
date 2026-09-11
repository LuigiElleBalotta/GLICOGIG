
==== Falling back to Disassembly ====
=> [Function #19741 "" of 297 bytes]: 8 params, frame size=22, strict=1, exc handler=0, debug info=0  @ offset 0x0050413d

Bytecode listing:

==> 00000000: <CreateEnvironment>: <Reg8: 2>
==> 00000002: <LoadParam>: <Reg8: 4, UInt8: 2>
==> 00000005: <LoadParam>: <Reg8: 1, UInt8: 6>
==> 00000008: <LoadParam>: <Reg8: 5, UInt8: 7>
==> 0000000b: <CreateClosure>: <Reg8: 3, Reg8: 2, function_id: 19742>  # Function: [#19742 _interopDefault of 28 bytes]: 2 params @ offset 0x002f58ff
==> 00000010: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 19743>  # Function: [#19743 mulberry32 of 22 bytes]: 2 params @ offset 0x00504266
==> 00000015: <StoreToEnvironment>: <Reg8: 2, UInt8: 6, Reg8: 0>
==> 00000019: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 19745>  # Function: [#19745 giornoIndice of 96 bytes]: 1 params @ offset 0x0050430b
==> 0000001e: <StoreToEnvironment>: <Reg8: 2, UInt8: 7, Reg8: 0>
==> 00000022: <CreateClosure>: <Reg8: 6, Reg8: 2, function_id: 19746>  # Function: [#19746 hashStr of 94 bytes]: 2 params @ offset 0x0050436b
==> 00000027: <StoreToEnvironment>: <Reg8: 2, UInt8: 8, Reg8: 6>
==> 0000002b: <CreateClosure>: <Reg8: 6, Reg8: 2, function_id: 19747>  # Function: [#19747 mescolaOpzioni of 214 bytes]: 3 params @ offset 0x005043c9
==> 00000030: <StoreToEnvironment>: <Reg8: 2, UInt8: 9, Reg8: 6>
==> 00000034: <CreateClosure>: <Reg8: 6, Reg8: 2, function_id: 19753>  # Function: [#19753 _statoQuiz of 53 bytes]: 1 params @ offset 0x00504594
==> 00000039: <StoreToEnvironment>: <Reg8: 2, UInt8: 10, Reg8: 6>
==> 0000003d: <CreateClosure>: <Reg8: 6, Reg8: 2, function_id: 19757>  # Function: [#19757 _salvaRisultato of 53 bytes]: 1 params @ offset 0x005046ef
==> 00000042: <StoreToEnvironment>: <Reg8: 2, UInt8: 11, Reg8: 6>
==> 00000046: <GetGlobalObject>: <Reg8: 7>
==> 00000048: <TryGetById>: <Reg8: 11, Reg8: 7, UInt8: 1, string_id: 14>  # String: 'Object' (Identifier)
==> 0000004e: <GetByIdShort>: <Reg8: 10, Reg8: 11, UInt8: 2, string_id: 96>  # String: 'defineProperty' (Identifier)
==> 00000053: <NewObject>: <Reg8: 9>
==> 00000055: <LoadConstTrue>: <Reg8: 6>
==> 00000057: <PutNewOwnByIdShort>: <Reg8: 9, Reg8: 6, string_id: 251>  # String: 'value' (Identifier)
==> 0000005b: <LoadConstString>: <Reg8: 8, string_id: 27>  # String: '__esModule' (Identifier)
==> 0000005f: <Call4>: <Reg8: 8, Reg8: 10, Reg8: 11, Reg8: 1, Reg8: 8, Reg8: 9>
==> 00000066: <TryGetById>: <Reg8: 9, Reg8: 7, UInt8: 1, string_id: 14>  # String: 'Object' (Identifier)
==> 0000006c: <GetByIdShort>: <Reg8: 8, Reg8: 9, UInt8: 2, string_id: 96>  # String: 'defineProperty' (Identifier)
==> 00000071: <NewObject>: <Reg8: 7>
==> 00000073: <PutNewOwnByIdShort>: <Reg8: 7, Reg8: 6, string_id: 110>  # String: 'enumerable' (Identifier)
==> 00000077: <CreateClosure>: <Reg8: 6, Reg8: 2, function_id: 19762>  # Function: [#19762 get of 9 bytes]: 1 params @ offset 0x002f68f4
==> 0000007c: <PutNewOwnByIdShort>: <Reg8: 7, Reg8: 6, string_id: 133>  # String: 'get' (Identifier)
==> 00000080: <LoadConstString>: <Reg8: 6, string_id: 32788>  # String: 'N_AL_GIORNO' (Identifier)
==> 00000084: <Call4>: <Reg8: 6, Reg8: 8, Reg8: 9, Reg8: 1, Reg8: 6, Reg8: 7>
==> 0000008b: <PutById>: <Reg8: 1, Reg8: 0, UInt8: 1, string_id: 40540>  # String: 'giornoIndice' (Identifier)
==> 00000091: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 19751>  # Function: [#19751 quizDelGiorno of 203 bytes]: 1 params @ offset 0x005044c9
==> 00000096: <PutById>: <Reg8: 1, Reg8: 0, UInt8: 2, string_id: 55604>  # String: 'quizDelGiorno' (Identifier)
==> 0000009c: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 19752>  # Function: [#19752 statoQuiz of 30 bytes]: 1 params @ offset 0x0039fb38
==> 000000a1: <PutById>: <Reg8: 1, Reg8: 0, UInt8: 3, string_id: 44280>  # String: 'statoQuiz' (Identifier)
==> 000000a7: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 19756>  # Function: [#19756 salvaRisultato of 30 bytes]: 2 params @ offset 0x0039f3a5
==> 000000ac: <PutById>: <Reg8: 1, Reg8: 0, UInt8: 4, string_id: 47462>  # String: 'salvaRisultato' (Identifier)
==> 000000b2: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 19760>  # Function: [#19760 livello of 229 bytes]: 2 params @ offset 0x005048ed
==> 000000b7: <PutById>: <Reg8: 1, Reg8: 0, UInt8: 5, string_id: 40917>  # String: 'livello' (Identifier)
==> 000000bd: <LoadConstZero>: <Reg8: 0>
==> 000000bf: <GetByVal>: <Reg8: 1, Reg8: 5, Reg8: 0>
==> 000000c3: <LoadConstUndefined>: <Reg8: 0>
==> 000000c5: <Call2>: <Reg8: 1, Reg8: 4, Reg8: 0, Reg8: 1>
==> 000000ca: <Call2>: <Reg8: 1, Reg8: 3, Reg8: 0, Reg8: 1>
==> 000000cf: <StoreToEnvironment>: <Reg8: 2, UInt8: 0, Reg8: 1>
==> 000000d3: <LoadConstUInt8>: <Reg8: 1, UInt8: 1>
==> 000000d6: <GetByVal>: <Reg8: 1, Reg8: 5, Reg8: 1>
==> 000000da: <Call2>: <Reg8: 1, Reg8: 4, Reg8: 0, Reg8: 1>
==> 000000df: <Call2>: <Reg8: 1, Reg8: 3, Reg8: 0, Reg8: 1>
==> 000000e4: <LoadConstUInt8>: <Reg8: 3, UInt8: 2>
==> 000000e7: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000000eb: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000000f0: <StoreToEnvironment>: <Reg8: 2, UInt8: 1, Reg8: 3>
==> 000000f4: <LoadConstUInt8>: <Reg8: 3, UInt8: 3>
==> 000000f7: <GetByVal>: <Reg8: 3, Reg8: 5, Reg8: 3>
==> 000000fb: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 00000100: <StoreToEnvironment>: <Reg8: 2, UInt8: 2, Reg8: 3>
==> 00000104: <GetByIdShort>: <Reg8: 1, Reg8: 1, UInt8: 3, string_id: 40>  # String: 'default' (Identifier)
==> 00000109: <GetById>: <Reg8: 1, Reg8: 1, UInt8: 4, string_id: 34225>  # String: 'domande' (Identifier)
==> 0000010f: <StoreToEnvironment>: <Reg8: 2, UInt8: 3, Reg8: 1>
==> 00000113: <LoadConstUInt8>: <Reg8: 1, UInt8: 10>
==> 00000116: <StoreNPToEnvironment>: <Reg8: 2, UInt8: 4, Reg8: 1>
==> 0000011a: <CreateClosure>: <Reg8: 1, Reg8: 2, function_id: 19763>  # Function: [#19763  of 115 bytes]: 1 params @ offset 0x00504a22
==> 0000011f: <Call1>: <Reg8: 1, Reg8: 1, Reg8: 0>
==> 00000123: <StoreToEnvironment>: <Reg8: 2, UInt8: 5, Reg8: 1>
==> 00000127: <Ret>: <Reg8: 0>


===============

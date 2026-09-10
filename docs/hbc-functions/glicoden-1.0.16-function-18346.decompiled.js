ERROR:root:Error while decompiling function "" (pass output): Traceback (most recent call last):
  File "C:\Users\l.balotta\AppData\Roaming\Python\Python314\site-packages\hermes_dec\decompilation\hbc_decompiler.py", line 80, in decompile_function
    dehydrated.output_code(state)
    ~~~~~~~~~~~~~~~~~~~~~~^^^^^^^
  File "C:\Users\l.balotta\AppData\Roaming\Python\Python314\site-packages\hermes_dec\decompilation\defs.py", line 167, in output_code
    assert self.function_name
           ^^^^^^^^^^^^^^^^^^
AssertionError


==== Falling back to Disassembly ====
=> [Function #18346 "" of 408 bytes]: 8 params, frame size=22, strict=1, exc handler=0, debug info=0  @ offset 0x004bae32

Bytecode listing:

==> 00000000: <CreateEnvironment>: <Reg8: 2>
==> 00000002: <LoadParam>: <Reg8: 5, UInt8: 2>
==> 00000005: <LoadParam>: <Reg8: 1, UInt8: 6>
==> 00000008: <LoadParam>: <Reg8: 6, UInt8: 7>
==> 0000000b: <CreateClosure>: <Reg8: 7, Reg8: 2, function_id: 18347>  # Function: [#18347 _interopDefault of 28 bytes]: 2 params @ offset 0x002f58ff
==> 00000010: <CreateClosure>: <Reg8: 4, Reg8: 2, function_id: 18348>  # Function: [#18348 giornoLocale of 160 bytes]: 2 params @ offset 0x004bafca
==> 00000015: <StoreToEnvironment>: <Reg8: 2, UInt8: 14, Reg8: 4>
==> 00000019: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 18350>  # Function: [#18350 emit of 85 bytes]: 1 params @ offset 0x004bb1b4
==> 0000001e: <StoreToEnvironment>: <Reg8: 2, UInt8: 15, Reg8: 0>
==> 00000022: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 18352>  # Function: [#18352 caricaDiario of 30 bytes]: 1 params @ offset 0x0039f6e3
==> 00000027: <StoreToEnvironment>: <Reg8: 2, UInt8: 16, Reg8: 0>
==> 0000002b: <CreateClosure>: <Reg8: 3, Reg8: 2, function_id: 18353>  # Function: [#18353 _caricaDiario of 53 bytes]: 1 params @ offset 0x004bb209
==> 00000030: <StoreToEnvironment>: <Reg8: 2, UInt8: 17, Reg8: 3>
==> 00000034: <GetGlobalObject>: <Reg8: 3>
==> 00000036: <TryGetById>: <Reg8: 11, Reg8: 3, UInt8: 1, string_id: 14>  # String: 'Object' (Identifier)
==> 0000003c: <GetByIdShort>: <Reg8: 10, Reg8: 11, UInt8: 2, string_id: 96>  # String: 'defineProperty' (Identifier)
==> 00000041: <NewObject>: <Reg8: 9>
==> 00000043: <LoadConstTrue>: <Reg8: 8>
==> 00000045: <PutNewOwnByIdShort>: <Reg8: 9, Reg8: 8, string_id: 251>  # String: 'value' (Identifier)
==> 00000049: <LoadConstString>: <Reg8: 8, string_id: 27>  # String: '__esModule' (Identifier)
==> 0000004d: <Call4>: <Reg8: 8, Reg8: 10, Reg8: 11, Reg8: 1, Reg8: 8, Reg8: 9>
==> 00000054: <PutById>: <Reg8: 1, Reg8: 4, UInt8: 1, string_id: 39480>  # String: 'giornoLocale' (Identifier)
==> 0000005a: <CreateClosure>: <Reg8: 4, Reg8: 2, function_id: 18349>  # Function: [#18349 snapshotDaVoce of 330 bytes]: 3 params @ offset 0x004bb06a
==> 0000005f: <PutById>: <Reg8: 1, Reg8: 4, UInt8: 2, string_id: 43290>  # String: 'snapshotDaVoce' (Identifier)
==> 00000065: <PutById>: <Reg8: 1, Reg8: 0, UInt8: 3, string_id: 38405>  # String: 'caricaDiario' (Identifier)
==> 0000006b: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 18357>  # Function: [#18357 impostaProssimoSlot of 52 bytes]: 2 params @ offset 0x004bb2ed
==> 00000070: <PutById>: <Reg8: 1, Reg8: 0, UInt8: 4, string_id: 54955>  # String: 'impostaProssimoSlot' (Identifier)
==> 00000076: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 18358>  # Function: [#18358 registraMangiato of 257 bytes]: 2 params @ offset 0x004bb321
==> 0000007b: <PutById>: <Reg8: 1, Reg8: 0, UInt8: 5, string_id: 41474>  # String: 'registraMangiato' (Identifier)
==> 00000081: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 18359>  # Function: [#18359 rimuoviDalDiario of 47 bytes]: 2 params @ offset 0x004bb422
==> 00000086: <PutById>: <Reg8: 1, Reg8: 0, UInt8: 6, string_id: 36086>  # String: 'rimuoviDalDiario' (Identifier)
==> 0000008c: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 18361>  # Function: [#18361 rinominaVoce of 87 bytes]: 3 params @ offset 0x004bb451
==> 00000091: <PutById>: <Reg8: 1, Reg8: 0, UInt8: 7, string_id: 41865>  # String: 'rinominaVoce' (Identifier)
==> 00000097: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 18363>  # Function: [#18363 spostaSlot of 54 bytes]: 3 params @ offset 0x004bb500
==> 0000009c: <PutById>: <Reg8: 1, Reg8: 0, UInt8: 8, string_id: 47694>  # String: 'spostaSlot' (Identifier)
==> 000000a2: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 18365>  # Function: [#18365 vociDelGiorno of 49 bytes]: 2 params @ offset 0x004bb56f
==> 000000a7: <PutById>: <Reg8: 1, Reg8: 0, UInt8: 9, string_id: 34178>  # String: 'vociDelGiorno' (Identifier)
==> 000000ad: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 18367>  # Function: [#18367 vociUltimiGiorni of 115 bytes]: 1 params @ offset 0x004bb5b6
==> 000000b2: <PutById>: <Reg8: 1, Reg8: 0, UInt8: 10, string_id: 38905>  # String: 'vociUltimiGiorni' (Identifier)
==> 000000b8: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 18369>  # Function: [#18369 vociTutte of 22 bytes]: 1 params @ offset 0x004bb63f
==> 000000bd: <PutById>: <Reg8: 1, Reg8: 0, UInt8: 11, string_id: 37401>  # String: 'vociTutte' (Identifier)
==> 000000c3: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 18370>  # Function: [#18370 totali of 38 bytes]: 2 params @ offset 0x004bb655
==> 000000c8: <PutById>: <Reg8: 1, Reg8: 0, UInt8: 12, string_id: 32057>  # String: 'totali' (Identifier)
==> 000000ce: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 18372>  # Function: [#18372 useDiario of 86 bytes]: 1 params @ offset 0x004bb6fd
==> 000000d3: <PutById>: <Reg8: 1, Reg8: 0, UInt8: 13, string_id: 55735>  # String: 'useDiario' (Identifier)
==> 000000d9: <LoadConstZero>: <Reg8: 1>
==> 000000db: <GetByVal>: <Reg8: 4, Reg8: 6, Reg8: 1>
==> 000000df: <LoadConstUndefined>: <Reg8: 0>
==> 000000e1: <Call2>: <Reg8: 4, Reg8: 5, Reg8: 0, Reg8: 4>
==> 000000e6: <Call2>: <Reg8: 4, Reg8: 7, Reg8: 0, Reg8: 4>
==> 000000eb: <StoreToEnvironment>: <Reg8: 2, UInt8: 0, Reg8: 4>
==> 000000ef: <LoadConstUInt8>: <Reg8: 4, UInt8: 1>
==> 000000f2: <GetByVal>: <Reg8: 4, Reg8: 6, Reg8: 4>
==> 000000f6: <Call2>: <Reg8: 4, Reg8: 5, Reg8: 0, Reg8: 4>
==> 000000fb: <Call2>: <Reg8: 4, Reg8: 7, Reg8: 0, Reg8: 4>
==> 00000100: <StoreToEnvironment>: <Reg8: 2, UInt8: 1, Reg8: 4>
==> 00000104: <LoadConstUInt8>: <Reg8: 4, UInt8: 2>
==> 00000107: <GetByVal>: <Reg8: 4, Reg8: 6, Reg8: 4>
==> 0000010b: <Call2>: <Reg8: 4, Reg8: 5, Reg8: 0, Reg8: 4>
==> 00000110: <StoreToEnvironment>: <Reg8: 2, UInt8: 2, Reg8: 4>
==> 00000114: <LoadConstUInt8>: <Reg8: 4, UInt8: 3>
==> 00000117: <GetByVal>: <Reg8: 4, Reg8: 6, Reg8: 4>
==> 0000011b: <Call2>: <Reg8: 4, Reg8: 5, Reg8: 0, Reg8: 4>
==> 00000120: <StoreToEnvironment>: <Reg8: 2, UInt8: 3, Reg8: 4>
==> 00000124: <LoadConstUInt8>: <Reg8: 4, UInt8: 4>
==> 00000127: <GetByVal>: <Reg8: 4, Reg8: 6, Reg8: 4>
==> 0000012b: <Call2>: <Reg8: 4, Reg8: 5, Reg8: 0, Reg8: 4>
==> 00000130: <StoreToEnvironment>: <Reg8: 2, UInt8: 4, Reg8: 4>
==> 00000134: <LoadConstUInt8>: <Reg8: 4, UInt8: 5>
==> 00000137: <GetByVal>: <Reg8: 4, Reg8: 6, Reg8: 4>
==> 0000013b: <Call2>: <Reg8: 4, Reg8: 5, Reg8: 0, Reg8: 4>
==> 00000140: <StoreToEnvironment>: <Reg8: 2, UInt8: 5, Reg8: 4>
==> 00000144: <CreateClosure>: <Reg8: 4, Reg8: 2, function_id: 18375>  # Function: [#18375 r0 of 28 bytes]: 2 params @ offset 0x004bb7b2
==> 00000149: <StoreToEnvironment>: <Reg8: 2, UInt8: 6, Reg8: 4>
==> 0000014d: <NewArray>: <Reg8: 4, UInt16: 0>
==> 00000151: <StoreToEnvironment>: <Reg8: 2, UInt8: 7, Reg8: 4>
==> 00000155: <LoadConstFalse>: <Reg8: 4>
==> 00000157: <StoreNPToEnvironment>: <Reg8: 2, UInt8: 8, Reg8: 4>
==> 0000015b: <TryGetById>: <Reg8: 3, Reg8: 3, UInt8: 3, string_id: 18>  # String: 'Set' (Identifier)
==> 00000161: <GetByIdShort>: <Reg8: 4, Reg8: 3, UInt8: 4, string_id: 157>  # String: 'prototype' (Identifier)
==> 00000166: <CreateThis>: <Reg8: 4, Reg8: 4, Reg8: 3>
==> 0000016a: <Mov>: <Reg8: 15, Reg8: 4>
==> 0000016d: <Construct>: <Reg8: 3, Reg8: 3, UInt8: 1>
==> 00000171: <SelectObject>: <Reg8: 3, Reg8: 4, Reg8: 3>
==> 00000175: <StoreToEnvironment>: <Reg8: 2, UInt8: 9, Reg8: 3>
==> 00000179: <StoreNPToEnvironment>: <Reg8: 2, UInt8: 10, Reg8: 1>
==> 0000017d: <CreateClosure>: <Reg8: 1, Reg8: 2, function_id: 18376>  # Function: [#18376 uid of 62 bytes]: 1 params @ offset 0x004bb7ce
==> 00000182: <StoreToEnvironment>: <Reg8: 2, UInt8: 11, Reg8: 1>
==> 00000186: <LoadConstNull>: <Reg8: 1>
==> 00000188: <StoreNPToEnvironment>: <Reg8: 2, UInt8: 12, Reg8: 1>
==> 0000018c: <LoadConstInt>: <Reg8: 1, Imm32: 120000>
==> 00000192: <StoreNPToEnvironment>: <Reg8: 2, UInt8: 13, Reg8: 1>
==> 00000196: <Ret>: <Reg8: 0>


===============

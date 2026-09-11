
==== Falling back to Disassembly ====
=> [Function #19251 "" of 536 bytes]: 8 params, frame size=21, strict=1, exc handler=0, debug info=0  @ offset 0x004e6af0

Bytecode listing:

==> 00000000: <CreateEnvironment>: <Reg8: 2>
==> 00000002: <LoadParam>: <Reg8: 5, UInt8: 2>
==> 00000005: <LoadParam>: <Reg8: 3, UInt8: 6>
==> 00000008: <LoadParam>: <Reg8: 6, UInt8: 7>
==> 0000000b: <CreateClosure>: <Reg8: 4, Reg8: 2, function_id: 19252>  # Function: [#19252 _interopDefault of 28 bytes]: 2 params @ offset 0x002f58ff
==> 00000010: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 19253>  # Function: [#19253 correggiSecco of 122 bytes]: 3 params @ offset 0x004e6d08
==> 00000015: <StoreToEnvironment>: <Reg8: 2, UInt8: 9, Reg8: 0>
==> 00000019: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 19255>  # Function: [#19255 porzioneGrammi of 95 bytes]: 2 params @ offset 0x004e6da5
==> 0000001e: <StoreToEnvironment>: <Reg8: 2, UInt8: 10, Reg8: 0>
==> 00000022: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 19257>  # Function: [#19257 _cercaProdotto of 53 bytes]: 1 params @ offset 0x004e6e04
==> 00000027: <StoreToEnvironment>: <Reg8: 2, UInt8: 11, Reg8: 0>
==> 0000002b: <GetGlobalObject>: <Reg8: 1>
==> 0000002d: <TryGetById>: <Reg8: 10, Reg8: 1, UInt8: 1, string_id: 14>  # String: 'Object' (Identifier)
==> 00000033: <GetByIdShort>: <Reg8: 9, Reg8: 10, UInt8: 2, string_id: 96>  # String: 'defineProperty' (Identifier)
==> 00000038: <NewObject>: <Reg8: 8>
==> 0000003a: <LoadConstTrue>: <Reg8: 0>
==> 0000003c: <PutNewOwnByIdShort>: <Reg8: 8, Reg8: 0, string_id: 251>  # String: 'value' (Identifier)
==> 00000040: <LoadConstString>: <Reg8: 7, string_id: 27>  # String: '__esModule' (Identifier)
==> 00000044: <Call4>: <Reg8: 7, Reg8: 9, Reg8: 10, Reg8: 3, Reg8: 7, Reg8: 8>
==> 0000004b: <TryGetById>: <Reg8: 9, Reg8: 1, UInt8: 1, string_id: 14>  # String: 'Object' (Identifier)
==> 00000051: <GetByIdShort>: <Reg8: 8, Reg8: 9, UInt8: 2, string_id: 96>  # String: 'defineProperty' (Identifier)
==> 00000056: <NewObject>: <Reg8: 7>
==> 00000058: <PutNewOwnByIdShort>: <Reg8: 7, Reg8: 0, string_id: 110>  # String: 'enumerable' (Identifier)
==> 0000005c: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 19261>  # Function: [#19261 get of 9 bytes]: 1 params @ offset 0x0030bd88
==> 00000061: <PutNewOwnByIdShort>: <Reg8: 7, Reg8: 0, string_id: 133>  # String: 'get' (Identifier)
==> 00000065: <LoadConstString>: <Reg8: 0, string_id: 41596>  # String: 'ProdottoNonTrovato' (Identifier)
==> 00000069: <Call4>: <Reg8: 0, Reg8: 8, Reg8: 9, Reg8: 3, Reg8: 0, Reg8: 7>
==> 00000070: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 19256>  # Function: [#19256 cercaProdotto of 30 bytes]: 2 params @ offset 0x0039f3a5
==> 00000075: <PutById>: <Reg8: 3, Reg8: 0, UInt8: 1, string_id: 33684>  # String: 'cercaProdotto' (Identifier)
==> 0000007b: <LoadConstZero>: <Reg8: 0>
==> 0000007d: <GetByVal>: <Reg8: 3, Reg8: 6, Reg8: 0>
==> 00000081: <LoadConstUndefined>: <Reg8: 0>
==> 00000083: <Call2>: <Reg8: 3, Reg8: 5, Reg8: 0, Reg8: 3>
==> 00000088: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000008d: <StoreToEnvironment>: <Reg8: 2, UInt8: 0, Reg8: 3>
==> 00000091: <LoadConstUInt8>: <Reg8: 3, UInt8: 1>
==> 00000094: <GetByVal>: <Reg8: 3, Reg8: 6, Reg8: 3>
==> 00000098: <Call2>: <Reg8: 3, Reg8: 5, Reg8: 0, Reg8: 3>
==> 0000009d: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000000a2: <StoreToEnvironment>: <Reg8: 2, UInt8: 1, Reg8: 3>
==> 000000a6: <LoadConstUInt8>: <Reg8: 3, UInt8: 2>
==> 000000a9: <GetByVal>: <Reg8: 3, Reg8: 6, Reg8: 3>
==> 000000ad: <Call2>: <Reg8: 3, Reg8: 5, Reg8: 0, Reg8: 3>
==> 000000b2: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000000b7: <StoreToEnvironment>: <Reg8: 2, UInt8: 2, Reg8: 3>
==> 000000bb: <LoadConstUInt8>: <Reg8: 3, UInt8: 3>
==> 000000be: <GetByVal>: <Reg8: 3, Reg8: 6, Reg8: 3>
==> 000000c2: <Call2>: <Reg8: 3, Reg8: 5, Reg8: 0, Reg8: 3>
==> 000000c7: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000000cc: <StoreToEnvironment>: <Reg8: 2, UInt8: 3, Reg8: 3>
==> 000000d0: <LoadConstUInt8>: <Reg8: 3, UInt8: 4>
==> 000000d3: <GetByVal>: <Reg8: 3, Reg8: 6, Reg8: 3>
==> 000000d7: <Call2>: <Reg8: 3, Reg8: 5, Reg8: 0, Reg8: 3>
==> 000000dc: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000000e1: <StoreToEnvironment>: <Reg8: 2, UInt8: 4, Reg8: 3>
==> 000000e5: <LoadConstUInt8>: <Reg8: 3, UInt8: 5>
==> 000000e8: <GetByVal>: <Reg8: 3, Reg8: 6, Reg8: 3>
==> 000000ec: <Call2>: <Reg8: 3, Reg8: 5, Reg8: 0, Reg8: 3>
==> 000000f1: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 000000f6: <LoadConstUInt8>: <Reg8: 4, UInt8: 6>
==> 000000f9: <GetByVal>: <Reg8: 4, Reg8: 6, Reg8: 4>
==> 000000fd: <Call2>: <Reg8: 4, Reg8: 5, Reg8: 0, Reg8: 4>
==> 00000102: <StoreToEnvironment>: <Reg8: 2, UInt8: 5, Reg8: 4>
==> 00000106: <NewObject>: <Reg8: 5>
==> 00000108: <CreateRegExp>: <Reg8: 4, string_id: 1008, string_id: 31833, UInt32: 306>  # String: 'frisell|fresell|freseell' (String)  # String: 'i' (Identifier)
==> 00000116: <PutNewOwnById>: <Reg8: 5, Reg8: 4, string_id: 31867>  # String: 're' (Identifier)
==> 0000011b: <LoadConstUInt8>: <Reg8: 6, UInt8: 72>
==> 0000011e: <PutNewOwnById>: <Reg8: 5, Reg8: 6, string_id: 32041>  # String: 'carbo' (Identifier)
==> 00000123: <NewArray>: <Reg8: 4, UInt16: 7>
==> 00000127: <PutOwnByIndex>: <Reg8: 4, Reg8: 5, UInt8: 0>
==> 0000012b: <NewObject>: <Reg8: 5>
==> 0000012d: <CreateRegExp>: <Reg8: 7, string_id: 21820, string_id: 31833, UInt32: 307>  # String: 'fett[ae]\\s*biscottat' (String)  # String: 'i' (Identifier)
==> 0000013b: <PutNewOwnById>: <Reg8: 5, Reg8: 7, string_id: 31867>  # String: 're' (Identifier)
==> 00000140: <LoadConstUInt8>: <Reg8: 7, UInt8: 75>
==> 00000143: <PutNewOwnById>: <Reg8: 5, Reg8: 7, string_id: 32041>  # String: 'carbo' (Identifier)
==> 00000148: <PutOwnByIndex>: <Reg8: 4, Reg8: 5, UInt8: 1>
==> 0000014c: <NewObject>: <Reg8: 5>
==> 0000014e: <CreateRegExp>: <Reg8: 7, string_id: 5332, string_id: 31833, UInt32: 308>  # String: 'gallett' (String)  # String: 'i' (Identifier)
==> 0000015c: <PutNewOwnById>: <Reg8: 5, Reg8: 7, string_id: 31867>  # String: 're' (Identifier)
==> 00000161: <LoadConstUInt8>: <Reg8: 7, UInt8: 80>
==> 00000164: <PutNewOwnById>: <Reg8: 5, Reg8: 7, string_id: 32041>  # String: 'carbo' (Identifier)
==> 00000169: <PutOwnByIndex>: <Reg8: 4, Reg8: 5, UInt8: 2>
==> 0000016d: <NewObject>: <Reg8: 5>
==> 0000016f: <CreateRegExp>: <Reg8: 7, string_id: 6340, string_id: 31833, UInt32: 309>  # String: 'grissin' (String)  # String: 'i' (Identifier)
==> 0000017d: <PutNewOwnById>: <Reg8: 5, Reg8: 7, string_id: 31867>  # String: 're' (Identifier)
==> 00000182: <PutNewOwnById>: <Reg8: 5, Reg8: 6, string_id: 32041>  # String: 'carbo' (Identifier)
==> 00000187: <PutOwnByIndex>: <Reg8: 4, Reg8: 5, UInt8: 3>
==> 0000018b: <NewObject>: <Reg8: 5>
==> 0000018d: <CreateRegExp>: <Reg8: 6, string_id: 3956, string_id: 31833, UInt32: 310>  # String: '\\bcracker' (String)  # String: 'i' (Identifier)
==> 0000019b: <PutNewOwnById>: <Reg8: 5, Reg8: 6, string_id: 31867>  # String: 're' (Identifier)
==> 000001a0: <LoadConstUInt8>: <Reg8: 6, UInt8: 68>
==> 000001a3: <PutNewOwnById>: <Reg8: 5, Reg8: 6, string_id: 32041>  # String: 'carbo' (Identifier)
==> 000001a8: <PutOwnByIndex>: <Reg8: 4, Reg8: 5, UInt8: 4>
==> 000001ac: <NewObject>: <Reg8: 5>
==> 000001ae: <CreateRegExp>: <Reg8: 7, string_id: 9352, string_id: 31833, UInt32: 311>  # String: 'taralli|tarallo|tarallucc' (String)  # String: 'i' (Identifier)
==> 000001bc: <PutNewOwnById>: <Reg8: 5, Reg8: 7, string_id: 31867>  # String: 're' (Identifier)
==> 000001c1: <PutNewOwnById>: <Reg8: 5, Reg8: 6, string_id: 32041>  # String: 'carbo' (Identifier)
==> 000001c6: <PutOwnByIndex>: <Reg8: 4, Reg8: 5, UInt8: 5>
==> 000001ca: <NewObject>: <Reg8: 5>
==> 000001cc: <CreateRegExp>: <Reg8: 6, string_id: 15145, string_id: 31833, UInt32: 312>  # String: 'pane\\s*(biscottat|secco|carasau|azzimo)|carasau|pan\\s*bauletto\\s*tostat|crostin' (String)  # String: 'i' (Identifier)
==> 000001da: <PutNewOwnById>: <Reg8: 5, Reg8: 6, string_id: 31867>  # String: 're' (Identifier)
==> 000001df: <LoadConstUInt8>: <Reg8: 6, UInt8: 70>
==> 000001e2: <PutNewOwnById>: <Reg8: 5, Reg8: 6, string_id: 32041>  # String: 'carbo' (Identifier)
==> 000001e7: <PutOwnByIndex>: <Reg8: 4, Reg8: 5, UInt8: 6>
==> 000001eb: <StoreToEnvironment>: <Reg8: 2, UInt8: 6, Reg8: 4>
==> 000001ef: <CreateClosure>: <Reg8: 4, Reg8: 2, function_id: 19262>  # Function: [#19262 num of 61 bytes]: 2 params @ offset 0x004e71a3
==> 000001f4: <StoreToEnvironment>: <Reg8: 2, UInt8: 7, Reg8: 4>
==> 000001f8: <GetByIdShort>: <Reg8: 3, Reg8: 3, UInt8: 3, string_id: 40>  # String: 'default' (Identifier)
==> 000001fd: <TryGetById>: <Reg8: 1, Reg8: 1, UInt8: 4, string_id: 6>  # String: 'Error' (Identifier)
==> 00000203: <Call2>: <Reg8: 3, Reg8: 3, Reg8: 0, Reg8: 1>
==> 00000208: <CreateClosure>: <Reg8: 1, Reg8: 2, function_id: 19263>  # Function: [#19263  of 50 bytes]: 2 params @ offset 0x004e71e0
==> 0000020d: <Call2>: <Reg8: 1, Reg8: 1, Reg8: 0, Reg8: 3>
==> 00000212: <StoreToEnvironment>: <Reg8: 2, UInt8: 8, Reg8: 1>
==> 00000216: <Ret>: <Reg8: 0>


===============

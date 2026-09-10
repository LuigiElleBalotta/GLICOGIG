
==== Falling back to Disassembly ====
=> [Function #19768 "" of 288 bytes]: 8 params, frame size=21, strict=1, exc handler=0, debug info=0  @ offset 0x00508d90

Bytecode listing:

==> 00000000: <CreateEnvironment>: <Reg8: 2>
==> 00000002: <LoadParam>: <Reg8: 3, UInt8: 2>
==> 00000005: <LoadParam>: <Reg8: 8, UInt8: 6>
==> 00000008: <LoadParam>: <Reg8: 4, UInt8: 7>
==> 0000000b: <CreateClosure>: <Reg8: 5, Reg8: 2, function_id: 19769>  # Function: [#19769 _interopDefault of 28 bytes]: 2 params @ offset 0x002f58ff
==> 00000010: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 19770>  # Function: [#19770 LearnChapterScreen of 626 bytes]: 2 params @ offset 0x00508eb0
==> 00000015: <StoreToEnvironment>: <Reg8: 2, UInt8: 11, Reg8: 0>
==> 00000019: <GetGlobalObject>: <Reg8: 1>
==> 0000001b: <TryGetById>: <Reg8: 10, Reg8: 1, UInt8: 1, string_id: 14>  # String: 'Object' (Identifier)
==> 00000021: <GetByIdShort>: <Reg8: 9, Reg8: 10, UInt8: 2, string_id: 96>  # String: 'defineProperty' (Identifier)
==> 00000026: <NewObject>: <Reg8: 7>
==> 00000028: <LoadConstTrue>: <Reg8: 0>
==> 0000002a: <PutNewOwnByIdShort>: <Reg8: 7, Reg8: 0, string_id: 251>  # String: 'value' (Identifier)
==> 0000002e: <LoadConstString>: <Reg8: 6, string_id: 27>  # String: '__esModule' (Identifier)
==> 00000032: <Call4>: <Reg8: 6, Reg8: 9, Reg8: 10, Reg8: 8, Reg8: 6, Reg8: 7>
==> 00000039: <TryGetById>: <Reg8: 7, Reg8: 1, UInt8: 1, string_id: 14>  # String: 'Object' (Identifier)
==> 0000003f: <GetByIdShort>: <Reg8: 6, Reg8: 7, UInt8: 2, string_id: 96>  # String: 'defineProperty' (Identifier)
==> 00000044: <NewObject>: <Reg8: 1>
==> 00000046: <PutNewOwnByIdShort>: <Reg8: 1, Reg8: 0, string_id: 110>  # String: 'enumerable' (Identifier)
==> 0000004a: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 19776>  # Function: [#19776 get of 9 bytes]: 1 params @ offset 0x0030bda3
==> 0000004f: <PutNewOwnByIdShort>: <Reg8: 1, Reg8: 0, string_id: 133>  # String: 'get' (Identifier)
==> 00000053: <LoadConstString>: <Reg8: 0, string_id: 40>  # String: 'default' (Identifier)
==> 00000057: <Call4>: <Reg8: 0, Reg8: 6, Reg8: 7, Reg8: 8, Reg8: 0, Reg8: 1>
==> 0000005e: <LoadConstZero>: <Reg8: 0>
==> 00000060: <GetByVal>: <Reg8: 1, Reg8: 4, Reg8: 0>
==> 00000064: <LoadConstUndefined>: <Reg8: 0>
==> 00000066: <Call2>: <Reg8: 1, Reg8: 3, Reg8: 0, Reg8: 1>
==> 0000006b: <LoadConstUInt8>: <Reg8: 1, UInt8: 1>
==> 0000006e: <GetByVal>: <Reg8: 1, Reg8: 4, Reg8: 1>
==> 00000072: <Call2>: <Reg8: 1, Reg8: 3, Reg8: 0, Reg8: 1>
==> 00000077: <StoreToEnvironment>: <Reg8: 2, UInt8: 0, Reg8: 1>
==> 0000007b: <LoadConstUInt8>: <Reg8: 1, UInt8: 2>
==> 0000007e: <GetByVal>: <Reg8: 1, Reg8: 4, Reg8: 1>
==> 00000082: <Call2>: <Reg8: 1, Reg8: 3, Reg8: 0, Reg8: 1>
==> 00000087: <StoreToEnvironment>: <Reg8: 2, UInt8: 1, Reg8: 1>
==> 0000008b: <LoadConstUInt8>: <Reg8: 1, UInt8: 3>
==> 0000008e: <GetByVal>: <Reg8: 1, Reg8: 4, Reg8: 1>
==> 00000092: <Call2>: <Reg8: 1, Reg8: 3, Reg8: 0, Reg8: 1>
==> 00000097: <StoreToEnvironment>: <Reg8: 2, UInt8: 2, Reg8: 1>
==> 0000009b: <LoadConstUInt8>: <Reg8: 1, UInt8: 4>
==> 0000009e: <GetByVal>: <Reg8: 1, Reg8: 4, Reg8: 1>
==> 000000a2: <Call2>: <Reg8: 1, Reg8: 3, Reg8: 0, Reg8: 1>
==> 000000a7: <StoreToEnvironment>: <Reg8: 2, UInt8: 3, Reg8: 1>
==> 000000ab: <LoadConstUInt8>: <Reg8: 1, UInt8: 5>
==> 000000ae: <GetByVal>: <Reg8: 1, Reg8: 4, Reg8: 1>
==> 000000b2: <Call2>: <Reg8: 1, Reg8: 3, Reg8: 0, Reg8: 1>
==> 000000b7: <StoreToEnvironment>: <Reg8: 2, UInt8: 4, Reg8: 1>
==> 000000bb: <LoadConstUInt8>: <Reg8: 1, UInt8: 6>
==> 000000be: <GetByVal>: <Reg8: 1, Reg8: 4, Reg8: 1>
==> 000000c2: <Call2>: <Reg8: 1, Reg8: 3, Reg8: 0, Reg8: 1>
==> 000000c7: <StoreToEnvironment>: <Reg8: 2, UInt8: 5, Reg8: 1>
==> 000000cb: <LoadConstUInt8>: <Reg8: 1, UInt8: 7>
==> 000000ce: <GetByVal>: <Reg8: 1, Reg8: 4, Reg8: 1>
==> 000000d2: <Call2>: <Reg8: 1, Reg8: 3, Reg8: 0, Reg8: 1>
==> 000000d7: <Call2>: <Reg8: 1, Reg8: 5, Reg8: 0, Reg8: 1>
==> 000000dc: <StoreToEnvironment>: <Reg8: 2, UInt8: 6, Reg8: 1>
==> 000000e0: <LoadConstUInt8>: <Reg8: 1, UInt8: 8>
==> 000000e3: <GetByVal>: <Reg8: 1, Reg8: 4, Reg8: 1>
==> 000000e7: <Call2>: <Reg8: 1, Reg8: 3, Reg8: 0, Reg8: 1>
==> 000000ec: <Call2>: <Reg8: 1, Reg8: 5, Reg8: 0, Reg8: 1>
==> 000000f1: <StoreToEnvironment>: <Reg8: 2, UInt8: 7, Reg8: 1>
==> 000000f5: <LoadConstUInt8>: <Reg8: 1, UInt8: 9>
==> 000000f8: <GetByVal>: <Reg8: 1, Reg8: 4, Reg8: 1>
==> 000000fc: <Call2>: <Reg8: 1, Reg8: 3, Reg8: 0, Reg8: 1>
==> 00000101: <StoreToEnvironment>: <Reg8: 2, UInt8: 8, Reg8: 1>
==> 00000105: <LoadConstUInt8>: <Reg8: 1, UInt8: 10>
==> 00000108: <GetByVal>: <Reg8: 1, Reg8: 4, Reg8: 1>
==> 0000010c: <Call2>: <Reg8: 1, Reg8: 3, Reg8: 0, Reg8: 1>
==> 00000111: <StoreToEnvironment>: <Reg8: 2, UInt8: 9, Reg8: 1>
==> 00000115: <CreateClosure>: <Reg8: 1, Reg8: 2, function_id: 19777>  # Function: [#19777 makeStyles of 878 bytes]: 2 params @ offset 0x00509670
==> 0000011a: <StoreToEnvironment>: <Reg8: 2, UInt8: 10, Reg8: 1>
==> 0000011e: <Ret>: <Reg8: 0>


===============

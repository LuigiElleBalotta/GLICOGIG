
==== Falling back to Disassembly ====
=> [Function #18690 "" of 114 bytes]: 8 params, frame size=18, strict=1, exc handler=0, debug info=0  @ offset 0x004cb9b9

Bytecode listing:

==> 00000000: <CreateEnvironment>: <Reg8: 2>
==> 00000002: <LoadParam>: <Reg8: 5, UInt8: 6>
==> 00000005: <GetGlobalObject>: <Reg8: 1>
==> 00000007: <TryGetById>: <Reg8: 7, Reg8: 1, UInt8: 1, string_id: 14>  # String: 'Object' (Identifier)
==> 0000000d: <GetByIdShort>: <Reg8: 6, Reg8: 7, UInt8: 2, string_id: 96>  # String: 'defineProperty' (Identifier)
==> 00000012: <NewObject>: <Reg8: 4>
==> 00000014: <LoadConstTrue>: <Reg8: 0>
==> 00000016: <PutNewOwnByIdShort>: <Reg8: 4, Reg8: 0, string_id: 251>  # String: 'value' (Identifier)
==> 0000001a: <LoadConstString>: <Reg8: 3, string_id: 27>  # String: '__esModule' (Identifier)
==> 0000001e: <Call4>: <Reg8: 3, Reg8: 6, Reg8: 7, Reg8: 5, Reg8: 3, Reg8: 4>
==> 00000025: <TryGetById>: <Reg8: 4, Reg8: 1, UInt8: 1, string_id: 14>  # String: 'Object' (Identifier)
==> 0000002b: <GetByIdShort>: <Reg8: 3, Reg8: 4, UInt8: 2, string_id: 96>  # String: 'defineProperty' (Identifier)
==> 00000030: <NewObject>: <Reg8: 1>
==> 00000032: <PutNewOwnByIdShort>: <Reg8: 1, Reg8: 0, string_id: 110>  # String: 'enumerable' (Identifier)
==> 00000036: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 18691>  # Function: [#18691 get of 9 bytes]: 1 params @ offset 0x002e8262
==> 0000003b: <PutNewOwnByIdShort>: <Reg8: 1, Reg8: 0, string_id: 133>  # String: 'get' (Identifier)
==> 0000003f: <LoadConstString>: <Reg8: 0, string_id: 40>  # String: 'default' (Identifier)
==> 00000043: <Call4>: <Reg8: 0, Reg8: 3, Reg8: 4, Reg8: 5, Reg8: 0, Reg8: 1>
==> 0000004a: <LoadParam>: <Reg8: 1, UInt8: 7>
==> 0000004d: <LoadConstZero>: <Reg8: 0>
==> 0000004f: <GetByVal>: <Reg8: 3, Reg8: 1, Reg8: 0>
==> 00000053: <LoadParam>: <Reg8: 1, UInt8: 2>
==> 00000056: <LoadConstUndefined>: <Reg8: 0>
==> 00000058: <Call2>: <Reg8: 1, Reg8: 1, Reg8: 0, Reg8: 3>
==> 0000005d: <GetById>: <Reg8: 3, Reg8: 1, UInt8: 3, string_id: 45773>  # String: 'requireNativeModule' (Identifier)
==> 00000063: <LoadConstString>: <Reg8: 1, string_id: 11105>  # String: 'ExpoSharing' (String)
==> 00000067: <Call2>: <Reg8: 1, Reg8: 3, Reg8: 0, Reg8: 1>
==> 0000006c: <StoreToEnvironment>: <Reg8: 2, UInt8: 0, Reg8: 1>
==> 00000070: <Ret>: <Reg8: 0>


===============

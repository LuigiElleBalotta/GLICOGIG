
==== Falling back to Disassembly ====
=> [Function #18642 "" of 147 bytes]: 8 params, frame size=18, strict=1, exc handler=0, debug info=0  @ offset 0x004caa66

Bytecode listing:

==> 00000000: <CreateEnvironment>: <Reg8: 2>
==> 00000002: <LoadParam>: <Reg8: 3, UInt8: 2>
==> 00000005: <LoadParam>: <Reg8: 1, UInt8: 6>
==> 00000008: <LoadParam>: <Reg8: 4, UInt8: 7>
==> 0000000b: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 18647>  # Function: [#18647 _condividiCard of 53 bytes]: 1 params @ offset 0x004cab9a
==> 00000010: <StoreToEnvironment>: <Reg8: 2, UInt8: 3, Reg8: 0>
==> 00000014: <GetGlobalObject>: <Reg8: 0>
==> 00000016: <TryGetById>: <Reg8: 7, Reg8: 0, UInt8: 1, string_id: 14>  # String: 'Object' (Identifier)
==> 0000001c: <GetByIdShort>: <Reg8: 6, Reg8: 7, UInt8: 2, string_id: 96>  # String: 'defineProperty' (Identifier)
==> 00000021: <NewObject>: <Reg8: 5>
==> 00000023: <LoadConstTrue>: <Reg8: 0>
==> 00000025: <PutNewOwnByIdShort>: <Reg8: 5, Reg8: 0, string_id: 251>  # String: 'value' (Identifier)
==> 00000029: <LoadConstString>: <Reg8: 0, string_id: 27>  # String: '__esModule' (Identifier)
==> 0000002d: <Call4>: <Reg8: 0, Reg8: 6, Reg8: 7, Reg8: 1, Reg8: 0, Reg8: 5>
==> 00000034: <CreateClosure>: <Reg8: 0, Reg8: 2, function_id: 18646>  # Function: [#18646 condividiCard of 30 bytes]: 2 params @ offset 0x0030881a
==> 00000039: <PutById>: <Reg8: 1, Reg8: 0, UInt8: 1, string_id: 47280>  # String: 'condividiCard' (Identifier)
==> 0000003f: <LoadConstZero>: <Reg8: 0>
==> 00000041: <GetByVal>: <Reg8: 1, Reg8: 4, Reg8: 0>
==> 00000045: <LoadConstUndefined>: <Reg8: 0>
==> 00000047: <Call2>: <Reg8: 6, Reg8: 3, Reg8: 0, Reg8: 1>
==> 0000004c: <JmpFalse>: <Addr8: 14, Reg8: 6>  # Address: 0000005a
==> 0000004f: <GetByIdShort>: <Reg8: 5, Reg8: 6, UInt8: 3, string_id: 27>  # String: '__esModule' (Identifier)
==> 00000054: <Mov>: <Reg8: 1, Reg8: 6>
==> 00000057: <JmpTrue>: <Addr8: 12, Reg8: 5>  # Address: 00000063
==> 0000005a: <NewObject>: <Reg8: 5>
==> 0000005c: <PutNewOwnByIdShort>: <Reg8: 5, Reg8: 6, string_id: 40>  # String: 'default' (Identifier)
==> 00000060: <Mov>: <Reg8: 1, Reg8: 5>
==> 00000063: <StoreToEnvironment>: <Reg8: 2, UInt8: 0, Reg8: 1>
==> 00000067: <LoadConstUInt8>: <Reg8: 1, UInt8: 1>
==> 0000006a: <GetByVal>: <Reg8: 1, Reg8: 4, Reg8: 1>
==> 0000006e: <Call2>: <Reg8: 1, Reg8: 3, Reg8: 0, Reg8: 1>
==> 00000073: <StoreToEnvironment>: <Reg8: 2, UInt8: 1, Reg8: 1>
==> 00000077: <LoadConstUInt8>: <Reg8: 1, UInt8: 2>
==> 0000007a: <GetByVal>: <Reg8: 1, Reg8: 4, Reg8: 1>
==> 0000007e: <Call2>: <Reg8: 3, Reg8: 3, Reg8: 0, Reg8: 1>
==> 00000083: <CreateClosure>: <Reg8: 1, Reg8: 2, function_id: 18643>  # Function: [#18643 _interopNamespace of 72 bytes]: 2 params @ offset 0x004caaf9
==> 00000088: <Call2>: <Reg8: 1, Reg8: 1, Reg8: 0, Reg8: 3>
==> 0000008d: <StoreToEnvironment>: <Reg8: 2, UInt8: 2, Reg8: 1>
==> 00000091: <Ret>: <Reg8: 0>


===============

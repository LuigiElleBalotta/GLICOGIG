
==== Falling back to Disassembly ====
=> [Function #18942 "" of 99 bytes]: 2 params, frame size=16, strict=1, exc handler=0, debug info=0  @ offset 0x004dba96

Bytecode listing:

==> 00000000: <LoadParam>: <Reg8: 2, UInt8: 1>
==> 00000003: <GetEnvironment>: <Reg8: 0, UInt8: 1>
==> 00000006: <LoadFromEnvironment>: <Reg8: 0, Reg8: 0, UInt8: 18>
==> 0000000a: <GetById>: <Reg8: 3, Reg8: 0, UInt8: 1, string_id: 53560>  # String: 'fattoreCrudo' (Identifier)
==> 00000010: <GetEnvironment>: <Reg8: 0, UInt8: 0>
==> 00000013: <LoadFromEnvironment>: <Reg8: 0, Reg8: 0, UInt8: 43>
==> 00000017: <LoadConstUndefined>: <Reg8: 1>
==> 00000019: <Call2>: <Reg8: 0, Reg8: 0, Reg8: 1, Reg8: 2>
==> 0000001e: <Call2>: <Reg8: 5, Reg8: 3, Reg8: 1, Reg8: 0>
==> 00000023: <Mov>: <Reg8: 0, Reg8: 2>
==> 00000026: <JmpFalse>: <Addr8: 59, Reg8: 5>  # Address: 00000061
==> 00000029: <NewObject>: <Reg8: 1>
==> 0000002b: <Mov>: <Reg8: 8, Reg8: 1>
==> 0000002e: <Mov>: <Reg8: 7, Reg8: 2>
==> 00000031: <CallBuiltin>: <Reg8: 3, UInt8: 44, UInt8: 3>  # Built-in function: [#44 copyDataProperties]
==> 00000035: <GetGlobalObject>: <Reg8: 3>
==> 00000037: <TryGetById>: <Reg8: 4, Reg8: 3, UInt8: 2, string_id: 12>  # String: 'Math' (Identifier)
==> 0000003d: <GetByIdShort>: <Reg8: 3, Reg8: 4, UInt8: 3, string_id: 37>  # String: 'round' (Identifier)
==> 00000042: <GetByIdShort>: <Reg8: 2, Reg8: 2, UInt8: 4, string_id: 135>  # String: 'grammi' (Identifier)
==> 00000047: <JmpTrue>: <Addr8: 5, Reg8: 2>  # Address: 0000004c
==> 0000004a: <LoadConstZero>: <Reg8: 2>
==> 0000004c: <Mul>: <Reg8: 2, Reg8: 2, Reg8: 5>
==> 00000050: <Call2>: <Reg8: 3, Reg8: 3, Reg8: 4, Reg8: 2>
==> 00000055: <LoadConstString>: <Reg8: 2, string_id: 135>  # String: 'grammi' (Identifier)
==> 00000059: <PutOwnByVal>: <Reg8: 1, Reg8: 3, Reg8: 2, UInt8: 1>
==> 0000005e: <Mov>: <Reg8: 0, Reg8: 1>
==> 00000061: <Ret>: <Reg8: 0>


===============


==== Falling back to Disassembly ====
=> [Function #18364 "" of 57 bytes]: 2 params, frame size=14, strict=1, exc handler=0, debug info=0  @ offset 0x004bb536

Bytecode listing:

==> 00000000: <LoadParam>: <Reg8: 3, UInt8: 1>
==> 00000003: <GetByIdShort>: <Reg8: 4, Reg8: 3, UInt8: 1, string_id: 147>  # String: 'id' (Identifier)
==> 00000008: <GetEnvironment>: <Reg8: 2, UInt8: 0>
==> 0000000b: <LoadFromEnvironment>: <Reg8: 1, Reg8: 2, UInt8: 0>
==> 0000000f: <Mov>: <Reg8: 0, Reg8: 3>
==> 00000012: <JStrictNotEqual>: <Addr8: 37, Reg8: 4, Reg8: 1>  # Address: 00000037
==> 00000016: <NewObject>: <Reg8: 1>
==> 00000018: <Mov>: <Reg8: 6, Reg8: 1>
==> 0000001b: <Mov>: <Reg8: 5, Reg8: 3>
==> 0000001e: <CallBuiltin>: <Reg8: 3, UInt8: 44, UInt8: 3>  # Built-in function: [#44 copyDataProperties]
==> 00000022: <LoadFromEnvironment>: <Reg8: 3, Reg8: 2, UInt8: 1>
==> 00000026: <JmpTrue>: <Addr8: 5, Reg8: 3>  # Address: 0000002b
==> 00000029: <LoadConstUndefined>: <Reg8: 3>
==> 0000002b: <LoadConstString>: <Reg8: 2, string_id: 32910>  # String: 'slot' (Identifier)
==> 0000002f: <PutOwnByVal>: <Reg8: 1, Reg8: 3, Reg8: 2, UInt8: 1>
==> 00000034: <Mov>: <Reg8: 0, Reg8: 1>
==> 00000037: <Ret>: <Reg8: 0>


===============

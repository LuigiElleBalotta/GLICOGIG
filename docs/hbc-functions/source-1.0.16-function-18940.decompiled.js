
==== Falling back to Disassembly ====
=> [Function #18940 "" of 70 bytes]: 1 params, frame size=13, strict=1, exc handler=0, debug info=0  @ offset 0x004dba0b

Bytecode listing:

==> 00000000: <GetEnvironment>: <Reg8: 1, UInt8: 0>
==> 00000003: <LoadFromEnvironment>: <Reg8: 2, Reg8: 1, UInt8: 42>
==> 00000007: <LoadConstUndefined>: <Reg8: 0>
==> 00000009: <Call1>: <Reg8: 2, Reg8: 2, Reg8: 0>
==> 0000000d: <LoadFromEnvironment>: <Reg8: 3, Reg8: 1, UInt8: 17>
==> 00000011: <LoadConstFalse>: <Reg8: 2>
==> 00000013: <Call2>: <Reg8: 3, Reg8: 3, Reg8: 0, Reg8: 2>
==> 00000018: <LoadFromEnvironment>: <Reg8: 3, Reg8: 1, UInt8: 18>
==> 0000001c: <Call2>: <Reg8: 3, Reg8: 3, Reg8: 0, Reg8: 2>
==> 00000021: <LoadFromEnvironment>: <Reg8: 4, Reg8: 1, UInt8: 20>
==> 00000025: <NewArray>: <Reg8: 3, UInt16: 0>
==> 00000029: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000002e: <LoadFromEnvironment>: <Reg8: 4, Reg8: 1, UInt8: 22>
==> 00000032: <LoadConstString>: <Reg8: 3, string_id: 31798>  # String: '' (Identifier)
==> 00000036: <Call2>: <Reg8: 3, Reg8: 4, Reg8: 0, Reg8: 3>
==> 0000003b: <LoadFromEnvironment>: <Reg8: 1, Reg8: 1, UInt8: 26>
==> 0000003f: <Call2>: <Reg8: 1, Reg8: 1, Reg8: 0, Reg8: 2>
==> 00000044: <Ret>: <Reg8: 0>


===============

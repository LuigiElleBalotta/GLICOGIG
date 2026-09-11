
==== Falling back to Disassembly ====
=> [Function #18914 "" of 89 bytes]: 1 params, frame size=15, strict=1, exc handler=0, debug info=0  @ offset 0x004db2f9

Bytecode listing:

==> 00000000: <GetEnvironment>: <Reg8: 1, UInt8: 0>
==> 00000003: <LoadFromEnvironment>: <Reg8: 2, Reg8: 1, UInt8: 1>
==> 00000007: <LoadConstNull>: <Reg8: 4>
==> 00000009: <Eq>: <Reg8: 5, Reg8: 2, Reg8: 4>
==> 0000000d: <LoadConstUndefined>: <Reg8: 0>
==> 0000000f: <LoadConstUndefined>: <Reg8: 3>
==> 00000011: <JmpTrue>: <Addr8: 22, Reg8: 5>  # Address: 00000027
==> 00000014: <GetByIdShort>: <Reg8: 2, Reg8: 2, UInt8: 1, string_id: 201>  # String: 'params' (Identifier)
==> 00000019: <Eq>: <Reg8: 4, Reg8: 2, Reg8: 4>
==> 0000001d: <LoadConstUndefined>: <Reg8: 3>
==> 0000001f: <JmpTrue>: <Addr8: 8, Reg8: 4>  # Address: 00000027
==> 00000022: <GetByIdShort>: <Reg8: 3, Reg8: 2, UInt8: 2, string_id: 243>  # String: 'testo' (Identifier)
==> 00000027: <JmpTrue>: <Addr8: 5, Reg8: 3>  # Address: 0000002c
==> 0000002a: <Ret>: <Reg8: 0>
==> 0000002c: <LoadFromEnvironment>: <Reg8: 5, Reg8: 1, UInt8: 0>
==> 00000030: <GetById>: <Reg8: 4, Reg8: 5, UInt8: 3, string_id: 39628>  # String: 'setParams' (Identifier)
==> 00000036: <NewObject>: <Reg8: 2>
==> 00000038: <PutNewOwnByIdShort>: <Reg8: 2, Reg8: 0, string_id: 243>  # String: 'testo' (Identifier)
==> 0000003c: <Call2>: <Reg8: 2, Reg8: 4, Reg8: 5, Reg8: 2>
==> 00000041: <LoadFromEnvironment>: <Reg8: 2, Reg8: 1, UInt8: 32>
==> 00000045: <GetGlobalObject>: <Reg8: 1>
==> 00000047: <TryGetById>: <Reg8: 1, Reg8: 1, UInt8: 4, string_id: 20>  # String: 'String' (Identifier)
==> 0000004d: <Call2>: <Reg8: 1, Reg8: 1, Reg8: 0, Reg8: 3>
==> 00000052: <Call2>: <Reg8: 1, Reg8: 2, Reg8: 0, Reg8: 1>
==> 00000057: <Ret>: <Reg8: 0>


===============

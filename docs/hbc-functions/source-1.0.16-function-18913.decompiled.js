
==== Falling back to Disassembly ====
=> [Function #18913 "" of 95 bytes]: 1 params, frame size=15, strict=1, exc handler=0, debug info=0  @ offset 0x004db29a

Bytecode listing:

==> 00000000: <GetEnvironment>: <Reg8: 1, UInt8: 0>
==> 00000003: <LoadFromEnvironment>: <Reg8: 2, Reg8: 1, UInt8: 1>
==> 00000007: <LoadConstNull>: <Reg8: 4>
==> 00000009: <Eq>: <Reg8: 5, Reg8: 2, Reg8: 4>
==> 0000000d: <LoadConstUndefined>: <Reg8: 0>
==> 0000000f: <LoadConstUndefined>: <Reg8: 3>
==> 00000011: <JmpTrue>: <Addr8: 23, Reg8: 5>  # Address: 00000028
==> 00000014: <GetByIdShort>: <Reg8: 2, Reg8: 2, UInt8: 1, string_id: 201>  # String: 'params' (Identifier)
==> 00000019: <Eq>: <Reg8: 4, Reg8: 2, Reg8: 4>
==> 0000001d: <LoadConstUndefined>: <Reg8: 3>
==> 0000001f: <JmpTrue>: <Addr8: 9, Reg8: 4>  # Address: 00000028
==> 00000022: <GetById>: <Reg8: 3, Reg8: 2, UInt8: 2, string_id: 36506>  # String: 'apri' (Identifier)
==> 00000028: <JmpTrue>: <Addr8: 5, Reg8: 3>  # Address: 0000002d
==> 0000002b: <Ret>: <Reg8: 0>
==> 0000002d: <LoadFromEnvironment>: <Reg8: 5, Reg8: 1, UInt8: 0>
==> 00000031: <GetById>: <Reg8: 4, Reg8: 5, UInt8: 3, string_id: 39628>  # String: 'setParams' (Identifier)
==> 00000037: <NewObject>: <Reg8: 2>
==> 00000039: <PutNewOwnById>: <Reg8: 2, Reg8: 0, string_id: 36506>  # String: 'apri' (Identifier)
==> 0000003e: <Call2>: <Reg8: 2, Reg8: 4, Reg8: 5, Reg8: 2>
==> 00000043: <LoadConstString>: <Reg8: 2, string_id: 43578>  # String: 'camera' (Identifier)
==> 00000047: <JStrictEqual>: <Addr8: 14, Reg8: 3, Reg8: 2>  # Address: 00000055
==> 0000004b: <LoadFromEnvironment>: <Reg8: 2, Reg8: 1, UInt8: 35>
==> 0000004f: <Call1>: <Reg8: 2, Reg8: 2, Reg8: 0>
==> 00000053: <Jmp>: <Addr8: 10>  # Address: 0000005d
==> 00000055: <LoadFromEnvironment>: <Reg8: 1, Reg8: 1, UInt8: 34>
==> 00000059: <Call1>: <Reg8: 1, Reg8: 1, Reg8: 0>
==> 0000005d: <Ret>: <Reg8: 0>


===============

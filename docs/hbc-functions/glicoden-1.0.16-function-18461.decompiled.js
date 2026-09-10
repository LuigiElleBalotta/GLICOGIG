
==== Falling back to Disassembly ====
=> [Function #18461 "" of 37 bytes]: 2 params, frame size=9, strict=1, exc handler=0, debug info=0  @ offset 0x004bf3aa

Bytecode listing:

==> 00000000: <LoadParam>: <Reg8: 0, UInt8: 1>
==> 00000003: <GetByIdShort>: <Reg8: 1, Reg8: 0, UInt8: 1, string_id: 185>  # String: 'nome' (Identifier)
==> 00000008: <JmpTrue>: <Addr8: 7, Reg8: 1>  # Address: 0000000f
==> 0000000b: <LoadConstString>: <Reg8: 1, string_id: 31798>  # String: '' (Identifier)
==> 0000000f: <GetById>: <Reg8: 0, Reg8: 1, UInt8: 2, string_id: 38312>  # String: 'toLowerCase' (Identifier)
==> 00000015: <Call1>: <Reg8: 1, Reg8: 0, Reg8: 1>
==> 00000019: <GetById>: <Reg8: 0, Reg8: 1, UInt8: 3, string_id: 36261>  # String: 'trim' (Identifier)
==> 0000001f: <Call1>: <Reg8: 0, Reg8: 0, Reg8: 1>
==> 00000023: <Ret>: <Reg8: 0>


===============

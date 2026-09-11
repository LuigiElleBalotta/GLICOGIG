
==== Falling back to Disassembly ====
=> [Function #18943 "" of 22 bytes]: 3 params, frame size=2, strict=1, exc handler=0, debug info=0  @ offset 0x004dbaf9

Bytecode listing:

==> 00000000: <LoadParam>: <Reg8: 0, UInt8: 2>
==> 00000003: <GetByIdShort>: <Reg8: 1, Reg8: 0, UInt8: 1, string_id: 135>  # String: 'grammi' (Identifier)
==> 00000008: <JmpTrue>: <Addr8: 5, Reg8: 1>  # Address: 0000000d
==> 0000000b: <LoadConstZero>: <Reg8: 1>
==> 0000000d: <LoadParam>: <Reg8: 0, UInt8: 1>
==> 00000010: <Add>: <Reg8: 0, Reg8: 0, Reg8: 1>
==> 00000014: <Ret>: <Reg8: 0>


===============

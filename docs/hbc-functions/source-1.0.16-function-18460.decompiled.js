
==== Falling back to Disassembly ====
=> [Function #18460 "" of 34 bytes]: 2 params, frame size=3, strict=1, exc handler=0, debug info=0  @ offset 0x004bf388

Bytecode listing:

==> 00000000: <LoadParam>: <Reg8: 1, UInt8: 1>
==> 00000003: <GetByIdShort>: <Reg8: 2, Reg8: 1, UInt8: 1, string_id: 114>  # String: 'fascia' (Identifier)
==> 00000008: <LoadConstString>: <Reg8: 0, string_id: 35781>  # String: 'trascurabile' (Identifier)
==> 0000000c: <StrictEq>: <Reg8: 0, Reg8: 2, Reg8: 0>
==> 00000010: <JmpTrue>: <Addr8: 16, Reg8: 0>  # Address: 00000020
==> 00000013: <GetByIdShort>: <Reg8: 2, Reg8: 1, UInt8: 1, string_id: 114>  # String: 'fascia' (Identifier)
==> 00000018: <LoadConstString>: <Reg8: 1, string_id: 34393>  # String: 'basso' (Identifier)
==> 0000001c: <StrictEq>: <Reg8: 0, Reg8: 2, Reg8: 1>
==> 00000020: <Ret>: <Reg8: 0>


===============

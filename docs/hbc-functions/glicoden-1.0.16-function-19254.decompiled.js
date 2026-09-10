
==== Falling back to Disassembly ====
=> [Function #19254 "" of 35 bytes]: 2 params, frame size=12, strict=1, exc handler=0, debug info=0  @ offset 0x004e6d82

Bytecode listing:

==> 00000000: <LoadParam>: <Reg8: 0, UInt8: 1>
==> 00000003: <GetById>: <Reg8: 2, Reg8: 0, UInt8: 1, string_id: 31867>  # String: 're' (Identifier)
==> 00000009: <GetByIdShort>: <Reg8: 1, Reg8: 2, UInt8: 2, string_id: 242>  # String: 'test' (Identifier)
==> 0000000e: <GetEnvironment>: <Reg8: 0, UInt8: 0>
==> 00000011: <LoadFromEnvironment>: <Reg8: 0, Reg8: 0, UInt8: 0>
==> 00000015: <JmpTrue>: <Addr8: 7, Reg8: 0>  # Address: 0000001c
==> 00000018: <LoadConstString>: <Reg8: 0, string_id: 31798>  # String: '' (Identifier)
==> 0000001c: <Call2>: <Reg8: 0, Reg8: 1, Reg8: 2, Reg8: 0>
==> 00000021: <Ret>: <Reg8: 0>


===============

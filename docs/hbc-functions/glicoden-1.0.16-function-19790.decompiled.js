
==== Falling back to Disassembly ====
=> [Function #19790 "" of 37 bytes]: 1 params, frame size=12, strict=1, exc handler=0, debug info=0  @ offset 0x0050aba0

Bytecode listing:

==> 00000000: <CreateEnvironment>: <Reg8: 0>
==> 00000002: <GetEnvironment>: <Reg8: 1, UInt8: 1>
==> 00000005: <LoadFromEnvironment>: <Reg8: 1, Reg8: 1, UInt8: 2>
==> 00000009: <GetByIdShort>: <Reg8: 3, Reg8: 1, UInt8: 1, string_id: 40>  # String: 'default' (Identifier)
==> 0000000e: <LoadConstUndefined>: <Reg8: 2>
==> 00000010: <CreateGeneratorClosure>: <Reg8: 1, Reg8: 0, function_id: 19791>  # Function: [#19791  of 9 bytes]: 1 params @ offset 0x0050abc5
==> 00000015: <Call2>: <Reg8: 1, Reg8: 3, Reg8: 2, Reg8: 1>
==> 0000001a: <StoreToEnvironment>: <Reg8: 0, UInt8: 0, Reg8: 1>
==> 0000001e: <CreateClosure>: <Reg8: 0, Reg8: 0, function_id: 19793>  # Function: [#19793 avanti of 30 bytes]: 1 params @ offset 0x0030854e
==> 00000023: <Ret>: <Reg8: 0>


===============

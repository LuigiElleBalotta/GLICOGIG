function pesoCibo(a0) {
    _fun18420: for(var _fun18420_ip = 0; ; ) switch(_fun18420_ip) {
case 0:
        r6 = undefined;
        r7 = undefined;
        r8 = undefined;
        r5 = 0;
        r0 = 0;
        r4 = a0;
        r2 = r4[Symbol.iterator];
        r4 = r2().next;
        r1 = null;
case 21:
        r9 = r4().value;
        r10 = r2;
        if(!(r10 !== r6)) { _fun18420_ip = 198; continue _fun18420 }
case 35: // try_start_0
        r7 = r9;
        r9 = r9.catalogo_id;
        r12 = undefined;
        if(!r9) { _fun18420_ip = 73; continue _fun18420 }
case 49:
        r9 = _env_r3_slot0;
        r10 = r9.alimentoById;
        r9 = r7;
        r9 = r9.catalogo_id;
        r12 = r10.bind(r6)(r9);
case 73:
        r8 = r12;
        r11 = _env_r3_slot8;
        r9 = r7;
        r10 = r9.nome;
        r13 = r12 == r1;
        r9 = undefined;
        if(r13) { _fun18420_ip = 102; continue _fun18420 }
case 97:
        r9 = r12.categoria;
case 102:
        r9 = r11.bind(r6)(r10, r9);
        if(r9) { _fun18420_ip = 186; continue _fun18420 }
case 111:
        r9 = r8;
        if(!r9) { _fun18420_ip = 143; continue _fun18420 }
case 117:
        r11 = _env_r3_slot8;
        r9 = r8;
        r10 = r9.nome;
        r9 = r9.categoria;
        r9 = r11.bind(r6)(r10, r9);
        if(r9) { _fun18420_ip = 186; continue _fun18420 }
case 143:
        r9 = r7;
        r9 = r9.grammi;
        if(!r9) { _fun18420_ip = 181; continue _fun18420 }
case 154:
        r9 = r7;
        r9 = r9.grammi;
        if(!(r9 > r5)) { _fun18420_ip = 181; continue _fun18420 }
case 166:
        r10 = r0;
        r9 = r7;
        r9 = r9.grammi;
        r0 = r10 + r9;
case 181: // try_end0
        _fun18420_ip = 21; continue _fun18420;
case 186:
        _fun18420_ip = 21; continue _fun18420;
case 191: // catch_target0
        CatchBlockStart(arg_register=1);
        r2.return();
        throw r1;
case 198:
        return r0;
    }
}
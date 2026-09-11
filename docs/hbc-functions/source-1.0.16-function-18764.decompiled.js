function affidabilitaRicetta(a0) {
    _fun18764: for(var _fun18764_ip = 0; ; ) switch(_fun18764_ip) {
case 0:
        r3 = a0;
        r5 = undefined;
        r6 = undefined;
        r7 = undefined;
        r8 = undefined;
        r0 = null;
        r2 = null;
        r4 = r3 == r0;
        r1 = undefined;
        if(r4) { _fun18764_ip = 29; continue _fun18764 }
case 24:
        r1 = r3.ingredienti;
case 29:
        if(r1) { _fun18764_ip = 36; continue _fun18764 }
case 32:
        r1 = new Array(0);
case 36:
        r4 = r1;
        r3 = r4[Symbol.iterator];
        r4 = r3().next;
case 45:
        r9 = r4().value;
        r10 = r3;
        if(!(r10 !== r5)) { _fun18764_ip = 172; continue _fun18764 }
case 56: // try_start_0
        r6 = r9;
        r11 = r9 == r0;
        r10 = undefined;
        if(r11) { _fun18764_ip = 73; continue _fun18764 }
case 68:
        r10 = r9.id;
case 73:
        r9 = undefined;
        if(!r10) { _fun18764_ip = 101; continue _fun18764 }
case 78:
        r10 = _env_r1_slot1;
        r11 = r10.alimentoById;
        r10 = r6;
        r10 = r10.id;
        r9 = r11.bind(r5)(r10);
case 101:
        r7 = r9;
        if(!r9) { _fun18764_ip = 163; continue _fun18764 }
case 107:
        r9 = r7;
        r9 = r9.ig_medio;
        if(!(r9 != r0)) { _fun18764_ip = 163; continue _fun18764 }
case 119:
        r10 = _env_r1_slot2;
        r9 = r7;
        r9 = r9.ig_affidabilita;
        r9 = r10[r9];
        r8 = r9;
        if(!r9) { _fun18764_ip = 161; continue _fun18764 }
case 141:
        r9 = r2;
        if(!(r9 != r0)) { _fun18764_ip = 158; continue _fun18764 }
case 148:
        r10 = r8;
        r9 = r2;
        if(!(r10 < r9)) { _fun18764_ip = 161; continue _fun18764 }
case 158:
        r2 = r8;
case 161: // try_end0
        _fun18764_ip = 45; continue _fun18764;
case 163:
        _fun18764_ip = 45; continue _fun18764;
case 165: // catch_target0
        CatchBlockStart(arg_register=1);
        r3.return();
        throw r1;
case 172:
        r1 = r2;
        if(!(r1 != r0)) { _fun18764_ip = 216; continue _fun18764 }
case 179:
        r4 = r2;
        r1 = 'alta';
        r3 = 3;
        if(!(r4 !== r3)) { _fun18764_ip = 214; continue _fun18764 }
case 193:
        r4 = r2;
        r2 = 'bassa';
        r3 = 2;
        if(!(r4 === r3)) { _fun18764_ip = 211; continue _fun18764 }
case 207:
        r2 = 'media';
case 211:
        r1 = r2;
case 214:
        return r1;
case 216:
        return r0;
    }
}

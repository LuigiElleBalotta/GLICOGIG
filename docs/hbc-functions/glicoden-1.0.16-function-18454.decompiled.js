function indiceStabilita(a0) {
    _fun18454: for(var _fun18454_ip = 0; ; ) switch(_fun18454_ip) {
case 0:
        r1 = a0;
        r8 = undefined;
        r3 = undefined;
        r0 = undefined;
        r9 = undefined;
        r10 = undefined;
        r2 = r1.length;
        if(r2) { _fun18454_ip = 25; continue _fun18454 }
case 21:
        r2 = null;
        return r2;
case 25:
        r3 = 0;
        r0 = 0;
        r6 = r1;
        r4 = r6[Symbol.iterator];
        r6 = r4().next;
        r5 = 8;
        r1 = global;
case 43:
        r12 = r6().value;
        r11 = r4;
        if(!(r11 !== r8)) { _fun18454_ip = 153; continue _fun18454 }
case 54: // try_start_0
        r9 = r12;
        r13 = _env_r2_slot19;
        r12 = r12.cg;
        r11 = r12;
        if(r12) { _fun18454_ip = 75; continue _fun18454 }
case 73:
        r11 = 0;
case 75:
        r12 = r11;
        r14 = r9;
        r11 = r14.fascia;
        r10 = r13.bind(r8)(r12, r11);
        r13 = r1.Math;
        r12 = r13.max;
        r14 = r14.cg;
        r11 = r14;
        if(r14) { _fun18454_ip = 117; continue _fun18454 }
case 115:
        r11 = 0;
case 117:
        r12 = r12.bind(r13)(r11, r5);
        r13 = r3;
        r11 = r10;
        r11 = r11 * r12;
        r3 = r13 + r11;
        r11 = r0;
        r0 = r11 + r12;
case 144: // try_end0
        _fun18454_ip = 43; continue _fun18454;
case 146: // catch_target0
        CatchBlockStart(arg_register=2);
        r4.return();
        throw r2;
case 153:
        r2 = r1.Math;
        r1 = r2.round;
        r0 = r3 / r0;
        r0 = r1.bind(r2)(r0);
        return r0;
    }
}
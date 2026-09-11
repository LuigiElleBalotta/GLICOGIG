function ratioBilancio(a0) {
    _fun18464: for(var _fun18464_ip = 0; ; ) switch(_fun18464_ip) {
case 0:
        r0 = a0;
        r6 = undefined;
        r1 = undefined;
        r2 = undefined;
        r7 = undefined;
        r3 = r0.length;
        if(r3) { _fun18464_ip = 23; continue _fun18464 }
case 19:
        r3 = null;
        return r3;
case 23:
        r4 = 0;
        r1 = 0;
        r2 = 0;
        r5 = r0;
        r3 = r5[Symbol.iterator];
        r5 = r3().next;
        r0 = 2;
case 38:
        r10 = r5().value;
        r8 = r3;
        if(!(r8 !== r6)) { _fun18464_ip = 152; continue _fun18464 }
case 49: // try_start_0
        r7 = r10;
        r9 = r1;
        r10 = r10.carbo;
        r8 = r10;
        if(r10) { _fun18464_ip = 69; continue _fun18464 }
case 67:
        r8 = 0;
case 69:
        r1 = r9 + r8;
        r9 = r2;
        r10 = r7;
        r10 = r10.fibre;
        r8 = r10;
        if(r10) { _fun18464_ip = 93; continue _fun18464 }
case 91:
        r8 = 0;
case 93:
        r10 = r8 * r0;
        r11 = r7;
        r11 = r11.prot;
        r8 = r11;
        if(r11) { _fun18464_ip = 114; continue _fun18464 }
case 112:
        r8 = 0;
case 114:
        r10 = r10 + r8;
        r11 = r7;
        r11 = r11.grassi;
        r8 = r11;
        if(r11) { _fun18464_ip = 135; continue _fun18464 }
case 133:
        r8 = 0;
case 135:
        r8 = r10 + r8;
        r2 = r9 + r8;
case 143: // try_end0
        _fun18464_ip = 38; continue _fun18464;
case 145: // catch_target0
        CatchBlockStart(arg_register=0);
        r3.return();
        throw r0;
case 152:
        r3 = r1;
        r0 = null;
        if(!(r3 > r4)) { _fun18464_ip = 165; continue _fun18464 }
case 161:
        r0 = r2 / r1;
case 165:
        return r0;
    }
}

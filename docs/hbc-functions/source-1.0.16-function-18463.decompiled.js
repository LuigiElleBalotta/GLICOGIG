function giorniConsecutivi() {
    _fun18463: for(var _fun18463_ip = 0; ; ) switch(_fun18463_ip) {
case 0:
        r1 = _env_r0_slot15;
        r0 = undefined;
        r5 = r1.bind(r0)();
        r0 = r5.length;
        r4 = 0;
        r1 = r4 < r0;
        r3 = 0;
        r2 = 0;
        r0 = 0;
        if(!r1) { _fun18463_ip = 91; continue _fun18463 }
case 33:
        r1 = r5[r2];
        r1 = r1.voci;
        r7 = r1.length;
        r6 = r3;
        r1 = r2;
        if(!(!(r7 > r4))) { _fun18463_ip = 70; continue _fun18463 }
case 58:
        r7 = r6;
        r0 = r7;
        if(!(r1 !== r4)) { _fun18463_ip = 73; continue _fun18463 }
case 68:
        _fun18463_ip = 91; continue _fun18463;
case 70:
        r7 = r6 + 1;
case 73:
        r2 = r1 + 1;
        r1 = r5.length;
        r3 = r7;
        r0 = r3;
        if(r2 < r1) { _fun18463_ip = 33; continue _fun18463 }
case 91:
        return r0;
    }
}

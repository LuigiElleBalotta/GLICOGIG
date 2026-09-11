function qualitaPasto(a0, a1) {
    _fun18453: for(var _fun18453_ip = 0; ; ) switch(_fun18453_ip) {
case 0:
        r5 = a1;
        r0 = global;
        r6 = r0.Math;
        r4 = r6.max;
        r7 = r0.Math;
        r3 = r7.min;
        r9 = r0.Math;
        r8 = r9.max;
        r2 = a0;
        r1 = 10;
        r2 = r2 - r1;
        r1 = 0;
        r2 = r8.bind(r9)(r1, r2);
        r1 = 2.2;
        r2 = r2 * r1;
        r1 = 100;
        r2 = r1 - r2;
        r3 = r3.bind(r7)(r1, r2);
        r2 = 15;
        r3 = r4.bind(r6)(r2, r3);
        r2 = 45;
        r4 = 'alto';
        if(!(r5 !== r4)) { _fun18453_ip = 118; continue _fun18453 }
case 104:
        r4 = 'medio';
        if(!(r5 === r4)) { _fun18453_ip = 115; continue _fun18453 }
case 112:
        r1 = 80;
case 115:
        r2 = r1;
case 118:
        r1 = r0.Math;
        r0 = r1.min;
        r0 = r0.bind(r1)(r3, r2);
        return r0;
    }
}
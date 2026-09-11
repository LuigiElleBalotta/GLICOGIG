function mescolaOpzioni(a0, a1) {
    _fun19747: for(var _fun19747_ip = 0; ; ) switch(_fun19747_ip) {
case 0:
        r1 = a0;
        var _closure0_slot0 = r1;
        r4 = _env_r0_slot6;
        r2 = undefined;
        r0 = a1;
        r8 = r4.bind(r2)(r0);
        r5 = r1.opzioni;
        r4 = r5.map;
        r0 = function(a0, a1) { // Environment: r3
            r0 = a1;
            return r0;
        };
        r4 = r4.bind(r5)(r0);
        r0 = r4.length;
        r7 = 1;
        r6 = r0 - r7;
        r5 = global;
        r0 = 0;
        if(!(r6 > r0)) { _fun19747_ip = 118; continue _fun19747 }
case 66:
        r11 = r5.Math;
        r10 = r11.floor;
        r12 = r8.bind(r2)();
        r9 = r6 + r7;
        r9 = r12 * r9;
        r10 = r10.bind(r11)(r9);
        r9 = r4[r6];
        r11 = r4[r10];
        r4[r6] = r11;
        r4[r10] = r9;
        r6 = r6 - 1;
        if(r6 > r0) { _fun19747_ip = 66; continue _fun19747 }
case 118:
        r0 = r1.opzioni_en;
        r2 = undefined;
        if(!r0) { _fun19747_ip = 143; continue _fun19747 }
case 128:
        r5 = r4.map;
        r0 = function(a0) { // Environment: r3
            r0 = _closure0_slot0;
            r1 = r0.opzioni_en;
            r0 = a0;
            r0 = r1[r0];
            return r0;
        };
        r2 = r5.bind(r4)(r0);
case 143:
        r0 = {};
        r14 = r0;
        r13 = r1;
        r5 = copyDataProperties(r14, r13);
        r5 = r4.map;
        r3 = function(a0) { // Environment: r3
            r0 = _closure0_slot0;
            r1 = r0.opzioni;
            r0 = a0;
            r0 = r1[r0];
            return r0;
        };
        r5 = r5.bind(r4)(r3);
        r3 = 'opzioni';
        r0[3] = r5;
        r3 = r4.indexOf;
        r1 = r1.corretta;
        r3 = r3.bind(r4)(r1);
        r1 = 'corretta';
        r0[1] = r3;
        r1 = 'opzioni_en';
        r0[1] = r2;
        return r0;
    }
}
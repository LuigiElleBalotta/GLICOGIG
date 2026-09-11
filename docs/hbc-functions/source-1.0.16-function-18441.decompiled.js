function settimanaPerGiorni() {
    _fun18441: for(var _fun18441_ip = 0; ; ) switch(_fun18441_ip) {
case 0:
        r1 = _env_r0_slot1;
        r1 = r1.giornoLocale;
        r4 = undefined;
        r1 = r1.bind(r4)();
        var _closure0_slot0 = r1;
        r0 = _env_r0_slot1;
        r0 = r0.vociTutte;
        r0 = r0.bind(r4)();
        var _closure0_slot1 = r0;
        r0 = new Array(0);
        var _closure0_slot2 = r0;
        r3 = function() { // Original name: _loop, environment: r5
            r0 = _env_r4_slot1;
            r3 = r0.giornoLocale;
            r1 = global;
            r2 = r1.Date;
            r0 = r2.now;
            r2 = r0.bind(r2)();
            r5 = _closure0_slot3;
            r0 = 86400000;
            r0 = r5 * r0;
            r2 = r2 - r0;
            r0 = undefined;
            r8 = r3.bind(r0)(r2);
            var _closure1_slot0 = r8;
            r5 = _closure0_slot1;
            r3 = r5.filter;
            r2 = function(a0) { // Environment: r6
                r0 = a0;
                r1 = r0.giorno;
                r0 = _closure1_slot0;
                r0 = r1 === r0;
                return r0;
            };
            r5 = r3.bind(r5)(r2);
            r3 = r5.sort;
            r2 = function(a0, a1) { // Environment: r6
                r0 = a0;
                r1 = r0.ts;
                r0 = a1;
                r0 = r0.ts;
                r0 = r1 - r0;
                return r0;
            };
            r5 = r3.bind(r5)(r2);
            r3 = r1.Date;
            r1 = 'T00:00:00';
            r12 = r8 + r1;
            r2 = r3.prototype;
            r2 = Object.create(r2, {constructor: {value: r3}});
            r13 = r2;
            r1 = new r13[r3](r12, r11);
            r2 = r1 instanceof Object ? r1 : r2;
            r1 = r2.getDay;
            r2 = r1.bind(r2)();
            r1 = 6;
            r10 = r2 + r1;
            r3 = _closure0_slot2;
            r2 = r3.push;
            r1 = {};
            r1['giorno'] = r8;
            r9 = 7;
            r9 = r10 % r9;
            r1['dow'] = r9;
            r7 = _closure0_slot0;
            r7 = r8 === r7;
            r1['oggi'] = r7;
            r1['voci'] = r5;
            r7 = _env_r4_slot6;
            r9 = r5.reduce;
            r8 = function(a0, a1) { // Environment: r6
                r0 = a1;
                r1 = r0.kcal;
                r0 = a0;
                r0 = r0 + r1;
                return r0;
            };
            r6 = 0;
            r6 = r9.bind(r5)(r8, r6);
            r6 = r7.bind(r0)(r6);
            r1['kcal'] = r6;
            r4 = _env_r4_slot16;
            r4 = r4.bind(r0)(r5);
            r1['fascia'] = r4;
            r1 = r2.bind(r3)(r1);
            return r0;
        };
        r2 = 0;
        var _closure0_slot3 = r2;
        r1 = 7;
case 65:
        r6 = r3.bind(r4)();
        r6 = r2 + 1;
        _closure0_slot3 = r6;
        r2 = r6;
        if(r2 < r1) { _fun18441_ip = 65; continue _fun18441 }
case 83:
        return r0;
    }
}

function andamentoSettimana() {
    _fun18466: for(var _fun18466_ip = 0; ; ) switch(_fun18466_ip) {
case 0:
        r5 = function(a0, a1) { // Original name: media, environment: r0
            _fun18467: for(var _fun18467_ip = 0; ; ) switch(_fun18467_ip) {
case 0:
                r7 = a0;
                r6 = a1;
                r1 = new Array(0);
                r4 = global;
                r3 = 86400000;
                r2 = undefined;
                r0 = null;
                if(!(r7 <= r6)) { _fun18467_ip = 116; continue _fun18467 }
case 29:
                r9 = _env_r5_slot21;
                r8 = _env_r5_slot1;
                r10 = r8.vociDelGiorno;
                r8 = _env_r5_slot1;
                r11 = r8.giornoLocale;
                r12 = r4.Date;
                r8 = r12.now;
                r12 = r8.bind(r12)();
                r8 = r7 * r3;
                r8 = r12 - r8;
                r8 = r11.bind(r2)(r8);
                r8 = r10.bind(r2)(r8);
                r10 = r9.bind(r2)(r8);
                r8 = r7;
                if(!(r10 != r0)) { _fun18467_ip = 109; continue _fun18467 }
case 99:
                r9 = r1.push;
                r9 = r9.bind(r1)(r10);
case 109:
                r7 = r8 + 1;
                if(r7 <= r6) { _fun18467_ip = 29; continue _fun18467 }
case 116:
                r2 = r1.length;
                r0 = null;
                if(!r2) { _fun18467_ip = 156; continue _fun18467 }
case 126:
                r4 = r1.reduce;
                r3 = function(a0, a1) { // Environment: r2
                    r1 = a0;
                    r0 = a1;
                    r0 = r1 + r0;
                    return r0;
                };
                r2 = 0;
                r2 = r4.bind(r1)(r3, r2);
                r1 = r1.length;
                r0 = r2 / r1;
case 156:
                return r0;
            }
        };
        r4 = undefined;
        r2 = 0;
        r0 = 6;
        r1 = r5.bind(r4)(r2, r0);
        r3 = 7;
        r0 = 13;
        r5 = r5.bind(r4)(r3, r0);
        r0 = null;
        if(!(r1 != r0)) { _fun18466_ip = 185; continue _fun18466 }
case 41:
        if(!(r5 != r0)) { _fun18466_ip = 185; continue _fun18466 }
case 48:
        if(!(r5 !== r2)) { _fun18466_ip = 185; continue _fun18466 }
case 55:
        r2 = global;
        r4 = r2.Math;
        r3 = r4.round;
        r1 = r1 - r5;
        r5 = r1 / r5;
        r1 = 100;
        r1 = r5 * r1;
        r4 = r3.bind(r4)(r1);
        r1 = 8;
        if(!(!(r4 >= r1))) { _fun18466_ip = 151; continue _fun18466 }
case 95:
        r1 = -8;
        if(!(!(r4 <= r1))) { _fun18466_ip = 117; continue _fun18466 }
case 105:
        r1 = {'key': 'linea', 'pct': 0};
        return r1;
case 117:
        r1 = {};
        r3 = 'margine';
        r1['key'] = r3;
        r5 = r2.Math;
        r3 = r5.abs;
        r3 = r3.bind(r5)(r4);
        r1['pct'] = r3;
        return r1;
case 151:
        r1 = {};
        r3 = 'meglio';
        r1['key'] = r3;
        r3 = r2.Math;
        r2 = r3.abs;
        r2 = r2.bind(r3)(r4);
        r1['pct'] = r2;
        return r1;
case 185:
        return r0;
    }
}

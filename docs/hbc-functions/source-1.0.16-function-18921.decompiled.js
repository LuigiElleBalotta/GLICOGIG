function setGrammi(a0, a1) {
    _fun18921: for(var _fun18921_ip = 0; ; ) switch(_fun18921_ip) {
case 0:
        r7 = a1;
        r0 = a0;
        var _closure0_slot0 = r0;
        r0 = global;
        r4 = r0.Math;
        r3 = r4.max;
        r6 = r0.Math;
        r5 = r6.min;
        r1 = r0.Math;
        r0 = r1.round;
        if(r7) { _fun18921_ip = 53; continue _fun18921 }
case 51:
        r7 = 0;
case 53:
        r1 = r0.bind(r1)(r7);
        r0 = 2000;
        r1 = r5.bind(r6)(r0, r1);
        r0 = 0;
        r0 = r3.bind(r4)(r0, r1);
        var _closure0_slot1 = r0;
        r3 = _env_r1_slot11;
        r0 = undefined;
        r2 = function(a0) { // Environment: r2
            r2 = a0;
            r1 = r2.map;
            r0 = function(a0, a1) { // Environment: r0
                _fun18923: for(var _fun18923_ip = 0; ; ) switch(_fun18923_ip) {
case 0:
                    r3 = a0;
                    r4 = _closure0_slot0;
                    r1 = a1;
                    r0 = r3;
                    if(!(r1 === r4)) { _fun18923_ip = 48; continue _fun18923 }
case 20:
                    r1 = {};
                    r6 = r1;
                    r5 = r3;
                    r3 = copyDataProperties(r6, r5);
                    r3 = _closure0_slot1;
                    r2 = 'grammi';
                    r1[2] = r3;
                    r0 = r1;
case 48:
                    return r0;
                }
            };
            r0 = r1.bind(r2)(r0);
            return r0;
        };
        r2 = r3.bind(r0)(r2);
        r3 = _env_r1_slot18;
        r2 = true;
        r2 = r3.bind(r0)(r2);
        r2 = _env_r1_slot22;
        r1 = '';
        r1 = r2.bind(r0)(r1);
        return r0;
    }
}

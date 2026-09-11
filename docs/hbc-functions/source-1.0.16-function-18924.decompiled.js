function applicaPorzione(a0, a1) {
    _fun18924: for(var _fun18924_ip = 0; ; ) switch(_fun18924_ip) {
case 0:
        r0 = a1;
        var _closure0_slot0 = r0;
        r0 = _env_r1_slot19;
        r0 = r0.length;
        if(r0) { _fun18924_ip = 30; continue _fun18924 }
case 24:
        r0 = _env_r1_slot10;
        _fun18924_ip = 34; continue _fun18924;
case 30:
        r0 = _env_r1_slot19;
case 34:
        var _closure0_slot1 = r0;
        r3 = _env_r1_slot11;
        r0 = undefined;
        r2 = function(a0) { // Environment: r2
            r2 = a0;
            r1 = r2.map;
            r0 = function(a0, a1) { // Environment: r0
                _fun18926: for(var _fun18926_ip = 0; ; ) switch(_fun18926_ip) {
case 0:
                    r2 = a0;
                    r3 = _closure0_slot1;
                    r0 = a1;
                    r3 = r3[r0];
                    r0 = null;
                    r5 = r3 == r0;
                    r4 = undefined;
                    if(r5) { _fun18926_ip = 33; continue _fun18926 }
case 28:
                    r4 = r3.grammi;
case 33:
                    if(!(r4 == r0)) { _fun18926_ip = 42; continue _fun18926 }
case 37:
                    r4 = r2.grammi;
case 42:
                    if(!(r4 == r0)) { _fun18926_ip = 48; continue _fun18926 }
case 46:
                    r4 = 0;
case 48:
                    r0 = {};
                    r7 = r0;
                    r6 = r2;
                    r2 = copyDataProperties(r7, r6);
                    r2 = global;
                    r3 = r2.Math;
                    r2 = r3.round;
                    if(r4) { _fun18926_ip = 78; continue _fun18926 }
case 76:
                    r4 = 0;
case 78:
                    r1 = _closure0_slot0;
                    r1 = r4 * r1;
                    r2 = r2.bind(r3)(r1);
                    r1 = 'grammi';
                    r0[1] = r2;
                    return r0;
                }
            };
            r0 = r1.bind(r2)(r0);
            return r0;
        };
        r2 = r3.bind(r0)(r2);
        r3 = _env_r1_slot22;
        r2 = a0;
        r2 = r3.bind(r0)(r2);
        r2 = _env_r1_slot18;
        r1 = true;
        r1 = r2.bind(r0)(r1);
        r2 = _env_r1_slot42;
        r1 = 'soft';
        r1 = r2.bind(r0)(r1);
        return r0;
    }
}

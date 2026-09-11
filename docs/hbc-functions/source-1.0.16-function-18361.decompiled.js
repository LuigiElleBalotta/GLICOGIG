function rinominaVoce(a0, a1) {
    _fun18361: for(var _fun18361_ip = 0; ; ) switch(_fun18361_ip) {
case 0:
        r2 = a1;
        r0 = a0;
        var _closure0_slot0 = r0;
        r0 = r2.trim;
        r4 = r0.bind(r2)();
        r3 = r4.slice;
        r2 = 0;
        r0 = 60;
        r0 = r3.bind(r4)(r2, r0);
        var _closure0_slot1 = r0;
        if(r0) { _fun18361_ip = 49; continue _fun18361 }
case 45:
        r0 = undefined;
        return r0;
case 49:
        r3 = _env_r0_slot7;
        r2 = r3.map;
        r1 = function(a0) { // Environment: r1
            _fun18362: for(var _fun18362_ip = 0; ; ) switch(_fun18362_ip) {
case 0:
                r3 = a0;
                r4 = r3.id;
                r1 = _closure0_slot0;
                r0 = r3;
                if(!(r4 === r1)) { _fun18362_ip = 86; continue _fun18362 }
case 22:
                r1 = {};
                r6 = r1;
                r5 = r3;
                r3 = copyDataProperties(r6, r5);
                r3 = _closure0_slot1;
                r2 = 'nome';
                r1[2] = r3;
                r2 = 'nome_en';
                r1[2] = r3;
                r2 = 'nome_es';
                r1[2] = r3;
                r2 = 'nome_de';
                r1[2] = r3;
                r2 = 'nome_fr';
                r1[2] = r3;
                r0 = r1;
case 86:
                return r0;
            }
        };
        r1 = r2.bind(r3)(r1);
        _env_r0_slot7 = r1;
        r1 = _env_r0_slot15;
        r0 = undefined;
        r1 = r1.bind(r0)();
        return r0;
    }
}
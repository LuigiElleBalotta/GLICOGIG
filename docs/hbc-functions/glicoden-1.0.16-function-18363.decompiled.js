function spostaSlot(a0, a1) {
    r0 = a0;
    var _closure0_slot0 = r0;
    r0 = a1;
    var _closure0_slot1 = r0;
    r3 = _env_r0_slot7;
    r2 = r3.map;
    r1 = function(a0) { // Environment: r1
        _fun18364: for(var _fun18364_ip = 0; ; ) switch(_fun18364_ip) {
case 0:
            r3 = a0;
            r4 = r3.id;
            r1 = _closure0_slot0;
            r0 = r3;
            if(!(r4 === r1)) { _fun18364_ip = 55; continue _fun18364 }
case 22:
            r1 = {};
            r6 = r1;
            r5 = r3;
            r3 = copyDataProperties(r6, r5);
            r3 = _closure0_slot1;
            if(r3) { _fun18364_ip = 43; continue _fun18364 }
case 41:
            r3 = undefined;
case 43:
            r2 = 'slot';
            r1[2] = r3;
            r0 = r1;
case 55:
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
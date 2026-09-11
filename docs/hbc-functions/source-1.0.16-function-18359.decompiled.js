function rimuoviDalDiario(a0) {
    r0 = a0;
    var _closure0_slot0 = r0;
    r3 = _env_r0_slot7;
    r2 = r3.filter;
    r1 = function(a0) { // Environment: r1
        r0 = a0;
        r1 = r0.id;
        r0 = _closure0_slot0;
        r0 = r1 !== r0;
        return r0;
    };
    r1 = r2.bind(r3)(r1);
    _env_r0_slot7 = r1;
    r1 = _env_r0_slot15;
    r0 = undefined;
    r1 = r1.bind(r0)();
    return r0;
}
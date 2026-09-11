function rimuovi(a0) {
    r1 = a0;
    var _closure0_slot0 = r1;
    r2 = _env_r1_slot11;
    r1 = undefined;
    r0 = function(a0) { // Environment: r0
        r2 = a0;
        r1 = r2.filter;
        r0 = function(a0, a1) { // Environment: r0
            r1 = _closure0_slot0;
            r0 = a1;
            r0 = r0 !== r1;
            return r0;
        };
        r0 = r1.bind(r2)(r0);
        return r0;
    };
    r0 = r2.bind(r1)(r0);
    return r0;
}

function emit() {
    r6 = _env_r0_slot7;
    r2 = new Array(0);
    r5 = 0;
    r7 = r2;
    r3 = arraySpread(r7, r6, r5);
    var _closure0_slot0 = r2;
    r3 = _env_r0_slot9;
    r2 = r3.forEach;
    r1 = function(a0) { // Environment: r1
        r2 = _closure0_slot0;
        r1 = a0;
        r0 = undefined;
        r0 = r1.bind(r0)(r2);
        return r0;
    };
    r1 = r2.bind(r3)(r1);
    r1 = _env_r0_slot3;
    r3 = r1.setJSON;
    r1 = _env_r0_slot3;
    r1 = r1.K;
    r2 = r1.diario;
    r1 = _env_r0_slot7;
    r0 = undefined;
    r1 = r3.bind(r0)(r2, r1);
    return r0;
}
function useDiario() {
    r0 = _env_r2_slot2;
    r3 = r0.useState;
    r0 = _env_r2_slot7;
    r4 = undefined;
    r5 = r3.bind(r4)(r0);
    r0 = _env_r2_slot0;
    r3 = r0.default;
    r0 = 2;
    r5 = r3.bind(r4)(r5, r0);
    r0 = 0;
    r0 = r5[r0];
    r3 = 1;
    r3 = r5[r3];
    var _closure0_slot0 = r3;
    r2 = _env_r2_slot2;
    r3 = r2.useEffect;
    r2 = function() { // Environment: r1
        r2 = _env_r0_slot9;
        r1 = r2.add;
        r3 = _closure0_slot0;
        r1 = r1.bind(r2)(r3);
        r6 = _env_r0_slot7;
        r2 = new Array(0);
        r5 = 0;
        r7 = r2;
        r1 = arraySpread(r7, r6, r5);
        r1 = undefined;
        r2 = r3.bind(r1)(r2);
        r0 = _env_r0_slot16;
        r0 = r0.bind(r1)();
        r0 = function() { // Environment: r0
            r2 = _env_r0_slot9;
            r1 = r2.delete;
            r0 = _closure0_slot0;
            r0 = r1.bind(r2)(r0);
            r0 = undefined;
            return r0;
        };
        return r0;
    };
    r1 = new Array(0);
    r1 = r3.bind(r4)(r2, r1);
    return r0;
}
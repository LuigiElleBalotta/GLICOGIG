function uid() {
    r0 = global;
    r1 = r0.Date;
    r0 = r1.now;
    r2 = r0.bind(r1)();
    r1 = r2.toString;
    r0 = 36;
    r1 = r1.bind(r2)(r0);
    r0 = 'd';
    r1 = r0 + r1;
    r0 = _env_r3_slot10;
    r0 = parseFloat(r0);
    r2 = r0 + 1;
    _env_r3_slot10 = r2;
    r0 = r1 + r0;
    return r0;
}
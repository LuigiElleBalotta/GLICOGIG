function impostaProssimoSlot(a0) {
    _fun18357: for(var _fun18357_ip = 0; ; ) switch(_fun18357_ip) {
case 0:
        r2 = a0;
        r1 = null;
        if(!r2) { _fun18357_ip = 41; continue _fun18357 }
case 8:
        r0 = {};
        r0['slot'] = r2;
        r2 = global;
        r3 = r2.Date;
        r2 = r3.now;
        r2 = r2.bind(r3)();
        r0['at'] = r2;
        r1 = r0;
case 41:
        _env_r0_slot12 = r1;
        r0 = undefined;
        return r0;
    }
}
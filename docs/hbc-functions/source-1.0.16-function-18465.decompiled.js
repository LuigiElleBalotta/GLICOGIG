function bilancioOggi() {
    _fun18465: for(var _fun18465_ip = 0; ; ) switch(_fun18465_ip) {
case 0:
        r2 = _env_r0_slot21;
        r0 = _env_r0_slot1;
        r0 = r0.vociDelGiorno;
        r1 = undefined;
        r0 = r0.bind(r1)();
        r4 = r2.bind(r1)(r0);
        r0 = null;
        if(!(r4 != r0)) { _fun18465_ip = 79; continue _fun18465 }
case 34:
        r1 = 'buono';
        r2 = 0.6;
        if(!(!(r4 >= r2))) { _fun18465_ip = 77; continue _fun18465 }
case 52:
        r2 = 'daBilanciare';
        r3 = 0.3;
        if(!(r4 >= r3)) { _fun18465_ip = 74; continue _fun18465 }
case 70:
        r2 = 'discreto';
case 74:
        r1 = r2;
case 77:
        return r1;
case 79:
        return r0;
    }
}

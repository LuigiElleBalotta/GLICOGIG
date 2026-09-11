function vociDelGiorno(a0) {
    _fun18365: for(var _fun18365_ip = 0; ; ) switch(_fun18365_ip) {
case 0:
        r1 = a0;
        if(r1) { _fun18365_ip = 21; continue _fun18365 }
case 8:
        r3 = _env_r2_slot14;
        r2 = undefined;
        r1 = r3.bind(r2)();
case 21:
        var _closure0_slot0 = r1;
        r2 = _env_r1_slot7;
        r1 = r2.filter;
        r0 = function(a0) { // Environment: r0
            r0 = a0;
            r1 = r0.giorno;
            r0 = _closure0_slot0;
            r0 = r1 === r0;
            return r0;
        };
        r0 = r1.bind(r2)(r0);
        return r0;
    }
}
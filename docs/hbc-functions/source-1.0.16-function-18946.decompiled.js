function avviaPastoCompleto() {
    _fun18946: for(var _fun18946_ip = 0; ; ) switch(_fun18946_ip) {
case 0:
        r0 = _env_r1_slot25;
        if(r0) { _fun18946_ip = 55; continue _fun18946 }
case 10:
        r2 = _env_r1_slot24;
        r0 = undefined;
        r2 = r2.bind(r0)(r0);
        r3 = _env_r1_slot23;
        r2 = function(a0) { // Environment: r2
            r1 = a0;
            r0 = 1;
            r0 = r1 + r0;
            return r0;
        };
        r2 = r3.bind(r0)(r2);
        r3 = _closure0_slot42;
        r2 = 'soft';
        r2 = r3.bind(r0)(r2);
        return r0;
case 55:
        r0 = _closure0_slot20;
        r3 = r0.getIniziato;
        r0 = undefined;
        r4 = r3.bind(r0)();
        if(!r4) { _fun18946_ip = 123; continue _fun18946 }
case 77:
        r3 = global;
        r5 = r3.Date;
        r3 = r5.now;
        r3 = r3.bind(r5)();
        r4 = r3 - r4;
        r3 = 14400000;
        if(!(r4 > r3)) { _fun18946_ip = 123; continue _fun18946 }
case 109:
        r2 = _closure0_slot20;
        r2 = r2.svuotaPasto;
        r2 = r2.bind(r0)();
case 123:
        r3 = _env_r1_slot26;
        r2 = true;
        r2 = r3.bind(r0)(r2);
        r1 = _env_r1_slot49;
        r1 = r1.bind(r0)();
        return r0;
    }
}

function vociUltimiGiorni() {
    _fun18367: for(var _fun18367_ip = 0; ; ) switch(_fun18367_ip) {
case 0:
        r4 = undefined;
        r2 = undefined;
        r3 = arguments.length;
        r1 = 0;
        r3 = r3 > r1;
        r5 = 7;
        r6 = r5;
        if(!r3) { _fun18367_ip = 39; continue _fun18367 }
case 24:
        r3 = arguments[r1];
        r6 = r5;
        if(!(r3 !== r4)) { _fun18367_ip = 39; continue _fun18367 }
case 35:
        r6 = arguments[r1];
case 39:
        r3 = _env_r1_slot14;
        r2 = global;
        r5 = r2.Date;
        r2 = r5.now;
        r5 = r2.bind(r5)();
        r2 = 1;
        r6 = r6 - r2;
        r2 = 86400000;
        r2 = r6 * r2;
        r2 = r5 - r2;
        r2 = r3.bind(r4)(r2);
        var _closure0_slot0 = r2;
        r2 = _env_r1_slot7;
        r1 = r2.filter;
        r0 = function(a0) { // Environment: r0
            r0 = a0;
            r1 = r0.giorno;
            r0 = _closure0_slot0;
            r0 = r1 >= r0;
            return r0;
        };
        r0 = r1.bind(r2)(r0);
        return r0;
    }
}
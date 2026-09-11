function cgMedio(a0) {
    _fun18489: for(var _fun18489_ip = 0; ; ) switch(_fun18489_ip) {
case 0:
        r1 = a0;
        r2 = r1.length;
        r4 = 0;
        r0 = 0;
        if(!r2) { _fun18489_ip = 43; continue _fun18489 }
case 15:
        r3 = r1.reduce;
        r2 = function(a0, a1) { // Environment: r2
            r0 = a1;
            r1 = r0.cg;
            r0 = a0;
            r0 = r0 + r1;
            return r0;
        };
        r2 = r3.bind(r1)(r2, r4);
        r1 = r1.length;
        r0 = r2 / r1;
case 43:
        return r0;
    }
}

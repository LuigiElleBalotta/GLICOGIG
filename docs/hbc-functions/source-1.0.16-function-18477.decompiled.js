function verdettoSettimana(a0) {
    _fun18477: for(var _fun18477_ip = 0; ; ) switch(_fun18477_ip) {
case 0:
        r0 = a0;
        r1 = r0.length;
        if(r1) { _fun18477_ip = 17; continue _fun18477 }
case 11:
        r1 = 'equilibrata';
        return r1;
case 17:
        r2 = r0.filter;
        r1 = function(a0) { // Environment: r1
            _fun18478: for(var _fun18478_ip = 0; ; ) switch(_fun18478_ip) {
case 0:
                r1 = _env_r0_slot5;
                r0 = a0;
                r0 = r0.fascia;
                r1 = r1[r0];
                r0 = null;
                if(!(r1 == r0)) { _fun18478_ip = 28; continue _fun18478 }
case 25:
                r1 = 1;
case 28:
                r0 = 2;
                r0 = r1 >= r0;
                return r0;
            }
        };
        r1 = r2.bind(r0)(r1);
        r1 = r1.length;
        r0 = r0.length;
        r1 = r1 / r0;
        r0 = 0.5;
        if(!(!(r1 >= r0))) { _fun18477_ip = 88; continue _fun18477 }
case 62:
        r0 = 0.25;
        if(!(!(r1 >= r0))) { _fun18477_ip = 82; continue _fun18477 }
case 76:
        r0 = 'equilibrata';
        return r0;
case 82:
        r0 = 'moderata';
        return r0;
case 88:
        r0 = 'intensa';
        return r0;
    }
}

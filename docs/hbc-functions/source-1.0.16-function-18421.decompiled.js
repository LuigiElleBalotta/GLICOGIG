function stimaPiattoIntero(a0, a1) {
    _fun18421: for(var _fun18421_ip = 0; ; ) switch(_fun18421_ip) {
case 0:
        r1 = a0;
        r5 = a1;
        var _closure0_slot0 = r1;
        if(!r1) { _fun18421_ip = 18; continue _fun18421 }
case 15:
        if(r5) { _fun18421_ip = 22; continue _fun18421 }
case 18:
        r1 = null;
        return r1;
case 22:
        r2 = _env_r1_slot4;
        r1 = r2.find;
        r0 = function(a0) { // Environment: r0
            r0 = a0;
            r2 = r0.re;
            r1 = r2.test;
            r0 = _closure0_slot0;
            r0 = r1.bind(r2)(r0);
            return r0;
        };
        r1 = r1.bind(r2)(r0);
        if(!r1) { _fun18421_ip = 57; continue _fun18421 }
case 48:
        r0 = r1.floor;
        if(r0) { _fun18421_ip = 61; continue _fun18421 }
case 57:
        r0 = null;
        return r0;
case 61:
        r0 = global;
        r4 = r0.Math;
        r3 = r4.round;
        r2 = r1.carbo100;
        r2 = r2 * r5;
        r5 = 100;
        r2 = r2 / r5;
        r3 = r3.bind(r4)(r2);
        r4 = r0.Math;
        r2 = r4.round;
        r0 = r1.ig;
        r0 = r0 * r3;
        r0 = r0 / r5;
        r2 = r2.bind(r4)(r0);
        r0 = {};
        r0['carbo'] = r3;
        r0['cg'] = r2;
        r1 = r1.ig;
        r0['ig'] = r1;
        return r0;
    }
}
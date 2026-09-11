function matchForte(a0, a1) {
    _fun18412: for(var _fun18412_ip = 0; ; ) switch(_fun18412_ip) {
case 0:
        r3 = _env_r1_slot3;
        r4 = undefined;
        r2 = a0;
        r2 = r3.bind(r4)(r2);
        r3 = _env_r1_slot3;
        r1 = a1;
        r5 = r3.bind(r4)(r1);
        if(!r2) { _fun18412_ip = 37; continue _fun18412 }
case 34:
        if(r5) { _fun18412_ip = 41; continue _fun18412 }
case 37:
        r1 = false;
        return r1;
case 41:
        if(!(r2 !== r5)) { _fun18412_ip = 178; continue _fun18412 }
case 48:
        r1 = r2.includes;
        r1 = r1.bind(r2)(r5);
        if(r1) { _fun18412_ip = 178; continue _fun18412 }
case 61:
        r1 = r5.includes;
        r1 = r1.bind(r5)(r2);
        if(r1) { _fun18412_ip = 178; continue _fun18412 }
case 74:
        r1 = r2.split;
        r3 = ' ';
        r4 = r1.bind(r2)(r3);
        r2 = r4.filter;
        r1 = function(a0) { // Environment: r0
            r0 = a0;
            r1 = r0.length;
            r0 = 4;
            r0 = r1 >= r0;
            return r0;
        };
        r2 = r2.bind(r4)(r1);
        r1 = global;
        r4 = r1.Set;
        r1 = r5.split;
        r5 = r1.bind(r5)(r3);
        r3 = r5.filter;
        r1 = function(a0) { // Environment: r0
            r0 = a0;
            r1 = r0.length;
            r0 = 4;
            r0 = r1 >= r0;
            return r0;
        };
        r6 = r3.bind(r5)(r1);
        r3 = r4.prototype;
        r3 = Object.create(r3, {constructor: {value: r4}});
        r7 = r3;
        r1 = new r7[r4](r6, r5);
        r1 = r1 instanceof Object ? r1 : r3;
        var _closure0_slot0 = r1;
        r1 = r2.some;
        r0 = function(a0) { // Environment: r0
            r2 = _closure0_slot0;
            r1 = r2.has;
            r0 = a0;
            r0 = r1.bind(r2)(r0);
            return r0;
        };
        r0 = r1.bind(r2)(r0);
        return r0;
case 178:
        r0 = true;
        return r0;
    }
}
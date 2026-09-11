function risolviScelta(a0) {
    _fun18451: for(var _fun18451_ip = 0; ; ) switch(_fun18451_ip) {
case 0:
        r0 = a0;
        r4 = undefined;
        r2 = undefined;
        r3 = arguments.length;
        r1 = 1;
        if(!(r3 > r1)) { _fun18451_ip = 25; continue _fun18451 }
case 17:
        r3 = arguments[r1];
        if(!(r3 === r4)) { _fun18451_ip = 45; continue _fun18451 }
case 25:
        r3 = global;
        r4 = r3.Date;
        r3 = r4.now;
        r3 = r3.bind(r4)();
        _fun18451_ip = 49; continue _fun18451;
case 45:
        r3 = arguments[r1];
case 49:
        r1 = 'spuntino';
        if(!(r0 === r1)) { _fun18451_ip = 118; continue _fun18451 }
case 57:
        r1 = global;
        r1 = r1.Date;
        r2 = r1.prototype;
        r2 = Object.create(r2, {constructor: {value: r1}});
        r6 = r2;
        r5 = r3;
        r1 = new r6[r1](r5, r4);
        r2 = r1 instanceof Object ? r1 : r2;
        r1 = r2.getHours;
        r2 = r1.bind(r2)();
        r1 = 15;
        r2 = r2 < r1;
        r1 = 'spuntino_p';
        if(!r2) { _fun18451_ip = 116; continue _fun18451 }
case 112:
        r1 = 'spuntino_m';
case 116:
        return r1;
case 118:
        return r0;
    }
}

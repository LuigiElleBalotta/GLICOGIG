function giornoLocale(a0) {
    _fun18348: for(var _fun18348_ip = 0; ; ) switch(_fun18348_ip) {
case 0:
        r2 = a0;
        r0 = null;
        if(!(r2 == r0)) { _fun18348_ip = 39; continue _fun18348 }
case 9:
        r0 = global;
        r0 = r0.Date;
        r1 = r0.prototype;
        r1 = Object.create(r1, {constructor: {value: r0}});
        r6 = r1;
        r0 = new r6[r0](r5);
        r3 = r0 instanceof Object ? r0 : r1;
        _fun18348_ip = 70; continue _fun18348;
case 39:
        r0 = global;
        r0 = r0.Date;
        r1 = r0.prototype;
        r1 = Object.create(r1, {constructor: {value: r0}});
        r6 = r1;
        r5 = r2;
        r0 = new r6[r0](r5, r4);
        r3 = r0 instanceof Object ? r0 : r1;
case 70:
        r0 = r3.getTimezoneOffset;
        r1 = r0.bind(r3)();
        r0 = 60000;
        r1 = r1 * r0;
        r0 = global;
        r2 = r0.Date;
        r0 = r3.getTime;
        r0 = r0.bind(r3)();
        r5 = r0 - r1;
        r1 = r2.prototype;
        r1 = Object.create(r1, {constructor: {value: r2}});
        r6 = r1;
        r0 = new r6[r2](r5, r4);
        r1 = r0 instanceof Object ? r0 : r1;
        r0 = r1.toISOString;
        r3 = r0.bind(r1)();
        r2 = r3.slice;
        r1 = 0;
        r0 = 10;
        r0 = r2.bind(r3)(r1, r0);
        return r0;
    }
}
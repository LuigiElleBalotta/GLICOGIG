function giornoIndice() {
    _fun19745: for(var _fun19745_ip = 0; ; ) switch(_fun19745_ip) {
case 0:
        r3 = undefined;
        r1 = undefined;
        r2 = arguments.length;
        r0 = 0;
        if(!(r2 > r0)) { _fun19745_ip = 21; continue _fun19745 }
case 13:
        r2 = arguments[r0];
        if(!(r2 === r3)) { _fun19745_ip = 51; continue _fun19745 }
case 21:
        r2 = global;
        r2 = r2.Date;
        r3 = r2.prototype;
        r3 = Object.create(r3, {constructor: {value: r2}});
        r5 = r3;
        r2 = new r5[r2](r4);
        r3 = r2 instanceof Object ? r2 : r3;
        _fun19745_ip = 55; continue _fun19745;
case 51:
        r3 = arguments[r0];
case 55:
        r0 = global;
        r2 = r0.Math;
        r1 = r2.floor;
        r0 = r3.getTime;
        r3 = r0.bind(r3)();
        r0 = 86400000;
        r0 = r3 / r0;
        r0 = r1.bind(r2)(r0);
        return r0;
    }
}
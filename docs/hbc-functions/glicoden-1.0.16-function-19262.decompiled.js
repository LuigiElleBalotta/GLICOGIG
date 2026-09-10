function num(a0) {
    _fun19262: for(var _fun19262_ip = 0; ; ) switch(_fun19262_ip) {
case 0:
        r3 = a0;
        r2 = typeof r3;
        r0 = 'number';
        r1 = r3;
        if(!(r2 !== r0)) { _fun19262_ip = 32; continue _fun19262 }
case 17:
        r0 = global;
        r2 = r0.parseFloat;
        r0 = undefined;
        r1 = r2.bind(r0)(r3);
case 32:
        r0 = global;
        r2 = r0.Number;
        r0 = r2.isFinite;
        r2 = r0.bind(r2)(r1);
        r0 = null;
        if(!r2) { _fun19262_ip = 59; continue _fun19262 }
case 56:
        r0 = r1;
case 59:
        return r0;
    }
}
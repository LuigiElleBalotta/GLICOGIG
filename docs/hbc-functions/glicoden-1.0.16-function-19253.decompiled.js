function correggiSecco(a0, a1) {
    _fun19253: for(var _fun19253_ip = 0; ; ) switch(_fun19253_ip) {
case 0:
        r2 = a1;
        r1 = a0;
        var _closure0_slot0 = r1;
        r3 = _env_r1_slot6;
        r1 = r3.find;
        r0 = function(a0) { // Environment: r0
            _fun19254: for(var _fun19254_ip = 0; ; ) switch(_fun19254_ip) {
case 0:
                r0 = a0;
                r2 = r0.re;
                r1 = r2.test;
                r0 = _closure0_slot0;
                if(r0) { _fun19254_ip = 28; continue _fun19254 }
case 24:
                r0 = '';
case 28:
                r0 = r1.bind(r2)(r0);
                return r0;
            }
        };
        r1 = r1.bind(r3)(r0);
        if(r1) { _fun19253_ip = 54; continue _fun19253 }
case 38:
        r0 = {};
        r0['carbo'] = r2;
        r3 = false;
        r0['corretto'] = r3;
        return r0;
case 54:
        r0 = null;
        if(!(r2 != r0)) { _fun19253_ip = 100; continue _fun19253 }
case 60:
        r3 = r1.carbo;
        r0 = 0.85;
        r0 = r3 * r0;
        if(!(!(r2 < r0))) { _fun19253_ip = 100; continue _fun19253 }
case 84:
        r0 = {};
        r0['carbo'] = r2;
        r2 = false;
        r0['corretto'] = r2;
        return r0;
case 100:
        r0 = {};
        r1 = r1.carbo;
        r0['carbo'] = r1;
        r1 = true;
        r0['corretto'] = r1;
        return r0;
    }
}
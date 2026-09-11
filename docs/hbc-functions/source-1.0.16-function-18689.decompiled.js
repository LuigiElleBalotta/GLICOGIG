function ?anon_0_(a0) {
    _fun18689: for(var _fun18689_ip = 0; ; ) switch(_fun18689_ip) {
case 0:
        StartGenerator();
        ResumeGenerator(result_out_reg=0, return_bool_out_reg=1);
        if(r1) { _fun18689_ip = 153; continue _fun18689 }
case 10:
        r4 = undefined;
        r2 = undefined;
        r3 = arguments.length;
        r1 = 1;
        if(!(r3 > r1)) { _fun18689_ip = 32; continue _fun18689 }
case 24:
        r3 = arguments[r1];
        if(!(r3 === r4)) { _fun18689_ip = 36; continue _fun18689 }
case 32:
        r4 = {};
        _fun18689_ip = 40; continue _fun18689;
case 36:
        r4 = arguments[r1];
case 40:
        r2 = _env_r1_slot2;
        r2 = r2.default;
        if(!r2) { _fun18689_ip = 73; continue _fun18689 }
case 55:
        r2 = _env_r1_slot2;
        r2 = r2.default;
        r2 = r2.shareAsync;
        if(r2) { _fun18689_ip = 113; continue _fun18689 }
case 73:
        r2 = _env_r1_slot1;
        r6 = r2.UnavailabilityError;
        r2 = r6.prototype;
        r3 = Object.create(r2, {constructor: {value: r6}});
        r8 = 'Sharing';
        r7 = 'shareAsync';
        r9 = r3;
        r2 = new r9[r6](r8, r7, r6);
        r2 = r2 instanceof Object ? r2 : r3;
        throw r2;
case 113:
        r1 = _env_r1_slot2;
        r3 = r1.default;
        r2 = r3.shareAsync;
        r1 = a0;
        r1 = r2.bind(r3)(r1, r4);
        SaveGenerator(address=141);
case 139:
        return r1;
case 141:
        ResumeGenerator(result_out_reg=1, return_bool_out_reg=2);
        if(r2) { _fun18689_ip = 150; continue _fun18689 }
case 147:
        return r1;
case 150:
        return r1;
case 153:
        return r0;
    }
}
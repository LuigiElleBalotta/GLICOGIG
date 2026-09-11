function quizDelGiorno() {
    _fun19751: for(var _fun19751_ip = 0; ; ) switch(_fun19751_ip) {
case 0:
        r8 = undefined;
        r0 = undefined;
        r1 = arguments.length;
        r7 = 0;
        if(!(r1 > r7)) { _fun19751_ip = 21; continue _fun19751 }
case 13:
        r1 = arguments[r7];
        if(!(r1 === r8)) { _fun19751_ip = 51; continue _fun19751 }
case 21:
        r1 = global;
        r1 = r1.Date;
        r2 = r1.prototype;
        r2 = Object.create(r2, {constructor: {value: r1}});
        r16 = r2;
        r1 = new r16[r1](r15);
        r1 = r1 instanceof Object ? r1 : r2;
        _fun19751_ip = 55; continue _fun19751;
case 51:
        r1 = arguments[r7];
case 55:
        r0 = _env_r6_slot7;
        r5 = r0.bind(r8)(r1);
        r0 = _env_r6_slot4;
        r1 = r5 * r0;
        r0 = _env_r6_slot5;
        r0 = r0.length;
        r4 = r1 % r0;
        r0 = new Array(0);
        r1 = _env_r6_slot4;
        r1 = r7 < r1;
        r3 = 100003;
        r2 = 0;
        if(!r1) { _fun19751_ip = 201; continue _fun19751 }
case 111:
        r9 = _env_r6_slot3;
        r10 = _env_r6_slot5;
        r11 = r4 + r2;
        r1 = _env_r6_slot5;
        r1 = r1.length;
        r1 = r11 % r1;
        r1 = r10[r1];
        r11 = r9[r1];
        r9 = r0.push;
        r10 = _env_r6_slot9;
        r12 = r5 * r3;
        r13 = _env_r6_slot8;
        r1 = r11.id;
        r1 = r13.bind(r8)(r1);
        r1 = r12 + r1;
        r1 = r1 >>> r7;
        r1 = r10.bind(r8)(r11, r1);
        r1 = r9.bind(r0)(r1);
        r2 = r2 + 1;
        r1 = _env_r6_slot4;
        if(r2 < r1) { _fun19751_ip = 111; continue _fun19751 }
case 201:
        return r0;
    }
}
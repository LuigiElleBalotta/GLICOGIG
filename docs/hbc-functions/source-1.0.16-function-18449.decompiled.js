function slotDiPasto(a0) {
    _fun18449: for(var _fun18449_ip = 0; ; ) switch(_fun18449_ip) {
case 0:
        r3 = undefined;
        r4 = undefined;
        r0 = undefined;
        r1 = global;
        r5 = r1.Date;
        r1 = r5.prototype;
        r2 = Object.create(r1, {constructor: {value: r5}});
        r7 = a0;
        r8 = r2;
        r1 = new r8[r5](r7, r6);
        r5 = r1 instanceof Object ? r1 : r2;
        r1 = r5.getHours;
        r2 = r1.bind(r5)();
        r1 = r5.getMinutes;
        r5 = r1.bind(r5)();
        r1 = 60;
        r1 = r5 / r1;
        r2 = r2 + r1;
        r4 = r2;
        r1 = 4;
        if(!(r2 < r1)) { _fun18449_ip = 88; continue _fun18449 }
case 78:
        r2 = r4;
        r1 = 24;
        r4 = r2 + r1;
case 88:
        r5 = _env_r1_slot7;
        r2 = r5;
        r1 = r2[Symbol.iterator];
        r2 = r1().next;
case 101:
        r5 = r2().value;
        r6 = r1;
        if(!(r6 !== r3)) { _fun18449_ip = 163; continue _fun18449 }
case 112: // try_start_0
        r0 = r5;
        r6 = r4;
        r5 = r5.from;
        if(!(r6 >= r5)) { _fun18449_ip = 144; continue _fun18449 }
case 128:
        r6 = r4;
        r5 = r0;
        r5 = r5.to;
        if(!(!(r6 < r5))) { _fun18449_ip = 146; continue _fun18449 }
case 144: // try_end0
        _fun18449_ip = 101; continue _fun18449;
case 146: // try_start_1
        r0 = r0.key;
case 151: // try_end1
        r1.return();
        return r0;
case 156: // catch_target0 // catch_target1
        CatchBlockStart(arg_register=0);
        r1.return();
        throw r0;
case 163:
        r0 = 'cena';
        return r0;
    }
}

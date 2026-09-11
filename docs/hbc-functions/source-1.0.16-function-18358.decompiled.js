function registraMangiato(a0) {
    _fun18358: for(var _fun18358_ip = 0; ; ) switch(_fun18358_ip) {
case 0:
        r2 = a0;
        r0 = _env_r1_slot12;
        r3 = undefined;
        r5 = undefined;
        if(!r0) { _fun18358_ip = 72; continue _fun18358 }
case 17:
        r0 = global;
        r4 = r0.Date;
        r0 = r4.now;
        r4 = r0.bind(r4)();
        r0 = _env_r1_slot12;
        r0 = r0.at;
        r4 = r4 - r0;
        r0 = _env_r1_slot13;
        r0 = r4 < r0;
        r5 = undefined;
        if(!r0) { _fun18358_ip = 72; continue _fun18358 }
case 62:
        r0 = _env_r1_slot12;
        r5 = r0.slot;
case 72:
        r0 = null;
        _env_r1_slot12 = r0;
        r4 = r2.slot;
        if(!(r4 == r0)) { _fun18358_ip = 91; continue _fun18358 }
case 88:
        r4 = r5;
case 91:
        if(!(r4 == r0)) { _fun18358_ip = 97; continue _fun18358 }
case 95:
        r4 = undefined;
case 97:
        r0 = {};
        r9 = r0;
        r8 = r2;
        r2 = copyDataProperties(r9, r8);
        r2 = 'slot';
        r0[2] = r4;
        r2 = _env_r1_slot11;
        r4 = r2.bind(r3)();
        r2 = 'id';
        r0[2] = r4;
        r2 = global;
        r4 = r2.Date;
        r2 = r4.now;
        r4 = r2.bind(r4)();
        r2 = 'ts';
        r0[2] = r4;
        r2 = _env_r1_slot14;
        r4 = r2.bind(r3)();
        r2 = 'giorno';
        r0[2] = r4;
        r8 = _env_r1_slot7;
        r5 = new Array(1);
        r7 = 0;
        r9 = r5;
        r4 = arraySpread(r9, r8, r7);
        r5[4] = r0;
        r2 = 1;
        r2 = r4 + r2;
        r4 = r5.slice;
        r2 = -800;
        r2 = r4.bind(r5)(r2);
        _env_r1_slot7 = r2;
        r2 = _env_r1_slot15;
        r2 = r2.bind(r3)();
        r1 = _env_r1_slot5;
        r2 = r1.logEvento;
        r1 = 'pasto_mangiato';
        r1 = r2.bind(r3)(r1);
        return r0;
    }
}
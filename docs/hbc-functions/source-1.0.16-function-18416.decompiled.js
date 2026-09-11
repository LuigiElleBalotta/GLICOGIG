function riconosciDalNome(a0) {
    _fun18416: for(var _fun18416_ip = 0; ; ) switch(_fun18416_ip) {
case 0:
        r1 = a0;
        if(r1) { _fun18416_ip = 10; continue _fun18416 }
case 6:
        r1 = '';
case 10:
        r0 = r1.trim;
        r4 = r0.bind(r1)();
        r1 = r4.length;
        r0 = 3;
        if(!(!(r1 < r0))) { _fun18416_ip = 83; continue _fun18416 }
case 32:
        r0 = _env_r2_slot1;
        r0 = r0.cercaAlimenti;
        r1 = undefined;
        r3 = r0.bind(r1)(r4);
        r0 = 0;
        r0 = r3[r0];
        if(!r0) { _fun18416_ip = 79; continue _fun18416 }
case 61:
        r3 = _env_r2_slot6;
        r2 = r0.nome;
        r2 = r3.bind(r1)(r4, r2);
        if(r2) { _fun18416_ip = 81; continue _fun18416 }
case 79:
        return r1;
case 81:
        return r0;
case 83:
        r0 = undefined;
        return r0;
    }
}
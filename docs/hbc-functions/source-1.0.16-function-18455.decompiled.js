function datiCardOggi() {
    _fun18455: for(var _fun18455_ip = 0; ; ) switch(_fun18455_ip) {
case 0:
        r2 = _env_r1_slot1;
        r2 = r2.vociDelGiorno;
        r8 = undefined;
        r3 = r2.bind(r8)();
        r2 = _env_r1_slot20;
        r7 = r2.bind(r8)(r3);
        r2 = null;
        if(!(r7 == r2)) { _fun18455_ip = 38; continue _fun18455 }
case 36:
        r7 = 0;
case 38:
        r2 = _env_r1_slot1;
        r2 = r2.giornoLocale;
        r13 = r2.bind(r8)();
        r2 = global;
        r5 = r2.parseInt;
        r6 = r13.slice;
        r4 = 8;
        r10 = 10;
        r4 = r6.bind(r13)(r4, r10);
        r9 = r5.bind(r8)(r4, r10);
        r5 = _env_r1_slot9;
        r6 = r2.parseInt;
        r12 = r13.slice;
        r11 = 5;
        r4 = 7;
        r4 = r12.bind(r13)(r11, r4);
        r6 = r6.bind(r8)(r4, r10);
        r4 = 1;
        r4 = r6 - r4;
        r6 = r5[r4];
        r2 = r2.HermesInternal;
        r5 = r2.concat;
        r4 = '';
        r2 = ' ';
        r6 = r5.bind(r4)(r9, r2, r6);
        r2 = 85;
        r2 = r7 >= r2;
        r5 = 'Giornata molto stabile';
        if(r2) { _fun18455_ip = 205; continue _fun18455 }
case 167:
        r2 = 70;
        r4 = r7 >= r2;
        r2 = 'Bella giornata di scelte';
        if(r4) { _fun18455_ip = 202; continue _fun18455 }
case 181:
        r4 = 55;
        r9 = r7 >= r4;
        r4 = 'Giornata impegnativa';
        if(!r9) { _fun18455_ip = 199; continue _fun18455 }
case 195:
        r4 = 'Giornata nella media';
case 199:
        r2 = r4;
case 202:
        r5 = r2;
case 205:
        r2 = _env_r1_slot6;
        r9 = r3.reduce;
        r1 = function(a0, a1) { // Environment: r0
            _fun18456: for(var _fun18456_ip = 0; ; ) switch(_fun18456_ip) {
case 0:
                r0 = a1;
                r1 = r0.kcal;
                if(r1) { _fun18456_ip = 13; continue _fun18456 }
case 11:
                r1 = 0;
case 13:
                r0 = a0;
                r0 = r0 + r1;
                return r0;
            }
        };
        r4 = 0;
        r1 = r9.bind(r3)(r1, r4);
        r2 = r2.bind(r8)(r1);
        r1 = r3.map;
        r0 = function(a0) { // Environment: r0
            r1 = a0;
            r0 = {};
            r2 = r1.nome;
            r0['nome'] = r2;
            r3 = _env_r2_slot6;
            r2 = r1.kcal;
            r1 = undefined;
            r1 = r3.bind(r1)(r2);
            r0['kcal'] = r1;
            return r0;
        };
        r1 = r1.bind(r3)(r0);
        r0 = {};
        r0['punteggio'] = r7;
        r0['data'] = r6;
        r6 = r3.length;
        r0['nPasti'] = r6;
        r0['frase'] = r5;
        r3 = r3.length;
        r3 = r3 === r4;
        r0['vuoto'] = r3;
        r0['kcal'] = r2;
        r0['pasti'] = r1;
        return r0;
    }
}

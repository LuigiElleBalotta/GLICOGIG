function stimaImpattoManuale(a0) {
    _fun18594: for(var _fun18594_ip = 0; ; ) switch(_fun18594_ip) {
case 0:
        r3 = a0;
        r1 = r3.nome;
        if(r1) { _fun18594_ip = 15; continue _fun18594 }
case 11:
        r1 = '';
case 15:
        r0 = r1.trim;
        r6 = r0.bind(r1)();
        r2 = global;
        r5 = r2.Math;
        r4 = r5.max;
        r0 = r3.carbo;
        if(r0) { _fun18594_ip = 49; continue _fun18594 }
case 47:
        r0 = 0;
case 49:
        r1 = 0;
        r0 = r4.bind(r5)(r1, r0);
        r7 = r2.Math;
        r5 = r7.max;
        r4 = r3.prot;
        if(r4) { _fun18594_ip = 79; continue _fun18594 }
case 77:
        r4 = 0;
case 79:
        r8 = r5.bind(r7)(r1, r4);
        r7 = r2.Math;
        r5 = r7.max;
        r4 = r3.grassi;
        if(r4) { _fun18594_ip = 107; continue _fun18594 }
case 105:
        r4 = 0;
case 107:
        r10 = r5.bind(r7)(r1, r4);
        r5 = r2.Math;
        r4 = r5.max;
        r3 = r3.fibre;
        if(r3) { _fun18594_ip = 135; continue _fun18594 }
case 133:
        r3 = 0;
case 135:
        r11 = r4.bind(r5)(r1, r3);
        r4 = _env_r3_slot1;
        r5 = r4.REGEX_LIQUIDO;
        r4 = r5.test;
        r9 = r4.bind(r5)(r6);
        r5 = r6.length;
        r4 = 3;
        r4 = r5 >= r4;
        r7 = undefined;
        r13 = undefined;
        if(!r4) { _fun18594_ip = 202; continue _fun18594 }
case 183:
        r4 = _env_r3_slot0;
        r4 = r4.cercaAlimenti;
        r4 = r4.bind(r7)(r6);
        r13 = r4[r1];
case 202:
        if(!r13) { _fun18594_ip = 216; continue _fun18594 }
case 205:
        r5 = r13.ig_medio;
        r4 = null;
        if(!(r5 == r4)) { _fun18594_ip = 285; continue _fun18594 }
case 216:
        r5 = _env_r3_slot2;
        r4 = r5.test;
        r12 = r4.bind(r5)(r6);
        r4 = 'stima';
        r5 = 0;
        r1 = r4;
        if(r12) { _fun18594_ip = 294; continue _fun18594 }
case 242:
        r14 = _env_r3_slot3;
        r12 = r14.test;
        r14 = r12.bind(r14)(r6);
        r12 = 65;
        r5 = r12;
        r1 = r4;
        if(r14) { _fun18594_ip = 294; continue _fun18594 }
case 268:
        r5 = r12;
        r1 = r4;
        if(r9) { _fun18594_ip = 294; continue _fun18594 }
case 277:
        r5 = 55;
        r1 = r4;
        _fun18594_ip = 294; continue _fun18594;
case 285:
        r5 = r13.ig_medio;
        r1 = 'catalogo';
case 294:
        r4 = _env_r3_slot1;
        r4 = r4.aggiustaIGperPreparazione;
        r5 = r4.bind(r7)(r5, r7, r6);
        r12 = r2.Math;
        r6 = r12.round;
        r14 = r5 * r0;
        r4 = 100;
        r4 = r14 / r4;
        r4 = r6.bind(r12)(r4);
        r3 = _env_r3_slot1;
        r6 = r3.classificaFascia;
        r3 = {};
        r3['cg'] = r4;
        r3['carbo'] = r0;
        r3['ig'] = r5;
        r3['fibre'] = r11;
        r3['proteine'] = r8;
        r3['grassi'] = r10;
        r3['liquido'] = r9;
        r12 = null;
        r14 = r13 == r12;
        r9 = undefined;
        if(r14) { _fun18594_ip = 400; continue _fun18594 }
case 395:
        r9 = r13.zuccheri_g;
case 400:
        if(!(r9 == r12)) { _fun18594_ip = 406; continue _fun18594 }
case 404:
        r9 = null;
case 406:
        r3['zuccheri100'] = r9;
        r14 = r13 == r12;
        r9 = undefined;
        if(r14) { _fun18594_ip = 425; continue _fun18594 }
case 420:
        r9 = r13.carboidrati_disponibili_g;
case 425:
        if(!(r9 == r12)) { _fun18594_ip = 431; continue _fun18594 }
case 429:
        r9 = null;
case 431:
        r3['carbo100'] = r9;
        r3 = r6.bind(r7)(r3);
        r3 = r3.fascia;
        r6 = r2.Math;
        r2 = r6.round;
        r7 = 4;
        r9 = r0 * r7;
        r0 = 2;
        r0 = r11 * r0;
        r8 = r8 * r7;
        r7 = 9;
        r7 = r10 * r7;
        r0 = r9 + r0;
        r0 = r0 + r8;
        r0 = r0 + r7;
        r2 = r2.bind(r6)(r0);
        r0 = {};
        r0['ig'] = r5;
        r0['cg'] = r4;
        r0['fascia'] = r3;
        r0['kcal'] = r2;
        r0['fonteIg'] = r1;
        return r0;
    }
}

function snapshotDaVoce(a0, a1) {
    _fun18349: for(var _fun18349_ip = 0; ; ) switch(_fun18349_ip) {
case 0:
        r0 = a0;
        r4 = a1;
        r2 = _env_r1_slot4;
        r5 = r2.metodoPasto;
        r2 = new Array(1);
        r2[0] = r0;
        r3 = undefined;
        r10 = r5.bind(r3)(r2);
        r2 = r0.grammi;
        if(r2) { _fun18349_ip = 44; continue _fun18349 }
case 42:
        r2 = 0;
case 44:
        r5 = r0.fibre100;
        r11 = null;
        r6 = r5 != r11;
        r5 = 0;
        if(!r6) { _fun18349_ip = 78; continue _fun18349 }
case 61:
        r0 = r0.fibre100;
        r6 = r0 * r2;
        r0 = 100;
        r5 = r6 / r0;
case 78:
        r8 = r10.totCarbo;
        r7 = r10.totProt;
        r6 = r10.totGrassi;
        r0 = r4.kcal;
        if(!(r0 == r11)) { _fun18349_ip = 144; continue _fun18349 }
case 105:
        r0 = 4;
        r13 = r8 * r0;
        r12 = r7 * r0;
        r0 = 9;
        r9 = r6 * r0;
        r0 = 2;
        r0 = r5 * r0;
        r0 = r13 + r0;
        r0 = r0 + r12;
        r9 = r0 + r9;
        _fun18349_ip = 149; continue _fun18349;
case 144:
        r9 = r4.kcal;
case 149:
        r0 = {};
        r12 = r4.nome;
        r0['nome'] = r12;
        r12 = r4.nome_en;
        r0['nome_en'] = r12;
        r12 = r4.nome_es;
        r0['nome_es'] = r12;
        r12 = r4.nome_de;
        r0['nome_de'] = r12;
        r12 = r4.nome_fr;
        r0['nome_fr'] = r12;
        r12 = r4.fonte;
        r0['fonte'] = r12;
        r12 = r4.fascia;
        if(!(r12 == r11)) { _fun18349_ip = 221; continue _fun18349 }
case 216:
        r12 = r10.fascia;
case 221:
        r0['fascia'] = r12;
        r4 = r4.cg;
        if(!(r4 == r11)) { _fun18349_ip = 241; continue _fun18349 }
case 235:
        r4 = r10.cg;
case 241:
        r0['cg'] = r4;
        r4 = _env_r1_slot6;
        r4 = r4.bind(r3)(r9);
        r0['kcal'] = r4;
        r4 = _env_r1_slot6;
        r4 = r4.bind(r3)(r8);
        r0['carbo'] = r4;
        r4 = _env_r1_slot6;
        r4 = r4.bind(r3)(r7);
        r0['prot'] = r4;
        r4 = _env_r1_slot6;
        r4 = r4.bind(r3)(r6);
        r0['grassi'] = r4;
        r4 = _env_r1_slot6;
        r4 = r4.bind(r3)(r5);
        r0['fibre'] = r4;
        r1 = _env_r1_slot6;
        r1 = r1.bind(r3)(r2);
        r0['grammi'] = r1;
        return r0;
    }
}
function aggiungi(a0) {
    r0 = a0;
    var _closure0_slot0 = r0;
    r3 = _env_r1_slot11;
    r0 = undefined;
    r2 = function(a0) { // Environment: r2
        _fun18920: for(var _fun18920_ip = 0; ; ) switch(_fun18920_ip) {
case 0:
            r0 = new Array(1);
            r7 = a0;
            r6 = 0;
            r8 = r0;
            r2 = arraySpread(r8, r7, r6);
            r1 = {};
            r4 = _closure0_slot0;
            r5 = r4.nome;
            r1['nome'] = r5;
            r4 = r4.porzione_standard_g;
            if(r4) { _fun18920_ip = 45; continue _fun18920 }
case 42:
            r4 = 50;
case 45:
            r1['grammi'] = r4;
            r3 = _closure0_slot0;
            r3 = r3.id;
            r1['catalogo_id'] = r3;
            r0[2] = r1;
            r1 = 1;
            r1 = r2 + r1;
            return r0;
        }
    };
    r2 = r3.bind(r0)(r2);
    r3 = _env_r1_slot13;
    r2 = false;
    r2 = r3.bind(r0)(r2);
    r2 = _env_r1_slot15;
    r1 = '';
    r1 = r2.bind(r0)(r1);
    r2 = _env_r1_slot42;
    r1 = 'soft';
    r1 = r2.bind(r0)(r1);
    return r0;
}

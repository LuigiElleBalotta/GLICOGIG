function cambiaBasePeso(a0) {
    _fun18934: for(var _fun18934_ip = 0; ; ) switch(_fun18934_ip) {
case 0:
        r3 = a0;
        var _closure0_slot0 = r3;
        r0 = _env_r1_slot27;
        if(!(r3 !== r0)) { _fun18934_ip = 58; continue _fun18934 }
case 20:
        r4 = _env_r1_slot11;
        r0 = undefined;
        r2 = function(a0) { // Environment: r2
            r2 = a0;
            r1 = r2.map;
            r0 = function(a0) { // Environment: r0
                _fun18936: for(var _fun18936_ip = 0; ; ) switch(_fun18936_ip) {
case 0:
                    r2 = a0;
                    r0 = r2.catalogo_id;
                    r4 = undefined;
                    r3 = undefined;
                    if(!r0) { _fun18936_ip = 59; continue _fun18936 }
case 16:
                    r0 = _env_r0_slot14;
                    r1 = r0.alimentoById;
                    r0 = r2.catalogo_id;
                    r1 = r1.bind(r4)(r0);
                    r0 = null;
                    r5 = r1 == r0;
                    r0 = undefined;
                    if(r5) { _fun18936_ip = 56; continue _fun18936 }
case 51:
                    r0 = r1.nome;
case 56:
                    r3 = r0;
case 59:
                    if(r3) { _fun18936_ip = 67; continue _fun18936 }
case 62:
                    r3 = r2.nome;
case 67:
                    r1 = _closure0_slot0;
                    r0 = _closure0_slot18;
                    if(r1) { _fun18936_ip = 159; continue _fun18936 }
case 84:
                    r1 = r0.fattoreCrudo;
                    r9 = r1.bind(r4)(r3);
                    r1 = r2;
                    if(!r9) { _fun18936_ip = 157; continue _fun18936 }
case 101:
                    r5 = {};
                    r12 = r5;
                    r11 = r2;
                    r6 = copyDataProperties(r12, r11);
                    r6 = global;
                    r8 = r6.Math;
                    r7 = r8.round;
                    r6 = r2.grammi;
                    if(r6) { _fun18936_ip = 136; continue _fun18936 }
case 134:
                    r6 = 0;
case 136:
                    r6 = r6 * r9;
                    r7 = r7.bind(r8)(r6);
                    r6 = 'grammi';
                    r5[6] = r7;
                    r1 = r5;
case 157:
                    return r1;
case 159:
                    r1 = r0.grammiCrudi;
                    r0 = r2.grammi;
                    if(r0) { _fun18936_ip = 175; continue _fun18936 }
case 173:
                    r0 = 0;
case 175:
                    r3 = r1.bind(r4)(r3, r0);
                    r1 = null;
                    r0 = r2;
                    if(!(r3 != r1)) { _fun18936_ip = 214; continue _fun18936 }
case 190:
                    r1 = {};
                    r12 = r1;
                    r11 = r2;
                    r2 = copyDataProperties(r12, r11);
                    r2 = 'grammi';
                    r1[2] = r3;
                    r0 = r1;
case 214:
                    return r0;
                }
            };
            r0 = r1.bind(r2)(r0);
            return r0;
        };
        r2 = r4.bind(r0)(r2);
        r2 = _env_r1_slot28;
        r2 = r2.bind(r0)(r3);
        r2 = _env_r1_slot18;
        r1 = true;
        r1 = r2.bind(r0)(r1);
        return r0;
case 58:
        r0 = undefined;
        return r0;
    }
}

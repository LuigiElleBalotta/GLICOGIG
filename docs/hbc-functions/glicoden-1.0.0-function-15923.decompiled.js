WARNING:root:pass4: LoadFromEnvironment references unknown register 5
WARNING:root:pass4: LoadFromEnvironment references unknown register 5
function calcolaImpatto(a0) {
    _fun15923: for(var _fun15923_ip = 0; ; ) switch(_fun15923_ip) {
case 0:
        r2 = a0;
        r7 = undefined;
        r14 = undefined;
        r15 = undefined;
        r16 = undefined;
        r17 = undefined;
        r18 = undefined;
        r19 = undefined;
        r4 = 0;
        r6 = 0;
        r3 = 0;
        r1 = new Array(0);
        r13 = r2;
        r10 = r13[Symbol.iterator];
        r13 = r10().next;
        r0 = global;
        r8 = 10;
        r12 = 100;
        r11 = 0.5;
        r9 = null;
case 56:
        r20 = r13().value;
        r21 = r10;
        if(!(r21 !== r7)) { _fun15923_ip = 322; continue _fun15923 }
case 70: // try_start_0
        r14 = r20;
        r21 = r20.catalogo_id;
        r20 = undefined;
        if(!r21) { _fun15923_ip = 108; continue _fun15923 }
case 84:
        r21 = _env_r5_slot0;
        r22 = r21.alimentoById;
        r21 = r14;
        r21 = r21.catalogo_id;
        r20 = r22.bind(r7)(r21);
case 108:
        r15 = r20;
        if(r20) { _fun15923_ip = 116; continue _fun15923 }
case 114: // try_end0
        _fun15923_ip = 56; continue _fun15923;
case 116: // try_start_1
        r20 = r3;
        r3 = r20 + 1;
        r20 = r14;
        r20 = r20.grammi;
        if(!r20) { _fun15923_ip = 145; continue _fun15923 }
case 133:
        r20 = r14;
        r20 = r20.grammi;
        if(!(!(r20 > r4))) { _fun15923_ip = 163; continue _fun15923 }
case 145:
        r21 = r15;
        r21 = r21.porzione_standard_g;
        r20 = r21;
        if(r21) { _fun15923_ip = 161; continue _fun15923 }
case 159:
        r20 = 0;
case 161:
        _fun15923_ip = 171; continue _fun15923;
case 163:
        r21 = r14;
        r20 = r21.grammi;
case 171:
        r16 = r20;
        r21 = r15;
        r20 = r21.ig_medio;
        r17 = r20;
        r18 = r21.carboidrati_disponibili_g;
        if(!(r20 != r9)) { _fun15923_ip = 310; continue _fun15923 }
case 194:
        r20 = r18;
        if(!(r20 != r9)) { _fun15923_ip = 310; continue _fun15923 }
case 201:
        r20 = r16;
        if(!r20) { _fun15923_ip = 310; continue _fun15923 }
case 207:
        r21 = r17;
        r22 = r18;
        r20 = r16;
        r20 = r22 * r20;
        r20 = r20 / r12;
        r20 = r21 * r20;
        r20 = r20 / r12;
        r19 = r20;
        r21 = r6;
        r6 = r21 + r20;
        if(!(r20 >= r11)) { _fun15923_ip = 305; continue _fun15923 }
case 246:
        r22 = r1;
        r21 = r22.push;
        r20 = {};
        r23 = r15;
        r23 = r23.nome;
        r20['nome'] = r23;
        r25 = r0.Math;
        r24 = r25.round;
        r23 = r19;
        r23 = r23 * r8;
        r23 = r24.bind(r25)(r23);
        r23 = r23 / r8;
        r20['cg'] = r23;
        r20 = r21.bind(r22)(r20);
case 305: // try_end1
        _fun15923_ip = 56; continue _fun15923;
case 310:
        _fun15923_ip = 56; continue _fun15923;
case 315: // catch_target0 // catch_target1
        CatchBlockStart(arg_register=9);
        r10.return();
        throw r9;
case 322:
        r10 = r0.Math;
        r9 = r10.round;
        r0 = r6;
        r0 = r0 * r8;
        r0 = r9.bind(r10)(r0);
        r6 = r0 / r8;
        r9 = r1;
        r8 = r9.sort;
        r0 = function(a0, a1) { // Environment: r0
            r0 = a1;
            r1 = r0.cg;
            r0 = a0;
            r0 = r0.cg;
            r0 = r1 - r0;
            return r0;
        };
        r0 = r8.bind(r9)(r0);
        r0 = r2.length;
        r4 = 0;
        if(!r0) { _fun15923_ip = 392; continue _fun15923 }
case 380:
        r8 = r3;
        r0 = r2.length;
        r4 = r8 / r0;
case 392:
        r0 = {};
        r0['cg'] = r6;
        r5 = _env_r5_slot1;
        r5 = r5.bind(r7)(r6);
        r0['fascia'] = r5;
        r0['trovati'] = r3;
        r2 = r2.length;
        r0['totali'] = r2;
        r2 = 'bassa';
        r3 = 0.6;
        if(!(r4 >= r3)) { _fun15923_ip = 449; continue _fun15923 }
case 445:
        r2 = 'media';
case 449:
        r0['affidabilita'] = r2;
        r0['contributi'] = r1;
        return r0;
    }
}
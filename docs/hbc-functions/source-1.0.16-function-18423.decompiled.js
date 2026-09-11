function calcolaImpatto(a0, a1) {
    _fun18423: for(var _fun18423_ip = 0; ; ) switch(_fun18423_ip) {
case 0:
        r4 = a0;
        r16 = undefined;
        r26 = undefined;
        r27 = undefined;
        r28 = undefined;
        r29 = undefined;
        r30 = undefined;
        r31 = undefined;
        r32 = undefined;
        r6 = 0;
        r15 = 0;
        r14 = 0;
        r13 = 0;
        r12 = 0;
        r9 = 0;
        r24 = 0;
        var _closure0_slot0 = r6;
        r19 = null;
        r8 = null;
        r25 = 0;
        r18 = null;
        r5 = 0;
        r2 = false;
        r3 = new Array(0);
        r23 = r4;
        r21 = r23[Symbol.iterator];
        r23 = r21().next;
        r11 = global;
        r10 = 10;
        r22 = 0.5;
        r1 = 100;
case 82:
        r34 = r23().value;
        r33 = r21;
        if(!(r33 !== r16)) { _fun18423_ip = 655; continue _fun18423 }
case 96: // try_start_0
        r26 = r34;
        r35 = r34.catalogo_id;
        r34 = undefined;
        if(!r35) { _fun18423_ip = 134; continue _fun18423 }
case 110:
        r35 = _env_r0_slot0;
        r36 = r35.alimentoById;
        r35 = r26;
        r35 = r35.catalogo_id;
        r34 = r36.bind(r16)(r35);
case 134:
        r33 = r34;
        if(r34) { _fun18423_ip = 157; continue _fun18423 }
case 140:
        r35 = _env_r0_slot7;
        r34 = r26;
        r34 = r34.nome;
        r33 = r35.bind(r16)(r34);
case 157:
        r27 = r33;
        if(r33) { _fun18423_ip = 165; continue _fun18423 }
case 163: // try_end0
        _fun18423_ip = 82; continue _fun18423;
case 165: // try_start_1
        r33 = r5;
        r5 = r33 + 1;
        r33 = _env_r0_slot2;
        r34 = r33.pesatoCotto;
        r33 = r27;
        r33 = r33.nome;
        r33 = r34.bind(r16)(r33);
        if(r33) { _fun18423_ip = 223; continue _fun18423 }
case 197:
        r33 = _env_r0_slot2;
        r34 = r33.pesatoCotto;
        r33 = r26;
        r33 = r33.nome;
        r33 = r34.bind(r16)(r33);
        if(!r33) { _fun18423_ip = 225; continue _fun18423 }
case 223:
        r2 = true;
case 225:
        r33 = r26;
        r33 = r33.grammi;
        if(!r33) { _fun18423_ip = 248; continue _fun18423 }
case 236:
        r33 = r26;
        r33 = r33.grammi;
        if(!(!(r33 > r6))) { _fun18423_ip = 269; continue _fun18423 }
case 248:
        r34 = r27;
        r34 = r34.porzione_standard_g;
        r33 = r34;
        if(r34) { _fun18423_ip = 264; continue _fun18423 }
case 262:
        r33 = 0;
case 264:
        r34 = r33;
        _fun18423_ip = 277; continue _fun18423;
case 269:
        r33 = r26;
        r34 = r33.grammi;
case 277:
        r28 = r34;
        r33 = r24;
        r33 = r33 + r34;
        r24 = r33;
        _closure0_slot0 = r33;
        r33 = r27;
        r33 = r33.fibre_g;
        if(!(r33 != r19)) { _fun18423_ip = 332; continue _fun18423 }
case 306:
        r34 = r13;
        r33 = r27;
        r35 = r33.fibre_g;
        r33 = r28;
        r33 = r35 * r33;
        r33 = r33 / r1;
        r13 = r34 + r33;
case 332:
        r33 = r27;
        r33 = r33.proteine_g;
        if(!(r33 != r19)) { _fun18423_ip = 370; continue _fun18423 }
case 344:
        r34 = r12;
        r33 = r27;
        r35 = r33.proteine_g;
        r33 = r28;
        r33 = r35 * r33;
        r33 = r33 / r1;
        r12 = r34 + r33;
case 370:
        r33 = r27;
        r33 = r33.grassi_totali_g;
        if(!(r33 != r19)) { _fun18423_ip = 408; continue _fun18423 }
case 382:
        r34 = r9;
        r33 = r27;
        r35 = r33.grassi_totali_g;
        r33 = r28;
        r33 = r35 * r33;
        r33 = r33 / r1;
        r9 = r34 + r33;
case 408:
        r33 = r27;
        r33 = r33.carboidrati_disponibili_g;
        r29 = r33;
        if(!(r33 != r19)) { _fun18423_ip = 450; continue _fun18423 }
case 423:
        r33 = r28;
        if(!r33) { _fun18423_ip = 450; continue _fun18423 }
case 429:
        r34 = r14;
        r35 = r29;
        r33 = r28;
        r33 = r35 * r33;
        r33 = r33 / r1;
        r14 = r34 + r33;
case 450:
        r33 = r27;
        r33 = r33.ig_medio;
        r30 = r33;
        if(!(r33 != r19)) { _fun18423_ip = 643; continue _fun18423 }
case 468:
        r33 = r29;
        if(!(r33 != r19)) { _fun18423_ip = 643; continue _fun18423 }
case 478:
        r33 = r28;
        if(!r33) { _fun18423_ip = 643; continue _fun18423 }
case 487:
        r33 = _env_r0_slot2;
        r36 = r33.aggiustaIGperPreparazione;
        r35 = r30;
        r33 = r26;
        r34 = r33.cottura;
        r33 = r33.nome;
        r34 = r36.bind(r16)(r35, r34, r33);
        r31 = r34;
        r35 = r29;
        r33 = r28;
        r33 = r35 * r33;
        r33 = r33 / r1;
        r33 = r34 * r33;
        r34 = r33 / r1;
        r32 = r34;
        r33 = r15;
        r15 = r33 + r34;
        r33 = r25;
        if(!(r34 > r33)) { _fun18423_ip = 572; continue _fun18423 }
case 563:
        r25 = r32;
        r8 = r31;
        r18 = r27;
case 572:
        r33 = r32;
        if(!(r33 >= r22)) { _fun18423_ip = 638; continue _fun18423 }
case 579:
        r35 = r3;
        r34 = r35.push;
        r33 = {};
        r36 = r27;
        r36 = r36.nome;
        r33['nome'] = r36;
        r38 = r11.Math;
        r37 = r38.round;
        r36 = r32;
        r36 = r36 * r10;
        r36 = r37.bind(r38)(r36);
        r36 = r36 / r10;
        r33['cg'] = r36;
        r33 = r34.bind(r35)(r33);
case 638: // try_end1
        _fun18423_ip = 82; continue _fun18423;
case 643:
        _fun18423_ip = 82; continue _fun18423;
case 648: // catch_target0 // catch_target1
        CatchBlockStart(arg_register=1);
        r21.return();
        throw r1;
case 655:
        r22 = r11.Math;
        r21 = r22.round;
        r1 = r15;
        r1 = r1 * r10;
        r1 = r21.bind(r22)(r1);
        r15 = r1 / r10;
        r22 = r11.Math;
        r21 = r22.round;
        r1 = r14;
        r14 = r21.bind(r22)(r1);
        r22 = r3;
        r21 = r22.sort;
        r1 = function(a0, a1) { // Environment: r7
            r0 = a1;
            r1 = r0.cg;
            r0 = a0;
            r0 = r0.cg;
            r0 = r1 - r0;
            return r0;
        };
        r1 = r21.bind(r22)(r1);
        r1 = _env_r0_slot9;
        r22 = r1.bind(r16)(r4);
        r21 = _env_r0_slot10;
        r1 = a1;
        r21 = r21.bind(r16)(r1, r22);
        r1 = false;
        if(!r21) { _fun18423_ip = 823; continue _fun18423 }
case 747:
        r23 = r21.carbo;
        r22 = r14;
        r22 = r23 > r22;
        r1 = false;
        if(!r22) { _fun18423_ip = 823; continue _fun18423 }
case 765:
        r22 = r14;
        if(!(!(r22 < r10))) { _fun18423_ip = 804; continue _fun18423 }
case 772:
        r23 = r21.carbo;
        r24 = r14;
        r22 = 1.9;
        r22 = r24 * r22;
        r22 = r23 <= r22;
        r1 = false;
        if(!r22) { _fun18423_ip = 823; continue _fun18423 }
case 804:
        r14 = r21.carbo;
        r15 = r21.cg;
        r8 = r21.ig;
        r1 = true;
case 823:
        r20 = r4.length;
        r6 = 0;
        if(!r20) { _fun18423_ip = 845; continue _fun18423 }
case 833:
        r21 = r5;
        r20 = r4.length;
        r6 = r21 / r20;
case 845:
        r21 = function(a0) { // Original name: per100, environment: r7
            _fun18425: for(var _fun18425_ip = 0; ; ) switch(_fun18425_ip) {
case 0:
                r2 = _closure0_slot0;
                r0 = 0;
                r2 = r2 > r0;
                r0 = null;
                if(!r2) { _fun18425_ip = 36; continue _fun18425 }
case 18:
                r3 = a0;
                r2 = 100;
                r2 = r3 * r2;
                r1 = _closure0_slot0;
                r0 = r2 / r1;
case 36:
                return r0;
            }
        };
        r7 = r18;
        r17 = false;
        if(!r7) { _fun18423_ip = 881; continue _fun18423 }
case 858:
        r22 = _env_r0_slot8;
        r7 = r18;
        r20 = r7.nome;
        r7 = r7.categoria;
        r17 = r22.bind(r16)(r20, r7);
case 881:
        r0 = _env_r0_slot2;
        r7 = r0.classificaFascia;
        r0 = {};
        r20 = r15;
        r0['cg'] = r20;
        r20 = r14;
        r0['carbo'] = r20;
        r20 = r8;
        r0['ig'] = r20;
        r23 = r13;
        r0['fibre'] = r23;
        r22 = r12;
        r0['proteine'] = r22;
        r20 = r9;
        r0['grassi'] = r20;
        r23 = r21.bind(r16)(r23);
        r0['fibre100'] = r23;
        r22 = r21.bind(r16)(r22);
        r0['proteine100'] = r22;
        r20 = r21.bind(r16)(r20);
        r0['grassi100'] = r20;
        r21 = r18;
        r22 = r21 == r19;
        r20 = undefined;
        if(r22) { _fun18423_ip = 987; continue _fun18423 }
case 982:
        r20 = r21.zuccheri_g;
case 987:
        if(!(r20 == r19)) { _fun18423_ip = 993; continue _fun18423 }
case 991:
        r20 = null;
case 993:
        r0['zuccheri100'] = r20;
        r20 = r18;
        r21 = r20 == r19;
        r18 = undefined;
        if(r21) { _fun18423_ip = 1015; continue _fun18423 }
case 1010:
        r18 = r20.carboidrati_disponibili_g;
case 1015:
        if(!(r18 == r19)) { _fun18423_ip = 1021; continue _fun18423 }
case 1019:
        r18 = null;
case 1021:
        r0['carbo100'] = r18;
        r0['liquido'] = r17;
        r0 = r7.bind(r16)(r0);
        r7 = r0.fascia;
        r0 = {};
        r0['cg'] = r15;
        r0['carbo'] = r14;
        r15 = r11.Math;
        r14 = r15.round;
        r13 = r13 * r10;
        r13 = r14.bind(r15)(r13);
        r13 = r13 / r10;
        r0['fibre'] = r13;
        r14 = r11.Math;
        r13 = r14.round;
        r12 = r12 * r10;
        r12 = r13.bind(r14)(r12);
        r12 = r12 / r10;
        r0['prot'] = r12;
        r12 = r11.Math;
        r11 = r12.round;
        r9 = r9 * r10;
        r9 = r11.bind(r12)(r9);
        r9 = r9 / r10;
        r0['grassi'] = r9;
        r0['ig'] = r8;
        r0['fascia'] = r7;
        r0['trovati'] = r5;
        r4 = r4.length;
        r0['totali'] = r4;
        r4 = 'bassa';
        r5 = 0.6;
        if(!(r6 >= r5)) { _fun18423_ip = 1185; continue _fun18423 }
case 1181:
        r4 = 'media';
case 1185:
        r0['affidabilita'] = r4;
        r0['contributi'] = r3;
        r0['cotto'] = r2;
        r0['pianoIntero'] = r1;
        return r0;
    }
}
function metodoRicetta(a0) {
    _fun18395: for(var _fun18395_ip = 0; ; ) switch(_fun18395_ip) {
case 0:
        r12 = a0;
        r5 = undefined;
        r2 = undefined;
        r1 = undefined;
        r16 = undefined;
        r13 = undefined;
        r10 = undefined;
        r4 = undefined;
        r17 = undefined;
        r18 = undefined;
        r19 = undefined;
        r20 = undefined;
        r21 = undefined;
        r3 = arguments.length;
        r0 = 1;
        r3 = r3 > r0;
        r6 = r0;
        if(!r3) { _fun18395_ip = 58; continue _fun18395 }
case 43:
        r3 = arguments[r0];
        r6 = r0;
        if(!(r3 !== r5)) { _fun18395_ip = 58; continue _fun18395 }
case 54:
        r6 = arguments[r0];
case 58:
        r11 = r12.per_porzione;
        if(r11) { _fun18395_ip = 68; continue _fun18395 }
case 66:
        r11 = {};
case 68:
        r15 = null;
        r1 = null;
        r9 = 0;
        r16 = 0;
        r13 = 0;
        r2 = '';
        r10 = r2;
        r4 = 0;
        r3 = r12.ingredienti;
        if(r3) { _fun18395_ip = 99; continue _fun18395 }
case 95:
        r3 = new Array(0);
case 99:
        r14 = r3;
        r8 = r14[Symbol.iterator];
        r14 = r8().next;
        r7 = 100;
case 111:
        r23 = r14().value;
        r22 = r8;
        if(!(r22 !== r5)) { _fun18395_ip = 301; continue _fun18395 }
case 125: // try_start_0
        r17 = r23;
        r22 = _env_r3_slot0;
        r24 = r22.alimentoById;
        r22 = r23.id;
        r18 = r24.bind(r5)(r22);
        r23 = r23.grammi_porzione;
        r22 = r23;
        if(!(r23 == r15)) { _fun18395_ip = 162; continue _fun18395 }
case 160:
        r22 = 0;
case 162:
        r19 = r22;
        r22 = r18;
        if(!r22) { _fun18395_ip = 289; continue _fun18395 }
case 171:
        r22 = r18;
        r22 = r22.carboidrati_disponibili_g;
        if(!(r22 != r15)) { _fun18395_ip = 289; continue _fun18395 }
case 183:
        r22 = r19;
        if(!r22) { _fun18395_ip = 289; continue _fun18395 }
case 189:
        r22 = r18;
        r23 = r22.carboidrati_disponibili_g;
        r22 = r19;
        r22 = r23 * r22;
        r23 = r22 / r7;
        r20 = r23;
        r22 = r4;
        if(!(r23 > r22)) { _fun18395_ip = 232; continue _fun18395 }
case 218:
        r4 = r20;
        r13 = r19;
        r22 = r17;
        r10 = r22.nome;
case 232:
        r22 = r18;
        r22 = r22.ig_medio;
        if(!(r22 != r15)) { _fun18395_ip = 284; continue _fun18395 }
case 244:
        r22 = r18;
        r23 = r22.ig_medio;
        r22 = r20;
        r22 = r23 * r22;
        r23 = r22 / r7;
        r21 = r23;
        r22 = r16;
        if(!(r23 > r22)) { _fun18395_ip = 284; continue _fun18395 }
case 273:
        r16 = r21;
        r22 = r18;
        r1 = r22.ig_medio;
case 284: // try_end0
        _fun18395_ip = 111; continue _fun18395;
case 289:
        _fun18395_ip = 111; continue _fun18395;
case 294: // catch_target0
        CatchBlockStart(arg_register=7);
        r8.return();
        throw r7;
case 301:
        r8 = r4;
        r7 = null;
        if(!(r8 > r9)) { _fun18395_ip = 332; continue _fun18395 }
case 310:
        r8 = _env_r3_slot1;
        r16 = r8.grammiCrudi;
        r14 = r10;
        r8 = r13;
        r7 = r16.bind(r5)(r14, r8);
case 332:
        r8 = r7;
        if(!(r8 == r15)) { _fun18395_ip = 342; continue _fun18395 }
case 339:
        r8 = r13;
case 342:
        r8 = r8 * r6;
        r14 = undefined;
        if(!(r4 > r9)) { _fun18395_ip = 392; continue _fun18395 }
case 352:
        r4 = {};
        r4['grammi'] = r8;
        if(!(r7 == r15)) { _fun18395_ip = 367; continue _fun18395 }
case 362:
        r7 = r10;
        _fun18395_ip = 385; continue _fun18395;
case 367:
        r8 = _env_r3_slot1;
        r13 = r8.nomeSenzaCottura;
        r8 = r10;
        r7 = r13.bind(r5)(r8);
case 385:
        r4['nome'] = r7;
        r14 = r4;
case 392:
        r4 = r11.carboidrati_disponibili_g;
        if(!(r4 == r15)) { _fun18395_ip = 408; continue _fun18395 }
case 401:
        r13 = r11.carboidrati_disponibili_g;
        _fun18395_ip = 417; continue _fun18395;
case 408:
        r4 = r11.carboidrati_disponibili_g;
        r13 = r4 * r6;
case 417:
        r4 = r11.carico_glicemico;
        if(!(r4 == r15)) { _fun18395_ip = 428; continue _fun18395 }
case 426:
        r4 = 0;
case 428:
        r7 = r4 * r6;
        if(!(r6 !== r0)) { _fun18395_ip = 573; continue _fun18395 }
case 439:
        r0 = _env_r3_slot2;
        r4 = r0.classificaFascia;
        r0 = {};
        r0['cg'] = r7;
        r7 = r13;
        if(!(r7 == r15)) { _fun18395_ip = 465; continue _fun18395 }
case 463:
        r7 = null;
case 465:
        r0['carbo'] = r7;
        r7 = r1;
        r0['ig'] = r7;
        r7 = r11.fibre_g;
        r8 = r7 != r15;
        r7 = null;
        if(!r8) { _fun18395_ip = 500; continue _fun18395 }
case 491:
        r8 = r11.fibre_g;
        r7 = r8 * r6;
case 500:
        r0['fibre'] = r7;
        r7 = r11.proteine_g;
        r8 = r7 != r15;
        r7 = null;
        if(!r8) { _fun18395_ip = 528; continue _fun18395 }
case 519:
        r8 = r11.proteine_g;
        r7 = r8 * r6;
case 528:
        r0['proteine'] = r7;
        r7 = r11.grassi_g;
        r8 = r7 != r15;
        r7 = null;
        if(!r8) { _fun18395_ip = 556; continue _fun18395 }
case 547:
        r8 = r11.grassi_g;
        r7 = r8 * r6;
case 556:
        r0['grassi'] = r7;
        r0 = r4.bind(r5)(r0);
        r8 = r0.fascia;
        _fun18395_ip = 578; continue _fun18395;
case 573:
        r8 = r11.fascia;
case 578:
        r4 = _env_r3_slot8;
        r0 = r11.grassi_g;
        if(!(r0 == r15)) { _fun18395_ip = 593; continue _fun18395 }
case 591:
        r0 = 0;
case 593:
        r0 = r0 * r6;
        r7 = r4.bind(r5)(r13, r0);
        r4 = _env_r3_slot9;
        r0 = r11.proteine_g;
        if(!(r0 == r15)) { _fun18395_ip = 618; continue _fun18395 }
case 616:
        r0 = 0;
case 618:
        r0 = r0 * r6;
        r4 = r4.bind(r5)(r0);
        r0 = {};
        r9 = {};
        r6 = 'quantita';
        r9['chiave'] = r6;
        r15 = _env_r3_slot5;
        r6 = 'dim.quantita';
        r6 = r15.bind(r5)(r6);
        r9['titolo'] = r6;
        r6 = _env_r3_slot12;
        r6 = r6.bind(r5)(r13, r14);
        r9['valore'] = r6;
        r6 = new Array(4);
        r6[0] = r9;
        r9 = {};
        r13 = 'velocita';
        r9['chiave'] = r13;
        r14 = _env_r3_slot5;
        r13 = 'dim.velocita';
        r13 = r14.bind(r5)(r13);
        r9['titolo'] = r13;
        r14 = _env_r3_slot13;
        r13 = r1;
        r13 = r14.bind(r5)(r13);
        r9['valore'] = r13;
        r6[1] = r9;
        r9 = {};
        r13 = 'equilibrio';
        r9['chiave'] = r13;
        r14 = _env_r3_slot5;
        r13 = 'dim.equilibrio';
        r13 = r14.bind(r5)(r13);
        r9['titolo'] = r13;
        r15 = _env_r3_slot14;
        r29 = r11.fibre_g;
        r28 = r11.proteine_g;
        r27 = r11.grassi_g;
        r30 = undefined;
        r26 = r7;
        r25 = r4;
        r11 = r30[r15](r29, r28, r27, r26, r25, r24);
        r9['valore'] = r11;
        r6[2] = r9;
        r9 = {};
        r11 = 'preparazione';
        r9['chiave'] = r11;
        r13 = _env_r3_slot5;
        r11 = 'dim.preparazione';
        r11 = r13.bind(r5)(r11);
        r9['titolo'] = r11;
        r11 = _env_r3_slot15;
        if(r10) { _fun18395_ip = 837; continue _fun18395 }
case 832:
        r10 = r12.nome;
case 837:
        r10 = r11.bind(r5)(r10);
        r9['valore'] = r10;
        r6[3] = r9;
        r0['dims'] = r6;
        r6 = _env_r3_slot11;
        r6 = r6.bind(r5)(r1, r8);
        r1 = r2;
        if(!r7) { _fun18395_ip = 896; continue _fun18395 }
case 872:
        r7 = 'trascurabile';
        r1 = r2;
        if(!(r8 !== r7)) { _fun18395_ip = 896; continue _fun18395 }
case 883:
        r8 = _env_r3_slot5;
        r7 = 'notaDoppiaOnda';
        r1 = r8.bind(r5)(r7);
case 896:
        r1 = r6 + r1;
        if(!r4) { _fun18395_ip = 916; continue _fun18395 }
case 903:
        r4 = _env_r3_slot5;
        r3 = 'notaGluco';
        r2 = r4.bind(r5)(r3);
case 916:
        r1 = r1 + r2;
        r0['sintesi'] = r1;
        return r0;
    }
}

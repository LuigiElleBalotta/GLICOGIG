function reportSettimana(a0) {
    _fun18479: for(var _fun18479_ip = 0; ; ) switch(_fun18479_ip) {
case 0:
        r15 = a0;
        r2 = _env_r1_slot1;
        r4 = r2.vociUltimiGiorni;
        r3 = undefined;
        r2 = 7;
        r2 = r4.bind(r3)(r2);
        var _closure0_slot0 = r2;
        r4 = _env_r1_slot1;
        r4 = r4.totali;
        r4 = r4.bind(r3)(r2);
        r5 = global;
        r8 = r5.Set;
        r7 = r2.map;
        r6 = function(a0) { // Environment: r0
            r0 = a0;
            r0 = r0.giorno;
            return r0;
        };
        r18 = r7.bind(r2)(r6);
        r7 = r8.prototype;
        r7 = Object.create(r7, {constructor: {value: r8}});
        r19 = r7;
        r6 = new r19[r8](r18, r17);
        r6 = r6 instanceof Object ? r6 : r7;
        r12 = r6.size;
        r8 = r5.Math;
        r7 = r8.max;
        r6 = 1;
        r7 = r7.bind(r8)(r12, r6);
        r8 = _env_r1_slot6;
        r6 = r4.kcal;
        r6 = r6 / r7;
        r11 = r8.bind(r3)(r6);
        r10 = {};
        r8 = _env_r1_slot6;
        r6 = r4.prot;
        r6 = r6 / r7;
        r6 = r8.bind(r3)(r6);
        r10['prot'] = r6;
        r8 = _env_r1_slot6;
        r6 = r4.carbo;
        r6 = r6 / r7;
        r6 = r8.bind(r3)(r6);
        r10['carbo'] = r6;
        r8 = _env_r1_slot6;
        r6 = r4.grassi;
        r6 = r6 / r7;
        r6 = r8.bind(r3)(r6);
        r10['grassi'] = r6;
        r6 = _env_r1_slot6;
        r4 = r4.fibre;
        r4 = r4 / r7;
        r4 = r6.bind(r3)(r4);
        r10['fibre'] = r4;
        r7 = new Array(0);
        var _closure0_slot1 = r7;
        r8 = function() { // Original name: _loop2, environment: r0
            r0 = _env_r4_slot1;
            r3 = r0.giornoLocale;
            r0 = global;
            r2 = r0.Date;
            r0 = r2.now;
            r2 = r0.bind(r2)();
            r6 = _closure0_slot2;
            r0 = 86400000;
            r0 = r6 * r0;
            r2 = r2 - r0;
            r0 = undefined;
            r2 = r3.bind(r0)(r2);
            var _closure1_slot0 = r2;
            r3 = _closure0_slot1;
            r2 = r3.push;
            r4 = _env_r4_slot6;
            r7 = _closure0_slot0;
            r6 = r7.filter;
            r5 = function(a0) { // Environment: r1
                r0 = a0;
                r1 = r0.giorno;
                r0 = _closure1_slot0;
                r0 = r1 === r0;
                return r0;
            };
            r7 = r6.bind(r7)(r5);
            r6 = r7.reduce;
            r5 = function(a0, a1) { // Environment: r1
                r0 = a1;
                r1 = r0.cg;
                r0 = a0;
                r0 = r0 + r1;
                return r0;
            };
            r1 = 0;
            r1 = r6.bind(r7)(r5, r1);
            r1 = r4.bind(r0)(r1);
            r1 = r2.bind(r3)(r1);
            return r0;
        };
        r4 = 6;
        var _closure0_slot2 = r4;
        r6 = 0;
case 253:
        r9 = r8.bind(r3)();
        r9 = r4 - 1;
        _closure0_slot2 = r9;
        r4 = r9;
        if(r4 >= r6) { _fun18479_ip = 253; continue _fun18479 }
case 271:
        r4 = _env_r1_slot1;
        r4 = r4.vociTutte;
        r8 = r4.bind(r3)();
        r4 = _env_r1_slot1;
        r9 = r4.giornoLocale;
        r13 = r5.Date;
        r4 = r13.now;
        r13 = r4.bind(r13)();
        r4 = 1123200000;
        r4 = r13 - r4;
        r4 = r9.bind(r3)(r4);
        var _closure0_slot3 = r4;
        r4 = _env_r1_slot1;
        r9 = r4.giornoLocale;
        r13 = r5.Date;
        r4 = r13.now;
        r13 = r4.bind(r13)();
        r4 = 518400000;
        r4 = r13 - r4;
        r4 = r9.bind(r3)(r4);
        var _closure0_slot4 = r4;
        r4 = r8.filter;
        r0 = function(a0) { // Environment: r0
            _fun18484: for(var _fun18484_ip = 0; ; ) switch(_fun18484_ip) {
case 0:
                r2 = a0;
                r3 = r2.giorno;
                r0 = _closure0_slot3;
                r0 = r3 >= r0;
                if(!r0) { _fun18484_ip = 37; continue _fun18484 }
case 23:
                r2 = r2.giorno;
                r1 = _closure0_slot4;
                r0 = r2 < r1;
case 37:
                return r0;
            }
        };
        r8 = r4.bind(r8)(r0);
        r0 = r8.length;
        r4 = 2;
        r0 = r0 >= r4;
        r9 = null;
        if(!r0) { _fun18479_ip = 479; continue _fun18479 }
case 407:
        r0 = r2.length;
        r0 = r0 >= r4;
        r9 = null;
        if(!r0) { _fun18479_ip = 479; continue _fun18479 }
case 421:
        r0 = _env_r1_slot12;
        r8 = r0.bind(r3)(r8);
        r0 = _env_r1_slot12;
        r0 = r0.bind(r3)(r2);
        r6 = r8 > r6;
        r9 = null;
        if(!r6) { _fun18479_ip = 479; continue _fun18479 }
case 448:
        r6 = r5.Math;
        r5 = r6.round;
        r0 = r0 - r8;
        r8 = r0 / r8;
        r0 = 100;
        r0 = r8 * r0;
        r9 = r5.bind(r6)(r0);
case 479:
        r0 = _env_r1_slot13;
        r8 = r0.bind(r3)(r2);
        r0 = _env_r1_slot14;
        r6 = r0.bind(r3)(r15, r2, r4);
        r4 = r10.prot;
        r0 = 60;
        r14 = r4 < r0;
        r0 = _env_r1_slot4;
        r5 = r0.i18n;
        r4 = r5.t;
        r0 = 'dimagrire';
        if(!(r15 !== r0)) { _fun18479_ip = 563; continue _fun18479 }
case 535:
        r0 = 'diario.macroMantieni';
        r13 = 'massa';
        if(!(r15 === r13)) { _fun18479_ip = 561; continue _fun18479 }
case 547:
        r13 = 'diario.macroMassaOk';
        if(!r14) { _fun18479_ip = 558; continue _fun18479 }
case 554:
        r13 = 'diario.macroMassaProt';
case 558:
        r0 = r13;
case 561:
        _fun18479_ip = 577; continue _fun18479;
case 563:
        r13 = 'diario.macroDimagrireOk';
        if(!r14) { _fun18479_ip = 574; continue _fun18479 }
case 570:
        r13 = 'diario.macroDimagrireProt';
case 574:
        r0 = r13;
case 577:
        r5 = r4.bind(r5)(r0);
        r0 = _env_r1_slot4;
        r13 = r0.i18n;
        r4 = r13.t;
        r0 = 'diario.focusOk';
        if(!r8) { _fun18479_ip = 608; continue _fun18479 }
case 604:
        r0 = 'diario.focusDifficile';
case 608:
        r4 = r4.bind(r13)(r0);
        r0 = {};
        r13 = r2.length;
        r0['nPasti'] = r13;
        r0['giorniAttivi'] = r12;
        r0['kcalGiorno'] = r11;
        r0['macros'] = r10;
        r0['trend'] = r9;
        r0['difficile'] = r8;
        r0['perGiorno'] = r7;
        r0['facili'] = r6;
        r0['macroAdvice'] = r5;
        r0['focus'] = r4;
        r1 = _env_r1_slot22;
        r1 = r1.bind(r3)(r2);
        r0['verdetto'] = r1;
        return r0;
    }
}

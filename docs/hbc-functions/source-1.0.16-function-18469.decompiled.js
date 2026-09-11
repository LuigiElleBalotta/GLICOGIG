function datiCardProgressi() {
    _fun18469: for(var _fun18469_ip = 0; ; ) switch(_fun18469_ip) {
case 0:
        r11 = undefined;
        r4 = undefined;
        r1 = undefined;
        r16 = undefined;
        r3 = _env_r2_slot15;
        r12 = r3.bind(r11)();
        r6 = new Array(0);
        r5 = 0;
        r25 = r6;
        r24 = r12;
        r23 = 0;
        r3 = arraySpread(r25, r24, r23);
        r3 = r6.reverse;
        r7 = r3.bind(r6)();
        r6 = r7.map;
        r3 = function(a0) { // Environment: r0
            _fun18470: for(var _fun18470_ip = 0; ; ) switch(_fun18470_ip) {
case 0:
                r2 = a0;
                r0 = {};
                r4 = _env_r3_slot10;
                r1 = r2.dow;
                r1 = r4[r1];
                r4 = null;
                if(!(r1 == r4)) { _fun18470_ip = 32; continue _fun18470 }
case 28:
                r1 = '?';
case 32:
                r0['lettera'] = r1;
                r1 = r2.voci;
                r5 = r1.length;
                r1 = 'vuoto';
                r4 = 0;
                if(!(r5 !== r4)) { _fun18470_ip = 88; continue _fun18470 }
case 58:
                r4 = _env_r3_slot11;
                r3 = r2.fascia;
                r2 = undefined;
                r3 = r4.bind(r2)(r3);
                r2 = 'ambra';
                if(!r3) { _fun18470_ip = 85; continue _fun18470 }
case 81:
                r2 = 'verde';
case 85:
                r1 = r2;
case 88:
                r0['stato'] = r1;
                return r0;
            }
        };
        r10 = r6.bind(r7)(r3);
        r6 = r7.filter;
        r3 = function(a0) { // Environment: r0
            _fun18471: for(var _fun18471_ip = 0; ; ) switch(_fun18471_ip) {
case 0:
                r1 = a0;
                r0 = r1.voci;
                r2 = r0.length;
                r0 = 0;
                r0 = r2 > r0;
                if(!r0) { _fun18471_ip = 42; continue _fun18471 }
case 23:
                r3 = _env_r2_slot11;
                r2 = r1.fascia;
                r1 = undefined;
                r0 = r3.bind(r1)(r2);
case 42:
                return r0;
            }
        };
        r3 = r6.bind(r7)(r3);
        r9 = r3.length;
        r3 = _env_r2_slot1;
        r6 = r3.vociUltimiGiorni;
        r3 = 7;
        r3 = r6.bind(r11)(r3);
        r7 = r3.filter;
        r6 = function(a0) { // Environment: r0
            r2 = _env_r0_slot11;
            r0 = a0;
            r1 = r0.fascia;
            r0 = undefined;
            r0 = r2.bind(r0)(r1);
            return r0;
        };
        r6 = r7.bind(r3)(r6);
        r8 = r6.length;
        r4 = 0;
        r6 = r12;
        r7 = r6[Symbol.iterator];
        r6 = r7().next;
case 130:
        r12 = r6().value;
        r13 = r7;
        if(!(r13 !== r11)) { _fun18469_ip = 176; continue _fun18469 }
case 141: // try_start_0
        r12 = r12.voci;
        r12 = r12.length;
        if(!(!(r12 > r5))) { _fun18469_ip = 161; continue _fun18469 }
case 156: // try_end0
        r7.return();
        _fun18469_ip = 176; continue _fun18469;
case 161: // try_start_1
        r12 = r4;
        r4 = r12 + 1;
case 167: // try_end1
        _fun18469_ip = 130; continue _fun18469;
case 169: // catch_target0 // catch_target1
        CatchBlockStart(arg_register=6);
        r7.return();
        throw r6;
case 176:
        r12 = r4;
        r6 = 2;
        r7 = null;
        if(!(r12 >= r6)) { _fun18469_ip = 218; continue _fun18469 }
case 188:
        r13 = r4;
        r4 = global;
        r4 = r4.HermesInternal;
        r12 = r4.concat;
        r6 = '';
        r4 = ' giorni di fila';
        r7 = r12.bind(r6)(r13, r4);
case 218:
        r12 = global;
        r13 = r12.Set;
        r6 = r3.map;
        r4 = function(a0) { // Environment: r0
            r0 = a0;
            r0 = r0.giorno;
            return r0;
        };
        r25 = r6.bind(r3)(r4);
        r6 = r13.prototype;
        r6 = Object.create(r6, {constructor: {value: r13}});
        r26 = r6;
        r4 = new r26[r13](r25, r24);
        r4 = r4 instanceof Object ? r4 : r6;
        r4 = r4.size;
        r13 = r9 > r5;
        r6 = 'La mia settimana di scelte consapevoli.';
        if(!r13) { _fun18469_ip = 302; continue _fun18469 }
case 277:
        r13 = r12.HermesInternal;
        r15 = r13.concat;
        r14 = '';
        r13 = ' giorni su 7 con scelte consapevoli per la glicemia.';
        r6 = r15.bind(r14)(r9, r13);
case 302:
        r12 = r12.Map;
        r13 = r12.prototype;
        r13 = Object.create(r13, {constructor: {value: r12}});
        r26 = r13;
        r12 = new r26[r12](r25);
        r1 = r12 instanceof Object ? r12 : r13;
        r15 = r3;
        r13 = r15[Symbol.iterator];
        r15 = r13().next;
        r14 = 1;
        r12 = '';
case 341:
        r18 = r15().value;
        r17 = r13;
        if(!(r17 !== r11)) { _fun18469_ip = 433; continue _fun18469 }
case 352: // try_start_2
        r18 = r18.nome;
        r17 = r18;
        if(r18) { _fun18469_ip = 366; continue _fun18469 }
case 363:
        r17 = r12;
case 366:
        r18 = r17;
        r17 = r18.trim;
        r17 = r17.bind(r18)();
        r16 = r17;
        if(!r17) { _fun18469_ip = 424; continue _fun18469 }
case 385:
        r20 = r1;
        r19 = r20.set;
        r18 = r16;
        r21 = r20.get;
        r21 = r21.bind(r20)(r18);
        r17 = r21;
        if(r21) { _fun18469_ip = 414; continue _fun18469 }
case 412:
        r17 = 0;
case 414:
        r17 = r17 + r14;
        r17 = r19.bind(r20)(r18, r17);
case 424: // try_end2
        _fun18469_ip = 341; continue _fun18469;
case 426: // catch_target2
        CatchBlockStart(arg_register=12);
        r13.return();
        throw r12;
case 433:
        r12 = r1;
        r1 = r12.entries;
        r24 = r1.bind(r12)();
        r13 = new Array(0);
        r25 = r13;
        r23 = 0;
        r1 = arraySpread(r25, r24, r23);
        r12 = r13.sort;
        r1 = function(a0, a1) { // Environment: r0
            r0 = a1;
            r2 = 1;
            r1 = r0[r2];
            r0 = a0;
            r0 = r0[r2];
            r0 = r1 - r0;
            return r0;
        };
        r13 = r12.bind(r13)(r1);
        r12 = r13.slice;
        r1 = 6;
        r13 = r12.bind(r13)(r5, r1);
        r12 = r13.map;
        r1 = function(a0) { // Environment: r0
            r0 = _env_r0_slot0;
            r3 = r0.default;
            r2 = undefined;
            r1 = a0;
            r0 = 1;
            r1 = r3.bind(r2)(r1, r0);
            r0 = 0;
            r0 = r1[r0];
            return r0;
        };
        r1 = r12.bind(r13)(r1);
        r2 = _env_r2_slot6;
        r12 = r3.reduce;
        r0 = function(a0, a1) { // Environment: r0
            _fun18476: for(var _fun18476_ip = 0; ; ) switch(_fun18476_ip) {
case 0:
                r0 = a1;
                r1 = r0.kcal;
                if(r1) { _fun18476_ip = 13; continue _fun18476 }
case 11:
                r1 = 0;
case 13:
                r0 = a0;
                r0 = r0 + r1;
                return r0;
            }
        };
        r0 = r12.bind(r3)(r0, r5);
        r2 = r2.bind(r11)(r0);
        r0 = {};
        r0['giorni'] = r10;
        r0['giorniVerdi'] = r9;
        r0['scelteBuone'] = r8;
        r0['streak'] = r7;
        r0['sottotitolo'] = r6;
        r4 = r4 === r5;
        r0['vuoto'] = r4;
        r3 = r3.length;
        r0['nPasti'] = r3;
        r0['kcal'] = r2;
        r0['piattiTop'] = r1;
        return r0;
    }
}

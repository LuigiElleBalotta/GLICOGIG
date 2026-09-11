function classificaFascia(a0) {
    _fun18408: for(var _fun18408_ip = 0; ; ) switch(_fun18408_ip) {
case 0:
        r5 = a0;
        r1 = r5.carbo;
        r6 = null;
        if(!(r1 == r6)) { _fun18408_ip = 19; continue _fun18408 }
case 17:
        r1 = null;
case 19:
        if(!(r1 != r6)) { _fun18408_ip = 37; continue _fun18408 }
case 23:
        r2 = 5;
        r2 = r1 < r2;
        r7 = 'trascurabile';
        if(r2) { _fun18408_ip = 87; continue _fun18408 }
case 37:
        r3 = r5.cg;
        r2 = 10;
        r3 = r3 <= r2;
        r2 = 'basso';
        if(r3) { _fun18408_ip = 84; continue _fun18408 }
case 57:
        r4 = r5.cg;
        r3 = 19;
        r4 = r4 <= r3;
        r3 = 'alto';
        if(!r4) { _fun18408_ip = 81; continue _fun18408 }
case 77:
        r3 = 'medio';
case 81:
        r2 = r3;
case 84:
        r7 = r2;
case 87:
        r3 = r1 != r6;
        r2 = null;
        if(!r3) { _fun18408_ip = 145; continue _fun18408 }
case 96:
        r3 = r5.carbo100;
        r3 = r3 != r6;
        r2 = null;
        if(!r3) { _fun18408_ip = 145; continue _fun18408 }
case 111:
        r4 = r5.carbo100;
        r3 = 0;
        r3 = r4 > r3;
        r2 = null;
        if(!r3) { _fun18408_ip = 145; continue _fun18408 }
case 128:
        r3 = r5.carbo100;
        r4 = r1 / r3;
        r3 = 100;
        r2 = r4 * r3;
case 145:
        var _closure0_slot0 = r2;
        r8 = function(a0, a1) { // Original name: a100, environment: r0
            _fun18409: for(var _fun18409_ip = 0; ; ) switch(_fun18409_ip) {
case 0:
                r0 = a0;
                r4 = a1;
                r3 = null;
                if(!(r0 == r3)) { _fun18409_ip = 55; continue _fun18409 }
case 12:
                if(!(r4 != r3)) { _fun18409_ip = 26; continue _fun18409 }
case 16:
                r1 = _closure0_slot0;
                if(r1) { _fun18409_ip = 37; continue _fun18409 }
case 26:
                r1 = r4;
                if(!(r1 == r3)) { _fun18409_ip = 35; continue _fun18409 }
case 33:
                r1 = 0;
case 35:
                _fun18409_ip = 52; continue _fun18409;
case 37:
                r3 = 100;
                r3 = r4 * r3;
                r2 = _closure0_slot0;
                r1 = r3 / r2;
case 52:
                r0 = r1;
case 55:
                return r0;
            }
        };
        r2 = r5.fibre100;
        r0 = r5.fibre;
        r4 = undefined;
        r2 = r8.bind(r4)(r2, r0);
        r0 = 2;
        r2 = r2 * r0;
        r3 = r5.proteine100;
        r0 = r5.proteine;
        r0 = r8.bind(r4)(r3, r0);
        r2 = r2 + r0;
        r3 = r5.grassi100;
        r0 = r5.grassi;
        r0 = r8.bind(r4)(r3, r0);
        r2 = r2 + r0;
        r0 = 5;
        r3 = r2 < r0;
        r2 = r1 != r6;
        if(!r2) { _fun18408_ip = 243; continue _fun18408 }
case 239:
        r2 = r1 >= r0;
case 243:
        r8 = r5.zuccheri100;
        r0 = r5.carbo100;
        r1 = r8 != r6;
        if(!r1) { _fun18408_ip = 269; continue _fun18408 }
case 262:
        r4 = 8;
        r1 = r8 >= r4;
case 269:
        if(!r1) { _fun18408_ip = 276; continue _fun18408 }
case 272:
        r1 = r0 != r6;
case 276:
        if(!r1) { _fun18408_ip = 285; continue _fun18408 }
case 279:
        r4 = 0;
        r1 = r0 > r4;
case 285:
        if(!r1) { _fun18408_ip = 306; continue _fun18408 }
case 288:
        r4 = r8 / r0;
        r0 = 0.7;
        r1 = r4 >= r0;
case 306:
        if(!r1) { _fun18408_ip = 328; continue _fun18408 }
case 309:
        r4 = r5.fibre100;
        if(!(r4 == r6)) { _fun18408_ip = 321; continue _fun18408 }
case 319:
        r4 = 0;
case 321:
        r0 = 3;
        r1 = r4 < r0;
case 328:
        r0 = r8 != r6;
        if(!r0) { _fun18408_ip = 342; continue _fun18408 }
case 335:
        r4 = 15;
        r0 = r8 >= r4;
case 342:
        if(!r0) { _fun18408_ip = 364; continue _fun18408 }
case 345:
        r8 = r5.fibre100;
        if(!(r8 == r6)) { _fun18408_ip = 357; continue _fun18408 }
case 355:
        r8 = 0;
case 357:
        r4 = 3;
        r0 = r8 < r4;
case 364:
        r4 = r5.ig;
        r4 = r4 != r6;
        if(!r4) { _fun18408_ip = 388; continue _fun18408 }
case 376:
        r8 = r5.ig;
        r6 = 60;
        r4 = r8 >= r6;
case 388:
        if(!r2) { _fun18408_ip = 394; continue _fun18408 }
case 391:
        r2 = r3;
case 394:
        if(!r2) { _fun18408_ip = 409; continue _fun18408 }
case 397:
        r3 = r1;
        if(r3) { _fun18408_ip = 406; continue _fun18408 }
case 403:
        r3 = r4;
case 406:
        r2 = r3;
case 409:
        r3 = r7;
        if(!r2) { _fun18408_ip = 457; continue _fun18408 }
case 415:
        r4 = 'trascurabile';
        if(!(r7 !== r4)) { _fun18408_ip = 434; continue _fun18408 }
case 423:
        r6 = 'basso';
        r4 = r7;
        if(!(r7 === r6)) { _fun18408_ip = 438; continue _fun18408 }
case 434:
        r4 = 'medio';
case 438:
        r5 = r5.liquido;
        if(r5) { _fun18408_ip = 453; continue _fun18408 }
case 447:
        r3 = r4;
        if(!r0) { _fun18408_ip = 457; continue _fun18408 }
case 453:
        r3 = 'alto';
case 457:
        r0 = {};
        r0['fascia'] = r3;
        r0['veloce'] = r2;
        r0['zucchero'] = r1;
        return r0;
    }
}
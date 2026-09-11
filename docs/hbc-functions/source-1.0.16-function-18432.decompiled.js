function piattiPiuFacili(a0, a1) {
    _fun18432: for(var _fun18432_ip = 0; ; ) switch(_fun18432_ip) {
case 0:
        r2 = a0;
        r6 = a1;
        r7 = undefined;
        r4 = undefined;
        r3 = arguments.length;
        r1 = 2;
        r5 = r3 > r1;
        r3 = r1;
        if(!r5) { _fun18432_ip = 43; continue _fun18432 }
case 28:
        r5 = arguments[r1];
        r3 = r1;
        if(!(r5 !== r7)) { _fun18432_ip = 43; continue _fun18432 }
case 39:
        r3 = arguments[r1];
case 43:
        r1 = global;
        r5 = r1.Set;
        r4 = r6.map;
        r1 = function(a0) { // Environment: r0
            _fun18433: for(var _fun18433_ip = 0; ; ) switch(_fun18433_ip) {
case 0:
                r0 = a0;
                r1 = r0.nome;
                if(r1) { _fun18433_ip = 15; continue _fun18433 }
case 11:
                r1 = '';
case 15:
                r0 = r1.toLowerCase;
                r0 = r0.bind(r1)();
                return r0;
            }
        };
        r10 = r4.bind(r6)(r1);
        r4 = r5.prototype;
        r4 = Object.create(r4, {constructor: {value: r5}});
        r11 = r4;
        r1 = new r11[r5](r10, r9);
        r1 = r1 instanceof Object ? r1 : r4;
        var _closure0_slot0 = r1;
        r6 = function(a0) { // Original name: bassoCarico, environment: r0
            _fun18434: for(var _fun18434_ip = 0; ; ) switch(_fun18434_ip) {
case 0:
                r2 = _env_r0_slot5;
                r0 = a0;
                r3 = r0.per_porzione;
                r0 = null;
                r4 = r3 == r0;
                r1 = undefined;
                if(r4) { _fun18434_ip = 31; continue _fun18434 }
case 26:
                r1 = r3.fascia;
case 31:
                r1 = r2[r1];
                if(!(r1 == r0)) { _fun18434_ip = 42; continue _fun18434 }
case 39:
                r1 = 3;
case 42:
                r0 = 1;
                r0 = r1 <= r0;
                return r0;
            }
        };
        var _closure0_slot1 = r6;
        r1 = function(a0) { // Original name: carbi, environment: r0
            _fun18435: for(var _fun18435_ip = 0; ; ) switch(_fun18435_ip) {
case 0:
                r0 = a0;
                r2 = r0.per_porzione;
                r1 = null;
                r3 = r2 == r1;
                r0 = undefined;
                if(r3) { _fun18435_ip = 24; continue _fun18435 }
case 19:
                r0 = r2.carboidrati_disponibili_g;
case 24:
                if(!(r0 == r1)) { _fun18435_ip = 30; continue _fun18435 }
case 28:
                r0 = 0;
case 30:
                return r0;
            }
        };
        var _closure0_slot2 = r1;
        r4 = _env_r1_slot2;
        r7 = r4.RICETTE;
        r5 = r7.filter;
        r4 = function(a0) { // Environment: r0
            _fun18436: for(var _fun18436_ip = 0; ; ) switch(_fun18436_ip) {
case 0:
                r3 = a0;
                r0 = _closure0_slot1;
                r2 = undefined;
                r0 = r0.bind(r2)(r3);
                if(!r0) { _fun18436_ip = 36; continue _fun18436 }
case 20:
                r1 = _closure0_slot2;
                r2 = r1.bind(r2)(r3);
                r1 = 25;
                r0 = r2 >= r1;
case 36:
                return r0;
            }
        };
        r5 = r5.bind(r7)(r4);
        r4 = r5.length;
        if(!(r4 < r3)) { _fun18432_ip = 165; continue _fun18432 }
case 145:
        r1 = _env_r1_slot2;
        r4 = r1.RICETTE;
        r1 = r4.filter;
        r5 = r1.bind(r4)(r6);
case 165:
        r1 = 'dimagrire';
        if(!(r2 !== r1)) { _fun18432_ip = 216; continue _fun18432 }
case 173:
        r1 = 'massa';
        r4 = r5;
        if(!(r2 === r1)) { _fun18432_ip = 246; continue _fun18432 }
case 184:
        r2 = r5.filter;
        r1 = function(a0) { // Environment: r0
            _fun18438: for(var _fun18438_ip = 0; ; ) switch(_fun18438_ip) {
case 0:
                r0 = a0;
                r2 = r0.per_porzione;
                r0 = null;
                r3 = r2 == r0;
                r1 = undefined;
                if(r3) { _fun18438_ip = 24; continue _fun18438 }
case 19:
                r1 = r2.proteine_g;
case 24:
                if(!(r1 == r0)) { _fun18438_ip = 30; continue _fun18438 }
case 28:
                r1 = 0;
case 30:
                r0 = 15;
                r0 = r1 >= r0;
                return r0;
            }
        };
        r1 = r2.bind(r5)(r1);
        r2 = r1.length;
        r4 = r5;
        if(!(r2 >= r3)) { _fun18432_ip = 246; continue _fun18432 }
case 211:
        r4 = r1;
        _fun18432_ip = 246; continue _fun18432;
case 216:
        r2 = r5.filter;
        r1 = function(a0) { // Environment: r0
            r1 = _env_r0_slot3;
            r2 = r1.fasciaCalorica;
            r0 = _env_r0_slot3;
            r3 = r0.kcalRicetta;
            r1 = undefined;
            r0 = a0;
            r0 = r3.bind(r1)(r0);
            r1 = r2.bind(r1)(r0);
            r0 = 'leggero';
            r0 = r1 === r0;
            return r0;
        };
        r1 = r2.bind(r5)(r1);
        r2 = r1.length;
        r4 = r5;
        if(!(r2 >= r3)) { _fun18432_ip = 246; continue _fun18432 }
case 243:
        r4 = r1;
case 246:
        r2 = r4.filter;
        r1 = function(a0) { // Environment: r0
            _fun18439: for(var _fun18439_ip = 0; ; ) switch(_fun18439_ip) {
case 0:
                r2 = _closure0_slot0;
                r1 = r2.has;
                r0 = a0;
                r3 = r0.nome;
                if(r3) { _fun18439_ip = 27; continue _fun18439 }
case 23:
                r3 = '';
case 27:
                r0 = r3.toLowerCase;
                r0 = r0.bind(r3)();
                r0 = r1.bind(r2)(r0);
                r0 = !r0;
                return r0;
            }
        };
        r9 = r2.bind(r4)(r1);
        r4 = new Array(0);
        r2 = 0;
        r10 = r4;
        r8 = 0;
        r1 = arraySpread(r10, r9, r8);
        r1 = r4.sort;
        r0 = function(a0, a1) { // Environment: r0
            _fun18440: for(var _fun18440_ip = 0; ; ) switch(_fun18440_ip) {
case 0:
                r0 = a0;
                r3 = r0.per_porzione;
                r2 = null;
                r4 = r3 == r2;
                r0 = undefined;
                if(r4) { _fun18440_ip = 24; continue _fun18440 }
case 19:
                r0 = r3.carico_glicemico;
case 24:
                if(!(r0 == r2)) { _fun18440_ip = 30; continue _fun18440 }
case 28:
                r0 = 0;
case 30:
                r3 = a1;
                r3 = r3.per_porzione;
                r4 = r3 == r2;
                r1 = undefined;
                if(r4) { _fun18440_ip = 52; continue _fun18440 }
case 47:
                r1 = r3.carico_glicemico;
case 52:
                if(!(r1 == r2)) { _fun18440_ip = 58; continue _fun18440 }
case 56:
                r1 = 0;
case 58:
                r0 = r0 - r1;
                return r0;
            }
        };
        r1 = r1.bind(r4)(r0);
        r0 = r1.slice;
        r0 = r0.bind(r1)(r2, r3);
        return r0;
    }
}

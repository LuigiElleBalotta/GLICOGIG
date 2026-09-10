function datiAnelliOggi() {
    _fun18459: for(var _fun18459_ip = 0; ; ) switch(_fun18459_ip) {
case 0:
        r11 = undefined;
        r1 = undefined;
        r2 = undefined;
        r12 = undefined;
        r3 = _env_r3_slot1;
        r3 = r3.vociDelGiorno;
        r6 = r3.bind(r11)();
        r3 = r6.length;
        if(r3) { _fun18459_ip = 47; continue _fun18459 }
case 35:
        r3 = {'equilibrio': 0, 'freni': 0, 'varieta': 0};
        return r3;
case 47:
        r4 = r6.filter;
        r3 = function(a0) { // Environment: r0
            _fun18460: for(var _fun18460_ip = 0; ; ) switch(_fun18460_ip) {
case 0:
                r1 = a0;
                r2 = r1.fascia;
                r0 = 'trascurabile';
                r0 = r2 === r0;
                if(r0) { _fun18460_ip = 32; continue _fun18460 }
case 19:
                r2 = r1.fascia;
                r1 = 'basso';
                r0 = r2 === r1;
case 32:
                return r0;
            }
        };
        r3 = r4.bind(r6)(r3);
        r7 = r3.length;
        r5 = global;
        r8 = r5.Math;
        r4 = r8.round;
        r3 = r6.length;
        r3 = r7 / r3;
        r7 = 100;
        r3 = r3 * r7;
        r3 = r4.bind(r8)(r3);
        r10 = 0;
        r1 = 0;
        r2 = 0;
        r9 = r6;
        r8 = r9[Symbol.iterator];
        r9 = r8().next;
        r4 = 2;
case 116:
        r15 = r9().value;
        r13 = r8;
        if(!(r13 !== r11)) { _fun18459_ip = 230; continue _fun18459 }
case 127: // try_start_0
        r12 = r15;
        r14 = r1;
        r15 = r15.carbo;
        r13 = r15;
        if(r15) { _fun18459_ip = 147; continue _fun18459 }
case 145:
        r13 = 0;
case 147:
        r1 = r14 + r13;
        r14 = r2;
        r15 = r12;
        r15 = r15.fibre;
        r13 = r15;
        if(r15) { _fun18459_ip = 171; continue _fun18459 }
case 169:
        r13 = 0;
case 171:
        r15 = r13 * r4;
        r16 = r12;
        r16 = r16.prot;
        r13 = r16;
        if(r16) { _fun18459_ip = 192; continue _fun18459 }
case 190:
        r13 = 0;
case 192:
        r15 = r15 + r13;
        r16 = r12;
        r16 = r16.grassi;
        r13 = r16;
        if(r16) { _fun18459_ip = 213; continue _fun18459 }
case 211:
        r13 = 0;
case 213:
        r13 = r15 + r13;
        r2 = r14 + r13;
case 221: // try_end0
        _fun18459_ip = 116; continue _fun18459;
case 223: // catch_target0
        CatchBlockStart(arg_register=4);
        r8.return();
        throw r4;
case 230:
        r4 = r1;
        r13 = 1;
        r12 = r13;
        if(!(r4 > r10)) { _fun18459_ip = 247; continue _fun18459 }
case 243:
        r12 = r2 / r1;
case 247:
        r4 = r5.Math;
        r2 = r4.round;
        r9 = r5.Math;
        r8 = r9.max;
        r11 = r5.Math;
        r1 = r11.min;
        r1 = r1.bind(r11)(r13, r12);
        r1 = r8.bind(r9)(r10, r1);
        r1 = r1 * r7;
        r2 = r2.bind(r4)(r1);
        r8 = r5.Set;
        r4 = r6.map;
        r1 = function(a0) { // Environment: r0
            _fun18461: for(var _fun18461_ip = 0; ; ) switch(_fun18461_ip) {
case 0:
                r0 = a0;
                r1 = r0.nome;
                if(r1) { _fun18461_ip = 15; continue _fun18461 }
case 11:
                r1 = '';
case 15:
                r0 = r1.toLowerCase;
                r1 = r0.bind(r1)();
                r0 = r1.trim;
                r0 = r0.bind(r1)();
                return r0;
            }
        };
        r19 = r4.bind(r6)(r1);
        r4 = r8.prototype;
        r4 = Object.create(r4, {constructor: {value: r8}});
        r20 = r4;
        r1 = new r20[r8](r19, r18);
        r8 = r1 instanceof Object ? r1 : r4;
        r4 = r5.Set;
        r1 = r6.map;
        r0 = function(a0) { // Environment: r0
            r2 = _env_r0_slot18;
            r1 = undefined;
            r0 = a0;
            r0 = r2.bind(r1)(r0);
            return r0;
        };
        r19 = r1.bind(r6)(r0);
        r1 = r4.prototype;
        r1 = Object.create(r1, {constructor: {value: r4}});
        r20 = r1;
        r0 = new r20[r4](r19, r18);
        r0 = r0 instanceof Object ? r0 : r1;
        r4 = r5.Math;
        r1 = r4.round;
        r6 = r5.Math;
        r5 = r6.min;
        r9 = r8.size;
        r8 = 12;
        r8 = r9 * r8;
        r9 = r0.size;
        r0 = 8;
        r0 = r9 * r0;
        r0 = r8 + r0;
        r0 = r5.bind(r6)(r7, r0);
        r1 = r1.bind(r4)(r0);
        r0 = {};
        r0['equilibrio'] = r3;
        r0['freni'] = r2;
        r0['varieta'] = r1;
        return r0;
    }
}
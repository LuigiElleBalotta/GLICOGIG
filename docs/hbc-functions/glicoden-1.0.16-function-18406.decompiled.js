function aggiustaIGperPreparazione(a0, a1, a2) {
    _fun18406: for(var _fun18406_ip = 0; ; ) switch(_fun18406_ip) {
case 0:
        r0 = a0;
        r3 = a1;
        r2 = a2;
        if(r3) { _fun18406_ip = 16; continue _fun18406 }
case 12:
        r3 = '';
case 16:
        r1 = ' ';
        r1 = r3 + r1;
        if(r2) { _fun18406_ip = 31; continue _fun18406 }
case 27:
        r2 = '';
case 31:
        r2 = r1 + r2;
        r1 = r2.toLowerCase;
        r5 = r1.bind(r2)();
        r2 = /al dente/;
        r1 = r2.test;
        r1 = r1.bind(r2)(r5);
        r4 = 1;
        r3 = r4;
        if(!r1) { _fun18406_ip = 88; continue _fun18406 }
case 78:
        r3 = 0.9;
case 88:
        r2 = /stracott|\bscott|molto cott|ben cott|puree|pur[eè]|passat|frullat|schiacciat|vellutat|omogeneizzat/;
        r1 = r2.test;
        r1 = r1.bind(r2)(r5);
        r2 = r3;
        if(!r1) { _fun18406_ip = 132; continue _fun18406 }
case 118:
        r1 = 1.15;
        r2 = r3 * r1;
case 132:
        r3 = /freddo|raffredd|avanzo|giorno prima|riposat/;
        r1 = r3.test;
        r1 = r1.bind(r3)(r5);
        r3 = r2;
        if(!r1) { _fun18406_ip = 176; continue _fun18406 }
case 162:
        r1 = 0.88;
        r3 = r2 * r1;
case 176:
        r2 = /aceto|limone|acidul/;
        r1 = r2.test;
        r1 = r1.bind(r2)(r5);
        r2 = r3;
        if(!r1) { _fun18406_ip = 220; continue _fun18406 }
case 206:
        r1 = 0.92;
        r2 = r3 * r1;
case 220:
        if(!(r2 !== r4)) { _fun18406_ip = 332; continue _fun18406 }
case 224:
        r1 = global;
        r6 = r1.Math;
        r5 = r6.max;
        r7 = 25;
        r3 = r0 - r7;
        r9 = r1.Math;
        r8 = r9.min;
        r7 = r0 + r7;
        r2 = r0 * r2;
        r2 = r8.bind(r9)(r7, r2);
        r8 = r5.bind(r6)(r3, r2);
        r3 = r1.Math;
        r2 = r3.max;
        r7 = r1.Math;
        r6 = r7.min;
        r5 = r1.Math;
        r1 = r5.round;
        r5 = r1.bind(r5)(r8);
        r1 = 100;
        r1 = r6.bind(r7)(r1, r5);
        r1 = r2.bind(r3)(r4, r1);
        return r1;
case 332:
        return r0;
    }
}
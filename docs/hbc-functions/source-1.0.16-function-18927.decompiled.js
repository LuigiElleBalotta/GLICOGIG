function setBevandaZero(a0, a1) {
    r0 = a0;
    var _closure0_slot0 = r0;
    r0 = a1;
    var _closure0_slot1 = r0;
    r2 = _env_r0_slot11;
    r0 = undefined;
    r1 = function(a0) { // Environment: r1
        r2 = a0;
        r1 = r2.map;
        r0 = function(a0, a1) { // Environment: r0
            _fun18929: for(var _fun18929_ip = 0; ; ) switch(_fun18929_ip) {
case 0:
                r0 = a0;
                r2 = _closure0_slot0;
                r1 = a1;
                if(!(r1 === r2)) { _fun18929_ip = 110; continue _fun18929 }
case 17:
                r2 = _env_r1_slot19;
                r1 = _closure0_slot0;
                r2 = r2[r1];
                r1 = null;
                r4 = r2 == r1;
                r1 = undefined;
                if(r4) { _fun18929_ip = 49; continue _fun18929 }
case 43:
                r1 = r2.catalogo_id;
case 49:
                r5 = 'bibita-tipo-cola';
                r2 = r5;
                if(!r1) { _fun18929_ip = 73; continue _fun18929 }
case 59:
                r4 = 'bevanda-zero';
                r2 = r5;
                if(!(r1 !== r4)) { _fun18929_ip = 73; continue _fun18929 }
case 70:
                r2 = r1;
case 73:
                r1 = {};
                r7 = r1;
                r6 = r0;
                r4 = copyDataProperties(r7, r6);
                r4 = _closure0_slot1;
                r3 = 'bevanda-zero';
                if(r4) { _fun18929_ip = 99; continue _fun18929 }
case 96:
                r3 = r2;
case 99:
                r2 = 'catalogo_id';
                r1[2] = r3;
                return r1;
case 110:
                return r0;
            }
        };
        r0 = r1.bind(r2)(r0);
        return r0;
    };
    r1 = r2.bind(r0)(r1);
    r2 = _closure0_slot42;
    r1 = 'soft';
    r1 = r2.bind(r0)(r1);
    return r0;
}

function impattoLista(a0) {
    _fun18446: for(var _fun18446_ip = 0; ; ) switch(_fun18446_ip) {
case 0:
        r3 = a0;
        r1 = r3.length;
        if(r1) { _fun18446_ip = 19; continue _fun18446 }
case 13:
        r1 = 'trascurabile';
        return r1;
case 19:
        r4 = r3.reduce;
        r2 = function(a0, a1) { // Environment: r0
            _fun18447: for(var _fun18447_ip = 0; ; ) switch(_fun18447_ip) {
case 0:
                r0 = global;
                r3 = r0.Math;
                r2 = r3.max;
                r1 = _env_r0_slot5;
                r0 = a1;
                r0 = r0.fascia;
                r1 = r1[r0];
                r0 = null;
                if(!(r1 == r0)) { _fun18447_ip = 41; continue _fun18447 }
case 38:
                r1 = 1;
case 41:
                r0 = a0;
                r0 = r2.bind(r3)(r0, r1);
                return r0;
            }
        };
        r1 = 0;
        r1 = r4.bind(r3)(r2, r1);
        r2 = r3.filter;
        r0 = function(a0) { // Environment: r0
            _fun18448: for(var _fun18448_ip = 0; ; ) switch(_fun18448_ip) {
case 0:
                r1 = _env_r0_slot5;
                r0 = a0;
                r0 = r0.fascia;
                r1 = r1[r0];
                r0 = null;
                if(!(r1 == r0)) { _fun18448_ip = 28; continue _fun18448 }
case 25:
                r1 = 1;
case 28:
                r0 = 2;
                r0 = r1 >= r0;
                return r0;
            }
        };
        r0 = r2.bind(r3)(r0);
        r2 = r0.length;
        r0 = 3;
        if(!(r1 >= r0)) { _fun18446_ip = 72; continue _fun18446 }
case 65:
        r0 = 2;
        if(!(!(r2 >= r0))) { _fun18446_ip = 86; continue _fun18446 }
case 72:
        r0 = ['trascurabile', 'basso', 'medio', 'alto'];
        r0 = r0[r1];
        return r0;
case 86:
        r0 = 'alto';
        return r0;
    }
}

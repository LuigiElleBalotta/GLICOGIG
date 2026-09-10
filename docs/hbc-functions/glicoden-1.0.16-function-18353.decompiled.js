function _caricaDiario() {
    r4 = undefined;
    r0 = undefined;
    r2 = _env_r1_slot1;
    r3 = r2.default;
    r2 = function* () { // Environment: r2
        r0 = function* () { // Original name: ?anon_0_, environment: r0
            _fun18355: for(var _fun18355_ip = 0; ; ) switch(_fun18355_ip) {
case 0:
                StartGenerator();
                ResumeGenerator(result_out_reg=0, return_bool_out_reg=1);
                if(r1) { _fun18355_ip = 163; continue _fun18355 }
case 12:
                r1 = undefined;
                var _closure2_slot0 = r1;
                r2 = _env_r4_slot8;
                if(r2) { _fun18355_ip = 160; continue _fun18355 }
case 31:
                r2 = _env_r4_slot3;
                r6 = r2.getJSON;
                r2 = _env_r4_slot3;
                r2 = r2.K;
                r5 = r2.diario;
                r2 = new Array(0);
                r2 = r6.bind(r1)(r5, r2);
                SaveGenerator(address=71);
case 69:
                return r2;
case 71:
                ResumeGenerator(result_out_reg=2, return_bool_out_reg=5);
                if(r5) { _fun18355_ip = 157; continue _fun18355 }
case 77:
                r5 = global;
                r6 = r5.Array;
                r5 = r6.isArray;
                r5 = r5.bind(r6)(r2);
                r7 = r2;
                if(r5) { _fun18355_ip = 105; continue _fun18355 }
case 101:
                r7 = new Array(0);
case 105:
                _env_r4_slot7 = r7;
                r5 = true;
                _env_r4_slot8 = r5;
                r5 = new Array(0);
                r8 = 0;
                r10 = r5;
                r9 = r7;
                r6 = arraySpread(r10, r9, r8);
                _closure2_slot0 = r5;
                r5 = _env_r4_slot9;
                r4 = r5.forEach;
                r3 = function(a0) { // Environment: r3
                    r2 = _closure2_slot0;
                    r1 = a0;
                    r0 = undefined;
                    r0 = r1.bind(r0)(r2);
                    return r0;
                };
                r3 = r4.bind(r5)(r3);
                return r1;
case 157:
                return r2;
case 160:
                return r1;
case 163:
                return r0;
            }
        };
        return r0;
    };
    r3 = r3.bind(r4)(r2);
    _env_r1_slot17 = r3;
    r2 = r3.apply;
    r0 = arguments;
    r1 = r0;
    r0 = this;
    r0 = r2.bind(r3)(r0, r1);
    return r0;
}
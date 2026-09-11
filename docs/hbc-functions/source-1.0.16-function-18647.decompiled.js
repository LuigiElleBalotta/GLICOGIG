function _condividiCard() {
    r4 = undefined;
    r0 = undefined;
    r2 = _env_r1_slot0;
    r3 = r2.default;
    r2 = function* (a0) { // Environment: r2
        r0 = function* (a0) { // Original name: ?anon_0_, environment: r0
            _fun18649: for(var _fun18649_ip = 0; ; ) switch(_fun18649_ip) {
case 0:
                StartGenerator();
                ResumeGenerator(result_out_reg=0, return_bool_out_reg=2);
                if(r2) { _fun18649_ip = 189; continue _fun18649 }
case 10:
                r1 = a0;
                r6 = undefined;
                r3 = undefined;
case 17: // try_start_0
                r4 = r1;
                r2 = null;
                r5 = r4 == r2;
                r2 = undefined;
                if(r5) { _fun18649_ip = 36; continue _fun18649 }
case 31:
                r2 = r4.current;
case 36:
                if(r2) { _fun18649_ip = 44; continue _fun18649 }
case 39: // try_end0
                r2 = false;
                return r2;
case 44: // try_start_1
                r2 = _env_r4_slot1;
                r5 = r2.captureRef;
                r2 = r1;
                r1 = {'format': 'png', 'quality': 1, 'result': 'tmpfile'};
                r1 = r5.bind(r6)(r2, r1);
                SaveGenerator(address=84);
case 82:
                return r1;
case 84:
                ResumeGenerator(result_out_reg=1, return_bool_out_reg=2);
                if(r2) { _fun18649_ip = 179; continue _fun18649 }
case 90:
                r3 = r1;
                r5 = _env_r4_slot2;
                r2 = r5.isAvailableAsync;
                r2 = r2.bind(r5)();
                SaveGenerator(address=111);
case 109:
                return r2;
case 111:
                ResumeGenerator(result_out_reg=2, return_bool_out_reg=5);
                if(r5) { _fun18649_ip = 176; continue _fun18649 }
case 117:
                if(r2) { _fun18649_ip = 125; continue _fun18649 }
case 120: // try_end1
                r5 = false;
                return r5;
case 125: // try_start_2
                r6 = _env_r4_slot2;
                r5 = r6.shareAsync;
                r4 = r3;
                r3 = {'mimeType': 'image/png', 'dialogTitle': 'Condividi', 'UTI': 'public.png'};
                r3 = r5.bind(r6)(r4, r3);
                SaveGenerator(address=162);
case 160:
                return r3;
case 162:
                ResumeGenerator(result_out_reg=3, return_bool_out_reg=4);
                if(r4) { _fun18649_ip = 173; continue _fun18649 }
case 168: // try_end2
                r4 = true;
                return r4;
case 173:
                return r3;
case 176:
                return r2;
case 179:
                return r1;
case 182: // catch_target0 // catch_target1 // catch_target2
                CatchBlockStart(arg_register=1);
                r1 = false;
                return r1;
case 189:
                return r0;
            }
        };
        return r0;
    };
    r3 = r3.bind(r4)(r2);
    _env_r1_slot3 = r3;
    r2 = r3.apply;
    r0 = arguments;
    r1 = r0;
    r0 = this;
    r0 = r2.bind(r3)(r0, r1);
    return r0;
}
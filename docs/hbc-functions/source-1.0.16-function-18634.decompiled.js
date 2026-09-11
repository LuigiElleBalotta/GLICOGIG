function ?anon_0_() {
    _fun18634: for(var _fun18634_ip = 0; ; ) switch(_fun18634_ip) {
case 0:
        StartGenerator();
        ResumeGenerator(result_out_reg=0, return_bool_out_reg=1);
        if(r1) { _fun18634_ip = 97; continue _fun18634 }
case 7:
        r2 = _env_r1_slot12;
        r3 = r2.current;
        r2 = null;
        if(!(r3 != r2)) { _fun18634_ip = 35; continue _fun18634 }
case 25:
        r2 = r3.stop;
        r2 = r2.bind(r3)();
case 35:
        r2 = _env_r3_slot9;
        r4 = r2.condividiCard;
        r1 = _env_r1_slot13;
        r2 = undefined;
        r1 = r4.bind(r2)(r1);
        SaveGenerator(address=63);
case 61:
        return r1;
case 63:
        ResumeGenerator(result_out_reg=1, return_bool_out_reg=4);
        if(r4) { _fun18634_ip = 94; continue _fun18634 }
case 69:
        if(!r1) { _fun18634_ip = 91; continue _fun18634 }
case 72:
        r3 = _env_r3_slot7;
        r4 = r3.logEvento;
        r3 = 'card_condivisa';
        r3 = r4.bind(r2)(r3);
case 91:
        return r2;
case 94:
        return r1;
case 97:
        return r0;
    }
}
function aggiungiPasto() {
    _fun18944: for(var _fun18944_ip = 0; ; ) switch(_fun18944_ip) {
case 0:
        r0 = _env_r2_slot8;
        if(!r0) { _fun18944_ip = 98; continue _fun18944 }
case 10:
        r0 = _env_r2_slot16;
        if(r0) { _fun18944_ip = 98; continue _fun18944 }
case 17:
        r0 = _env_r1_slot20;
        r5 = r0.voceFromFoto;
        r0 = _env_r2_slot8;
        r4 = r0.piatto;
        r3 = _env_r2_slot44;
        r0 = undefined;
        r4 = r5.bind(r0)(r4, r3);
        if(r4) { _fun18944_ip = 57; continue _fun18944 }
case 55:
        return r0;
case 57:
        r3 = _env_r1_slot20;
        r3 = r3.aggiungiAlPasto;
        r3 = r3.bind(r0)(r4);
        r3 = _env_r2_slot17;
        r2 = true;
        r2 = r3.bind(r0)(r2);
        r2 = _env_r1_slot42;
        r1 = 'ok';
        r1 = r2.bind(r0)(r1);
        return r0;
case 98:
        r0 = undefined;
        return r0;
    }
}

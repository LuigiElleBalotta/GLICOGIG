function porzioneGrammi(a0) {
    _fun19255: for(var _fun19255_ip = 0; ; ) switch(_fun19255_ip) {
case 0:
        r1 = a0;
        if(r1) { _fun19255_ip = 10; continue _fun19255 }
case 6:
        r0 = null;
        return r0;
case 10:
        r0 = global;
        r0 = r0.String;
        r3 = undefined;
        r4 = r0.bind(r3)(r1);
        r2 = r4.replace;
        r1 = ',';
        r0 = '.';
        r2 = r2.bind(r4)(r1, r0);
        r1 = r2.match;
        r0 = /([\d.]+)\s*(?:g|ml)\b/i;
        r4 = r1.bind(r2)(r0);
        r0 = null;
        if(!r4) { _fun19255_ip = 93; continue _fun19255 }
case 74:
        r2 = _env_r1_slot7;
        r1 = 1;
        r1 = r4[r1];
        r0 = r2.bind(r3)(r1);
case 93:
        return r0;
    }
}
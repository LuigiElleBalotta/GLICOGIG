function mergeTraduzione(a0, a1) {
    r1 = a0;
    var _closure0_slot0 = r1;
    r1 = a1;
    var _closure0_slot1 = r1;
    r2 = _env_r1_slot5;
    r1 = r2.forEach;
    r0 = function(a0) { // Environment: r0
        _fun19703: for(var _fun19703_ip = 0; ; ) switch(_fun19703_ip) {
case 0:
            r1 = a0;
            r4 = _closure0_slot0;
            r2 = r1.id;
            r2 = r4[r2];
            var _closure1_slot0 = r2;
            if(r2) { _fun19703_ip = 32; continue _fun19703 }
case 28:
            r4 = undefined;
            return r4;
case 32:
            r4 = _closure0_slot1;
            r3 = 'titolo';
            r5 = r3 + r4;
            r3 = r2.t;
            r1[r5] = r3;
            r3 = 'sottotitolo';
            r3 = r3 + r4;
            r2 = r2.s;
            r1[r3] = r2;
            r2 = r1.blocchi;
            r1 = r2.forEach;
            r0 = function(a0, a1) { // Environment: r0
                _fun19704: for(var _fun19704_ip = 0; ; ) switch(_fun19704_ip) {
case 0:
                    r2 = a0;
                    r0 = _closure1_slot0;
                    r1 = r0.b;
                    r0 = a1;
                    r0 = r1[r0];
                    if(r0) { _fun19704_ip = 29; continue _fun19704 }
case 25:
                    r1 = undefined;
                    return r1;
case 29:
                    r3 = r2.t;
                    r1 = 'p';
                    if(!(r3 !== r1)) { _fun19704_ip = 248; continue _fun19704 }
case 45:
                    r3 = r2.t;
                    r1 = 'nota';
                    if(!(r3 !== r1)) { _fun19704_ip = 248; continue _fun19704 }
case 61:
                    r3 = r2.t;
                    r1 = 'esempio';
                    if(!(r3 !== r1)) { _fun19704_ip = 182; continue _fun19704 }
case 74:
                    r3 = r2.t;
                    r1 = 'link';
                    if(!(r3 !== r1)) { _fun19704_ip = 145; continue _fun19704 }
case 87:
                    r3 = r2.t;
                    r1 = 'punti';
                    if(!(r3 === r1)) { _fun19704_ip = 280; continue _fun19704 }
case 103:
                    r1 = r0.voci;
                    if(!r1) { _fun19704_ip = 280; continue _fun19704 }
case 115:
                    r3 = _closure0_slot1;
                    r1 = 'voci';
                    r3 = r1 + r3;
                    r1 = r0.voci;
                    r2[r3] = r1;
                    _fun19704_ip = 280; continue _fun19704;
case 145:
                    r1 = r0.label;
                    if(!r1) { _fun19704_ip = 280; continue _fun19704 }
case 156:
                    r3 = _closure0_slot1;
                    r1 = 'label';
                    r3 = r1 + r3;
                    r1 = r0.label;
                    r2[r3] = r1;
                    _fun19704_ip = 280; continue _fun19704;
case 182:
                    r1 = r0.testo;
                    if(!r1) { _fun19704_ip = 214; continue _fun19704 }
case 190:
                    r3 = _closure0_slot1;
                    r1 = 'testo';
                    r3 = r1 + r3;
                    r1 = r0.testo;
                    r2[r3] = r1;
case 214:
                    r1 = r0.cibo;
                    if(!r1) { _fun19704_ip = 280; continue _fun19704 }
case 222:
                    r3 = _closure0_slot1;
                    r1 = 'cibo';
                    r3 = r1 + r3;
                    r1 = r0.cibo;
                    r2[r3] = r1;
                    _fun19704_ip = 280; continue _fun19704;
case 248:
                    r1 = r0.testo;
                    if(!r1) { _fun19704_ip = 280; continue _fun19704 }
case 256:
                    r3 = _closure0_slot1;
                    r1 = 'testo';
                    r1 = r1 + r3;
                    r0 = r0.testo;
                    r2[r1] = r0;
case 280:
                    r0 = undefined;
                    return r0;
                }
            };
            r0 = r1.bind(r2)(r0);
            r0 = undefined;
            return r0;
        }
    };
    r0 = r1.bind(r2)(r0);
    r0 = undefined;
    return r0;
}
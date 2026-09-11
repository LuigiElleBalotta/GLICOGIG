function nomeCottura(a0) {
    _fun18941: for(var _fun18941_ip = 0; ; ) switch(_fun18941_ip) {
case 0:
        r1 = a0;
        r3 = r1.catalogo_id;
        r2 = undefined;
        r0 = undefined;
        if(!r3) { _fun18941_ip = 59; continue _fun18941 }
case 16:
        r3 = _env_r3_slot14;
        r4 = r3.alimentoById;
        r3 = r1.catalogo_id;
        r3 = r4.bind(r2)(r3);
        r4 = null;
        r4 = r3 == r4;
        r2 = undefined;
        if(r4) { _fun18941_ip = 56; continue _fun18941 }
case 51:
        r2 = r3.nome;
case 56:
        r0 = r2;
case 59:
        if(r0) { _fun18941_ip = 67; continue _fun18941 }
case 62:
        r0 = r1.nome;
case 67:
        return r0;
    }
}

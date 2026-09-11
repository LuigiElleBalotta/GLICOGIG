function comeGestirlo(a0) {
    _fun18431: for(var _fun18431_ip = 0; ; ) switch(_fun18431_ip) {
case 0:
        r0 = _env_r0_slot4;
        r2 = r0.i18n;
        r1 = r2.t;
        r0 = a0;
        r4 = r0.fascia;
        r0 = 'diario.gestMedio';
        r3 = 'alto';
        if(!(r4 === r3)) { _fun18431_ip = 42; continue _fun18431 }
case 38:
        r0 = 'diario.gestAlto';
case 42:
        r0 = r1.bind(r2)(r0);
        return r0;
    }
}

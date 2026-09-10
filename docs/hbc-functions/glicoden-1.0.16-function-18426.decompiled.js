function normNome(a0) {
    _fun18426: for(var _fun18426_ip = 0; ; ) switch(_fun18426_ip) {
case 0:
        r1 = a0;
        if(r1) { _fun18426_ip = 10; continue _fun18426 }
case 6:
        r1 = '';
case 10:
        r0 = r1.toLowerCase;
        r2 = r0.bind(r1)();
        r1 = r2.normalize;
        r0 = 'NFD';
        r3 = r1.bind(r2)(r0);
        r2 = r3.replace;
        r1 = /[̀-ͯ]/g;
        r0 = '';
        r2 = r2.bind(r3)(r1, r0);
        r1 = r2.replace;
        r0 = /[^a-z0-9 ]/g;
        r3 = ' ';
        r2 = r1.bind(r2)(r0, r3);
        r1 = r2.replace;
        r0 = /\s+/g;
        r1 = r1.bind(r2)(r0, r3);
        r0 = r1.trim;
        r0 = r0.bind(r1)();
        return r0;
    }
}
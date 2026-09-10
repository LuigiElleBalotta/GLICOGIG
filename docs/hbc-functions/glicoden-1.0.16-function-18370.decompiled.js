function totali(a0) {
    r3 = a0;
    r2 = r3.reduce;
    r1 = function(a0, a1) { // Environment: r0
        r1 = a0;
        r2 = a1;
        r0 = {};
        r4 = r1.kcal;
        r3 = r2.kcal;
        r3 = r4 + r3;
        r0['kcal'] = r3;
        r4 = r1.carbo;
        r3 = r2.carbo;
        r3 = r4 + r3;
        r0['carbo'] = r3;
        r4 = r1.prot;
        r3 = r2.prot;
        r3 = r4 + r3;
        r0['prot'] = r3;
        r4 = r1.grassi;
        r3 = r2.grassi;
        r3 = r4 + r3;
        r0['grassi'] = r3;
        r3 = r1.fibre;
        r2 = r2.fibre;
        r2 = r3 + r2;
        r0['fibre'] = r2;
        r2 = r1.n;
        r1 = 1;
        r1 = r2 + r1;
        r0['n'] = r1;
        return r0;
    };
    r0 = {'kcal': 0, 'carbo': 0, 'prot': 0, 'grassi': 0, 'fibre': 0, 'n': 0};
    r0 = r2.bind(r3)(r1, r0);
    return r0;
}
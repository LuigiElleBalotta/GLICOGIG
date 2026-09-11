function livelloStabilita(a0) {
    _fun18458: for(var _fun18458_ip = 0; ; ) switch(_fun18458_ip) {
case 0:
        r3 = a0;
        r0 = 85;
        r1 = r3 >= r0;
        r0 = 'moltoStabile';
        if(r1) { _fun18458_ip = 55; continue _fun18458 }
case 17:
        r1 = 70;
        r2 = r3 >= r1;
        r1 = 'bellaGiornata';
        if(r2) { _fun18458_ip = 52; continue _fun18458 }
case 31:
        r2 = 55;
        r3 = r3 >= r2;
        r2 = 'impegnativa';
        if(!r3) { _fun18458_ip = 49; continue _fun18458 }
case 45:
        r2 = 'nellaMedia';
case 49:
        r1 = r2;
case 52:
        r0 = r1;
case 55:
        return r0;
    }
}
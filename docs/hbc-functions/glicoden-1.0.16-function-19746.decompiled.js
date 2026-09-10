function hashStr(a0) {
    _fun19746: for(var _fun19746_ip = 0; ; ) switch(_fun19746_ip) {
case 0:
        r7 = a0;
        r0 = r7.length;
        r1 = 0;
        r2 = r1 < r0;
        r4 = 2166136261.0;
        r6 = global;
        r5 = 16777619;
        r3 = 0;
        r0 = r4;
        if(!r2) { _fun19746_ip = 88; continue _fun19746 }
case 40:
        r2 = r7.charCodeAt;
        r2 = r2.bind(r7)(r3);
        r9 = r4 ^ r2;
        r8 = r6.Math;
        r2 = r8.imul;
        r4 = r2.bind(r8)(r9, r5);
        r3 = r3 + 1;
        r2 = r7.length;
        r0 = r4;
        if(r3 < r2) { _fun19746_ip = 40; continue _fun19746 }
case 88:
        r0 = r0 >>> r1;
        return r0;
    }
}
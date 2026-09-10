function rispondi(a0) {
    _fun19787: for(var _fun19787_ip = 0; ; ) switch(_fun19787_ip) {
case 0:
        r4 = a0;
        r2 = _env_r3_slot10;
        r0 = null;
        if(!(r2 == r0)) { _fun19787_ip = 130; continue _fun19787 }
case 18:
        r2 = _env_r3_slot11;
        r0 = undefined;
        r2 = r2.bind(r0)(r4);
        r5 = _env_r3_slot4;
        r2 = _env_r3_slot8;
        r2 = r5[r2];
        r2 = r2.corretta;
        r2 = r4 === r2;
        if(!r2) { _fun19787_ip = 67; continue _fun19787 }
case 53:
        r4 = _env_r3_slot13;
        r3 = function(a0) { // Environment: r1
            r1 = a0;
            r0 = 1;
            r0 = r1 + r0;
            return r0;
        };
        r3 = r4.bind(r0)(r3);
case 67:
        r4 = _env_r5_slot9;
        r3 = r4.notificationAsync;
        r5 = _env_r5_slot9;
        r5 = r5.NotificationFeedbackType;
        if(r2) { _fun19787_ip = 101; continue _fun19787 }
case 93:
        r2 = r5.Warning;
        _fun19787_ip = 107; continue _fun19787;
case 101:
        r2 = r5.Success;
case 107:
        r3 = r3.bind(r4)(r2);
        r2 = r3.catch;
        r1 = function() { // Environment: r1
            r0 = undefined;
            return r0;
        };
        r1 = r2.bind(r3)(r1);
        return r0;
case 130:
        r0 = undefined;
        return r0;
    }
}
function ?anon_0_() {
    _fun19755: for(var _fun19755_ip = 0; ; ) switch(_fun19755_ip) {
case 0:
        StartGenerator();
        ResumeGenerator(result_out_reg=0, return_bool_out_reg=1);
        if(r1) { _fun19755_ip = 282; continue _fun19755 }
case 10:
        r1 = _env_r4_slot7;
        r9 = undefined;
        r8 = r1.bind(r9)();
        r1 = _env_r4_slot1;
        r2 = r1.getJSON;
        r1 = _env_r4_slot1;
        r1 = r1.K;
        r1 = r1.quizGiorno;
        r6 = -1;
        r1 = r2.bind(r9)(r1, r6);
        SaveGenerator(address=65);
case 63:
        return r1;
case 65:
        ResumeGenerator(result_out_reg=1, return_bool_out_reg=2);
        if(r2) { _fun19755_ip = 279; continue _fun19755 }
case 74:
        r2 = _env_r4_slot1;
        r3 = r2.getJSON;
        r2 = _env_r4_slot1;
        r2 = r2.K;
        r2 = r2.quizStreak;
        r7 = 0;
        r2 = r3.bind(r9)(r2, r7);
        SaveGenerator(address=112);
case 110:
        return r2;
case 112:
        ResumeGenerator(result_out_reg=2, return_bool_out_reg=3);
        if(r3) { _fun19755_ip = 276; continue _fun19755 }
case 121:
        r3 = _env_r4_slot1;
        r5 = r3.getJSON;
        r3 = _env_r4_slot1;
        r3 = r3.K;
        r3 = r3.quizBest;
        r3 = r5.bind(r9)(r3, r7);
        SaveGenerator(address=157);
case 155:
        return r3;
case 157:
        ResumeGenerator(result_out_reg=3, return_bool_out_reg=5);
        if(r5) { _fun19755_ip = 273; continue _fun19755 }
case 163:
        r5 = _env_r4_slot1;
        r5 = r5.getJSON;
        r4 = _env_r4_slot1;
        r4 = r4.K;
        r4 = r4.quizScoreOggi;
        r4 = r5.bind(r9)(r4, r6);
        SaveGenerator(address=199);
case 197:
        return r4;
case 199:
        ResumeGenerator(result_out_reg=4, return_bool_out_reg=5);
        if(r5) { _fun19755_ip = 270; continue _fun19755 }
case 205:
        r9 = r1 === r8;
        r5 = {};
        if(r9) { _fun19755_ip = 227; continue _fun19755 }
case 214:
        r6 = 1;
        r8 = r8 - r6;
        r6 = 0;
        if(!(r1 === r8)) { _fun19755_ip = 230; continue _fun19755 }
case 227:
        r6 = r2;
case 230:
        r5['streak'] = r6;
        r5['record'] = r3;
        r5['fattoOggi'] = r9;
        r6 = null;
        if(!r9) { _fun19755_ip = 262; continue _fun19755 }
case 250:
        r7 = r4 >= r7;
        r6 = null;
        if(!r7) { _fun19755_ip = 262; continue _fun19755 }
case 259:
        r6 = r4;
case 262:
        r5['punteggioOggi'] = r6;
        return r5;
case 270:
        return r4;
case 273:
        return r3;
case 276:
        return r2;
case 279:
        return r1;
case 282:
        return r0;
    }
}
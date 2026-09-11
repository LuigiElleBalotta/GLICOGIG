function ?anon_0_(a0) {
    _fun19759: for(var _fun19759_ip = 0; ; ) switch(_fun19759_ip) {
case 0:
        StartGenerator();
        r9 = a0;
        ResumeGenerator(result_out_reg=0, return_bool_out_reg=1);
        if(r1) { _fun19759_ip = 445; continue _fun19759 }
case 13:
        r1 = _env_r7_slot7;
        r11 = undefined;
        r12 = r1.bind(r11)();
        r1 = _env_r7_slot1;
        r3 = r1.getJSON;
        r1 = _env_r7_slot1;
        r1 = r1.K;
        r2 = r1.quizGiorno;
        r1 = -1;
        r1 = r3.bind(r11)(r2, r1);
        SaveGenerator(address=68);
case 66:
        return r1;
case 68:
        ResumeGenerator(result_out_reg=1, return_bool_out_reg=2);
        if(r2) { _fun19759_ip = 442; continue _fun19759 }
case 77:
        r2 = _env_r7_slot1;
        r3 = r2.getJSON;
        r2 = _env_r7_slot1;
        r2 = r2.K;
        r2 = r2.quizStreak;
        r5 = 0;
        r2 = r3.bind(r11)(r2, r5);
        SaveGenerator(address=115);
case 113:
        return r2;
case 115:
        ResumeGenerator(result_out_reg=2, return_bool_out_reg=3);
        if(r3) { _fun19759_ip = 439; continue _fun19759 }
case 124:
        r3 = _env_r7_slot1;
        r4 = r3.getJSON;
        r3 = _env_r7_slot1;
        r3 = r3.K;
        r3 = r3.quizBest;
        r3 = r4.bind(r11)(r3, r5);
        SaveGenerator(address=160);
case 158:
        return r3;
case 160:
        ResumeGenerator(result_out_reg=3, return_bool_out_reg=4);
        if(r4) { _fun19759_ip = 436; continue _fun19759 }
case 169:
        r10 = r2;
        if(!(r1 !== r12)) { _fun19759_ip = 290; continue _fun19759 }
case 176:
        r4 = 1;
        r5 = r12 - r4;
        r6 = r4;
        if(!(r1 === r5)) { _fun19759_ip = 194; continue _fun19759 }
case 190:
        r6 = r2 + r4;
case 194:
        r4 = _env_r7_slot1;
        r5 = r4.setJSON;
        r4 = _env_r7_slot1;
        r4 = r4.K;
        r4 = r4.quizStreak;
        r4 = r5.bind(r11)(r4, r6);
        r8 = r6;
        SaveGenerator(address=233);
case 231:
        return r4;
case 233:
        ResumeGenerator(result_out_reg=4, return_bool_out_reg=5);
        if(r5) { _fun19759_ip = 433; continue _fun19759 }
case 242:
        r5 = _env_r7_slot1;
        r6 = r5.setJSON;
        r5 = _env_r7_slot1;
        r5 = r5.K;
        r5 = r5.quizGiorno;
        r5 = r6.bind(r11)(r5, r12);
        SaveGenerator(address=278);
case 276:
        return r5;
case 278:
        ResumeGenerator(result_out_reg=5, return_bool_out_reg=6);
        r10 = r8;
        if(r6) { _fun19759_ip = 430; continue _fun19759 }
case 290:
        r6 = _env_r7_slot1;
        r8 = r6.setJSON;
        r6 = _env_r7_slot1;
        r6 = r6.K;
        r6 = r6.quizScoreOggi;
        r6 = r8.bind(r11)(r6, r9);
        SaveGenerator(address=326);
case 324:
        return r6;
case 326:
        ResumeGenerator(result_out_reg=6, return_bool_out_reg=8);
        if(r8) { _fun19759_ip = 427; continue _fun19759 }
case 332:
        if(!(r9 > r3)) { _fun19759_ip = 378; continue _fun19759 }
case 336:
        r8 = _env_r7_slot1;
        r8 = r8.setJSON;
        r7 = _env_r7_slot1;
        r7 = r7.K;
        r7 = r7.quizBest;
        r7 = r8.bind(r11)(r7, r9);
        SaveGenerator(address=372);
case 370:
        return r7;
case 372:
        ResumeGenerator(result_out_reg=7, return_bool_out_reg=8);
        if(r8) { _fun19759_ip = 424; continue _fun19759 }
case 378:
        r8 = {};
        r8['streak'] = r10;
        r10 = global;
        r11 = r10.Math;
        r10 = r11.max;
        r10 = r10.bind(r11)(r3, r9);
        r8['record'] = r10;
        r10 = true;
        r8['fattoOggi'] = r10;
        r8['punteggioOggi'] = r9;
        return r8;
case 424:
        return r7;
case 427:
        return r6;
case 430:
        return r5;
case 433:
        return r4;
case 436:
        return r3;
case 439:
        return r2;
case 442:
        return r1;
case 445:
        return r0;
    }
}
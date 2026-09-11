function OggiStabilita(a0) {
    _fun19495: for(var _fun19495_ip = 0; ; ) switch(_fun19495_ip) {
case 0:
        r0 = a0;
        r5 = r0.style;
        r0 = _env_r17_slot5;
        r0 = r0.useColors;
        r3 = undefined;
        r0 = r0.bind(r3)();
        r1 = _env_r17_slot7;
        r1 = r1.useT;
        r18 = r1.bind(r3)();
        r1 = _env_r17_slot5;
        r4 = r1.useThemedStyles;
        r1 = _env_r17_slot10;
        r20 = r4.bind(r3)(r1);
        r1 = _env_r17_slot1;
        r1 = r1.useState;
        r6 = 0;
        r4 = r1.bind(r3)(r6);
        r1 = _env_r17_slot0;
        r1 = r1.default;
        r8 = 2;
        r1 = r1.bind(r3)(r4, r8);
        r24 = r1[r6];
        r23 = 1;
        r1 = r1[r23];
        var _closure0_slot0 = r1;
        r1 = _env_r17_slot1;
        r4 = r1.useState;
        r1 = null;
        r7 = r4.bind(r3)(r1);
        r4 = _env_r17_slot0;
        r4 = r4.default;
        r4 = r4.bind(r3)(r7, r8);
        r13 = r4[r6];
        r4 = r4[r23];
        var _closure0_slot1 = r4;
        r4 = _env_r17_slot1;
        r4 = r4.useState;
        r7 = r4.bind(r3)(r1);
        r4 = _env_r17_slot0;
        r4 = r4.default;
        r4 = r4.bind(r3)(r7, r8);
        r19 = r4[r6];
        r4 = r4[r23];
        var _closure0_slot2 = r4;
        r4 = _env_r17_slot3;
        r4 = r4.useFocusEffect;
        r6 = _env_r17_slot1;
        r7 = r6.useCallback;
        r6 = function() { // Environment: r2
            r4 = _closure0_slot0;
            r0 = _env_r1_slot6;
            r3 = r0.giorniConsecutivi;
            r0 = undefined;
            r3 = r3.bind(r0)();
            r3 = r4.bind(r0)(r3);
            r4 = _closure0_slot1;
            r3 = _env_r1_slot6;
            r3 = r3.andamentoSettimana;
            r3 = r3.bind(r0)();
            r3 = r4.bind(r0)(r3);
            r2 = _closure0_slot2;
            r1 = _env_r1_slot6;
            r1 = r1.bilancioOggi;
            r1 = r1.bind(r0)();
            r1 = r2.bind(r0)(r1);
            return r0;
        };
        r2 = new Array(0);
        r2 = r7.bind(r3)(r6, r2);
        r2 = r4.bind(r3)(r2);
        r2 = 'buono';
        if(!(r19 !== r2)) { _fun19495_ip = 266; continue _fun19495 }
case 243:
        r2 = 'discreto';
        if(!(r19 !== r2)) { _fun19495_ip = 258; continue _fun19495 }
case 251:
        r22 = r0.inkSoft;
        _fun19495_ip = 264; continue _fun19495;
case 258:
        r22 = r0.yellowInk;
case 264:
        _fun19495_ip = 271; continue _fun19495;
case 266:
        r22 = r0.greenDeep;
case 271:
        r2 = r13 == r1;
        r4 = undefined;
        if(r2) { _fun19495_ip = 285; continue _fun19495 }
case 280:
        r4 = r13.key;
case 285:
        r14 = 'trending-up';
        r2 = 'meglio';
        if(!(r4 !== r2)) { _fun19495_ip = 330; continue _fun19495 }
case 297:
        r4 = r13 == r1;
        r7 = undefined;
        if(r4) { _fun19495_ip = 311; continue _fun19495 }
case 306:
        r7 = r13.key;
case 311:
        r4 = 'remove';
        r6 = 'margine';
        if(!(r7 === r6)) { _fun19495_ip = 327; continue _fun19495 }
case 323:
        r4 = 'trending-down';
case 327:
        r14 = r4;
case 330:
        r4 = r13 == r1;
        r1 = undefined;
        if(r4) { _fun19495_ip = 344; continue _fun19495 }
case 339:
        r1 = r13.key;
case 344:
        if(!(r1 !== r2)) { _fun19495_ip = 355; continue _fun19495 }
case 348:
        r12 = r0.inkSoft;
        _fun19495_ip = 360; continue _fun19495;
case 355:
        r12 = r0.greenDeep;
case 360:
        r0 = _env_r17_slot8;
        r2 = r0.jsxs;
        r0 = _env_r17_slot2;
        r1 = r0.View;
        r0 = {};
        r6 = r20.box;
        r4 = new Array(2);
        r4[0] = r6;
        r4[1] = r5;
        r0['style'] = r4;
        r4 = _env_r17_slot8;
        r6 = r4.jsxs;
        r4 = _env_r17_slot2;
        r5 = r4.View;
        r4 = {};
        r7 = r20.heroRow;
        r4['style'] = r7;
        r7 = _env_r17_slot8;
        r9 = r7.jsx;
        r7 = _env_r17_slot2;
        r8 = r7.Text;
        r7 = {};
        r10 = r20.emoji;
        r7['style'] = r10;
        r11 = r24 >= r23;
        r10 = '🌱';
        if(!r11) { _fun19495_ip = 477; continue _fun19495 }
case 473:
        r10 = '🔥';
case 477:
        r7['children'] = r10;
        r8 = r9.bind(r3)(r8, r7);
        r7 = new Array(2);
        r7[0] = r8;
        r8 = _env_r17_slot8;
        r10 = r8.jsxs;
        r8 = _env_r17_slot2;
        r9 = r8.View;
        r8 = {};
        r11 = {};
        r11['flex'] = r23;
        r8['style'] = r11;
        r11 = _env_r17_slot8;
        r16 = r11.jsx;
        r11 = _env_r17_slot2;
        r15 = r11.Text;
        r11 = {};
        r21 = r20.heroT;
        r11['style'] = r21;
        if(!(!(r24 >= r23))) { _fun19495_ip = 570; continue _fun19495 }
case 559:
        r21 = 'progressi.costanzaZeroT';
        r21 = r18.bind(r3)(r21);
        _fun19495_ip = 587; continue _fun19495;
case 570:
        r26 = {};
        r26['count'] = r24;
        r25 = 'progressi.costanzaN';
        r21 = r18.bind(r3)(r25, r26);
case 587:
        r11['children'] = r21;
        r15 = r16.bind(r3)(r15, r11);
        r11 = new Array(2);
        r11[0] = r15;
        r15 = _env_r17_slot8;
        r21 = r15.jsx;
        r15 = _env_r17_slot2;
        r16 = r15.Text;
        r15 = {};
        r25 = r20.heroSub;
        r15['style'] = r25;
        if(!(!(r24 >= r23))) { _fun19495_ip = 650; continue _fun19495 }
case 639:
        r23 = 'progressi.costanzaZeroSub';
        r23 = r18.bind(r3)(r23);
        _fun19495_ip = 659; continue _fun19495;
case 650:
        r24 = 'progressi.costanzaSub';
        r23 = r18.bind(r3)(r24);
case 659:
        r15['children'] = r23;
        r15 = r21.bind(r3)(r16, r15);
        r11[1] = r15;
        r8['children'] = r11;
        r8 = r10.bind(r3)(r9, r8);
        r7[1] = r8;
        r4['children'] = r7;
        r5 = r6.bind(r3)(r5, r4);
        r4 = new Array(3);
        r4[0] = r5;
        r5 = r13;
        if(!r5) { _fun19495_ip = 874; continue _fun19495 }
case 714:
        r6 = _env_r17_slot8;
        r8 = r6.jsxs;
        r6 = _env_r17_slot2;
        r7 = r6.View;
        r6 = {};
        r9 = r20.andRow;
        r6['style'] = r9;
        r9 = _env_r17_slot8;
        r11 = r9.jsx;
        r9 = _env_r17_slot4;
        r10 = r9.Ionicons;
        r9 = {};
        r9['name'] = r14;
        r14 = 16;
        r9['size'] = r14;
        r9['color'] = r12;
        r10 = r11.bind(r3)(r10, r9);
        r9 = new Array(2);
        r9[0] = r10;
        r10 = _env_r17_slot8;
        r12 = r10.jsx;
        r10 = _env_r17_slot2;
        r11 = r10.Text;
        r10 = {};
        r14 = r20.andTxt;
        r10['style'] = r14;
        r14 = _env_r17_slot9;
        r13 = r13.key;
        r14 = r14.bind(r3)(r13);
        r13 = 'progressi.andamento';
        r13 = r13 + r14;
        r13 = r18.bind(r3)(r13);
        r10['children'] = r13;
        r10 = r12.bind(r3)(r11, r10);
        r9[1] = r10;
        r6['children'] = r9;
        r5 = r8.bind(r3)(r7, r6);
case 874:
        r4[1] = r5;
        r5 = _env_r17_slot8;
        r7 = r5.jsxs;
        r5 = _env_r17_slot2;
        r6 = r5.View;
        r5 = {};
        r8 = r20.bilRow;
        r5['style'] = r8;
        r8 = _env_r17_slot8;
        r10 = r8.jsx;
        r8 = _env_r17_slot2;
        r9 = r8.Text;
        r8 = {};
        r11 = r20.bilLbl;
        r8['style'] = r11;
        r11 = 'progressi.bilancioLbl';
        r11 = r18.bind(r3)(r11);
        r8['children'] = r11;
        r9 = r10.bind(r3)(r9, r8);
        r8 = new Array(2);
        r8[0] = r9;
        r10 = _env_r17_slot8;
        if(r19) { _fun19495_ip = 1022; continue _fun19495 }
case 972:
        r12 = r10.jsx;
        r9 = _env_r17_slot2;
        r11 = r9.Text;
        r9 = {};
        r13 = r20.bilVuoto;
        r9['style'] = r13;
        r13 = 'progressi.bilancioVuoto';
        r13 = r18.bind(r3)(r13);
        r9['children'] = r13;
        r9 = r12.bind(r3)(r11, r9);
        _fun19495_ip = 1204; continue _fun19495;
case 1022:
        r12 = r10.jsxs;
        r10 = _env_r17_slot2;
        r11 = r10.View;
        r10 = {};
        r13 = r20.bilPill;
        r10['style'] = r13;
        r13 = _env_r17_slot8;
        r15 = r13.jsx;
        r13 = _env_r17_slot2;
        r14 = r13.View;
        r13 = {};
        r21 = r20.bilDot;
        r16 = new Array(2);
        r16[0] = r21;
        r21 = {};
        r21['backgroundColor'] = r22;
        r16[1] = r21;
        r13['style'] = r16;
        r14 = r15.bind(r3)(r14, r13);
        r13 = new Array(2);
        r13[0] = r14;
        r14 = _env_r17_slot8;
        r16 = r14.jsx;
        r14 = _env_r17_slot2;
        r15 = r14.Text;
        r14 = {};
        r21 = r20.bilVal;
        r20 = new Array(2);
        r20[0] = r21;
        r21 = {};
        r21['color'] = r22;
        r20[1] = r21;
        r14['style'] = r20;
        r17 = _env_r17_slot9;
        r19 = r17.bind(r3)(r19);
        r17 = 'progressi.bil';
        r17 = r17 + r19;
        r17 = r18.bind(r3)(r17);
        r14['children'] = r17;
        r14 = r16.bind(r3)(r15, r14);
        r13[1] = r14;
        r10['children'] = r13;
        r9 = r12.bind(r3)(r11, r10);
case 1204:
        r8[1] = r9;
        r5['children'] = r8;
        r5 = r7.bind(r3)(r6, r5);
        r4[2] = r5;
        r0['children'] = r4;
        r0 = r2.bind(r3)(r1, r0);
        return r0;
    }
}
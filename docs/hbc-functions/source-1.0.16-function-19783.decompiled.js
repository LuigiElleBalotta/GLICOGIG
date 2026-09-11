function QuizScreen(a0) {
    _fun19783: for(var _fun19783_ip = 0; ; ) switch(_fun19783_ip) {
case 0:
        r0 = a0;
        r0 = r0.navigation;
        var _closure0_slot0 = r0;
        r0 = _env_r12_slot10;
        r0 = r0.useColors;
        r3 = undefined;
        r21 = r0.bind(r3)();
        var _closure0_slot1 = r21;
        r0 = _env_r12_slot10;
        r1 = r0.useThemedStyles;
        r0 = _env_r12_slot16;
        r18 = r1.bind(r3)(r0);
        var _closure0_slot2 = r18;
        r0 = _env_r12_slot10;
        r1 = r0.impatto;
        r0 = 'alto';
        r0 = r1.bind(r3)(r0, r21);
        r0 = r0.color;
        var _closure0_slot3 = r0;
        r0 = _env_r12_slot4;
        r2 = r0.useMemo;
        r1 = function() { // Environment: r13
            r0 = _env_r0_slot12;
            r1 = r0.quizDelGiorno;
            r0 = undefined;
            r0 = r1.bind(r0)();
            return r0;
        };
        r0 = new Array(0);
        r19 = r2.bind(r3)(r1, r0);
        var _closure0_slot4 = r19;
        r0 = _env_r12_slot4;
        r0 = r0.useState;
        r15 = null;
        r1 = r0.bind(r3)(r15);
        r0 = _env_r12_slot3;
        r0 = r0.default;
        r6 = 2;
        r0 = r0.bind(r3)(r1, r6);
        r28 = 0;
        r16 = r0[r28];
        var _closure0_slot5 = r16;
        r22 = 1;
        r0 = r0[r22];
        var _closure0_slot6 = r0;
        r0 = _env_r12_slot4;
        r0 = r0.useState;
        r1 = 'intro';
        r2 = r0.bind(r3)(r1);
        r0 = _env_r12_slot3;
        r0 = r0.default;
        r0 = r0.bind(r3)(r2, r6);
        r2 = r0[r28];
        r0 = r0[r22];
        var _closure0_slot7 = r0;
        r0 = _env_r12_slot14;
        r0 = r0.useTf;
        r33 = r0.bind(r3)();
        r0 = _env_r12_slot14;
        r0 = r0.useT;
        r17 = r0.bind(r3)();
        r0 = _env_r12_slot4;
        r0 = r0.useState;
        r4 = r0.bind(r3)(r28);
        r0 = _env_r12_slot3;
        r0 = r0.default;
        r0 = r0.bind(r3)(r4, r6);
        r20 = r0[r28];
        var _closure0_slot8 = r20;
        r0 = r0[r22];
        var _closure0_slot9 = r0;
        r0 = _env_r12_slot4;
        r0 = r0.useState;
        r4 = r0.bind(r3)(r15);
        r0 = _env_r12_slot3;
        r0 = r0.default;
        r4 = r0.bind(r3)(r4, r6);
        r0 = r4[r28];
        var _closure0_slot10 = r0;
        r4 = r4[r22];
        var _closure0_slot11 = r4;
        r4 = _env_r12_slot4;
        r4 = r4.useState;
        r5 = r4.bind(r3)(r28);
        r4 = _env_r12_slot3;
        r4 = r4.default;
        r4 = r4.bind(r3)(r5, r6);
        r24 = r4[r28];
        var _closure0_slot12 = r24;
        r4 = r4[r22];
        var _closure0_slot13 = r4;
        r4 = _env_r12_slot4;
        r6 = r4.useEffect;
        r5 = function() { // Environment: r13
            r0 = _env_r0_slot12;
            r1 = r0.statoQuiz;
            r0 = undefined;
            r3 = r1.bind(r0)();
            r2 = r3.then;
            r1 = _closure0_slot6;
            r1 = r2.bind(r3)(r1);
            return r0;
        };
        r4 = new Array(0);
        r4 = r6.bind(r3)(r5, r4);
        r11 = function() { // Original name: inizia, environment: r13
            r2 = _closure0_slot9;
            r0 = undefined;
            r3 = 0;
            r2 = r2.bind(r0)(r3);
            r4 = _closure0_slot11;
            r2 = null;
            r2 = r4.bind(r0)(r2);
            r2 = _closure0_slot13;
            r2 = r2.bind(r0)(r3);
            r2 = _closure0_slot7;
            r1 = 'gioca';
            r1 = r2.bind(r0)(r1);
            return r0;
        };
        r4 = function(a0) { // Original name: rispondi, environment: r13
            _fun19787: for(var _fun19787_ip = 0; ; ) switch(_fun19787_ip) {
case 0:
                r4 = a0;
                r2 = _closure0_slot10;
                r0 = null;
                if(!(r2 == r0)) { _fun19787_ip = 130; continue _fun19787 }
case 18:
                r2 = _closure0_slot11;
                r0 = undefined;
                r2 = r2.bind(r0)(r4);
                r5 = _closure0_slot4;
                r2 = _closure0_slot8;
                r2 = r5[r2];
                r2 = r2.corretta;
                r2 = r4 === r2;
                if(!r2) { _fun19787_ip = 67; continue _fun19787 }
case 53:
                r4 = _closure0_slot13;
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
        };
        var _closure0_slot14 = r4;
        r4 = function() { // Environment: r13
            r1 = _env_r1_slot2;
            r3 = r1.default;
            r2 = undefined;
            r1 = function* () { // Environment: r0
                r0 = function* () { // Original name: ?anon_0_, environment: r0
                    _fun19792: for(var _fun19792_ip = 0; ; ) switch(_fun19792_ip) {
case 0:
                        StartGenerator();
                        ResumeGenerator(result_out_reg=0, return_bool_out_reg=1);
                        if(r1) { _fun19792_ip = 147; continue _fun19792 }
case 10:
                        r2 = _closure0_slot8;
                        r3 = 1;
                        r4 = r2 + r3;
                        r2 = _closure0_slot4;
                        r2 = r2.length;
                        if(!(!(r4 < r2))) { _fun19792_ip = 112; continue _fun19792 }
case 37:
                        r2 = _env_r4_slot12;
                        r6 = r2.salvaRisultato;
                        r2 = _closure0_slot12;
                        r5 = undefined;
                        r2 = r6.bind(r5)(r2);
                        SaveGenerator(address=65);
case 63:
                        return r2;
case 65:
                        ResumeGenerator(result_out_reg=2, return_bool_out_reg=6);
                        if(r6) { _fun19792_ip = 109; continue _fun19792 }
case 71:
                        r6 = _closure0_slot6;
                        r6 = r6.bind(r5)(r2);
                        r7 = _closure0_slot7;
                        r6 = 'fine';
                        r6 = r7.bind(r5)(r6);
                        r4 = _env_r4_slot13;
                        r4 = r4.momentoFelice;
                        r4 = r4.bind(r5)();
                        _fun19792_ip = 142; continue _fun19792;
case 109:
                        return r2;
case 112:
                        r4 = _closure0_slot9;
                        r2 = _closure0_slot8;
                        r2 = r2 + r3;
                        r3 = undefined;
                        r2 = r4.bind(r3)(r2);
                        r2 = _closure0_slot11;
                        r1 = null;
                        r1 = r2.bind(r3)(r1);
case 142:
                        r1 = undefined;
                        return r1;
case 147:
                        return r0;
                    }
                };
                return r0;
            };
            r1 = r3.bind(r2)(r1);
            var _closure1_slot0 = r1;
            r0 = function() { // Original name: avanti, environment: r0
                r0 = undefined;
                r3 = _closure1_slot0;
                r2 = r3.apply;
                r0 = arguments;
                r1 = r0;
                r0 = this;
                r0 = r2.bind(r3)(r0, r1);
                return r0;
            };
            return r0;
        };
        r9 = r4.bind(r3)();
        if(!(r2 !== r1)) { _fun19783_ip = 2653; continue _fun19783 }
case 436:
        r1 = 'fine';
        if(!(r2 !== r1)) { _fun19783_ip = 1785; continue _fun19783 }
case 447:
        r6 = r19[r20];
        var _closure0_slot16 = r6;
        if(r6) { _fun19783_ip = 907; continue _fun19783 }
case 461:
        r1 = _env_r12_slot15;
        r4 = r1.jsx;
        r1 = _env_r12_slot5;
        r2 = r1.ScrollView;
        r1 = {};
        r5 = r18.wrap;
        r1['style'] = r5;
        r5 = r18.pad;
        r1['contentContainerStyle'] = r5;
        r5 = _env_r12_slot15;
        r8 = r5.jsxs;
        r5 = _env_r12_slot5;
        r7 = r5.View;
        r5 = {};
        r10 = r18.hero;
        r5['style'] = r10;
        r10 = _env_r12_slot15;
        r23 = r10.jsx;
        r10 = _env_r12_slot5;
        r14 = r10.View;
        r10 = {};
        r25 = r18.heroIcon;
        r10['style'] = r25;
        r25 = _env_r12_slot15;
        r27 = r25.jsx;
        r25 = _env_r12_slot8;
        r26 = r25.Ionicons;
        r25 = {'name': 'refresh', 'size': 28};
        r29 = r21.greenDeep;
        r25['color'] = r29;
        r25 = r27.bind(r3)(r26, r25);
        r10['children'] = r25;
        r14 = r23.bind(r3)(r14, r10);
        r10 = new Array(4);
        r10[0] = r14;
        r14 = _env_r12_slot15;
        r25 = r14.jsx;
        r14 = _env_r12_slot5;
        r23 = r14.Text;
        r14 = {};
        r26 = r18.h;
        r14['style'] = r26;
        r26 = 'quizS.nonDisp';
        r26 = r17.bind(r3)(r26);
        r14['children'] = r26;
        r14 = r25.bind(r3)(r23, r14);
        r10[1] = r14;
        r14 = _env_r12_slot15;
        r25 = r14.jsx;
        r14 = _env_r12_slot5;
        r23 = r14.Text;
        r14 = {};
        r26 = r18.heroSub;
        r14['style'] = r26;
        r26 = 'quizS.nonDispSub';
        r26 = r17.bind(r3)(r26);
        r14['children'] = r26;
        r14 = r25.bind(r3)(r23, r14);
        r10[2] = r14;
        r14 = _env_r12_slot15;
        r25 = r14.jsxs;
        r14 = _env_r12_slot5;
        r23 = r14.Pressable;
        r14 = {};
        r26 = r18.cta;
        r14['style'] = r26;
        r26 = function() { // Original name: onPress, environment: r13
            r2 = _closure0_slot0;
            r1 = r2.navigate;
            r0 = 'Learn';
            r0 = r1.bind(r2)(r0);
            return r0;
        };
        r14['onPress'] = r26;
        r26 = _env_r12_slot15;
        r29 = r26.jsx;
        r26 = _env_r12_slot8;
        r27 = r26.Ionicons;
        r26 = {'name': 'book-outline', 'size': 19, 'color': '#fff'};
        r27 = r29.bind(r3)(r27, r26);
        r26 = new Array(2);
        r26[0] = r27;
        r27 = _env_r12_slot15;
        r30 = r27.jsx;
        r27 = _env_r12_slot5;
        r29 = r27.Text;
        r27 = {};
        r31 = r18.ctaTxt;
        r27['style'] = r31;
        r31 = 'quizS.tornaImpara';
        r31 = r17.bind(r3)(r31);
        r27['children'] = r31;
        r27 = r30.bind(r3)(r29, r27);
        r26[1] = r27;
        r14['children'] = r26;
        r14 = r25.bind(r3)(r23, r14);
        r10[3] = r14;
        r5['children'] = r10;
        r5 = r8.bind(r3)(r7, r5);
        r1['children'] = r5;
        r1 = r4.bind(r3)(r2, r1);
        return r1;
case 907:
        r5 = r0 != r15;
        var _closure0_slot17 = r5;
        r0 = _env_r12_slot15;
        r2 = r0.jsxs;
        r0 = _env_r12_slot5;
        r1 = r0.ScrollView;
        r0 = {};
        r4 = r18.wrap;
        r0['style'] = r4;
        r4 = r18.pad;
        r0['contentContainerStyle'] = r4;
        r4 = _env_r12_slot15;
        r8 = r4.jsxs;
        r4 = _env_r12_slot5;
        r7 = r4.View;
        r4 = {};
        r10 = r18.progRow;
        r4['style'] = r10;
        r10 = _env_r12_slot15;
        r23 = r10.jsx;
        r10 = _env_r12_slot5;
        r14 = r10.Text;
        r10 = {};
        r25 = r18.progTxt;
        r10['style'] = r25;
        r26 = {};
        r25 = r20 + r22;
        r26['i'] = r25;
        r25 = r19.length;
        r26['n'] = r25;
        r25 = 'quizS.domandaDi';
        r25 = r17.bind(r3)(r25, r26);
        r10['children'] = r25;
        r14 = r23.bind(r3)(r14, r10);
        r10 = new Array(2);
        r10[0] = r14;
        r14 = _env_r12_slot15;
        r25 = r14.jsx;
        r14 = _env_r12_slot5;
        r23 = r14.Text;
        r14 = {};
        r26 = r18.progTxt;
        r14['style'] = r26;
        r27 = {};
        r27['p'] = r24;
        r26 = 'quizS.nGiuste';
        r26 = r17.bind(r3)(r26, r27);
        r14['children'] = r26;
        r14 = r25.bind(r3)(r23, r14);
        r10[1] = r14;
        r4['children'] = r10;
        r7 = r8.bind(r3)(r7, r4);
        r4 = new Array(4);
        r4[0] = r7;
        r7 = _env_r12_slot15;
        r10 = r7.jsx;
        r7 = _env_r12_slot5;
        r8 = r7.View;
        r7 = {};
        r14 = r18.progBar;
        r7['style'] = r14;
        r14 = _env_r12_slot15;
        r25 = r14.jsx;
        r14 = _env_r12_slot5;
        r23 = r14.View;
        r14 = {};
        r27 = r18.progFill;
        r26 = new Array(2);
        r26[0] = r27;
        r27 = {};
        r28 = 0;
        if(!r5) { _fun19783_ip = 1219; continue _fun19783 }
case 1216:
        r28 = r22;
case 1219:
        r29 = r20 + r28;
        r28 = r19.length;
        r29 = r29 / r28;
        r28 = global;
        r28 = r28.HermesInternal;
        r31 = r28.concat;
        r30 = '';
        r28 = 100;
        r29 = r29 * r28;
        r28 = '%';
        r28 = r31.bind(r30)(r29, r28);
        r27['width'] = r28;
        r26[1] = r27;
        r14['style'] = r26;
        r14 = r25.bind(r3)(r23, r14);
        r7['children'] = r14;
        r7 = r10.bind(r3)(r8, r7);
        r4[1] = r7;
        r7 = _env_r12_slot15;
        r10 = r7.jsxs;
        r7 = _env_r12_slot5;
        r8 = r7.View;
        r7 = {};
        r14 = _env_r12_slot15;
        r25 = r14.jsx;
        r14 = _env_r12_slot5;
        r23 = r14.Text;
        r14 = {};
        r26 = r18.dom;
        r14['style'] = r26;
        r26 = 'domanda';
        r26 = r33.bind(r3)(r6, r26);
        r14['children'] = r26;
        r23 = r25.bind(r3)(r23, r14);
        r14 = new Array(3);
        r14[0] = r23;
        r23 = 'opzioni';
        r26 = r33.bind(r3)(r6, r23);
        if(r26) { _fun19783_ip = 1394; continue _fun19783 }
case 1389:
        r26 = r6.opzioni;
case 1394:
        r25 = r26.map;
        r23 = function(a0, a1) { // Environment: r13
            _fun19797: for(var _fun19797_ip = 0; ; ) switch(_fun19797_ip) {
case 0:
                r4 = a1;
                var _closure1_slot0 = r4;
                r1 = _closure0_slot16;
                r1 = r1.corretta;
                r12 = r4 === r1;
                r1 = _closure0_slot10;
                r10 = r4 === r1;
                r1 = _closure0_slot1;
                r3 = r1.line;
                r2 = r1.ink;
                r1 = _closure0_slot17;
                if(!r1) { _fun19797_ip = 57; continue _fun19797 }
case 54:
                if(r12) { _fun19797_ip = 148; continue _fun19797 }
case 57:
                r5 = _closure0_slot17;
                r8 = r3;
                r14 = r2;
                r6 = null;
                if(!r5) { _fun19797_ip = 214; continue _fun19797 }
case 75:
                r8 = r3;
                r14 = r2;
                r6 = null;
                if(!r10) { _fun19797_ip = 214; continue _fun19797 }
case 89:
                r2 = _closure0_slot3;
                r3 = _env_r1_slot15;
                r7 = r3.jsx;
                r1 = _env_r1_slot8;
                r5 = r1.Ionicons;
                r3 = {'name': 'close-circle', 'size': 18};
                r3['color'] = r2;
                r1 = undefined;
                r6 = r7.bind(r1)(r5, r3);
                r8 = r2;
                r14 = r8;
                _fun19797_ip = 214; continue _fun19797;
case 148:
                r1 = _closure0_slot1;
                r8 = r1.green;
                r14 = r1.greenDeep;
                r7 = _env_r5_slot15;
                r9 = r7.jsx;
                r5 = _env_r5_slot8;
                r7 = r5.Ionicons;
                r5 = {'name': 'checkmark-circle', 'size': 18};
                r1 = r1.green;
                r5['color'] = r1;
                r1 = undefined;
                r6 = r9.bind(r1)(r7, r5);
case 214:
                r1 = _env_r11_slot15;
                r3 = r1.jsxs;
                r1 = _env_r11_slot5;
                r2 = r1.Pressable;
                r1 = {};
                r5 = _closure0_slot2;
                r7 = r5.opt;
                r5 = new Array(3);
                r5[0] = r7;
                r7 = {};
                r7['borderColor'] = r8;
                r5[1] = r7;
                r7 = _closure0_slot17;
                if(!r7) { _fun19797_ip = 275; continue _fun19797 }
case 272:
                r7 = !r12;
case 275:
                if(!r7) { _fun19797_ip = 281; continue _fun19797 }
case 278:
                r7 = !r10;
case 281:
                if(!r7) { _fun19797_ip = 294; continue _fun19797 }
case 284:
                r8 = _closure0_slot2;
                r7 = r8.optDim;
case 294:
                r5[2] = r7;
                r1['style'] = r5;
                r0 = function() { // Original name: onPress, environment: r0
                    r2 = _closure0_slot14;
                    r1 = _closure1_slot0;
                    r0 = undefined;
                    r1 = r2.bind(r0)(r1);
                    return r0;
                };
                r1['onPress'] = r0;
                r0 = _closure0_slot17;
                r1['disabled'] = r0;
                r0 = _env_r11_slot15;
                r8 = r0.jsx;
                r0 = _env_r11_slot5;
                r7 = r0.Text;
                r5 = {};
                r0 = _closure0_slot2;
                r9 = r0.optTxt;
                r0 = new Array(2);
                r0[0] = r9;
                r9 = {};
                r9['color'] = r14;
                r13 = _closure0_slot17;
                if(!r13) { _fun19797_ip = 377; continue _fun19797 }
case 371:
                if(r12) { _fun19797_ip = 393; continue _fun19797 }
case 374:
                if(r10) { _fun19797_ip = 393; continue _fun19797 }
case 377:
                r10 = _env_r11_slot10;
                r10 = r10.fonts;
                r10 = r10.body;
                _fun19797_ip = 407; continue _fun19797;
case 393:
                r11 = _env_r11_slot10;
                r11 = r11.fonts;
                r10 = r11.semibold;
case 407:
                r9['fontFamily'] = r10;
                r0[1] = r9;
                r5['style'] = r0;
                r0 = a0;
                r5['children'] = r0;
                r0 = undefined;
                r7 = r8.bind(r0)(r7, r5);
                r5 = new Array(2);
                r5[0] = r7;
                r5[1] = r6;
                r1['children'] = r5;
                r0 = r3.bind(r0)(r2, r1, r4);
                return r0;
            }
        };
        r23 = r25.bind(r26)(r23);
        r14[1] = r23;
        r23 = r5;
        if(!r5) { _fun19783_ip = 1573; continue _fun19783 }
case 1422:
        r25 = _env_r12_slot15;
        r27 = r25.jsx;
        r25 = _env_r12_slot5;
        r26 = r25.View;
        r25 = {};
        r28 = r18.why;
        r25['style'] = r28;
        r28 = _env_r12_slot15;
        r30 = r28.jsxs;
        r28 = _env_r12_slot5;
        r29 = r28.Text;
        r28 = {};
        r31 = r18.whyTxt;
        r28['style'] = r31;
        r31 = _env_r12_slot15;
        r34 = r31.jsx;
        r31 = _env_r12_slot5;
        r32 = r31.Text;
        r31 = {};
        r35 = r18.whyL;
        r31['style'] = r35;
        r35 = 'quiz.perche';
        r35 = r17.bind(r3)(r35);
        r31['children'] = r35;
        r32 = r34.bind(r3)(r32, r31);
        r31 = new Array(2);
        r31[0] = r32;
        r32 = 'spiegazione';
        r32 = r33.bind(r3)(r6, r32);
        r31[1] = r32;
        r28['children'] = r31;
        r28 = r30.bind(r3)(r29, r28);
        r25['children'] = r28;
        r23 = r27.bind(r3)(r26, r25);
case 1573:
        r14[2] = r23;
        r7['children'] = r14;
        r6 = r6.id;
        r6 = r10.bind(r3)(r8, r7, r6);
        r4[2] = r6;
        if(!r5) { _fun19783_ip = 1769; continue _fun19783 }
case 1603:
        r6 = _env_r12_slot15;
        r8 = r6.jsxs;
        r6 = _env_r12_slot5;
        r7 = r6.Pressable;
        r6 = {};
        r10 = r18.cta;
        r6['style'] = r10;
        r6['onPress'] = r9;
        r9 = _env_r12_slot15;
        r14 = r9.jsx;
        r9 = _env_r12_slot5;
        r10 = r9.Text;
        r9 = {};
        r23 = r18.ctaTxt;
        r9['style'] = r23;
        r20 = r20 + r22;
        r19 = r19.length;
        if(!(!(r20 < r19))) { _fun19783_ip = 1690; continue _fun19783 }
case 1679:
        r19 = 'quizS.vediRisultato';
        r19 = r17.bind(r3)(r19);
        _fun19783_ip = 1699; continue _fun19783;
case 1690:
        r20 = 'comune.avanti';
        r19 = r17.bind(r3)(r20);
case 1699:
        r9['children'] = r19;
        r10 = r14.bind(r3)(r10, r9);
        r9 = new Array(2);
        r9[0] = r10;
        r10 = _env_r12_slot15;
        r19 = r10.jsx;
        r10 = _env_r12_slot8;
        r14 = r10.Ionicons;
        r10 = {'name': 'arrow-forward', 'size': 19, 'color': '#fff'};
        r10 = r19.bind(r3)(r14, r10);
        r9[1] = r10;
        r6['children'] = r9;
        r5 = r8.bind(r3)(r7, r6);
case 1769:
        r4[3] = r5;
        r0['children'] = r4;
        r0 = r2.bind(r3)(r1, r0);
        return r0;
case 1785:
        r0 = _env_r12_slot12;
        r0 = r0.livello;
        r22 = r0.bind(r3)(r24);
        var _closure0_slot15 = r22;
        r0 = _env_r12_slot15;
        r2 = r0.jsx;
        r0 = _env_r12_slot5;
        r1 = r0.ScrollView;
        r0 = {};
        r4 = r18.wrap;
        r0['style'] = r4;
        r4 = r18.pad;
        r0['contentContainerStyle'] = r4;
        r4 = _env_r12_slot15;
        r6 = r4.jsxs;
        r4 = _env_r12_slot11;
        r5 = r4.FadeInView;
        r4 = {};
        r7 = _env_r12_slot15;
        r9 = r7.jsxs;
        r7 = _env_r12_slot5;
        r8 = r7.View;
        r7 = {};
        r10 = r18.risultato;
        r7['style'] = r10;
        r10 = _env_r12_slot15;
        r19 = r10.jsx;
        r10 = _env_r12_slot5;
        r14 = r10.Text;
        r10 = {};
        r20 = r18.risEmoji;
        r10['style'] = r20;
        r20 = r22.emoji;
        r10['children'] = r20;
        r14 = r19.bind(r3)(r14, r10);
        r10 = new Array(4);
        r10[0] = r14;
        r14 = _env_r12_slot15;
        r20 = r14.jsxs;
        r14 = _env_r12_slot5;
        r19 = r14.Text;
        r14 = {};
        r23 = r18.risScore;
        r14['style'] = r23;
        r23 = new Array(3);
        r23[0] = r24;
        r24 = ' / ';
        r23[1] = r24;
        r24 = _env_r12_slot12;
        r24 = r24.N_AL_GIORNO;
        r23[2] = r24;
        r14['children'] = r23;
        r14 = r20.bind(r3)(r19, r14);
        r10[1] = r14;
        r14 = _env_r12_slot15;
        r20 = r14.jsx;
        r14 = _env_r12_slot5;
        r19 = r14.Text;
        r14 = {};
        r23 = r18.risLiv;
        r14['style'] = r23;
        r22 = r22.titolo;
        r14['children'] = r22;
        r14 = r20.bind(r3)(r19, r14);
        r10[2] = r14;
        r14 = r16;
        if(!r16) { _fun19783_ip = 2168; continue _fun19783 }
case 2080:
        r19 = _env_r12_slot15;
        r22 = r19.jsx;
        r19 = _env_r12_slot5;
        r20 = r19.Text;
        r19 = {};
        r23 = r18.risStreak;
        r19['style'] = r23;
        r24 = {};
        r23 = r16.streak;
        r24['s'] = r23;
        r23 = r16.record;
        r24['r'] = r23;
        r23 = _env_r12_slot12;
        r23 = r23.N_AL_GIORNO;
        r24['n'] = r23;
        r23 = 'quizS.risStreak';
        r23 = r17.bind(r3)(r23, r24);
        r19['children'] = r23;
        r14 = r22.bind(r3)(r20, r19);
case 2168:
        r10[3] = r14;
        r7['children'] = r10;
        r8 = r9.bind(r3)(r8, r7);
        r7 = new Array(5);
        r7[0] = r8;
        r8 = _env_r12_slot15;
        r10 = r8.jsx;
        r8 = _env_r12_slot6;
        r9 = r8.default;
        r8 = {};
        r14 = 'quizS.condividiRis';
        r14 = r17.bind(r3)(r14);
        r8['label'] = r14;
        r14 = function(a0, a1) { // Original name: renderCard, environment: r13
            _fun19794: for(var _fun19794_ip = 0; ; ) switch(_fun19794_ip) {
case 0:
                r0 = _env_r4_slot15;
                r3 = r0.jsx;
                r0 = _env_r4_slot7;
                r2 = r0.default;
                r1 = {};
                r0 = a1;
                r1['ref'] = r0;
                r5 = _closure0_slot12;
                r1['punti'] = r5;
                r4 = _env_r4_slot12;
                r4 = r4.N_AL_GIORNO;
                r1['totale'] = r4;
                r4 = _closure0_slot15;
                r4 = r4.emoji;
                r1['emoji'] = r4;
                r4 = _closure0_slot15;
                r4 = r4.titolo;
                r1['titolo'] = r4;
                r5 = _closure0_slot5;
                r0 = null;
                r6 = r5 == r0;
                r0 = undefined;
                r4 = undefined;
                if(r6) { _fun19794_ip = 108; continue _fun19794 }
case 102:
                r4 = r5.streak;
case 108:
                r1['streak'] = r4;
                r4 = a0;
                r1['codice'] = r4;
                r0 = r3.bind(r0)(r2, r1);
                return r0;
            }
        };
        r8['renderCard'] = r14;
        r8 = r10.bind(r3)(r9, r8);
        r7[1] = r8;
        r8 = _env_r12_slot15;
        r10 = r8.jsxs;
        r8 = _env_r12_slot5;
        r9 = r8.Pressable;
        r8 = {};
        r14 = r18.ctaGhost;
        r8['style'] = r14;
        r8['onPress'] = r11;
        r14 = _env_r12_slot15;
        r20 = r14.jsx;
        r14 = _env_r12_slot8;
        r19 = r14.Ionicons;
        r14 = {'name': 'refresh', 'size': 18};
        r22 = r21.greenDeep;
        r14['color'] = r22;
        r19 = r20.bind(r3)(r19, r14);
        r14 = new Array(2);
        r14[0] = r19;
        r19 = _env_r12_slot15;
        r22 = r19.jsx;
        r19 = _env_r12_slot5;
        r20 = r19.Text;
        r19 = {};
        r23 = r18.ctaGhostTxt;
        r19['style'] = r23;
        r23 = 'quizS.rifaiAllen';
        r23 = r17.bind(r3)(r23);
        r19['children'] = r23;
        r19 = r22.bind(r3)(r20, r19);
        r14[1] = r19;
        r8['children'] = r14;
        r8 = r10.bind(r3)(r9, r8);
        r7[2] = r8;
        r8 = _env_r12_slot15;
        r10 = r8.jsxs;
        r8 = _env_r12_slot5;
        r9 = r8.Pressable;
        r8 = {};
        r14 = r18.ctaGhost;
        r8['style'] = r14;
        r13 = function() { // Original name: onPress, environment: r13
            r2 = _closure0_slot0;
            r1 = r2.navigate;
            r0 = 'Learn';
            r0 = r1.bind(r2)(r0);
            return r0;
        };
        r8['onPress'] = r13;
        r13 = _env_r12_slot15;
        r19 = r13.jsx;
        r13 = _env_r12_slot8;
        r14 = r13.Ionicons;
        r13 = {'name': 'book-outline', 'size': 18};
        r20 = r21.greenDeep;
        r13['color'] = r20;
        r14 = r19.bind(r3)(r14, r13);
        r13 = new Array(2);
        r13[0] = r14;
        r14 = _env_r12_slot15;
        r20 = r14.jsx;
        r14 = _env_r12_slot5;
        r19 = r14.Text;
        r14 = {};
        r22 = r18.ctaGhostTxt;
        r14['style'] = r22;
        r22 = 'quizS.tornaImpara';
        r22 = r17.bind(r3)(r22);
        r14['children'] = r22;
        r14 = r20.bind(r3)(r19, r14);
        r13[1] = r14;
        r8['children'] = r13;
        r8 = r10.bind(r3)(r9, r8);
        r7[3] = r8;
        r8 = _env_r12_slot15;
        r10 = r8.jsx;
        r8 = _env_r12_slot5;
        r9 = r8.Text;
        r8 = {};
        r13 = r18.torna;
        r8['style'] = r13;
        r14 = {};
        r13 = _env_r12_slot12;
        r13 = r13.N_AL_GIORNO;
        r14['n'] = r13;
        r13 = 'quizS.tornaDomani';
        r13 = r17.bind(r3)(r13, r14);
        r8['children'] = r13;
        r8 = r10.bind(r3)(r9, r8);
        r7[4] = r8;
        r4['children'] = r7;
        r4 = r6.bind(r3)(r5, r4);
        r0['children'] = r4;
        r0 = r2.bind(r3)(r1, r0);
        return r0;
case 2653:
        r0 = _env_r12_slot15;
        r2 = r0.jsx;
        r0 = _env_r12_slot5;
        r1 = r0.ScrollView;
        r0 = {};
        r4 = r18.wrap;
        r0['style'] = r4;
        r4 = r18.pad;
        r0['contentContainerStyle'] = r4;
        r4 = _env_r12_slot15;
        r6 = r4.jsxs;
        r4 = _env_r12_slot11;
        r5 = r4.FadeInView;
        r4 = {};
        r7 = _env_r12_slot15;
        r9 = r7.jsxs;
        r7 = _env_r12_slot5;
        r8 = r7.View;
        r7 = {};
        r10 = r18.hero;
        r7['style'] = r10;
        r10 = _env_r12_slot15;
        r14 = r10.jsx;
        r10 = _env_r12_slot5;
        r13 = r10.Image;
        r10 = {};
        r20 = _env_r12_slot0;
        r22 = _env_r12_slot1;
        r19 = 14;
        r19 = r22[r19];
        r19 = r20.bind(r3)(r19);
        r10['source'] = r19;
        r19 = r18.heroIcon;
        r10['style'] = r19;
        r19 = 'cover';
        r10['resizeMode'] = r19;
        r13 = r14.bind(r3)(r13, r10);
        r10 = new Array(3);
        r10[0] = r13;
        r13 = _env_r12_slot15;
        r19 = r13.jsx;
        r13 = _env_r12_slot5;
        r14 = r13.Text;
        r13 = {};
        r20 = r18.h;
        r13['style'] = r20;
        r20 = 'learn.quizTitolo';
        r20 = r17.bind(r3)(r20);
        r13['children'] = r20;
        r13 = r19.bind(r3)(r14, r13);
        r10[1] = r13;
        r13 = _env_r12_slot15;
        r19 = r13.jsx;
        r13 = _env_r12_slot5;
        r14 = r13.Text;
        r13 = {};
        r20 = r18.heroSub;
        r13['style'] = r20;
        r22 = {};
        r20 = _env_r12_slot12;
        r20 = r20.N_AL_GIORNO;
        r22['n'] = r20;
        r20 = 'quizS.heroSub';
        r20 = r17.bind(r3)(r20, r22);
        r13['children'] = r20;
        r13 = r19.bind(r3)(r14, r13);
        r10[2] = r13;
        r7['children'] = r10;
        r8 = r9.bind(r3)(r8, r7);
        r7 = new Array(4);
        r7[0] = r8;
        r8 = r16;
        if(!r8) { _fun19783_ip = 3368; continue _fun19783 }
case 2976:
        r9 = _env_r12_slot15;
        r13 = r9.jsxs;
        r9 = _env_r12_slot5;
        r10 = r9.View;
        r9 = {};
        r14 = r18.statRow;
        r9['style'] = r14;
        r14 = _env_r12_slot15;
        r20 = r14.jsxs;
        r14 = _env_r12_slot5;
        r19 = r14.View;
        r14 = {};
        r22 = r18.stat;
        r14['style'] = r22;
        r22 = _env_r12_slot15;
        r24 = r22.jsxs;
        r22 = _env_r12_slot5;
        r23 = r22.Text;
        r22 = {};
        r25 = r18.statN;
        r22['style'] = r25;
        r26 = r16.streak;
        r25 = new Array(2);
        r25[0] = r26;
        r26 = '🔥';
        r25[1] = r26;
        r22['children'] = r25;
        r23 = r24.bind(r3)(r23, r22);
        r22 = new Array(2);
        r22[0] = r23;
        r23 = _env_r12_slot15;
        r25 = r23.jsx;
        r23 = _env_r12_slot5;
        r24 = r23.Text;
        r23 = {};
        r26 = r18.statL;
        r23['style'] = r26;
        r26 = 'quizS.giorniFila';
        r26 = r17.bind(r3)(r26);
        r23['children'] = r26;
        r23 = r25.bind(r3)(r24, r23);
        r22[1] = r23;
        r14['children'] = r22;
        r19 = r20.bind(r3)(r19, r14);
        r14 = new Array(2);
        r14[0] = r19;
        r19 = _env_r12_slot15;
        r22 = r19.jsxs;
        r19 = _env_r12_slot5;
        r20 = r19.View;
        r19 = {};
        r23 = r18.stat;
        r19['style'] = r23;
        r23 = _env_r12_slot15;
        r25 = r23.jsxs;
        r23 = _env_r12_slot5;
        r24 = r23.Text;
        r23 = {};
        r26 = r18.statN;
        r23['style'] = r26;
        r27 = r16.record;
        r26 = new Array(3);
        r26[0] = r27;
        r27 = '/';
        r26[1] = r27;
        r27 = _env_r12_slot12;
        r27 = r27.N_AL_GIORNO;
        r26[2] = r27;
        r23['children'] = r26;
        r24 = r25.bind(r3)(r24, r23);
        r23 = new Array(2);
        r23[0] = r24;
        r24 = _env_r12_slot15;
        r26 = r24.jsx;
        r24 = _env_r12_slot5;
        r25 = r24.Text;
        r24 = {};
        r27 = r18.statL;
        r24['style'] = r27;
        r27 = 'quizS.record';
        r27 = r17.bind(r3)(r27);
        r24['children'] = r27;
        r24 = r26.bind(r3)(r25, r24);
        r23[1] = r24;
        r19['children'] = r23;
        r19 = r22.bind(r3)(r20, r19);
        r14[1] = r19;
        r9['children'] = r14;
        r8 = r13.bind(r3)(r10, r9);
case 3368:
        r7[1] = r8;
        r8 = r16 == r15;
        r9 = undefined;
        if(r8) { _fun19783_ip = 3387; continue _fun19783 }
case 3381:
        r9 = r16.fattoOggi;
case 3387:
        r8 = null;
        if(!r9) { _fun19783_ip = 3572; continue _fun19783 }
case 3395:
        r9 = _env_r12_slot15;
        r13 = r9.jsxs;
        r9 = _env_r12_slot5;
        r10 = r9.View;
        r9 = {};
        r14 = r18.gia;
        r9['style'] = r14;
        r14 = _env_r12_slot15;
        r20 = r14.jsx;
        r14 = _env_r12_slot8;
        r19 = r14.Ionicons;
        r14 = {'name': 'checkmark-circle', 'size': 18};
        r21 = r21.greenDeep;
        r14['color'] = r21;
        r19 = r20.bind(r3)(r19, r14);
        r14 = new Array(2);
        r14[0] = r19;
        r19 = _env_r12_slot15;
        r21 = r19.jsx;
        r19 = _env_r12_slot5;
        r20 = r19.Text;
        r19 = {};
        r22 = r18.giaTxt;
        r19['style'] = r22;
        r23 = {};
        r22 = r16.punteggioOggi;
        r23['p'] = r22;
        r22 = _env_r12_slot12;
        r22 = r22.N_AL_GIORNO;
        r23['n'] = r22;
        r22 = 'quizS.gia';
        r22 = r17.bind(r3)(r22, r23);
        r19['children'] = r22;
        r19 = r21.bind(r3)(r20, r19);
        r14[1] = r19;
        r9['children'] = r14;
        r8 = r13.bind(r3)(r10, r9);
case 3572:
        r7[2] = r8;
        r8 = _env_r12_slot15;
        r10 = r8.jsxs;
        r8 = _env_r12_slot5;
        r9 = r8.Pressable;
        r8 = {};
        r13 = r18.cta;
        r8['style'] = r13;
        r8['onPress'] = r11;
        r11 = _env_r12_slot15;
        r14 = r11.jsx;
        r11 = _env_r12_slot8;
        r13 = r11.Ionicons;
        r11 = {'name': 'play', 'size': 20, 'color': '#fff'};
        r13 = r14.bind(r3)(r13, r11);
        r11 = new Array(2);
        r11[0] = r13;
        r13 = _env_r12_slot15;
        r14 = r13.jsx;
        r12 = _env_r12_slot5;
        r13 = r12.Text;
        r12 = {};
        r18 = r18.ctaTxt;
        r12['style'] = r18;
        r18 = r16 == r15;
        r15 = undefined;
        if(r18) { _fun19783_ip = 3700; continue _fun19783 }
case 3694:
        r15 = r16.fattoOggi;
case 3700:
        if(r15) { _fun19783_ip = 3714; continue _fun19783 }
case 3703:
        r15 = 'quizS.inizia';
        r15 = r17.bind(r3)(r15);
        _fun19783_ip = 3723; continue _fun19783;
case 3714:
        r16 = 'quizS.rifai';
        r15 = r17.bind(r3)(r16);
case 3723:
        r12['children'] = r15;
        r12 = r14.bind(r3)(r13, r12);
        r11[1] = r12;
        r8['children'] = r11;
        r8 = r10.bind(r3)(r9, r8);
        r7[3] = r8;
        r4['children'] = r7;
        r4 = r6.bind(r3)(r5, r4);
        r0['children'] = r4;
        r0 = r2.bind(r3)(r1, r0);
        return r0;
    }
}
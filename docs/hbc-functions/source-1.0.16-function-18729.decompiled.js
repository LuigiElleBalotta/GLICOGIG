function FoodDetailScreen(a0) {
    _fun18729: for(var _fun18729_ip = 0; ; ) switch(_fun18729_ip) {
case 0:
        r0 = a0;
        r1 = r0.route;
        r0 = r0.navigation;
        var _closure0_slot0 = r0;
        r0 = _env_r8_slot6;
        r0 = r0.useColors;
        r3 = undefined;
        r18 = r0.bind(r3)();
        r0 = _env_r8_slot6;
        r2 = r0.useThemedStyles;
        r0 = _env_r8_slot35;
        r11 = r2.bind(r3)(r0);
        var _closure0_slot1 = r11;
        r0 = _env_r8_slot30;
        r0 = r0.useTf;
        r17 = r0.bind(r3)();
        var _closure0_slot2 = r17;
        r0 = _env_r8_slot30;
        r0 = r0.useT;
        r12 = r0.bind(r3)();
        var _closure0_slot3 = r12;
        r0 = _env_r8_slot5;
        r2 = r0.alimentoById;
        r0 = r1.params;
        r0 = r0.id;
        r16 = r2.bind(r3)(r0);
        var _closure0_slot4 = r16;
        r0 = _env_r8_slot2;
        r0 = r0.useState;
        r2 = false;
        r5 = r0.bind(r3)(r2);
        r0 = _env_r8_slot1;
        r0 = r0.default;
        r4 = 2;
        r0 = r0.bind(r3)(r5, r4);
        r44 = 0;
        r25 = r0[r44];
        r7 = 1;
        r0 = r0[r7];
        var _closure0_slot5 = r0;
        r0 = _env_r8_slot2;
        r0 = r0.useState;
        r2 = r0.bind(r3)(r2);
        r0 = _env_r8_slot1;
        r0 = r0.default;
        r0 = r0.bind(r3)(r2, r4);
        r27 = r0[r44];
        r0 = r0[r7];
        var _closure0_slot6 = r0;
        r0 = _env_r8_slot2;
        r0 = r0.useState;
        r34 = null;
        r2 = r0.bind(r3)(r34);
        r0 = _env_r8_slot1;
        r0 = r0.default;
        r0 = r0.bind(r3)(r2, r4);
        r6 = r0[r44];
        r0 = r0[r7];
        var _closure0_slot7 = r0;
        r0 = _env_r8_slot2;
        r2 = r0.useState;
        r0 = 'g';
        r5 = r2.bind(r3)(r0);
        r2 = _env_r8_slot1;
        r2 = r2.default;
        r2 = r2.bind(r3)(r5, r4);
        r47 = r2[r44];
        var _closure0_slot8 = r47;
        r2 = r2[r7];
        var _closure0_slot9 = r2;
        r2 = _env_r8_slot2;
        r5 = r2.useEffect;
        r1 = r1.params;
        r1 = r1.id;
        r2 = new Array(1);
        r2[0] = r1;
        r1 = function() { // Environment: r14
            _fun18730: for(var _fun18730_ip = 0; ; ) switch(_fun18730_ip) {
case 0:
                r0 = _closure0_slot4;
                if(!r0) { _fun18730_ip = 46; continue _fun18730 }
case 10:
                r0 = _env_r0_slot28;
                r2 = r0.getFav;
                r0 = undefined;
                r3 = r2.bind(r0)();
                r2 = r3.then;
                r0 = function(a0) { // Environment: r0
                    r2 = _closure0_slot5;
                    r1 = a0;
                    r3 = r1.alimenti;
                    r1 = r3.includes;
                    r0 = _closure0_slot4;
                    r0 = r0.id;
                    r1 = r1.bind(r3)(r0);
                    r0 = undefined;
                    r0 = r2.bind(r0)(r1);
                    return r0;
                };
                r0 = r2.bind(r3)(r0);
case 46:
                r3 = _closure0_slot7;
                r0 = undefined;
                r2 = null;
                r2 = r3.bind(r0)(r2);
                r2 = _closure0_slot9;
                r1 = 'g';
                r1 = r2.bind(r0)(r1);
                r1 = _closure0_slot29;
                r1 = r1.momentoFelice;
                r1 = r1.bind(r0)();
                return r0;
            }
        };
        r1 = r5.bind(r3)(r1, r2);
        r1 = function() { // Environment: r14
            r1 = _env_r1_slot0;
            r3 = r1.default;
            r2 = undefined;
            r1 = function* () { // Environment: r0
                r0 = function* () { // Original name: ?anon_0_, environment: r0
                    _fun18734: for(var _fun18734_ip = 0; ; ) switch(_fun18734_ip) {
case 0:
                        StartGenerator();
                        ResumeGenerator(result_out_reg=0, return_bool_out_reg=1);
                        if(r1) { _fun18734_ip = 118; continue _fun18734 }
case 7:
                        r4 = _env_r2_slot4;
                        r3 = r4.impactAsync;
                        r1 = _env_r2_slot4;
                        r1 = r1.ImpactFeedbackStyle;
                        r1 = r1.Light;
                        r4 = r3.bind(r4)(r1);
                        r3 = r4.catch;
                        r1 = function() { // Environment: r1
                            r0 = undefined;
                            return r0;
                        };
                        r1 = r3.bind(r4)(r1);
                        r3 = _closure0_slot5;
                        r2 = _env_r2_slot28;
                        r5 = r2.toggleFav;
                        r1 = _closure0_slot4;
                        r4 = r1.id;
                        r2 = undefined;
                        r1 = 'alimenti';
                        r1 = r5.bind(r2)(r1, r4);
                        SaveGenerator(address=101);
case 99:
                        return r1;
case 101:
                        ResumeGenerator(result_out_reg=1, return_bool_out_reg=4);
                        if(r4) { _fun18734_ip = 115; continue _fun18734 }
case 107:
                        r3 = r3.bind(r2)(r1);
                        return r2;
case 115:
                        return r1;
case 118:
                        return r0;
                    }
                };
                return r0;
            };
            r1 = r3.bind(r2)(r1);
            var _closure1_slot0 = r1;
            r0 = function() { // Original name: toggleFavorito, environment: r0
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
        r19 = r1.bind(r3)();
        if(r16) { _fun18729_ip = 443; continue _fun18729 }
case 362:
        r1 = _env_r8_slot34;
        r5 = r1.jsx;
        r1 = _env_r8_slot3;
        r2 = r1.View;
        r1 = {};
        r9 = r11.wrap;
        r1['style'] = r9;
        r9 = _env_r8_slot34;
        r13 = r9.jsx;
        r9 = _env_r8_slot3;
        r10 = r9.Text;
        r9 = {};
        r15 = 'cibo.nonTrovato';
        r15 = r12.bind(r3)(r15);
        r9['children'] = r15;
        r9 = r13.bind(r3)(r10, r9);
        r1['children'] = r9;
        r1 = r5.bind(r3)(r2, r1);
        return r1;
case 443:
        r1 = _env_r8_slot12;
        r1 = r1.alternativePer;
        r24 = r1.bind(r3)(r16);
        r1 = _env_r8_slot14;
        r1 = r1.metodoAlimento;
        r21 = r1.bind(r3)(r16);
        r1 = _env_r8_slot14;
        r1 = r1.fasciaAlimento;
        r35 = r1.bind(r3)(r16);
        var _closure0_slot10 = r35;
        r1 = _env_r8_slot13;
        r2 = r1.quandoHaSenso;
        r1 = r16.ig_medio;
        r29 = r2.bind(r3)(r35, r1);
        r2 = r16.porzione_standard_g;
        if(r2) { _fun18729_ip = 524; continue _fun18729 }
case 521:
        r2 = 100;
case 524:
        var _closure0_slot11 = r2;
        r33 = global;
        r5 = r33.Math;
        r1 = r5.max;
        if(!(r6 == r34)) { _fun18729_ip = 548; continue _fun18729 }
case 545:
        r6 = r2;
case 548:
        r1 = r1.bind(r5)(r44, r6);
        var _closure0_slot12 = r1;
        r6 = r33.Math;
        r5 = r6.max;
        r38 = r5.bind(r6)(r7, r1);
        var _closure0_slot13 = r38;
        r6 = r2 > r44;
        r5 = r7;
        if(!r6) { _fun18729_ip = 593; continue _fun18729 }
case 589:
        r5 = r38 / r2;
case 593:
        r6 = r16.carico_glicemico_porzione;
        r6 = r6 != r34;
        r43 = null;
        if(!r6) { _fun18729_ip = 643; continue _fun18729 }
case 607:
        r13 = r33.Math;
        r10 = r13.round;
        r6 = r16.carico_glicemico_porzione;
        r6 = r6 * r5;
        r9 = 10;
        r6 = r6 * r9;
        r6 = r10.bind(r13)(r6);
        r43 = r6 / r9;
case 643:
        var _closure0_slot14 = r43;
        r6 = _env_r8_slot26;
        r6 = r6.kcalAlimento;
        r6 = r6.bind(r3)(r16);
        r9 = r6 != r34;
        r36 = null;
        if(!r9) { _fun18729_ip = 691; continue _fun18729 }
case 671:
        r10 = r33.Math;
        r9 = r10.round;
        r6 = r6 * r5;
        r36 = r9.bind(r10)(r6);
case 691:
        var _closure0_slot15 = r36;
        r6 = r16.carboidrati_disponibili_porzione_g;
        r6 = r6 != r34;
        r37 = null;
        if(!r6) { _fun18729_ip = 734; continue _fun18729 }
case 709:
        r10 = r33.Math;
        r9 = r10.round;
        r6 = r16.carboidrati_disponibili_porzione_g;
        r6 = r6 * r5;
        r37 = r9.bind(r10)(r6);
case 734:
        r6 = r16.proteine_g;
        if(!(r6 != r34)) { _fun18729_ip = 775; continue _fun18729 }
case 743:
        r10 = r33.Math;
        r9 = r10.round;
        r6 = r16.proteine_g;
        r13 = r6 * r38;
        r6 = 100;
        r6 = r13 / r6;
        r6 = r9.bind(r10)(r6);
case 775:
        r41 = r35;
        if(!(r5 !== r7)) { _fun18729_ip = 821; continue _fun18729 }
case 782:
        r41 = r35;
        if(!(r43 != r34)) { _fun18729_ip = 821; continue _fun18729 }
case 789:
        r5 = 'basso';
        r6 = 10;
        if(!(!(r43 <= r6))) { _fun18729_ip = 818; continue _fun18729 }
case 800:
        r6 = 'alto';
        r9 = 19;
        if(!(r43 <= r9)) { _fun18729_ip = 815; continue _fun18729 }
case 811:
        r6 = 'medio';
case 815:
        r5 = r6;
case 818:
        r41 = r5;
case 821:
        var _closure0_slot16 = r41;
        r5 = {'trascurabile': 0, 'basso': 1, 'medio': 2, 'alto': 3};
        r6 = r5[r41];
        if(!(r6 == r34)) { _fun18729_ip = 845; continue _fun18729 }
case 843:
        r6 = 0;
case 845:
        r5 = r5[r35];
        if(!(r5 == r34)) { _fun18729_ip = 855; continue _fun18729 }
case 853:
        r5 = 0;
case 855:
        r51 = r35;
        if(!(r6 > r5)) { _fun18729_ip = 865; continue _fun18729 }
case 862:
        r51 = r41;
case 865:
        r49 = r47 === r0;
        r20 = 10;
        r0 = r20;
        if(r49) { _fun18729_ip = 915; continue _fun18729 }
case 878:
        r6 = r33.Math;
        r5 = r6.max;
        r10 = r33.Math;
        r9 = r10.round;
        r4 = r2 / r4;
        r4 = r9.bind(r10)(r4);
        r0 = r5.bind(r6)(r7, r4);
case 915:
        var _closure0_slot17 = r0;
        r0 = r33.String;
        if(r49) { _fun18729_ip = 985; continue _fun18729 }
case 928:
        r6 = r33.Math;
        r5 = r6.round;
        r2 = r1 / r2;
        r4 = 100;
        r2 = r2 * r4;
        r2 = r5.bind(r6)(r2);
        r2 = r2 / r4;
        r6 = r0.bind(r3)(r2);
        r5 = r6.replace;
        r4 = '.';
        r2 = ',';
        r52 = r5.bind(r6)(r4, r2);
        _fun18729_ip = 990; continue _fun18729;
case 985:
        r52 = r0.bind(r3)(r1);
case 990:
        r1 = r16.maturazione;
        r2 = r1 == r34;
        r0 = undefined;
        if(r2) { _fun18729_ip = 1011; continue _fun18729 }
case 1005:
        r0 = r1.sensibile;
case 1011:
        r30 = !r0;
        r0 = r16.ig_medio;
        if(!(r0 == r34)) { _fun18729_ip = 1034; continue _fun18729 }
case 1023:
        r0 = 'cibo.nonApplicabile';
        r45 = r12.bind(r3)(r0);
        _fun18729_ip = 1110; continue _fun18729;
case 1034:
        r10 = r16.ig_min;
        r9 = r16.ig_max;
        r7 = r16.ig_medio;
        r6 = '';
        r5 = r6;
        if(r30) { _fun18729_ip = 1068; continue _fun18729 }
case 1059:
        r0 = 'cibo.acerbaMatura';
        r5 = r12.bind(r3)(r0);
case 1068:
        r0 = r33.HermesInternal;
        r4 = r0.concat;
        r65 = '–';
        r63 = '  (';
        r61 = ')';
        r67 = r6;
        r66 = r10;
        r64 = r9;
        r62 = r7;
        r60 = r5;
        r45 = r67[r4](r66, r65, r64, r63, r62, r61, r60, r59);
case 1110:
        r1 = r16.energia_kcal;
        r0 = ['kcal'];
        r0[1] = r1;
        r23 = new Array(4);
        r23[0] = r0;
        r1 = r16.carboidrati_disponibili_g;
        r0 = ['carbo'];
        r0[1] = r1;
        r23[1] = r0;
        r1 = r16.proteine_g;
        r0 = ['prot'];
        r0[1] = r1;
        r23[2] = r0;
        r1 = r16.fibre_g;
        r0 = ['fibre'];
        r0[1] = r1;
        r23[3] = r0;
        r0 = _env_r8_slot6;
        r0 = r0.impatto;
        r0 = r0.bind(r3)(r51, r18);
        r55 = r0.color;
        r40 = 'fascia.';
        r0 = r40 + r51;
        r1 = r12.bind(r3)(r0);
        r0 = r1.toLowerCase;
        r46 = r0.bind(r1)();
        r0 = _env_r8_slot27;
        r0 = r0.affidabilitaAlimento;
        r50 = r0.bind(r3)(r16);
        r0 = r16.stato_editoriale;
        r39 = 'rivisto';
        r42 = r39;
        if(!(r0 !== r42)) { _fun18729_ip = 1294; continue _fun18729 }
case 1273:
        r2 = r16.stato_editoriale;
        r1 = 'stima';
        r0 = undefined;
        if(!(r2 === r1)) { _fun18729_ip = 1291; continue _fun18729 }
case 1288:
        r0 = r1;
case 1291:
        r42 = r0;
case 1294:
        r0 = r16.carico_glicemico_porzione;
        r10 = r0 != r34;
        r0 = _env_r8_slot15;
        r1 = r0.fattoreCrudo;
        r0 = r16.nome;
        r4 = r1.bind(r3)(r0);
        r58 = null;
        if(!r4) { _fun18729_ip = 1367; continue _fun18729 }
case 1328:
        r0 = r16.carboidrati_disponibili_g;
        r0 = r0 != r34;
        r58 = null;
        if(!r0) { _fun18729_ip = 1367; continue _fun18729 }
case 1342:
        r2 = r33.Math;
        r1 = r2.round;
        r0 = r16.carboidrati_disponibili_g;
        r0 = r0 * r4;
        r58 = r1.bind(r2)(r0);
case 1367:
        r0 = _env_r8_slot34;
        r2 = r0.jsx;
        r0 = _env_r8_slot9;
        r1 = r0.FadeInView;
        r0 = {};
        r4 = r11.wrap;
        r0['style'] = r4;
        r4 = _env_r8_slot34;
        r6 = r4.jsxs;
        r4 = _env_r8_slot3;
        r5 = r4.ScrollView;
        r4 = {};
        r7 = r11.wrap;
        r4['style'] = r7;
        r7 = {};
        r9 = 16;
        r7['padding'] = r9;
        r4['contentContainerStyle'] = r7;
        r7 = _env_r8_slot34;
        r13 = r7.jsxs;
        r7 = _env_r8_slot3;
        r9 = r7.Text;
        r7 = {};
        r15 = r11.cat;
        r7['style'] = r15;
        r15 = 'categoria';
        r22 = r17.bind(r3)(r16, r15);
        r15 = new Array(2);
        r15[0] = r22;
        r26 = r16.sottocategoria;
        r32 = '';
        r22 = r32;
        if(!r26) { _fun18729_ip = 1524; continue _fun18729 }
case 1506:
        r26 = 'sottocategoria';
        r28 = r17.bind(r3)(r16, r26);
        r26 = ' · ';
        r22 = r26 + r28;
case 1524:
        r15[1] = r22;
        r7['children'] = r15;
        r9 = r13.bind(r3)(r9, r7);
        r7 = new Array(20);
        r7[0] = r9;
        r9 = _env_r8_slot34;
        r22 = r9.jsx;
        r9 = _env_r8_slot3;
        r13 = r9.Text;
        r9 = {};
        r15 = r11.h;
        r9['style'] = r15;
        r15 = 'nome';
        r26 = r17.bind(r3)(r16, r15);
        r9['children'] = r26;
        r9 = r22.bind(r3)(r13, r9);
        r7[1] = r9;
        r9 = _env_r8_slot34;
        r22 = r9.jsx;
        r9 = _env_r8_slot3;
        r13 = r9.View;
        r9 = {};
        r48 = 12;
        r26 = {'marginTop': 12, 'marginBottom': 4};
        r9['style'] = r26;
        r26 = _env_r8_slot34;
        r31 = r26.jsx;
        r26 = _env_r8_slot18;
        r28 = r26.default;
        r26 = {};
        r26['fascia'] = r51;
        r26 = r31.bind(r3)(r28, r26);
        r9['children'] = r26;
        r9 = r22.bind(r3)(r13, r9);
        r7[2] = r9;
        r9 = _env_r8_slot34;
        r22 = r9.jsx;
        r9 = _env_r8_slot19;
        r13 = r9.default;
        r9 = {};
        r26 = r16.nome;
        r9['nome'] = r26;
        r9 = r22.bind(r3)(r13, r9);
        r7[3] = r9;
        r9 = _env_r8_slot34;
        r22 = r9.jsxs;
        r9 = _env_r8_slot3;
        r13 = r9.View;
        r9 = {};
        r26 = r11.hero;
        r9['style'] = r26;
        r26 = _env_r8_slot34;
        r31 = r26.jsx;
        r26 = _env_r8_slot8;
        r28 = r26.default;
        r26 = {};
        r51 = r16.carico_glicemico_porzione;
        r26['valore'] = r51;
        r26['fascia'] = r35;
        r28 = r31.bind(r3)(r28, r26);
        r26 = new Array(6);
        r26[0] = r28;
        r28 = _env_r8_slot34;
        r35 = r28.jsx;
        r28 = _env_r8_slot3;
        r31 = r28.Text;
        r28 = {};
        r51 = r11.spiegaSemplice;
        r28['style'] = r51;
        r51 = 'cibo.spiegaSemplice';
        r51 = r12.bind(r3)(r51);
        r28['children'] = r51;
        r28 = r35.bind(r3)(r31, r28);
        r26[1] = r28;
        r28 = _env_r8_slot34;
        r35 = r28.jsx;
        r28 = _env_r8_slot3;
        r31 = r28.Text;
        r28 = {};
        r51 = r11.perPorz;
        r28['style'] = r51;
        r53 = {};
        r51 = r16.porzione_standard_g;
        r53['g'] = r51;
        r51 = 'cibo.perPorzione';
        r51 = r12.bind(r3)(r51, r53);
        r28['children'] = r51;
        r28 = r35.bind(r3)(r31, r28);
        r26[2] = r28;
        r28 = _env_r8_slot34;
        r35 = r28.jsx;
        r28 = _env_r8_slot3;
        r31 = r28.Text;
        r28 = {};
        r51 = r11.ig;
        r28['style'] = r51;
        r51 = {};
        r51['v'] = r45;
        r45 = 'cibo.igLabel';
        r45 = r12.bind(r3)(r45, r51);
        r28['children'] = r45;
        r28 = r35.bind(r3)(r31, r28);
        r26[3] = r28;
        r28 = _env_r8_slot34;
        r35 = r28.jsx;
        r28 = _env_r8_slot21;
        r31 = r28.default;
        r28 = {};
        r45 = _env_r8_slot26;
        r45 = r45.kcalAlimento;
        r45 = r45.bind(r3)(r16);
        r28['kcal'] = r45;
        r51 = true;
        r28['full'] = r51;
        r45 = {};
        r45['marginTop'] = r20;
        r28['style'] = r45;
        r28 = r35.bind(r3)(r31, r28);
        r26[4] = r28;
        r28 = _env_r8_slot34;
        r35 = r28.jsx;
        r28 = _env_r8_slot25;
        r31 = r28.default;
        r28 = {};
        r45 = {};
        r45['marginTop'] = r48;
        r28['style'] = r45;
        r28 = r35.bind(r3)(r31, r28);
        r26[5] = r28;
        r9['children'] = r26;
        r9 = r22.bind(r3)(r13, r9);
        r7[4] = r9;
        r13 = r58 != r34;
        r9 = null;
        if(!r13) { _fun18729_ip = 2597; continue _fun18729 }
case 2113:
        r13 = r16.carboidrati_disponibili_g;
        r13 = r13 != r34;
        r9 = null;
        if(!r13) { _fun18729_ip = 2597; continue _fun18729 }
case 2130:
        r13 = _env_r8_slot34;
        r26 = r13.jsxs;
        r13 = _env_r8_slot3;
        r22 = r13.View;
        r13 = {};
        r28 = r11.cottoCrudo;
        r13['style'] = r28;
        r28 = _env_r8_slot34;
        r35 = r28.jsx;
        r28 = _env_r8_slot7;
        r31 = r28.Ionicons;
        r28 = {'name': 'restaurant-outline', 'size': 17};
        r45 = r18.greenDeep;
        r28['color'] = r45;
        r31 = r35.bind(r3)(r31, r28);
        r28 = new Array(2);
        r28[0] = r31;
        r31 = _env_r8_slot34;
        r45 = r31.jsxs;
        r31 = _env_r8_slot3;
        r35 = r31.Text;
        r31 = {};
        r48 = r11.cottoCrudoTxt;
        r31['style'] = r48;
        r48 = _env_r8_slot34;
        r54 = r48.jsx;
        r48 = _env_r8_slot3;
        r53 = r48.Text;
        r48 = {};
        r56 = {};
        r57 = _env_r8_slot6;
        r57 = r57.fonts;
        r57 = r57.semibold;
        r56['fontFamily'] = r57;
        r57 = r18.ink;
        r56['color'] = r57;
        r48['style'] = r56;
        r56 = 'cibo.valoriCotto';
        r56 = r12.bind(r3)(r56);
        r48['children'] = r56;
        r53 = r54.bind(r3)(r53, r48);
        r48 = new Array(8);
        r48[0] = r53;
        r54 = {};
        r57 = r33.Math;
        r56 = r57.round;
        r53 = r16.carboidrati_disponibili_g;
        r53 = r56.bind(r57)(r53);
        r54['n'] = r53;
        r53 = 'cibo.cottoMid';
        r53 = r12.bind(r3)(r53, r54);
        r48[1] = r53;
        r53 = '\n';
        r48[2] = r53;
        r53 = 'cibo.seLo';
        r53 = r12.bind(r3)(r53);
        r48[3] = r53;
        r53 = _env_r8_slot34;
        r56 = r53.jsx;
        r53 = _env_r8_slot3;
        r54 = r53.Text;
        r53 = {};
        r57 = {};
        r59 = _env_r8_slot6;
        r59 = r59.fonts;
        r59 = r59.semibold;
        r57['fontFamily'] = r59;
        r59 = r18.ink;
        r57['color'] = r59;
        r53['style'] = r57;
        r57 = 'cibo.pesiCrudo';
        r57 = r12.bind(r3)(r57);
        r53['children'] = r57;
        r53 = r56.bind(r3)(r54, r53);
        r48[4] = r53;
        r53 = 'cibo.crudoMid';
        r53 = r12.bind(r3)(r53);
        r48[5] = r53;
        r53 = _env_r8_slot34;
        r56 = r53.jsxs;
        r53 = _env_r8_slot3;
        r54 = r53.Text;
        r53 = {};
        r57 = {};
        r59 = _env_r8_slot6;
        r59 = r59.fonts;
        r59 = r59.semibold;
        r57['fontFamily'] = r59;
        r59 = r18.greenDeep;
        r57['color'] = r59;
        r53['style'] = r57;
        r57 = new Array(2);
        r57[0] = r58;
        r58 = ' g';
        r57[1] = r58;
        r53['children'] = r57;
        r53 = r56.bind(r3)(r54, r53);
        r48[6] = r53;
        r53 = 'cibo.crudoEnd';
        r53 = r12.bind(r3)(r53);
        r48[7] = r53;
        r31['children'] = r48;
        r31 = r45.bind(r3)(r35, r31);
        r28[1] = r31;
        r13['children'] = r28;
        r9 = r26.bind(r3)(r22, r13);
case 2597:
        r7[5] = r9;
        r9 = _env_r8_slot34;
        r22 = r9.jsxs;
        r9 = _env_r8_slot3;
        r13 = r9.View;
        r9 = {};
        r26 = r11.explain;
        r9['style'] = r26;
        r26 = _env_r8_slot34;
        if(r10) { _fun18729_ip = 2688; continue _fun18729 }
case 2638:
        r35 = r26.jsx;
        r28 = _env_r8_slot3;
        r31 = r28.Text;
        r28 = {};
        r45 = r11.explainLine;
        r28['style'] = r45;
        r45 = 'cibo.trascurabile';
        r45 = r12.bind(r3)(r45);
        r28['children'] = r45;
        r28 = r35.bind(r3)(r31, r28);
        _fun18729_ip = 2840; continue _fun18729;
case 2688:
        r35 = r26.jsxs;
        r26 = _env_r8_slot3;
        r31 = r26.Text;
        r26 = {};
        r45 = r11.explainLine;
        r26['style'] = r45;
        r45 = _env_r8_slot34;
        r53 = r45.jsx;
        r45 = _env_r8_slot3;
        r48 = r45.Text;
        r45 = {};
        r54 = {};
        r56 = _env_r8_slot6;
        r56 = r56.fonts;
        r56 = r56.bold;
        r54['fontFamily'] = r56;
        r54['color'] = r55;
        r45['style'] = r54;
        r54 = r16.carico_glicemico_porzione;
        r45['children'] = r54;
        r48 = r53.bind(r3)(r48, r45);
        r45 = new Array(2);
        r45[0] = r48;
        r48 = {};
        r48['f'] = r46;
        r46 = r16.porzione_standard_g;
        r48['g'] = r46;
        r46 = _env_r8_slot27;
        r46 = r46.SCALA_CG;
        r48['scala'] = r46;
        r46 = 'cibo.impattoSu';
        r46 = r12.bind(r3)(r46, r48);
        r45[1] = r46;
        r26['children'] = r45;
        r28 = r35.bind(r3)(r31, r26);
case 2840:
        r26 = new Array(5);
        r26[0] = r28;
        r31 = r16.nota_curatela;
        r28 = null;
        if(!r31) { _fun18729_ip = 2905; continue _fun18729 }
case 2859:
        r31 = _env_r8_slot34;
        r45 = r31.jsx;
        r31 = _env_r8_slot3;
        r35 = r31.Text;
        r31 = {};
        r46 = r11.notaCuratela;
        r31['style'] = r46;
        r46 = r16.nota_curatela;
        r31['children'] = r46;
        r28 = r45.bind(r3)(r35, r31);
case 2905:
        r26[1] = r28;
        r28 = null;
        if(r30) { _fun18729_ip = 2982; continue _fun18729 }
case 2914:
        r30 = _env_r8_slot34;
        r35 = r30.jsx;
        r30 = _env_r8_slot3;
        r31 = r30.Text;
        r30 = {};
        r45 = r11.notaMatura;
        r30['style'] = r45;
        r46 = {};
        r45 = r16.maturazione;
        r45 = r45.nota;
        r46['n'] = r45;
        r45 = 'cibo.maturazione';
        r45 = r12.bind(r3)(r45, r46);
        r30['children'] = r45;
        r28 = r35.bind(r3)(r31, r30);
case 2982:
        r26[2] = r28;
        r28 = _env_r8_slot34;
        r31 = r28.jsxs;
        r28 = _env_r8_slot3;
        r30 = r28.View;
        r28 = {};
        r35 = r11.explainRow;
        r28['style'] = r35;
        r45 = r50;
        if(!r45) { _fun18729_ip = 3053; continue _fun18729 }
case 3022:
        r35 = _env_r8_slot34;
        r48 = r35.jsx;
        r35 = _env_r8_slot10;
        r46 = r35.default;
        r35 = {};
        r35['livello'] = r50;
        r45 = r48.bind(r3)(r46, r35);
case 3053:
        r35 = new Array(3);
        r35[0] = r45;
        r45 = r42;
        if(!r45) { _fun18729_ip = 3098; continue _fun18729 }
case 3067:
        r46 = _env_r8_slot34;
        r50 = r46.jsx;
        r46 = _env_r8_slot11;
        r48 = r46.default;
        r46 = {};
        r46['stato'] = r42;
        r45 = r50.bind(r3)(r48, r46);
case 3098:
        r35[1] = r45;
        r45 = _env_r8_slot34;
        r50 = r45.jsx;
        r45 = _env_r8_slot3;
        r48 = r45.Pressable;
        r46 = {};
        r45 = function() { // Original name: onPress, environment: r14
            r2 = _closure0_slot6;
            r1 = undefined;
            r0 = function(a0) { // Environment: r0
                r0 = a0;
                r0 = !r0;
                return r0;
            };
            r0 = r2.bind(r1)(r0);
            return r0;
        };
        r46['onPress'] = r45;
        r45 = 6;
        r46['hitSlop'] = r45;
        r53 = _env_r8_slot34;
        r55 = r53.jsxs;
        r53 = _env_r8_slot3;
        r54 = r53.Text;
        r53 = {};
        r56 = r11.calcLink;
        r53['style'] = r56;
        if(r27) { _fun18729_ip = 3183; continue _fun18729 }
case 3172:
        r56 = 'ricetta.comeCalcolato';
        r57 = r12.bind(r3)(r56);
        _fun18729_ip = 3192; continue _fun18729;
case 3183:
        r56 = 'ricetta.nascondi';
        r57 = r12.bind(r3)(r56);
case 3192:
        r56 = new Array(2);
        r56[0] = r57;
        r57 = '  ›';
        r56[1] = r57;
        r53['children'] = r56;
        r53 = r55.bind(r3)(r54, r53);
        r46['children'] = r53;
        r46 = r50.bind(r3)(r48, r46);
        r35[2] = r46;
        r28['children'] = r35;
        r28 = r31.bind(r3)(r30, r28);
        r26[3] = r28;
        if(!r27) { _fun18729_ip = 3807; continue _fun18729 }
case 3252:
        r28 = _env_r8_slot34;
        r31 = r28.jsxs;
        r28 = _env_r8_slot3;
        r30 = r28.View;
        r28 = {};
        r35 = r11.calcBox;
        r28['style'] = r35;
        r46 = r10;
        if(!r46) { _fun18729_ip = 3428; continue _fun18729 }
case 3291:
        r35 = _env_r8_slot34;
        r50 = r35.jsxs;
        r35 = _env_r8_slot34;
        r48 = r35.Fragment;
        r35 = {};
        r53 = _env_r8_slot34;
        r55 = r53.jsx;
        r53 = _env_r8_slot3;
        r54 = r53.Text;
        r53 = {};
        r56 = r11.calcT;
        r53['style'] = r56;
        r56 = 'cibo.formulaCG';
        r56 = r12.bind(r3)(r56);
        r53['children'] = r56;
        r54 = r55.bind(r3)(r54, r53);
        r53 = new Array(2);
        r53[0] = r54;
        r54 = _env_r8_slot34;
        r56 = r54.jsx;
        r54 = _env_r8_slot3;
        r55 = r54.Text;
        r54 = {};
        r57 = r11.calcF;
        r54['style'] = r57;
        r57 = r16.formula_cg;
        r54['children'] = r57;
        r54 = r56.bind(r3)(r55, r54);
        r53[1] = r54;
        r35['children'] = r53;
        r46 = r50.bind(r3)(r48, r35);
case 3428:
        r35 = new Array(3);
        r35[0] = r46;
        r46 = _env_r8_slot34;
        r50 = r46.jsxs;
        r46 = _env_r8_slot3;
        r48 = r46.Text;
        r46 = {};
        r53 = r11.calcSrc;
        r46['style'] = r53;
        r54 = {};
        r53 = r16.fonte_macro;
        r54['f'] = r53;
        r53 = 'cibo.macFonte';
        r54 = r12.bind(r3)(r53, r54);
        r53 = new Array(3);
        r53[0] = r54;
        r54 = '\n';
        r53[1] = r54;
        r55 = {};
        r54 = r16.fonte_ig;
        if(r54) { _fun18729_ip = 3522; continue _fun18729 }
case 3513:
        r56 = 'cibo.nonApplicabile';
        r54 = r12.bind(r3)(r56);
case 3522:
        r55['f'] = r54;
        r54 = 'cibo.igFonte';
        r54 = r12.bind(r3)(r54, r55);
        r53[2] = r54;
        r46['children'] = r53;
        r46 = r50.bind(r3)(r48, r46);
        r35[1] = r46;
        if(!(r42 === r39)) { _fun18729_ip = 3583; continue _fun18729 }
case 3558:
        r46 = r16.revisione;
        r48 = r46 == r34;
        r39 = undefined;
        if(r48) { _fun18729_ip = 3577; continue _fun18729 }
case 3572:
        r39 = r46.nota;
case 3577:
        if(r39) { _fun18729_ip = 3726; continue _fun18729 }
case 3583:
        r39 = 'stima';
        if(!(r42 === r39)) { _fun18729_ip = 3613; continue _fun18729 }
case 3591:
        r42 = r16.revisione;
        r46 = r42 == r34;
        r39 = undefined;
        if(r46) { _fun18729_ip = 3610; continue _fun18729 }
case 3605:
        r39 = r42.nota;
case 3610:
        if(r39) { _fun18729_ip = 3674; continue _fun18729 }
case 3613:
        r42 = r16.ig_da_verificare;
        r39 = null;
        if(!r42) { _fun18729_ip = 3672; continue _fun18729 }
case 3623:
        r42 = _env_r8_slot34;
        r48 = r42.jsx;
        r42 = _env_r8_slot3;
        r46 = r42.Text;
        r42 = {};
        r50 = r11.calcNote;
        r42['style'] = r50;
        r50 = 'cibo.igStima';
        r50 = r12.bind(r3)(r50);
        r42['children'] = r50;
        r39 = r48.bind(r3)(r46, r42);
case 3672:
        _fun18729_ip = 3724; continue _fun18729;
case 3674:
        r42 = _env_r8_slot34;
        r48 = r42.jsx;
        r42 = _env_r8_slot3;
        r46 = r42.Text;
        r42 = {};
        r50 = r11.calcNote;
        r42['style'] = r50;
        r50 = r16.revisione;
        r50 = r50.nota;
        r42['children'] = r50;
        r39 = r48.bind(r3)(r46, r42);
case 3724:
        _fun18729_ip = 3793; continue _fun18729;
case 3726:
        r42 = _env_r8_slot34;
        r48 = r42.jsx;
        r42 = _env_r8_slot3;
        r46 = r42.Text;
        r42 = {};
        r50 = r11.calcOk;
        r42['style'] = r50;
        r53 = {};
        r50 = r16.revisione;
        r50 = r50.nota;
        r53['n'] = r50;
        r50 = 'cibo.rivisto';
        r50 = r12.bind(r3)(r50, r53);
        r42['children'] = r50;
        r39 = r48.bind(r3)(r46, r42);
case 3793:
        r35[2] = r39;
        r28['children'] = r35;
        r27 = r31.bind(r3)(r30, r28);
case 3807:
        r26[4] = r27;
        r9['children'] = r26;
        r9 = r22.bind(r3)(r13, r9);
        r7[6] = r9;
        r9 = null;
        if(!r10) { _fun18729_ip = 5180; continue _fun18729 }
case 3833:
        r10 = r16.porzione_standard_g;
        r9 = null;
        if(!r10) { _fun18729_ip = 5180; continue _fun18729 }
case 3846:
        r10 = _env_r8_slot34;
        r22 = r10.jsxs;
        r10 = _env_r8_slot3;
        r13 = r10.View;
        r10 = {};
        r26 = r11.qBlock;
        r10['style'] = r26;
        r26 = _env_r8_slot34;
        r28 = r26.jsx;
        r26 = _env_r8_slot3;
        r27 = r26.Text;
        r26 = {};
        r30 = r11.qLabel;
        r26['style'] = r30;
        r30 = 'cibo.quantita';
        r30 = r12.bind(r3)(r30);
        r26['children'] = r30;
        r27 = r28.bind(r3)(r27, r26);
        r26 = new Array(5);
        r26[0] = r27;
        r27 = _env_r8_slot34;
        r30 = r27.jsxs;
        r27 = _env_r8_slot3;
        r28 = r27.View;
        r27 = {};
        r31 = r11.qRow;
        r27['style'] = r31;
        r31 = _env_r8_slot34;
        r39 = r31.jsx;
        r31 = _env_r8_slot3;
        r35 = r31.Pressable;
        r31 = {};
        r42 = r11.qStep;
        r31['style'] = r42;
        r42 = function() { // Original name: onPress, environment: r14
            r2 = _closure0_slot7;
            r1 = global;
            r4 = r1.Math;
            r3 = r4.max;
            r1 = _closure0_slot12;
            r0 = _closure0_slot17;
            r1 = r1 - r0;
            r0 = 0;
            r1 = r3.bind(r4)(r0, r1);
            r0 = undefined;
            r0 = r2.bind(r0)(r1);
            return r0;
        };
        r31['onPress'] = r42;
        r31['hitSlop'] = r45;
        r42 = _env_r8_slot34;
        r48 = r42.jsx;
        r42 = _env_r8_slot3;
        r46 = r42.Text;
        r42 = {};
        r50 = r11.qStepTxt;
        r42['style'] = r50;
        r50 = '−';
        r42['children'] = r50;
        r42 = r48.bind(r3)(r46, r42);
        r31['children'] = r42;
        r35 = r39.bind(r3)(r35, r31);
        r31 = new Array(3);
        r31[0] = r35;
        r35 = _env_r8_slot34;
        r42 = r35.jsxs;
        r35 = _env_r8_slot3;
        r39 = r35.View;
        r35 = {};
        r46 = r11.qValBox;
        r35['style'] = r46;
        r46 = _env_r8_slot34;
        r50 = r46.jsx;
        r46 = _env_r8_slot3;
        r48 = r46.TextInput;
        r46 = {};
        r53 = r11.qInput;
        r46['style'] = r53;
        r46['value'] = r52;
        r52 = function(a0) { // Original name: setDaEdit, environment: r14
            _fun18737: for(var _fun18737_ip = 0; ; ) switch(_fun18737_ip) {
case 0:
                r3 = a0;
                r2 = r3.replace;
                r1 = ',';
                r0 = '.';
                r3 = r2.bind(r3)(r1, r0);
                r2 = r3.replace;
                r1 = /[^0-9.]/g;
                r0 = '';
                r2 = r2.bind(r3)(r1, r0);
                r3 = global;
                r1 = r3.parseFloat;
                r0 = undefined;
                r7 = r1.bind(r0)(r2);
                r1 = r3.isNaN;
                r4 = r1.bind(r0)(r7);
                r2 = _closure0_slot7;
                if(r4) { _fun18737_ip = 196; continue _fun18737 }
case 87:
                r5 = _closure0_slot8;
                r4 = 'g';
                if(!(r5 !== r4)) { _fun18737_ip = 149; continue _fun18737 }
case 99:
                r6 = r3.Math;
                r5 = r6.min;
                r8 = r3.Math;
                r4 = r8.round;
                r1 = _closure0_slot11;
                r1 = r7 * r1;
                r4 = r4.bind(r8)(r1);
                r1 = 5000;
                r1 = r5.bind(r6)(r4, r1);
                _fun18737_ip = 189; continue _fun18737;
case 149:
                r6 = r3.Math;
                r5 = r6.min;
                r4 = r3.Math;
                r3 = r4.round;
                r4 = r3.bind(r4)(r7);
                r3 = 5000;
                r1 = r5.bind(r6)(r4, r3);
case 189:
                r1 = r2.bind(r0)(r1);
                return r0;
case 196:
                r1 = 0;
                r1 = r2.bind(r0)(r1);
                return r0;
            }
        };
        r46['onChangeText'] = r52;
        r52 = 'decimal-pad';
        if(!r49) { _fun18729_ip = 4155; continue _fun18729 }
case 4151:
        r52 = 'number-pad';
case 4155:
        r46['keyboardType'] = r52;
        r46['selectTextOnFocus'] = r51;
        r46['maxLength'] = r45;
        r48 = r50.bind(r3)(r48, r46);
        r46 = new Array(2);
        r46[0] = r48;
        r48 = _env_r8_slot34;
        r51 = r48.jsx;
        r48 = _env_r8_slot3;
        r50 = r48.Text;
        r48 = {};
        r52 = r11.qUnit;
        r48['style'] = r52;
        if(r49) { _fun18729_ip = 4228; continue _fun18729 }
case 4217:
        r52 = 'cibo.porzioni';
        r52 = r12.bind(r3)(r52);
        _fun18729_ip = 4237; continue _fun18729;
case 4228:
        r53 = 'cibo.grammi';
        r52 = r12.bind(r3)(r53);
case 4237:
        r48['children'] = r52;
        r48 = r51.bind(r3)(r50, r48);
        r46[1] = r48;
        r35['children'] = r46;
        r35 = r42.bind(r3)(r39, r35);
        r31[1] = r35;
        r35 = _env_r8_slot34;
        r42 = r35.jsx;
        r35 = _env_r8_slot3;
        r39 = r35.Pressable;
        r35 = {};
        r46 = r11.qStep;
        r35['style'] = r46;
        r46 = function() { // Original name: onPress, environment: r14
            r2 = _closure0_slot7;
            r1 = _closure0_slot12;
            r0 = _closure0_slot17;
            r1 = r1 + r0;
            r0 = undefined;
            r0 = r2.bind(r0)(r1);
            return r0;
        };
        r35['onPress'] = r46;
        r35['hitSlop'] = r45;
        r45 = _env_r8_slot34;
        r48 = r45.jsx;
        r45 = _env_r8_slot3;
        r46 = r45.Text;
        r45 = {};
        r50 = r11.qStepTxt;
        r45['style'] = r50;
        r50 = '+';
        r45['children'] = r50;
        r45 = r48.bind(r3)(r46, r45);
        r35['children'] = r45;
        r35 = r42.bind(r3)(r39, r35);
        r31[2] = r35;
        r27['children'] = r31;
        r27 = r30.bind(r3)(r28, r27);
        r26[1] = r27;
        r27 = _env_r8_slot34;
        r30 = r27.jsxs;
        r27 = _env_r8_slot3;
        r28 = r27.View;
        r27 = {};
        r31 = r11.unitToggle;
        r27['style'] = r31;
        r31 = _env_r8_slot34;
        r39 = r31.jsx;
        r31 = _env_r8_slot3;
        r35 = r31.Pressable;
        r31 = {};
        r45 = r11.unitSeg;
        r42 = new Array(2);
        r42[0] = r45;
        r45 = r49;
        if(!r49) { _fun18729_ip = 4457; continue _fun18729 }
case 4451:
        r45 = r11.unitSegOn;
case 4457:
        r42[1] = r45;
        r31['style'] = r42;
        r42 = function() { // Original name: onPress, environment: r14
            r2 = _closure0_slot9;
            r1 = undefined;
            r0 = 'g';
            r0 = r2.bind(r1)(r0);
            return r0;
        };
        r31['onPress'] = r42;
        r42 = _env_r8_slot34;
        r46 = r42.jsx;
        r42 = _env_r8_slot3;
        r45 = r42.Text;
        r42 = {};
        r50 = r11.unitSegTxt;
        r48 = new Array(2);
        r48[0] = r50;
        if(!r49) { _fun18729_ip = 4517; continue _fun18729 }
case 4511:
        r49 = r11.unitSegTxtOn;
case 4517:
        r48[1] = r49;
        r42['style'] = r48;
        r48 = 'cibo.grammi';
        r48 = r12.bind(r3)(r48);
        r42['children'] = r48;
        r42 = r46.bind(r3)(r45, r42);
        r31['children'] = r42;
        r35 = r39.bind(r3)(r35, r31);
        r31 = new Array(2);
        r31[0] = r35;
        r35 = _env_r8_slot34;
        r42 = r35.jsx;
        r35 = _env_r8_slot3;
        r39 = r35.Pressable;
        r35 = {};
        r46 = r11.unitSeg;
        r45 = new Array(2);
        r45[0] = r46;
        r46 = 'porz';
        r49 = r47 === r46;
        r46 = r49;
        if(!r49) { _fun18729_ip = 4616; continue _fun18729 }
case 4610:
        r46 = r11.unitSegOn;
case 4616:
        r45[1] = r46;
        r35['style'] = r45;
        r45 = function() { // Original name: onPress, environment: r14
            r2 = _closure0_slot9;
            r1 = undefined;
            r0 = 'porz';
            r0 = r2.bind(r1)(r0);
            return r0;
        };
        r35['onPress'] = r45;
        r45 = _env_r8_slot34;
        r47 = r45.jsx;
        r45 = _env_r8_slot3;
        r46 = r45.Text;
        r45 = {};
        r50 = r11.unitSegTxt;
        r48 = new Array(2);
        r48[0] = r50;
        if(!r49) { _fun18729_ip = 4676; continue _fun18729 }
case 4670:
        r49 = r11.unitSegTxtOn;
case 4676:
        r48[1] = r49;
        r45['style'] = r48;
        r48 = 'cibo.porzioni';
        r48 = r12.bind(r3)(r48);
        r45['children'] = r48;
        r45 = r47.bind(r3)(r46, r45);
        r35['children'] = r45;
        r35 = r42.bind(r3)(r39, r35);
        r31[1] = r35;
        r27['children'] = r31;
        r27 = r30.bind(r3)(r28, r27);
        r26[2] = r27;
        r27 = _env_r8_slot34;
        r30 = r27.jsx;
        r27 = _env_r8_slot3;
        r28 = r27.View;
        r27 = {};
        r31 = r11.presetRow;
        r27['style'] = r31;
        r39 = new Array(3);
        r31 = [0.5, '½'];
        r39[0] = r31;
        r31 = [1, '1'];
        r39[1] = r31;
        r31 = [2, '2'];
        r39[2] = r31;
        r35 = r39.map;
        r31 = function(a0) { // Environment: r14
            r1 = _env_r0_slot1;
            r3 = r1.default;
            r4 = undefined;
            r2 = a0;
            r1 = 2;
            r2 = r3.bind(r4)(r2, r1);
            r1 = 0;
            r5 = r2[r1];
            var _closure1_slot0 = r5;
            r1 = 1;
            r10 = r2[r1];
            r1 = _env_r0_slot34;
            r3 = r1.jsx;
            r1 = _env_r0_slot3;
            r2 = r1.Pressable;
            r1 = {};
            r8 = _closure0_slot1;
            r7 = r8.preset;
            r1['style'] = r7;
            r6 = function() { // Original name: onPress, environment: r6
                r2 = _closure0_slot7;
                r1 = global;
                r3 = r1.Math;
                r1 = r3.round;
                r4 = _closure0_slot11;
                r0 = _closure1_slot0;
                r0 = r4 * r0;
                r1 = r1.bind(r3)(r0);
                r0 = undefined;
                r0 = r2.bind(r0)(r1);
                return r0;
            };
            r1['onPress'] = r6;
            r6 = _env_r0_slot34;
            r7 = r6.jsxs;
            r0 = _env_r0_slot3;
            r6 = r0.Text;
            r0 = {};
            r8 = r8.presetTxt;
            r0['style'] = r8;
            r8 = new Array(3);
            r8[0] = r10;
            r10 = ' ';
            r8[1] = r10;
            r10 = _closure0_slot3;
            r9 = 'cibo.porz';
            r9 = r10.bind(r4)(r9);
            r8[2] = r9;
            r0['children'] = r8;
            r0 = r7.bind(r4)(r6, r0);
            r1['children'] = r0;
            r0 = global;
            r0 = r0.String;
            r0 = r0.bind(r4)(r5);
            r0 = r3.bind(r4)(r2, r1, r0);
            return r0;
        };
        r31 = r35.bind(r39)(r31);
        r27['children'] = r31;
        r27 = r30.bind(r3)(r28, r27);
        r26[3] = r27;
        r27 = _env_r8_slot34;
        r30 = r27.jsxs;
        r27 = _env_r8_slot3;
        r28 = r27.Text;
        r27 = {};
        r31 = r11.qLive;
        r27['style'] = r31;
        r31 = r33.HermesInternal;
        r35 = r31.concat;
        r31 = ' g  ·  ';
        r35 = r35.bind(r32)(r38, r31);
        r31 = new Array(4);
        r31[0] = r35;
        r35 = _env_r8_slot34;
        r39 = r35.jsx;
        r35 = _env_r8_slot3;
        r38 = r35.Text;
        r35 = {};
        r42 = {};
        r45 = _env_r8_slot6;
        r45 = r45.fonts;
        r45 = r45.bold;
        r42['fontFamily'] = r45;
        r45 = _env_r8_slot6;
        r45 = r45.impatto;
        r45 = r45.bind(r3)(r41, r18);
        r45 = r45.color;
        r42['color'] = r45;
        r35['style'] = r42;
        r42 = 'comune.cg';
        r46 = r12.bind(r3)(r42);
        r42 = r33.String;
        if(!(r43 == r34)) { _fun18729_ip = 4979; continue _fun18729 }
case 4977:
        r43 = 0;
case 4979:
        r45 = r42.bind(r3)(r43);
        r44 = r45.replace;
        r43 = '.';
        r42 = ',';
        r64 = r44.bind(r45)(r43, r42);
        r40 = r40 + r41;
        r41 = r12.bind(r3)(r40);
        r40 = r41.toLowerCase;
        r62 = r40.bind(r41)();
        r40 = r33.HermesInternal;
        r43 = r40.concat;
        r65 = ' ';
        r63 = ' (';
        r61 = ')';
        r67 = r32;
        r66 = r46;
        r40 = r67[r43](r66, r65, r64, r63, r62, r61, r60);
        r35['children'] = r40;
        r35 = r39.bind(r3)(r38, r35);
        r31[1] = r35;
        r38 = r37 != r34;
        r35 = r32;
        if(!r38) { _fun18729_ip = 5116; continue _fun18729 }
case 5079:
        r38 = {};
        r38['n'] = r37;
        r37 = 'cibo.gCarbo';
        r39 = r12.bind(r3)(r37, r38);
        r37 = r33.HermesInternal;
        r38 = r37.concat;
        r37 = '  ·  ';
        r35 = r38.bind(r37)(r39);
case 5116:
        r31[2] = r35;
        r34 = r36 != r34;
        if(!r34) { _fun18729_ip = 5152; continue _fun18729 }
case 5127:
        r33 = r33.HermesInternal;
        r35 = r33.concat;
        r34 = '  ·  ';
        r33 = ' kcal';
        r32 = r35.bind(r34)(r36, r33);
case 5152:
        r31[3] = r32;
        r27['children'] = r31;
        r27 = r30.bind(r3)(r28, r27);
        r26[4] = r27;
        r10['children'] = r26;
        r9 = r22.bind(r3)(r13, r10);
case 5180:
        r7[7] = r9;
        r9 = _env_r8_slot34;
        r13 = r9.jsx;
        r9 = _env_r8_slot17;
        r10 = r9.default;
        r9 = {};
        r22 = r21.dims;
        r9['dims'] = r22;
        r21 = r21.sintesi;
        r9['sintesi'] = r21;
        r21 = function() { // Original name: onInfo, environment: r14
            _fun18746: for(var _fun18746_ip = 0; ; ) switch(_fun18746_ip) {
case 0:
                r4 = _closure0_slot0;
                r0 = null;
                r1 = r4 == r0;
                r0 = undefined;
                if(r1) { _fun18746_ip = 59; continue _fun18746 }
case 18:
                r3 = r4.navigate;
                r2 = {};
                r1 = 'LearnChapter';
                r2['screen'] = r1;
                r1 = {};
                r5 = 'metodo';
                r1['id'] = r5;
                r2['params'] = r1;
                r1 = 'Impara';
                r0 = r3.bind(r4)(r1, r2);
case 59:
                return r0;
            }
        };
        r9['onInfo'] = r21;
        r21 = function() { // Original name: onFonti, environment: r14
            _fun18747: for(var _fun18747_ip = 0; ; ) switch(_fun18747_ip) {
case 0:
                r4 = _closure0_slot0;
                r0 = null;
                r1 = r4 == r0;
                r0 = undefined;
                if(r1) { _fun18747_ip = 59; continue _fun18747 }
case 18:
                r3 = r4.navigate;
                r2 = {};
                r1 = 'LearnChapter';
                r2['screen'] = r1;
                r1 = {};
                r5 = 'fonti';
                r1['id'] = r5;
                r2['params'] = r1;
                r1 = 'Impara';
                r0 = r3.bind(r4)(r1, r2);
case 59:
                return r0;
            }
        };
        r9['onFonti'] = r21;
        r9 = r13.bind(r3)(r10, r9);
        r7[8] = r9;
        r9 = r29;
        if(!r9) { _fun18729_ip = 5505; continue _fun18729 }
case 5265:
        r10 = _env_r8_slot34;
        r21 = r10.jsxs;
        r10 = _env_r8_slot3;
        r13 = r10.View;
        r10 = {};
        r22 = r11.contesto;
        r10['style'] = r22;
        r22 = _env_r8_slot34;
        r27 = r22.jsxs;
        r22 = _env_r8_slot3;
        r26 = r22.View;
        r22 = {};
        r28 = r11.contestoHead;
        r22['style'] = r28;
        r28 = _env_r8_slot34;
        r31 = r28.jsx;
        r28 = _env_r8_slot7;
        r30 = r28.Ionicons;
        r28 = {'name': 'barbell-outline', 'size': 16};
        r32 = r18.greenDeep;
        r28['color'] = r32;
        r30 = r31.bind(r3)(r30, r28);
        r28 = new Array(2);
        r28[0] = r30;
        r30 = _env_r8_slot34;
        r32 = r30.jsx;
        r30 = _env_r8_slot3;
        r31 = r30.Text;
        r30 = {};
        r33 = r11.contestoH;
        r30['style'] = r33;
        r33 = 'ricetta.quandoHaSenso';
        r33 = r12.bind(r3)(r33);
        r30['children'] = r33;
        r30 = r32.bind(r3)(r31, r30);
        r28[1] = r30;
        r22['children'] = r28;
        r26 = r27.bind(r3)(r26, r22);
        r22 = new Array(2);
        r22[0] = r26;
        r26 = _env_r8_slot34;
        r28 = r26.jsx;
        r26 = _env_r8_slot3;
        r27 = r26.Text;
        r26 = {};
        r30 = r11.contestoP;
        r26['style'] = r30;
        r26['children'] = r29;
        r26 = r28.bind(r3)(r27, r26);
        r22[1] = r26;
        r10['children'] = r22;
        r9 = r21.bind(r3)(r13, r10);
case 5505:
        r7[9] = r9;
        r9 = _env_r8_slot34;
        r13 = r9.jsx;
        r9 = _env_r8_slot3;
        r10 = r9.Text;
        r9 = {};
        r21 = r11.macLabel;
        r9['style'] = r21;
        r21 = 'cibo.valori100';
        r21 = r12.bind(r3)(r21);
        r9['children'] = r21;
        r9 = r13.bind(r3)(r10, r9);
        r7[10] = r9;
        r9 = _env_r8_slot34;
        r13 = r9.jsx;
        r9 = _env_r8_slot3;
        r10 = r9.View;
        r9 = {};
        r21 = r11.macros;
        r9['style'] = r21;
        r22 = r23.map;
        r21 = function(a0) { // Environment: r14
            _fun18748: for(var _fun18748_ip = 0; ; ) switch(_fun18748_ip) {
case 0:
                r0 = _env_r6_slot1;
                r2 = r0.default;
                r4 = undefined;
                r1 = a0;
                r0 = 2;
                r1 = r2.bind(r4)(r1, r0);
                r0 = 0;
                r3 = r1[r0];
                r0 = 1;
                r10 = r1[r0];
                r0 = _env_r6_slot34;
                r2 = r0.jsxs;
                r0 = _env_r6_slot3;
                r1 = r0.View;
                r0 = {};
                r11 = _closure0_slot1;
                r5 = r11.mac;
                r0['style'] = r5;
                r5 = _env_r6_slot34;
                r8 = r5.jsx;
                r5 = _env_r6_slot3;
                r7 = r5.Text;
                r5 = {};
                r11 = r11.macV;
                r5['style'] = r11;
                r11 = null;
                if(!(r10 == r11)) { _fun18748_ip = 116; continue _fun18748 }
case 112:
                r10 = '–';
case 116:
                r5['children'] = r10;
                r7 = r8.bind(r4)(r7, r5);
                r5 = new Array(2);
                r5[0] = r7;
                r7 = _env_r6_slot34;
                r8 = r7.jsx;
                r6 = _env_r6_slot3;
                r7 = r6.Text;
                r6 = {};
                r10 = _closure0_slot1;
                r10 = r10.macL;
                r6['style'] = r10;
                r10 = _closure0_slot3;
                r9 = 'ricetta.macro.';
                r9 = r9 + r3;
                r9 = r10.bind(r4)(r9);
                r6['children'] = r9;
                r6 = r8.bind(r4)(r7, r6);
                r5[1] = r6;
                r0['children'] = r5;
                r0 = r2.bind(r4)(r1, r0, r3);
                return r0;
            }
        };
        r21 = r22.bind(r23)(r21);
        r9['children'] = r21;
        r9 = r13.bind(r3)(r10, r9);
        r7[11] = r9;
        r9 = _env_r8_slot34;
        r13 = r9.jsxs;
        r9 = _env_r8_slot3;
        r10 = r9.Pressable;
        r9 = {};
        r22 = r11.favFull;
        r21 = new Array(2);
        r21[0] = r22;
        r22 = r25;
        if(!r25) { _fun18729_ip = 5667; continue _fun18729 }
case 5661:
        r22 = r11.favFullOn;
case 5667:
        r21[1] = r22;
        r9['style'] = r21;
        r9['onPress'] = r19;
        r19 = _env_r8_slot34;
        r22 = r19.jsx;
        r19 = _env_r8_slot7;
        r21 = r19.Ionicons;
        r19 = {};
        r23 = 'heart-outline';
        if(!r25) { _fun18729_ip = 5710; continue _fun18729 }
case 5706:
        r23 = 'heart';
case 5710:
        r19['name'] = r23;
        r23 = 20;
        r19['size'] = r23;
        if(r25) { _fun18729_ip = 5731; continue _fun18729 }
case 5724:
        r23 = r18.greenDeep;
        _fun18729_ip = 5737; continue _fun18729;
case 5731:
        r23 = r18.red;
case 5737:
        r19['color'] = r23;
        r21 = r22.bind(r3)(r21, r19);
        r19 = new Array(2);
        r19[0] = r21;
        r21 = _env_r8_slot34;
        r23 = r21.jsx;
        r21 = _env_r8_slot3;
        r22 = r21.Text;
        r21 = {};
        r27 = r11.favFullTxt;
        r26 = new Array(2);
        r26[0] = r27;
        r27 = r25;
        if(!r27) { _fun18729_ip = 5810; continue _fun18729 }
case 5795:
        r28 = {};
        r29 = r18.red;
        r28['color'] = r29;
        r27 = r28;
case 5810:
        r26[1] = r27;
        r21['style'] = r26;
        if(r25) { _fun18729_ip = 5832; continue _fun18729 }
case 5821:
        r25 = 'ricetta.salva';
        r25 = r12.bind(r3)(r25);
        _fun18729_ip = 5841; continue _fun18729;
case 5832:
        r26 = 'ricetta.salvato';
        r25 = r12.bind(r3)(r26);
case 5841:
        r21['children'] = r25;
        r21 = r23.bind(r3)(r22, r21);
        r19[1] = r21;
        r9['children'] = r19;
        r9 = r13.bind(r3)(r10, r9);
        r7[12] = r9;
        r9 = _env_r8_slot34;
        r13 = r9.jsx;
        r9 = _env_r8_slot22;
        r10 = r9.default;
        r9 = {};
        r19 = 'Condividi questa scelta';
        r9['label'] = r19;
        r19 = {};
        r19['marginTop'] = r20;
        r9['style'] = r19;
        r19 = function(a0, a1) { // Original name: renderCard, environment: r14
            _fun18749: for(var _fun18749_ip = 0; ; ) switch(_fun18749_ip) {
case 0:
                r0 = _closure0_slot10;
                r7 = 'MEDIO';
                r2 = 'medio';
                if(!(r0 !== r2)) { _fun18749_ip = 42; continue _fun18749 }
case 19:
                r3 = _closure0_slot10;
                r0 = 'BASSO';
                r1 = 'alto';
                if(!(r3 === r1)) { _fun18749_ip = 39; continue _fun18749 }
case 35:
                r0 = 'ALTO';
case 39:
                r7 = r0;
case 42:
                r0 = _closure0_slot4;
                r1 = r0.fibre_g;
                r8 = null;
                if(!(r1 == r8)) { _fun18749_ip = 59; continue _fun18749 }
case 57:
                r1 = 0;
case 59:
                r0 = 5;
                if(!(!(r1 >= r0))) { _fun18749_ip = 160; continue _fun18749 }
case 66:
                r0 = _closure0_slot4;
                r1 = r0.proteine_g;
                if(!(r1 == r8)) { _fun18749_ip = 81; continue _fun18749 }
case 79:
                r1 = 0;
case 81:
                r0 = 15;
                if(!(!(r1 >= r0))) { _fun18749_ip = 144; continue _fun18749 }
case 88:
                r1 = _closure0_slot10;
                r0 = 'trascurabile';
                if(!(r1 !== r0)) { _fun18749_ip = 128; continue _fun18749 }
case 100:
                r1 = _closure0_slot10;
                r0 = 'basso';
                if(!(r1 !== r0)) { _fun18749_ip = 128; continue _fun18749 }
case 112:
                r0 = {'icona': 'time-outline', 'testo': 'CON MODERAZIONE'};
                _fun18749_ip = 142; continue _fun18749;
case 128:
                r0 = {'icona': 'leaf-outline', 'testo': 'SCELTA LEGGERA'};
case 142:
                _fun18749_ip = 158; continue _fun18749;
case 144:
                r0 = {'icona': 'barbell-outline', 'testo': 'FONTE DI PROTEINE'};
case 158:
                _fun18749_ip = 174; continue _fun18749;
case 160:
                r0 = {'icona': 'leaf-outline', 'testo': 'RICCA DI FIBRE'};
case 174:
                r1 = {};
                r3 = 'stats-chart-outline';
                r1['icona'] = r3;
                r3 = global;
                r4 = r3.HermesInternal;
                r6 = r4.concat;
                r4 = 'CARICO GLICEMICO ';
                r4 = r6.bind(r4)(r7);
                r1['testo'] = r4;
                r4 = new Array(3);
                r4[0] = r1;
                r1 = {};
                r6 = 'flame-outline';
                r1['icona'] = r6;
                r6 = _closure0_slot4;
                r9 = r6.energia_kcal;
                if(!(r9 == r8)) { _fun18749_ip = 245; continue _fun18749 }
case 243:
                r9 = 0;
case 245:
                r3 = r3.HermesInternal;
                r7 = r3.concat;
                r6 = '';
                r3 = ' KCAL / 100 G';
                r3 = r7.bind(r6)(r9, r3);
                r1['testo'] = r3;
                r4[1] = r1;
                r4[2] = r0;
                r1 = _closure0_slot10;
                r9 = 'Gustoso: occhio alla porzione e alla frequenza.';
                r0 = 'alto';
                if(!(r1 !== r0)) { _fun18749_ip = 317; continue _fun18749 }
case 298:
                r1 = _closure0_slot10;
                r0 = 'Un alimento a impatto leggero.';
                if(!(r1 === r2)) { _fun18749_ip = 314; continue _fun18749 }
case 310:
                r0 = 'Un alimento da gustare con equilibrio.';
case 314:
                r9 = r0;
case 317:
                r0 = _env_r6_slot34;
                r3 = r0.jsx;
                r0 = _env_r6_slot24;
                r2 = r0.default;
                r1 = {};
                r0 = a1;
                r1['ref'] = r0;
                r11 = _closure0_slot2;
                r7 = _closure0_slot4;
                r0 = undefined;
                r10 = 'nome';
                r10 = r11.bind(r0)(r7, r10);
                r1['titolo'] = r10;
                r1['sottotitolo'] = r9;
                r7 = r7.carico_glicemico_porzione;
                if(!(r7 == r8)) { _fun18749_ip = 387; continue _fun18749 }
case 385:
                r7 = 0;
case 387:
                r1['cg'] = r7;
                r6 = _env_r6_slot23;
                r6 = r6.verdettoDaFascia;
                r5 = _closure0_slot10;
                r5 = r6.bind(r0)(r5);
                r1['verdetto'] = r5;
                r1['benefici'] = r4;
                r4 = a0;
                r1['codice'] = r4;
                r0 = r3.bind(r0)(r2, r1);
                return r0;
            }
        };
        r9['renderCard'] = r19;
        r9 = r13.bind(r3)(r10, r9);
        r7[13] = r9;
        r9 = _env_r8_slot34;
        r13 = r9.jsx;
        r9 = _env_r8_slot31;
        r10 = r9.default;
        r9 = {};
        r19 = function() { // Original name: snapshot, environment: r14
            _fun18750: for(var _fun18750_ip = 0; ; ) switch(_fun18750_ip) {
case 0:
                r1 = _env_r0_slot33;
                r3 = r1.snapshotDaVoce;
                r0 = _env_r0_slot32;
                r1 = r0.voceFromAlimento;
                r5 = _closure0_slot4;
                r0 = _closure0_slot13;
                r2 = undefined;
                r1 = r1.bind(r2)(r5, r0);
                r0 = {};
                r6 = r5.nome;
                r0['nome'] = r6;
                r6 = r5.nome_en;
                r0['nome_en'] = r6;
                r6 = r5.nome_es;
                r0['nome_es'] = r6;
                r6 = r5.nome_de;
                r0['nome_de'] = r6;
                r5 = r5.nome_fr;
                r0['nome_fr'] = r5;
                r5 = 'cerca';
                r0['fonte'] = r5;
                r6 = _closure0_slot15;
                r5 = null;
                if(!(r6 == r5)) { _fun18750_ip = 110; continue _fun18750 }
case 108:
                r6 = undefined;
case 110:
                r0['kcal'] = r6;
                r6 = _closure0_slot16;
                r0['fascia'] = r6;
                r4 = _closure0_slot14;
                if(!(r4 == r5)) { _fun18750_ip = 132; continue _fun18750 }
case 130:
                r4 = undefined;
case 132:
                r0['cg'] = r4;
                r0 = r3.bind(r2)(r1, r0);
                return r0;
            }
        };
        r9['snapshot'] = r19;
        r9 = r13.bind(r3)(r10, r9);
        r7[14] = r9;
        r9 = r24;
        if(!r9) { _fun18729_ip = 6127; continue _fun18729 }
case 5976:
        r10 = _env_r8_slot34;
        r19 = r10.jsxs;
        r10 = _env_r8_slot3;
        r13 = r10.View;
        r10 = {};
        r20 = _env_r8_slot34;
        r22 = r20.jsx;
        r20 = _env_r8_slot3;
        r21 = r20.Text;
        r20 = {};
        r23 = r11.secTitle;
        r20['style'] = r23;
        r23 = 'ricetta.alternative';
        r23 = r12.bind(r3)(r23);
        r20['children'] = r23;
        r21 = r22.bind(r3)(r21, r20);
        r20 = new Array(2);
        r20[0] = r21;
        r21 = _env_r8_slot34;
        r23 = r21.jsx;
        r21 = _env_r8_slot3;
        r22 = r21.View;
        r21 = {};
        r25 = r11.chips;
        r21['style'] = r25;
        r26 = r24.opzioni;
        r25 = r26.map;
        r24 = function(a0) { // Environment: r14
            r0 = a0;
            r1 = _env_r6_slot34;
            r4 = r1.jsxs;
            r1 = _env_r6_slot3;
            r3 = r1.View;
            r2 = {};
            r9 = _closure0_slot1;
            r1 = r9.chip;
            r2['style'] = r1;
            r1 = _env_r6_slot34;
            r8 = r1.jsx;
            r1 = _env_r6_slot3;
            r7 = r1.Text;
            r5 = {};
            r1 = r9.chipTxt;
            r5['style'] = r1;
            r12 = _closure0_slot2;
            r1 = undefined;
            r10 = 'nome';
            r10 = r12.bind(r1)(r0, r10);
            r5['children'] = r10;
            r7 = r8.bind(r1)(r7, r5);
            r5 = new Array(3);
            r5[0] = r7;
            r7 = _env_r6_slot34;
            r10 = r7.jsx;
            r7 = _env_r6_slot3;
            r8 = r7.Text;
            r7 = {};
            r12 = r9.chipIg;
            r7['style'] = r12;
            r13 = _closure0_slot3;
            r12 = {};
            r11 = r0.ig;
            r12['n'] = r11;
            r11 = 'cibo.igN';
            r11 = r13.bind(r1)(r11, r12);
            r7['children'] = r11;
            r7 = r10.bind(r1)(r8, r7);
            r5[1] = r7;
            r7 = _env_r6_slot34;
            r8 = r7.jsxs;
            r6 = _env_r6_slot3;
            r7 = r6.Text;
            r6 = {};
            r9 = r9.chipDn;
            r6['style'] = r9;
            r10 = r0.delta;
            r9 = ['↓'];
            r9[1] = r10;
            r6['children'] = r9;
            r6 = r8.bind(r1)(r7, r6);
            r5[2] = r6;
            r2['children'] = r5;
            r0 = r0.nome;
            r0 = r4.bind(r1)(r3, r2, r0);
            return r0;
        };
        r24 = r25.bind(r26)(r24);
        r21['children'] = r24;
        r21 = r23.bind(r3)(r22, r21);
        r20[1] = r21;
        r10['children'] = r20;
        r9 = r19.bind(r3)(r13, r10);
case 6127:
        r7[15] = r9;
        r9 = _env_r8_slot34;
        r13 = r9.jsx;
        r9 = _env_r8_slot16;
        r10 = r9.default;
        r9 = {};
        r9['base'] = r16;
        r9 = r13.bind(r3)(r10, r9);
        r7[16] = r9;
        r9 = _env_r8_slot34;
        r13 = r9.jsx;
        r9 = _env_r8_slot20;
        r10 = r9.default;
        r9 = {};
        r15 = r17.bind(r3)(r16, r15);
        r9['cibo'] = r15;
        r15 = 'catalogo';
        r9['fonte'] = r15;
        r9 = r13.bind(r3)(r10, r9);
        r7[17] = r9;
        r9 = _env_r8_slot34;
        r13 = r9.jsxs;
        r9 = _env_r8_slot3;
        r10 = r9.Pressable;
        r9 = {};
        r15 = r11.fontiLink;
        r9['style'] = r15;
        r14 = function() { // Original name: onPress, environment: r14
            _fun18752: for(var _fun18752_ip = 0; ; ) switch(_fun18752_ip) {
case 0:
                r4 = _closure0_slot0;
                r0 = null;
                r1 = r4 == r0;
                r0 = undefined;
                if(r1) { _fun18752_ip = 59; continue _fun18752 }
case 18:
                r3 = r4.navigate;
                r2 = {};
                r1 = 'LearnChapter';
                r2['screen'] = r1;
                r1 = {};
                r5 = 'fonti';
                r1['id'] = r5;
                r2['params'] = r1;
                r1 = 'Impara';
                r0 = r3.bind(r4)(r1, r2);
case 59:
                return r0;
            }
        };
        r9['onPress'] = r14;
        r14 = _env_r8_slot34;
        r16 = r14.jsx;
        r14 = _env_r8_slot7;
        r15 = r14.Ionicons;
        r14 = {'name': 'document-text-outline', 'size': 15};
        r17 = r18.greenDeep;
        r14['color'] = r17;
        r15 = r16.bind(r3)(r15, r14);
        r14 = new Array(3);
        r14[0] = r15;
        r15 = _env_r8_slot34;
        r17 = r15.jsx;
        r15 = _env_r8_slot3;
        r16 = r15.Text;
        r15 = {};
        r19 = r11.fontiLinkTxt;
        r15['style'] = r19;
        r19 = 'cibo.fonti';
        r19 = r12.bind(r3)(r19);
        r15['children'] = r19;
        r15 = r17.bind(r3)(r16, r15);
        r14[1] = r15;
        r15 = _env_r8_slot34;
        r17 = r15.jsx;
        r15 = _env_r8_slot7;
        r16 = r15.Ionicons;
        r15 = {'name': 'chevron-forward', 'size': 15};
        r18 = r18.inkSoft;
        r15['color'] = r18;
        r15 = r17.bind(r3)(r16, r15);
        r14[2] = r15;
        r9['children'] = r14;
        r9 = r13.bind(r3)(r10, r9);
        r7[18] = r9;
        r9 = _env_r8_slot34;
        r10 = r9.jsx;
        r8 = _env_r8_slot3;
        r9 = r8.Text;
        r8 = {};
        r11 = r11.disc;
        r8['style'] = r11;
        r11 = 'cibo.disc';
        r11 = r12.bind(r3)(r11);
        r8['children'] = r11;
        r8 = r10.bind(r3)(r9, r8);
        r7[19] = r8;
        r4['children'] = r7;
        r4 = r6.bind(r3)(r5, r4);
        r0['children'] = r4;
        r0 = r2.bind(r3)(r1, r0);
        return r0;
    }
}

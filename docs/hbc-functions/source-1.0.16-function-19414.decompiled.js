function RecipeDetailScreen(a0) {
    _fun19414: for(var _fun19414_ip = 0; ; ) switch(_fun19414_ip) {
case 0:
        r0 = a0;
        r1 = r0.route;
        r0 = r0.navigation;
        var _closure0_slot0 = r0;
        r0 = _env_r17_slot6;
        r0 = r0.useColors;
        r3 = undefined;
        r30 = r0.bind(r3)();
        r0 = _env_r17_slot6;
        r2 = r0.useThemedStyles;
        r0 = _env_r17_slot33;
        r20 = r2.bind(r3)(r0);
        var _closure0_slot1 = r20;
        r0 = _env_r17_slot29;
        r0 = r0.useTf;
        r24 = r0.bind(r3)();
        var _closure0_slot2 = r24;
        r0 = _env_r17_slot29;
        r0 = r0.useT;
        r21 = r0.bind(r3)();
        var _closure0_slot3 = r21;
        r0 = _env_r17_slot5;
        r2 = r0.ricettaById;
        r0 = r1.params;
        r0 = r0.id;
        r23 = r2.bind(r3)(r0);
        var _closure0_slot4 = r23;
        r0 = _env_r17_slot2;
        r0 = r0.useState;
        r4 = false;
        r2 = r0.bind(r3)(r4);
        r0 = _env_r17_slot1;
        r0 = r0.default;
        r6 = 2;
        r0 = r0.bind(r3)(r2, r6);
        r14 = 0;
        r33 = r0[r14];
        r25 = 1;
        r0 = r0[r25];
        var _closure0_slot5 = r0;
        r0 = _env_r17_slot2;
        r0 = r0.useState;
        r2 = r0.bind(r3)(r4);
        r0 = _env_r17_slot1;
        r0 = r0.default;
        r0 = r0.bind(r3)(r2, r6);
        r5 = r0[r14];
        r0 = r0[r25];
        var _closure0_slot6 = r0;
        r0 = _env_r17_slot2;
        r2 = r0.useState;
        r0 = _env_r17_slot32;
        r0 = r0.bind(r3)();
        r2 = r2.bind(r3)(r0);
        r0 = _env_r17_slot1;
        r0 = r0.default;
        r0 = r0.bind(r3)(r2, r6);
        r27 = r0[r14];
        var _closure0_slot7 = r27;
        r0 = r0[r25];
        var _closure0_slot8 = r0;
        r0 = _env_r17_slot2;
        r2 = r0.useState;
        r0 = 'pranzo';
        r2 = r2.bind(r3)(r0);
        r0 = _env_r17_slot1;
        r0 = r0.default;
        r0 = r0.bind(r3)(r2, r6);
        r26 = r0[r14];
        var _closure0_slot9 = r26;
        r0 = r0[r25];
        var _closure0_slot10 = r0;
        r0 = _env_r17_slot2;
        r2 = r0.useState;
        r0 = null;
        r7 = r2.bind(r3)(r0);
        r2 = _env_r17_slot1;
        r2 = r2.default;
        r2 = r2.bind(r3)(r7, r6);
        r34 = r2[r14];
        r2 = r2[r25];
        var _closure0_slot11 = r2;
        r2 = _env_r17_slot2;
        r2 = r2.useState;
        r4 = r2.bind(r3)(r4);
        r2 = _env_r17_slot1;
        r2 = r2.default;
        r2 = r2.bind(r3)(r4, r6);
        r40 = r2[r14];
        r2 = r2[r25];
        var _closure0_slot12 = r2;
        r2 = _env_r17_slot2;
        r2 = r2.useState;
        r4 = r2.bind(r3)(r25);
        r2 = _env_r17_slot1;
        r2 = r2.default;
        r2 = r2.bind(r3)(r4, r6);
        r31 = r2[r14];
        var _closure0_slot13 = r31;
        r2 = r2[r25];
        var _closure0_slot14 = r2;
        r2 = _env_r17_slot2;
        r4 = r2.useEffect;
        r1 = r1.params;
        r1 = r1.id;
        r2 = new Array(1);
        r2[0] = r1;
        r1 = function() { // Environment: r18
            _fun19415: for(var _fun19415_ip = 0; ; ) switch(_fun19415_ip) {
case 0:
                r0 = _closure0_slot4;
                if(!r0) { _fun19415_ip = 46; continue _fun19415 }
case 12:
                r0 = _env_r0_slot27;
                r3 = r0.getFav;
                r0 = undefined;
                r4 = r3.bind(r0)();
                r3 = r4.then;
                r0 = function(a0) { // Environment: r2
                    r2 = _closure0_slot5;
                    r1 = a0;
                    r3 = r1.ricette;
                    r1 = r3.includes;
                    r0 = _closure0_slot4;
                    r0 = r0.id;
                    r1 = r1.bind(r3)(r0);
                    r0 = undefined;
                    r0 = r2.bind(r0)(r1);
                    return r0;
                };
                r0 = r3.bind(r4)(r0);
case 46:
                r3 = _closure0_slot4;
                r0 = null;
                r5 = r3 == r0;
                r0 = undefined;
                r4 = undefined;
                if(r5) { _fun19415_ip = 68; continue _fun19415 }
case 63:
                r4 = r3.pasti;
case 68:
                if(r4) { _fun19415_ip = 75; continue _fun19415 }
case 71:
                r4 = new Array(0);
case 75:
                r3 = r4.find;
                r2 = function(a0) { // Environment: r2
                    r1 = a0;
                    var _closure2_slot0 = r1;
                    r1 = _env_r1_slot27;
                    r2 = r1.PASTI;
                    r1 = r2.some;
                    r0 = function(a0) { // Environment: r0
                        r0 = a0;
                        r1 = r0.id;
                        r0 = _closure2_slot0;
                        r0 = r1 === r0;
                        return r0;
                    };
                    r0 = r1.bind(r2)(r0);
                    return r0;
                };
                r2 = r3.bind(r4)(r2);
                if(!r2) { _fun19415_ip = 103; continue _fun19415 }
case 94:
                r1 = _closure0_slot10;
                r1 = r1.bind(r0)(r2);
case 103:
                r1 = _closure0_slot28;
                r1 = r1.momentoFelice;
                r1 = r1.bind(r0)();
                return r0;
            }
        };
        r1 = r4.bind(r3)(r1, r2);
        r1 = function() { // Environment: r18
            r1 = _env_r1_slot0;
            r3 = r1.default;
            r2 = undefined;
            r1 = function* () { // Environment: r0
                r0 = function* () { // Original name: ?anon_0_, environment: r0
                    _fun19421: for(var _fun19421_ip = 0; ; ) switch(_fun19421_ip) {
case 0:
                        StartGenerator();
                        ResumeGenerator(result_out_reg=0, return_bool_out_reg=1);
                        if(r1) { _fun19421_ip = 118; continue _fun19421 }
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
                        r2 = _env_r2_slot27;
                        r5 = r2.toggleFav;
                        r1 = _closure0_slot4;
                        r4 = r1.id;
                        r2 = undefined;
                        r1 = 'ricette';
                        r1 = r5.bind(r2)(r1, r4);
                        SaveGenerator(address=101);
case 99:
                        return r1;
case 101:
                        ResumeGenerator(result_out_reg=1, return_bool_out_reg=4);
                        if(r4) { _fun19421_ip = 115; continue _fun19421 }
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
        r16 = r1.bind(r3)();
        r1 = function() { // Environment: r18
            r1 = _env_r1_slot0;
            r3 = r1.default;
            r2 = undefined;
            r1 = function* () { // Environment: r0
                r0 = function* () { // Original name: ?anon_0_, environment: r0
                    _fun19426: for(var _fun19426_ip = 0; ; ) switch(_fun19426_ip) {
case 0:
                        StartGenerator();
                        ResumeGenerator(result_out_reg=0, return_bool_out_reg=1);
                        if(r1) { _fun19426_ip = 225; continue _fun19426 }
case 12:
                        r1 = _env_r5_slot27;
                        r8 = r1.addAlPiano;
                        r7 = _closure0_slot7;
                        r6 = _closure0_slot9;
                        r1 = _closure0_slot4;
                        r1 = r1.id;
                        r2 = undefined;
                        r1 = r8.bind(r2)(r7, r6, r1);
                        SaveGenerator(address=58);
case 56:
                        return r1;
case 58:
                        ResumeGenerator(result_out_reg=1, return_bool_out_reg=6);
                        if(r6) { _fun19426_ip = 222; continue _fun19426 }
case 67:
                        r7 = _env_r5_slot4;
                        r6 = r7.notificationAsync;
                        r5 = _env_r5_slot4;
                        r5 = r5.NotificationFeedbackType;
                        r5 = r5.Success;
                        r7 = r6.bind(r7)(r5);
                        r6 = r7.catch;
                        r5 = function() { // Environment: r3
                            r0 = undefined;
                            return r0;
                        };
                        r5 = r6.bind(r7)(r5);
                        r6 = _closure0_slot6;
                        r5 = false;
                        r5 = r6.bind(r2)(r5);
                        r5 = _closure0_slot11;
                        r7 = _closure0_slot3;
                        r6 = {};
                        r9 = _closure0_slot7;
                        r8 = 'giorni.';
                        r8 = r8 + r9;
                        r8 = r7.bind(r2)(r8);
                        r6['g'] = r8;
                        r8 = _closure0_slot9;
                        r4 = 'pasti.';
                        r4 = r4 + r8;
                        r4 = r7.bind(r2)(r4);
                        r6['p'] = r4;
                        r4 = 'ricetta.aggiuntoA';
                        r4 = r7.bind(r2)(r4, r6);
                        r4 = r5.bind(r2)(r4);
                        r4 = global;
                        r5 = r4.setTimeout;
                        r4 = function() { // Environment: r3
                            r2 = _closure0_slot11;
                            r1 = undefined;
                            r0 = null;
                            r0 = r2.bind(r1)(r0);
                            return r0;
                        };
                        r3 = 2200;
                        r3 = r5.bind(r2)(r4, r3);
                        return r2;
case 222:
                        return r1;
case 225:
                        return r0;
                    }
                };
                return r0;
            };
            r1 = r3.bind(r2)(r1);
            var _closure1_slot0 = r1;
            r0 = function() { // Original name: confermaPiano, environment: r0
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
        if(r23) { _fun19414_ip = 591; continue _fun19414 }
case 510:
        r1 = _env_r17_slot31;
        r4 = r1.jsx;
        r1 = _env_r17_slot3;
        r2 = r1.View;
        r1 = {};
        r6 = r20.wrap;
        r1['style'] = r6;
        r6 = _env_r17_slot31;
        r8 = r6.jsx;
        r6 = _env_r17_slot3;
        r7 = r6.Text;
        r6 = {};
        r9 = 'ricetta.nonTrovata';
        r9 = r21.bind(r3)(r9);
        r6['children'] = r9;
        r6 = r8.bind(r3)(r7, r6);
        r1['children'] = r6;
        r1 = r4.bind(r3)(r2, r1);
        return r1;
case 591:
        r29 = r23.per_porzione;
        var _closure0_slot15 = r29;
        r1 = _env_r17_slot26;
        r1 = r1.affidabilitaRicetta;
        r47 = r1.bind(r3)(r23);
        r1 = _env_r17_slot26;
        r1 = r1.ricettaRivista;
        r46 = r1.bind(r3)(r23);
        r1 = r29.fascia;
        r48 = 'fascia.';
        r1 = r48 + r1;
        r2 = r21.bind(r3)(r1);
        r1 = r2.toLowerCase;
        r43 = r1.bind(r2)();
        r1 = _env_r17_slot14;
        r1 = r1.metodoRicetta;
        r28 = r1.bind(r3)(r23, r31);
        r1 = _env_r17_slot13;
        r2 = r1.quandoHaSenso;
        r1 = r29.fascia;
        r38 = r2.bind(r3)(r1);
        r1 = r29.carico_glicemico;
        r12 = r1 != r0;
        r45 = new Array(4);
        r1 = [0.5, '½'];
        r45[0] = r1;
        r1 = [1, '1'];
        r45[1] = r1;
        r1 = [1.5, '1½'];
        r45[2] = r1;
        r1 = [2, '2'];
        r45[3] = r1;
        r1 = _env_r17_slot24;
        r1 = r1.kcalRicetta;
        r7 = r1.bind(r3)(r23);
        if(!(r7 == r0)) { _fun19414_ip = 776; continue _fun19414 }
case 774:
        r7 = 0;
case 776:
        r2 = r29.fascia;
        r1 = 'Gustosa: occhio alla porzione e alla frequenza.';
        r37 = 'alto';
        if(!(r2 !== r37)) { _fun19414_ip = 817; continue _fun19414 }
case 793:
        r6 = r29.fascia;
        r2 = 'Un piatto a impatto leggero.';
        r4 = 'medio';
        if(!(r6 === r4)) { _fun19414_ip = 814; continue _fun19414 }
case 810:
        r2 = 'Un buon piatto, da gustare con equilibrio.';
case 814:
        r1 = r2;
case 817:
        var _closure0_slot16 = r1;
        r1 = r29.fascia;
        r6 = 'MEDIO';
        r39 = 'medio';
        if(!(r1 !== r39)) { _fun19414_ip = 858; continue _fun19414 }
case 838:
        r2 = r29.fascia;
        r1 = 'BASSO';
        if(!(r2 === r37)) { _fun19414_ip = 855; continue _fun19414 }
case 851:
        r1 = 'ALTO';
case 855:
        r6 = r1;
case 858:
        r2 = r29.fibre_g;
        if(!(r2 == r0)) { _fun19414_ip = 869; continue _fun19414 }
case 867:
        r2 = 0;
case 869:
        r1 = 5;
        if(!(!(r2 >= r1))) { _fun19414_ip = 926; continue _fun19414 }
case 876:
        r1 = r29.proteine_g;
        if(!(r1 == r0)) { _fun19414_ip = 887; continue _fun19414 }
case 885:
        r1 = 0;
case 887:
        r0 = 15;
        if(!(!(r1 >= r0))) { _fun19414_ip = 910; continue _fun19414 }
case 894:
        r1 = {'icona': 'restaurant-outline', 'testo': 'PIATTO BILANCIATO'};
        _fun19414_ip = 924; continue _fun19414;
case 910:
        r1 = {'icona': 'barbell-outline', 'testo': 'FONTE DI PROTEINE'};
case 924:
        _fun19414_ip = 940; continue _fun19414;
case 926:
        r1 = {'icona': 'leaf-outline', 'testo': 'RICCA DI FIBRE'};
case 940:
        r2 = {};
        r0 = 'stats-chart-outline';
        r2['icona'] = r0;
        r32 = global;
        r0 = r32.HermesInternal;
        r4 = r0.concat;
        r0 = 'CARICO GLICEMICO ';
        r0 = r4.bind(r0)(r6);
        r2['testo'] = r0;
        r0 = new Array(3);
        r0[0] = r2;
        r2 = {};
        r4 = 'flame-outline';
        r2['icona'] = r4;
        r4 = r32.HermesInternal;
        r6 = r4.concat;
        r54 = '';
        r4 = ' KCAL A PORZIONE';
        r4 = r6.bind(r54)(r7, r4);
        r2['testo'] = r4;
        r0[1] = r2;
        r0[2] = r1;
        var _closure0_slot17 = r0;
        r0 = _env_r17_slot31;
        r2 = r0.jsxs;
        r0 = _env_r17_slot3;
        r1 = r0.View;
        r0 = {};
        r4 = {};
        r4['flex'] = r25;
        r0['style'] = r4;
        r4 = _env_r17_slot31;
        r7 = r4.jsx;
        r4 = _env_r17_slot9;
        r6 = r4.FadeInView;
        r4 = {};
        r8 = r20.wrap;
        r4['style'] = r8;
        r8 = _env_r17_slot31;
        r10 = r8.jsxs;
        r8 = _env_r17_slot3;
        r9 = r8.ScrollView;
        r8 = {};
        r11 = r20.wrap;
        r8['style'] = r11;
        r11 = {};
        r13 = 16;
        r11['padding'] = r13;
        r8['contentContainerStyle'] = r11;
        r11 = _env_r17_slot12;
        r13 = r11.recipeImage;
        r11 = r23.id;
        r13 = r13.bind(r3)(r11);
        if(!r13) { _fun19414_ip = 1237; continue _fun19414 }
case 1166:
        r11 = _env_r17_slot31;
        r22 = r11.jsx;
        r11 = _env_r17_slot3;
        r15 = r11.Image;
        r11 = {};
        r35 = _env_r17_slot12;
        r36 = r35.recipeImage;
        r35 = r23.id;
        r35 = r36.bind(r3)(r35);
        r11['source'] = r35;
        r35 = r20.heroImg;
        r11['style'] = r35;
        r35 = 'cover';
        r11['resizeMode'] = r35;
        r13 = r22.bind(r3)(r15, r11);
case 1237:
        r11 = new Array(25);
        r11[0] = r13;
        r13 = _env_r17_slot31;
        r22 = r13.jsx;
        r13 = _env_r17_slot3;
        r15 = r13.Text;
        r13 = {};
        r35 = r20.cat;
        r13['style'] = r35;
        r35 = 'categoria';
        r35 = r24.bind(r3)(r23, r35);
        r13['children'] = r35;
        r13 = r22.bind(r3)(r15, r13);
        r11[1] = r13;
        r13 = _env_r17_slot31;
        r35 = r13.jsx;
        r13 = _env_r17_slot3;
        r15 = r13.Text;
        r13 = {};
        r22 = r20.h;
        r13['style'] = r22;
        r22 = 'nome';
        r36 = r24.bind(r3)(r23, r22);
        r13['children'] = r36;
        r13 = r35.bind(r3)(r15, r13);
        r11[2] = r13;
        r13 = _env_r17_slot31;
        r35 = r13.jsx;
        r13 = _env_r17_slot3;
        r15 = r13.Text;
        r13 = {};
        r36 = r20.desc;
        r13['style'] = r36;
        r36 = 'descrizione';
        r36 = r24.bind(r3)(r23, r36);
        r13['children'] = r36;
        r13 = r35.bind(r3)(r15, r13);
        r11[3] = r13;
        r13 = _env_r17_slot31;
        r35 = r13.jsx;
        r13 = _env_r17_slot3;
        r15 = r13.View;
        r13 = {};
        r36 = {'marginTop': 8, 'marginBottom': 4};
        r13['style'] = r36;
        r36 = _env_r17_slot31;
        r42 = r36.jsx;
        r36 = _env_r17_slot17;
        r41 = r36.default;
        r36 = {};
        r44 = r29.fascia;
        r36['fascia'] = r44;
        r36 = r42.bind(r3)(r41, r36);
        r13['children'] = r36;
        r13 = r35.bind(r3)(r15, r13);
        r11[4] = r13;
        r13 = _env_r17_slot31;
        r35 = r13.jsxs;
        r13 = _env_r17_slot3;
        r15 = r13.View;
        r13 = {};
        r36 = r20.cgCard;
        r13['style'] = r36;
        r36 = _env_r17_slot31;
        r42 = r36.jsx;
        r36 = _env_r17_slot8;
        r41 = r36.default;
        r36 = {};
        r44 = r29.carico_glicemico;
        r36['valore'] = r44;
        r44 = r29.fascia;
        r36['fascia'] = r44;
        r41 = r42.bind(r3)(r41, r36);
        r36 = new Array(5);
        r36[0] = r41;
        r41 = _env_r17_slot31;
        r44 = r41.jsx;
        r41 = _env_r17_slot3;
        r42 = r41.Text;
        r41 = {};
        r49 = r20.spiegaSemplice;
        r41['style'] = r49;
        r49 = 'ricetta.spiegaSemplice';
        r49 = r21.bind(r3)(r49);
        r41['children'] = r49;
        r41 = r44.bind(r3)(r42, r41);
        r36[1] = r41;
        r41 = _env_r17_slot31;
        r44 = r41.jsx;
        r41 = _env_r17_slot3;
        r42 = r41.Text;
        r41 = {};
        r49 = r20.cgL;
        r41['style'] = r49;
        r49 = 'ricetta.perPorzione';
        r49 = r21.bind(r3)(r49);
        r41['children'] = r49;
        r41 = r44.bind(r3)(r42, r41);
        r36[2] = r41;
        r41 = _env_r17_slot31;
        r44 = r41.jsx;
        r41 = _env_r17_slot19;
        r42 = r41.default;
        r41 = {};
        r49 = _env_r17_slot24;
        r49 = r49.kcalRicetta;
        r49 = r49.bind(r3)(r23);
        r41['kcal'] = r49;
        r49 = true;
        r41['full'] = r49;
        r49 = {};
        r50 = 12;
        r49['marginTop'] = r50;
        r41['style'] = r49;
        r41 = r44.bind(r3)(r42, r41);
        r36[3] = r41;
        r41 = _env_r17_slot31;
        r44 = r41.jsx;
        r41 = _env_r17_slot23;
        r42 = r41.default;
        r41 = {};
        r49 = {};
        r49['marginTop'] = r50;
        r41['style'] = r49;
        r41 = r44.bind(r3)(r42, r41);
        r36[4] = r41;
        r13['children'] = r36;
        r13 = r35.bind(r3)(r15, r13);
        r11[5] = r13;
        r13 = _env_r17_slot31;
        r35 = r13.jsxs;
        r13 = _env_r17_slot3;
        r15 = r13.View;
        r13 = {};
        r36 = r20.explain;
        r13['style'] = r36;
        r36 = _env_r17_slot31;
        r42 = r36.jsx;
        r36 = _env_r17_slot3;
        r41 = r36.Text;
        r36 = {};
        r44 = r20.explainLine;
        r36['style'] = r44;
        r44 = {};
        r44['f'] = r43;
        r43 = _env_r17_slot26;
        r43 = r43.SCALA_CG;
        r44['scala'] = r43;
        r43 = 'ricetta.impattoPorzione';
        r43 = r21.bind(r3)(r43, r44);
        r36['children'] = r43;
        r41 = r42.bind(r3)(r41, r36);
        r36 = new Array(3);
        r36[0] = r41;
        r41 = _env_r17_slot31;
        r43 = r41.jsxs;
        r41 = _env_r17_slot3;
        r42 = r41.View;
        r41 = {};
        r44 = r20.explainRow;
        r41['style'] = r44;
        r49 = r47;
        if(!r49) { _fun19414_ip = 1982; continue _fun19414 }
case 1951:
        r44 = _env_r17_slot31;
        r51 = r44.jsx;
        r44 = _env_r17_slot10;
        r50 = r44.default;
        r44 = {};
        r44['livello'] = r47;
        r49 = r51.bind(r3)(r50, r44);
case 1982:
        r44 = new Array(3);
        r44[0] = r49;
        if(!r46) { _fun19414_ip = 2032; continue _fun19414 }
case 1993:
        r49 = _env_r17_slot31;
        r51 = r49.jsx;
        r49 = _env_r17_slot11;
        r50 = r49.default;
        r49 = {};
        r52 = 'ricetta.rivista';
        r52 = r21.bind(r3)(r52);
        r49['label'] = r52;
        r46 = r51.bind(r3)(r50, r49);
case 2032:
        r44[1] = r46;
        r46 = _env_r17_slot31;
        r50 = r46.jsx;
        r46 = _env_r17_slot3;
        r49 = r46.Pressable;
        r46 = {};
        r51 = function() { // Original name: onPress, environment: r18
            r2 = _closure0_slot12;
            r1 = undefined;
            r0 = function(a0) { // Environment: r0
                r0 = a0;
                r0 = !r0;
                return r0;
            };
            r0 = r2.bind(r1)(r0);
            return r0;
        };
        r46['onPress'] = r51;
        r51 = 6;
        r46['hitSlop'] = r51;
        r51 = _env_r17_slot31;
        r53 = r51.jsxs;
        r51 = _env_r17_slot3;
        r52 = r51.Text;
        r51 = {};
        r55 = r20.calcLink;
        r51['style'] = r55;
        if(r40) { _fun19414_ip = 2117; continue _fun19414 }
case 2106:
        r55 = 'ricetta.comeCalcolato';
        r56 = r21.bind(r3)(r55);
        _fun19414_ip = 2126; continue _fun19414;
case 2117:
        r55 = 'ricetta.nascondi';
        r56 = r21.bind(r3)(r55);
case 2126:
        r55 = new Array(2);
        r55[0] = r56;
        r56 = '  ›';
        r55[1] = r56;
        r51['children'] = r55;
        r51 = r53.bind(r3)(r52, r51);
        r46['children'] = r51;
        r46 = r50.bind(r3)(r49, r46);
        r44[2] = r46;
        r41['children'] = r44;
        r41 = r43.bind(r3)(r42, r41);
        r36[1] = r41;
        if(!r40) { _fun19414_ip = 2430; continue _fun19414 }
case 2186:
        r41 = _env_r17_slot31;
        r43 = r41.jsxs;
        r41 = _env_r17_slot3;
        r42 = r41.View;
        r41 = {};
        r44 = r20.calcBox;
        r41['style'] = r44;
        r44 = _env_r17_slot31;
        r49 = r44.jsx;
        r44 = _env_r17_slot3;
        r46 = r44.Text;
        r44 = {};
        r50 = r20.calcT;
        r44['style'] = r50;
        r51 = {};
        r52 = {};
        r50 = r23.porzioni;
        r52['count'] = r50;
        r50 = 'ricetta.porzioni';
        r50 = r21.bind(r3)(r50, r52);
        r51['porz'] = r50;
        r50 = 'ricetta.calcT';
        r50 = r21.bind(r3)(r50, r51);
        r44['children'] = r50;
        r46 = r49.bind(r3)(r46, r44);
        r44 = new Array(3);
        r44[0] = r46;
        r46 = _env_r17_slot31;
        r50 = r46.jsx;
        r46 = _env_r17_slot3;
        r49 = r46.Text;
        r46 = {};
        r51 = r20.calcSrc;
        r46['style'] = r51;
        r51 = 'ricetta.calcSrc';
        r51 = r21.bind(r3)(r51);
        r46['children'] = r51;
        r46 = r50.bind(r3)(r49, r46);
        r44[1] = r46;
        r46 = 'bassa';
        r46 = r47 === r46;
        if(!r46) { _fun19414_ip = 2416; continue _fun19414 }
case 2367:
        r47 = _env_r17_slot31;
        r50 = r47.jsx;
        r47 = _env_r17_slot3;
        r49 = r47.Text;
        r47 = {};
        r51 = r20.calcNote;
        r47['style'] = r51;
        r51 = 'ricetta.calcNoteAff';
        r51 = r21.bind(r3)(r51);
        r47['children'] = r51;
        r46 = r50.bind(r3)(r49, r47);
case 2416:
        r44[2] = r46;
        r41['children'] = r44;
        r40 = r43.bind(r3)(r42, r41);
case 2430:
        r36[2] = r40;
        r13['children'] = r36;
        r13 = r35.bind(r3)(r15, r13);
        r11[6] = r13;
        if(!r12) { _fun19414_ip = 3043; continue _fun19414 }
case 2454:
        r13 = _env_r17_slot31;
        r35 = r13.jsxs;
        r13 = _env_r17_slot3;
        r15 = r13.View;
        r13 = {};
        r36 = r20.porzInt;
        r13['style'] = r36;
        r36 = _env_r17_slot31;
        r41 = r36.jsx;
        r36 = _env_r17_slot3;
        r40 = r36.Text;
        r36 = {};
        r42 = r20.porzIntH;
        r36['style'] = r42;
        r42 = 'ricetta.seCambiPorzione';
        r42 = r21.bind(r3)(r42);
        r36['children'] = r42;
        r40 = r41.bind(r3)(r40, r36);
        r36 = new Array(4);
        r36[0] = r40;
        r40 = _env_r17_slot31;
        r42 = r40.jsx;
        r40 = _env_r17_slot3;
        r41 = r40.View;
        r40 = {};
        r43 = r20.porzIntRow;
        r40['style'] = r43;
        r44 = r45.map;
        r43 = function(a0) { // Environment: r18
            _fun19432: for(var _fun19432_ip = 0; ; ) switch(_fun19432_ip) {
case 0:
                r0 = _env_r5_slot1;
                r2 = r0.default;
                r4 = undefined;
                r1 = a0;
                r0 = 2;
                r1 = r2.bind(r4)(r1, r0);
                r0 = 0;
                r3 = r1[r0];
                var _closure1_slot0 = r3;
                r0 = 1;
                r8 = r1[r0];
                r0 = _env_r5_slot31;
                r2 = r0.jsx;
                r0 = _env_r5_slot3;
                r1 = r0.Pressable;
                r0 = {};
                r7 = _closure0_slot1;
                r9 = r7.porzIntChip;
                r7 = new Array(2);
                r7[0] = r9;
                r9 = _closure0_slot13;
                r9 = r9 === r3;
                if(!r9) { _fun19432_ip = 107; continue _fun19432 }
case 97:
                r10 = _closure0_slot1;
                r9 = r10.porzIntChipOn;
case 107:
                r7[1] = r9;
                r0['style'] = r7;
                r6 = function() { // Original name: onPress, environment: r6
                    r2 = _closure0_slot14;
                    r1 = _closure1_slot0;
                    r0 = undefined;
                    r0 = r2.bind(r0)(r1);
                    return r0;
                };
                r0['onPress'] = r6;
                r6 = _env_r5_slot31;
                r7 = r6.jsx;
                r5 = _env_r5_slot3;
                r6 = r5.Text;
                r5 = {};
                r9 = _closure0_slot1;
                r10 = r9.porzIntChipTxt;
                r9 = new Array(2);
                r9[0] = r10;
                r10 = _closure0_slot13;
                r10 = r10 === r3;
                if(!r10) { _fun19432_ip = 183; continue _fun19432 }
case 173:
                r11 = _closure0_slot1;
                r10 = r11.porzIntChipTxtOn;
case 183:
                r9[1] = r10;
                r5['style'] = r9;
                r5['children'] = r8;
                r5 = r7.bind(r4)(r6, r5);
                r0['children'] = r5;
                r0 = r2.bind(r4)(r1, r0, r3);
                return r0;
            }
        };
        r43 = r44.bind(r45)(r43);
        r40['children'] = r43;
        r40 = r42.bind(r3)(r41, r40);
        r36[1] = r40;
        r43 = r32.Math;
        r42 = r43.round;
        r40 = r29.carico_glicemico;
        if(r40) { _fun19414_ip = 2621; continue _fun19414 }
case 2619:
        r40 = 0;
case 2621:
        r41 = r40 * r31;
        r40 = 10;
        r41 = r41 * r40;
        r41 = r42.bind(r43)(r41);
        r50 = r41 / r40;
        r43 = r32.Math;
        r42 = r43.round;
        r41 = r29.carboidrati_disponibili_g;
        if(r41) { _fun19414_ip = 2662; continue _fun19414 }
case 2660:
        r41 = 0;
case 2662:
        r41 = r41 * r31;
        r42 = r42.bind(r43)(r41);
        r47 = 'basso';
        if(!(!(r50 <= r40))) { _fun19414_ip = 2692; continue _fun19414 }
case 2679:
        r40 = 19;
        if(!(r50 <= r40)) { _fun19414_ip = 2689; continue _fun19414 }
case 2686:
        r37 = r39;
case 2689:
        r47 = r37;
case 2692:
        r37 = _env_r17_slot6;
        r37 = r37.impatto;
        r37 = r37.bind(r3)(r47, r30);
        r51 = r37.color;
        r37 = _env_r17_slot31;
        r40 = r37.jsxs;
        r37 = _env_r17_slot3;
        r39 = r37.Text;
        r37 = {};
        r41 = r20.porzIntLive;
        r37['style'] = r41;
        r43 = {};
        r43['count'] = r31;
        r41 = 'ricetta.porzioni';
        r43 = r21.bind(r3)(r41, r43);
        r41 = new Array(4);
        r41[0] = r43;
        r44 = '  ·  ';
        r41[1] = r44;
        r43 = _env_r17_slot31;
        r46 = r43.jsx;
        r43 = _env_r17_slot3;
        r45 = r43.Text;
        r43 = {};
        r49 = {};
        r52 = _env_r17_slot6;
        r52 = r52.fonts;
        r52 = r52.bold;
        r49['fontFamily'] = r52;
        r49['color'] = r51;
        r43['style'] = r49;
        r49 = 'comune.cg';
        r53 = r21.bind(r3)(r49);
        r49 = r32.String;
        r52 = r49.bind(r3)(r50);
        r51 = r52.replace;
        r50 = '.';
        r49 = ',';
        r60 = r51.bind(r52)(r50, r49);
        r47 = r48 + r47;
        r48 = r21.bind(r3)(r47);
        r47 = r48.toLowerCase;
        r58 = r47.bind(r48)();
        r47 = r32.HermesInternal;
        r50 = r47.concat;
        r61 = ' ';
        r59 = ' (';
        r57 = ')';
        r63 = r54;
        r62 = r53;
        r47 = r63[r50](r62, r61, r60, r59, r58, r57, r56);
        r43['children'] = r47;
        r43 = r46.bind(r3)(r45, r43);
        r41[2] = r43;
        r43 = {};
        r43['n'] = r42;
        r42 = 'cibo.gCarbo';
        r43 = r21.bind(r3)(r42, r43);
        r42 = r32.HermesInternal;
        r42 = r42.concat;
        r42 = r42.bind(r44)(r43);
        r41[3] = r42;
        r37['children'] = r41;
        r37 = r40.bind(r3)(r39, r37);
        r36[2] = r37;
        r37 = _env_r17_slot31;
        r40 = r37.jsx;
        r37 = _env_r17_slot3;
        r39 = r37.Text;
        r37 = {};
        r41 = r20.porzIntNota;
        r37['style'] = r41;
        r41 = 'ricetta.porzioneCambia';
        r41 = r21.bind(r3)(r41);
        r37['children'] = r41;
        r37 = r40.bind(r3)(r39, r37);
        r36[3] = r37;
        r13['children'] = r36;
        r12 = r35.bind(r3)(r15, r13);
case 3043:
        r11[7] = r12;
        r12 = _env_r17_slot31;
        r15 = r12.jsx;
        r12 = _env_r17_slot15;
        r13 = r12.default;
        r12 = {};
        r35 = r28.dims;
        r12['dims'] = r35;
        r28 = r28.sintesi;
        r12['sintesi'] = r28;
        r28 = undefined;
        if(!(r31 !== r25)) { _fun19414_ip = 3112; continue _fun19414 }
case 3095:
        r35 = {};
        r35['count'] = r31;
        r31 = 'ricetta.porzioni';
        r28 = r21.bind(r3)(r31, r35);
case 3112:
        r12['porzioni'] = r28;
        r28 = function() { // Original name: onInfo, environment: r18
            _fun19434: for(var _fun19434_ip = 0; ; ) switch(_fun19434_ip) {
case 0:
                r4 = _closure0_slot0;
                r0 = null;
                r1 = r4 == r0;
                r0 = undefined;
                if(r1) { _fun19434_ip = 59; continue _fun19434 }
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
        r12['onInfo'] = r28;
        r28 = function() { // Original name: onFonti, environment: r18
            _fun19435: for(var _fun19435_ip = 0; ; ) switch(_fun19435_ip) {
case 0:
                r4 = _closure0_slot0;
                r0 = null;
                r1 = r4 == r0;
                r0 = undefined;
                if(r1) { _fun19435_ip = 59; continue _fun19435 }
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
        r12['onFonti'] = r28;
        r12 = r15.bind(r3)(r13, r12);
        r11[8] = r12;
        r12 = r38;
        if(!r12) { _fun19414_ip = 3395; continue _fun19414 }
case 3155:
        r13 = _env_r17_slot31;
        r28 = r13.jsxs;
        r13 = _env_r17_slot3;
        r15 = r13.View;
        r13 = {};
        r31 = r20.contesto;
        r13['style'] = r31;
        r31 = _env_r17_slot31;
        r36 = r31.jsxs;
        r31 = _env_r17_slot3;
        r35 = r31.View;
        r31 = {};
        r37 = r20.contestoHead;
        r31['style'] = r37;
        r37 = _env_r17_slot31;
        r40 = r37.jsx;
        r37 = _env_r17_slot7;
        r39 = r37.Ionicons;
        r37 = {'name': 'barbell-outline', 'size': 16};
        r41 = r30.greenDeep;
        r37['color'] = r41;
        r39 = r40.bind(r3)(r39, r37);
        r37 = new Array(2);
        r37[0] = r39;
        r39 = _env_r17_slot31;
        r41 = r39.jsx;
        r39 = _env_r17_slot3;
        r40 = r39.Text;
        r39 = {};
        r42 = r20.contestoH;
        r39['style'] = r42;
        r42 = 'ricetta.quandoHaSenso';
        r42 = r21.bind(r3)(r42);
        r39['children'] = r42;
        r39 = r41.bind(r3)(r40, r39);
        r37[1] = r39;
        r31['children'] = r37;
        r35 = r36.bind(r3)(r35, r31);
        r31 = new Array(2);
        r31[0] = r35;
        r35 = _env_r17_slot31;
        r37 = r35.jsx;
        r35 = _env_r17_slot3;
        r36 = r35.Text;
        r35 = {};
        r39 = r20.contestoP;
        r35['style'] = r39;
        r35['children'] = r38;
        r35 = r37.bind(r3)(r36, r35);
        r31[1] = r35;
        r13['children'] = r31;
        r12 = r28.bind(r3)(r15, r13);
case 3395:
        r11[9] = r12;
        r12 = _env_r17_slot31;
        r15 = r12.jsx;
        r12 = _env_r17_slot3;
        r13 = r12.View;
        r12 = {};
        r28 = r20.macros;
        r12['style'] = r28;
        r28 = 'ricetta.macro.kcal';
        r31 = r21.bind(r3)(r28);
        r28 = new Array(2);
        r28[0] = r31;
        r31 = r29.kcal;
        r28[1] = r31;
        r31 = new Array(4);
        r31[0] = r28;
        r28 = 'ricetta.macro.carbo';
        r35 = r21.bind(r3)(r28);
        r28 = new Array(2);
        r28[0] = r35;
        r35 = r29.carboidrati_disponibili_g;
        r28[1] = r35;
        r31[1] = r28;
        r28 = 'ricetta.macro.prot';
        r35 = r21.bind(r3)(r28);
        r28 = new Array(2);
        r28[0] = r35;
        r35 = r29.proteine_g;
        r28[1] = r35;
        r31[2] = r28;
        r28 = 'ricetta.macro.fibre';
        r35 = r21.bind(r3)(r28);
        r28 = new Array(2);
        r28[0] = r35;
        r29 = r29.fibre_g;
        r28[1] = r29;
        r31[3] = r28;
        r29 = r31.map;
        r28 = function(a0) { // Environment: r18
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
            r0 = _env_r6_slot31;
            r2 = r0.jsxs;
            r0 = _env_r6_slot3;
            r1 = r0.View;
            r0 = {};
            r9 = _closure0_slot1;
            r5 = r9.mac;
            r0['style'] = r5;
            r5 = _env_r6_slot31;
            r8 = r5.jsx;
            r5 = _env_r6_slot3;
            r7 = r5.Text;
            r5 = {};
            r11 = r9.macV;
            r5['style'] = r11;
            r5['children'] = r10;
            r7 = r8.bind(r4)(r7, r5);
            r5 = new Array(2);
            r5[0] = r7;
            r7 = _env_r6_slot31;
            r8 = r7.jsx;
            r6 = _env_r6_slot3;
            r7 = r6.Text;
            r6 = {};
            r9 = r9.macL;
            r6['style'] = r9;
            r6['children'] = r3;
            r6 = r8.bind(r4)(r7, r6);
            r5[1] = r6;
            r0['children'] = r5;
            r0 = r2.bind(r4)(r1, r0, r3);
            return r0;
        };
        r28 = r29.bind(r31)(r28);
        r12['children'] = r28;
        r12 = r15.bind(r3)(r13, r12);
        r11[10] = r12;
        r12 = _env_r17_slot31;
        r15 = r12.jsxs;
        r12 = _env_r17_slot3;
        r13 = r12.Pressable;
        r12 = {};
        r29 = r20.favFull;
        r28 = new Array(2);
        r28[0] = r29;
        r29 = r33;
        if(!r33) { _fun19414_ip = 3628; continue _fun19414 }
case 3622:
        r29 = r20.favFullOn;
case 3628:
        r28[1] = r29;
        r12['style'] = r28;
        r12['onPress'] = r16;
        r16 = _env_r17_slot31;
        r29 = r16.jsx;
        r16 = _env_r17_slot7;
        r28 = r16.Ionicons;
        r16 = {};
        r31 = 'heart-outline';
        if(!r33) { _fun19414_ip = 3671; continue _fun19414 }
case 3667:
        r31 = 'heart';
case 3671:
        r16['name'] = r31;
        r31 = 20;
        r16['size'] = r31;
        if(r33) { _fun19414_ip = 3692; continue _fun19414 }
case 3685:
        r31 = r30.greenDeep;
        _fun19414_ip = 3698; continue _fun19414;
case 3692:
        r31 = r30.red;
case 3698:
        r16['color'] = r31;
        r28 = r29.bind(r3)(r28, r16);
        r16 = new Array(2);
        r16[0] = r28;
        r28 = _env_r17_slot31;
        r31 = r28.jsx;
        r28 = _env_r17_slot3;
        r29 = r28.Text;
        r28 = {};
        r36 = r20.favFullTxt;
        r35 = new Array(2);
        r35[0] = r36;
        r36 = r33;
        if(!r36) { _fun19414_ip = 3771; continue _fun19414 }
case 3756:
        r37 = {};
        r38 = r30.red;
        r37['color'] = r38;
        r36 = r37;
case 3771:
        r35[1] = r36;
        r28['style'] = r35;
        if(r33) { _fun19414_ip = 3793; continue _fun19414 }
case 3782:
        r33 = 'ricetta.salva';
        r33 = r21.bind(r3)(r33);
        _fun19414_ip = 3802; continue _fun19414;
case 3793:
        r35 = 'ricetta.salvato';
        r33 = r21.bind(r3)(r35);
case 3802:
        r28['children'] = r33;
        r28 = r31.bind(r3)(r29, r28);
        r16[1] = r28;
        r12['children'] = r16;
        r12 = r15.bind(r3)(r13, r12);
        r11[11] = r12;
        r12 = _env_r17_slot31;
        r15 = r12.jsx;
        r12 = _env_r17_slot3;
        r13 = r12.Pressable;
        r12 = {};
        r16 = r20.planBtn;
        r12['style'] = r16;
        r16 = function() { // Original name: onPress, environment: r18
            r2 = _closure0_slot6;
            r1 = undefined;
            r0 = true;
            r0 = r2.bind(r1)(r0);
            return r0;
        };
        r12['onPress'] = r16;
        r16 = _env_r17_slot31;
        r29 = r16.jsx;
        r16 = _env_r17_slot3;
        r28 = r16.Text;
        r16 = {};
        r31 = r20.planTxt;
        r16['style'] = r31;
        if(r34) { _fun19414_ip = 3921; continue _fun19414 }
case 3902:
        r31 = 'ricetta.aggiungiPiano';
        r33 = r21.bind(r3)(r31);
        r31 = '🗓  ';
        r31 = r31 + r33;
        _fun19414_ip = 3941; continue _fun19414;
case 3921:
        r32 = r32.HermesInternal;
        r33 = r32.concat;
        r32 = '✓ ';
        r31 = r33.bind(r32)(r34);
case 3941:
        r16['children'] = r31;
        r16 = r29.bind(r3)(r28, r16);
        r12['children'] = r16;
        r12 = r15.bind(r3)(r13, r12);
        r11[12] = r12;
        r12 = _env_r17_slot31;
        r15 = r12.jsx;
        r12 = _env_r17_slot20;
        r13 = r12.default;
        r12 = {};
        r16 = 'Condividi questa scelta';
        r12['label'] = r16;
        r16 = {};
        r28 = 10;
        r16['marginTop'] = r28;
        r12['style'] = r16;
        r16 = function(a0, a1) { // Original name: renderCard, environment: r18
            r0 = _env_r5_slot31;
            r3 = r0.jsx;
            r0 = _env_r5_slot22;
            r2 = r0.default;
            r1 = {};
            r0 = a1;
            r1['ref'] = r0;
            r8 = _closure0_slot2;
            r6 = _closure0_slot4;
            r0 = undefined;
            r7 = 'nome';
            r7 = r8.bind(r0)(r6, r7);
            r1['titolo'] = r7;
            r7 = _closure0_slot16;
            r1['sottotitolo'] = r7;
            r7 = _env_r5_slot12;
            r7 = r7.recipeImage;
            r6 = r6.id;
            r6 = r7.bind(r0)(r6);
            r1['foto'] = r6;
            r6 = '🍽️';
            r1['emoji'] = r6;
            r5 = _env_r5_slot21;
            r6 = r5.verdettoDaFascia;
            r5 = _closure0_slot15;
            r5 = r5.fascia;
            r5 = r6.bind(r0)(r5);
            r1['verdetto'] = r5;
            r4 = _closure0_slot17;
            r1['benefici'] = r4;
            r4 = a0;
            r1['codice'] = r4;
            r0 = r3.bind(r0)(r2, r1);
            return r0;
        };
        r12['renderCard'] = r16;
        r12 = r15.bind(r3)(r13, r12);
        r11[13] = r12;
        r12 = _env_r17_slot31;
        r15 = r12.jsx;
        r12 = _env_r17_slot30;
        r13 = r12.default;
        r12 = {};
        r16 = function() { // Original name: snapshot, environment: r18
            _fun19439: for(var _fun19439_ip = 0; ; ) switch(_fun19439_ip) {
case 0:
                r0 = {};
                r2 = _closure0_slot4;
                r3 = r2.nome;
                r0['nome'] = r3;
                r3 = r2.nome_en;
                r0['nome_en'] = r3;
                r3 = r2.nome_es;
                r0['nome_es'] = r3;
                r3 = r2.nome_de;
                r0['nome_de'] = r3;
                r2 = r2.nome_fr;
                r0['nome_fr'] = r2;
                r2 = 'ricetta';
                r0['fonte'] = r2;
                r2 = _closure0_slot15;
                r2 = r2.fascia;
                r0['fascia'] = r2;
                r2 = _closure0_slot15;
                r3 = r2.carico_glicemico;
                r2 = null;
                if(!(r3 == r2)) { _fun19439_ip = 93; continue _fun19439 }
case 91:
                r3 = 0;
case 93:
                r0['cg'] = r3;
                r3 = _env_r3_slot24;
                r5 = r3.kcalRicetta;
                r4 = _closure0_slot4;
                r3 = undefined;
                r3 = r5.bind(r3)(r4);
                if(!(r3 == r2)) { _fun19439_ip = 128; continue _fun19439 }
case 126:
                r3 = 0;
case 128:
                r0['kcal'] = r3;
                r3 = _closure0_slot15;
                r3 = r3.carboidrati_disponibili_g;
                if(!(r3 == r2)) { _fun19439_ip = 147; continue _fun19439 }
case 145:
                r3 = 0;
case 147:
                r0['carbo'] = r3;
                r3 = _closure0_slot15;
                r3 = r3.proteine_g;
                if(!(r3 == r2)) { _fun19439_ip = 167; continue _fun19439 }
case 165:
                r3 = 0;
case 167:
                r0['prot'] = r3;
                r3 = _closure0_slot15;
                r3 = r3.grassi_g;
                if(!(r3 == r2)) { _fun19439_ip = 187; continue _fun19439 }
case 185:
                r3 = 0;
case 187:
                r0['grassi'] = r3;
                r1 = _closure0_slot15;
                r1 = r1.fibre_g;
                if(!(r1 == r2)) { _fun19439_ip = 207; continue _fun19439 }
case 205:
                r1 = 0;
case 207:
                r0['fibre'] = r1;
                r1 = 0;
                r0['grammi'] = r1;
                return r0;
            }
        };
        r12['snapshot'] = r16;
        r12 = r15.bind(r3)(r13, r12);
        r11[14] = r12;
        r12 = _env_r17_slot31;
        r15 = r12.jsx;
        r12 = _env_r17_slot3;
        r13 = r12.Text;
        r12 = {};
        r16 = r20.secTitle;
        r12['style'] = r16;
        r16 = 'ricetta.ingredienti';
        r16 = r21.bind(r3)(r16);
        r12['children'] = r16;
        r12 = r15.bind(r3)(r13, r12);
        r11[15] = r12;
        r15 = r23.ingredienti;
        r13 = r15.map;
        r12 = function(a0, a1) { // Environment: r18
            _fun19440: for(var _fun19440_ip = 0; ; ) switch(_fun19440_ip) {
case 0:
                r8 = a0;
                r0 = _env_r5_slot25;
                r2 = r0.grammiCrudi;
                r1 = r8.nome;
                r0 = r8.grammi_porzione;
                r4 = undefined;
                r9 = r2.bind(r4)(r1, r0);
                r0 = _env_r5_slot31;
                r3 = r0.jsxs;
                r0 = _env_r5_slot3;
                r2 = r0.View;
                r1 = {};
                r11 = _closure0_slot1;
                r0 = r11.ing;
                r1['style'] = r0;
                r0 = _env_r5_slot31;
                r7 = r0.jsx;
                r0 = _env_r5_slot3;
                r6 = r0.Text;
                r0 = {};
                r11 = r11.ingN;
                r0['style'] = r11;
                r11 = null;
                if(!(r9 == r11)) { _fun19440_ip = 123; continue _fun19440 }
case 107:
                r13 = _closure0_slot2;
                r12 = 'nome';
                r12 = r13.bind(r4)(r8, r12);
                _fun19440_ip = 152; continue _fun19440;
case 123:
                r13 = _env_r5_slot25;
                r14 = r13.nomeSenzaCottura;
                r15 = _closure0_slot2;
                r13 = 'nome';
                r13 = r15.bind(r4)(r8, r13);
                r12 = r14.bind(r4)(r13);
case 152:
                r0['children'] = r12;
                r6 = r7.bind(r4)(r6, r0);
                r0 = new Array(2);
                r0[0] = r6;
                r6 = _env_r5_slot31;
                r7 = r6.jsx;
                r5 = _env_r5_slot3;
                r6 = r5.Text;
                r5 = {};
                r12 = _closure0_slot1;
                r12 = r12.ingQ;
                r5['style'] = r12;
                if(!(r9 == r11)) { _fun19440_ip = 236; continue _fun19440 }
case 208:
                r12 = _closure0_slot3;
                r11 = {};
                r8 = r8.grammi_porzione;
                r11['g'] = r8;
                r8 = 'ricetta.gPorz';
                r8 = r12.bind(r4)(r8, r11);
                _fun19440_ip = 257; continue _fun19440;
case 236:
                r11 = _closure0_slot3;
                r10 = {};
                r10['g'] = r9;
                r9 = 'ricetta.gCrudiPorz';
                r8 = r11.bind(r4)(r9, r10);
case 257:
                r5['children'] = r8;
                r5 = r7.bind(r4)(r6, r5);
                r0[1] = r5;
                r1['children'] = r0;
                r0 = a1;
                r0 = r3.bind(r4)(r2, r1, r0);
                return r0;
            }
        };
        r12 = r13.bind(r15)(r12);
        r11[16] = r12;
        r15 = r23.ingredienti;
        r13 = r15.some;
        r12 = function(a0) { // Environment: r18
            r0 = a0;
            r1 = _env_r1_slot25;
            r3 = r1.grammiCrudi;
            r2 = r0.nome;
            r1 = r0.grammi_porzione;
            r0 = undefined;
            r1 = r3.bind(r0)(r2, r1);
            r0 = null;
            r0 = r1 != r0;
            return r0;
        };
        r12 = r13.bind(r15)(r12);
        if(!r12) { _fun19414_ip = 4216; continue _fun19414 }
case 4167:
        r13 = _env_r17_slot31;
        r16 = r13.jsx;
        r13 = _env_r17_slot3;
        r15 = r13.Text;
        r13 = {};
        r28 = r20.ingNota;
        r13['style'] = r28;
        r28 = 'ricetta.ingCrudi';
        r28 = r21.bind(r3)(r28);
        r13['children'] = r28;
        r12 = r16.bind(r3)(r15, r13);
case 4216:
        r11[17] = r12;
        r12 = _env_r17_slot31;
        r15 = r12.jsx;
        r12 = _env_r17_slot3;
        r13 = r12.Text;
        r12 = {};
        r16 = r20.secTitle;
        r12['style'] = r16;
        r16 = 'ricetta.preparazione';
        r16 = r21.bind(r3)(r16);
        r12['children'] = r16;
        r12 = r15.bind(r3)(r13, r12);
        r11[18] = r12;
        r12 = 'procedimento';
        r15 = r24.bind(r3)(r23, r12);
        if(r15) { _fun19414_ip = 4290; continue _fun19414 }
case 4286:
        r15 = new Array(0);
case 4290:
        r13 = r15.map;
        r12 = function(a0, a1) { // Environment: r18
            r4 = a1;
            r1 = _env_r0_slot31;
            r3 = r1.jsxs;
            r0 = _env_r0_slot3;
            r2 = r0.Text;
            r1 = {};
            r0 = _closure0_slot1;
            r0 = r0.step;
            r1['style'] = r0;
            r0 = 1;
            r5 = r4 + r0;
            r0 = new Array(3);
            r0[0] = r5;
            r5 = '.  ';
            r0[1] = r5;
            r5 = a0;
            r0[2] = r5;
            r1['children'] = r0;
            r0 = undefined;
            r0 = r3.bind(r0)(r2, r1, r4);
            return r0;
        };
        r12 = r13.bind(r15)(r12);
        r11[19] = r12;
        r12 = r23.alternative;
        if(!r12) { _fun19414_ip = 4331; continue _fun19414 }
case 4317:
        r13 = r23.alternative;
        r13 = r13.length;
        r12 = r13 > r14;
case 4331:
        if(!r12) { _fun19414_ip = 4445; continue _fun19414 }
case 4334:
        r13 = _env_r17_slot31;
        r15 = r13.jsxs;
        r13 = _env_r17_slot3;
        r14 = r13.View;
        r13 = {};
        r16 = _env_r17_slot31;
        r29 = r16.jsx;
        r16 = _env_r17_slot3;
        r28 = r16.Text;
        r16 = {};
        r31 = r20.secTitle;
        r16['style'] = r31;
        r31 = 'ricetta.alternative';
        r31 = r21.bind(r3)(r31);
        r16['children'] = r31;
        r28 = r29.bind(r3)(r28, r16);
        r16 = new Array(2);
        r16[0] = r28;
        r31 = r23.alternative;
        r29 = r31.map;
        r28 = function(a0, a1) { // Environment: r18
            r8 = a0;
            r0 = _env_r5_slot31;
            r4 = r0.jsxs;
            r0 = _env_r5_slot3;
            r3 = r0.View;
            r2 = {};
            r9 = _closure0_slot1;
            r0 = r9.altGrp;
            r2['style'] = r0;
            r0 = _env_r5_slot31;
            r7 = r0.jsx;
            r0 = _env_r5_slot3;
            r6 = r0.Text;
            r0 = {};
            r10 = r9.altH;
            r0['style'] = r10;
            r12 = _closure0_slot3;
            r11 = {};
            r13 = _closure0_slot2;
            r1 = undefined;
            r10 = 'gruppo';
            r10 = r13.bind(r1)(r8, r10);
            r11['gruppo'] = r10;
            r10 = r8.base;
            r11['base'] = r10;
            r10 = 'comune.ig';
            r10 = r12.bind(r1)(r10);
            r11['igl'] = r10;
            r10 = r8.base_ig;
            r11['ig'] = r10;
            r10 = 'ricetta.altOra';
            r10 = r12.bind(r1)(r10, r11);
            r0['children'] = r10;
            r6 = r7.bind(r1)(r6, r0);
            r0 = new Array(2);
            r0[0] = r6;
            r6 = _env_r5_slot31;
            r7 = r6.jsx;
            r5 = _env_r5_slot3;
            r6 = r5.View;
            r5 = {};
            r9 = r9.chips;
            r5['style'] = r9;
            r10 = r8.opzioni;
            r9 = r10.map;
            r8 = function(a0) { // Environment: r8
                r0 = a0;
                r1 = _env_r6_slot31;
                r4 = r1.jsxs;
                r1 = _env_r6_slot3;
                r3 = r1.View;
                r2 = {};
                r9 = _closure0_slot1;
                r1 = r9.chip;
                r2['style'] = r1;
                r1 = _env_r6_slot31;
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
                r7 = _env_r6_slot31;
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
                r7 = _env_r6_slot31;
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
            r8 = r9.bind(r10)(r8);
            r5['children'] = r8;
            r5 = r7.bind(r1)(r6, r5);
            r0[1] = r5;
            r2['children'] = r0;
            r0 = a1;
            r0 = r4.bind(r1)(r3, r2, r0);
            return r0;
        };
        r28 = r29.bind(r31)(r28);
        r16[1] = r28;
        r13['children'] = r16;
        r12 = r15.bind(r3)(r14, r13);
case 4445:
        r11[20] = r12;
        r12 = _env_r17_slot31;
        r14 = r12.jsxs;
        r12 = _env_r17_slot3;
        r13 = r12.View;
        r12 = {};
        r15 = r20.tips;
        r12['style'] = r15;
        r15 = _env_r17_slot31;
        r28 = r15.jsx;
        r15 = _env_r17_slot3;
        r16 = r15.Text;
        r15 = {};
        r29 = r20.tipsH;
        r15['style'] = r29;
        r29 = 'ricetta.piuGraduale';
        r29 = r21.bind(r3)(r29);
        r15['children'] = r29;
        r16 = r28.bind(r3)(r16, r15);
        r15 = new Array(2);
        r15[0] = r16;
        r16 = 'consigli';
        r29 = r24.bind(r3)(r23, r16);
        if(r29) { _fun19414_ip = 4553; continue _fun19414 }
case 4549:
        r29 = new Array(0);
case 4553:
        r28 = r29.map;
        r16 = function(a0, a1) { // Environment: r18
            _fun19445: for(var _fun19445_ip = 0; ; ) switch(_fun19445_ip) {
case 0:
                r4 = a1;
                r1 = _env_r0_slot31;
                r3 = r1.jsxs;
                r0 = _env_r0_slot3;
                r2 = r0.Text;
                r1 = {};
                r0 = _closure0_slot1;
                r0 = r0.tip;
                r5 = new Array(2);
                r5[0] = r0;
                r9 = _closure0_slot2;
                r8 = _closure0_slot4;
                r0 = undefined;
                r6 = 'consigli';
                r6 = r9.bind(r0)(r8, r6);
                if(r6) { _fun19445_ip = 74; continue _fun19445 }
case 70:
                r6 = new Array(0);
case 74:
                r8 = r6.length;
                r6 = 1;
                r6 = r8 - r6;
                r6 = r4 === r6;
                if(!r6) { _fun19445_ip = 103; continue _fun19445 }
case 93:
                r7 = _closure0_slot1;
                r6 = r7.tipNote;
case 103:
                r5[1] = r6;
                r1['style'] = r5;
                r5 = ['• '];
                r6 = a0;
                r5[1] = r6;
                r1['children'] = r5;
                r0 = r3.bind(r0)(r2, r1, r4);
                return r0;
            }
        };
        r16 = r28.bind(r29)(r16);
        r15[1] = r16;
        r12['children'] = r15;
        r12 = r14.bind(r3)(r13, r12);
        r11[21] = r12;
        r12 = _env_r17_slot31;
        r14 = r12.jsx;
        r12 = _env_r17_slot16;
        r13 = r12.default;
        r12 = {};
        r12['base'] = r23;
        r12 = r14.bind(r3)(r13, r12);
        r11[22] = r12;
        r12 = _env_r17_slot31;
        r14 = r12.jsxs;
        r12 = _env_r17_slot3;
        r13 = r12.Pressable;
        r12 = {};
        r15 = r20.tuoPiatto;
        r12['style'] = r15;
        r15 = function() { // Original name: onPress, environment: r18
            r2 = _closure0_slot0;
            r1 = r2.navigate;
            r0 = 'Foto';
            r0 = r1.bind(r2)(r0);
            return r0;
        };
        r12['onPress'] = r15;
        r15 = _env_r17_slot31;
        r28 = r15.jsx;
        r15 = _env_r17_slot3;
        r16 = r15.View;
        r15 = {};
        r29 = r20.tpIcon;
        r15['style'] = r29;
        r29 = _env_r17_slot31;
        r32 = r29.jsx;
        r29 = _env_r17_slot7;
        r31 = r29.Ionicons;
        r29 = {'name': 'camera', 'size': 20};
        r33 = r30.goldInk;
        r29['color'] = r33;
        r29 = r32.bind(r3)(r31, r29);
        r15['children'] = r29;
        r16 = r28.bind(r3)(r16, r15);
        r15 = new Array(3);
        r15[0] = r16;
        r16 = _env_r17_slot31;
        r29 = r16.jsxs;
        r16 = _env_r17_slot3;
        r28 = r16.View;
        r16 = {};
        r31 = {};
        r31['flex'] = r25;
        r16['style'] = r31;
        r31 = _env_r17_slot31;
        r33 = r31.jsx;
        r31 = _env_r17_slot3;
        r32 = r31.Text;
        r31 = {};
        r34 = r20.tpH;
        r31['style'] = r34;
        r34 = 'ricetta.tuoPiattoH';
        r34 = r21.bind(r3)(r34);
        r31['children'] = r34;
        r32 = r33.bind(r3)(r32, r31);
        r31 = new Array(2);
        r31[0] = r32;
        r32 = _env_r17_slot31;
        r34 = r32.jsx;
        r32 = _env_r17_slot3;
        r33 = r32.Text;
        r32 = {};
        r35 = r20.tpS;
        r32['style'] = r35;
        r35 = 'ricetta.tuoPiattoS';
        r35 = r21.bind(r3)(r35);
        r32['children'] = r35;
        r32 = r34.bind(r3)(r33, r32);
        r31[1] = r32;
        r16['children'] = r31;
        r16 = r29.bind(r3)(r28, r16);
        r15[1] = r16;
        r16 = _env_r17_slot31;
        r29 = r16.jsx;
        r16 = _env_r17_slot7;
        r28 = r16.Ionicons;
        r16 = {'name': 'chevron-forward', 'size': 18};
        r30 = r30.goldInk;
        r16['color'] = r30;
        r16 = r29.bind(r3)(r28, r16);
        r15[2] = r16;
        r12['children'] = r15;
        r12 = r14.bind(r3)(r13, r12);
        r11[23] = r12;
        r12 = _env_r17_slot31;
        r14 = r12.jsx;
        r12 = _env_r17_slot18;
        r13 = r12.default;
        r12 = {};
        r15 = r24.bind(r3)(r23, r22);
        r12['cibo'] = r15;
        r15 = 'ricetta';
        r12['fonte'] = r15;
        r12 = r14.bind(r3)(r13, r12);
        r11[24] = r12;
        r8['children'] = r11;
        r8 = r10.bind(r3)(r9, r8);
        r4['children'] = r8;
        r6 = r7.bind(r3)(r6, r4);
        r4 = new Array(2);
        r4[0] = r6;
        if(!r5) { _fun19414_ip = 5789; continue _fun19414 }
case 5058:
        r6 = _env_r17_slot31;
        r8 = r6.jsxs;
        r6 = _env_r17_slot3;
        r7 = r6.View;
        r6 = {};
        r9 = r20.overlay;
        r6['style'] = r9;
        r9 = _env_r17_slot31;
        r11 = r9.jsx;
        r9 = _env_r17_slot3;
        r10 = r9.Pressable;
        r9 = {};
        r12 = r20.overlayBg;
        r9['style'] = r12;
        r12 = function() { // Original name: onPress, environment: r18
            r2 = _closure0_slot6;
            r1 = undefined;
            r0 = false;
            r0 = r2.bind(r1)(r0);
            return r0;
        };
        r9['onPress'] = r12;
        r10 = r11.bind(r3)(r10, r9);
        r9 = new Array(2);
        r9[0] = r10;
        r10 = _env_r17_slot31;
        r12 = r10.jsxs;
        r10 = _env_r17_slot3;
        r11 = r10.View;
        r10 = {};
        r13 = r20.sheet;
        r10['style'] = r13;
        r13 = _env_r17_slot31;
        r15 = r13.jsx;
        r13 = _env_r17_slot3;
        r14 = r13.Text;
        r13 = {};
        r16 = r20.sheetTitle;
        r13['style'] = r16;
        r16 = 'ricetta.aggiungiPiano';
        r16 = r21.bind(r3)(r16);
        r13['children'] = r16;
        r14 = r15.bind(r3)(r14, r13);
        r13 = new Array(8);
        r13[0] = r14;
        r14 = _env_r17_slot31;
        r16 = r14.jsx;
        r14 = _env_r17_slot3;
        r15 = r14.Text;
        r14 = {};
        r28 = r20.sheetSub;
        r14['style'] = r28;
        r14['numberOfLines'] = r25;
        r22 = r24.bind(r3)(r23, r22);
        r14['children'] = r22;
        r14 = r16.bind(r3)(r15, r14);
        r13[1] = r14;
        r14 = _env_r17_slot31;
        r16 = r14.jsx;
        r14 = _env_r17_slot3;
        r15 = r14.Text;
        r14 = {};
        r22 = r20.sheetLabel;
        r14['style'] = r22;
        r22 = 'ricetta.giorno';
        r22 = r21.bind(r3)(r22);
        r14['children'] = r22;
        r14 = r16.bind(r3)(r15, r14);
        r13[2] = r14;
        r14 = _env_r17_slot31;
        r16 = r14.jsx;
        r14 = _env_r17_slot3;
        r15 = r14.View;
        r14 = {};
        r22 = r20.pickRow;
        r14['style'] = r22;
        r22 = _env_r17_slot27;
        r24 = r22.GIORNI;
        r23 = r24.map;
        r22 = function(a0, a1) { // Environment: r18
            _fun19448: for(var _fun19448_ip = 0; ; ) switch(_fun19448_ip) {
case 0:
                r4 = a1;
                var _closure1_slot0 = r4;
                r0 = _env_r5_slot31;
                r3 = r0.jsx;
                r0 = _env_r5_slot3;
                r2 = r0.Pressable;
                r1 = {};
                r7 = _closure0_slot1;
                r8 = r7.pk;
                r7 = new Array(2);
                r7[0] = r8;
                r8 = _closure0_slot7;
                r8 = r8 === r4;
                if(!r8) { _fun19448_ip = 74; continue _fun19448 }
case 64:
                r9 = _closure0_slot1;
                r8 = r9.pkOn;
case 74:
                r7[1] = r8;
                r1['style'] = r7;
                r6 = function() { // Original name: onPress, environment: r6
                    r2 = _closure0_slot8;
                    r1 = _closure1_slot0;
                    r0 = undefined;
                    r0 = r2.bind(r0)(r1);
                    return r0;
                };
                r1['onPress'] = r6;
                r6 = _env_r5_slot31;
                r7 = r6.jsx;
                r5 = _env_r5_slot3;
                r6 = r5.Text;
                r5 = {};
                r8 = _closure0_slot1;
                r9 = r8.pkTxt;
                r8 = new Array(2);
                r8[0] = r9;
                r9 = _closure0_slot7;
                r9 = r9 === r4;
                if(!r9) { _fun19448_ip = 150; continue _fun19448 }
case 140:
                r10 = _closure0_slot1;
                r9 = r10.pkTxtOn;
case 150:
                r8[1] = r9;
                r5['style'] = r8;
                r9 = _closure0_slot3;
                r0 = 'giorni.';
                r8 = r0 + r4;
                r0 = undefined;
                r11 = r9.bind(r0)(r8);
                r10 = r11.slice;
                r9 = 0;
                r8 = 3;
                r8 = r10.bind(r11)(r9, r8);
                r5['children'] = r8;
                r5 = r7.bind(r0)(r6, r5);
                r1['children'] = r5;
                r0 = r3.bind(r0)(r2, r1, r4);
                return r0;
            }
        };
        r22 = r23.bind(r24)(r22);
        r14['children'] = r22;
        r14 = r16.bind(r3)(r15, r14);
        r13[3] = r14;
        r14 = _env_r17_slot31;
        r16 = r14.jsx;
        r14 = _env_r17_slot3;
        r15 = r14.Text;
        r14 = {};
        r22 = r20.sheetLabel;
        r14['style'] = r22;
        r22 = 'ricetta.pasto';
        r22 = r21.bind(r3)(r22);
        r14['children'] = r22;
        r14 = r16.bind(r3)(r15, r14);
        r13[4] = r14;
        r14 = _env_r17_slot31;
        r16 = r14.jsx;
        r14 = _env_r17_slot3;
        r15 = r14.View;
        r14 = {};
        r22 = r20.pickRow;
        r14['style'] = r22;
        r22 = _env_r17_slot27;
        r24 = r22.PASTI;
        r23 = r24.map;
        r22 = function(a0) { // Environment: r18
            _fun19450: for(var _fun19450_ip = 0; ; ) switch(_fun19450_ip) {
case 0:
                r0 = a0;
                var _closure1_slot0 = r0;
                r1 = _env_r5_slot31;
                r4 = r1.jsx;
                r1 = _env_r5_slot3;
                r3 = r1.Pressable;
                r2 = {};
                r7 = _closure0_slot1;
                r8 = r7.pk;
                r7 = new Array(2);
                r7[0] = r8;
                r9 = _closure0_slot9;
                r8 = r0.id;
                r8 = r9 === r8;
                if(!r8) { _fun19450_ip = 79; continue _fun19450 }
case 69:
                r9 = _closure0_slot1;
                r8 = r9.pkOn;
case 79:
                r7[1] = r8;
                r2['style'] = r7;
                r6 = function() { // Original name: onPress, environment: r6
                    r2 = _closure0_slot10;
                    r0 = _closure1_slot0;
                    r1 = r0.id;
                    r0 = undefined;
                    r0 = r2.bind(r0)(r1);
                    return r0;
                };
                r2['onPress'] = r6;
                r6 = _env_r5_slot31;
                r7 = r6.jsx;
                r5 = _env_r5_slot3;
                r6 = r5.Text;
                r5 = {};
                r8 = _closure0_slot1;
                r9 = r8.pkTxt;
                r8 = new Array(2);
                r8[0] = r9;
                r10 = _closure0_slot9;
                r9 = r0.id;
                r9 = r10 === r9;
                if(!r9) { _fun19450_ip = 160; continue _fun19450 }
case 150:
                r10 = _closure0_slot1;
                r9 = r10.pkTxtOn;
case 160:
                r8[1] = r9;
                r5['style'] = r8;
                r9 = _closure0_slot3;
                r8 = r0.id;
                r1 = 'pasti.';
                r8 = r1 + r8;
                r1 = undefined;
                r8 = r9.bind(r1)(r8);
                r5['children'] = r8;
                r5 = r7.bind(r1)(r6, r5);
                r2['children'] = r5;
                r0 = r0.id;
                r0 = r4.bind(r1)(r3, r2, r0);
                return r0;
            }
        };
        r22 = r23.bind(r24)(r22);
        r14['children'] = r22;
        r14 = r16.bind(r3)(r15, r14);
        r13[5] = r14;
        r14 = _env_r17_slot31;
        r16 = r14.jsx;
        r14 = _env_r17_slot3;
        r15 = r14.Pressable;
        r14 = {};
        r22 = r20.confirm;
        r14['style'] = r22;
        r14['onPress'] = r19;
        r19 = _env_r17_slot31;
        r23 = r19.jsx;
        r19 = _env_r17_slot3;
        r22 = r19.Text;
        r19 = {};
        r24 = r20.confirmTxt;
        r19['style'] = r24;
        r25 = {};
        r24 = 'giorni.';
        r24 = r24 + r27;
        r24 = r21.bind(r3)(r24);
        r25['g'] = r24;
        r24 = 'pasti.';
        r24 = r24 + r26;
        r24 = r21.bind(r3)(r24);
        r25['p'] = r24;
        r24 = 'ricetta.aggiungiA';
        r24 = r21.bind(r3)(r24, r25);
        r19['children'] = r24;
        r19 = r23.bind(r3)(r22, r19);
        r14['children'] = r19;
        r14 = r16.bind(r3)(r15, r14);
        r13[6] = r14;
        r14 = _env_r17_slot31;
        r16 = r14.jsx;
        r14 = _env_r17_slot3;
        r15 = r14.Pressable;
        r14 = {};
        r19 = r20.cancel;
        r14['style'] = r19;
        r18 = function() { // Original name: onPress, environment: r18
            r2 = _closure0_slot6;
            r1 = undefined;
            r0 = false;
            r0 = r2.bind(r1)(r0);
            return r0;
        };
        r14['onPress'] = r18;
        r18 = _env_r17_slot31;
        r19 = r18.jsx;
        r17 = _env_r17_slot3;
        r18 = r17.Text;
        r17 = {};
        r20 = r20.cancelTxt;
        r17['style'] = r20;
        r20 = 'ricetta.annulla';
        r20 = r21.bind(r3)(r20);
        r17['children'] = r20;
        r17 = r19.bind(r3)(r18, r17);
        r14['children'] = r17;
        r14 = r16.bind(r3)(r15, r14);
        r13[7] = r14;
        r10['children'] = r13;
        r10 = r12.bind(r3)(r11, r10);
        r9[1] = r10;
        r6['children'] = r9;
        r5 = r8.bind(r3)(r7, r6);
case 5789:
        r4[1] = r5;
        r0['children'] = r4;
        r0 = r2.bind(r3)(r1, r0);
        return r0;
    }
}

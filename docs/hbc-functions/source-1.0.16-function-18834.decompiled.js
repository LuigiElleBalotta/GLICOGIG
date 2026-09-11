function CondividiButton(a0) {
    _fun18834: for(var _fun18834_ip = 0; ; ) switch(_fun18834_ip) {
case 0:
        r1 = a0;
        r16 = r1.label;
        r10 = r1.renderCard;
        r15 = r1.style;
        r1 = _env_r5_slot5;
        r1 = r1.useColors;
        r3 = undefined;
        r17 = r1.bind(r3)();
        r1 = _env_r5_slot5;
        r2 = r1.useThemedStyles;
        r1 = _env_r5_slot11;
        r11 = r2.bind(r3)(r1);
        r1 = _env_r5_slot2;
        r1 = r1.useRef;
        r2 = null;
        r9 = r1.bind(r3)(r2);
        var _closure0_slot0 = r9;
        r1 = _env_r5_slot2;
        r1 = r1.useState;
        r2 = r1.bind(r3)(r2);
        r1 = _env_r5_slot1;
        r1 = r1.default;
        r7 = 2;
        r1 = r1.bind(r3)(r2, r7);
        r4 = 0;
        r8 = r1[r4];
        r2 = 1;
        r1 = r1[r2];
        var _closure0_slot1 = r1;
        r1 = _env_r5_slot2;
        r6 = r1.useState;
        r1 = false;
        r6 = r6.bind(r3)(r1);
        r1 = _env_r5_slot1;
        r1 = r1.default;
        r1 = r1.bind(r3)(r6, r7);
        r12 = r1[r4];
        var _closure0_slot2 = r12;
        r1 = r1[r2];
        var _closure0_slot3 = r1;
        r1 = _env_r5_slot2;
        r4 = r1.useEffect;
        r2 = function() { // Environment: r0
            r0 = _env_r0_slot8;
            r1 = r0.getCodiceInvito;
            r0 = undefined;
            r3 = r1.bind(r0)();
            r2 = r3.then;
            r1 = function(a0) { // Environment: r1
                _fun18836: for(var _fun18836_ip = 0; ; ) switch(_fun18836_ip) {
case 0:
                    r4 = a0;
                    r2 = _closure0_slot1;
                    r3 = null;
                    r5 = r4 == r3;
                    r1 = undefined;
                    r0 = undefined;
                    if(r5) { _fun18836_ip = 29; continue _fun18836 }
case 23:
                    r0 = r4.codice;
case 29:
                    if(!(r0 == r3)) { _fun18836_ip = 35; continue _fun18836 }
case 33:
                    r0 = null;
case 35:
                    r0 = r2.bind(r1)(r0);
                    return r0;
                }
            };
            r1 = r2.bind(r3)(r1);
            return r0;
        };
        r1 = new Array(0);
        r1 = r4.bind(r3)(r2, r1);
        r0 = function() { // Environment: r0
            r1 = _env_r1_slot0;
            r3 = r1.default;
            r2 = undefined;
            r1 = function* () { // Environment: r0
                r0 = function* () { // Original name: ?anon_0_, environment: r0
                    _fun18839: for(var _fun18839_ip = 0; ; ) switch(_fun18839_ip) {
case 0:
                        StartGenerator();
                        ResumeGenerator(result_out_reg=0, return_bool_out_reg=1);
                        if(r1) { _fun18839_ip = 104; continue _fun18839 }
case 7:
                        r2 = _closure0_slot2;
                        r1 = undefined;
                        if(r2) { _fun18839_ip = 101; continue _fun18839 }
case 19:
                        r3 = _closure0_slot3;
                        r2 = true;
                        r2 = r3.bind(r1)(r2);
                        r2 = _env_r3_slot7;
                        r5 = r2.condividiCard;
                        r2 = _closure0_slot0;
                        r2 = r5.bind(r1)(r2);
                        SaveGenerator(address=56);
case 54:
                        return r2;
case 56:
                        ResumeGenerator(result_out_reg=2, return_bool_out_reg=5);
                        if(r5) { _fun18839_ip = 98; continue _fun18839 }
case 62:
                        r5 = _closure0_slot3;
                        r4 = false;
                        r4 = r5.bind(r1)(r4);
                        if(!r2) { _fun18839_ip = 95; continue _fun18839 }
case 76:
                        r3 = _env_r3_slot9;
                        r4 = r3.logEvento;
                        r3 = 'card_condivisa';
                        r3 = r4.bind(r1)(r3);
case 95:
                        return r1;
case 98:
                        return r2;
case 101:
                        return r1;
case 104:
                        return r0;
                    }
                };
                return r0;
            };
            r1 = r3.bind(r2)(r1);
            var _closure1_slot0 = r1;
            r0 = function() { // Original name: onPress, environment: r0
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
        r13 = r0.bind(r3)();
        r0 = _env_r5_slot10;
        r2 = r0.jsxs;
        r0 = _env_r5_slot10;
        r1 = r0.Fragment;
        r0 = {};
        r4 = _env_r5_slot10;
        r7 = r4.jsxs;
        r4 = _env_r5_slot6;
        r6 = r4.PressableScale;
        r4 = {};
        r18 = r11.btn;
        r14 = new Array(2);
        r14[0] = r18;
        r14[1] = r15;
        r4['style'] = r14;
        r4['onPress'] = r13;
        r4['disabled'] = r12;
        r13 = _env_r5_slot10;
        r15 = r13.jsx;
        if(r12) { _fun18834_ip = 335; continue _fun18834 }
case 294:
        r12 = _env_r5_slot4;
        r13 = r12.Ionicons;
        r12 = {'name': 'share-social', 'size': 18};
        r14 = r17.goldInk;
        r12['color'] = r14;
        r13 = r15.bind(r3)(r13, r12);
        _fun18834_ip = 363; continue _fun18834;
case 335:
        r12 = _env_r5_slot3;
        r14 = r12.ActivityIndicator;
        r12 = {};
        r17 = r17.goldInk;
        r12['color'] = r17;
        r13 = r15.bind(r3)(r14, r12);
case 363:
        r12 = new Array(2);
        r12[0] = r13;
        r13 = _env_r5_slot10;
        r15 = r13.jsx;
        r13 = _env_r5_slot3;
        r14 = r13.Text;
        r13 = {};
        r17 = r11.txt;
        r13['style'] = r17;
        if(r16) { _fun18834_ip = 408; continue _fun18834 }
case 404:
        r16 = 'Condividi';
case 408:
        r13['children'] = r16;
        r13 = r15.bind(r3)(r14, r13);
        r12[1] = r13;
        r4['children'] = r12;
        r6 = r7.bind(r3)(r6, r4);
        r4 = new Array(2);
        r4[0] = r6;
        r6 = _env_r5_slot10;
        r7 = r6.jsx;
        r5 = _env_r5_slot3;
        r6 = r5.View;
        r5 = {'style': null, 'pointerEvents': 'none', 'collapsable': false};
        r11 = r11.hidden;
        r5['style'] = r11;
        r8 = r10.bind(r3)(r8, r9);
        r5['children'] = r8;
        r5 = r7.bind(r3)(r6, r5);
        r4[1] = r5;
        r0['children'] = r4;
        r0 = r2.bind(r3)(r1, r0);
        return r0;
    }
}

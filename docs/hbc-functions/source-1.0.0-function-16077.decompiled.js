function ?anon_0_(a0) {
    _fun16077: for(var _fun16077_ip = 0; ; ) switch(_fun16077_ip) {
case 0:
        StartGenerator();
        r8 = a0;
        ResumeGenerator(result_out_reg=0, return_bool_out_reg=3);
        if(r3) { _fun16077_ip = 780; continue _fun16077 }
case 15:
        r4 = undefined;
        r10 = undefined;
        r1 = undefined;
        r11 = undefined;
        var _closure0_slot0 = r4;
        r2 = undefined;
        r6 = undefined;
        r7 = undefined;
        r9 = undefined;
        r3 = r8.trim;
        r12 = r3.bind(r8)();
        r10 = r12;
        r8 = /^\d{6,14}$/;
        r3 = r8.test;
        r3 = r3.bind(r8)(r12);
        if(r3) { _fun16077_ip = 108; continue _fun16077 }
case 74:
        r3 = global;
        r12 = r3.Error;
        r3 = r12.prototype;
        r8 = Object.create(r3, {constructor: {value: r12}});
        r19 = 'Codice non valido.';
        r20 = r8;
        r3 = new r20[r12](r19, r18);
        r3 = r3 instanceof Object ? r3 : r8;
        throw r3;
case 108:
        r8 = ['product_name', 'product_name_it', 'brands', 'nutriments', 'serving_size', 'image_front_small_url'];
        r3 = r8.join;
        r13 = ',';
        r16 = r3.bind(r8)(r13);
        r15 = r10;
        r3 = global;
        r8 = r3.HermesInternal;
        r14 = r8.concat;
        r12 = 'https://world.openfoodfacts.org/api/v2/product/';
        r8 = '.json?fields=';
        r1 = r14.bind(r12)(r15, r8, r16);
        r8 = r3.AbortController;
        r12 = r8.prototype;
        r12 = Object.create(r12, {constructor: {value: r8}});
        r20 = r12;
        r8 = new r20[r8](r19);
        r8 = r8 instanceof Object ? r8 : r12;
        r11 = r8;
        _closure0_slot0 = r8;
        r12 = r3.setTimeout;
        r8 = function() { // Environment: r5
            r1 = _closure0_slot0;
            r0 = r1.abort;
            r0 = r0.bind(r1)();
            return r0;
        };
        r5 = 9000;
        r2 = r12.bind(r4)(r8, r5);
case 217: // try_start_0 // try_start_1
        r8 = r3.fetch;
        r5 = r1;
        r1 = {};
        r11 = r11.signal;
        r1['signal'] = r11;
        r11 = {};
        r12 = 'GlicoApp/1.0 (educativo)';
        r11['User-Agent'] = r12;
        r1['headers'] = r11;
        r1 = r8.bind(r4)(r5, r1);
        SaveGenerator(address=265);
case 263:
        return r1;
case 265:
        ResumeGenerator(result_out_reg=1, return_bool_out_reg=5);
        if(r5) { _fun16077_ip = 714; continue _fun16077 }
case 274:
        r5 = r1.json;
        r5 = r5.bind(r1)();
        SaveGenerator(address=288);
case 286:
        return r5;
case 288:
        ResumeGenerator(result_out_reg=5, return_bool_out_reg=8);
        if(r8) { _fun16077_ip = 697; continue _fun16077 }
case 297:
        r6 = r5;
case 300: // try_end0 // try_end1
        r11 = r3.clearTimeout;
        r8 = r2;
        r8 = r11.bind(r4)(r8);
        r8 = r6;
        if(!r8) { _fun16077_ip = 668; continue _fun16077 }
case 323:
        r8 = r6;
        r8 = r8.status;
        r11 = 0;
        if(!(r8 !== r11)) { _fun16077_ip = 668; continue _fun16077 }
case 340:
        r8 = r6;
        r8 = r8.product;
        if(!r8) { _fun16077_ip = 668; continue _fun16077 }
case 355:
        r8 = r6.product;
        r7 = r8;
        r8 = r8.nutriments;
        r6 = r8;
        if(r8) { _fun16077_ip = 378; continue _fun16077 }
case 376:
        r6 = {};
case 378:
        r9 = r6;
        r14 = r7;
        r14 = r14.product_name_it;
        r12 = r14;
        if(r14) { _fun16077_ip = 405; continue _fun16077 }
case 396:
        r14 = r7;
        r12 = r14.product_name;
case 405:
        r8 = r12;
        if(r12) { _fun16077_ip = 415; continue _fun16077 }
case 411:
        r8 = '';
case 415:
        r12 = r8;
        r8 = r12.trim;
        r8 = r8.bind(r12)();
        r6 = r8;
        if(r8) { _fun16077_ip = 437; continue _fun16077 }
case 433:
        r6 = 'Prodotto';
case 437:
        r8 = r6;
        r6 = {};
        r6['codice'] = r10;
        r6['nome'] = r8;
        r12 = r7;
        r12 = r12.brands;
        r10 = r12;
        if(r12) { _fun16077_ip = 470; continue _fun16077 }
case 466:
        r10 = '';
case 470:
        r12 = r10;
        r10 = r12.split;
        r10 = r10.bind(r12)(r13);
        r12 = r10[r11];
        r10 = null;
        r11 = r12 == r10;
        r10 = undefined;
        if(r11) { _fun16077_ip = 507; continue _fun16077 }
case 498:
        r11 = r12.trim;
        r10 = r11.bind(r12)();
case 507:
        r8 = r10;
        if(r10) { _fun16077_ip = 515; continue _fun16077 }
case 513:
        r8 = undefined;
case 515:
        r6['marca'] = r8;
        r10 = r7;
        r10 = r10.image_front_small_url;
        r8 = r10;
        if(r10) { _fun16077_ip = 537; continue _fun16077 }
case 535:
        r8 = undefined;
case 537:
        r6['immagine'] = r8;
        r11 = _env_r8_slot5;
        r10 = r9.carbohydrates_100g;
        r10 = r11.bind(r4)(r10);
        r6['carbo100'] = r10;
        r11 = _env_r8_slot5;
        r10 = r9.sugars_100g;
        r10 = r11.bind(r4)(r10);
        r6['zuccheri100'] = r10;
        r11 = _env_r8_slot5;
        r10 = r9.fiber_100g;
        r10 = r11.bind(r4)(r10);
        r6['fibre100'] = r10;
        r11 = _env_r8_slot5;
        r10 = r9.proteins_100g;
        r10 = r11.bind(r4)(r10);
        r6['proteine100'] = r10;
        r10 = _env_r8_slot5;
        r9 = r9.fat_100g;
        r9 = r10.bind(r4)(r9);
        r6['grassi100'] = r9;
        r8 = _env_r8_slot7;
        r7 = r7.serving_size;
        r7 = r8.bind(r4)(r7);
        r6['porzioneG'] = r7;
        return r6;
case 668:
        r6 = _env_r6_slot6;
        r7 = r6.prototype;
        r7 = Object.create(r7, {constructor: {value: r6}});
        r20 = r7;
        r6 = new r20[r6](r19);
        r6 = r6 instanceof Object ? r6 : r7;
        throw r6;
case 697:
        r7 = r3.clearTimeout;
        r6 = r2;
        r6 = r7.bind(r4)(r6);
        return r5;
case 714:
        r6 = r3.clearTimeout;
        r5 = r2;
        r5 = r6.bind(r4)(r5);
        return r1;
case 731: // try_start_2 // catch_target0
        CatchBlockStart(arg_register=1);
        r6 = r3.Error;
        r1 = r6.prototype;
        r5 = Object.create(r1, {constructor: {value: r6}});
        r19 = 'Connessione assente. Riprova quando sei online.';
        r20 = r5;
        r1 = new r20[r6](r19, r18);
        r1 = r1 instanceof Object ? r1 : r5;
        throw r1;
case 765: // try_end2 // catch_target1 // catch_target2
        CatchBlockStart(arg_register=1);
        r3 = r3.clearTimeout;
        r2 = r3.bind(r4)(r2);
        throw r1;
case 780:
        return r0;
    }
}
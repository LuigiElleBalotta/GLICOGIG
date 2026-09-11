function ?anon_0_(a0) {
    _fun19259: for(var _fun19259_ip = 0; ; ) switch(_fun19259_ip) {
case 0:
        StartGenerator();
        r8 = a0;
        ResumeGenerator(result_out_reg=0, return_bool_out_reg=3);
        if(r3) { _fun19259_ip = 862; continue _fun19259 }
case 15:
        r4 = undefined;
        r12 = undefined;
        r1 = undefined;
        r11 = undefined;
        var _closure0_slot0 = r4;
        r2 = undefined;
        r6 = undefined;
        r7 = undefined;
        r9 = undefined;
        r10 = undefined;
        r3 = r8.trim;
        r13 = r3.bind(r8)();
        r12 = r13;
        r8 = /^\d{6,14}$/;
        r3 = r8.test;
        r3 = r3.bind(r8)(r13);
        if(r3) { _fun19259_ip = 111; continue _fun19259 }
case 77:
        r3 = global;
        r13 = r3.Error;
        r3 = r13.prototype;
        r8 = Object.create(r3, {constructor: {value: r13}});
        r20 = 'Codice non valido.';
        r21 = r8;
        r3 = new r21[r13](r20, r19);
        r3 = r3 instanceof Object ? r3 : r8;
        throw r3;
case 111:
        r8 = ['product_name', 'product_name_it', 'brands', 'nutriments', 'serving_size', 'image_front_small_url'];
        r3 = r8.join;
        r15 = ',';
        r17 = r3.bind(r8)(r15);
        r16 = r12;
        r3 = global;
        r8 = r3.HermesInternal;
        r14 = r8.concat;
        r13 = 'https://world.openfoodfacts.org/api/v2/product/';
        r8 = '.json?fields=';
        r1 = r14.bind(r13)(r16, r8, r17);
        r8 = r3.AbortController;
        r13 = r8.prototype;
        r13 = Object.create(r13, {constructor: {value: r8}});
        r21 = r13;
        r8 = new r21[r8](r20);
        r8 = r8 instanceof Object ? r8 : r13;
        r11 = r8;
        _closure0_slot0 = r8;
        r13 = r3.setTimeout;
        r8 = function() { // Environment: r5
            r1 = _closure0_slot0;
            r0 = r1.abort;
            r0 = r0.bind(r1)();
            return r0;
        };
        r5 = 9000;
        r2 = r13.bind(r4)(r8, r5);
case 220: // try_start_0 // try_start_1
        r8 = r3.fetch;
        r5 = r1;
        r1 = {};
        r11 = r11.signal;
        r1['signal'] = r11;
        r11 = {};
        r13 = 'GlicoApp/1.0 (educativo)';
        r11['User-Agent'] = r13;
        r1['headers'] = r11;
        r1 = r8.bind(r4)(r5, r1);
        SaveGenerator(address=268);
case 266:
        return r1;
case 268:
        ResumeGenerator(result_out_reg=1, return_bool_out_reg=5);
        if(r5) { _fun19259_ip = 773; continue _fun19259 }
case 277:
        r5 = r1.json;
        r5 = r5.bind(r1)();
        SaveGenerator(address=291);
case 289:
        return r5;
case 291:
        ResumeGenerator(result_out_reg=5, return_bool_out_reg=8);
        if(r8) { _fun19259_ip = 756; continue _fun19259 }
case 300:
        r6 = r5;
case 303: // try_end0 // try_end1
        r11 = r3.clearTimeout;
        r8 = r2;
        r8 = r11.bind(r4)(r8);
        r8 = r6;
        if(!r8) { _fun19259_ip = 727; continue _fun19259 }
case 326:
        r8 = r6;
        r8 = r8.status;
        r13 = 0;
        if(!(r8 !== r13)) { _fun19259_ip = 727; continue _fun19259 }
case 344:
        r8 = r6;
        r8 = r8.product;
        if(!r8) { _fun19259_ip = 727; continue _fun19259 }
case 359:
        r8 = r6.product;
        r7 = r8;
        r8 = r8.nutriments;
        r6 = r8;
        if(r8) { _fun19259_ip = 382; continue _fun19259 }
case 380:
        r6 = {};
case 382:
        r9 = r6;
        r14 = r7;
        r14 = r14.product_name_it;
        r11 = r14;
        if(r14) { _fun19259_ip = 409; continue _fun19259 }
case 400:
        r14 = r7;
        r11 = r14.product_name;
case 409:
        r8 = r11;
        if(r11) { _fun19259_ip = 419; continue _fun19259 }
case 415:
        r8 = '';
case 419:
        r11 = r8;
        r8 = r11.trim;
        r8 = r8.bind(r11)();
        r6 = r8;
        if(r8) { _fun19259_ip = 465; continue _fun19259 }
case 438:
        r8 = _env_r8_slot5;
        r14 = r8.i18n;
        r11 = r14.t;
        r8 = 'err.prodotto';
        r6 = r11.bind(r14)(r8);
case 465:
        r11 = r6;
        r14 = _env_r8_slot9;
        r16 = _env_r8_slot7;
        r6 = r9;
        r6 = r6.carbohydrates_100g;
        r6 = r16.bind(r4)(r6);
        r10 = r14.bind(r4)(r11, r6);
        r6 = {};
        r6['codice'] = r12;
        r6['nome'] = r11;
        r14 = r7;
        r14 = r14.brands;
        r12 = r14;
        if(r14) { _fun19259_ip = 529; continue _fun19259 }
case 525:
        r12 = '';
case 529:
        r14 = r12;
        r12 = r14.split;
        r12 = r12.bind(r14)(r15);
        r14 = r12[r13];
        r12 = null;
        r13 = r14 == r12;
        r12 = undefined;
        if(r13) { _fun19259_ip = 567; continue _fun19259 }
case 557:
        r13 = r14.trim;
        r12 = r13.bind(r14)();
case 567:
        r11 = r12;
        if(r12) { _fun19259_ip = 575; continue _fun19259 }
case 573:
        r11 = undefined;
case 575:
        r6['marca'] = r11;
        r12 = r7;
        r12 = r12.image_front_small_url;
        r11 = r12;
        if(r12) { _fun19259_ip = 597; continue _fun19259 }
case 595:
        r11 = undefined;
case 597:
        r6['immagine'] = r11;
        r11 = r10.carbo;
        r6['carbo100'] = r11;
        r10 = r10.corretto;
        r6['carboCorretto'] = r10;
        r11 = _env_r8_slot7;
        r10 = r9.sugars_100g;
        r10 = r11.bind(r4)(r10);
        r6['zuccheri100'] = r10;
        r11 = _env_r8_slot7;
        r10 = r9.fiber_100g;
        r10 = r11.bind(r4)(r10);
        r6['fibre100'] = r10;
        r11 = _env_r8_slot7;
        r10 = r9.proteins_100g;
        r10 = r11.bind(r4)(r10);
        r6['proteine100'] = r10;
        r10 = _env_r8_slot7;
        r9 = r9.fat_100g;
        r9 = r10.bind(r4)(r9);
        r6['grassi100'] = r9;
        r8 = _env_r8_slot10;
        r7 = r7.serving_size;
        r7 = r8.bind(r4)(r7);
        r6['porzioneG'] = r7;
        return r6;
case 727:
        r6 = _env_r6_slot8;
        r7 = r6.prototype;
        r7 = Object.create(r7, {constructor: {value: r6}});
        r21 = r7;
        r6 = new r21[r6](r20);
        r6 = r6 instanceof Object ? r6 : r7;
        throw r6;
case 756:
        r7 = r3.clearTimeout;
        r6 = r2;
        r6 = r7.bind(r4)(r6);
        return r5;
case 773:
        r6 = r3.clearTimeout;
        r5 = r2;
        r5 = r6.bind(r4)(r5);
        return r1;
case 790: // try_start_2 // catch_target0
        CatchBlockStart(arg_register=1);
        r6 = r3.Error;
        r1 = _env_r1_slot5;
        r7 = r1.i18n;
        r5 = r7.t;
        r1 = 'err.offline';
        r20 = r5.bind(r7)(r1);
        r5 = r6.prototype;
        r5 = Object.create(r5, {constructor: {value: r6}});
        r21 = r5;
        r1 = new r21[r6](r20, r19);
        r1 = r1 instanceof Object ? r1 : r5;
        throw r1;
case 847: // try_end2 // catch_target1 // catch_target2
        CatchBlockStart(arg_register=1);
        r3 = r3.clearTimeout;
        r2 = r3.bind(r4)(r2);
        throw r1;
case 862:
        return r0;
    }
}
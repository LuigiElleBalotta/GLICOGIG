function pesatoCotto(a0) {
    _fun18407: for(var _fun18407_ip = 0; ; ) switch(_fun18407_ip) {
case 0:
        r1 = a0;
        if(r1) { _fun18407_ip = 10; continue _fun18407 }
case 6:
        r1 = '';
case 10:
        r0 = r1.toLowerCase;
        r2 = r0.bind(r1)();
        r1 = /spaghett|\bpasta|maccheron|\bpenne\b|fusill|rigaton|tortellin|raviol|vermicell|linguin|tagliatell|bucatin|\briso\b|risott|couscous|\bbulgur|polenta|\borzo\b|\bfarro\b|quinoa|\bmiglio\b|\blegum|lenticch|\bceci\b|fagiol|pisell/;
        r0 = r1.test;
        r0 = r0.bind(r1)(r2);
        return r0;
    }
}
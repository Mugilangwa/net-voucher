export default {
    // ===== NAV =====
    nav: {
        home: 'Nyumbani',
        about: 'Kuhusu Sisi',
        programs: 'Programu',
        parish: 'Parishi',
        library: 'Maktaba',
        contact: 'Mawasiliano',
        login: 'Ingia',
        logout: 'Toka',
    },

    // ===== TOPBAR / FOOTER =====
    footer: {
        tagline: 'Jimbo la Kinondoni',
        description: 'Tunaamini katika umoja wa imani, huduma ya kweli, na ukuaji wa kiroho kwa familia zote za Mungu katika jimbo letu.',
        links: 'Viungo',
        services: 'Huduma',
        newsletter: 'Jiunge na Jarida Letu',
        newsletterText: 'Pokea habari, taarifa na matukio ya kijimbo moja kwa moja kwenye barua pepe yako.',
        emailPlaceholder: 'barua.pepe@mfano.com',
        joinBtn: 'Jiunge',
        copyright: 'Haki zote zimehifadhiwa.',
        builtBy: 'Imetengenezwa na',
    },

    // ===== HERO =====
    hero: {
        eyebrow: 'Jimbo la Kinondoni — KLPT Tanzania',
        slides: [
            {
                title: 'VIJANA UHAI WA<br><span>Familia, Kanisa na Taifa</span>',
                desc: 'Kuandaa vijana kuishi kusudi la Mungu — kuwalea kiroho, kuimarisha akili, na kuleta mabadiliko chanya.',
            },
            {
                title: 'JUKUMU LA VIJANA:<br><span>Kuongoza na Kuchangia</span>',
                desc: 'Kuwalea vijana kuwa viongozi wa kiroho, kiakili, na kijamii, wakichangia moja kwa moja maendeleo ya familia, kanisa na taifa.',
            },
            {
                title: 'VUKA MIPAKA,<br><span>Tanua Furaha na Mafanikio</span>',
                desc: 'Kuandaa vijana kushirikiana, kuishi maisha yenye kusudi, na kuleta matokeo chanya katika familia, kanisa na jamii.',
            },
        ],
        joinNow: 'Jiunge Nasi Leo',
        learnMore: 'Jifunze Zaidi',
        scroll: 'Scroll',
    },

    // ===== STATS =====
    stats: {
        parishes: 'Parishi',
        youth: 'Vijana Waliojiunga',
        events: 'Matukio kwa Mwaka',
        founded: 'Mwaka wa Kuanzishwa',
    },

    // ===== WELCOME =====
    welcome: {
        eyebrow: 'Karibu HUVIKA',
        title: 'Huduma ya Vijana Kanisani — <span>Nguvu ya Taifa</span>',
        quote: '"Neno la Mungu linatukumbusha kuwa vijana wana nguvu na fahari yao ni nguvu zao." — 1 Yohana 2:14',
        checks: [
            'Jimbo la Kinondoni tunaamini vijana ni nguzo kuu ya uhai wa Familia, Kanisa na Taifa.',
            'Kupitia HUVIKA, tunaelekeza nguvu za vijana katika kusudi sahihi la Mungu — kiroho, kiakili, kiuchumi na kiafya.',
            'Tunakukaribisha ujifunze, uabudu, utumike na ukue nasi katika Kristo.',
        ],
        readMore: 'Soma Zaidi',
        ourPrograms: 'Programu Zetu',
    },

    // ===== ABOUT CARDS =====
   // ============================================================
// ABOUT — imeunganishwa (index.vue + about.vue)
// ============================================================
about: {
    // ---------- KWA index.vue (homepage) ----------
    eyebrow: 'Kuhusu Sisi',
    title: 'Malengo, Dhamira na Maono Yetu',
    goals: {        
        eyebrow: 'Melengo Yetu',
        subtitle: 'Malengo maalum ya HUVIKA Jimbo la Kinondoni',   
        title: 'Malengo Yetu',
        text: 'Kuwawezesha vijana kukua kiroho, kijamii na kielimu ili kuwa na maisha yenye kusudi na mchango chanya kwa kanisa na jamii.',
        items: {
            spiritual: { title: 'Kiroho', text: 'Kukuza imani na maadili ya kikristo miongoni mwa vijana wa kanisa na jamii.' },
            leadership: { title: 'Uongozi', text: 'Kuandaa vijana kuwa viongozi bora wa kanisa na jamii yenye athari chanya.' },
            worship: { title: 'Ibada', text: 'Kushirikisha vijana katika ibada, semina na mafunzo ya maisha ya kiroho.' },
            fellowship: { title: 'Ushirikiano', text: 'Kuhimiza mshikamano, ushirikiano na upendo miongoni mwa vijana wote.' },
            talents: { title: 'Vipaji', text: 'Kutoa nafasi kwa vijana kuibua vipaji vyao na kushiriki katika shughuli za kijamii.' },
            education: { title: 'Elimu', text: 'Kuwawezesha vijana kielimu, kiuchumi na kiutamaduni kwa maendeleo endelevu.' },
        },
    },
    mission: {
        title: 'Dhamira Yetu',
        text: 'Kuwajenga vijana kupitia huduma ya kiroho, mafunzo ya maisha na mshikamano wa kijamii kwa ajili ya maendeleo ya kanisa na jamii.',
    },

    
    
    vision: {
        title: 'Maono Yetu',
        text: 'Kuwa huduma inayoongoza katika kulea vijana wenye maadili mema, vipaji vilivyokuzwa na ushirikiano imara na uongozi wa kanisa.',
    },

    // ---------- KWA about.vue (ukurasa wa /about) ----------
    heroEyebrow: 'HUVIKA — Jimbo la Kinondoni',
    heroTitle: 'Kuhusu <span class="text-warning fst-italic">Sisi</span>',
    values: {
        visionTitle: 'Dira Yetu',
        visionText: 'Kuwa kiongozi katika kuwawezesha vijana kiroho, kijamii na kiuchumi kwa ajili ya taifa bora na kanisa lenye nguvu.',
        missionTitle: 'Dhamira Yetu',
        missionText: 'Kuwajenga vijana wa KLPT kuwa viongozi bora wa imani, maadili na jamii  wakitumikia Mungu na taifa kwa moyo wote.',
        valuesTitle: 'Thamani Zetu',
        valuesText: 'Imani, Umoja, Uongozi Bora, Ushirikiano na Upendo kwa wote  ndizo nguzo zinazotusimamisha kama familia ya Mungu.',
    },
    history: {
        eyebrow: 'Historia Yetu',
        since: 'Tangu 2015',
        title: 'HUVIKA — Huduma ya Vijana <br>Kanisani ya KLPT',
        quote: '"HUVIKA ilianzishwa mwaka 2015 na vijana wachache wenye nia ya kuleta mwamko wa kiroho na kijamii kwa vijana wa Kanisa la Pentekoste Tanzania."',
        p1: 'Kwa miaka kadhaa, HUVIKA limekua kuwa kikundi kinachojulikana kwa kuendesha shughuli zinazoimarisha umoja, ushirikiano na uongozi bora miongoni mwa vijana wa Jimbo la Kinondoni.',
        checks: [
            'Tunajitolea kuwaimarisha vijana na kuwasaidia kukua katika imani na maadili bora.',
            "Kupitia programu zetu, tunalenga kuwajenga vijana kuwa nguzo imara ya kanisa na jamii.",
            "Tunadhamiria kukuza kizazi kinachong'aa kwa kutafuta utakatifu na kuheshimu maadili.",
            'Tunasaidia vijana kujitambua, kuongeza ujuzi wao, na kujenga uhusiano imara na Mungu.',
        ],
        btnPrograms: 'Programu Zetu',
        btnContact: 'Wasiliana Nasi',
    },
    activities: {
        eyebrow: 'Shughuli',
        title: 'Tunachofanya <br>Kila Siku',
        desc: 'HUVIKA huandaa shughuli mbalimbali zinazolenga kukuza vijana katika nyanja zote za maisha.',
        checks: [
            'Ibada za vijana na maombi ya pamoja kila Jumamosi',
            'Mafunzo ya uongozi na semina za maisha',
            'Shughuli za kijamii na huduma kwa jamii',
            'Matukio ya kiroho na michezo ya vijana',
            'Warsha za ujasiriamali na maendeleo ya vipaji',
            'Programu za kujenga uongozi na maadili bora',
        ],
    },
    guardians: {
        eyebrow: 'Walezi',
        title: 'Walezi Wetu',
        subtitle: 'Viongozi na washauri wa HUVIKA Jimbo la Kinondoni',
        items: {
            bishop: { role: 'Askofu Mkuu wa KLPT Tanzania' },
            diocese: { role: 'Askofu Jimbo la Kinondoni' },
            pastor: { role: 'Mchungaji wa Vijana' },
            guardian: { role: 'Mlezi wa Vijana' },
        },
    },
    team: {
        eyebrow: 'Timu Yetu',
        title: 'Uongozi Wetu',
        subtitle: 'Viongozi waliochaguliwa na kutawazwa na Mungu',
        items: {
            chair: { role: 'Mwenyekiti' },
            viceChair: { role: 'Makamu Mwenyekiti' },
            secretary: { role: 'Katibu Mkuu' },
            viceSecretary: { role: 'Makamu Katibu' },
            treasurer: { role: 'Muhazini' },
            assTreasurer: { role: 'Muhazini Msaidizi' },
        },
    },

    parishes: {
        eyebrow: 'Parishi',
        title: 'Parishi Zinazoshirikiana Nasi',
    },


    // ===== PROGRAMS =====
    programs: {
    eyebrow: 'Programu Zetu',
    title: 'Programu za HUVIKA',
    subtitle: 'Tunajali ukuaji wa vijana katika nyanja zote za maisha',
    readMore: 'Soma zaidi',
    items: {
        spiritual: 'Mafunzo ya Kiroho',
        leadership: 'Maendeleo ya Uongozi',
        community: 'Huduma za Jamii',
        sports: 'Burudani na Michezo',
    },
    // ✅ ONGEZA HIZI HAPA
    spiritualText: 'Kuwalea vijana katika imani na mafundisho ya Biblia.',
    leadershipText: 'Kuwajenga viongozi vijana kwa ajili ya kesho.',
    communityText: 'Kuitumikia jamii yetu kwa upendo.',
    sportsText: 'Kukuza afya na ushirikiano kupitia michezo.'
},
},

    // ===== LIBRARY =====
    library: {
        eyebrow: 'Rasilimali',
        title: 'Maktaba ya HUVIKA',
        subtitle: 'Rasilimali za kiroho na kielimu kwa ajili ya vijana',
        viewMore: 'Angalia zaidi',
    },

    // ===== EVENTS =====
    events: {
        eyebrow: 'Matukio na Taarifa',
        title: 'Matukio ya Hivi Karibuni',
        viewAll: 'Angalia Yote',
        filters: {
            all: 'Zote',
            event: 'Matukio',
            announcement: 'Matangazo',
            activity: 'Shughuli',
        },
        empty: 'Hakuna matukio ya kuonyesha kwa sasa.',
        readMore: 'Soma Zaidi',
        loading: 'Inapakia...',
        loadMore: 'Onyesha Zaidi',
    },

    // ===== PARISHES =====
    parishes: {
        eyebrow: 'Parishi Zetu',
        title: 'Parishi za Jimbo la Kinondoni',
        viewAll: 'Angalia Parishi Zote',
    },

    // ===== CTA =====
    cta: {
        eyebrow: 'Jiunge Nasi',
        title: 'Wewe ni Sehemu ya <span>Maono Haya</span>',
        subtitle: 'Jiunge na familia ya HUVIKA na uwe sehemu ya mabadiliko chanya',
        join: 'Jiunge Leo',
        contact: 'Wasiliana Nasi',
    },

    // ===== LANGUAGE SWITCHER =====
    language: {
        label: 'Lugha',
        sw: 'Kiswahili',
        en: 'English',
    },


    programsPage: {
    heroEyebrow: 'HUVIKA — Jimbo la Kinondoni',
    heroTitle: 'Huduma',
    eyebrow: 'Idara',
    title: 'Huduma Zetu',
    subtitle: 'Jimbo la Kinondoni linatoa huduma mbalimbali kupitia idara zake zinazolenga kuendeleza maisha ya kiroho na kijamii ya wanajimbo.',
    items: {
        sports:     { title: 'Idara ya Michezo', text: 'Michezo ina umuhimu katika kujenga afya ya mwili. Jimbo lina idara inayohusika na uandaaji na upangaji wa masuala ya michezo.' },
        bible:      { title: 'Idara ya Mafundisho ya Biblia', text: 'Inawafundisha vijana Neno la Mungu na kuwawezesha kuishi kwa kanuni za kibiblia.' },
        music:      { title: 'Idara ya Muziki na Uimbaji', text: 'Inaongoza ibada kupitia muziki na kukuza vipaji vya uimbaji vya vijana.' },
        evangelism: { title: 'Idara ya Uinjilisti', text: 'Vijana wa KLPT wanashiriki kikamilifu katika kuwaleta watu kwa Yesu, kutekeleza agizo kuu la Mathayo 28:19-20.' },
        media:      { title: 'Idara ya Habari na Mawasiliano', text: 'Kuhakikisha matukio na ratiba zetu zinafikika kwa urahisi kupitia mitandao ya kijamii.' },
        prayer:     { title: 'Idara ya Maombi', text: 'Maombi ni mawasiliano kati yetu na Mungu. Idara hii inasimamia na kupanga maombi ya jimbo.' },
    },
    ctaTitle: 'Je, unataka kujiunga na idara?',
    ctaText: 'Wasiliana nasi au tembelea parishi iliyo karibu nawe ili kushiriki.',
},

parishesPage: {
    heroEyebrow: 'Jimbo la Kinondoni',
    heroTitle: 'Parishi Zetu',
    eyebrow: 'Orodha ya Parishi',
    title: 'Parishi za Jimbo',
    subtitle: 'Soma, tafuta na gundua parishi zote za jimbo letu',
    badge: 'Parishi',
    code: 'Nambari',
    readMore: 'Soma zaidi',
    loading: 'Inapakia...',
    error: 'Imeshindwa kupakia parishi.',
    retry: 'Jaribu tena',
    emptyTitle: 'Hakuna Parishi',
    emptyText: 'Hakuna parishi zilizopatikana kwa sasa. Tafadhali rudi baadaye.',
    searchTitle: 'Tafuta Parishi',
    searchPlaceholder: 'Jina la parishi...',
    quickLinks: 'Viungo vya Haraka',
    recentEvents: 'Matukio ya Hivi Karibuni',
    noEvents: 'Hakuna matukio ya hivi karibuni',
    contactTitle: 'Wasiliana Nasi',
    stats: { total: 'Jumla ya Parishi', diocese: 'Jimbo', region: 'Mkoa', org: 'Shirika' },
},

parishDetails: {
    heroEyebrow: 'Parishi — Jimbo la Kinondoni',
    back: 'Rudi Parishi',
    loading: 'Inapakia...',
    error: 'Imeshindwa kupakia parishi hii.',
    retry: 'Jaribu tena',
    aboutTitle: 'Parishi ya',
    defaultDescription: 'Parishi hii ni sehemu ya Jimbo la Kinondoni la Kanisa la Pentekoste Tanzania (KLPT). Inatoa huduma za kiroho na kijamii kwa wanajimbo wake na jamii inayoizunguka.',
    historyTitle: 'Historia ya Parishi',
    defaultHistory: 'Historia ya parishi hii itaongezwa hivi karibuni.',
    leadershipEyebrow: 'Uongozi',
    leadershipTitle: 'Wachungaji na Viongozi',
    leadershipSub: 'Viongozi wakuu wa parishi',
    deptEyebrow: 'Idara Kuu',
    deptSub: 'Uongozi wa idara kuu ya kanisa',
    noDeptLeaders: 'Hakuna viongozi waliowekwa kwa idara hii',
    otherDeptEyebrow: 'Idara Nyingine',
    otherDeptTitle: 'Idara za Kanisa',
    department: 'Idara',
    infoTitle: 'Taarifa za Parishi',
    pastor: 'Mchungaji',
    notSet: 'Hajajazwa',
    parishName: 'Jina la Parishi',
    phone: 'Mawasiliano',
    address: 'Anuani',
    code: 'Code ya Parishi',
    aka: 'Inajulikana pia kama',
    mapTitle: 'Mahali pa Parishi',
    allParishes: 'Rudi Parishi Zote',
},


// =====================================================================
// sw.js
// =====================================================================
maktabaPage: {
    heroEyebrow: 'HUVIKA — Jimbo la Kinondoni',
    heroTitle: 'Nyumba ya Sanaa',
    heroText: 'Kumbukumbu za ibada, semina, matukio na shughuli za vijana wa HUVIKA.',
    eyebrow: 'Maktaba Yetu',
    title: 'Kumbukumbu za Picha',
    subtitle: 'Picha za matukio, ibada, semina na shughuli za vijana wa HUVIKA',
    empty: 'Hakuna picha kwenye kundi hili bado.',
    filters: { all: 'Zote', ibada: 'Ibada', semina: 'Semina', matukio: 'Matukio', ujasiriamali: 'Ujasiriamali' },
    items: {
        worship: 'Ibada ya Vijana',
        seminar: 'Semina ya Uongozi',
        festival: 'Tamasha la Vijana',
        business: 'Ujasiriamali wa Vijana',
        prayer: 'Maombi ya Pamoja',
        life: 'Semina ya Maisha',
        meeting: 'Mkutano Mkuu',
        sports: 'Siku ya Michezo',
    },
},

contactPage: {
    heroEyebrow: 'HUVIKA — Jimbo la Kinondoni',
    heroTitle: 'Wasiliana Nasi',
    heroText: 'Tunafurahi kusikia kutoka kwako. Tuandikie au tutumie ujumbe.',
    eyebrow: 'Wasiliana Nasi',
    title: 'Taarifa za Mawasiliano',
    subtitle: 'Tumia njia zifuatazo kuwasiliana nasi au tuachie ujumbe',
    cards: { location: 'Mahali', email: 'Barua Pepe', phone: 'Simu' },
    formTitle: 'Tuma Ujumbe',
    formText: 'Jaza fomu hii na tutakujibu.',
    name: 'Jina lako',
    email: 'Barua pepe yako',
    subject: 'Kuhusu',
    message: 'Ujumbe wako',
    send: 'Tuma Ujumbe',
    sending: 'Inatuma...',
    required: 'Sehemu hii inahitajika',
    invalidEmail: 'Weka barua pepe sahihi',
    success: 'Ujumbe wako umetumwa. Asante!',
    error: 'Imeshindwa kutuma ujumbe. Tafadhali jaribu tena.',
    mapTitle: 'Tupate Hapa',
},

 eventDetails: {
        heroEyebrow: 'Maelezo ya Tukio',
        back: 'Rudi Nyumbani',
        error: 'Imeshindwa kupata taarifa za tukio hili.',
        retry: 'Jaribu Tena',
        infoTitle: 'Taarifa Muhimu',
        date: 'Tarehe',
        time: 'Muda',
        location: 'Mahali'
    },

};
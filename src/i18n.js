import { createI18n } from 'vue-i18n';
import sw from '@/locales/sw';
import en from '@/locales/en';

// Chukua lugha iliyohifadhiwa au tumia Kiswahili kama default
const savedLang = localStorage.getItem('lang') || 'sw';

// Weka lugha kwenye HTML tag mara moja mwanzo
document.documentElement.setAttribute('lang', savedLang);

const i18n = createI18n({
    legacy: false,            // MUHIMU: Hii inaruhusu Composition API (locale.value)
    globalInjection: true,    // Inaruhusu $t() kutumika moja kwa moja kwenye templates
    locale: savedLang,        // Lugha ya kuanzia
    fallbackLocale: 'en',     // Lugha ya akiba kama tafsiri haipo
    messages: {
        sw,
        en
    },
});

export default i18n;
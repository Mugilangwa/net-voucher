<template>
    <div class="d-flex align-items-center gap-2 text-white">
        <template v-if="$i18n.locale === 'sw'">
            <span class="text-white fw-bold" style="cursor: default;">SW</span>
            <span class="text-white-50">|</span>
            <a href="#" class="text-white-50 text-decoration-none" @click.prevent="changeLang('en')" style="font-size: 12px;">
                EN
            </a>
        </template>
        <template v-else>
            <a href="#" class="text-white-50 text-decoration-none" @click.prevent="changeLang('sw')" style="font-size: 12px;">
                SW
            </a>
            <span class="text-white-50">|</span>
            <span class="text-white fw-bold" style="cursor: default;">EN</span>
        </template>
    </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

function changeLang(lang) {
    // Hapa tunatumia $i18n.locale moja kwa moja
    if (proxy.$i18n.locale !== lang) {
        proxy.$i18n.locale = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.setAttribute('lang', lang);
    }
}
</script>

<style scoped>
a.text-white-50:hover {
    color: #fff !important;
}
</style>
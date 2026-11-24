<template>
    <div :class="[$store.state.layout_style, $store.state.menu_style]">
        <component :is="layout" />
    </div>
</template>

<script>
// ============================================================
// Options API — kwa ajili ya components (layouts)
// ============================================================
import appLayout from './layouts/app-layout.vue';
import authLayout from './layouts/auth-layout.vue';
import websiteLayout from './layouts/website-layout.vue';

export default {
    components: {
        app: appLayout,
        auth: authLayout,
        website: websiteLayout,
    },
};
</script>

<script setup>
// ============================================================
// Composition API — kwa ajili ya logic
// ============================================================
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useMeta } from '@/composables/use-meta';

// Styles — weka hapa TU (usirudie kwenye main.js)
import '@/assets/sass/app.scss';
import '@/assets/sass/elements/breadcrumb.scss';

useMeta({ title: 'Huvika' });

const store = useStore();

const layout = computed(() => store.getters.layout);
</script>
<template>
    <div>
        <WebsiteHeader />
        <main class="min-vh-100">
            <!-- ✅ TUMIA V-SLOT NA V-IF KUZUIA ERROR ZA NULL -->
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" v-if="Component" />
                    <div v-else class="d-flex justify-content-center align-items-center py-5" style="min-height: 50vh;">
                        <div class="spinner-border text-danger" role="status"></div>
                        <span class="ms-3 text-secondary">Inapakia...</span>
                    </div>
                </transition>
            </router-view>
        </main>
        <WebsiteFooter />

        <!-- Floating Action Buttons -->
        <div class="floating-buttons" style="position: fixed; bottom: 30px; right: 30px; display: flex; flex-direction: column; gap: 12px; z-index: 1050;">
            <a href="https://wa.me/255754366104?text=Hello%20Tripoint" target="_blank" class="btn btn-success rounded-circle shadow d-flex align-items-center justify-content-center" style="width: 50px; height: 50px; font-size: 1.4rem;">
                <i class="fab fa-whatsapp"></i>
            </a>
            <a href="tel:+255754366104" class="btn btn-primary rounded-circle shadow d-flex align-items-center justify-content-center" style="width: 50px; height: 50px; font-size: 1.4rem;">
                <i class="fas fa-phone-alt"></i>
            </a>
        </div>
    </div>
</template>

<script setup>
import WebsiteHeader from '@/components/layout/WebsiteHeader.vue';
import WebsiteFooter from '@/components/layout/WebsiteFooter.vue';
</script>

<style scoped>
/* Transition ndogo ya kufifia (fade) unapobadilisha kurasa */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
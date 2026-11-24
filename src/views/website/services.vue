<template>
    <div>
        <!-- ============================================================
             HERO
        ============================================================ -->
        <section class="text-white py-5 position-relative overflow-hidden" style="background: linear-gradient(135deg, #7f1d1d 0%, #3b0a0a 100%);">
            <!-- Mapambo ya nyuma -->
            <div class="position-absolute top-0 start-0 w-100 h-100 opacity-25" style="background-image: radial-gradient(circle at 80% 20%, rgba(212,160,23,0.4) 0%, transparent 50%);"></div>
            
            <div class="container py-4 position-relative z-2">
                <p class="text-warning text-uppercase fw-bold small mb-2" style="letter-spacing: 3px;">
                    {{ $t('programsPage.heroEyebrow') }}
                </p>
                <h1 class="display-4 fw-bold mb-3">{{ $t('programsPage.heroTitle') }}</h1>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <router-link to="/" class="text-white text-decoration-none hover-gold">{{ $t('nav.home') }}</router-link>
                        </li>
                        <li class="breadcrumb-item active text-warning fw-bold" aria-current="page">
                            {{ $t('nav.programs') }}
                        </li>
                    </ol>
                </nav>
            </div>
        </section>

        <!-- ============================================================
             DEPARTMENTS / PROGRAMS
        ============================================================ -->
        <section class="py-5" style="background: #faf8f5;">
            <div class="container py-4">
                <div class="text-center mb-5">
                    <p class="text-danger text-uppercase fw-bold small mb-2" style="letter-spacing: 3px;">
                        {{ $t('programsPage.eyebrow') }}
                    </p>
                    <h2 class="display-6 fw-bold mb-3">{{ $t('programsPage.title') }}</h2>
                    <p class="text-secondary mx-auto" style="max-width: 720px;">
                        {{ $t('programsPage.subtitle') }}
                    </p>
                </div>

                <div class="row g-4">
                    <div v-for="dept in departments" :key="dept.key" class="col-md-6 col-lg-4">
                        <!-- CARD MPYA YENYE RANGI ZA KANISA -->
                        <div class="card h-100 border-0 shadow-sm hover-lift transition-all rounded-4 overflow-hidden bg-white">
                            <div class="card-body p-4 d-flex flex-column align-items-center text-center">
                                
                                <!-- Icon yenye rangi ya Dhahabu au Nyekundu -->
                                <span
                                    class="rounded-circle d-inline-flex align-items-center justify-content-center mb-4 shadow-sm"
                                    :class="dept.bg"
                                    style="width: 80px; height: 80px;"
                                >
                                    <i :class="dept.icon" class="fs-2"></i>
                                </span>
                                
                                <h5 class="fw-bold mb-3 text-dark">{{ dept.title }}</h5>
                                <p class="text-secondary mb-0">{{ dept.text }}</p>
                            </div>
                            
                            <!-- Mstari mdogo wa chini unatokea ukigusa -->
                            <div class="card-footer bg-transparent border-0 text-center pb-4 pt-0">
                                <router-link to="/contact" class="btn btn-sm btn-outline-danger rounded-pill px-4">
                                    {{ $t('programs.readMore') }} <i class="fa-solid fa-arrow-right ms-1"></i>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============================================================
             CTA
        ============================================================ -->
        <section class="py-5 bg-white text-center border-top">
            <div class="container py-4">
                <h3 class="fw-bold mb-3" style="font-family: var(--fh);">{{ $t('programsPage.ctaTitle') }}</h3>
                <p class="text-secondary mb-4">{{ $t('programsPage.ctaText') }}</p>
                <div class="d-flex gap-3 justify-content-center flex-wrap">
                    <router-link to="/contact" class="btn btn-danger btn-lg px-4 rounded-pill shadow hover-lift">
                        <i class="fa-solid fa-envelope me-2"></i>{{ $t('cta.contact') }}
                    </router-link>
                    <router-link to="/parish" class="btn btn-outline-dark btn-lg px-4 rounded-pill hover-lift">
                        <i class="fa-solid fa-church me-2"></i>{{ $t('nav.parish') }}
                    </router-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n({ useScope: 'global' });

// Idara zote 6
const departments = computed(() => {
    locale.value; // reactive dependency
    const list = [
        { key: 'sports',     icon: 'fa-solid fa-futbol',        bg: 'bg-danger-subtle text-danger' },
        { key: 'bible',      icon: 'fa-solid fa-book-bible',    bg: 'bg-warning-subtle text-warning' },
        { key: 'music',      icon: 'fa-solid fa-music',         bg: 'bg-danger-subtle text-danger' },
        { key: 'evangelism', icon: 'fa-solid fa-bullhorn',      bg: 'bg-warning-subtle text-warning' },
        { key: 'media',      icon: 'fa-solid fa-photo-film',    bg: 'bg-danger-subtle text-danger' },
        { key: 'prayer',     icon: 'fa-solid fa-hands-praying', bg: 'bg-warning-subtle text-warning' },
    ];
    return list.map((d) => ({
        ...d,
        title: t(`programsPage.items.${d.key}.title`),
        text: t(`programsPage.items.${d.key}.text`),
    }));
});
</script>

<style scoped>
.hover-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
}
.hover-gold:hover {
    color: #d4a017 !important;
}
</style>
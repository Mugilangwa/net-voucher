<template>
    <div>
        <!-- ============================================================
             HERO: maandishi kushoto, carousel ya picha kulia
        ============================================================ -->
        <section class="overflow-hidden text-white" style="background-color: #7f1d1d;">
            <div class="row g-0" style="min-height: 420px;">
                <div class="col-lg-6 d-flex align-items-center">
                    <div class="px-4 px-lg-5 py-5 w-100">
                        <p class="text-warning text-uppercase fw-bold small mb-3" style="letter-spacing: 3px;">
                            {{ $t('maktabaPage.heroEyebrow') }}
                        </p>
                        <h1 class="display-4 fw-bold mb-3">{{ $t('maktabaPage.heroTitle') }}</h1>
                        <p class="lead text-white-50 mb-4" style="max-width: 480px;">
                            {{ $t('maktabaPage.heroText') }}
                        </p>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-0">
                                <li class="breadcrumb-item">
                                    <router-link to="/" class="text-white">{{ $t('nav.home') }}</router-link>
                                </li>
                                <li class="breadcrumb-item active text-white-50" aria-current="page">
                                    {{ $t('nav.library') }}
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <!-- Pattern ya mapambo (nyepesi, hakuna picha) -->
                <div class="col-lg-6 position-relative d-none d-lg-block">
                    <HeroPattern />
                    <div class="hero-fade position-absolute top-0 start-0 w-100 h-100"></div>
                </div>
            </div>
        </section>

        <!-- ============================================================
             GALLERY
        ============================================================ -->
        <section class="py-5 bg-light">
            <div class="container">
                <div class="text-center mb-4">
                    <p class="text-danger text-uppercase fw-bold small mb-2" style="letter-spacing: 3px;">
                        {{ $t('maktabaPage.eyebrow') }}
                    </p>
                    <h2 class="display-6 fw-bold mb-2">{{ $t('maktabaPage.title') }}</h2>
                    <p class="text-secondary mx-auto" style="max-width: 640px;">{{ $t('maktabaPage.subtitle') }}</p>
                </div>

                <!-- Filters -->
                <div class="d-flex flex-wrap justify-content-center gap-2 mb-5">
                    <button
                        v-for="f in filters"
                        :key="f.value"
                        class="btn btn-sm rounded-pill px-3"
                        :class="currentFilter === f.value ? 'btn-danger' : 'btn-outline-secondary'"
                        @click="currentFilter = f.value"
                    >
                        {{ f.label }}
                    </button>
                </div>

                <!-- Empty -->
                <div v-if="filtered.length === 0" class="text-center py-5">
                    <i class="fa-regular fa-image text-secondary" style="font-size: 48px;"></i>
                    <p class="mt-3 text-secondary">{{ $t('maktabaPage.empty') }}</p>
                </div>

                <!-- Grid -->
                <div v-else class="row g-4">
                    <div v-for="(item, i) in filtered" :key="item.key" class="col-6 col-md-4 col-lg-3">
                        <div
                            class="card border-0 shadow-sm overflow-hidden gallery-card"
                            role="button"
                            tabindex="0"
                            @click="openLightbox(i)"
                            @keyup.enter="openLightbox(i)"
                        >
                            <div class="ratio ratio-1x1">
                                <img :src="item.img" :alt="item.title" class="w-100 h-100" style="object-fit: cover;" loading="lazy" />
                            </div>
                            <div class="gallery-overlay position-absolute bottom-0 start-0 end-0 p-3 text-white">
                                <span class="badge bg-danger mb-1">{{ categoryLabel(item.category) }}</span>
                                <div class="small fw-semibold">{{ item.title }}</div>
                            </div>
                            <span class="gallery-zoom position-absolute top-0 end-0 m-2 bg-danger text-white rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 34px; height: 34px;">
                                <i class="fa-solid fa-magnifying-glass-plus small"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============================================================
             LIGHTBOX
        ============================================================ -->
        <div
            v-if="lightboxIndex !== null"
            class="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-90 d-flex align-items-center justify-content-center"
            style="z-index: 2000;"
            @click.self="closeLightbox"
        >
            <button class="btn btn-outline-light rounded-circle position-absolute top-0 end-0 m-3" style="width: 44px; height: 44px;" @click="closeLightbox" aria-label="Close">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <button class="btn btn-outline-light rounded-circle position-absolute start-0 top-50 translate-middle-y ms-3" style="width: 44px; height: 44px;" @click="step(-1)" aria-label="Previous">
                <i class="fa-solid fa-chevron-left"></i>
            </button>

            <figure class="m-0 text-center px-5" style="max-width: 1100px;">
                <img :src="activeItem.img" :alt="activeItem.title" class="img-fluid rounded-3" style="max-height: 78vh;" />
                <figcaption class="text-white mt-3">
                    <div class="fw-semibold">{{ activeItem.title }}</div>
                    <small class="text-white-50">{{ lightboxIndex + 1 }} / {{ filtered.length }}</small>
                </figcaption>
            </figure>

            <button class="btn btn-outline-light rounded-circle position-absolute end-0 top-50 translate-middle-y me-3" style="width: 44px; height: 44px;" @click="step(1)" aria-label="Next">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import HeroPattern from '@/components/HeroPattern.vue';

// Picha — badilisha/ongeza kulingana na zilizopo kwenye assets zako
import land1 from '@/assets/image/land1.jpg';
import land4 from '@/assets/image/land4.jpg';
import land5 from '@/assets/image/land5.jpg';
import land7 from '@/assets/image/land7.jpg';
import land10 from '@/assets/image/land10.jpg';
import mafundisho from '@/assets/image/mafundisho.jpg';
import michezo from '@/assets/image/michezo.jpg';
import chair from '@/assets/image/wordfromchair.jpg';

const { t, locale } = useI18n({ useScope: 'global' });

// ---------- Gallery data ----------
const rawItems = [
    { key: 'worship',   category: 'ibada',        img: land1 },
    { key: 'seminar',   category: 'semina',       img: mafundisho },
    { key: 'festival',  category: 'matukio',      img: land7 },
    { key: 'business',  category: 'ujasiriamali', img: land5 },
    { key: 'prayer',    category: 'ibada',        img: land10 },
    { key: 'life',      category: 'semina',       img: land4 },
    { key: 'meeting',   category: 'matukio',      img: chair },
    { key: 'sports',    category: 'matukio',      img: michezo },
];

const items = computed(() => {
    locale.value;
    return rawItems.map((it) => ({ ...it, title: t(`maktabaPage.items.${it.key}`) }));
});

const currentFilter = ref('all');

const filters = computed(() => {
    locale.value;
    return ['all', 'ibada', 'semina', 'matukio', 'ujasiriamali'].map((v) => ({
        value: v,
        label: t(`maktabaPage.filters.${v}`),
    }));
});

const filtered = computed(() =>
    currentFilter.value === 'all' ? items.value : items.value.filter((i) => i.category === currentFilter.value)
);

function categoryLabel(cat) {
    locale.value;
    return t(`maktabaPage.filters.${cat}`);
}

// ---------- Lightbox ----------
const lightboxIndex = ref(null);
const activeItem = computed(() => filtered.value[lightboxIndex.value] || {});

function openLightbox(i) {
    lightboxIndex.value = i;
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    lightboxIndex.value = null;
    document.body.style.overflow = '';
}
function step(dir) {
    const n = filtered.value.length;
    lightboxIndex.value = (lightboxIndex.value + dir + n) % n;
}
function onKey(e) {
    if (lightboxIndex.value === null) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
}

watch(currentFilter, closeLightbox);

onMounted(() => {
    window.addEventListener('keydown', onKey);
});
onUnmounted(() => {
    window.removeEventListener('keydown', onKey);
    document.body.style.overflow = ''; // usiache scroll imefungwa ukiondoka
});
</script>

<style scoped>
/* Kuunganisha rangi nyekundu na picha (Bootstrap haina gradient ya mwelekeo) */
.hero-fade {
    background: linear-gradient(to right, #7f1d1d 0%, rgba(127, 29, 29, 0.35) 25%, transparent 55%);
    pointer-events: none;
}
@media (max-width: 991.98px) {
    .hero-fade {
        background: linear-gradient(to bottom, #7f1d1d 0%, transparent 40%);
    }
}

.gallery-card {
    cursor: pointer;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.gallery-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.18) !important;
}
.gallery-overlay {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    opacity: 0;
    transition: opacity 0.25s ease;
}
.gallery-zoom {
    opacity: 0;
    transition: opacity 0.25s ease;
}
.gallery-card:hover .gallery-overlay,
.gallery-card:hover .gallery-zoom,
.gallery-card:focus-visible .gallery-overlay,
.gallery-card:focus-visible .gallery-zoom {
    opacity: 1;
}
</style>
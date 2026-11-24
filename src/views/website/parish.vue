<template>
    <div>
        <!-- HERO -->
        <section class="bg-brand text-white overflow-hidden">
            <div class="row g-0" style="min-height: 300px;">
                <div class="col-lg-7 d-flex align-items-center">
                    <div class="px-4 px-lg-5 py-5 w-100">
                        <p class="text-warning text-uppercase fw-bold small mb-3" style="letter-spacing: 3px;">
                            {{ $t('parishesPage.heroEyebrow') }}
                        </p>
                        <h1 class="display-4 fw-bold mb-3 text-uppercase">{{ $t('parishesPage.heroTitle') }}</h1>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-0">
                                <li class="breadcrumb-item">
                                    <router-link to="/" class="text-white">{{ $t('nav.home') }}</router-link>
                                </li>
                                <li class="breadcrumb-item active text-white-50" aria-current="page">
                                    {{ $t('nav.parish') }}
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div class="col-lg-5 position-relative d-none d-lg-block">
                    <HeroPattern />
                    <div class="hero-fade position-absolute top-0 start-0 w-100 h-100"></div>
                </div>
            </div>
        </section>

        <!-- STATS STRIP -->
        <div class="bg-white border-bottom py-3">
            <div class="container">
                <div class="row g-3 text-center">
                    <div v-for="s in stats" :key="s.label" class="col-6 col-md-3">
                        <div class="d-flex align-items-center justify-content-center gap-2">
                            <span class="bg-danger-subtle text-danger rounded-3 d-inline-flex align-items-center justify-content-center" style="width: 46px; height: 46px;">
                                <i :class="s.icon" class="fs-5"></i>
                            </span>
                            <div class="text-start">
                                <div class="fs-6 fw-bold">{{ s.value }}</div>
                                <small class="text-secondary">{{ s.label }}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- MAIN -->
        <section class="py-5 bg-light">
            <div class="container">
                <div class="row g-5">
                    <!-- LEFT: GRID -->
                    <div class="col-lg-8">
                        <p class="text-danger text-uppercase fw-bold small mb-2" style="letter-spacing: 3px;">
                            {{ $t('parishesPage.eyebrow') }}
                        </p>
                        <h2 class="display-6 fw-bold mb-1">{{ $t('parishesPage.title') }}</h2>
                        <p class="fst-italic text-secondary mb-4">{{ $t('parishesPage.subtitle') }}</p>

                        <!-- Loading -->
                        <div v-if="loading" class="text-center py-5">
                            <div class="spinner-border text-danger" role="status"></div>
                            <p class="mt-3 text-secondary">{{ $t('parishesPage.loading') }}</p>
                        </div>

                        <!-- Error -->
                        <div v-else-if="error" class="alert alert-danger d-flex align-items-center justify-content-between">
                            <span><i class="fa-solid fa-triangle-exclamation me-2"></i>{{ $t('parishesPage.error') }}</span>
                            <button class="btn btn-sm btn-outline-danger" @click="loadParishes">{{ $t('parishesPage.retry') }}</button>
                        </div>

                        <!-- Empty -->
                        <div v-else-if="parishes.length === 0" class="text-center py-5 bg-white rounded-3 border">
                            <i class="fa-solid fa-church text-secondary" style="font-size: 48px;"></i>
                            <h5 class="mt-3 fw-bold">{{ $t('parishesPage.emptyTitle') }}</h5>
                            <p class="text-secondary mb-0">{{ $t('parishesPage.emptyText') }}</p>
                        </div>

                        <!-- Cards -->
                        <div v-else class="row g-4">
                            <div v-for="(par, i) in parishes" :key="par.id" class="col-sm-6">
                                <div class="card h-100 border-0 shadow-sm overflow-hidden">
                                    <div class="position-relative">
                                        <img
                                            v-if="par.profile_image"
                                            :src="par.profile_image"
                                            :alt="par.name"
                                            class="card-img-top"
                                            style="height: 200px; object-fit: cover;"
                                            loading="lazy"
                                        />
                                        <div v-else class="bg-secondary d-flex align-items-center justify-content-center" style="height: 200px;">
                                            <i class="fa-solid fa-church text-white fs-1"></i>
                                        </div>
                                        <span class="position-absolute top-0 start-0 m-3 badge bg-danger">
                                            <i class="fa-solid fa-church me-1"></i>{{ $t('parishesPage.badge') }}
                                        </span>
                                        <span class="position-absolute bottom-0 end-0 badge bg-warning text-dark rounded-0 rounded-top-start px-3 py-2">
                                            {{ (page - 1) * pageSize + i + 1 }}
                                        </span>
                                    </div>

                                    <div class="card-body d-flex flex-column">
                                        <h5 class="fw-bold mb-3">
                                            <router-link
                                                :to="{ name: 'website-parish-details', params: { id: par.id } }"
                                                class="text-dark text-decoration-none text-uppercase"
                                            >{{ par.name }}</router-link>
                                        </h5>

                                        <ul class="list-unstyled small text-secondary mb-3">
                                            <li v-if="par.aka" class="d-flex gap-2 mb-2">
                                                <i class="fa-solid fa-tag text-warning mt-1" style="width: 16px;"></i>
                                                <span>{{ par.aka }}</span>
                                            </li>
                                            <li v-if="par.code" class="d-flex gap-2 mb-2">
                                                <i class="fa-solid fa-hashtag text-warning mt-1" style="width: 16px;"></i>
                                                <span>{{ $t('parishesPage.code') }}: <strong>{{ par.code }}</strong></span>
                                            </li>
                                            <li v-if="par.location_name" class="d-flex gap-2 mb-2">
                                                <i class="fa-solid fa-location-dot text-danger mt-1" style="width: 16px;"></i>
                                                <span>{{ par.location_name }}</span>
                                            </li>
                                            <li v-if="par.phone" class="d-flex gap-2 mb-2">
                                                <i class="fa-solid fa-phone text-success mt-1" style="width: 16px;"></i>
                                                <span>{{ par.phone }}</span>
                                            </li>
                                        </ul>

                                        <p v-if="par.description" class="text-secondary small border-top pt-3 flex-grow-1">
                                            {{ truncate(par.description, 110) }}
                                        </p>

                                        <div class="mt-auto pt-3">
                                            <router-link
                                                :to="{ name: 'website-parish-details', params: { id: par.id } }"
                                                class="btn btn-danger btn-sm px-3"
                                            >
                                                {{ $t('parishesPage.readMore') }} <i class="fa-solid fa-arrow-right ms-1"></i>
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Pagination -->
                        <nav v-if="!loading && totalPages > 1" class="mt-5" aria-label="Pagination">
                            <ul class="pagination justify-content-center flex-wrap">
                                <li class="page-item" :class="{ disabled: page === 1 }">
                                    <button class="page-link" @click="goToPage(page - 1)"><i class="fa-solid fa-chevron-left"></i></button>
                                </li>
                                <li v-for="n in visiblePages" :key="n" class="page-item" :class="{ active: n === page }">
                                    <button class="page-link" @click="goToPage(n)">{{ n }}</button>
                                </li>
                                <li class="page-item" :class="{ disabled: page === totalPages }">
                                    <button class="page-link" @click="goToPage(page + 1)"><i class="fa-solid fa-chevron-right"></i></button>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <!-- RIGHT: SIDEBAR -->
                    <div class="col-lg-4">
                        <!-- Search -->
                        <div class="card border-0 shadow-sm mb-4">
                            <div class="card-body p-4">
                                <h6 class="fw-bold border-bottom border-danger-subtle border-2 pb-2 mb-3">
                                    {{ $t('parishesPage.searchTitle') }}
                                </h6>
                                <form class="input-group" @submit.prevent="doSearch">
                                    <input
                                        v-model.trim="search"
                                        type="text"
                                        class="form-control"
                                        :placeholder="$t('parishesPage.searchPlaceholder')"
                                        autocomplete="off"
                                    />
                                    <button class="btn btn-danger" type="submit" :aria-label="$t('parishesPage.searchTitle')">
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </form>
                            </div>
                        </div>

                        <!-- Quick links -->
                        <div class="card border-0 shadow-sm mb-4">
                            <div class="card-body p-4">
                                <h6 class="fw-bold border-bottom border-danger-subtle border-2 pb-2 mb-3">
                                    {{ $t('parishesPage.quickLinks') }}
                                </h6>
                                <div class="list-group list-group-flush">
                                    <router-link to="/" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center px-0">
                                        <span><i class="fa-solid fa-house me-2 text-danger"></i>{{ $t('nav.home') }}</span>
                                        <i class="fa-solid fa-chevron-right small"></i>
                                    </router-link>
                                    <router-link to="/about" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center px-0">
                                        <span><i class="fa-solid fa-circle-info me-2 text-danger"></i>{{ $t('nav.about') }}</span>
                                        <i class="fa-solid fa-chevron-right small"></i>
                                    </router-link>
                                    <router-link to="/services" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center px-0">
                                        <span><i class="fa-solid fa-table-cells-large me-2 text-danger"></i>{{ $t('nav.programs') }}</span>
                                        <i class="fa-solid fa-chevron-right small"></i>
                                    </router-link>
                                    <router-link to="/contact" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center px-0">
                                        <span><i class="fa-solid fa-envelope me-2 text-danger"></i>{{ $t('nav.contact') }}</span>
                                        <i class="fa-solid fa-chevron-right small"></i>
                                    </router-link>
                                </div>
                            </div>
                        </div>

                        <!-- Recent events -->
                        <div class="card border-0 shadow-sm mb-4">
                            <div class="card-body p-4">
                                <h6 class="fw-bold border-bottom border-danger-subtle border-2 pb-2 mb-3">
                                    {{ $t('parishesPage.recentEvents') }}
                                </h6>
                                <p v-if="recentEvents.length === 0" class="text-secondary small text-center mb-0">
                                    <i class="fa-regular fa-calendar-xmark d-block fs-3 mb-2"></i>
                                    {{ $t('parishesPage.noEvents') }}
                                </p>
                                <div v-for="ev in recentEvents" :key="ev.id" class="d-flex gap-3 py-2 border-bottom">
                                    <img
                                        v-if="ev.image_url"
                                        :src="ev.image_url"
                                        :alt="ev.title"
                                        class="rounded-3 flex-shrink-0"
                                        style="width: 64px; height: 64px; object-fit: cover;"
                                    />
                                    <div v-else class="bg-secondary rounded-3 d-flex align-items-center justify-content-center flex-shrink-0" style="width: 64px; height: 64px;">
                                        <i class="fa-regular fa-image text-white"></i>
                                    </div>
                                    <div>
                                        <router-link
                                            :to="{ name: 'website-event-details', params: { id: ev.id } }"
                                            class="text-dark text-decoration-none fw-semibold small d-block mb-1"
                                        >{{ truncate(ev.title, 50) }}</router-link>
                                        <small class="text-secondary"><i class="fa-regular fa-calendar me-1"></i>{{ formatDate(ev.start_date) }}</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Contact -->
                        <div class="card border-0 shadow-sm bg-brand text-white">
                            <div class="card-body p-4">
                                <h6 class="fw-bold border-bottom border-light border-opacity-25 pb-2 mb-3">
                                    {{ $t('parishesPage.contactTitle') }}
                                </h6>
                                <p class="mb-2"><i class="fa-solid fa-location-dot text-warning me-2"></i>Tegeta, Ndevu, Dar es Salaam</p>
                                <p class="mb-2"><i class="fa-solid fa-phone text-warning me-2"></i><a href="tel:+255123456567" class="text-white text-decoration-none">+255-123-456-567</a></p>
                                <p class="mb-0 small"><i class="fa-solid fa-envelope text-warning me-2"></i><a href="mailto:huvikajimbolakinondoni@gmail.com" class="text-white text-decoration-none">huvikajimbolakinondoni@gmail.com</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { axiosInstance } from '@/services/axios';
import HeroPattern from '@/components/HeroPattern.vue';

const { t, locale } = useI18n({ useScope: 'global' });

// ---------- State ----------
const parishes = ref([]);
const loading = ref(false);
const error = ref(false);
const search = ref('');
const activeQuery = ref('');
const page = ref(1);
const totalPages = ref(1);
const totalCount = ref(0);
const pageSize = 6; // inatumika kama API inarudisha array nzima (client-side paging)
const allCache = ref(null); // kama API inarudisha array nzima

const recentEvents = ref([]);

// ---------- Stats ----------
const stats = computed(() => {
    locale.value;
    return [
        { icon: 'fa-solid fa-church', value: totalCount.value || '—', label: t('parishesPage.stats.total') },
        { icon: 'fa-solid fa-users', value: 'Kinondoni', label: t('parishesPage.stats.diocese') },
        { icon: 'fa-solid fa-location-dot', value: 'Dar es Salaam', label: t('parishesPage.stats.region') },
        { icon: 'fa-solid fa-heart', value: 'HUVIKA', label: t('parishesPage.stats.org') },
    ];
});

// ---------- API ----------
async function loadParishes() {
    loading.value = true;
    error.value = false;
    try {
        const res = await axiosInstance.get('/public/parishes/', {
            params: { page: page.value, q: activeQuery.value || undefined },
        });
        const data = res.data;

        if (Array.isArray(data)) {
            // API imerudisha orodha nzima -> paging upande wa client
            allCache.value = data;
            totalCount.value = data.length;
            totalPages.value = Math.max(1, Math.ceil(data.length / pageSize));
            const start = (page.value - 1) * pageSize;
            parishes.value = data.slice(start, start + pageSize);
        } else {
            // API ina pagination (Django Paginator / DRF)
            const list = data.parishes || data.results || [];
            parishes.value = list;
            totalCount.value = data.total_count ?? data.count ?? list.length;
            totalPages.value =
                data.total_pages ??
                (data.count ? Math.max(1, Math.ceil(data.count / (list.length || pageSize))) : 1);
            allCache.value = null;
        }
    } catch (err) {
        console.error('Parishes fetch error:', err);
        parishes.value = [];
        error.value = true;
    } finally {
        loading.value = false;
    }
}

async function loadRecentEvents() {
    try {
        const res = await axiosInstance.get('/public/events/', { params: { page: 1 } });
        const data = res.data;
        const list = Array.isArray(data) ? data : data.events || data.results || [];
        recentEvents.value = list.slice(0, 3);
    } catch (err) {
        console.error('Recent events error:', err);
    }
}

// ---------- Actions ----------
function doSearch() {
    activeQuery.value = search.value;
    page.value = 1;
    loadParishes();
}

function goToPage(n) {
    if (n < 1 || n > totalPages.value || n === page.value) return;
    page.value = n;
    loadParishes();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const visiblePages = computed(() => {
    const out = [];
    for (let n = 1; n <= totalPages.value; n++) {
        if (n > page.value - 3 && n < page.value + 3) out.push(n);
    }
    return out;
});

// ---------- Helpers ----------
function truncate(text, max) {
    if (!text) return '';
    return text.length > max ? text.substring(0, max) + '...' : text;
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

onMounted(() => {
    loadParishes();
    loadRecentEvents();
});
</script>

<style scoped>
/* Rangi ya chapa ya HUVIKA */
.bg-brand {
    background-color: #7f1d1d;
}
.hero-fade {
    background: linear-gradient(to right, #7f1d1d 0%, rgba(127, 29, 29, 0.35) 25%, transparent 55%);
    pointer-events: none;
}
</style>
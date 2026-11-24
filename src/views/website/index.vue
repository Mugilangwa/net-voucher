<template>
    <div>
        <!-- ============================================================
             HERO CAROUSEL
        ============================================================ -->
        <section class="position-relative overflow-hidden d-flex align-items-end" style="height: 100vh; min-height: 580px;">
            <div
                v-for="(slide, i) in slideImages"
                :key="i"
                class="position-absolute top-0 start-0 w-100 h-100"
                :style="{
                    backgroundImage: `url(${slide})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: cur === i ? 1 : 0,
                    zIndex: cur === i ? 1 : 0,
                    transition: 'opacity .8s ease',
                }"
            ></div>
            <div class="position-absolute top-0 start-0 w-100 h-100" style="z-index: 2; background: linear-gradient(to right, rgba(0,0,0,.75), rgba(0,0,0,.3) 60%, transparent);"></div>
            <div class="container position-relative pb-5 mb-5" style="z-index: 5;">
                <div class="row">
                    <div class="col-lg-9 col-xl-8">
                        <p class="text-warning text-uppercase fw-bold small mb-3" style="letter-spacing: 3px;">
                            {{ $t('hero.eyebrow') }}
                        </p>
                        <h1 class="display-3 fw-bold text-white mb-3" v-html="currentSlide.title"></h1>
                        <p class="lead text-white mb-4" style="max-width: 560px;">{{ currentSlide.desc }}</p>
                        <div class="d-flex gap-2 flex-wrap">
                            <router-link to="/about" class="btn btn-danger btn-lg px-4">
                                <i class="fa-solid fa-user-plus me-2"></i> {{ $t('hero.joinNow') }}
                            </router-link>
                            <router-link to="/about" class="btn btn-outline-light btn-lg px-4">
                                <i class="fa-solid fa-circle-play me-2"></i> {{ $t('hero.learnMore') }}
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="position-absolute bottom-0 end-0 p-4 d-flex align-items-center gap-2" style="z-index: 10;">
                <button class="btn btn-outline-light" @click="goTo(cur - 1)"><i class="fa-solid fa-chevron-left"></i></button>
                <button v-for="(s, i) in slideImages" :key="i" class="btn btn-sm rounded-circle p-0" :class="cur === i ? 'btn-warning' : 'btn-outline-light'" style="width: 12px; height: 12px;" @click="goTo(i)"></button>
                <button class="btn btn-outline-light" @click="goTo(cur + 1)"><i class="fa-solid fa-chevron-right"></i></button>
            </div>
        </section>

        <!-- ============================================================
             STATS STRIP
        ============================================================ -->

        <div class="bg-white border-bottom py-3">
            <div class="container">
                <div class="row g-3 text-center">
                    <div class="col-6 col-md-3">
                        <div class="d-flex align-items-center justify-content-center gap-2">
                            <span class="bg-danger-subtle text-danger rounded-3 d-inline-flex align-items-center justify-content-center" style="width: 46px; height: 46px;"><i class="fa-solid fa-church fs-5"></i></span>
                            <div class="text-start"><div class="fs-5 fw-bold">9+</div><small class="text-secondary">{{ $t('stats.parishes') }}</small></div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="d-flex align-items-center justify-content-center gap-2">
                            <span class="bg-danger-subtle text-danger rounded-3 d-inline-flex align-items-center justify-content-center" style="width: 46px; height: 46px;"><i class="fa-solid fa-users fs-5"></i></span>
                            <div class="text-start"><div class="fs-5 fw-bold">500+</div><small class="text-secondary">{{ $t('stats.youth') }}</small></div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="d-flex align-items-center justify-content-center gap-2">
                            <span class="bg-danger-subtle text-danger rounded-3 d-inline-flex align-items-center justify-content-center" style="width: 46px; height: 46px;"><i class="fa-regular fa-calendar-check fs-5"></i></span>
                            <div class="text-start"><div class="fs-5 fw-bold">50+</div><small class="text-secondary">{{ $t('stats.events') }}</small></div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="d-flex align-items-center justify-content-center gap-2">
                            <span class="bg-danger-subtle text-danger rounded-3 d-inline-flex align-items-center justify-content-center" style="width: 46px; height: 46px;"><i class="fa-solid fa-award fs-5"></i></span>
                            <div class="text-start"><div class="fs-5 fw-bold">2015</div><small class="text-secondary">{{ $t('stats.founded') }}</small></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ============================================================
             WELCOME SECTION
        ============================================================ -->

        <section class="py-5 bg-light">
            <div class="container">
                <div class="row align-items-center g-5">
                    <div class="col-lg-5">
                        <div class="position-relative rounded-4 overflow-hidden shadow">
                            <img :src="welcomeImg" alt="HUVIKA Leadership" class="w-100" style="height: 420px; object-fit: cover;" />
                            <span class="position-absolute bottom-0 start-0 m-3 bg-danger text-white px-3 py-2 rounded-3 fw-bold"><i class="fa-solid fa-location-dot me-2"></i>{{ $t('footer.tagline') }}</span>
                        </div>
                    </div>
                    <div class="col-lg-7">
                        <p class="text-danger text-uppercase fw-bold small mb-2" style="letter-spacing: 3px;">{{ $t('welcome.eyebrow') }}</p>
                        <h2 class="display-6 fw-bold mb-3" v-html="$t('welcome.title')"></h2>
                        <blockquote class="border-start border-4 border-warning ps-3 fst-italic text-secondary mb-4">{{ $t('welcome.quote') }}</blockquote>
                        <ul class="list-unstyled mb-4">
                            <li v-for="(c, i) in welcomeChecks" :key="i" class="d-flex align-items-start gap-2 mb-3">
                                <span class="bg-danger-subtle text-danger rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0" style="width: 22px; height: 22px;"><i class="fa-solid fa-check" style="font-size: 11px;"></i></span>
                                <span>{{ c }}</span>
                            </li>
                        </ul>
                        <div class="d-flex gap-2 flex-wrap">
                            <router-link to="/about" class="btn btn-danger">{{ $t('welcome.readMore') }} <i class="fa-solid fa-arrow-right ms-1"></i></router-link>
                            <router-link to="/services" class="btn btn-outline-secondary">{{ $t('welcome.ourPrograms') }} <i class="fa-solid fa-table-cells-large ms-1"></i></router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============================================================
             ABOUT CARDS (Vision, Mission & Goals)
        ============================================================ -->

        <section class="py-5 bg-white">
            <div class="container">
                <div class="mb-4">
                    <p class="text-danger text-uppercase fw-bold small mb-2" style="letter-spacing: 3px;">{{ $t('about.eyebrow') }}</p>
                    <h2 class="display-6 fw-bold">{{ $t('about.title') }}</h2>
                </div>
                <div class="row g-4">
                    <!-- Goals -->
                    <div class="col-md-4">
                        <div class="card h-100 border-0 shadow-sm bg-light position-relative overflow-hidden">
                            <div class="position-absolute top-0 start-0 w-100" style="height: 4px; background-color: var(--bs-danger);"></div>
                            <div class="card-body p-4">
                                <span class="bg-danger-subtle text-danger rounded-3 d-inline-flex align-items-center justify-content-center mb-3" style="width: 56px; height: 56px;">
                                    <i class="fa-solid fa-flag fs-4"></i>
                                </span>
                                <h5 class="fw-bold">{{ $t('about.goals.title') }}</h5>
                                <p class="text-secondary mb-0">{{ $t('about.goals.text') }}</p>
                            </div>
                        </div>
                    </div>
                    <!-- Mission -->
                    <div class="col-md-4">
                        <div class="card h-100 border-0 shadow-sm bg-light position-relative overflow-hidden">
                            <div class="position-absolute top-0 start-0 w-100" style="height: 4px; background-color: var(--bs-warning);"></div>
                            <div class="card-body p-4">
                                <span class="bg-warning-subtle text-warning rounded-3 d-inline-flex align-items-center justify-content-center mb-3" style="width: 56px; height: 56px;">
                                    <i class="fa-solid fa-trophy fs-4"></i>
                                </span>
                                <h5 class="fw-bold">{{ $t('about.mission.title') }}</h5>
                                <p class="text-secondary mb-0">{{ $t('about.mission.text') }}</p>
                            </div>
                        </div>
                    </div>
                    <!-- Vision -->
                    <div class="col-md-4">
                        <div class="card h-100 border-0 shadow-sm bg-light position-relative overflow-hidden">
                            <div class="position-absolute top-0 start-0 w-100" style="height: 4px; background-color: var(--bs-danger);"></div>
                            <div class="card-body p-4">
                                <span class="bg-danger-subtle text-danger rounded-3 d-inline-flex align-items-center justify-content-center mb-3" style="width: 56px; height: 56px;">
                                    <i class="fa-solid fa-eye fs-4"></i>
                                </span>
                                <h5 class="fw-bold">{{ $t('about.vision.title') }}</h5>
                                <p class="text-secondary mb-0">{{ $t('about.vision.text') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============================================================
             PROGRAMS SECTION
        ============================================================ -->

        <section class="py-5 bg-light" id="programu">
            <div class="container">
                <p class="text-danger text-uppercase fw-bold small mb-2" style="letter-spacing: 3px;">{{ $t('programs.eyebrow') }}</p>
                <h2 class="display-6 fw-bold mb-1">{{ $t('programs.title') }}</h2>
                <p class="fst-italic text-secondary mb-4">{{ $t('programs.subtitle') }}</p>
                <div class="row g-4">
                    <div v-for="(prog, i) in programs" :key="i" class="col-md-6 col-lg-3">
                        <div class="card h-100 border-0 shadow-sm">
                            <div class="position-relative">
                                <img :src="prog.img" :alt="prog.badge" class="card-img-top" style="height: 200px; object-fit: cover;" />
                                <span class="position-absolute top-0 start-0 m-2 bg-danger text-white px-2 py-1 rounded small fw-bold">{{ prog.badge }}</span>
                            </div>
                            <div class="card-body">
                                <h6 class="fw-bold">{{ prog.title }}</h6>
                                <p class="text-secondary small mb-2">{{ prog.text }}</p>
                                <router-link to="/services" class="text-danger text-decoration-none fw-bold small">{{ $t('programs.readMore') }} <i class="fa-solid fa-arrow-right"></i></router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============================================================
             EVENTS SECTION (From API - Advanced Preview)
        ============================================================ -->

        <section class="py-5 bg-white">
            <div class="container">
                <div class="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-4">
                    <div>
                        <p class="text-danger text-uppercase fw-bold small mb-2" style="letter-spacing: 3px;">{{ $t('events.eyebrow') }}</p>
                        <h2 class="display-6 fw-bold mb-0">{{ $t('events.title') }}</h2>
                    </div>
                    <router-link to="/events" class="text-danger text-decoration-none fw-bold">{{ $t('events.viewAll') }} <i class="fa-solid fa-arrow-right ms-1"></i></router-link>
                </div>

                <!-- Filter tabs -->
                <div class="d-flex flex-wrap gap-2 mb-4">
                    <button v-for="tab in filterTabs" :key="tab.value" class="btn btn-sm rounded-pill px-3" :class="currentFilter === tab.value ? 'btn-danger' : 'btn-outline-secondary'" @click="filterEvents(tab.value)">
                        {{ tab.label }}
                    </button>
                </div>

                <!-- Loading -->
                <div v-if="loadingEvents" class="text-center py-5">
                    <div class="spinner-border text-danger" role="status"></div>
                    <p class="mt-3 text-secondary">{{ $t('events.loading') }}</p>
                </div>

                <!-- Empty -->
                <div v-else-if="events.length === 0" class="text-center py-5">
                    <i class="fa-regular fa-calendar-xmark text-secondary" style="font-size: 48px;"></i>
                    <p class="mt-3 text-secondary">{{ $t('events.empty') }}</p>
                </div>

                <!-- Advanced Event Grid -->
                <div v-else class="row g-4">
                
                    <div v-for="event in events" :key="event.id" class="col-md-6 col-lg-4">
                        <div class="card h-100 border-0 shadow-sm hover-shadow transition overflow-hidden">
                            
                            <!-- Image with Status Badge -->
                            <div class="position-relative">
                                <img 
                                    v-if="event.image_url" 
                                    :src="event.image_url" 
                                    :alt="event.title" 
                                    class="card-img-top" 
                                    style="height: 220px; object-fit: cover;" 
                                    loading="lazy" 
                                />
                                <div v-else class="bg-secondary d-flex align-items-center justify-content-center" style="height: 220px;">
                                    <i class="fa-regular fa-image text-white fs-1"></i>
                                </div>
                                
                                <!-- Status Badge -->
                                <span class="position-absolute top-0 end-0 m-3 badge rounded-pill shadow-sm" :class="getStatusClass(event.status)">
                                    <i class="fa-solid fa-circle me-1" style="font-size: 6px;"></i> 
                                    {{ event.status.toUpperCase() }}
                                </span>
                            </div>

                            <div class="card-body d-flex flex-column p-4">
                                <!-- Category Badge -->
                                <div class="mb-2">
                                    <span class="badge rounded-pill" :class="eventBadgeClass(event.type)">
                                        {{ eventBadgeText(event.type) }}
                                    </span>
                                </div>
                                
                                <!-- Title -->
                                <h5 class="card-title fw-bold mb-3" style="line-height: 1.4;">
                                    {{ truncate(event.title, 55) }}
                                </h5>
                                
                                <!-- Description -->
                                <p class="text-secondary small flex-grow-1 mb-4">
                                    {{ truncate(event.description, 100) }}
                                </p>
                                
                                <!-- Date & Time Box -->
                                <div class="bg-light rounded p-2 mb-3">
                                    <div class="d-flex align-items-center small text-dark mb-1">
                                        <i class="fa-regular fa-calendar text-danger me-2" style="width: 16px;"></i>
                                        <span class="fw-medium">
                                            {{ formatDate(event.start_date) }}
                                            <span v-if="event.end_date && event.end_date !== event.start_date">
                                                - {{ formatDate(event.end_date) }}
                                            </span>
                                        </span>
                                    </div>
                                    <div class="d-flex align-items-center small text-dark">
                                        <i class="fa-regular fa-clock text-danger me-2" style="width: 16px;"></i>
                                        <span class="fw-medium">{{ formatTime(event.start_time) }} - {{ formatTime(event.end_time) }}</span>
                                    </div>
                                </div>

                                <!-- Location -->
                                <div v-if="event.location" class="d-flex align-items-center small text-secondary mb-3">
                                    <i class="fa-solid fa-location-dot text-danger me-2" style="width: 16px;"></i>
                                    <span>{{ truncate(event.location, 40) }}</span>
                                </div>
                                
                                <!-- Read More -->
                                <div class="mt-auto pt-3 border-top d-flex justify-content-end">
                                    <router-link :to="{ name: 'website-event-details', params: { id: event.id } }" class="btn btn-outline-danger btn-sm rounded-pill px-3 fw-bold">
                                        {{ $t('events.readMore') }} <i class="fa-solid fa-arrow-right ms-1"></i>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Load more -->
                <div v-if="hasMore && !loadingEvents" class="text-center mt-5">
                    <button class="btn btn-danger px-4 rounded-pill" @click="loadMoreEvents" :disabled="loadingMore">
                        <span v-if="loadingMore" class="spinner-border spinner-border-sm me-2"></span>
                        <i v-else class="fa-solid fa-plus-circle me-2"></i>
                        {{ loadingMore ? $t('events.loading') : $t('events.loadMore') }}
                    </button>
                </div>
            </div>
        </section>

        <!-- ============================================================
             PARISHES STRIP
        ============================================================ -->

        <section class="py-5 bg-light">
            <div class="container">
                <div class="text-center mb-4">
                    <p class="text-danger text-uppercase fw-bold small mb-2" style="letter-spacing: 3px;">{{ $t('parishes.eyebrow') }}</p>
                    <h2 class="display-6 fw-bold">{{ $t('parishes.title') }}</h2>
                </div>
                <div class="row g-3 justify-content-center">
                    <div v-for="(p, i) in parishes" :key="i" class="col-4 col-md-3 col-lg-2">
                        <div class="border rounded-3 bg-white d-flex align-items-center justify-content-center p-3 shadow-sm" style="height: 100px;">
                            <img :src="p.img" :alt="p.name" class="img-fluid" style="max-height: 70px; object-fit: contain;" />
                        </div>
                    </div>
                </div>
                <div class="text-center mt-5">
                    <router-link to="/parish" class="btn btn-danger px-4">{{ $t('parishes.viewAll') }} <i class="fa-solid fa-arrow-right ms-1"></i></router-link>
                </div>
            </div>
        </section>

        <!-- ============================================================
             CTA SECTION
        ============================================================ -->

        <section class="py-5 text-white text-center" style="background-color:rgb(127, 29, 29);">
        
            <div class="container">
                <p class="text-warning text-uppercase fw-bold small mb-2" style="letter-spacing: 3px;">{{ $t('cta.eyebrow') }}</p>
                <h2 class="display-5 fw-bold mb-3" v-html="$t('cta.title')"></h2>
                <p class="fst-italic text-white-50 mb-4">{{ $t('cta.subtitle') }}</p>
                <div class="d-flex gap-2 justify-content-center flex-wrap">
                    <router-link to="/about" class="btn btn-warning btn-lg text-dark fw-bold"><i class="fa-solid fa-user-plus me-2"></i> {{ $t('cta.join') }}</router-link>
                    <router-link to="/contact" class="btn btn-outline-light btn-lg">{{ $t('cta.contact') }} <i class="fa-solid fa-arrow-right ms-2"></i></router-link>
                </div>
            </div>
        </section>
        

    </div>
</template>


<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { axiosInstance } from '@/services/axios';

// Images
import land1 from '@/assets/image/land1.jpg';
import land5 from '@/assets/image/land5.jpg';
import land10 from '@/assets/image/land10.jpg';
import mafundishoImg from '@/assets/image/mafundisho.jpg';
import land4 from '@/assets/image/land4.jpg';
import land7 from '@/assets/image/land7.jpg';
import michezoImg from '@/assets/image/michezo.jpg';
import welcomeImgFile from '@/assets/image/wordfromchair.jpg';
import bokoImg from '@/assets/image/Parishi/Boko.png';
import uccImg from '@/assets/image/Parishi/Ucc.png';
import mivumoniImg from '@/assets/image/Parishi/mivumoni.png';
import tbaImg from '@/assets/image/Parishi/Tba.png';
import tegetaImg from '@/assets/image/Parishi/Tegetaamani.png';
import beachImg from '@/assets/image/Parishi/Beach.png';
import sayuniImg from '@/assets/image/Parishi/sayuni.png';
import salasalaImg from '@/assets/image/Parishi/Salasala.png';
import mbeziImg from '@/assets/image/Parishi/mbezi.png';

// ✅ GLOBAL scope
const { t, tm, locale } = useI18n({ useScope: 'global' });

// Hero
const slideImages = [land1, land5, land10];
const cur = ref(0);

const currentSlide = computed(() => {
    locale.value;   // ✅ dependency
    const all = tm('hero.slides');
    return (Array.isArray(all) && all[cur.value]) || { title: '', desc: '' };
});

let timer;
const goTo = (n) => {
    cur.value = (n + slideImages.length) % slideImages.length;
    clearInterval(timer);
    timer = setInterval(() => goTo(cur.value + 1), 5000);
};

// Welcome
const welcomeImg = welcomeImgFile;

const welcomeChecks = computed(() => {
    locale.value;   // ✅ dependency
    const list = tm('welcome.checks');
    return Array.isArray(list) ? list : [];
});

// Programs — ✅ locale.value dependency
const programs = computed(() => {
    locale.value;
    return [
        { img: mafundishoImg, badge: t('programs.items.spiritual'), title: t('programs.items.spiritual'), text: t('programs.spiritualText') },
        { img: land4, badge: t('programs.items.leadership'), title: t('programs.items.leadership'), text: t('programs.leadershipText') },
        { img: land7, badge: t('programs.items.community'), title: t('programs.items.community'), text: t('programs.communityText') },
        { img: michezoImg, badge: t('programs.items.sports'), title: t('programs.items.sports'), text: t('programs.sportsText') },
    ];
});

// Parishes — static, hakuna t()
const parishes = computed(() => [
    { img: bokoImg, name: 'Boko' },
    { img: uccImg, name: 'UCC' },
    { img: mivumoniImg, name: 'Mivumoni' },
    { img: tbaImg, name: 'TBA' },
    { img: tegetaImg, name: 'Tegeta Amani' },
    { img: beachImg, name: 'Beach' },
    { img: sayuniImg, name: 'Sayuni' },
    { img: salasalaImg, name: 'Salasala' },
    { img: mbeziImg, name: 'Mbezi' },
]);

// Events
const events = ref([]);
const loadingEvents = ref(false);
const loadingMore = ref(false);
const currentPage = ref(1);
const hasMore = ref(false);
const currentFilter = ref('all');

// ✅ locale.value dependency
const filterTabs = computed(() => {
    locale.value;
    return [
        { value: 'all', label: t('events.filters.all') },
        { value: 'event', label: t('events.filters.event') },
        { value: 'announcement', label: t('events.filters.announcement') },
        { value: 'activity', label: t('events.filters.activity') },
    ];
});

// =============== API FUNCTIONS ===============

async function fetchEvents(page = 1, filter = 'all') {
    const res = await axiosInstance.get(`/public/events/`, {
        params: {
            page: page,
            type: filter !== 'all' ? filter : undefined
        }
    });
    const data = res.data;
    if (Array.isArray(data)) {
        return { events: data, has_next: false, current_page: 1 };
    }
    return {
        events: data.events || data.results || [],
        current_page: data.current_page || page,
        has_next: data.has_next !== undefined ? data.has_next : !!data.next
    };
}

async function loadEvents() {
    loadingEvents.value = true;
    try {
        const data = await fetchEvents(1, currentFilter.value);
        events.value = data.events;
        currentPage.value = data.current_page;
        hasMore.value = data.has_next;
    } catch (err) {
        console.error('Events fetch error:', err);
        events.value = [];
    } finally {
        loadingEvents.value = false;
    }
}

async function loadMoreEvents() {
    if (loadingMore.value || !hasMore.value) return;
    loadingMore.value = true;
    try {
        const nextPage = currentPage.value + 1;
        const data = await fetchEvents(nextPage, currentFilter.value);
        events.value = [...events.value, ...data.events];
        currentPage.value = data.current_page;
        hasMore.value = data.has_next;
    } catch (err) {
        console.error('Load more error:', err);
    } finally {
        loadingMore.value = false;
    }
}

function filterEvents(value) {
    if (currentFilter.value === value) return;
    currentFilter.value = value;
    loadEvents();
}

// =============== HELPERS ===============

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

function formatTime(timeStr) {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
}

function eventBadgeClass(type) {
    if (type === 'event') return 'bg-primary';
    if (type === 'announcement') return 'bg-warning text-dark';
    return 'bg-success';
}

// ✅ locale.value dependency (ina t())
function eventBadgeText(type) {
    locale.value;
    if (type === 'event') return t('events.filters.event').toUpperCase();
    if (type === 'announcement') return t('events.filters.announcement').toUpperCase();
    return t('events.filters.activity').toUpperCase();
}

function getStatusClass(status) {
    if (status === 'upcoming') return 'bg-success';
    if (status === 'completed') return 'bg-secondary';
    if (status === 'cancelled') return 'bg-danger';
    return 'bg-info text-dark';
}

// =============== LIFECYCLE ===============

onMounted(() => {
    timer = setInterval(() => goTo(cur.value + 1), 5000);
    loadEvents();
});

onUnmounted(() => {
    clearInterval(timer);
});
</script>

<style scoped>

.hover-shadow {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-shadow:hover {
    transform: translateY(-5px);
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
}

</style>
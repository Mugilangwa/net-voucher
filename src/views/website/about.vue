<template>
    <div class="bg-light">
        <!-- ============================================================
             1. HERO SECTION (Gradient Blend: Red <-> Image)
        ============================================================ -->
        <section class="position-relative overflow-hidden d-flex align-items-center" style="min-height: 550px; background: #7f1d1d">
            <!-- PICHA ZINAZOBADILIKA (Zinachukua upande wa kulia kwa 70%) -->
            <div class="position-absolute top-0 end-0 h-100 d-none d-md-block" style="width: 70%; z-index: 1;">
                <div class="swiper hero-swiper w-100 h-100">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(img, i) in heroImages" :key="i">
                            <img :src="img" class="w-100 h-100" style="object-fit: cover;" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- GRADIENT YA KUUNGANISHA (Inafuta mstari na kuunganisha rangi na picha) -->
            <div class="position-absolute top-0 start-0 w-100 h-100" 
                 style="z-index: 2; background: linear-gradient(90deg, #3b0a0a 0%, #3b0a0a 30%, rgba(59,10,10,0.9) 45%, rgba(59,10,10,0.4) 65%, transparent 100%); pointer-events: none;">
            </div>

            <!-- MAANDISHI (Yapo juu ya kila kitu) -->
            <div class="container position-relative" style="z-index: 3;">
                <div class="row">
                    <div class="col-md-8 col-lg-7 col-xl-6">
                        <p class="text-warning text-uppercase fw-bold mb-3" style="letter-spacing: 4px; text-shadow: 1px 1px 3px rgba(0,0,0,0.8);">
                            {{ $t('about.heroEyebrow') }}
                        </p>
                        <h1 class="display-3 fw-bold text-white mb-4" style="text-shadow: 2px 2px 5px rgba(0,0,0,0.7);" v-html="$t('about.heroTitle')"></h1>
                        
                        <div class="d-flex align-items-center gap-2 text-white-50 small fw-medium">
                            <router-link to="/" class="text-white-50 text-decoration-none hover-white transition-all">
                                <i class="fa-solid fa-house me-1"></i> {{ $t('nav.home') }}
                            </router-link>
                            <i class="fa-solid fa-chevron-right" style="font-size: 10px;"></i>
                            <span class="text-warning fw-bold">{{ $t('nav.about') }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============================================================
             2. VALUES CARDS (Vision, Mission, Values)
        ============================================================ -->
        <section class="py-5 bg-white">
            <div class="container py-4">
                <div class="row g-4">
                    <div class="col-md-4">
                        <div class="card h-100 border-0 shadow-sm hover-lift transition-all">
                            <div class="card-body p-4 p-lg-5 text-center">
                                <span class="bg-danger-subtle text-danger rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style="width: 70px; height: 70px;">
                                    <i class="fa-solid fa-eye fs-3"></i>
                                </span>
                                <h5 class="fw-bold mb-3">{{ $t('about.values.visionTitle') }}</h5>
                                <p class="text-secondary mb-0 lh-lg">{{ $t('about.values.visionText') }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card h-100 border-0 shadow-sm hover-lift transition-all position-relative overflow-hidden">
                            <div class="position-absolute top-0 start-0 w-100 bg-warning" style="height: 4px;"></div>
                            <div class="card-body p-4 p-lg-5 text-center">
                                <span class="bg-warning-subtle text-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style="width: 70px; height: 70px;">
                                    <i class="fa-solid fa-bullseye fs-3"></i>
                                </span>
                                <h5 class="fw-bold mb-3">{{ $t('about.values.missionTitle') }}</h5>
                                <p class="text-secondary mb-0 lh-lg">{{ $t('about.values.missionText') }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card h-100 border-0 shadow-sm hover-lift transition-all">
                            <div class="card-body p-4 p-lg-5 text-center">
                                <span class="bg-danger-subtle text-danger rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style="width: 70px; height: 70px;">
                                    <i class="fa-solid fa-heart fs-3"></i>
                                </span>
                                <h5 class="fw-bold mb-3">{{ $t('about.values.valuesTitle') }}</h5>
                                <p class="text-secondary mb-0 lh-lg">{{ $t('about.values.valuesText') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============================================================
             3. HISTORY / ABOUT
        ============================================================ -->
        <section class="py-5" style="background: #faf8f5;">
            <div class="container py-4">
                <div class="row align-items-center g-5">
                    <div class="col-lg-5">
                        <div class="position-relative rounded-4 overflow-hidden shadow-lg">
                            <img src="@/assets/image/land6.jpg" alt="Historia" class="w-100" style="height: 450px; object-fit: cover;" />
                            <div class="position-absolute bottom-0 start-0 w-100 p-4" style="background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);">
                                <span class="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold fs-6 shadow-sm">
                                    <i class="fa-regular fa-calendar me-2"></i>{{ $t('about.history.since') }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-7">
                        <p class="text-danger text-uppercase fw-bold small mb-2" style="letter-spacing: 3px;">{{ $t('about.history.eyebrow') }}</p>
                        <h2 class="display-5 fw-bold mb-4" v-html="$t('about.history.title')"></h2>
                        <blockquote class="border-start border-4 border-warning ps-4 py-3 fst-italic text-secondary bg-warning-subtle rounded-end mb-4 shadow-sm">
                            "{{ $t('about.history.quote') }}"
                        </blockquote>
                        <p class="text-secondary mb-4 lh-lg">{{ $t('about.history.p1') }}</p>
                        <ul class="list-unstyled mb-5">
                            <li v-for="(item, i) in historyChecks" :key="i" class="d-flex align-items-start gap-3 mb-3">
                                <span class="bg-danger text-white rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0 mt-1 shadow-sm" style="width: 24px; height: 24px;">
                                    <i class="fa-solid fa-check" style="font-size: 12px;"></i>
                                </span>
                                <span class="text-secondary fw-medium">{{ item }}</span>
                            </li>
                        </ul>
                        <div class="d-flex gap-3 flex-wrap">
                            <router-link to="/services" class="btn btn-danger px-4 py-2 fw-bold rounded-pill shadow-sm hover-lift">
                                {{ $t('about.history.btnPrograms') }} <i class="fa-solid fa-arrow-right ms-2"></i>
                            </router-link>
                            <router-link to="/contact" class="btn btn-outline-dark px-4 py-2 fw-bold rounded-pill hover-lift">
                                {{ $t('about.history.btnContact') }} <i class="fa-regular fa-envelope ms-2"></i>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============================================================
             4. GOALS GRID
        ============================================================ -->
        <section class="py-5 bg-white">
            <div class="container py-4">
                <div class="text-center mb-5">
                    <p class="text-danger text-uppercase fw-bold small mb-2" style="letter-spacing: 3px;">{{ $t('about.goals.eyebrow') }}</p>
                    <h2 class="display-5 fw-bold mb-3">{{ $t('about.goals.title') }}</h2>
                    <p class="fst-italic text-secondary fs-5">{{ $t('about.goals.subtitle') }}</p>
                </div>
                <div class="row g-4">
                    <div v-for="(goal, i) in goals" :key="i" class="col-md-6 col-lg-4">
                        <div class="card h-100 border-0 bg-light hover-lift transition-all">
                            <div class="card-body p-4">
                                <div class="d-flex align-items-center gap-3 mb-3">
                                    <span class="bg-danger text-white rounded-3 d-inline-flex align-items-center justify-content-center shadow-sm" style="width: 50px; height: 50px;">
                                        <i :class="goal.icon" class="fs-5"></i>
                                    </span>
                                    <h5 class="fw-bold mb-0">{{ goal.title }}</h5>
                                </div>
                                <p class="text-secondary mb-0 lh-lg">{{ goal.text }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============================================================
             5. ACTIVITIES (Professional Swiper Design)
        ============================================================ -->
        <section class="py-5 position-relative overflow-hidden" style="background: #faf8f5;">
            <!-- Mapambo ya background kidogo -->
            <div class="position-absolute top-0 start-0 w-100 h-100 opacity-50" style="background-image: radial-gradient(circle at 0% 100%, rgba(212,160,23,0.05) 0%, transparent 50%);"></div>
            
            <div class="container py-4 position-relative z-2">
                <div class="row align-items-center g-5">
                    <!-- Swiper Upande wa Kulia -->
                    <div class="col-lg-6 order-lg-2">
                        <div class="position-relative p-2 p-md-3 rounded-5" style="background: #fff; box-shadow: 0 20px 40px rgba(0,0,0,0.08);">
                            <!-- Badge ya Dhahabu juu ya picha -->
                            <div class="position-absolute top-0 end-0 m-4 z-3">
                                <span class="badge bg-warning text-dark px-3 py-2 rounded-pill shadow fw-bold">
                                    <i class="fa-solid fa-camera me-1"></i> Gallery
                                </span>
                            </div>
                            
                            <div class="rounded-4 overflow-hidden position-relative activities-swiper">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide" v-for="(img, i) in activityImages" :key="i">
                                        <img :src="img" class="w-100" style="aspect-ratio: 4/3; object-fit: cover;" />
                                    </div>
                                </div>
                                <div class="swiper-pagination"></div>
                                <div class="swiper-button-next"></div>
                                <div class="swiper-button-prev"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Maelezo Upande wa Kushoto -->
                    <div class="col-lg-6 order-lg-1">
                        <div class="pe-lg-4">
                            <div class="d-inline-flex align-items-center gap-2 mb-3">
                                <span class="bg-danger" style="width: 30px; height: 2px;"></span>
                                <p class="text-danger text-uppercase fw-bold small mb-0" style="letter-spacing: 3px;">{{ $t('about.activities.eyebrow') }}</p>
                            </div>
                            <h2 class="display-5 fw-bold mb-4" v-html="$t('about.activities.title')"></h2>
                            <p class="text-secondary mb-4 lh-lg fs-5">{{ $t('about.activities.desc') }}</p>
                            
                            <ul class="list-unstyled mb-0">
                                <li v-for="(act, i) in activityChecks" :key="i" class="d-flex align-items-start gap-3 mb-3 bg-white p-3 rounded-3 shadow-sm hover-lift transition-all">
                                    <span class="bg-warning text-dark rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0 mt-1" style="width: 24px; height: 24px;">
                                        <i class="fa-solid fa-check" style="font-size: 12px;"></i>
                                    </span>
                                    <span class="text-dark fw-medium">{{ act }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============================================================
             6. GUARDIANS BAND
        ============================================================ -->
        <section class="py-5 text-white position-relative" style="background: linear-gradient(135deg, #7f1d1d 0%, #3b0a0a 100%);">
            <div class="container py-4 position-relative z-2">
                <div class="text-center mb-5">
                    <p class="text-warning text-uppercase fw-bold small mb-2" style="letter-spacing: 3px;">{{ $t('about.guardians.eyebrow') }}</p>
                    <h2 class="display-5 fw-bold mb-3">{{ $t('about.guardians.title') }}</h2>
                    <p class="fst-italic text-white-50 fs-5">{{ $t('about.guardians.subtitle') }}</p>
                </div>
                <div class="row g-4 justify-content-center">
                    <div v-for="(g, i) in guardians" :key="i" class="col-6 col-md-3">
                        <div class="bg-white bg-opacity-10 border border-white border-opacity-25 rounded-4 p-4 text-center hover-bg-light transition-all h-100">
                            <img :src="g.img" :alt="g.name" class="rounded-circle mb-3 border border-3 border-warning shadow-sm object-fit-cover" style="width: 90px; height: 90px;" />
                            <h5 class="text-white fw-bold mb-1">{{ g.name }}</h5>
                            <p class="text-warning small mb-0 fw-medium">{{ g.role }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============================================================
             7. LEADERSHIP (Professional Church Cards)
        ============================================================ -->
        <section class="py-5" style="background: #faf8f5;">
            <div class="container py-4">
                <div class="text-center mb-5">
                    <p class="text-danger text-uppercase fw-bold small mb-2" style="letter-spacing: 3px;">{{ $t('about.team.eyebrow') }}</p>
                    <h2 class="display-5 fw-bold mb-3">{{ $t('about.team.title') }}</h2>
                    <p class="fst-italic text-secondary fs-5">{{ $t('about.team.subtitle') }}</p>
                </div>
                
                <div class="row g-4 justify-content-center">
                    <div v-for="(leader, i) in leaders" :key="i" class="col-lg-4 col-md-6">
                        <div class="card h-100 border-0 shadow-sm leader-card rounded-4 overflow-hidden position-relative bg-white">
                            <!-- Picha -->
                            <div class="leader-img-wrapper">
                                <img :src="leader.img" :alt="leader.name" class="leader-img" />
                                
                                <!-- Social Media Overlay (Inatokea ikigusa) -->
                                <div class="social-overlay d-flex justify-content-center align-items-center gap-3">
                                    <a href="#" class="social-icon"><i class="fa-brands fa-twitter"></i></a>
                                    <a href="#" class="social-icon"><i class="fa-brands fa-facebook-f"></i></a>
                                    <a href="#" class="social-icon"><i class="fa-brands fa-instagram"></i></a>
                                </div>
                            </div>

                            <!-- Maelezo -->
                            <div class="card-body text-center pt-4 pb-4 position-relative z-2">
                                <div class="mx-auto mb-2" style="width: 40px; height: 3px; background: #d4a017; border-radius: 2px;"></div>
                                <h5 class="text-dark fw-bold mb-1" style="font-family: var(--fh);">{{ leader.name }}</h5>
                                <p class="text-danger small mb-0 fw-bold text-uppercase" style="letter-spacing: 1.5px;">
                                    {{ leader.role }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============================================================
             8. PARISH LOGOS
        ============================================================ -->
        <section class="py-5" style="background: #faf8f5;">
            <div class="container py-4">
                <div class="text-center mb-5">
                    <p class="text-danger text-uppercase fw-bold small mb-2" style="letter-spacing: 3px;">{{ $t('about.parishes.eyebrow') }}</p>
                    <h2 class="display-5 fw-bold mb-3">{{ $t('about.parishes.title') }}</h2>
                </div>
                <div class="row g-3 justify-content-center">
                    <div v-for="(p, i) in parishes" :key="i" class="col-4 col-md-3 col-lg-2">
                        <div class="bg-white border rounded-4 d-flex align-items-center justify-content-center p-3 shadow-sm hover-lift transition-all" style="height: 110px;">
                            <img :src="p.img" :alt="p.name" class="img-fluid grayscale-hover transition-all" style="max-height: 65px; object-fit: contain;" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import Swiper from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ✅ GLOBAL SCOPE
const { t, tm, locale } = useI18n({ useScope: 'global' });

// Images
import land6 from '@/assets/image/land6.jpg';
import wedo1 from '@/assets/image/wedo/wedo1.jpg';
import wedo2 from '@/assets/image/wedo/wedo2.jpg';
import wedo3 from '@/assets/image/wedo/wedo3.jpg';
import wedo4 from '@/assets/image/wedo/wedo4.jpg';
import wedo5 from '@/assets/image/wedo/wedo5.jpg';
import wedo6 from '@/assets/image/wedo/wedo6.jpg';
import profileImg from '@/assets/image/profile.jpg';
import chair1 from '@/assets/image/chair1.jpg';
import land4 from '@/assets/image/land4.jpg';
import semina from '@/assets/image/semina.jpg';
import grolry from '@/assets/image/grolry.jpg';
import erica from '@/assets/image/erica.jpg';
import jere from '@/assets/image/erica.jpg';
import wt3 from '@/assets/image/uongozi/wt3.jpg';
import wt1 from '@/assets/image/uongozi/wt.jpg';

// Parishes
import bokoImg from '@/assets/image/Parishi/Boko.png';
import uccImg from '@/assets/image/Parishi/Ucc.png';
import mivumoniImg from '@/assets/image/Parishi/mivumoni.png';
import tbaImg from '@/assets/image/Parishi/Tba.png';
import tegetaImg from '@/assets/image/Parishi/Tegetaamani.png';
import beachImg from '@/assets/image/Parishi/Beach.png';
import sayuniImg from '@/assets/image/Parishi/sayuni.png';
import salasalaImg from '@/assets/image/Parishi/Salasala.png';
import mbeziImg from '@/assets/image/Parishi/mbezi.png';

// Static Data
const heroImages = [wt3, wt1, land4, chair1, semina];
const activityImages = [wedo1, wedo2, wedo3, wedo4, wedo5, wedo6];

// ✅ COMPUTED ZENYE LOCALE.VALUE ILI ZIBADILIKE
const historyChecks = computed(() => {
    locale.value; // dependency
    return tm('about.history.checks') || [];
});

const activityChecks = computed(() => {
    locale.value;
    return tm('about.activities.checks') || [];
});

const goals = computed(() => {
    locale.value;
    return [
        { icon: 'fa-solid fa-church', title: tm('about.goals.items.spiritual').title, text: tm('about.goals.items.spiritual').text },
        { icon: 'fa-solid fa-users', title: tm('about.goals.items.leadership').title, text: tm('about.goals.items.leadership').text },
        { icon: 'fa-solid fa-microphone', title: tm('about.goals.items.worship').title, text: tm('about.goals.items.worship').text },
        { icon: 'fa-solid fa-handshake', title: tm('about.goals.items.fellowship').title, text: tm('about.goals.items.fellowship').text },
        { icon: 'fa-solid fa-trophy', title: tm('about.goals.items.talents').title, text: tm('about.goals.items.talents').text },
        { icon: 'fa-solid fa-book', title: tm('about.goals.items.education').title, text: tm('about.goals.items.education').text },
    ];
});

const guardians = computed(() => {
    locale.value;
    return [
        { img: profileImg, name: 'Askofu Mkuu', role: tm('about.guardians.items.bishop').role },
        { img: profileImg, name: 'Askofu Muna', role: tm('about.guardians.items.diocese').role },
        { img: profileImg, name: 'Mchungaji', role: tm('about.guardians.items.pastor').role },
        { img: profileImg, name: 'Mlezi', role: tm('about.guardians.items.guardian').role },
    ];
});

const leaders = computed(() => {
    locale.value;
    return [
        { img: chair1, name: 'Marius Bugingo', role: tm('about.team.items.chair').role },
        { img: land4, name: 'Henry Mkopi', role: tm('about.team.items.viceChair').role },
        { img: semina, name: 'Batista', role: tm('about.team.items.secretary').role },
        { img: grolry, name: 'Grolia Oddo', role: tm('about.team.items.viceSecretary').role },
        { img: erica, name: 'Erica Erica', role: tm('about.team.items.treasurer').role },
        { img: jere, name: 'Jeremial', role: tm('about.team.items.assTreasurer').role },
    ];
});

const parishes = [
    { img: bokoImg, name: 'Boko' }, { img: uccImg, name: 'UCC' }, { img: mivumoniImg, name: 'Mivumoni' },
    { img: tbaImg, name: 'TBA' }, { img: tegetaImg, name: 'Tegeta Amani' }, { img: beachImg, name: 'Beach' },
    { img: sayuniImg, name: 'Sayuni' }, { img: salasalaImg, name: 'Salasala' }, { img: mbeziImg, name: 'Mbezi' },
];

// Swiper Instances
let heroSwiperInstance = null;
let actSwiperInstance = null;

onMounted(() => {
    heroSwiperInstance = new Swiper('.hero-swiper', {
        modules: [Autoplay],
        loop: true,
        autoplay: { delay: 3500, disableOnInteraction: false },
        speed: 800,
    });

    actSwiperInstance = new Swiper('.activities-swiper', {
        modules: [Autoplay, Pagination, Navigation],
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        speed: 800,
    });
});

onUnmounted(() => {
    if (heroSwiperInstance) heroSwiperInstance.destroy(true, true);
    if (actSwiperInstance) actSwiperInstance.destroy(true, true);
});
</script>

<style scoped>
/* ====== GLOBAL HOVER EFFECTS ====== */
.hover-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}
.hover-bg-light {
    transition: all 0.3s ease;
}
.hover-bg-light:hover {
    background-color: rgba(255, 255, 255, 0.2) !important;
    transform: translateY(-5px);
}
.hover-white:hover {
    color: #fff !important;
}
.grayscale-hover {
    filter: grayscale(100%);
    transition: filter 0.3s ease;
}
.grayscale-hover:hover {
    filter: grayscale(0%);
}

/* ====== HERO SWIPER ====== */
.hero-swiper {
    width: 100%;
    height: 100%;
}

/* ====== ACTIVITIES SWIPER ====== */
.activities-swiper {
    width: 100%;
    aspect-ratio: 4/3;
}
.activities-swiper .swiper-pagination-bullet-active {
    background: var(--gold);
    width: 24px;
    border-radius: 4px;
}
.activities-swiper .swiper-button-next,
.activities-swiper .swiper-button-prev {
    color: #fff;
    background: rgba(127, 29, 29, 0.7); /* Crimson */
    width: 45px;
    height: 45px;
    border-radius: 50%;
    backdrop-filter: blur(4px);
    transition: background 0.3s ease;
}
.activities-swiper .swiper-button-next:hover,
.activities-swiper .swiper-button-prev:hover {
    background: var(--gold);
    color: #111;
}
.activities-swiper .swiper-button-next::after,
.activities-swiper .swiper-button-prev::after {
    font-size: 18px;
    font-weight: bold;
}

/* ====== LEADERSHIP CARDS ====== */
.leader-card {
    transition: all 0.4s ease;
}
.leader-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
}
.leader-img-wrapper {
    position: relative;
    height: 320px;
    overflow: hidden;
    background-color: #eaeaea;
}
.leader-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    transition: transform 0.6s ease;
}
.leader-card:hover .leader-img {
    transform: scale(1.08);
}
.social-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(127, 29, 29, 0.95), transparent);
    opacity: 0;
    transition: all 0.4s ease;
    transform: translateY(20px);
}
.leader-card:hover .social-overlay {
    opacity: 1;
    transform: translateY(0);
}
.social-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: #d4a017; /* Gold */
    color: #fff;
    border-radius: 50%;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 16px;
}
.social-icon:hover {
    background: #fff;
    color: #7f1d1d;
    transform: scale(1.1);
}
</style>
<template>
    <div>
        <!-- HERO -->
        <section class="bg-brand text-white overflow-hidden">
            <div class="row g-0" style="min-height: 300px;">
                <div class="col-lg-7 d-flex align-items-center">
                    <div class="px-4 px-lg-5 py-5 w-100">
                        <p class="text-warning text-uppercase fw-bold small mb-3" style="letter-spacing: 3px;">
                            {{ $t('parishDetails.heroEyebrow') }}
                        </p>
                        <h1 class="display-5 fw-bold mb-3 text-uppercase">{{ church?.name || '...' }}</h1>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-0">
                                <li class="breadcrumb-item">
                                    <router-link to="/" class="text-white">{{ $t('nav.home') }}</router-link>
                                </li>
                                <li class="breadcrumb-item">
                                    <router-link to="/parish" class="text-white">{{ $t('nav.parish') }}</router-link>
                                </li>
                                <li class="breadcrumb-item active text-white-50" aria-current="page">{{ church?.name }}</li>
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

        <section class="py-5 bg-light">
            <div class="container">
                <router-link to="/parish" class="btn btn-outline-secondary btn-sm mb-4">
                    <i class="fa-solid fa-arrow-left me-2"></i>{{ $t('parishDetails.back') }}
                </router-link>

                <!-- Loading -->
                <div v-if="loading" class="text-center py-5">
                    <div class="spinner-border text-danger" role="status"></div>
                    <p class="mt-3 text-secondary">{{ $t('parishDetails.loading') }}</p>
                </div>

                <!-- Error / not found -->
                <div v-else-if="error" class="text-center py-5 bg-white rounded-3 border">
                    <i class="fa-solid fa-triangle-exclamation text-danger" style="font-size: 48px;"></i>
                    <p class="mt-3 text-secondary">{{ $t('parishDetails.error') }}</p>
                    <button class="btn btn-danger" @click="loadParish">{{ $t('parishDetails.retry') }}</button>
                </div>

                <div v-else-if="church" class="row g-5">
                    <!-- LEFT -->
                    <div class="col-lg-8">
                        <!-- Gallery (Bootstrap carousel) -->
                        <div v-if="attachments.length" id="parishCarousel" class="carousel slide shadow rounded-4 overflow-hidden mb-4" data-bs-ride="carousel">
                            <div class="carousel-indicators">
                                <button
                                    v-for="(a, i) in attachments"
                                    :key="'ind' + i"
                                    type="button"
                                    data-bs-target="#parishCarousel"
                                    :data-bs-slide-to="i"
                                    :class="{ active: i === 0 }"
                                    :aria-label="`Slide ${i + 1}`"
                                ></button>
                            </div>
                            <div class="carousel-inner">
                                <div v-for="(a, i) in attachments" :key="i" class="carousel-item" :class="{ active: i === 0 }" data-bs-interval="5000">
                                    <img :src="mediaUrl(a.file_path)" :alt="a.file_name || church.name" class="d-block w-100" style="height: 420px; object-fit: cover;" />
                                </div>
                            </div>
                            <template v-if="attachments.length > 1">
                                <button class="carousel-control-prev" type="button" data-bs-target="#parishCarousel" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#parishCarousel" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </template>
                        </div>
                        <div v-else class="bg-secondary rounded-4 d-flex align-items-center justify-content-center mb-4" style="height: 320px;">
                            <i class="fa-solid fa-church text-white" style="font-size: 64px;"></i>
                        </div>

                        <!-- Description + History -->
                        <div class="card border-0 shadow-sm mb-5">
                            <div class="card-body p-4 p-md-5">
                                <h4 class="fw-bold text-danger border-bottom pb-3 mb-3">
                                    <i class="fa-solid fa-church me-2"></i>{{ $t('parishDetails.aboutTitle') }} {{ church.name }}
                                </h4>
                                <p class="text-secondary">{{ church.description || $t('parishDetails.defaultDescription') }}</p>

                                <h4 class="fw-bold text-danger border-bottom pb-3 mb-3 mt-4">
                                    <i class="fa-solid fa-book me-2"></i>{{ $t('parishDetails.historyTitle') }}
                                </h4>
                                <p class="text-secondary mb-0">{{ church.history || $t('parishDetails.defaultHistory') }}</p>
                            </div>
                        </div>

                        <!-- Top leadership -->
                        <div v-if="topLeadership.length" class="mb-5">
                            <p class="text-danger text-uppercase fw-bold small mb-2" style="letter-spacing: 3px;">{{ $t('parishDetails.leadershipEyebrow') }}</p>
                            <h3 class="fw-bold mb-1">{{ $t('parishDetails.leadershipTitle') }}</h3>
                            <p class="fst-italic text-secondary mb-4">{{ $t('parishDetails.leadershipSub') }}</p>
                            <div class="row g-4">
                                <div v-for="(l, i) in topLeadership" :key="'tl' + i" class="col-md-6 col-lg-4">
                                    <div class="card h-100 border-0 shadow-sm text-center overflow-hidden">
                                        <img
                                            v-if="l.leader?.profile_image"
                                            :src="mediaUrl(l.leader.profile_image)"
                                            :alt="l.leader.full_name"
                                            class="card-img-top"
                                            style="height: 240px; object-fit: cover;"
                                        />
                                        <div v-else class="bg-secondary d-flex align-items-center justify-content-center" style="height: 240px;">
                                            <i class="fa-solid fa-user text-white" style="font-size: 56px;"></i>
                                        </div>
                                        <div class="card-body">
                                            <h6 class="fw-bold text-danger mb-1">{{ l.leader?.full_name }}</h6>
                                            <small class="text-secondary">{{ leaderRole(l) }}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Main department -->
                        <div v-if="huvikaDepartment" class="mb-5">
                            <p class="text-danger text-uppercase fw-bold small mb-2" style="letter-spacing: 3px;">{{ $t('parishDetails.deptEyebrow') }}</p>
                            <h3 class="fw-bold text-uppercase mb-1">{{ huvikaDepartment.name }}</h3>
                            <p class="fst-italic text-secondary mb-4">{{ $t('parishDetails.deptSub') }}</p>
                            <div v-if="departmentLeadership.length" class="row g-4">
                                <div v-for="(l, i) in departmentLeadership" :key="'dl' + i" class="col-md-6 col-lg-4">
                                    <div class="card h-100 border-0 shadow-sm text-center overflow-hidden">
                                        <img
                                            v-if="l.leader?.profile_image"
                                            :src="mediaUrl(l.leader.profile_image)"
                                            :alt="l.leader.full_name"
                                            class="card-img-top"
                                            style="height: 240px; object-fit: cover;"
                                        />
                                        <div v-else class="bg-secondary d-flex align-items-center justify-content-center" style="height: 240px;">
                                            <i class="fa-solid fa-user text-white" style="font-size: 56px;"></i>
                                        </div>
                                        <div class="card-body">
                                            <h6 class="fw-bold text-danger mb-1">{{ l.leader?.full_name }}</h6>
                                            <small class="text-secondary">{{ l.position?.name_sw }}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="text-center py-4 bg-white rounded-3 border text-secondary">
                                <i class="fa-solid fa-people-group d-block fs-3 mb-2"></i>{{ $t('parishDetails.noDeptLeaders') }}
                            </div>
                        </div>

                        <!-- Other departments -->
                        <div v-if="otherDepartments.length">
                            <p class="text-danger text-uppercase fw-bold small mb-2" style="letter-spacing: 3px;">{{ $t('parishDetails.otherDeptEyebrow') }}</p>
                            <h3 class="fw-bold mb-4">{{ $t('parishDetails.otherDeptTitle') }}</h3>
                            <div class="row g-4">
                                <div v-for="d in otherDepartments" :key="d.id || d.name" class="col-md-6 col-lg-4">
                                    <div class="card h-100 border-0 shadow-sm text-center">
                                        <div class="card-body p-4">
                                            <span class="bg-danger-subtle text-danger rounded-3 d-inline-flex align-items-center justify-content-center mb-3" style="width: 50px; height: 50px;">
                                                <i class="fa-solid fa-people-group fs-5"></i>
                                            </span>
                                            <h6 class="fw-bold mb-1">{{ d.name }}</h6>
                                            <small class="text-secondary">{{ $t('parishDetails.department') }}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- RIGHT -->
                    <div class="col-lg-4">
                        <!-- Info -->
                        <div class="card border-0 shadow-sm mb-4 overflow-hidden">
                            <div class="card-header bg-brand text-white py-3">
                                <i class="fa-solid fa-circle-info text-warning me-2"></i>
                                <span class="fw-bold">{{ $t('parishDetails.infoTitle') }}</span>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item d-flex gap-3 py-3">
                                    <i class="fa-solid fa-user text-danger mt-1"></i>
                                    <div>
                                        <small class="text-secondary text-uppercase d-block">{{ $t('parishDetails.pastor') }}</small>
                                        <strong>{{ topLeadership[0]?.leader?.full_name || $t('parishDetails.notSet') }}</strong>
                                    </div>
                                </li>
                                <li class="list-group-item d-flex gap-3 py-3">
                                    <i class="fa-solid fa-church text-danger mt-1"></i>
                                    <div>
                                        <small class="text-secondary text-uppercase d-block">{{ $t('parishDetails.parishName') }}</small>
                                        <strong>{{ church.name }}</strong>
                                    </div>
                                </li>
                                <li v-if="church.phone" class="list-group-item d-flex gap-3 py-3">
                                    <i class="fa-solid fa-phone text-success mt-1"></i>
                                    <div>
                                        <small class="text-secondary text-uppercase d-block">{{ $t('parishDetails.phone') }}</small>
                                        <a :href="`tel:${church.phone}`" class="fw-bold text-dark text-decoration-none">{{ church.phone }}</a>
                                    </div>
                                </li>
                                <li v-if="church.address" class="list-group-item d-flex gap-3 py-3">
                                    <i class="fa-solid fa-location-dot text-danger mt-1"></i>
                                    <div>
                                        <small class="text-secondary text-uppercase d-block">{{ $t('parishDetails.address') }}</small>
                                        <strong>{{ church.address }}</strong>
                                    </div>
                                </li>
                                <li v-if="church.code" class="list-group-item d-flex gap-3 py-3">
                                    <i class="fa-solid fa-hashtag text-warning mt-1"></i>
                                    <div>
                                        <small class="text-secondary text-uppercase d-block">{{ $t('parishDetails.code') }}</small>
                                        <strong>{{ church.code }}</strong>
                                    </div>
                                </li>
                                <li v-if="church.aka" class="list-group-item d-flex gap-3 py-3">
                                    <i class="fa-solid fa-tag text-danger mt-1"></i>
                                    <div>
                                        <small class="text-secondary text-uppercase d-block">{{ $t('parishDetails.aka') }}</small>
                                        <strong>{{ church.aka }}</strong>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <!-- Map -->
                        <div class="card border-0 shadow-sm mb-4 overflow-hidden">
                            <div class="card-header bg-white py-3">
                                <i class="fa-solid fa-location-dot text-danger me-2"></i>
                                <span class="fw-bold">{{ $t('parishDetails.mapTitle') }}</span>
                            </div>
                            <div class="ratio ratio-4x3">
                                <iframe :src="mapSrc" allowfullscreen loading="lazy" title="Map"></iframe>
                            </div>
                        </div>

                        <!-- Quick links -->
                        <div class="card border-0 shadow-sm overflow-hidden">
                            <div class="card-header bg-brand text-white py-3">
                                <i class="fa-solid fa-bolt text-warning me-2"></i>
                                <span class="fw-bold">{{ $t('parishesPage.quickLinks') }}</span>
                            </div>
                            <div class="list-group list-group-flush">
                                <router-link to="/parish" class="list-group-item list-group-item-action py-3">
                                    <i class="fa-solid fa-arrow-left text-danger me-2"></i>
                                    <strong>{{ $t('parishDetails.allParishes') }}</strong>
                                </router-link>
                                <router-link to="/contact" class="list-group-item list-group-item-action py-3">
                                    <i class="fa-solid fa-envelope text-danger me-2"></i>
                                    <strong>{{ $t('nav.contact') }}</strong>
                                </router-link>
                                <router-link to="/" class="list-group-item list-group-item-action py-3">
                                    <i class="fa-solid fa-house text-warning me-2"></i>
                                    <strong>{{ $t('nav.home') }}</strong>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { axiosInstance } from '@/services/axios';
import { mediaUrl } from '@/utils/media';
import HeroPattern from '@/components/HeroPattern.vue';

const route = useRoute();

const loading = ref(false);
const error = ref(false);
const church = ref(null);
const attachments = ref([]);
const topLeadership = ref([]);
const huvikaDepartment = ref(null);
const departmentLeadership = ref([]);
const otherDepartments = ref([]);

async function loadParish() {
    loading.value = true;
    error.value = false;
    try {
        const res = await axiosInstance.get(`/public/parishes/${route.params.id}/`);
        const d = res.data;
        church.value = d.church || d;
        attachments.value = (d.attachments || []).filter((a) => a.file_path);
        topLeadership.value = d.top_leadership || [];
        huvikaDepartment.value = d.huvika_department || null;
        departmentLeadership.value = d.department_leadership || [];
        otherDepartments.value = d.other_departments || [];
    } catch (err) {
        console.error('Parish details error:', err);
        error.value = true;
        church.value = null;
    } finally {
        loading.value = false;
    }
}

function leaderRole(l) {
    return [l.role?.name_sw, l.position?.name_sw].filter(Boolean).join(' ');
}

// Map: geolocation inaweza kuwa { coordinates: [lng, lat] } au { coordinates: { coordinates: [lng, lat] } }
const mapSrc = computed(() => {
    const g = church.value?.geolocation;
    // Serializer mpya: geolocation = { latitude, longitude }
    if (g?.latitude != null && g?.longitude != null) {
        return `https://www.google.com/maps?q=${g.latitude},${g.longitude}&z=15&output=embed`;
    }
    const raw = g?.coordinates?.coordinates || g?.coordinates;
    if (Array.isArray(raw) && raw.length >= 2) {
        return `https://www.google.com/maps?q=${raw[1]},${raw[0]}&z=15&output=embed`;
    }
    if (church.value?.latitude && church.value?.longitude) {
        return `https://www.google.com/maps?q=${church.value.latitude},${church.value.longitude}&z=15&output=embed`;
    }
    // Default: Kanisa la Tegeta kwa Ndevu
    return 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1178.1578923338864!2d39.18845190148746!3d-6.667359727406133!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c5100528bf8d9%3A0x2934e7ab8a1d1ce6!2sKanisa%20la%20Tegeta%20kwa%20Ndevu!5e0!3m2!1sen!2stz!4v1726117853799!5m2!1sen!2stz';
});

onMounted(loadParish);
// Guard: unapoondoka kwenye page hii, params.id inakuwa undefined -> usipige API
watch(
    () => route.params.id,
    (id, oldId) => {
        if (id && id !== oldId) loadParish();
    }
);
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
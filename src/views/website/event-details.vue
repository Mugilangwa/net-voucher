<template>
    <div>
        <!-- HERO -->
        <section class="text-white overflow-hidden position-relative" style="background: linear-gradient(135deg, #7f1d1d 0%, #3b0a0a 100%);">
            <!-- Mapambo -->
            <div class="position-absolute top-0 start-0 w-100 h-100 opacity-25" style="background-image: radial-gradient(circle at 10% 90%, rgba(212,160,23,0.4) 0%, transparent 50%);"></div>
            
            <div class="row g-0 position-relative z-2" style="min-height: 320px;">
                <div class="col-lg-7 d-flex align-items-center">
                    <div class="px-4 px-lg-5 py-5 w-100">
                        <p class="text-warning text-uppercase fw-bold small mb-3" style="letter-spacing: 3px;">
                            {{ $t('eventDetails.heroEyebrow') }}
                        </p>
                        <h1 class="display-5 fw-bold mb-3">{{ event?.title || '...' }}</h1>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-0">
                                <li class="breadcrumb-item">
                                    <router-link to="/" class="text-white text-decoration-none hover-gold">{{ $t('nav.home') }}</router-link>
                                </li>
                                <li class="breadcrumb-item active text-warning" aria-current="page">
                                    {{ $t('eventDetails.heroEyebrow') }}
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-5" style="background: #faf8f5;">
            <div class="container py-4">
                <router-link to="/" class="btn btn-outline-dark btn-sm mb-4 rounded-pill px-4 hover-lift">
                    <i class="fa-solid fa-arrow-left me-2"></i>{{ $t('eventDetails.back') }}
                </router-link>

                <!-- Loading -->
                <div v-if="loading" class="text-center py-5">
                    <div class="spinner-border text-danger" role="status"></div>
                    <p class="mt-3 text-secondary">{{ $t('events.loading') }}</p>
                </div>

                <!-- Error -->
                <div v-else-if="error" class="text-center py-5 bg-white rounded-4 shadow-sm border">
                    <i class="fa-solid fa-triangle-exclamation text-danger" style="font-size: 48px;"></i>
                    <p class="mt-3 text-secondary">{{ $t('eventDetails.error') }}</p>
                    <button class="btn btn-danger rounded-pill px-4" @click="loadEvent">{{ $t('eventDetails.retry') }}</button>
                </div>

                <div v-else-if="event" class="row g-5">
                    <!-- LEFT: Maelezo -->
                    <div class="col-lg-8">
                        <div class="card border-0 shadow-sm overflow-hidden rounded-4 bg-white">
                            <img
                                v-if="event.image_url"
                                :src="mediaUrl(event.image_url)"
                                :alt="event.title"
                                class="card-img-top"
                                style="max-height: 460px; object-fit: cover;"
                            />
                            <div class="card-body p-4 p-md-5">
                                <div class="d-flex flex-wrap gap-2 mb-3">
                                    <!-- TUMIA RANGI ZETU HAPA -->
                                    <span class="badge rounded-pill" :class="typeClass(event.type)">{{ typeText(event.type) }}</span>
                                    <span v-if="event.status" class="badge rounded-pill" :class="statusClass(event.status)">
                                        {{ event.status.toUpperCase() }}
                                    </span>
                                </div>
                                <h3 class="fw-bold mb-3" style="font-family: var(--fh);">{{ event.title }}</h3>
                                <p class="text-secondary mb-0 lh-lg" style="white-space: pre-line;">{{ event.description }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- RIGHT: Taarifa Muhimu -->
                    <div class="col-lg-4">
                        <div class="card border-0 shadow-sm overflow-hidden rounded-4">
                            <div class="card-header py-3 text-white border-0" style="background: #7f1d1d;">
                                <i class="fa-solid fa-circle-info text-warning me-2"></i>
                                <span class="fw-bold">{{ $t('eventDetails.infoTitle') }}</span>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item d-flex gap-3 py-4">
                                    <span class="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="width: 40px; height: 40px;">
                                        <i class="fa-regular fa-calendar"></i>
                                    </span>
                                    <div>
                                        <small class="text-secondary text-uppercase fw-bold d-block mb-1" style="font-size: 11px; letter-spacing: 1px;">{{ $t('eventDetails.date') }}</small>
                                        <strong class="text-dark">
                                            {{ formatDate(event.start_date) }}
                                            <span v-if="event.end_date && event.end_date !== event.start_date">
                                                - {{ formatDate(event.end_date) }}
                                            </span>
                                        </strong>
                                    </div>
                                </li>
                                <li v-if="event.start_time" class="list-group-item d-flex gap-3 py-4">
                                    <span class="bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="width: 40px; height: 40px;">
                                        <i class="fa-regular fa-clock"></i>
                                    </span>
                                    <div>
                                        <small class="text-secondary text-uppercase fw-bold d-block mb-1" style="font-size: 11px; letter-spacing: 1px;">{{ $t('eventDetails.time') }}</small>
                                        <strong class="text-dark">{{ formatTime(event.start_time) }}<span v-if="event.end_time"> - {{ formatTime(event.end_time) }}</span></strong>
                                    </div>
                                </li>
                                <li v-if="event.location" class="list-group-item d-flex gap-3 py-4">
                                    <span class="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="width: 40px; height: 40px;">
                                        <i class="fa-solid fa-location-dot"></i>
                                    </span>
                                    <div>
                                        <small class="text-secondary text-uppercase fw-bold d-block mb-1" style="font-size: 11px; letter-spacing: 1px;">{{ $t('eventDetails.location') }}</small>
                                        <strong class="text-dark">{{ event.location }}</strong>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { axiosInstance } from '@/services/axios';
import { mediaUrl } from '@/utils/media';

const route = useRoute();
const { t, locale } = useI18n({ useScope: 'global' });

const event = ref(null);
const loading = ref(false);
const error = ref(false);

async function loadEvent() {
    loading.value = true;
    error.value = false;
    try {
        const res = await axiosInstance.get(`/public/events/${route.params.id}/`);
        event.value = res.data.event || res.data;
    } catch (err) {
        console.error('Event details error:', err);
        event.value = null;
        error.value = true;
    } finally {
        loading.value = false;
    }
}

// ---------- Helpers ----------
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
    return `${h % 12 || 12}:${minutes} ${h >= 12 ? 'PM' : 'AM'}`;
}

// ✅ BADILISHA RANGI HAPA KUTUMIA ZA KANISA
function typeClass(type) {
    if (type === 'event') return 'bg-danger text-white'; // Nyekundu
    if (type === 'announcement') return 'bg-warning text-dark'; // Dhahabu
    return 'bg-success text-white'; // Kijani kwa ajili ya shughuli
}

function typeText(type) {
    locale.value;
    if (type === 'event') return t('events.filters.event').toUpperCase();
    if (type === 'announcement') return t('events.filters.announcement').toUpperCase();
    return t('events.filters.activity').toUpperCase();
}

// ✅ BADILISHA RANGI YA STATUS
function statusClass(status) {
    if (status === 'upcoming') return 'bg-success'; // Kijani
    if (status === 'completed') return 'bg-secondary'; // Kijivu
    if (status === 'cancelled') return 'bg-dark'; // Nyeusi
    return 'bg-danger text-white'; // Nyekundu
}

onMounted(loadEvent);
watch(
    () => route.params.id,
    (id, oldId) => {
        if (id && id !== oldId) loadEvent();
    }
);
</script>

<style scoped>
.hover-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-lift:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}
.hover-gold:hover {
    color: #d4a017 !important;
}
</style>
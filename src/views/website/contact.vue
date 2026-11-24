<template>
    <div>
        <!-- ============================================================
             HERO: maandishi kushoto, carousel ya picha kulia
        ============================================================ -->
        <section class="overflow-hidden text-white" style="background-color: #7f1d1d;">
            <div class="row g-0" style="min-height: 380px;">
                <div class="col-lg-6 d-flex align-items-center">
                    <div class="px-4 px-lg-5 py-5 w-100">
                        <p class="text-warning text-uppercase fw-bold small mb-3" style="letter-spacing: 3px;">
                            {{ $t('contactPage.heroEyebrow') }}
                        </p>
                        <h1 class="display-4 fw-bold mb-3">{{ $t('contactPage.heroTitle') }}</h1>
                        <p class="lead text-white-50 mb-4" style="max-width: 480px;">
                            {{ $t('contactPage.heroText') }}
                        </p>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-0">
                                <li class="breadcrumb-item">
                                    <router-link to="/" class="text-white">{{ $t('nav.home') }}</router-link>
                                </li>
                                <li class="breadcrumb-item active text-white-50" aria-current="page">
                                    {{ $t('nav.contact') }}
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
             INFO CARDS
        ============================================================ -->
        <section class="py-5 bg-light">
            <div class="container">
                <div class="text-center mb-5">
                    <p class="text-danger text-uppercase fw-bold small mb-2" style="letter-spacing: 3px;">
                        {{ $t('contactPage.eyebrow') }}
                    </p>
                    <h2 class="display-6 fw-bold mb-2">{{ $t('contactPage.title') }}</h2>
                    <p class="text-secondary mx-auto" style="max-width: 600px;">{{ $t('contactPage.subtitle') }}</p>
                </div>

                <div class="row g-4 mb-5">
                    <div v-for="c in contactCards" :key="c.key" class="col-md-4">
                        <div class="card h-100 border-0 shadow-sm text-center contact-card">
                            <div class="card-body p-4">
                                <span class="bg-danger-subtle text-danger rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 64px; height: 64px;">
                                    <i :class="c.icon" class="fs-4"></i>
                                </span>
                                <h5 class="fw-bold mb-3">{{ c.title }}</h5>
                                <p v-for="(line, i) in c.lines" :key="i" class="text-secondary mb-1">
                                    <a v-if="c.href" :href="c.href(line)" class="text-secondary text-decoration-none">{{ line }}</a>
                                    <span v-else>{{ line }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ====================================================
                     FORM + MAP
                ==================================================== -->
                <div class="row g-4 align-items-stretch">
                    <!-- Form -->
                    <div class="col-lg-7">
                        <div class="card border-0 shadow-sm h-100">
                            <div class="card-body p-4 p-md-5">
                                <h4 class="fw-bold mb-1">{{ $t('contactPage.formTitle') }}</h4>
                                <p class="text-secondary mb-4">{{ $t('contactPage.formText') }}</p>

                                <div v-if="status === 'success'" class="alert alert-success d-flex align-items-center" role="alert">
                                    <i class="fa-solid fa-circle-check me-2"></i>{{ $t('contactPage.success') }}
                                </div>
                                <div v-if="status === 'error'" class="alert alert-danger d-flex align-items-center" role="alert">
                                    <i class="fa-solid fa-triangle-exclamation me-2"></i>{{ $t('contactPage.error') }}
                                </div>

                                <form novalidate @submit.prevent="submit">
                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <div class="form-floating">
                                                <input id="cName" v-model.trim="form.name" type="text" class="form-control" :class="{ 'is-invalid': errors.name }" :placeholder="$t('contactPage.name')" />
                                                <label for="cName">{{ $t('contactPage.name') }}</label>
                                                <div class="invalid-feedback">{{ errors.name }}</div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-floating">
                                                <input id="cEmail" v-model.trim="form.email" type="email" class="form-control" :class="{ 'is-invalid': errors.email }" :placeholder="$t('contactPage.email')" />
                                                <label for="cEmail">{{ $t('contactPage.email') }}</label>
                                                <div class="invalid-feedback">{{ errors.email }}</div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-floating">
                                                <input id="cSubject" v-model.trim="form.subject" type="text" class="form-control" :class="{ 'is-invalid': errors.subject }" :placeholder="$t('contactPage.subject')" />
                                                <label for="cSubject">{{ $t('contactPage.subject') }}</label>
                                                <div class="invalid-feedback">{{ errors.subject }}</div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="form-floating">
                                                <textarea id="cMessage" v-model.trim="form.message" class="form-control" :class="{ 'is-invalid': errors.message }" :placeholder="$t('contactPage.message')" style="height: 160px;"></textarea>
                                                <label for="cMessage">{{ $t('contactPage.message') }}</label>
                                                <div class="invalid-feedback">{{ errors.message }}</div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <button type="submit" class="btn btn-danger btn-lg px-4" :disabled="sending">
                                                <span v-if="sending" class="spinner-border spinner-border-sm me-2"></span>
                                                <i v-else class="fa-solid fa-paper-plane me-2"></i>
                                                {{ sending ? $t('contactPage.sending') : $t('contactPage.send') }}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <!-- Map -->
                    <div class="col-lg-5">
                        <div class="card border-0 shadow-sm h-100 overflow-hidden">
                            <div class="card-header bg-white py-3">
                                <i class="fa-solid fa-location-dot text-danger me-2"></i>
                                <span class="fw-bold">{{ $t('contactPage.mapTitle') }}</span>
                            </div>
                            <div class="flex-grow-1" style="min-height: 320px;">
                                <iframe
                                    class="w-100 h-100 border-0"
                                    style="min-height: 320px;"
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1178.1578923338864!2d39.18845190148746!3d-6.667359727406133!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c5100528bf8d9%3A0x2934e7ab8a1d1ce6!2sKanisa%20la%20Tegeta%20kwa%20Ndevu!5e0!3m2!1sen!2stz!4v1726117853799!5m2!1sen!2stz"
                                    allowfullscreen
                                    loading="lazy"
                                    title="Map"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import HeroPattern from '@/components/HeroPattern.vue';
import { axiosInstance } from '@/services/axios';


const { t, locale } = useI18n({ useScope: 'global' });

// ---------- Contact cards ----------
const contactCards = computed(() => {
    locale.value;
    return [
        {
            key: 'location',
            icon: 'fa-solid fa-location-dot',
            title: t('contactPage.cards.location'),
            lines: ['Tegeta Kwa Ndevu', 'Dar es Salaam, Tanzania'],
        },
        {
            key: 'email',
            icon: 'fa-solid fa-envelope',
            title: t('contactPage.cards.email'),
            lines: ['huvikakinondoni@gmail.com', 'huvikakinondoni@yahoo.com'],
            href: (l) => `mailto:${l}`,
        },
        {
            key: 'phone',
            icon: 'fa-solid fa-phone',
            title: t('contactPage.cards.phone'),
            lines: ['+255 713 456 789', '+255 655 892 247'],
            href: (l) => `tel:${l.replace(/\s/g, '')}`,
        },
    ];
});

// ---------- Form ----------
const form = reactive({ name: '', email: '', subject: '', message: '' });
const errors = reactive({ name: '', email: '', subject: '', message: '' });
const sending = ref(false);
const status = ref('idle'); // idle | success | error

function validate() {
    errors.name = form.name ? '' : t('contactPage.required');
    errors.subject = form.subject ? '' : t('contactPage.required');
    errors.message = form.message ? '' : t('contactPage.required');
    if (!form.email) errors.email = t('contactPage.required');
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = t('contactPage.invalidEmail');
    else errors.email = '';
    return !errors.name && !errors.email && !errors.subject && !errors.message;
}

async function submit() {
    status.value = 'idle';
    if (!validate()) return;
    sending.value = true;
    try {
        await axiosInstance.post('/public/messages/', { ...form });
        status.value = 'success';
        Object.assign(form, { name: '', email: '', subject: '', message: '' });
    } catch (err) {
        console.error('Contact submit error:', err);
        status.value = 'error';
    } finally {
        sending.value = false;
    }
}

</script>

<style scoped>
.hero-fade {
    background: linear-gradient(to right, #7f1d1d 0%, rgba(127, 29, 29, 0.35) 25%, transparent 55%);
    pointer-events: none;
}
@media (max-width: 991.98px) {
    .hero-fade {
        background: linear-gradient(to bottom, #7f1d1d 0%, transparent 40%);
    }
}

.contact-card {
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.contact-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.12) !important;
}
</style>
<template>
    <footer class="site-footer">
        <div class="container">

            <!-- ============================================================
                 MAIN ROW
            ============================================================ -->
            <div class="row g-4 g-lg-5 pb-4">

                <!-- Brand -->
                <div class="col-lg-4 col-md-6">
                    <h3 class="footer-brand-title">HUVIKA</h3>
                    <p class="footer-tagline">{{ $t('footer.tagline') }}</p>
                    <p class="footer-desc">{{ $t('footer.description') }}</p>
                    <div class="d-flex gap-2">
                        <a href="#" class="footer-social-btn" aria-label="Facebook">
                            <i class="bi bi-facebook"></i>
                        </a>
                        <a href="#" class="footer-social-btn" aria-label="Instagram">
                            <i class="bi bi-instagram"></i>
                        </a>
                        <a href="#" class="footer-social-btn" aria-label="Twitter">
                            <i class="bi bi-twitter-x"></i>
                        </a>
                        <a href="#" class="footer-social-btn" aria-label="YouTube">
                            <i class="bi bi-youtube"></i>
                        </a>
                    </div>
                </div>

                <!-- Links -->
                <div class="col-6 col-md-3 col-lg-2">
                    <h5 class="footer-heading">{{ $t('footer.links') }}</h5>
                    <ul class="list-unstyled footer-links">
                        <li>
                            <router-link to="/">
                                <i class="bi bi-chevron-right me-1"></i> {{ $t('nav.home') }}
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/about">
                                <i class="bi bi-chevron-right me-1"></i> {{ $t('nav.about') }}
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/parish">
                                <i class="bi bi-chevron-right me-1"></i> {{ $t('nav.parish') }}
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/services">
                                <i class="bi bi-chevron-right me-1"></i> {{ $t('nav.programs') }}
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/contact">
                                <i class="bi bi-chevron-right me-1"></i> {{ $t('nav.contact') }}
                            </router-link>
                        </li>
                    </ul>
                </div>

                <!-- Services -->
                <div class="col-6 col-md-3 col-lg-2">
                    <h5 class="footer-heading">{{ $t('footer.services') }}</h5>
                    <ul class="list-unstyled footer-links">
                        <li>
                            <router-link to="/services">
                                <i class="bi bi-chevron-right me-1"></i> {{ $t('programs.items.spiritual') }}
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/services">
                                <i class="bi bi-chevron-right me-1"></i> {{ $t('programs.items.leadership') }}
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/services">
                                <i class="bi bi-chevron-right me-1"></i> {{ $t('programs.items.community') }}
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/services">
                                <i class="bi bi-chevron-right me-1"></i> {{ $t('programs.items.sports') }}
                            </router-link>
                        </li>
                    </ul>
                </div>

                <!-- Newsletter -->
                <div class="col-lg-4 col-md-6">
                    <h5 class="footer-heading">{{ $t('footer.newsletter') }}</h5>
                    <p class="footer-desc mb-3">{{ $t('footer.newsletterText') }}</p>
                    <form class="footer-newsletter" @submit.prevent="subscribe">
                        <div class="input-group">
                            <input
                                type="email"
                                class="form-control"
                                v-model="email"
                                :placeholder="$t('footer.emailPlaceholder')"
                                required
                            />
                            <button class="btn btn-gold" type="submit" :disabled="loading">
                                <span v-if="loading" class="spinner-border spinner-border-sm me-1" role="status"></span>
                                <i v-else class="bi bi-send-fill me-1"></i>
                                {{ loading ? '...' : $t('footer.joinBtn') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- ============================================================
                 BOTTOM BAR
            ============================================================ -->
            <div class="footer-bottom d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
                <span class="small">
                    &copy; {{ currentYear }}
                    <router-link to="/" class="footer-bottom-link">HUVIKA {{ $t('footer.tagline') }}</router-link>.
                    {{ $t('footer.copyright') }}
                </span>
                <span class="small">
                    {{ $t('footer.builtBy') }}
                    <a href="#" class="footer-bottom-link">HUVIKA</a>
                </span>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const email = ref('');
const loading = ref(false);
const currentYear = computed(() => new Date().getFullYear());

async function subscribe() {
    if (!email.value) return;
    loading.value = true;
    try {
        await axios.post('/api/subscribe/', { email: email.value });
        Swal.fire({
            icon: 'success',
            title: 'Asante!',
            text: 'Umejiunga na jarida letu.',
            confirmButtonColor: '#b91c1c',
        });
        email.value = '';
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Hitilafu',
            text: 'Imeshindwa. Jaribu tena baadaye.',
            confirmButtonColor: '#b91c1c',
        });
    } finally {
        loading.value = false;
    }
}
</script>

<style scoped>
/* ============================================================
   FOOTER WRAPPER
============================================================ */
.site-footer {
    background: #111;
    color: rgba(255, 255, 255, 0.7);
    padding: 64px 0 0;
}

/* ============================================================
   BRAND
============================================================ */
.footer-brand-title {
    font-family: var(--fh);
    font-size: 28px;
    font-weight: 900;
    color: #fff;
    margin-bottom: 6px;
    letter-spacing: 1px;
}
.footer-tagline {
    font-family: var(--fa);
    font-style: italic;
    font-size: 14px;
    color: var(--gold);
    margin-bottom: 16px;
}
.footer-desc {
    font-size: 13.5px;
    line-height: 1.8;
    margin-bottom: 20px;
    color: rgba(255, 255, 255, 0.65);
}
.footer-social-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.75);
    font-size: 15px;
    transition: background 0.2s, color 0.2s;
    text-decoration: none;
}
.footer-social-btn:hover {
    background: var(--crimson);
    color: #fff;
}

/* ============================================================
   HEADINGS + LINKS
============================================================ */
.footer-heading {
    font-family: var(--fh);
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.08);
}
.footer-links {
    padding: 0;
    margin: 0;
}
.footer-links li {
    margin-bottom: 10px;
}
.footer-links a {
    font-size: 13.5px;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    transition: color 0.2s, padding-left 0.2s;
}
.footer-links a:hover {
    color: var(--gold);
    padding-left: 4px;
}

/* ============================================================
   NEWSLETTER (input-group Bootstrap)
============================================================ */
.footer-newsletter .form-control {
    background: rgba(255, 255, 255, 0.08);
    border: 1.5px solid rgba(255, 255, 255, 0.12);
    color: #fff;
    font-size: 13.5px;
    padding: 11px 16px;
    border-radius: 8px 0 0 8px;
}
.footer-newsletter .form-control:focus {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--gold);
    color: #fff;
    box-shadow: none;
}
.footer-newsletter .form-control::placeholder {
    color: rgba(255, 255, 255, 0.35);
}
.btn-gold {
    background: var(--gold);
    color: #111;
    border: none;
    font-weight: 600;
    font-size: 13.5px;
    padding: 11px 20px;
    border-radius: 0 8px 8px 0;
    transition: background 0.2s;
}
.btn-gold:hover {
    background: var(--gold-dk);
    color: #111;
}
.btn-gold:disabled {
    opacity: 0.7;
}

/* ============================================================
   BOTTOM BAR
============================================================ */
.footer-bottom {
    padding: 20px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.4);
}
.footer-bottom-link {
    color: rgba(255, 255, 255, 0.55);
    text-decoration: none;
    transition: color 0.2s;
}
.footer-bottom-link:hover {
    color: var(--gold);
}
</style>
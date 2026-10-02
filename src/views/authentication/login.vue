<template>
    <div class="auth-wrapper">
        <div class="auth-left">
            <div class="auth-inner">

                <!-- Logo + Title centered -->
                <div class="text-center mb-4">
                    <img src="@/assets/img/klptlogo.png" alt="HUVIKA Logo" class="auth-logo mb-3" />
                    <h2 class="auth-title">Welcome to HUVIKA!</h2>
                    <p class="auth-subtitle">For Your Protection Please Provide Your Credentials</p>
                </div>

                <!-- Alerts -->
                <div v-if="alertMessage.show" :class="['alert', 'alert-dismissible', alertClass]" role="alert">
                    <span>{{ alertMessage.text }}</span>
                    <button type="button" class="btn-close" @click="dismissAlert" aria-label="Close"></button>
                </div>

                <!-- Form -->
                <form @submit.prevent="handleLogin" novalidate>
                    <div class="mb-3">
                        <input
                            type="text"
                            v-model="username"
                            class="form-control auth-input"
                            placeholder="Username"
                            :class="{ 'is-invalid': validationErrors.username }"
                            @focus="clearFieldError('username')"
                        />
                        <div v-if="validationErrors.username" class="invalid-feedback">
                            {{ validationErrors.username }}
                        </div>
                    </div>

                    <div class="mb-2">
                        <input
                            :type="!passCheck ? 'password' : 'text'"
                            v-model="password"
                            class="form-control auth-input"
                            placeholder="Password"
                            :class="{ 'is-invalid': validationErrors.password }"
                            @focus="clearFieldError('password')"
                        />
                        <div v-if="validationErrors.password" class="invalid-feedback d-block">
                            {{ validationErrors.password }}
                        </div>
                    </div>

                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="showPass" v-model="passCheck" />
                            <label class="form-check-label text-muted small" for="showPass">Show Password</label>
                        </div>
                        <router-link to="/auth/pass-recovery" class="forgot-link">Forgot Password?</router-link>
                    </div>

                    <button type="submit" class="btn btn-dark w-100 auth-btn mb-3" :disabled="loading">
                        <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        {{ loading ? 'Logging in...' : 'Login' }}
                    </button>

                    <div class="form-check mb-3">
                        <input type="checkbox" class="form-check-input" id="chkRemember" v-model="rememberMe" />
                        <label class="form-check-label text-muted small" for="chkRemember">Remember Me</label>
                    </div>
                </form>

                <p class="text-center text-muted small mb-3">
                    Dont Have An Account?
                    <router-link to="/auth/register" class="fw-bold text-dark">Jiandikishe Sasa</router-link>
                </p>

                <p class="auth-footer">
                    © 2026 All Rights Reserved. <router-link to="/">HUVIKA</router-link> is a product of Huvika Jimbo La Kinondoni.
                    <a href="javascript:void(0);">Privacy</a> &amp; <a href="javascript:void(0);">Terms</a>.
                </p>
            </div>
        </div>

        <!-- Right Slideshow Panel -->
        <div class="auth-right">
            <div
                v-for="(slide, index) in slides"
                :key="index"
                class="slide"
                :class="{ active: currentSlide === index }"
                :style="{ backgroundImage: `url(${slide.url})` }"
            ></div>

            <div class="slide-overlay"></div>

            <div class="slide-caption">
                <h4>{{ slides[currentSlide].title }}</h4>
                <p>{{ slides[currentSlide].caption }}</p>
            </div>

            <div class="slide-dots">
                <span
                    v-for="(slide, index) in slides"
                    :key="index"
                    class="dot"
                    :class="{ active: currentSlide === index }"
                    @click="goToSlide(index)"
                ></span>
            </div>
        </div>
    </div>
</template>

<script setup>
import '@/assets/sass/authentication/auth.scss';
import { useMeta } from '@/composables/use-meta';
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import auth from '@/store/auth';

useMeta({ title: 'Login' });

const router = useRouter();
const passCheck = ref(false);
const username = ref('');
const password = ref('');
const loading = ref(false);
const rememberMe = ref(false);

// ---- Slideshow ----
const currentSlide = ref(0);
let slideTimer = null;

const slides = [
    {
        url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80',
        title: 'Vijana wa Kristo',
        caption: 'Kuandaa vijana kuishi kusudi la Mungu — Familia, Kanisa na Taifa'
    },
    {
        url: 'https://images.unsplash.com/photo-1609234656388-0ff363383899?w=1200&q=80',
        title: 'Umoja wa Imani',
        caption: 'Tunaamini katika umoja wa imani na huduma ya kweli kwa vijana wote'
    },
    {
        url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=80',
        title: 'Karibu HUVIKA',
        caption: 'Jiunge na familia ya HUVIKA — Jimbo la Kinondoni'
    },
    {
        url: 'https://images.unsplash.com/photo-1541802645635-11f2286a7482?w=1200&q=80',
        title: 'Huduma ya Jamii',
        caption: 'Vijana wanashiriki katika shughuli za kijamii na mabadiliko chanya'
    },
];

const goToSlide = (index) => {
    currentSlide.value = index;
    clearInterval(slideTimer);
    slideTimer = setInterval(() => {
        currentSlide.value = (currentSlide.value + 1) % slides.length;
    }, 4500);
};



// ---- Alerts ----
const alertMessage = reactive({ show: false, type: 'info', text: '' });
const validationErrors = reactive({ username: '', password: '' });

const alertClass = computed(() => ({
    'alert-danger':  alertMessage.type === 'error',
    'alert-warning': alertMessage.type === 'warning',
    'alert-success': alertMessage.type === 'success',
    'alert-info':    alertMessage.type === 'info',
}));

const dismissAlert = () => { alertMessage.show = false; alertMessage.text = ''; };
const clearFieldError = (field) => { validationErrors[field] = ''; };

const showAlert = (type, message, autoDismiss = true) => {
    alertMessage.type = type;
    alertMessage.text = message;
    alertMessage.show = true;
    // if (autoDismiss) {
    //     setTimeout(() => { if (alertMessage.text === message) dismissAlert(); }, 5000);
    // }
};

const validateForm = () => {
    let isValid = true;
    validationErrors.username = '';
    validationErrors.password = '';
    if (!username.value || username.value.trim().length < 3) {
        validationErrors.username = !username.value ? 'Username is required' : 'Username must be at least 3 characters long';
        isValid = false;
    }
    if (!password.value) {
        validationErrors.password = 'Password is required';
        isValid = false;
    } else if (password.value.length < 6) {
        validationErrors.password = 'Password must be at least 6 characters long';
        isValid = false;
    }
    return isValid;
};

const handleLogin = async () => {
    if (!validateForm()) {
        showAlert('warning', 'Please correct the errors', false);
        return;
    }

    loading.value = true;
    dismissAlert();

    try {
        const result = await auth.actions.login(
            username.value,
            password.value,
            rememberMe.value
        );

        if (result.success) {
            showAlert('success', 'Login successful', true);

            setTimeout(() => {
                router.push('/home');
            }, 600);
        } else {
            showAlert('error', result.error, false);
        }

    } catch (err) {
        showAlert('error', 'Server error occurred', false);
    } finally {
        loading.value = false;
    }
};

const checkSavedLogin = () => {
    const savedUsername = localStorage.getItem('savedUsername');
    if (localStorage.getItem('rememberMe') === 'true' && savedUsername) {
        username.value = savedUsername;
        rememberMe.value = true;
    }
};



onMounted(() => {
    checkSavedLogin();
    slideTimer = setInterval(() => {
        currentSlide.value = (currentSlide.value + 1) % slides.length;
    }, 4500);
});

onBeforeUnmount(() => clearInterval(slideTimer));

</script>

<style scoped>
/* ---- Layout ---- */
.auth-wrapper {
    display: flex;
    min-height: 100vh;
    background: #fff;
}

.auth-left {
    width: 42%;
    min-width: 360px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2.5rem 2rem;
    background: #fff;
}

.auth-inner {
    width: 100%;
    max-width: 360px;
}

/* ---- Right Slideshow ---- */
.auth-right {
    flex: 1;
    position: relative;
    overflow: hidden;
    border-radius: 1.25rem;
    margin: 1rem 1rem 1rem 0;
    background: #111;
}

.slide {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 1.2s ease-in-out;
    border-radius: inherit;
}

.slide.active {
    opacity: 1;
}

.slide-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.05) 0%,
        rgba(0, 0, 0, 0.55) 100%
    );
    z-index: 1;
    border-radius: inherit;
}

.slide-caption {
    position: absolute;
    bottom: 4.5rem;
    left: 2rem;
    right: 2rem;
    z-index: 2;
    color: #fff;
    animation: fadeUp 0.5s ease;
}

@keyframes fadeUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
}

.slide-caption h4 {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 0.3rem;
    text-shadow: 0 1px 6px rgba(0,0,0,0.5);
}

.slide-caption p {
    font-size: 0.875rem;
    opacity: 0.85;
    margin: 0;
    text-shadow: 0 1px 4px rgba(0,0,0,0.4);
}

.slide-dots {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    display: flex;
    gap: 8px;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: background 0.3s, transform 0.3s;
}

.dot.active {
    background: #fff;
    transform: scale(1.35);
}

/* ---- Logo ---- */
.auth-logo {
    max-height: 52px;
    width: auto;
}

/* ---- Typography ---- */
.auth-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #111;
    margin-bottom: 0.25rem;
    letter-spacing: -0.3px;
}

.auth-subtitle {
    font-size: 0.875rem;
    color: #888;
    margin-bottom: 0;
}

/* ---- Inputs ---- */
.auth-input {
    border: 1.5px solid #e0e0e0;
    border-radius: 0.625rem;
    padding: 0.7rem 1rem;
    font-size: 0.875rem;
    background: #fafafa;
    color: #111;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.auth-input:focus {
    border-color: #111;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.06);
    background: #fff;
    outline: none;
}

.auth-input::placeholder { color: #bbb; }

/* ---- Forgot link ---- */
.forgot-link {
    font-size: 0.8rem;
    color: #555;
    text-decoration: none;
    transition: color 0.2s;
}
.forgot-link:hover { color: #111; }

/* ---- Login Button ---- */
.auth-btn {
    border-radius: 0.625rem;
    padding: 0.7rem;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.2px;
    background: #111;
    border: none;
    transition: background 0.2s, transform 0.1s;
}
.auth-btn:hover:not(:disabled) { background: #333; }
.auth-btn:active:not(:disabled) { transform: scale(0.98); }

/* ---- Footer ---- */
.auth-footer {
    font-size: 0.75rem;
    color: #aaa;
    text-align: center;
    line-height: 1.6;
    margin-top: 1rem;
}
.auth-footer a { color: #888; text-decoration: none; }
.auth-footer a:hover { color: #111; }

/* ---- Responsive ---- */
@media (max-width: 768px) {
    .auth-wrapper { flex-direction: column; }
    .auth-left { width: 100%; min-width: unset; padding: 2rem 1.25rem; }
    .auth-right { display: none; }
}
</style>
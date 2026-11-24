<template>
    <!-- ============================================================
         TOPBAR NYEMBAMBA
    ============================================================ -->
    <div class="py-1" style="background-color: #7f1d1d;">
        <div class="container d-flex justify-content-between align-items-center flex-wrap gap-2">
            
            <!-- Kushoto: Mawasiliano (Bootstrap Icons) -->
            <div class="d-flex gap-3 flex-wrap text-white" style="font-size: 12px;">
                <span class="d-none d-md-inline-flex align-items-center gap-2">
                    <i class="bi bi-telephone-fill"></i> +255 713 456 789
                </span>
                <a href="mailto:info@huvika.or.tz" class="d-inline-flex align-items-center gap-2 text-white text-decoration-none">
                    <i class="bi bi-envelope-fill"></i> info@huvika.or.tz
                </a>
            </div>

            <!-- Kulia: Lugha + Mitandao ya Kijamii (Font Awesome) -->
            <div class="d-flex align-items-center gap-3">
                
                <!-- Lugha (SW | EN) -->
                <div class="d-flex align-items-center gap-2 text-white" style="font-size: 12px;">
                    <!-- TUMIA $i18n moja kwa moja hapa -->
                    <template v-if="$i18n.locale === 'sw'">
                        <span class="text-white fw-bold" style="cursor: default;">SW</span>
                        <span class="text-white-50">|</span>
                        <a href="#" class="text-white-50 text-decoration-none" @click.prevent="changeLang('en')">EN</a>
                    </template>
                    <template v-else>
                        <a href="#" class="text-white-50 text-decoration-none" @click.prevent="changeLang('sw')">SW</a>
                        <span class="text-white-50">|</span>
                        <span class="text-white fw-bold" style="cursor: default;">EN</span>
                    </template>
                </div>

                <!-- Social Icons (Font Awesome) -->
                <div class="d-flex gap-2 border-start border-secondary ps-3">
                    <a href="#" class="text-white-50 text-decoration-none" aria-label="Facebook">
                        <i class="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="#" class="text-white-50 text-decoration-none" aria-label="Instagram">
                        <i class="fa-brands fa-instagram"></i>
                    </a>
                    <a href="#" class="text-white-50 text-decoration-none" aria-label="X (Twitter)">
                        <i class="fa-brands fa-x-twitter"></i>
                    </a>
                    <a href="#" class="text-white-50 text-decoration-none" aria-label="YouTube">
                        <i class="fa-brands fa-youtube"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- ============================================================
         NAVBAR NENE
    ============================================================ -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
        <div class="container">

            <!-- Logo -->
            <router-link to="/" class="navbar-brand d-flex align-items-center gap-2">
                <img src="@/assets/image/logo.png" alt="HUVIKA" height="65" />
            </router-link>

            <!-- Kitufe cha Menu (Mobile) -->
            <button
                class="navbar-toggler border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mainNavbar"
                aria-controls="mainNavbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Menu -->
            <div class="collapse navbar-collapse" id="mainNavbar">
                <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-1 mt-3 mt-lg-0">

                    <li class="nav-item">
                        <router-link to="/" class="nav-link px-3 fs-6" exact-active-class="bg-danger-subtle text-danger rounded fw-bold">
                            {{ $t('nav.home') }}
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/about" class="nav-link px-3 fs-6" active-class="bg-danger-subtle text-danger rounded fw-bold">
                            {{ $t('nav.about') }}
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/services" class="nav-link px-3 fs-6" active-class="bg-danger-subtle text-danger rounded fw-bold">
                            {{ $t('nav.programs') }}
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/parish" class="nav-link px-3 fs-6" active-class="bg-danger-subtle text-danger rounded fw-bold">
                            {{ $t('nav.parish') }}
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/maktaba" class="nav-link px-3 fs-6" active-class="bg-danger-subtle text-danger rounded fw-bold">
                            {{ $t('nav.library') }}
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link to="/contact" class="nav-link px-3 fs-6" active-class="bg-danger-subtle text-danger rounded fw-bold">
                            {{ $t('nav.contact') }}
                        </router-link>
                    </li>

                    <!-- Kitufe cha Ingia (Login) kwa Font Awesome lock -->
                    <li class="nav-item mt-2 mt-lg-0 ms-lg-3">
                        <router-link to="/login" class="btn btn-danger px-4 py-2 fw-bold rounded-2">
                            <i class="fa-solid fa-lock me-1"></i> {{ $t('nav.login') }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
// Hatuimport useI18n hapa ili kuepuka hiyo error ya .value

function changeLang(lang) {
    // Tunapata i18n instance moja kwa moja kutoka kwenye Vue App
    const i18n = document.querySelector('#app').__vue_app__.config.globalProperties.$i18n;
    
    if (i18n.locale !== lang) {
        i18n.locale = lang; // Hapa tunabadilisha moja kwa moja
        localStorage.setItem('lang', lang);
        localStorage.setItem('i18n_locale', lang); // Tunaweka hii kuzuia mzigo mwingine
        document.documentElement.setAttribute('lang', lang);
    }
}
</script>
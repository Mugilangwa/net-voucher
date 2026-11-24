// router.js
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/index2.vue';
import Login from '../views/authentication/login.vue';
import store from '../store';

const routes = [
    // ============================================================
    // 🌐 WEBSITE ROUTES (PUBLIC — mtu yeyote anaweza kufika)
    // ============================================================
    {
        path: '/',
        name: 'website-home',
        component: () => import(/* webpackChunkName: "website-home" */ '../views/website/index.vue'),
        meta: { layout: 'website', requiresAuth: false, title: 'Karibu' },
    },
    {
        path: '/about',
        name: 'website-about',
        component: () => import(/* webpackChunkName: "website-about" */ '../views/website/about.vue'),
        meta: { layout: 'website', requiresAuth: false, title: 'Kuhusu Sisi' },
    },
    {
        path: '/parish',
        name: 'website-parish',
        component: () => import(/* webpackChunkName: "website-parish" */ '../views/website/parish.vue'),
        meta: { layout: 'website', requiresAuth: false, title: 'Parishi' },
    },
    {
        path: '/parish/:id',
        name: 'website-parish-details',
        component: () => import(/* webpackChunkName: "website-parish-details" */ '../views/website/parish-details.vue'),
        meta: { layout: 'website', requiresAuth: false, title: 'Maelezo ya Parishi' },
    },
    {
        path: '/event/:id',
        name: 'website-event-details',
        component: () => import(/* webpackChunkName: "website-parish-details" */ '../views/website/event-details.vue'),
        meta: { layout: 'website', requiresAuth: false, title: 'Maelezo ya Event' },
    },

    
    {
        path: '/contact',
        name: 'website-contact',
        component: () => import(/* webpackChunkName: "website-contact" */ '../views/website/contact.vue'),
        meta: { layout: 'website', requiresAuth: false, title: 'Wasiliana Nasi' },
    },
    {
        path: '/services',
        name: 'website-services',
        component: () => import(/* webpackChunkName: "website-services" */ '../views/website/services.vue'),
        meta: { layout: 'website', requiresAuth: false, title: 'Huduma' },
    },
    {
        path: '/maktaba',
        name: 'website-maktaba',
        component: () => import(/* webpackChunkName: "website-maktaba" */ '../views/website/maktaba.vue'),
        meta: { layout: 'website', requiresAuth: false, title: 'Maktaba' },
    },

    // ============================================================
    // 🔐 AUTH ROUTES (PUBLIC — login/register)
    // ============================================================
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { layout: 'auth', requiresAuth: false, title: 'Ingia' },
    },
    {
        path: '/auth/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "auth-register" */ '../views/auth/register.vue'),
        meta: { layout: 'auth', requiresAuth: false, title: 'Jisajili' },
    },
    {
        path: '/auth/pass-recovery',
        name: 'pass-recovery',
        component: () => import(/* webpackChunkName: "auth-pass-recovery" */ '../views/auth/pass_recovery.vue'),
        meta: { layout: 'auth', requiresAuth: false, title: 'Rudisha Nenosiri' },
    },

    // ============================================================
    // 🛠️ ADMIN ROUTES (PROTECTED — zinahitaji login)
    // ============================================================
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: { layout: 'app', requiresAuth: true, title: 'Dashboard' },
    },
    {
        path: '/auth/user-management',
        name: 'user-management',
        component: () => import(/* webpackChunkName: "user-management" */ '../views/settings/userMananagements/UserList.vue'),
        meta: { layout: 'app', requiresAuth: true, title: 'Usimamizi wa Watumiaji' },
    },
    {
        path: '/location-master',
        name: 'location',
        component: () => import(/* webpackChunkName: "location" */ '../views/settings/LocationMaster/index.vue'),
        meta: { layout: 'app', requiresAuth: true, title: 'Location Master' },
    },
    {
        path: '/activities',
        name: 'Activites',
        component: () => import(/* webpackChunkName: "activities" */ '../views/activities/index.vue'),
        meta: { layout: 'app', requiresAuth: true, title: 'Shughuli' },
    },

    // --- Parishi management (admin) ---
    {
        path: '/parishi',
        name: 'church',
        component: () => import(/* webpackChunkName: "church-list" */ '../views/settings/church/list.vue'),
        meta: { layout: 'app', requiresAuth: true, title: 'Parishi' },
    },
    {
        path: '/parishi/add',
        name: 'church-create',
        component: () => import(/* webpackChunkName: "church-add" */ '../views/settings/church/add.vue'),
        meta: { layout: 'app', requiresAuth: true, title: 'Ongeza Parishi' },
    },
    {
        path: '/parishi/edit/:id',
        name: 'church-edit',
        component: () => import(/* webpackChunkName: "church-edit" */ '../views/settings/church/add.vue'),
        meta: { layout: 'app', requiresAuth: true, title: 'Hariri Parishi' },
    },
    {
        path: '/parishi/view/:id',
        name: 'church-view',
        component: () => import(/* webpackChunkName: "church-view" */ '../views/settings/church/preview.vue'),
        meta: { layout: 'app', requiresAuth: true, title: 'Tazama Parishi' },
    },

    // --- Settings ---
    {
        path: '/settings/dashboard',
        name: 'settings-dashboard',
        component: () => import('@/views/settings/dashboard/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/settings/positions',
        name: 'settings.positions',
        component: () => import('@/views/settings/position/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/settings/roles',
        name: 'settings.roles',
        component: () => import('@/views/settings/role/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/settings/member-roles',
        name: 'settings.member-roles',
        component: () => import('@/views/settings/memberRole/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },

    // --- Church sub-resources ---
    {
        path: '/church/:id/departments',
        name: 'church.departments',
        component: () => import('@/views/settings/church/departments/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/church/:id/leadership',
        name: 'church.leadership',
        component: () => import('@/views/settings/church/leadership/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/church/:id/members',
        name: 'church.members',
        component: () => import('@/views/settings/church/members/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/church/:id/attachments',
        name: 'church.attachments',
        component: () => import('@/views/settings/church/attachment/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/church/:id/groups',
        name: 'church.groups',
        component: () => import('@/views/settings/church/groups/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },

    // --- Admin: Clients / Index ---
    {
        path: '/clients',
        name: 'clients',
        component: () => import(/* webpackChunkName: "clients" */ '../views/clients/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/index2',
        name: 'index2',
        component: () => import(/* webpackChunkName: "index2" */ '../views/index2.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },

    // ============================================================
    // ⚠️ ERROR PAGES
    // ============================================================
    {
        path: '/not-found',
        name: 'not-found',
        component: () => import(/* webpackChunkName: "not-found" */ '../views/authentication/error404.vue'),
        meta: { layout: 'auth', requiresAuth: false },
    },
    {
        path: '/pages/error404',
        name: 'error404',
        component: () => import(/* webpackChunkName: "pages-error404" */ '../views/pages/error404.vue'),
        meta: { layout: 'auth', requiresAuth: false },
    },
    {
        path: '/pages/error500',
        name: 'error500',
        component: () => import(/* webpackChunkName: "pages-error500" */ '../views/pages/error500.vue'),
        meta: { layout: 'auth', requiresAuth: false },
    },

    // ============================================================
    // 🚨 CATCH ALL — LAZIMA IWE MWISHO
    // ============================================================
    {
        path: '/:pathMatch(.*)*',
        redirect: '/not-found',
    },
];


const router = createRouter({
    history: createWebHashHistory(), // ✅
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition;
        return { left: 0, top: 0 };
    },
});

router.beforeEach((to, from, next) => {
    const layoutType = to.meta?.layout || 'app';
    store.commit('setLayout', layoutType);

    if (to.meta?.title) {
        document.title = `${to.meta.title} | HUVIKA`;
    }

    const isAuthenticated = !!localStorage.getItem('access_token');

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'Login', query: { redirect: to.fullPath } });
        return;
    }
    if (to.name === 'Login' && isAuthenticated) {
        next({ name: 'home' });
        return;
    }
    next();
});

router.onError((error) => {
    console.error('Router error:', error);
});

export default router;
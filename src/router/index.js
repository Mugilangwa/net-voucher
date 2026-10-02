// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/index2.vue';
import Login from '../views/authentication/login.vue';
import store from '../store';

const routes = [
    // Auth routes (public)
    {
        path: '/',
        name: 'Login',
        component: Login,
        meta: { layout: 'auth', requiresAuth: false },
    },  
    {
        path: '/not-found',
        name: 'not-found',
        component: () => import(/* webpackChunkName: "not-found" */ '../views/authentication/error404.vue'),
        meta: { layout: 'auth', requiresAuth: false },
    },

    {
        path: '/auth/user-management',
        name: 'user-management',
        component: () => import(/* webpackChunkName: "not-found" */ '../views/settings/userMananagements/UserList.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/location-master',
        name: 'location',
        component: () => import(/* webpackChunkName: "not-found" */ '../views/settings/LocationMaster/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/activities',
        name: 'Activites',
        component: () => import(/* webpackChunkName: "not-found" */ '../views/activities/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/parishi',
        name: 'church',
        component: () => import(/* webpackChunkName: "not-found" */ '../views/settings/church/list.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/parishi/add',
        name: 'church-create',
        component: () => import(/* webpackChunkName: "not-found" */ '../views/settings/church/add.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/parishi/edit/:id',
        name: 'church-edit',
        component: () => import(/* webpackChunkName: "not-found" */ '../views/settings/church/add.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/parishi/view/:id',
        name: 'church-view',
        component: () => import(/* webpackChunkName: "not-found" */ '../views/settings/church/preview.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    // Settings Routes

     {
        path: '/settings/dashboard',
        name: 'settings-dashboard',
        component: () => import('@/views/settings/dashboard/index.vue'),
        meta: { layout: 'app', requiresAuth: true }
    },
    {
        path: '/settings/positions',
        name: 'settings.positions',
        component: () => import('@/views/settings/position/index.vue'),
        meta: { layout: 'app', requiresAuth: true }
    },
    {
        path: '/settings/roles',
        name: 'settings.roles',
        component: () => import('@/views/settings/role/index.vue'),
        meta: { layout: 'app', requiresAuth: true }
    },
    {
        path: '/settings/member-roles',
        name: 'settings.member-roles',
        component: () => import('@/views/settings/memberRole/index.vue'),
        meta: { layout: 'app', requiresAuth: true }
    },
    {
        path: '/church/:id/departments',
        name: 'church.departments',
        component: () => import('@/views/settings/church/departments/index.vue'),
        meta: { layout: 'app', requiresAuth: true }
    },
    {
        path: '/church/:id/leadership',
        name: 'church.leadership',
        component: () => import('@/views/settings/church/leadership/index.vue'),
        meta: { layout: 'app', requiresAuth: true }
    },
    {
        path: '/church/:id/members',
        name: 'church.members',
        component: () => import('@/views/settings/church/members/index.vue'),
        meta: { layout: 'app', requiresAuth: true }
    },
     {
        path: '/church/:id/attachments',
        name: 'church.attachments',
        component: () => import('@/views/settings/church/attachment/index.vue'),
        meta: { layout: 'app', requiresAuth: true }
    },
    {
        path: '/church/:id/groups',
        name: 'church.groups',
        component: () => import('@/views/settings/church/groups/index.vue'),
        meta: { layout: 'app', requiresAuth: true }
    },
    // Protected routes (require authentication)
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: { layout: 'app', requiresAuth: true },
    },
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

    // Components (protected)
    {
        path: '/components/tabs',
        name: 'tabs',
        component: () => import(/* webpackChunkName: "components-tabs" */ '../views/components/tabs.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/components/accordions',
        name: 'accordions',
        component: () => import(/* webpackChunkName: "components-accordions" */ '../views/components/accordions.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/components/modals',
        name: 'modals',
        component: () => import(/* webpackChunkName: "components-modals" */ '../views/components/modals.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/components/cards',
        name: 'cards',
        component: () => import(/* webpackChunkName: "components-cards" */ '../views/components/cards.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/components/carousel',
        name: 'carousel',
        component: () => import(/* webpackChunkName: "components-carousel" */ '../views/components/carousel.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/components/timeline',
        name: 'timeline',
        component: () => import(/* webpackChunkName: "components-timeline" */ '../views/components/timeline.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/components/media-object',
        name: 'media-object',
        component: () => import(/* webpackChunkName: "components-media-object" */ '../views/components/media_object.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/components/list-group',
        name: 'list-group',
        component: () => import(/* webpackChunkName: "components-list-group" */ '../views/components/list_group.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/components/pricing-table',
        name: 'pricing-table',
        component: () => import(/* webpackChunkName: "components-pricing-table" */ '../views/components/pricing_table.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/components/notifications',
        name: 'notifications',
        component: () => import(/* webpackChunkName: "components-notifications" */ '../views/components/toast.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/components/lightbox',
        name: 'lightbox',
        component: () => import(/* webpackChunkName: "components-lightbox" */ '../views/components/lightbox.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/components/countdown',
        name: 'countdown',
        component: () => import(/* webpackChunkName: "components-countdown" */ '../views/components/countdown.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/components/counter',
        name: 'counter',
        component: () => import(/* webpackChunkName: "components-counter" */ '../views/components/counter.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/components/sweetalert',
        name: 'sweetalert',
        component: () => import(/* webpackChunkName: "components-sweetalert" */ '../views/components/sweetalert.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },

    // Fonts (protected)
    {
        path: '/font-icons',
        name: 'font-icons',
        component: () => import(/* webpackChunkName: "font-icons" */ '../views/font_icons.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },

    // Pages (mix of public and protected)
    {
        path: '/pages/helpdesk',
        name: 'helpdesk',
        component: () => import(/* webpackChunkName: "pages-helpdesk" */ '../views/pages/helpdesk.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/pages/contact-us',
        name: 'contact-us',
        component: () => import(/* webpackChunkName: "pages-contact-us" */ '../views/pages/contact_us.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/pages/faq',
        name: 'faq',
        component: () => import(/* webpackChunkName: "pages-faq" */ '../views/pages/faq.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/pages/faq2',
        name: 'faq2',
        component: () => import(/* webpackChunkName: "pages-faq2" */ '../views/pages/faq2.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/pages/privacy-policy',
        name: 'privacy-policy',
        component: () => import(/* webpackChunkName: "pages-privacy-policy" */ '../views/pages/privacy_policy.vue'),
        meta: { layout: 'app', requiresAuth: false }, // Public page
    },
    {
        path: '/pages/coming-soon',
        name: 'coming-soon',
        component: () => import(/* webpackChunkName: "pages-coming-soon" */ '../views/pages/coming_soon.vue'),
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
    {
        path: '/pages/error503',
        name: 'error503',
        component: () => import(/* webpackChunkName: "pages-error503" */ '../views/pages/error503.vue'),
        meta: { layout: 'auth', requiresAuth: false },
    },
    {
        path: '/pages/maintenence',
        name: 'maintenence',
        component: () => import(/* webpackChunkName: "pages-maintenence" */ '../views/pages/maintenence.vue'),
        meta: { layout: 'auth', requiresAuth: false },
    },
    {
        path: '/pages/blank-page',
        name: 'blank-page',
        component: () => import(/* webpackChunkName: "pages-blank-page" */ '../views/pages/blank_page.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/pages/sample',
        name: 'sample',
        component: () => import(/* webpackChunkName: "pages-sample" */ '../views/pages/sample.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },

    // Auth routes (public)
    {
        path: '/auth/login-boxed',
        name: 'login-boxed',
        component: () => import(/* webpackChunkName: "auth-login-boxed" */ '../views/auth/login_boxed.vue'),
        meta: { layout: 'auth', requiresAuth: false },
    },
    {
        path: '/auth/register-boxed',
        name: 'register-boxed',
        component: () => import(/* webpackChunkName: "auth-register-boxed" */ '../views/auth/register_boxed.vue'),
        meta: { layout: 'auth', requiresAuth: false },
    },
    {
        path: '/auth/lockscreen-boxed',
        name: 'lockscreen-boxed',
        component: () => import(/* webpackChunkName: "auth-lockscreen-boxed" */ '../views/auth/lockscreen_boxed.vue'),
        meta: { layout: 'auth', requiresAuth: false },
    },
    {
        path: '/auth/pass-recovery-boxed',
        name: 'pass-recovery-boxed',
        component: () => import(/* webpackChunkName: "auth-pass-recovery-boxed" */ '../views/auth/pass_recovery_boxed.vue'),
        meta: { layout: 'auth', requiresAuth: false },
    },
    {
        path: '/auth/login',
        name: 'auth-login',
        component: () => import(/* webpackChunkName: "auth-login" */ '../views/auth/login.vue'),
        meta: { layout: 'auth', requiresAuth: false },
    },
    {
        path: '/auth/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "auth-register" */ '../views/auth/register.vue'),
        meta: { layout: 'auth', requiresAuth: false },
    },
    {
        path: '/auth/lockscreen',
        name: 'lockscreen',
        component: () => import(/* webpackChunkName: "auth-lockscreen" */ '../views/auth/lockscreen.vue'),
        meta: { layout: 'auth', requiresAuth: false },
    },
    {
        path: '/auth/pass-recovery',
        name: 'pass-recovery',
        component: () => import(/* webpackChunkName: "auth-pass-recovery" */ '../views/auth/pass_recovery.vue'),
        meta: { layout: 'auth', requiresAuth: false },
    },

    // Elements (protected)
    {
        path: '/elements/alerts',
        name: 'alerts',
        component: () => import(/* webpackChunkName: "elements-alerts" */ '../views/elements/alerts.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/elements/avatar',
        name: 'avatar',
        component: () => import(/* webpackChunkName: "elements-avatar" */ '../views/elements/avatar.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/elements/badges',
        name: 'badges',
        component: () => import(/* webpackChunkName: "elements-badges" */ '../views/elements/badges.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/elements/breadcrumbs',
        name: 'breadcrumbs',
        component: () => import(/* webpackChunkName: "elements-breadcrumbs" */ '../views/elements/breadcrumbs.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/elements/buttons',
        name: 'buttons',
        component: () => import(/* webpackChunkName: "elements-buttons" */ '../views/elements/buttons.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/elements/buttons-group',
        name: 'buttons-group',
        component: () => import(/* webpackChunkName: "elements-buttons-group" */ '../views/elements/buttons_group.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/elements/color-library',
        name: 'color-library',
        component: () => import(/* webpackChunkName: "elements-color-library" */ '../views/elements/color_library.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/elements/dropdown',
        name: 'dropdown',
        component: () => import(/* webpackChunkName: "elements-dropdown" */ '../views/elements/dropdown.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/elements/infobox',
        name: 'infobox',
        component: () => import(/* webpackChunkName: "elements-infobox" */ '../views/elements/infobox.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/elements/jumbotron',
        name: 'jumbotron',
        component: () => import(/* webpackChunkName: "elements-jumbotron" */ '../views/elements/jumbotron.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/elements/loader',
        name: 'loader',
        component: () => import(/* webpackChunkName: "elements-loader" */ '../views/elements/loader.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/elements/pagination',
        name: 'pagination',
        component: () => import(/* webpackChunkName: "elements-pagination" */ '../views/elements/pagination.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/elements/popovers',
        name: 'popovers',
        component: () => import(/* webpackChunkName: "elements-popovers" */ '../views/elements/popovers.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/elements/progress-bar',
        name: 'progress-bar',
        component: () => import(/* webpackChunkName: "elements-progress-bar" */ '../views/elements/progress_bar.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/elements/search',
        name: 'search',
        component: () => import(/* webpackChunkName: "elements-search" */ '../views/elements/search.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/elements/tooltips',
        name: 'tooltips',
        component: () => import(/* webpackChunkName: "elements-tooltips" */ '../views/elements/tooltips.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/elements/treeview',
        name: 'treeview',
        component: () => import(/* webpackChunkName: "elements-treeview" */ '../views/elements/treeview.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/elements/typography',
        name: 'typography',
        component: () => import(/* webpackChunkName: "elements-typography" */ '../views/elements/typography.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },

    // Tables (protected)
    {
        path: '/tables',
        name: 'tables',
        component: () => import(/* webpackChunkName: "tables" */ '../views/tables.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/tables/basic',
        name: 'table-basic',
        component: () => import(/* webpackChunkName: "tables-basic" */ '../views/tables/basic.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/tables/striped',
        name: 'striped',
        component: () => import(/* webpackChunkName: "tables-striped" */ '../views/tables/striped.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/tables/order-sorting',
        name: 'order-sorting',
        component: () => import(/* webpackChunkName: "tables-order-sorting" */ '../views/tables/order_sorting.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/tables/multi-column',
        name: 'multi-column',
        component: () => import(/* webpackChunkName: "tables-multi-column" */ '../views/tables/multi_column.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/tables/multiple-tables',
        name: 'multiple-tables',
        component: () => import(/* webpackChunkName: "tables-multiple-tables" */ '../views/tables/multiple_tables.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/tables/alt-pagination',
        name: 'alt-pagination',
        component: () => import(/* webpackChunkName: "tables-alt-pagination" */ '../views/tables/alt_pagination.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/tables/custom',
        name: 'custom',
        component: () => import(/* webpackChunkName: "tables-custom" */ '../views/tables/custom.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/tables/range-search',
        name: 'range-search',
        component: () => import(/* webpackChunkName: "tables-range-search" */ '../views/tables/range_search.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/tables/export',
        name: 'export',
        component: () => import(/* webpackChunkName: "tables-export" */ '../views/tables/export.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/tables/live-dom-ordering',
        name: 'live-dom-ordering',
        component: () => import(/* webpackChunkName: "tables-live-dom-ordering" */ '../views/tables/live_dom_ordering.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/tables/miscellaneous',
        name: 'miscellaneous',
        component: () => import(/* webpackChunkName: "tables-miscellaneous" */ '../views/tables/miscellaneous.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },

    // Users (protected)
    {
        path: '/users/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "users-profile" */ '../views/users/profile.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/users/account-setting',
        name: 'account-setting',
        component: () => import(/* webpackChunkName: "users-account-setting" */ '../views/users/account_setting.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },

    // Drag & Drop (protected)
    {
        path: '/dragndrop',
        name: 'dragndrop',
        component: () => import(/* webpackChunkName: "dragndrop" */ '../views/dragndrop.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },

    // Charts (protected)
    {
        path: '/charts/apex-chart',
        name: 'apex-chart',
        component: () => import(/* webpackChunkName: "charts-apex-chart" */ '../views/charts/apex_chart.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },

    // Widgets (protected)
    {
        path: '/widgets',
        name: 'widgets',
        component: () => import(/* webpackChunkName: "widgets" */ '../views/widgets.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },

    // Forms (protected)
    {
        path: '/forms/basic',
        name: 'basic',
        component: () => import(/* webpackChunkName: "forms-basic" */ '../views/forms/basic.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/forms/input-group',
        name: 'input-group',
        component: () => import(/* webpackChunkName: "forms-input-group" */ '../views/forms/input_group.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/forms/layouts',
        name: 'layouts',
        component: () => import(/* webpackChunkName: "forms-layouts" */ '../views/forms/layouts.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/forms/validation',
        name: 'validation',
        component: () => import(/* webpackChunkName: "forms-validation" */ '../views/forms/validation.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/forms/checkbox-radio',
        name: 'checkbox-radio',
        component: () => import(/* webpackChunkName: "forms-checkbox-radio" */ '../views/forms/checkbox_radio.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/forms/switches',
        name: 'switches',
        component: () => import(/* webpackChunkName: "forms-switches" */ '../views/forms/switches.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/forms/wizards',
        name: 'wizards',
        component: () => import(/* webpackChunkName: "forms-wizards" */ '../views/forms/wizards.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/forms/file-upload',
        name: 'file-upload',
        component: () => import(/* webpackChunkName: "forms-file-upload" */ '../views/forms/fileupload.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/forms/clipboard',
        name: 'clipboard',
        component: () => import(/* webpackChunkName: "forms-clipboard" */ '../views/forms/clipboard.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/forms/date-picker',
        name: 'date-picker',
        component: () => import(/* webpackChunkName: "forms-date-picker" */ '../views/forms/date_range_picker.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/forms/input-mask',
        name: 'input-mask',
        component: () => import(/* webpackChunkName: "forms-input-mask" */ '../views/forms/input_mask.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/forms/quill-editor',
        name: 'quill-editor',
        component: () => import(/* webpackChunkName: "forms-quill-editor" */ '../views/forms/quill_editor.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/forms/touchspin',
        name: 'touchspin',
        component: () => import(/* webpackChunkName: "forms-touchspin" */ '../views/forms/touchspin.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/forms/markdown-editor',
        name: 'markdown-editor',
        component: () => import(/* webpackChunkName: "forms-markdown-editor" */ '../views/forms/markdown_editor.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/forms/select2',
        name: 'select2',
        component: () => import(/* webpackChunkName: "forms-select2" */ '../views/forms/select2.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },

    // Apps (protected)
    {
        path: '/apps/chat',
        name: 'chat',
        component: () => import(/* webpackChunkName: "apps-chat" */ '../views/apps/chat.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/apps/mailbox',
        name: 'mailbox',
        component: () => import(/* webpackChunkName: "apps-mailbox" */ '../views/apps/mailbox.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/apps/todo-list',
        name: 'todo-list',
        component: () => import(/* webpackChunkName: "apps-todo-list" */ '../views/apps/todo_list.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/apps/contacts',
        name: 'contacts',
        component: () => import(/* webpackChunkName: "apps-contacts" */ '../views/apps/contacts.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/apps/notes',
        name: 'notes',
        component: () => import(/* webpackChunkName: "apps-notes" */ '../views/apps/notes.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/apps/scrumboard',
        name: 'scrumboard',
        component: () => import(/* webpackChunkName: "apps-scrumboard" */ '../views/apps/scrumboard.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/apps/calendar',
        name: 'calendar',
        component: () => import(/* webpackChunkName: "apps-calendar" */ '../views/apps/calendar.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/apps/invoice/list',
        name: 'invoice-list',
        component: () => import(/* webpackChunkName: "apps-invoice-list" */ '../views/apps/invoice/list.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/apps/invoice/preview',
        name: 'invoice-preview',
        component: () => import(/* webpackChunkName: "apps-invoice-preview" */ '../views/apps/invoice/preview.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/apps/invoice/add',
        name: 'invoice-add',
        component: () => import(/* webpackChunkName: "apps-invoice-add" */ '../views/apps/invoice/add.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/apps/invoice/edit',
        name: 'invoice-edit',
        component: () => import(/* webpackChunkName: "apps-invoice-edit" */ '../views/apps/invoice/edit.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },

    // Catch all - redirect to 404
    {
        path: '/:pathMatch(.*)*',
        redirect: '/not-found',
    },
];

const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { left: 0, top: 0 };
        }
    },
});

// =======================
// NAVIGATION GUARD
// =======================
router.beforeEach((to, from, next) => {
    // Set layout
    if (to.meta && to.meta.layout && to.meta.layout === 'auth') {
        store.commit('setLayout', 'auth');
    } else {
        store.commit('setLayout', 'app');
    }

    // Check authentication
    const isAuthenticated = localStorage.getItem('access_token') !== null;

    // If route requires auth and user is not authenticated
    if (to.meta.requiresAuth && !isAuthenticated) {
        // Redirect to login page
        next({
            name: 'login',
            query: { redirect: to.fullPath } // Save the intended destination
        });
        return;
    }

    // If user is authenticated and trying to access login page
    if ((to.name === 'login' || to.name === 'Login' || to.path === '/') && isAuthenticated) {
        next({ name: 'home' });
        return;
    }

    // If route is not found
    if (to.name === 'not-found') {
        next();
        return;
    }

    next();
});

// Optional: Handle errors
router.onError((error) => {
    console.error('Router error:', error);
});

export default router;
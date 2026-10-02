import { reactive, readonly } from 'vue';
import { axiosInstance } from '@/services/axios';

// =======================
// STATE
// =======================
const state = reactive({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
});

// =======================
// GETTERS
// =======================
const getters = {
    isLoggedIn: () => state.isAuthenticated,
    currentUser: () => state.user,
    userEmail: () => state.user?.email || null,
    userName: () => state.user?.username || null,
    userId: () => state.user?.id || null,
    getAccessToken: () => state.accessToken,
    getRefreshToken: () => state.refreshToken,
};

// =======================
// INTERNAL HELPERS
// =======================
const setUser = (user) => {
    state.user = user;
    state.isAuthenticated = !!user;

    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        localStorage.removeItem('user');
    }
};

const setAccessToken = (token) => {
    state.accessToken = token;

    if (token) {
        localStorage.setItem('access_token', token);
    } else {
        localStorage.removeItem('access_token');
    }
};

const setRefreshToken = (token) => {
    state.refreshToken = token;

    if (token) {
        localStorage.setItem('refresh_token', token);
    } else {
        localStorage.removeItem('refresh_token');
    }
};

const clearAllAuthData = () => {
    state.user = null;
    state.accessToken = null;
    state.refreshToken = null;
    state.isAuthenticated = false;

    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

// =======================
// INIT AUTH
// =======================
const initAuth = () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const user = localStorage.getItem('user');

    if (accessToken && user) {
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.user = JSON.parse(user);
        state.isAuthenticated = true;
    }
};

// =======================
// ACTIONS
// =======================
const actions = {

    // 🔐 LOGIN
   async login(username, password, rememberMe = false) {
    try {
        const response = await axiosInstance.post('/auth/login/', {
            username,
            password
        });

        const data = response.data;

        setAccessToken(data.access);
        setRefreshToken(data.refresh);
        setUser(data.user);

        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('savedUsername', username);
        } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('savedUsername');
        }

        return {
            success: true,
            user: data.user
        };

    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.error || 'Login failed'
        };
    }
},
    // 
    async logout() {
        try {
            const refresh = localStorage.getItem('refresh_token');

            if (refresh) {
                await axiosInstance.post('/auth/logout/', {
                    refresh
                });
            }

            clearAllAuthData();

            return { success: true };

        } catch (error) {
            clearAllAuthData();

            return {
                success: false,
                error: error.response?.data?.error || 'Logout failed'
            };
        }
    },

    // 🔄 REFRESH TOKEN (manual use if needed)
    async refreshToken() {
        try {
            const refresh = localStorage.getItem('refresh_token');

            const response = await axiosInstance.post('/auth/refresh/', {
                refresh
            });

            const newAccess = response.data.access;

            setAccessToken(newAccess);

            return newAccess;

        } catch (error) {
            clearAllAuthData();
            return null;
        }
    },

    // 👤 UPDATE USER
    updateUser(userData) {
        const updatedUser = { ...state.user, ...userData };
        setUser(updatedUser);
    },

    // 🚀 INIT
    initAuth() {
        initAuth();
    }
};

// auto init
actions.initAuth();

// export
export default {
    state: readonly(state),
    getters,
    actions,
};
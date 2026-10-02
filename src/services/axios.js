import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL || 'http://127.0.0.1:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// =======================
// 🔐 REQUEST INTERCEPTOR
// =======================
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// =======================
// 🔄 RESPONSE INTERCEPTOR
// =======================
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // handle expired token
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/auth/refresh')
        ) {
            originalRequest._retry = true;

            const refresh = localStorage.getItem('refresh_token');

            if (!refresh) {
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                const res = await axiosInstance.post('/auth/refresh/', {
                    refresh
                });

                const newAccess = res.data.access;

                localStorage.setItem('access_token', newAccess);

                originalRequest.headers = {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${newAccess}`
                };

                return axiosInstance(originalRequest);

            } catch (err) {
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);
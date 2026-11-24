// src/utils/media.js
// Inabadilisha "/media/churches/a.jpeg" kuwa "http://127.0.0.1:8000/media/churches/a.jpeg"
// kwa kutumia domain ile ile ya backend uliyoiweka kwenye axiosInstance.baseURL.
import { axiosInstance } from '@/services/axios';

export function mediaUrl(path) {
    if (!path) return '';
    // Tayari ni URL kamili (au data URI) -> iache kama ilivyo
    if (/^(https?:)?\/\//i.test(path) || path.startsWith('data:')) return path;

    let origin = '';
    try {
        origin = new URL(axiosInstance.defaults.baseURL || '', window.location.origin).origin;
    } catch {
        origin = window.location.origin;
    }
    return origin + (path.startsWith('/') ? path : `/${path}`);
}
import axios from 'axios';
import router from '../router'; // Pastikan lokasi import router ini tepat mengikut struktur fail anda

// Cipta satu "instance" utama untuk semua panggilan API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// ==========================================
// INTERCEPTOR REQUEST (HANTAR TOKEN)
// ==========================================
// Automatik selitkan Token JWT ke dalam setiap panggilan API (jika ada)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, 
  (error) => Promise.reject(error)
);

// ==========================================
// INTERCEPTOR RESPONSE (SEMAK TOKEN EXPIRED)
// ==========================================
// Tangkap maklum balas dari pelayan, jika 401 (Sesi Tamat/Token Rosak), auto-logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // 1. Bersihkan sisa data sesi di LocalStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');

      // 2. Paparkan amaran kepada pengguna
      alert("Sesi keselamatan anda telah tamat tempoh. Sila log masuk semula.");

      // 3. Tendang kembali ke halaman log masuk
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default api;
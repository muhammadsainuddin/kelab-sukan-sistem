import { createApp } from 'vue'
import './style.css' // Memastikan fail CSS Tailwind diimport
import App from './App.vue'
import router from './router' // Mengimport konfigurasi router dari src/router/index.js

const app = createApp(App)

// Menggunakan plugin router dalam aplikasi Vue
app.use(router)

app.mount('#app')
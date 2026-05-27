<template>
  <div class="min-h-screen flex font-sans overflow-hidden">
    
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isRedirecting" class="fixed inset-0 z-[10000] bg-gradient-to-br from-[#0F4C3A] via-[#0A192F] to-[#162C4E] flex flex-col items-center justify-center text-white px-6">
          <div class="absolute w-80 h-80 bg-emerald-500/10 blur-[100px] rounded-full top-1/4"></div>
          
          <div class="relative z-10 flex flex-col items-center text-center space-y-6 max-w-sm">
            <div class="w-20 h-20 bg-white/10 backdrop-blur-md p-3.5 rounded-[24px] border border-white/20 shadow-2xl animate-pulse">
              <img src="/logo.png" alt="Logo" class="w-full h-full object-contain" />
            </div>
            
            <div class="space-y-2">
              <h2 class="text-xl font-black uppercase tracking-tight">Mengesahkan Kredensial</h2>
              <p class="text-xs text-emerald-300 font-bold uppercase tracking-widest">Sila tunggu sebentar...</p>
            </div>

            <div class="w-full bg-white/10 h-1.5 rounded-full overflow-hidden border border-white/5 relative">
              <div class="bg-gradient-to-r from-emerald-400 to-teal-400 h-full rounded-full transition-all duration-[5000ms] ease-out w-0" :style="{ width: progressWidth }"></div>
            </div>

            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              Menghalakan anda ke papan pemuka dalam {{ countdown }} saat
            </p>
          </div>
        </div>
      </Transition>
    </Teleport>

    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0A192F]">
      <div class="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/60 to-transparent z-10"></div>
      
      <transition-group name="fade-slide" tag="div" class="relative w-full h-full">
        <div v-for="(slide, index) in slides" :key="index" v-show="currentSlide === index" class="absolute inset-0">
          <img :src="slide.image" class="w-full h-full object-cover opacity-80 mix-blend-overlay" />
          
          <div class="absolute bottom-20 left-16 right-16 z-20">
            <span class="px-3 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-4 inline-block shadow-lg shadow-emerald-500/30">
              {{ slide.tag }}
            </span>
            <h2 class="text-3xl font-black text-white leading-tight mb-2 tracking-tight">{{ slide.title }}</h2>
            <p class="text-sm text-gray-300 font-medium">{{ slide.desc }}</p>
          </div>
        </div>
      </transition-group>

      <div class="absolute bottom-8 left-16 z-20 flex gap-2">
        <button v-for="(slide, index) in slides" :key="index" @click="currentSlide = index"
          class="h-1.5 rounded-full transition-all" :class="currentSlide === index ? 'w-8 bg-emerald-500' : 'w-2 bg-white/30'"></button>
      </div>
    </div>

    <div class="w-full lg:w-1/2 min-h-screen flex flex-col justify-center items-center relative bg-gradient-to-br from-[#0F4C3A] via-[#0A192F] to-[#162C4E] lg:bg-none lg:bg-white px-5 sm:px-10">
      
      <div class="absolute inset-0 overflow-hidden pointer-events-none lg:hidden">
         <div class="absolute top-[-10%] right-[-10%] w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full"></div>
         <div class="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full"></div>
      </div>

      <div class="w-full max-w-md bg-white rounded-[32px] p-8 sm:p-10 shadow-2xl lg:shadow-none lg:bg-transparent lg:p-0 relative z-10 animate-fade-in border border-white/20 lg:border-none">
        
        <div class="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
          <div class="w-14 h-14 bg-gray-50 rounded-[18px] border border-gray-200 flex items-center justify-center shadow-sm shrink-0">
            <img src="/logo.png" alt="Logo" class="w-10 h-10 object-contain drop-shadow-sm" />
          </div>
          <div class="flex-1">
            <h1 class="text-xl sm:text-2xl font-black text-[#0A192F] tracking-tight uppercase leading-none">Kelab Perhilitan</h1>
            <p class="text-[9px] sm:text-[10px] font-black text-emerald-600 tracking-widest uppercase mt-1">Sukan & Kebajikan</p>
          </div>
        </div>
        
        <h2 class="text-2xl font-black text-gray-900 tracking-tight mb-1">Akses Portal</h2>
        <p class="text-xs text-gray-500 font-bold mb-6">Log masuk menggunakan e-mel rasmi anda.</p>

        <div v-if="errorMessage" class="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl flex items-start gap-3 animate-pop-in">
          <svg class="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <span class="text-[11px] font-bold leading-relaxed">{{ errorMessage }}</span>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">E-Mel Berdaftar</label>
            <input v-model="form.email" type="email" required placeholder="nama@wildlife.gov.my" 
                   class="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none" />
          </div>

          <div>
            <div class="flex justify-between items-center mb-1.5">
              <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest">Kata Laluan</label>
              <router-link to="/forgot-password" class="text-[10px] font-black text-emerald-600 hover:text-emerald-700 uppercase tracking-widest transition-colors">Lupa Akses?</router-link>
            </div>
            <input v-model="form.password" type="password" required placeholder="••••••••" 
                   class="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none" />
          </div>

          <button type="submit" :disabled="isLoading" 
                  class="w-full py-4 bg-[#0A192F] hover:bg-[#162C4E] text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg disabled:opacity-50 mt-2 flex justify-center items-center gap-2">
            <svg v-if="isLoading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {{ isLoading ? 'Mengesahkan Akses...' : 'Log Masuk Sistem' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-[11px] font-bold text-gray-500">
            Kakitangan baharu? 
            <router-link to="/register" class="font-black text-emerald-600 hover:text-emerald-700 hover:underline uppercase tracking-widest ml-1">Daftar Sini</router-link>
          </p>
        </div>

        <div class="mt-8 pt-6 border-t border-gray-100 text-center lg:text-left flex flex-col gap-1.5">
           <p class="text-[9px] text-gray-400 font-bold tracking-widest uppercase">&copy; {{ currentYear }} Hak Cipta Terpelihara.</p>
           <p class="text-[8px] text-gray-400 font-black tracking-[0.2em] uppercase flex items-center justify-center lg:justify-start gap-1.5 flex-wrap">
              Dibangunkan oleh <span class="text-emerald-600">MsDev</span>
              <span class="text-gray-300">|</span> 
              Powered By <span class="text-blue-500">Ai Geo</span>
           </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const form = ref({ email: '', password: '' });
const isLoading = ref(false);
const errorMessage = ref('');
const currentYear = new Date().getFullYear();

// States Pengurusan Transisi Masuk
const isRedirecting = ref(false);
const countdown = ref(5);
const progressWidth = ref('0%');
let pendingRedirectPath = '';

const currentSlide = ref(0);
const slides = [
  { image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000', tag: 'Pengumuman', title: 'Pemuliharaan Alam', desc: 'Bersama Kelab PERHILITAN melindungi warisan biodiversiti negara.' },
  { image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1000', tag: 'Aktiviti', title: 'Sukan & Acara Tahunan', desc: 'Pelbagai acara sukan dan kebajikan menanti anda sepanjang tahun ini.' },
  { image: 'https://images.unsplash.com/photo-1505051508008-923feaf9013b?q=80&w=1000', tag: 'Kebajikan', title: 'Faedah Keahlian', desc: 'Nikmati kemudahan, bantuan khas dan saguhati eksklusif ahli berdaftar.' }
];

onMounted(() => {
  setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length;
  }, 5000); 
});

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    const response = await api.post('/auth/login', form.value);
    
    // Simpan token & user data dalam storage
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('role', response.data.user.role);
    
    const role = response.data.user.role;

    // LOGIK PENGESANAN PERANTI (MOBILE DETECTION)
    // Menyemak lebar skrin semasa (skrin telefon pintar biasanya <= 768px)
    // Serta menyemak corak User Agent peranti mudah alih
    const isMobile = window.innerWidth <= 768 || 
                     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Tentukan laluan destinasi berdasarkan peranan & jenis peranti
    if (role === 'Admin' || role === 'Super Admin') {
      if (isMobile) {
        // Jika Admin buka guna phone, paksa masuk ke view Ahli biasa
        pendingRedirectPath = '/ahli/home';
      } else {
        // Hanya laptop, pc atau tablet sahaja boleh masuk dashboard admin
        pendingRedirectPath = '/admin';
      }
    } else if (role === 'Pengerusi') {
      pendingRedirectPath = isMobile ? '/ahli/home' : '/pengerusi';
    } else {
      pendingRedirectPath = '/ahli/home';
    }

    // TRIGGER ANIMASI PERALIHAN PROGRESYIF (5 SAAT)
    isLoading.value = false;
    isRedirecting.value = true;
    
    // Cetus bar progress berjalan
    setTimeout(() => { progressWidth.value = '100%'; }, 50);

    // Kira detik 5 saat
    const interval = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(interval);
        router.push(pendingRedirectPath); // Bawa masuk ke destinasi yang ditetapkan
      }
    }, 1000);
    
  } catch (error) {
    isLoading.value = false;
    const rawError = error.response?.data?.message || 'Sistem sibuk. Gagal menyambung ke pelayan.';
    
    if (rawError.includes('tamat tempoh') || rawError.includes('expired')) {
       errorMessage.value = 'E-mel atau kata laluan tidak sepadan. Sila semak semula.';
    } else {
       errorMessage.value = rawError;
    }
  }
};
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.animate-pop-in { animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

.fade-slide-enter-active, .fade-slide-leave-active { transition: all 1.2s ease; }
.fade-slide-enter-from { opacity: 0; transform: scale(1.05); }
.fade-slide-leave-to { opacity: 0; }

/* Animasi untuk skrin penuh loader transition */
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
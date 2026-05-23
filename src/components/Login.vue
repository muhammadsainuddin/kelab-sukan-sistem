<template>
  <div class="min-h-screen w-full flex bg-gray-900 font-sans overflow-hidden">
    
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
      
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div class="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 bg-green-600 opacity-10 blur-[100px]"></div>
        <div class="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 bg-orange-500 opacity-10 blur-[100px]"></div>
      </div>

      <div class="w-full max-w-md relative z-20">
        <div class="mb-10">
          <h1 class="text-4xl sm:text-5xl font-black text-white uppercase italic tracking-tighter">
            KELAB<span class="text-green-500">SUKAN</span>
          </h1>
          <div class="flex items-center mt-2 space-x-3">
            <div class="h-1 w-12 bg-orange-500 rounded-full"></div>
            <h2 class="text-lg font-bold text-gray-400 tracking-widest uppercase">Perhilitan</h2>
          </div>
        </div>

        <form class="space-y-6" @submit.prevent="handleLogin">
          
          <div class="space-y-2">
            <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest">Akses ID (E-mel)</label>
            <input 
              v-model="form.email" 
              type="email" 
              required 
              class="w-full px-4 py-3.5 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="nama@perhilitan.gov.my"
            >
          </div>

          <div class="space-y-2">
            <div class="flex justify-between items-end">
              <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest">Kata Laluan</label>
              <router-link to="/forgot-password" class="text-xs font-bold text-orange-500 hover:text-orange-400 transition-colors">
                Lupa?
              </router-link>
            </div>
            <input 
              v-model="form.password" 
              type="password" 
              required 
              class="w-full px-4 py-3.5 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            >
          </div>

          <div v-if="errorMessage" class="p-3 text-sm text-center text-red-200 bg-red-900/40 border border-red-800/50 rounded-xl">
            {{ errorMessage }}
          </div>

          <div class="pt-4">
            <button 
              type="submit" 
              :disabled="isLoading" 
              class="w-full py-4 bg-green-600 hover:bg-orange-500 text-white font-black text-sm uppercase tracking-[0.2em] rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(249,115,22,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {{ isLoading ? 'MENGESAHKAN...' : 'LOG MASUK KELAB' }}
            </button>
          </div>
        </form>

        <div class="mt-8 text-center">
          <p class="text-sm text-gray-500">
            Penjawat baharu? 
            <router-link to="/register" class="font-bold text-white hover:text-green-400 transition-colors border-b border-green-500 pb-1">Daftar Sini</router-link>
          </p>
        </div>
      </div>
    </div>

    <div class="hidden lg:block lg:w-1/2 relative bg-black overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-10"></div>
      
      <transition-group name="fade" tag="div" class="w-full h-full">
        <div 
          v-for="(slide, index) in slides" 
          :key="slide.id"
          v-show="currentSlide === index"
          class="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-10000 hover:scale-105"
          :style="{ backgroundImage: `url(${slide.image})` }"
        ></div>
      </transition-group>

      <div class="absolute bottom-0 left-0 p-16 z-20 w-full">
        <transition name="slide-up" mode="out-in">
          <div :key="currentSlide">
            <span class="inline-block py-1 px-3 mb-4 text-xs font-black tracking-widest text-black bg-orange-500 uppercase rounded-sm">
              {{ slides[currentSlide].tag }}
            </span>
            <h2 class="text-4xl font-black text-white uppercase italic leading-tight drop-shadow-lg">
              {{ slides[currentSlide].title }}
            </h2>
            <p class="mt-4 text-lg text-gray-300 max-w-lg font-medium drop-shadow-md">
              {{ slides[currentSlide].desc }}
            </p>
          </div>
        </transition>

        <div class="flex space-x-2 mt-8">
          <button 
            v-for="(_, index) in slides" 
            :key="index"
            @click="currentSlide = index"
            class="h-1.5 transition-all duration-300 rounded-full"
            :class="currentSlide === index ? 'w-8 bg-green-500' : 'w-2 bg-gray-500 hover:bg-gray-400'"
          ></button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();

// --- Logik Borang Log Masuk ---
const form = ref({ email: '', password: '' });
const isLoading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    const response = await api.post('/auth/login', form.value);
    
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', response.data.user.role);
    localStorage.setItem('user', JSON.stringify(response.data.user));

    const role = response.data.user.role;
    if (role === 'Admin') router.push('/ajk');
    else if (role === 'Pengerusi') router.push('/pengerusi');
    else if (role === 'Super Admin') router.push('/superadmin');
    else router.push('/ahli'); 

  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Ralat sistem berlaku. Sila cuba lagi.';
  } finally {
    isLoading.value = false;
  }
};

// --- Logik Slider Gambar Skrin Besar ---
const currentSlide = ref(0);
let slideInterval;

const slides = [
  {
    id: 1,
    tag: 'Sukan & Rekreasi',
    title: 'Kekal Aktif, Kekal Sihat.',
    desc: 'Memupuk semangat kesukanan dan gaya hidup sihat di kalangan warga Jabatan Perhilitan menerusi pelbagai penganjuran sukan.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' // Ganti dengan gambar sukan anda
  },
  {
    id: 2,
    tag: 'Pasukan Kita',
    title: 'Bina Kesatuan, Kukuhkan Ikatan.',
    desc: 'Menyemarakkan ukhuwah dan kerja berpasukan melalui setiap kejohanan dan perlawanan antara jabatan.',
    image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' // Ganti dengan gambar pasukan
  },
  {
    id: 3,
    tag: 'Kejohanan SAKOM',
    title: 'Sedia Untuk Beraksi.',
    desc: 'Platform terbaik untuk mencungkil bakat baharu dan mengharumkan nama kontinjen Perhilitan.',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80' // Ganti dengan gambar aksi sukan
  }
];

onMounted(() => {
  // Tukar gambar setiap 5 saat
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length;
  }, 5000);
});

onUnmounted(() => {
  clearInterval(slideInterval);
});
</script>

<style scoped>
/* CSS Untuk Efek Transisi Slider */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
<template>
  <div class="min-h-screen w-full flex bg-gray-900 font-sans overflow-hidden">
    
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div class="absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 bg-orange-600 opacity-10 blur-[100px]"></div>
      </div>

      <div class="w-full max-w-md relative z-20">
        <div class="mb-10">
          <h1 class="text-3xl sm:text-4xl font-black text-white uppercase italic tracking-tighter">
            LUPA <span class="text-green-500">AKSES?</span>
          </h1>
          <div class="flex items-center mt-2 space-x-3">
            <div class="h-1 w-12 bg-green-500 rounded-full"></div>
            <h2 class="text-sm font-bold text-gray-400 tracking-widest uppercase">Pemulihan Kata Laluan</h2>
          </div>
        </div>

        <form class="space-y-6" @submit.prevent="handleForgot">
          <div class="space-y-2">
            <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest">Alamat E-mel Berdaftar</label>
            <input 
              v-model="email" 
              type="email" 
              required 
              class="w-full px-4 py-3.5 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              placeholder="nama@perhilitan.gov.my"
            >
          </div>

          <div v-if="message" :class="isSuccess ? 'bg-green-900/40 text-green-400 border-green-800/50' : 'bg-red-900/40 text-red-200 border-red-800/50'" class="p-3 text-sm text-center border rounded-xl">
            {{ message }}
          </div>

          <div class="pt-4">
            <button 
              type="submit" 
              :disabled="isLoading" 
              class="w-full py-4 bg-gray-700 hover:bg-green-600 border border-gray-600 hover:border-transparent text-white font-black text-sm uppercase tracking-[0.2em] rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(34,197,94,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {{ isLoading ? 'MENGHANTAR...' : 'MOHON SET SEMULA' }}
            </button>
          </div>
        </form>

        <div class="mt-8 text-center">
          <router-link to="/login" class="text-sm font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-wide flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Kembali ke Log Masuk
          </router-link>
        </div>
      </div>
    </div>

    <div class="hidden lg:block lg:w-1/2 relative bg-black overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent z-10"></div>
      <div class="absolute inset-0 w-full h-full bg-cover bg-center opacity-60 grayscale" style="background-image: url('https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');"></div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
// IMPORT PANGGILAN API BERPUSAT KITA
import api from '../services/api';

const email = ref('');
const isLoading = ref(false);
const message = ref('');
const isSuccess = ref(false);

const handleForgot = async () => {
  isLoading.value = true;
  message.value = '';
  
  try {
    // KINI KITA HANYA GUNA api.post('/endpoint')
    const response = await api.post('/auth/forgot-password', { email: email.value });
    isSuccess.value = true;
    message.value = response.data.message;
  } catch (error) {
    isSuccess.value = false;
    message.value = error.response?.data?.message || 'Ralat sistem berlaku.';
  } finally {
    isLoading.value = false;
  }
};
</script>
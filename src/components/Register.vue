<template>
  <div class="min-h-screen w-full flex bg-gray-900 font-sans overflow-hidden">
    
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
      
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div class="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 bg-green-600 opacity-10 blur-[100px]"></div>
      </div>

      <div class="w-full max-w-md relative z-20">
        <div class="mb-10">
          <h1 class="text-3xl sm:text-4xl font-black text-white uppercase italic tracking-tighter">
            DAFTAR <span class="text-orange-500">AHLI</span>
          </h1>
          <div class="flex items-center mt-2 space-x-3">
            <div class="h-1 w-12 bg-green-500 rounded-full"></div>
            <h2 class="text-sm font-bold text-gray-400 tracking-widest uppercase">Kakitangan Perhilitan Sahaja</h2>
          </div>
        </div>

        <form class="space-y-5" @submit.prevent="handleRegister">
          
          <div class="space-y-1">
            <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest">No. Kad Pengenalan</label>
            <input v-model="form.no_kp" type="text" required class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Tanpa sempang">
          </div>

          <div class="space-y-1">
            <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest">Alamat E-mel</label>
            <input v-model="form.email" type="email" required class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="nama@perhilitan.gov.my">
          </div>

          <div class="space-y-1">
            <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest">Pilihan Kaedah Yuran</label>
            <select v-model="form.pilihan_potongan" required class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none">
              <option value="Tunai">Bayaran Tunai / Pindahan Bank</option>
              <option value="Potong Gaji">Potongan Gaji (Biro Angkasa)</option>
            </select>
            <p class="text-[10px] text-gray-500 mt-1">*Nota: Gred yang bermula dengan huruf 'G' akan ditukar secara automatik kepada Potongan Gaji.</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest">Kata Laluan</label>
              <input v-model="form.password" type="password" required class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="••••••••">
            </div>
            
            <div class="space-y-1">
              <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest">Sahkan Kata Laluan</label>
              <input v-model="form.confirmPassword" type="password" required class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="••••••••">
            </div>
          </div>

          <div v-if="message" :class="isSuccess ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-200'" class="p-3 text-sm text-center rounded-xl border border-transparent" :style="isSuccess ? 'border-color: rgba(74,222,128,0.5)' : 'border-color: rgba(248,113,113,0.5)'">
            {{ message }}
          </div>

          <div class="pt-4">
            <button type="submit" :disabled="isLoading" class="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-black text-sm uppercase tracking-[0.2em] rounded-xl transition-all hover:-translate-y-1 shadow-lg disabled:opacity-50">
              {{ isLoading ? 'MENGESAHKAN...' : 'DAFTAR SEKARANG' }}
            </button>
          </div>
        </form>

        <div class="mt-8 text-center">
          <p class="text-sm text-gray-500">
            Sudah ada akaun? 
            <router-link to="/login" class="font-bold text-white hover:text-orange-400 transition-colors border-b border-orange-500 pb-1">Log Masuk</router-link>
          </p>
        </div>
      </div>
    </div>

    <div class="hidden lg:block lg:w-1/2 relative bg-black overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent z-10"></div>
      <div class="absolute inset-0 w-full h-full bg-cover bg-center opacity-80" style="background-image: url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');"></div>
      
      <div class="absolute bottom-0 left-0 p-16 z-20 w-full">
        <span class="inline-block py-1 px-3 mb-4 text-xs font-black tracking-widest text-black bg-green-500 uppercase rounded-sm">
          Sistem Bersepadu
        </span>
        <h2 class="text-4xl font-black text-white uppercase italic leading-tight drop-shadow-lg">
          Satu Kelab.<br>Satu Pasukan.
        </h2>
        <p class="mt-4 text-lg text-gray-300 max-w-lg font-medium drop-shadow-md">
          Sertai kami dalam membina komuniti yang lebih cergas, sihat dan bersatu padu di Jabatan Perhilitan.
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
// Tambah pembolehubah confirmPassword dan pilihan_potongan
const form = ref({ no_kp: '', email: '', password: '', confirmPassword: '', pilihan_potongan: 'Tunai' });
const isLoading = ref(false);
const message = ref('');
const isSuccess = ref(false);

const handleRegister = async () => {
  // 1. Semak padanan kata laluan di peringkat UI
  if (form.value.password !== form.value.confirmPassword) {
    isSuccess.value = false;
    message.value = 'Kata laluan dan pengesahan kata laluan tidak sepadan!';
    return;
  }

  isLoading.value = true;
  message.value = '';
  
  try {
    const response = await api.post('/auth/register', {
      no_kp: form.value.no_kp,
      email: form.value.email,
      password: form.value.password,
      pilihan_potongan: form.value.pilihan_potongan
    });
    
    isSuccess.value = true;
    message.value = response.data.message;
    // Bawa pengguna ke login selepas 3 saat
    setTimeout(() => router.push('/login'), 3000);
  } catch (error) {
    isSuccess.value = false;
    message.value = error.response?.data?.message || 'Ralat sistem berlaku.';
  } finally {
    isLoading.value = false;
  }
};
</script>
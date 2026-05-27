<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F8FAFC] font-sans p-4 relative overflow-hidden">
    <div class="absolute top-[-100px] right-[-50px] w-64 h-64 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-[-100px] left-[-50px] w-64 h-64 bg-blue-200/40 rounded-full blur-3xl pointer-events-none"></div>

    <div class="bg-white max-w-md w-full rounded-[32px] shadow-2xl p-8 sm:p-10 relative z-10 animate-fade-in border border-white">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-emerald-50 rounded-2xl mx-auto flex items-center justify-center mb-5 border border-emerald-100">
          <svg class="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
        </div>
        <h2 class="text-2xl font-black text-slate-800 tracking-tight">Lupa Kata Laluan?</h2>
        <p class="text-xs font-bold text-slate-500 mt-2 leading-relaxed">Masukkan e-mel rasmi yang telah didaftarkan. Pautan untuk menetapkan semula kata laluan akan dihantar.</p>
      </div>

      <div v-if="message" class="mb-6 p-4 rounded-xl border flex items-start gap-3" 
             :class="isError ? 'bg-rose-50 border-rose-100 text-rose-700' : 'bg-emerald-50 border-emerald-100 text-emerald-700'">
          <span class="text-[11px] font-bold leading-relaxed">{{ message }}</span>
      </div>

      <form @submit.prevent="handleForgot" class="space-y-5">
        <div>
          <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">E-Mel Berdaftar</label>
          <input v-model="email" type="email" required placeholder="contoh@wildlife.gov.my" 
                 class="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-center" />
        </div>

        <button type="submit" :disabled="isLoading" 
                class="w-full py-4 bg-[#0A192F] hover:bg-[#162C4E] text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg disabled:opacity-50 mt-2 flex justify-center items-center gap-2">
          <svg v-if="isLoading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          {{ isLoading ? 'Menghantar Pautan...' : 'Hantar Pautan Reset' }}
        </button>
      </form>

      <div class="mt-8 text-center">
        <router-link to="/login" class="text-[10px] font-black text-gray-400 hover:text-emerald-600 uppercase tracking-widest transition-colors">Batal & Kembali ke Log Masuk</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';

const email = ref('');
const isLoading = ref(false);
const message = ref('');
const isError = ref(false);

const handleForgot = async () => {
  isLoading.value = true;
  message.value = '';
  try {
    const response = await api.post('/auth/forgot-password', { email: email.value });
    isError.value = false;
    message.value = response.data.message;
    email.value = '';
  } catch (error) {
    isError.value = true;
    message.value = error.response?.data?.message || 'Ralat. Sila cuba lagi.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
</style>
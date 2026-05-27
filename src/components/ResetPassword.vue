<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F8FAFC] font-sans p-4 relative overflow-hidden">
    <div class="absolute top-[-100px] left-[-50px] w-64 h-64 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none"></div>

    <div class="bg-white max-w-md w-full rounded-[32px] shadow-2xl p-8 sm:p-10 relative z-10 animate-fade-in border border-white">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-blue-50 rounded-2xl mx-auto flex items-center justify-center mb-5 border border-blue-100">
          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        </div>
        <h2 class="text-2xl font-black text-slate-800 tracking-tight">Cipta Kata Laluan Baru</h2>
        <p class="text-xs font-bold text-slate-500 mt-2">Sila masukkan kata laluan baharu anda di bawah.</p>
      </div>

      <div v-if="message" class="mb-6 p-4 rounded-xl border flex items-start gap-3" 
             :class="isError ? 'bg-rose-50 border-rose-100 text-rose-700' : 'bg-emerald-50 border-emerald-100 text-emerald-700'">
          <span class="text-[11px] font-bold leading-relaxed">{{ message }}</span>
      </div>

      <form v-if="!success" @submit.prevent="handleReset" class="space-y-4">
        <div>
          <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Kata Laluan Baru</label>
          <input v-model="newPassword" type="password" required placeholder="••••••••" minlength="6"
                 class="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-center" />
        </div>

        <button type="submit" :disabled="isLoading" 
                class="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg disabled:opacity-50 mt-4 flex justify-center items-center gap-2">
          <svg v-if="isLoading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          {{ isLoading ? 'Menyimpan...' : 'Simpan & Log Masuk' }}
        </button>
      </form>
      
      <div v-else class="mt-4">
        <button @click="$router.push('/login')" class="w-full py-4 bg-[#0A192F] text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg">
          Pergi ke Halaman Log Masuk
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '../services/api';

const route = useRoute();
const newPassword = ref('');
const isLoading = ref(false);
const message = ref('');
const isError = ref(false);
const success = ref(false);

const handleReset = async () => {
  isLoading.value = true;
  message.value = '';
  try {
    const token = route.params.token; // Tangkap token dari pautan URL
    const response = await api.post(`/auth/reset-password/${token}`, { newPassword: newPassword.value });
    isError.value = false;
    success.value = true;
    message.value = response.data.message;
  } catch (error) {
    isError.value = true;
    message.value = error.response?.data?.message || 'Token tidak sah atau telah luput.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
</style>
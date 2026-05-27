<template>
  <div class="min-h-screen flex font-sans overflow-hidden">
    
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0A192F]">
      <div class="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/80 to-transparent z-10"></div>
      
      <div class="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1000" class="w-full h-full object-cover opacity-60 mix-blend-overlay" />
        
        <div class="absolute bottom-20 left-16 right-16 z-20">
          <div class="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 mb-6 shadow-lg">
            <img src="/logo.png" class="w-10 h-10 object-contain drop-shadow-md" />
          </div>
          <h2 class="text-3xl font-black text-white leading-tight mb-2 tracking-tight">Sertai Keluarga<br>Kelab PERHILITAN</h2>
          <p class="text-sm text-gray-300 font-medium max-w-sm">Daftar sekarang untuk log masuk ke portal. Maklumat lanjut seperti waris dan alamat boleh dikemas kini di bahagian Profil selepas mendaftar.</p>
        </div>
      </div>
    </div>

    <div class="w-full lg:w-1/2 min-h-screen flex flex-col justify-center items-center relative bg-gradient-to-br from-[#0F4C3A] via-[#0A192F] to-[#162C4E] lg:bg-none lg:bg-white px-5 sm:px-10 py-10 overflow-y-auto custom-scrollbar">
      
      <div class="absolute inset-0 overflow-hidden pointer-events-none lg:hidden fixed">
         <div class="absolute top-[-10%] right-[-10%] w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full"></div>
         <div class="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full"></div>
      </div>

      <div class="w-full max-w-md bg-white rounded-[32px] p-8 sm:p-10 shadow-2xl lg:shadow-none lg:bg-transparent lg:p-0 relative z-10 animate-fade-in border border-white/20 lg:border-none my-auto">
        
        <div class="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
          <div class="w-14 h-14 bg-gray-50 rounded-[18px] border border-gray-200 flex items-center justify-center shadow-sm shrink-0">
            <img src="/logo.png" alt="Logo Kelab" class="w-10 h-10 object-contain drop-shadow-sm" />
          </div>
          <div class="flex-1">
            <h1 class="text-xl sm:text-2xl font-black text-[#0A192F] tracking-tight uppercase leading-none">Kelab Perhilitan</h1>
            <p class="text-[9px] sm:text-[10px] font-black text-emerald-600 tracking-widest uppercase mt-1">Pendaftaran Akaun</p>
          </div>
        </div>
        
        <h2 class="text-2xl font-black text-gray-900 tracking-tight mb-1">Pengaktifan Portal</h2>
        <p class="text-[11px] text-gray-500 font-bold mb-6 leading-relaxed">Sistem akan menyemak No. Kad Pengenalan anda dengan rekod induk kakitangan (HR).</p>

        <div v-if="alert.message" class="mb-6 p-4 rounded-xl flex items-start gap-3 animate-pop-in"
             :class="alert.type === 'error' ? 'bg-rose-50 border border-rose-100 text-rose-600' : 'bg-emerald-50 border border-emerald-100 text-emerald-700'">
          <svg v-if="alert.type === 'error'" class="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <svg v-else class="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          <span class="text-[11px] font-bold leading-relaxed">{{ alert.message }}</span>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-4">
          
          <div>
            <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">No. Kad Pengenalan</label>
            <input v-model="form.no_kp" type="text" required placeholder="Contoh: 900101145678" maxlength="12"
                   class="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">E-Mel Rasmi</label>
              <input v-model="form.email" type="email" required placeholder="nama@wildlife.gov.my" 
                     class="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none" />
            </div>
            <div>
              <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">No. Telefon</label>
              <input v-model="form.no_tel" type="text" required placeholder="0123456789" 
                     class="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Cipta Kata Laluan</label>
              <input v-model="form.password" type="password" required placeholder="••••••••" minlength="6"
                     class="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none" />
            </div>
            <div>
              <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Sahkan Kata Laluan</label>
              <input v-model="form.confirm_password" type="password" required placeholder="••••••••" minlength="6"
                     class="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none" />
            </div>
          </div>

          <div class="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 flex items-start gap-3 mt-4">
            <input type="checkbox" required class="mt-0.5 w-4 h-4 text-emerald-600 rounded border-emerald-300 focus:ring-emerald-500 cursor-pointer" />
            <p class="text-[9px] text-emerald-800 font-bold leading-relaxed">
              Saya bersetuju untuk mendaftar dan membenarkan semakan dibuat dengan rekod Jabatan. Saya tertakluk kepada <a href="#" class="font-black underline">Terma & Syarat Kelab</a>.
            </p>
          </div>

          <button type="submit" :disabled="isLoading" 
                  class="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg shadow-emerald-600/20 disabled:opacity-50 mt-2 flex justify-center items-center gap-2">
            <svg v-if="isLoading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {{ isLoading ? 'Menyemak Rekod...' : 'Daftar Akaun Sekarang' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-[11px] font-bold text-gray-500">
            Sudah mendaftar? 
            <router-link to="/login" class="font-black text-emerald-600 hover:text-emerald-700 hover:underline uppercase tracking-widest ml-1">Log Masuk</router-link>
          </p>
        </div>

        <div class="mt-8 pt-6 border-t border-gray-100 text-center lg:text-left flex flex-col gap-1.5">
           <p class="text-[9px] text-gray-400 font-bold tracking-widest uppercase">
              &copy; {{ new Date().getFullYear() }} Hak Cipta Terpelihara.
           </p>
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
import { ref } from 'vue';
import api from '../services/api';

// Borang kini ada confirm_password
const form = ref({
  no_kp: '', email: '', no_tel: '', password: '', confirm_password: ''
});
const isLoading = ref(false);
const alert = ref({ type: '', message: '' });

const handleRegister = async () => {
  // LOGIK SEMAKAN KATA LALUAN
  if (form.value.password !== form.value.confirm_password) {
    alert.value = { type: 'error', message: 'Ralat: Kata laluan dan pengesahan kata laluan tidak sepadan.' };
    return;
  }

  isLoading.value = true;
  alert.value = { type: '', message: '' };
  try {
    // Kita hanya hantar data yang perlu sahaja ke API Backend
    const payload = {
      no_kp: form.value.no_kp,
      email: form.value.email,
      no_tel: form.value.no_tel,
      password: form.value.password
    };

    const response = await api.post('/auth/register', payload);
    alert.value = { type: 'success', message: response.data.message };
    
    // Kosongkan form lepas berjaya
    form.value = { no_kp: '', email: '', no_tel: '', password: '', confirm_password: '' };
  } catch (error) {
    alert.value = { type: 'error', message: error.response?.data?.message || 'Gagal mendaftar. Sila cuba lagi.' };
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeIn { 
  from { opacity: 0; transform: translateY(20px); } 
  to { opacity: 1; transform: translateY(0); } 
}

.animate-pop-in { animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes popIn { 
  from { opacity: 0; transform: scale(0.95); } 
  to { opacity: 1; transform: scale(1); } 
}

.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
@media (min-width: 1024px) {
  .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); }
}
</style>
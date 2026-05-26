<template>
  <div class="p-4 space-y-6 pb-24 animate-fade-in">
    
    <div v-if="!loading && !profil.is_paid" class="bg-red-50 border border-red-200 rounded-[28px] p-6 shadow-sm relative overflow-hidden">
      <div class="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full blur-2xl -mr-10 -mt-10"></div>
      <div class="relative z-10 flex gap-4">
        <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 text-red-600 shadow-sm border border-red-100">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        </div>
        <div>
          <h3 class="text-sm font-black text-red-800 uppercase tracking-widest">Tindakan Diperlukan</h3>
          <p class="text-xs text-red-700 mt-1 font-medium leading-relaxed">Keahlian anda belum diaktifkan. Akses Pendaftaran Acara dan Permohonan Bantuan telah <b>disekat</b> sementara. Sila jelaskan yuran di tab Yuran.</p>
          <button @click="$router.push('/ahli/yuran')" class="mt-3.5 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md active:scale-95 transition-all">
            Bayar Yuran FPX
          </button>
        </div>
      </div>
    </div>

    <div class="bg-gradient-to-br from-[#0F4C3A] to-[#1A6D52] rounded-[32px] p-7 shadow-lg shadow-[#0F4C3A]/20 relative overflow-hidden text-white">
      <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 bg-white rounded-xl p-1 flex items-center justify-center shadow-sm">
            <img src="/logo.png" alt="Logo" class="w-full h-full object-contain" />
          </div>
          <div>
            <h3 class="font-black tracking-widest text-[10px] text-green-200 uppercase">Kad Digital Ahli</h3>
            <p class="text-white text-xs font-bold tracking-wider mt-0.5">KELAB PERHILITAN</p>
          </div>
        </div>
        <div v-if="loading" class="animate-pulse flex gap-4">
          <div class="w-16 h-16 bg-white/20 rounded-2xl"></div>
          <div class="flex-1 space-y-2"><div class="h-4 bg-white/20 rounded w-3/4"></div><div class="h-3 bg-white/20 rounded w-1/2"></div></div>
        </div>
        <div v-else class="flex items-center gap-4">
          <div class="w-16 h-16 shrink-0 rounded-2xl bg-white/10 border border-white/20 overflow-hidden flex items-center justify-center font-black text-xl backdrop-blur-sm">
            <img v-if="profil.gambar" :src="`http://localhost:5000/uploads/images/${profil.gambar}`" class="w-full h-full object-cover" />
            <span v-else>{{ profil.nama_penuh ? profil.nama_penuh.charAt(0) : '?' }}</span>
          </div>
          <div>
            <h2 class="text-lg font-black uppercase tracking-tight truncate text-white leading-tight">{{ profil.nama_penuh || 'NAMA PENGGUNA' }}</h2>
            <p class="text-[10px] font-medium text-green-100/70 mt-1 uppercase tracking-widest">ID: {{ profil.no_ahli || 'PROSES DAFTAR' }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div @click="$router.push('/ahli/aktiviti')" class="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center cursor-pointer hover:bg-green-50 transition-colors active:scale-95">
        <div class="w-12 h-12 bg-green-100 text-[#0F4C3A] rounded-full flex items-center justify-center mb-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        </div>
        <span class="text-xs font-black text-gray-800 uppercase tracking-widest">Acara & Sukan</span>
      </div>
      <div @click="$router.push('/ahli/bantuan')" class="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center cursor-pointer hover:bg-green-50 transition-colors active:scale-95">
        <div class="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
        </div>
        <span class="text-xs font-black text-gray-800 uppercase tracking-widest">Tuntutan Kebajikan</span>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../../services/api';

const profil = ref({});
const loading = ref(true);

const fetchProfil = async () => {
  try {
    const res = await api.get('/ahli/profil');
    profil.value = res.data.data;
  } catch (error) {
    console.error("Gagal menarik data profil", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProfil();
});
</script>
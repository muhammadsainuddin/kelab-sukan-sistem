<template>
  <div class="px-5 py-6 space-y-8 animate-fade-in pb-24">
    
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Selamat Kembali</p>
        <h2 class="text-2xl font-black text-[#191C1A] tracking-tight">{{ namaPendek }}!</h2>
      </div>
      <div @click="$emit('tukarTab', 'profil')" class="w-12 h-12 rounded-full border-2 border-white shadow-md overflow-hidden bg-gray-100 cursor-pointer active:scale-95 transition-transform">
        <img v-if="profil.gambar" :src="`http://localhost:5000/uploads/images/${profil.gambar}`" class="w-full h-full object-cover" />
        <div v-else class="w-full h-full flex items-center justify-center font-bold text-[#0F4C3A]">?</div>
      </div>
    </div>

    <div class="relative h-56 rounded-[32px] p-7 shadow-xl overflow-hidden group transition-all duration-500"
         :class="profil.is_paid || profil.status_ahli === 'A - Aktif' ? 'bg-gradient-to-br from-[#0F4C3A] via-[#0F4C3A] to-[#165a46] shadow-[#0F4C3A]/30' : 'bg-gradient-to-br from-gray-800 to-gray-900 shadow-gray-900/30'">
      
      <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
      <div class="absolute -left-10 -bottom-10 w-32 h-32 bg-[#70B130]/20 rounded-full blur-2xl"></div>

      <div class="relative z-10 flex flex-col h-full justify-between text-white">
        <div class="flex justify-between items-start">
          <div class="space-y-1">
            <p class="text-[10px] font-black text-green-200/80 uppercase tracking-widest">Kelab Sukan PERHILITAN</p>
            <p class="text-lg font-mono font-bold tracking-[0.15em]">{{ profil.no_ahli || 'PROSES ID KELAB' }}</p>
          </div>
          <div class="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
            <span class="font-black text-xs">KS</span>
          </div>
        </div>

        <div class="space-y-4">
          <div class="h-[1px] w-full bg-white/10"></div>
          <div class="flex justify-between items-end">
            <div>
              <p class="text-[9px] font-black text-green-200/80 uppercase tracking-widest">Status Keahlian</p>
              <p class="text-sm font-bold flex items-center gap-2 mt-0.5">
                <span class="w-2 h-2 rounded-full" :class="profil.is_paid || profil.status_ahli === 'A - Aktif' ? 'bg-[#70B130] animate-pulse' : 'bg-red-500'"></span>
                {{ profil.status_ahli || 'MENUNGGU KELULUSAN' }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-[9px] font-black text-green-200/80 uppercase tracking-widest">Gred SSPA</p>
              <p class="text-sm font-bold uppercase mt-0.5">{{ profil.gred_sspa || '-' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-3">
      <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Akses Pantas</h3>
      <div class="grid grid-cols-2 gap-4">
        
        <button @click="navigasiKe('aktiviti')" 
                class="bg-white p-5 rounded-[28px] border transition-all active:scale-95 flex flex-col justify-between h-36 text-left"
                :class="isAktif ? 'border-gray-100 shadow-sm hover:shadow-md' : 'border-gray-200 bg-gray-50 opacity-60'">
          <div class="w-10 h-10 rounded-2xl flex items-center justify-center transition-colors"
               :class="isAktif ? 'bg-[#E8DEF8] text-[#21005D]' : 'bg-gray-200 text-gray-500'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <div>
            <p class="text-sm font-black text-gray-800 tracking-tight">Daftar Sukan</p>
            <p v-if="isAktif" class="text-[10px] text-gray-500 font-medium mt-0.5">Sertai SAKOM</p>
            <p v-else class="text-[9px] font-bold text-red-500 mt-0.5 uppercase">Perlu Kelulusan</p>
          </div>
        </button>

        <button @click="navigasiKe('bantuan')" 
                class="bg-white p-5 rounded-[28px] border transition-all active:scale-95 flex flex-col justify-between h-36 text-left"
                :class="isAktif ? 'border-gray-100 shadow-sm hover:shadow-md' : 'border-gray-200 bg-gray-50 opacity-60'">
          <div class="w-10 h-10 rounded-2xl flex items-center justify-center transition-colors"
               :class="isAktif ? 'bg-[#FFD8E4] text-[#31111D]' : 'bg-gray-200 text-gray-500'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          </div>
          <div>
            <p class="text-sm font-black text-gray-800 tracking-tight">Kebajikan</p>
            <p v-if="isAktif" class="text-[10px] text-gray-500 font-medium mt-0.5">Mohon bantuan</p>
            <p v-else class="text-[9px] font-bold text-red-500 mt-0.5 uppercase">Perlu Kelulusan</p>
          </div>
        </button>

      </div>
    </div>

    <div class="space-y-4">
      <div class="flex items-center justify-between px-1">
        <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hebahan Acara Terdekat</h3>
        <button v-if="isAktif && senaraiAcara.length > 0" @click="navigasiKe('aktiviti')" class="text-[10px] font-black text-[#0F4C3A] uppercase tracking-widest active:scale-95">Lihat Semua</button>
      </div>
      
      <div v-if="loading" class="flex justify-center py-10">
        <div class="w-8 h-8 border-4 border-gray-200 border-t-[#0F4C3A] rounded-full animate-spin"></div>
      </div>

      <div v-else-if="senaraiAcara.length === 0" class="bg-[#F2F4F1] rounded-[28px] p-8 border border-dashed border-gray-300 flex flex-col items-center text-center space-y-3">
        <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-400 shadow-sm">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        </div>
        <div>
          <p class="text-xs font-black text-gray-600 uppercase tracking-widest">Tiada Acara Aktif</p>
          <p class="text-[10px] text-gray-500 mt-1">Nantikan hebahan sukan yang akan datang.</p>
        </div>
      </div>

      <div v-else class="space-y-4">
        <div v-for="acara in senaraiAcara.slice(0, 2)" :key="acara.id" 
             @click="navigasiKe('aktiviti')"
             class="bg-white rounded-[28px] overflow-hidden border border-gray-100 shadow-sm flex items-center cursor-pointer hover:shadow-md transition-all active:scale-[0.98]">
          <div class="w-28 h-28 bg-gray-100 shrink-0 relative">
            <img v-if="acara.poster" :src="`http://localhost:5000/uploads/images/${acara.poster}`" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-300">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
          </div>
          <div class="p-4 flex-1 min-w-0">
            <span class="px-2 py-0.5 bg-[#C2E8D3] text-[#052115] text-[8px] font-black uppercase tracking-widest rounded-full mb-1 inline-block">Sukan SAKOM</span>
            <h4 class="text-sm font-black text-gray-900 uppercase truncate">{{ acara.nama_pertandingan }}</h4>
            <div class="flex items-center gap-1.5 mt-2 text-[10px] font-bold text-gray-500">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              {{ formatTarikh(acara.tarikh_kejohanan) }}
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '../../../services/api';

const emit = defineEmits(['tukarTab']);

const profil = ref({});
const senaraiAcara = ref([]);
const loading = ref(true);

const namaPendek = computed(() => {
  return profil.value.nama_penuh ? profil.value.nama_penuh.split(' ')[0] : 'Ahli';
});

const isAktif = computed(() => {
  return profil.value.is_paid || profil.value.status_ahli === 'A - Aktif';
});

const fetchData = async () => {
  loading.value = true;
  try {
    // 1. Tarik Profil Semasa
    const resProfil = await api.get('/ahli/profil');
    profil.value = resProfil.data.data;

    // 2. Tarik Senarai Sukan Aktif untuk Hebahan
    const resAcara = await api.get('/pertandingan/aktif');
    senaraiAcara.value = resAcara.data.data || [];
  } catch (error) {
    console.error("Gagal memuatkan data dashboard:", error);
  } finally {
    loading.value = false;
  }
};

const navigasiKe = (namaTab) => {
  if (!isAktif.value) {
    alert("Akses Disekat: Sila lengkapkan borang pendaftaran di tab Profil dan tunggu kelulusan Urusetia.");
    emit('tukarTab', 'profil'); // Bawa terus ke tab profil untuk isi borang
    return;
  }
  emit('tukarTab', namaTab);
};

const formatTarikh = (tarikh) => {
  if(!tarikh) return '';
  const d = new Date(tarikh);
  return d.toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' });
};

onMounted(fetchData);
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
<template>
  <div class="p-4 max-w-2xl mx-auto space-y-6 pb-24">
    
    <transition name="md-slide-up">
      <div v-if="toast.show" 
           class="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] px-4 py-3 bg-[#313033] text-[#F4EFF4] text-sm font-medium rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] w-11/12 max-w-md">
        <svg v-if="toast.type === 'success'" class="w-5 h-5 text-[#C2E8D3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <svg v-else class="w-5 h-5 text-[#F2B8B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        <span class="flex-1">{{ toast.message }}</span>
      </div>
    </transition>

    <div class="px-2 pt-2">
      <h2 class="text-2xl font-medium text-[#191C1A] tracking-tight">Sukan & Acara</h2>
      <p class="text-sm text-[#404943] mt-1">Sertai aktiviti kelab dan kekal aktif bersama kami.</p>
    </div>

    <div v-if="loading" class="flex flex-col items-center justify-center py-20 space-y-4">
      <div class="w-10 h-10 border-4 border-gray-200 border-t-[#0F4C3A] rounded-full animate-spin"></div>
      <p class="text-xs font-bold text-gray-500 uppercase tracking-widest">Memuatkan Acara...</p>
    </div>

    <div v-else-if="senaraiAcara.length === 0" class="bg-[#F2F4F1] rounded-[28px] p-10 flex flex-col items-center text-center border border-gray-200/50">
      <div class="w-16 h-16 bg-[#E0E3E1] rounded-full flex items-center justify-center text-[#404943] mb-4">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
      </div>
      <h3 class="text-base font-bold text-[#191C1A]">Tiada Acara Terkini</h3>
      <p class="text-xs text-[#404943] mt-2">Buat masa ini tiada acara atau pertandingan yang dibuka untuk pendaftaran.</p>
    </div>

    <div v-else class="space-y-6">
      <div v-for="acara in senaraiAcara" :key="acara.id" class="bg-white rounded-[28px] overflow-hidden shadow-sm border border-gray-200 transition-all hover:shadow-md">
        
        <div v-if="acara.poster" class="w-full h-48 sm:h-64 bg-gray-100 relative">
          <img :src="`http://localhost:5000/uploads/images/${acara.poster}`" alt="Poster Acara" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <span class="absolute bottom-4 left-4 px-3 py-1 bg-[#C2E8D3] text-[#052115] text-[10px] font-black uppercase tracking-widest rounded-full">
            Acara Aktif
          </span>
        </div>

        <div class="p-5 md:p-6">
          <div v-if="!acara.poster" class="mb-3">
            <span class="px-3 py-1 bg-[#C2E8D3] text-[#052115] text-[10px] font-black uppercase tracking-widest rounded-full">Acara Aktif</span>
          </div>
          
          <h3 class="text-xl font-bold text-[#191C1A] leading-tight mb-2">{{ acara.nama_pertandingan }}</h3>
          
          <p class="text-sm text-[#404943] line-clamp-3 leading-relaxed mb-5">
            {{ acara.keterangan }}
          </p>
          
          <div class="bg-[#F2F4F1] rounded-2xl p-4 space-y-3 mb-6">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-[#0F4C3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <div>
                <p class="text-[10px] font-bold text-[#404943] uppercase tracking-wider">Tarikh Kejohanan</p>
                <p class="text-sm font-semibold text-[#191C1A]">{{ formatTarikh(acara.tarikh_kejohanan) }}</p>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-[#E30613]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <div>
                <p class="text-[10px] font-bold text-[#404943] uppercase tracking-wider">Tutup Pendaftaran</p>
                <p class="text-sm font-semibold text-[#E30613]">{{ formatTarikh(acara.tarikh_tutup) }}</p>
              </div>
            </div>
          </div>

          <button @click="bukaDaftar(acara)" class="w-full py-3.5 bg-[#0F4C3A] hover:bg-[#0b3b28] text-white text-sm font-bold rounded-full shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 tap-transparent">
            Sertai Sekarang
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </div>
      </div>
    </div>

    <div v-if="modal.show" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" @click="modal.show = false"></div>
      
      <div class="bg-[#FDFDFD] rounded-[28px] w-full max-w-md shadow-2xl relative z-10 animate-scale-up overflow-hidden flex flex-col max-h-[90vh]">
        
        <div class="p-6 pb-2">
          <div class="w-12 h-12 rounded-full bg-[#C2E8D3] text-[#052115] flex items-center justify-center mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          </div>
          <h3 class="text-xl font-medium text-[#191C1A]">Pengesahan Penyertaan</h3>
          <p class="text-sm text-[#404943] mt-2">Anda sedang mendaftar untuk acara <span class="font-bold text-[#0F4C3A]">{{ modal.acara?.nama_pertandingan }}</span>.</p>
        </div>

        <div class="p-6 pt-2 overflow-y-auto">
          <div class="mt-4">
            <label class="block text-xs font-semibold text-[#404943] mb-2">Kategori Penyertaan (Jika berkaitan)</label>
            <input 
              v-model="modal.kategori" 
              type="text" 
              placeholder="Cth: Perseorangan, Beregu, Veteran..." 
              class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-[#191C1A] focus:ring-2 focus:ring-[#0F4C3A] focus:border-[#0F4C3A] outline-none transition-all"
            >
            <p class="text-[10px] text-gray-500 mt-2">*Biarkan kosong jika tiada kategori khusus (Default: Umum).</p>
          </div>
        </div>

        <div class="p-6 pt-0 flex justify-end gap-2 mt-4">
          <button @click="modal.show = false" class="px-5 py-2.5 rounded-full text-sm font-medium text-[#0F4C3A] hover:bg-[#0F4C3A]/10 transition-colors outline-none tap-transparent">
            Batal
          </button>
          <button @click="hantarPendaftaran" :disabled="isSubmitting" class="px-6 py-2.5 rounded-full text-sm font-medium bg-[#0F4C3A] text-white shadow-md hover:bg-[#0b3b28] active:scale-95 transition-all disabled:opacity-50 outline-none tap-transparent flex items-center gap-2">
            <span v-if="isSubmitting" class="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
            Sah & Daftar
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../../services/api';

const senaraiAcara = ref([]);
const loading = ref(true);
const isSubmitting = ref(false);

const modal = ref({ show: false, acara: null, kategori: 'Umum' });
const toast = ref({ show: false, message: '', type: 'success' });

// Tunjuk Notifikasi Snackbar
const paparToast = (msg, type = 'success') => {
  toast.value = { show: true, message: msg, type };
  setTimeout(() => toast.value.show = false, 3000);
};

// Format Tarikh
const formatTarikh = (tarikh) => {
  if(!tarikh) return '';
  const d = new Date(tarikh);
  return d.toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' });
};

// Tarik Data
const fetchAcara = async () => {
  loading.value = true;
  try {
    const res = await api.get('/pertandingan/aktif');
    senaraiAcara.value = res.data.data;
  } catch (error) {
    paparToast("Gagal menarik senarai acara.", "error");
  } finally {
    loading.value = false;
  }
};

// Buka Modal Dialog
const bukaDaftar = (acara) => {
  modal.value = { show: true, acara: acara, kategori: '' };
};

// Hantar Data Penyertaan
const hantarPendaftaran = async () => {
  if (!modal.value.acara) return;
  
  isSubmitting.value = true;
  try {
    const payload = {
      pertandingan_id: modal.value.acara.id,
      kategori: modal.value.kategori || 'Umum'
    };
    
    const res = await api.post('/pertandingan/daftar', payload);
    paparToast(res.data.message || "Pendaftaran berjaya!", "success");
    modal.value.show = false;
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Ralat pendaftaran.";
    paparToast(errorMsg, "error");
    modal.value.show = false;
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(fetchAcara);
</script>

<style scoped>
.tap-transparent { -webkit-tap-highlight-color: transparent; }

/* Animasi Kemunculan Modal MD3 */
.animate-scale-up {
  animation: scaleUp 0.3s cubic-bezier(0.2, 0, 0, 1) forwards;
}
@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

/* Animasi Snackbar Bawah */
.md-slide-up-enter-active, .md-slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
}
.md-slide-up-enter-from, .md-slide-up-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>
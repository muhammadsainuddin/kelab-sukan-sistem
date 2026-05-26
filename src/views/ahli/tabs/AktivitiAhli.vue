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
      <h2 class="text-2xl font-black text-gray-900 tracking-tight uppercase">Sukan & Acara</h2>
      <p class="text-xs text-gray-500 font-medium mt-1">Sertai aktiviti kelab dan kekal aktif bersama kami.</p>
    </div>

    <div v-if="!loadingProfil && !profil.is_paid" class="bg-red-50 border border-red-200 rounded-[24px] p-4 flex items-center gap-3">
      <svg class="w-6 h-6 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
      <p class="text-xs text-red-800 font-bold uppercase tracking-wide">Pendaftaran acara disekat sehingga yuran tahunan dijelaskan.</p>
    </div>

    <div v-if="loadingAcara" class="flex flex-col items-center justify-center py-20 space-y-4">
      <div class="w-10 h-10 border-4 border-gray-200 border-t-[#0F4C3A] rounded-full animate-spin"></div>
      <p class="text-xs font-bold text-gray-500 uppercase tracking-widest">Memuatkan Acara...</p>
    </div>

    <div v-else-if="senaraiAcara.length === 0" class="bg-white rounded-[28px] p-10 flex flex-col items-center text-center border border-gray-100">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
      </div>
      <h3 class="text-sm font-black text-gray-800 uppercase tracking-widest">Tiada Acara Terkini</h3>
      <p class="text-xs text-gray-500 mt-2 font-medium">Buat masa ini tiada acara atau pertandingan yang dibuka.</p>
    </div>

    <div v-else class="space-y-6">
      <div v-for="acara in senaraiAcara" :key="acara.id" class="bg-white rounded-[28px] overflow-hidden shadow-sm border border-gray-100">
        
        <div v-if="acara.poster" class="w-full h-48 sm:h-64 bg-gray-100 relative">
          <img :src="`http://localhost:5000/uploads/images/${acara.poster}`" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        <div class="p-6">
          <h3 class="text-lg font-black text-gray-900 leading-tight mb-2">{{ acara.nama_pertandingan }}</h3>
          <p class="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-5 font-medium">{{ acara.keterangan }}</p>
          
          <div class="bg-gray-50 rounded-2xl p-4 space-y-3 mb-6 border border-gray-100">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-[#0F4C3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <div>
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tarikh Kejohanan</p>
                <p class="text-xs font-black text-gray-800">{{ formatTarikh(acara.tarikh_kejohanan) }}</p>
              </div>
            </div>
          </div>

          <button @click="bukaDaftar(acara)" :disabled="!profil.is_paid" class="w-full py-4 bg-[#0F4C3A] text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg shadow-[#0F4C3A]/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none">
            {{ profil.is_paid ? 'Sertai Sekarang' : 'Dihalang (Sila Bayar Yuran)' }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="modal.show" class="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="modal.show = false"></div>
      <div class="bg-white rounded-t-[32px] sm:rounded-[32px] w-full max-w-md shadow-2xl relative z-10 animate-scale-up overflow-hidden">
        <div class="p-6 pb-2 border-b border-gray-100">
          <h3 class="text-lg font-black text-gray-900 uppercase">Pengesahan Pendaftaran</h3>
          <p class="text-xs text-gray-500 font-medium mt-1">Acara: <span class="font-bold text-[#0F4C3A]">{{ modal.acara?.nama_pertandingan }}</span></p>
        </div>
        <div class="p-6">
          <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Kategori (Jika ada)</label>
          <input v-model="modal.kategori" type="text" placeholder="Umum / Perseorangan / Beregu" class="w-full border border-gray-300 rounded-2xl px-4 py-3.5 text-sm font-bold focus:border-[#0F4C3A] outline-none">
        </div>
        <div class="p-6 pt-0 flex justify-end gap-3">
          <button @click="modal.show = false" class="px-6 py-3 text-xs font-black text-gray-500 uppercase tracking-widest hover:bg-gray-100 rounded-full transition-colors">Batal</button>
          <button @click="hantarPendaftaran" :disabled="isSubmitting" class="px-8 py-3 bg-[#0F4C3A] text-white text-xs font-black uppercase tracking-widest rounded-full shadow-md active:scale-95 transition-all">Sahkan</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../../services/api';

const senaraiAcara = ref([]);
const loadingAcara = ref(true);
const loadingProfil = ref(true);
const isSubmitting = ref(false);
const profil = ref({});

const modal = ref({ show: false, acara: null, kategori: 'Umum' });
const toast = ref({ show: false, message: '', type: 'success' });

const paparToast = (msg, type = 'success') => {
  toast.value = { show: true, message: msg, type };
  setTimeout(() => toast.value.show = false, 3000);
};

const formatTarikh = (tarikh) => {
  if(!tarikh) return '';
  const d = new Date(tarikh);
  return d.toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' });
};

const fetchProfil = async () => {
  try {
    const res = await api.get('/ahli/profil');
    profil.value = res.data.data;
  } catch (error) {
    console.error("Gagal menarik profil", error);
  } finally {
    loadingProfil.value = false;
  }
};

const fetchAcara = async () => {
  loadingAcara.value = true;
  try {
    const res = await api.get('/pertandingan/aktif');
    senaraiAcara.value = res.data.data;
  } catch (error) {
    paparToast("Gagal menarik senarai acara.", "error");
  } finally {
    loadingAcara.value = false;
  }
};

const bukaDaftar = (acara) => {
  if (!profil.value.is_paid) {
    paparToast("Akses Ditolak: Sila jelaskan yuran tahunan kelab terlebih dahulu.", "error");
    return;
  }
  modal.value = { show: true, acara: acara, kategori: '' };
};

const hantarPendaftaran = async () => {
  if (!modal.value.acara) return;
  isSubmitting.value = true;
  try {
    const res = await api.post('/pertandingan/daftar', { pertandingan_id: modal.value.acara.id, kategori: modal.value.kategori || 'Umum' });
    paparToast(res.data.message || "Pendaftaran berjaya!", "success");
    modal.value.show = false;
  } catch (error) {
    paparToast(error.response?.data?.message || "Ralat pendaftaran.", "error");
    modal.value.show = false;
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  fetchProfil();
  fetchAcara();
});
</script>

<style scoped>
.animate-scale-up { animation: scaleUp 0.3s cubic-bezier(0.2, 0, 0, 1) forwards; }
@keyframes scaleUp { from { opacity: 0; transform: translateY(100%); } to { opacity: 1; transform: translateY(0); } }
.md-slide-up-enter-active, .md-slide-up-leave-active { transition: all 0.3s cubic-bezier(0.2, 0, 0, 1); }
.md-slide-up-enter-from, .md-slide-up-leave-to { opacity: 0; transform: translate(-50%, 20px); }
</style>
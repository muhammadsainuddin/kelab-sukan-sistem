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
      <h2 class="text-2xl font-medium text-[#191C1A] tracking-tight">Pusat Kebajikan</h2>
      <p class="text-sm text-[#404943] mt-1">Permohonan bantuan khas untuk ahli kelab.</p>
    </div>

    <div class="bg-[#F2F4F1] rounded-3xl p-5 flex items-center justify-between border border-[#E0E3E1] shadow-sm">
      <div>
        <p class="text-[10px] font-bold text-[#404943] uppercase tracking-widest">Kelayakan Gred Jawatan</p>
        <p class="text-xl font-black text-[#0F4C3A] mt-1 tracking-tight">GRED {{ profil.gred_sspa || 'TIADA REKOD' }}</p>
        <p class="text-[10px] text-[#404943] mt-1">Bantuan disalurkan berdasarkan kelayakan gred SSPA.</p>
      </div>
      <div class="w-12 h-12 bg-[#C2E8D3] rounded-full flex items-center justify-center text-[#052115] shadow-inner shrink-0">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
      </div>
    </div>

    <div class="bg-white rounded-[28px] overflow-hidden shadow-sm border border-gray-200 p-6 relative">
      <h3 class="text-lg font-bold text-[#191C1A] mb-5">Borang Permohonan</h3>
      
      <form @submit.prevent="hantarPermohonan" class="space-y-5">
        
        <div class="space-y-1.5">
          <label class="block text-xs font-medium text-[#404943]">Jenis Bantuan</label>
          <select v-model="form.jenis_bantuan" required class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-[#191C1A] focus:ring-2 focus:ring-[#0F4C3A] focus:border-[#0F4C3A] outline-none transition-all bg-white appearance-none">
            <option value="" disabled>-- Pilih jenis bantuan --</option>
            <option value="Kematian Ahli / Keluarga">Kematian Ahli / Keluarga Terdekat</option>
            <option value="Sakit Kronik / Kemalangan">Sakit Kronik / Kemalangan Mudarat</option>
            <option value="Musibah Bencana Alam">Musibah (Banjir / Kebakaran)</option>
            <option value="Keraian (Perkahwinan / Bersalin)">Keraian (Perkahwinan / Bersalin)</option>
          </select>
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-medium text-[#404943]">Keterangan Kejadian</label>
          <textarea v-model="form.keterangan" rows="3" required placeholder="Nyatakan tarikh, lokasi, dan butiran ringkas..." class="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-[#191C1A] focus:ring-2 focus:ring-[#0F4C3A] focus:border-[#0F4C3A] outline-none transition-all resize-none"></textarea>
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-medium text-[#404943]">Dokumen Sokongan (Sijil/Gambar)</label>
          
          <div class="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50/50 hover:bg-[#F2F4F1] hover:border-[#0F4C3A] transition-colors relative">
            <input type="file" ref="inputDokumen" @change="handleDokumen" accept="image/*,.pdf" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required>
            
            <svg v-if="!fileDokumen" class="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
            <svg v-else class="w-8 h-8 text-[#0F4C3A] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            
            <p class="text-xs font-bold text-[#191C1A] text-center px-4 truncate w-full">
              {{ fileDokumen ? fileDokumen.name : 'Muat naik fail di sini' }}
            </p>
            <p class="text-[10px] text-[#404943] mt-1" v-if="!fileDokumen">Format PDF, JPG atau PNG disokong.</p>
          </div>
        </div>

        <button type="submit" :disabled="isSubmitting" class="w-full py-3.5 bg-[#0F4C3A] text-white text-sm font-bold rounded-full shadow-md hover:bg-[#0b3b28] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 tap-transparent mt-2">
          <span v-if="isSubmitting" class="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
          {{ isSubmitting ? 'Menghantar...' : 'Hantar Permohonan' }}
        </button>
      </form>
    </div>

    <div class="pt-4">
      <h3 class="text-sm font-medium text-[#191C1A] px-2 mb-4">Sejarah Tuntutan Saya</h3>
      
      <div v-if="sejarah.length === 0" class="text-center py-6 px-4">
        <p class="text-xs text-gray-500 font-medium">Tiada sejarah permohonan buat masa ini.</p>
      </div>

      <div class="space-y-3">
        <div v-for="item in sejarah" :key="item.id" class="bg-white border border-gray-200 rounded-2xl p-4 flex justify-between items-center shadow-sm">
          <div>
            <h4 class="text-xs font-bold text-[#191C1A] uppercase">{{ item.jenis_bantuan }}</h4>
            <p class="text-[10px] text-[#404943] mt-1">{{ formatTarikh(item.tarikh_mohon) }}</p>
          </div>
          <div>
            <span v-if="item.status_permohonan === 'MENUNGGU'" class="px-2.5 py-1 bg-[#F9DEDC] text-[#410E0B] text-[9px] font-bold uppercase rounded-full">Menunggu</span>
            <span v-else-if="item.status_permohonan === 'LULUS'" class="px-2.5 py-1 bg-[#C2E8D3] text-[#052115] text-[9px] font-bold uppercase rounded-full">Diluluskan</span>
            <span v-else class="px-2.5 py-1 bg-gray-200 text-gray-700 text-[9px] font-bold uppercase rounded-full">Ditolak</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../../services/api';

const profil = ref({});
const form = ref({ jenis_bantuan: '', keterangan: '' });
const fileDokumen = ref(null);
const inputDokumen = ref(null);

const isSubmitting = ref(false);
const sejarah = ref([]);
const toast = ref({ show: false, message: '', type: 'success' });

// Tunjuk Notifikasi Snackbar
const paparToast = (msg, type = 'success') => {
  toast.value = { show: true, message: msg, type };
  setTimeout(() => toast.value.show = false, 3000);
};

// Tarik Profil (Untuk Papar Gred SSPA)
const fetchProfil = async () => {
  try {
    const res = await api.get('/ahli/profil');
    profil.value = res.data.data;
  } catch (error) {
    console.error("Gagal menarik profil");
  }
};

// Tarik Sejarah Permohonan
const fetchSejarah = async () => {
  try {
    const res = await api.get('/ahli/bantuan/sejarah'); // Gunakan route yang didaftarkan
    sejarah.value = res.data.data || [];
  } catch (error) {
    console.error("Gagal menarik sejarah");
  }
};

const handleDokumen = (e) => {
  const file = e.target.files[0];
  if (file) fileDokumen.value = file;
};

// Hantar Permohonan (Guna FormData sebab ada fail)
const hantarPermohonan = async () => {
  isSubmitting.value = true;
  
  const formData = new FormData();
  formData.append('jenis_bantuan', form.value.jenis_bantuan);
  formData.append('keterangan', form.value.keterangan);
  if (fileDokumen.value) {
    formData.append('dokumen', fileDokumen.value); // Pastikan backend terima 'dokumen'
  }

  try {
    const res = await api.post('/ahli/bantuan', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    paparToast(res.data.message || "Permohonan berjaya dihantar!", "success");
    
    // Reset Form
    form.value = { jenis_bantuan: '', keterangan: '' };
    fileDokumen.value = null;
    if(inputDokumen.value) inputDokumen.value.value = '';
    
    fetchSejarah(); // Refresh sejarah
  } catch (error) {
    paparToast(error.response?.data?.message || "Ralat menghantar permohonan.", "error");
  } finally {
    isSubmitting.value = false;
  }
};

const formatTarikh = (tarikh) => {
  if(!tarikh) return '';
  const d = new Date(tarikh);
  return d.toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' });
};

onMounted(() => {
  fetchProfil();
  fetchSejarah();
});
</script>

<style scoped>
.tap-transparent { -webkit-tap-highlight-color: transparent; }

/* Animasi Snackbar Bawah MD3 */
.md-slide-up-enter-active, .md-slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
}
.md-slide-up-enter-from, .md-slide-up-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>
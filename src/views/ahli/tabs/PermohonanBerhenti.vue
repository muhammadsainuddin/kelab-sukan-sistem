<template>
  <div class="p-4 max-w-2xl mx-auto space-y-6 pb-24 animate-fade-in">
    
    <div class="px-2 pt-2">
      <h2 class="text-2xl font-black text-[#191C1A] tracking-tight uppercase">Penamatan Keahlian</h2>
      <p class="text-xs text-gray-500 mt-1 font-medium">Proses permohonan berhenti dari Kelab Sukan PERHILITAN.</p>
    </div>

    <div class="bg-[#F9DEDC] rounded-[28px] p-6 border border-[#F2B8B5] space-y-3">
      <div class="flex items-center gap-3 text-[#410E0B]">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <h3 class="font-black text-sm uppercase tracking-wider">Perhatian Penting</h3>
      </div>
      <ul class="text-[11px] text-[#410E0B] space-y-1 font-medium leading-relaxed list-disc ml-9">
        <li>Segala sumbangan yuran tidak akan dikembalikan.</li>
        <li>Anda tidak lagi layak menyertai aktiviti sukan (SAKOM).</li>
        <li>Kelayakan bantuan kebajikan akan dibatalkan serta-merta.</li>
      </ul>
    </div>

    <div class="bg-white rounded-[28px] border border-gray-200 p-6 shadow-sm">
      <form @submit.prevent="hantarPermohonan" class="space-y-6">
        
        <div class="space-y-2">
          <label class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Sebab Penamatan</label>
          <div class="grid grid-cols-1 gap-3">
            <label v-for="sebab in senaraiSebab" :key="sebab" 
                   class="relative flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all"
                   :class="form.sebab_utama === sebab ? 'border-[#0F4C3A] bg-green-50' : 'border-gray-100 bg-gray-50/50 hover:border-gray-300'">
              <input type="radio" v-model="form.sebab_utama" :value="sebab" class="hidden">
              <div class="flex items-center justify-between w-full">
                <span class="text-xs font-bold text-gray-700 uppercase tracking-tight">{{ sebab }}</span>
                <div v-if="form.sebab_utama === sebab" class="w-5 h-5 bg-[#0F4C3A] rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                </div>
              </div>
            </label>
          </div>
        </div>

        <div class="space-y-2">
          <label class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Ulasan / Catatan Tambahan</label>
          <textarea v-model="form.ulasan" rows="3" placeholder="Nyatakan butiran lanjut (Contoh: Berpindah ke Jabatan Perhutanan pada tarikh...)" 
                    class="w-full border border-gray-300 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-[#0F4C3A] outline-none transition-all resize-none"></textarea>
        </div>

        <button type="submit" :disabled="loading || !form.sebab_utama" 
                class="w-full py-4 bg-[#E30613] hover:bg-black text-white text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-lg active:scale-95 transition-all disabled:opacity-30">
          {{ loading ? 'Memproses...' : 'Sahkan Permohonan Berhenti' }}
        </button>
      </form>
    </div>

    <div v-if="statusBerhenti" class="bg-white rounded-[28px] border border-gray-200 p-6 shadow-sm flex items-center justify-between">
      <div>
        <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Status Permohonan</p>
        <p class="text-sm font-bold text-[#E30613] mt-1 uppercase">{{ statusBerhenti.status_permohonan }}</p>
      </div>
      <div class="text-right">
        <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Tarikh Mohon</p>
        <p class="text-xs font-bold text-gray-700 mt-1">{{ formatTarikh(statusBerhenti.tarikh_mohon) }}</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../../services/api';

const loading = ref(false);
const statusBerhenti = ref(null);
const senaraiSebab = [
  'Berhenti Kerja (Resignation)',
  'Berpindah Jabatan / Kementerian',
  'Bersara (Wajib / Pilihan)',
  'Lain-lain Alasan'
];

const form = ref({
  sebab_utama: '',
  ulasan: ''
});

const fetchStatus = async () => {
  try {
    const res = await api.get('/ahli/profil'); // Guna endpoint profil untuk cek status_ahli
    // Jika status sudah dalam proses, kita boleh tarik dari jadual berhenti
    if(res.data.data.status_ahli === 'PROSES BERHENTI') {
       // Logic tarik detail permohonan jika perlu
    }
  } catch (e) {}
};

const hantarPermohonan = async () => {
  if(!confirm("ADAKAH ANDA PASTI? Tindakan ini akan membatalkan status keahlian anda setelah disahkan oleh Admin.")) return;

  loading.value = true;
  try {
    const payload = {
      sebab_berhenti: `${form.value.sebab_utama}: ${form.value.ulasan}`
    };
    const res = await api.post('/ahli/mohon-berhenti', payload);
    alert(res.data.message);
    window.location.reload(); // Refresh untuk update UI
  } catch (error) {
    alert(error.response?.data?.message || "Gagal menghantar permohonan.");
  } finally {
    loading.value = false;
  }
};

const formatTarikh = (t) => t ? new Date(t).toLocaleDateString('ms-MY') : '-';

onMounted(fetchStatus);
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
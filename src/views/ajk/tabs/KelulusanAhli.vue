<template>
  <div class="space-y-6 animate-fade-in">
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-orange-500 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h3 class="text-sm font-black text-gray-800 uppercase tracking-widest">Permohonan Menunggu Pengesahan</h3>
        <p class="text-xs text-gray-500 font-medium mt-1">Sila pastikan yuran/borang potongan telah diterima sebelum meluluskan penjanaan No. Ahli rasmi.</p>
      </div>
      <button @click="fetchMenunggu" class="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg border border-gray-200 transition-colors shadow-sm flex items-center gap-2 outline-none" title="Muat Semula Senarai">
        <svg :class="{'animate-spin text-[#0F4C3A]': loading}" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        <span class="text-[10px] font-black uppercase tracking-widest">Muat Semula</span>
      </button>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left text-sm whitespace-nowrap">
          <thead class="bg-gray-50 border-b border-gray-200 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <tr>
              <th class="px-6 py-4">Pemohon</th>
              <th class="px-6 py-4">Maklumat Jawatan</th>
              <th class="px-6 py-4">Status & Yuran</th>
              <th class="px-6 py-4 text-center">Tindakan Pengesahan</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            
            <tr v-if="loading">
              <td colspan="4" class="p-10 text-center">
                <div class="flex flex-col items-center justify-center gap-3">
                  <span class="w-6 h-6 border-2 border-gray-200 border-t-[#0F4C3A] rounded-full animate-spin"></span>
                  <span class="text-gray-400 font-bold tracking-widest text-[10px] uppercase">Menarik data pelayan...</span>
                </div>
              </td>
            </tr>
            
            <tr v-else-if="senarai.length === 0">
              <td colspan="4" class="p-12 text-center">
                <div class="flex flex-col items-center justify-center gap-2">
                  <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <p class="text-gray-500 font-black tracking-widest text-xs uppercase">Tiada Permohonan Baharu</p>
                  <p class="text-gray-400 text-[10px] uppercase tracking-wider">Semua rekod telah disahkan.</p>
                </div>
              </td>
            </tr>
            
            <tr v-for="a in senarai" :key="a.no_kp" class="hover:bg-gray-50 transition-colors group">
              
              <td class="px-6 py-4">
                <p class="font-black text-gray-900 uppercase">{{ a.nama_pegawai }}</p>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-[10px] text-gray-400 font-mono font-bold border border-gray-200 px-1.5 rounded">IC: {{ a.no_kp }}</span>
                </div>
                <p class="text-[10px] text-gray-500 font-medium mt-1">{{ a.email }}</p>
              </td>
              
              <td class="px-6 py-4">
                <span class="text-[10px] font-black text-[#0F4C3A] bg-green-50 border border-green-100 px-2 py-0.5 rounded uppercase shadow-sm">
                  GRED: {{ a.gred_sspa || 'TIADA' }}
                </span>
                <p class="text-[10px] text-gray-600 font-bold uppercase mt-2 max-w-[200px] truncate" :title="a.penempatan">
                  {{ a.penempatan || 'TIADA PENEMPATAN' }}
                </p>
              </td>
              
              <td class="px-6 py-4">
                <span class="text-xs font-black text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded shadow-sm">
                  RM {{ a.yuran_bulanan ? parseFloat(a.yuran_bulanan).toFixed(2) : '0.00' }}
                </span>
                <p class="text-[10px] text-gray-500 font-bold uppercase mt-2 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                  {{ a.pilihan_potongan || 'Belum Dipilih' }}
                </p>
              </td>
              
              <td class="px-6 py-4 text-center space-x-2">
                <button 
                  @click="sahkan(a.no_kp, 'Aktif')" 
                  :disabled="isProcessing === a.no_kp" 
                  class="px-4 py-2.5 bg-[#0F4C3A] text-white text-[10px] font-black uppercase tracking-[0.1em] rounded-lg shadow-md hover:bg-[#0b3b28] hover:shadow-lg active:scale-95 transition-all disabled:opacity-50 inline-flex items-center gap-1.5"
                >
                  <svg v-if="isProcessing === a.no_kp" class="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                  <svg v-else class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                  LULUS & JANA ID
                </button>
                
                <button 
                  @click="sahkan(a.no_kp, 'Ditolak')" 
                  :disabled="isProcessing === a.no_kp" 
                  class="px-4 py-2.5 bg-white border border-red-200 text-red-600 text-[10px] font-black uppercase tracking-[0.1em] rounded-lg hover:bg-red-50 hover:border-red-300 active:scale-95 transition-all disabled:opacity-50 inline-flex items-center gap-1"
                >
                  TOLAK
                </button>
              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../../services/api';

const emit = defineEmits(['show-alert']);

const senarai = ref([]);
const loading = ref(true);
const isProcessing = ref(null); // Menyimpan ID user yang sedang diproses

const fetchMenunggu = async () => {
  loading.value = true;
  try {
    const res = await api.get('/admin/pengesahan');
    senarai.value = res.data.data;
  } catch (e) { 
    emit('show-alert', { msg: 'Gagal memuatkan senarai kelulusan pelayan.', type: 'error' }); 
  } finally {
    loading.value = false;
  }
};

const sahkan = async (no_kp, status_keputusan) => {
  const actionText = status_keputusan === 'Aktif' 
    ? 'MENGESAHKAN pendaftaran dan MENJANA No. Ahli' 
    : 'MENOLAK permohonan';
    
  if(!confirm(`Adakah anda pasti untuk ${actionText} ini?`)) return;
  
  isProcessing.value = no_kp;
  try {
    const res = await api.put(`/admin/pengesahan/${no_kp}`, { status_keputusan });
    
    // Alert kejayaan, dan refresh senarai
    alert(res.data.message); // Boleh tukar guna eventBus/Toast jika ada
    fetchMenunggu();
  } catch (error) {
    alert('Ralat semasa pengesahan sistem.');
  } finally {
    isProcessing.value = null;
  }
};

onMounted(fetchMenunggu);
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.custom-scrollbar::-webkit-scrollbar { height: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
</style>
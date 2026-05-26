<template>
  <div class="space-y-6 animate-fade-in">
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-amber-500 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h3 class="text-sm font-black text-gray-800 uppercase tracking-widest">Pemantauan & Pengesahan Manual</h3>
        <p class="text-xs text-gray-500 font-medium mt-1">Sistem FPX meluluskan pendaftaran secara automatik. Kelulusan manual ini hanya jika berlaku ralat transaksi bank.</p>
      </div>
      <button @click="fetchMenunggu" class="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg border border-gray-200 transition-colors shadow-sm flex items-center gap-2 outline-none" title="Muat Semula Senarai">
        <svg :class="{'animate-spin text-amber-600': loading}" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        <span class="text-[10px] font-black uppercase tracking-widest">Muat Semula</span>
      </button>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left text-sm whitespace-nowrap">
          <thead class="bg-gray-50 border-b border-gray-200 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <tr>
              <th class="px-6 py-4">Maklumat Kakitangan</th>
              <th class="px-6 py-4">Jawatan / PTJ</th>
              <th class="px-6 py-4 text-center">Yuran & Saluran</th>
              <th class="px-6 py-4 text-center">Tindakan (Override)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            
            <tr v-if="loading">
              <td colspan="4" class="p-10 text-center">
                <div class="flex flex-col items-center justify-center gap-3">
                  <span class="w-6 h-6 border-2 border-gray-200 border-t-amber-500 rounded-full animate-spin"></span>
                  <span class="text-gray-400 font-bold tracking-widest text-[10px] uppercase">Menarik data pelayan...</span>
                </div>
              </td>
            </tr>
            
            <tr v-else-if="senarai.length === 0">
              <td colspan="4" class="p-12 text-center">
                <div class="flex flex-col items-center justify-center gap-2">
                  <div class="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p class="text-gray-600 font-black tracking-widest text-xs uppercase">Sistem FPX Berjalan Lancar</p>
                  <p class="text-gray-400 text-[10px] uppercase tracking-wider">Tiada ahli yang tersangkut di peringkat pendaftaran.</p>
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
                <p class="text-[10px] text-gray-600 font-bold uppercase mt-2 max-w-[200px] truncate" :title="a.penempatan || a.nama_ptj">
                  {{ a.penempatan || a.nama_ptj || 'TIADA PENEMPATAN' }}
                </p>
              </td>
              
              <td class="px-6 py-4 text-center">
                <span class="text-xs font-black text-gray-800 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded shadow-sm">
                  RM {{ a.yuran_bulanan ? parseFloat(a.yuran_bulanan).toFixed(2) : '0.00' }}
                </span>
                <div class="mt-2">
                  <span v-if="a.pilihan_potongan === 'Tunai / Transfer' || a.pilihan_potongan === 'Potongan FPX (ToyyibPay)'" class="inline-flex items-center px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded text-[9px] font-black uppercase tracking-widest">
                    FPX Gateway
                  </span>
                  <span v-else class="inline-flex items-center px-2 py-0.5 bg-green-50 text-green-700 border border-green-100 rounded text-[9px] font-black uppercase tracking-widest">
                    Biro Angkasa
                  </span>
                </div>
              </td>
              
              <td class="px-6 py-4 text-center space-x-2">
                <button 
                  @click="sahkan(a.no_kp, 'Aktif')" 
                  :disabled="isProcessing === a.no_kp" 
                  class="px-4 py-2.5 bg-amber-600 text-white text-[10px] font-black uppercase tracking-[0.1em] rounded-lg shadow-md hover:bg-amber-700 hover:shadow-lg active:scale-95 transition-all disabled:opacity-50 inline-flex items-center gap-1.5"
                >
                  <svg v-if="isProcessing === a.no_kp" class="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                  <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                  LULUS MANUAL
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
const isProcessing = ref(null); 

const fetchMenunggu = async () => {
  loading.value = true;
  try {
    const res = await api.get('/admin/pengesahan');
    // Tarik senarai ahli yang masih "Menunggu Kelulusan" atau "TIDAK BERBAYAR"
    senarai.value = res.data.data;
  } catch (e) { 
    emit('show-alert', { msg: 'Gagal memuatkan senarai dari pelayan.', type: 'error' }); 
  } finally {
    loading.value = false;
  }
};

const sahkan = async (no_kp, status_keputusan) => {
  let confirmMsg = '';

  if (status_keputusan === 'Aktif') {
    confirmMsg = 'AMARAN MANUAL OVERRIDE:\n\nSistem FPX sepatutnya meluluskan akaun ini secara automatik. Adakah anda pasti ingin MELULUSKAN akaun ini secara manual?\n\nSila pastikan bayaran telah disemak di penyata bank kelab.';
  } else {
    confirmMsg = 'Adakah anda pasti untuk MENOLAK permohonan pendaftaran ini?';
  }
    
  if(!confirm(confirmMsg)) return;
  
  isProcessing.value = no_kp;
  try {
    const res = await api.put(`/admin/pengesahan/${no_kp}`, { status_keputusan });
    
    alert(res.data.message); 
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
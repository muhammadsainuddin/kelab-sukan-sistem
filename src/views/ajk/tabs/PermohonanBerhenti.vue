<template>
  <div class="space-y-6 animate-fade-in">
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-[#E30613] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h3 class="text-sm font-black text-gray-800 uppercase tracking-widest">Pengurusan Penamatan Keahlian</h3>
        <p class="text-xs text-gray-500 font-medium mt-1">Sahkan permohonan berhenti ahli. Kelulusan akan membatalkan segala faedah kelab.</p>
      </div>
      <button @click="fetchSenarai" class="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg border border-gray-200 transition-colors shadow-sm flex items-center gap-2 outline-none">
        <svg :class="{'animate-spin text-[#E30613]': loading}" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        <span class="text-[10px] font-black uppercase tracking-widest">Muat Semula</span>
      </button>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left text-sm whitespace-nowrap">
          <thead class="bg-gray-50 border-b border-gray-200 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <tr>
              <th class="px-6 py-4">Maklumat Ahli</th>
              <th class="px-6 py-4">Sebab Berhenti</th>
              <th class="px-6 py-4 text-center">Status</th>
              <th class="px-6 py-4 text-center">Tindakan Admin</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            
            <tr v-if="loading">
              <td colspan="4" class="p-10 text-center">
                <div class="flex flex-col items-center justify-center gap-3">
                  <span class="w-6 h-6 border-2 border-gray-200 border-t-[#E30613] rounded-full animate-spin"></span>
                  <span class="text-gray-400 font-bold tracking-widest text-[10px] uppercase">Menarik data pelayan...</span>
                </div>
              </td>
            </tr>
            
            <tr v-else-if="senarai.length === 0">
              <td colspan="4" class="p-12 text-center">
                <div class="flex flex-col items-center justify-center gap-2">
                  <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                  </div>
                  <p class="text-gray-500 font-black tracking-widest text-xs uppercase">Tiada Permohonan Berhenti</p>
                </div>
              </td>
            </tr>
            
            <tr v-else v-for="b in senarai" :key="b.id" class="hover:bg-red-50/30 transition-colors">
              
              <td class="px-6 py-4">
                <p class="font-black text-gray-900 uppercase">{{ b.nama_pegawai }}</p>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-[10px] text-gray-400 font-mono font-bold border border-gray-200 px-1.5 rounded">{{ b.no_kp }}</span>
                  <span class="text-[9px] font-bold text-gray-500 uppercase">{{ b.penempatan }}</span>
                </div>
                <p class="text-[9px] text-gray-400 font-bold mt-2 tracking-widest flex items-center gap-1">
                  MOHON: {{ formatTarikh(b.tarikh_mohon) }}
                </p>
              </td>
              
              <td class="px-6 py-4">
                <p class="text-xs text-gray-600 font-medium max-w-xs whitespace-normal line-clamp-3 italic bg-gray-50 p-2 rounded border border-gray-100">
                  "{{ b.sebab_berhenti || 'Tiada alasan diberikan' }}"
                </p>
              </td>
              
              <td class="px-6 py-4 text-center">
                <span v-if="b.status_permohonan === 'MENUNGGU'" class="px-2.5 py-1 bg-orange-100 text-orange-700 text-[9px] font-black uppercase tracking-widest rounded shadow-sm border border-orange-200 animate-pulse">Memproses</span>
                <span v-else-if="b.status_permohonan === 'LULUS'" class="px-2.5 py-1 bg-red-100 text-red-700 text-[9px] font-black uppercase tracking-widest rounded shadow-sm border border-red-200">Telah Dibuang</span>
                <span v-else class="px-2.5 py-1 bg-green-100 text-green-700 text-[9px] font-black uppercase tracking-widest rounded shadow-sm border border-green-200">Kekal Aktif</span>
              </td>
              
              <td class="px-6 py-4 text-center">
                <div v-if="b.status_permohonan === 'MENUNGGU'" class="flex justify-center items-center gap-2">
                  <button 
                    @click="kemaskiniStatus(b.id, b.no_kp, 'LULUS')" 
                    :disabled="isProcessing === b.id"
                    class="px-4 py-2 bg-[#E30613] text-white text-[9px] font-black uppercase tracking-widest rounded-md shadow-md hover:bg-black active:scale-95 transition-all disabled:opacity-50"
                  >
                    SAHKAN BERHENTI
                  </button>
                  <button 
                    @click="kemaskiniStatus(b.id, b.no_kp, 'DITOLAK')" 
                    :disabled="isProcessing === b.id"
                    class="px-4 py-2 bg-white border border-gray-300 text-gray-600 text-[9px] font-black uppercase tracking-widest rounded-md hover:bg-gray-100 active:scale-95 transition-all disabled:opacity-50"
                  >
                    BATALKAN
                  </button>
                </div>
                <div v-else>
                  <span class="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Selesai</span>
                </div>
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

const senarai = ref([]);
const loading = ref(true);
const isProcessing = ref(null);

const fetchSenarai = async () => {
  loading.value = true;
  try {
    const res = await api.get('/admin/berhenti');
    senarai.value = res.data.data;
  } catch (error) {
    alert("Gagal memuatkan senarai permohonan berhenti.");
  } finally {
    loading.value = false;
  }
};

const kemaskiniStatus = async (id, no_kp, status_permohonan) => {
  const amaran = status_permohonan === 'LULUS' 
    ? 'AMARAN: Ini akan membuang ahli dari kelab secara rasmi. Teruskan?' 
    : 'Permohonan berhenti akan ditolak dan ahli akan kekal aktif. Teruskan?';

  if(!confirm(amaran)) return;
  
  isProcessing.value = id;
  try {
    const res = await api.put(`/admin/berhenti/${id}`, { no_kp, status_permohonan });
    alert(res.data.message);
    fetchSenarai(); // Refresh data
  } catch (error) {
    alert("Ralat mengemas kini status permohonan.");
  } finally {
    isProcessing.value = null;
  }
};

const formatTarikh = (tarikh) => {
  if(!tarikh) return '';
  const d = new Date(tarikh);
  return d.toLocaleDateString('ms-MY', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

onMounted(fetchSenarai);
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
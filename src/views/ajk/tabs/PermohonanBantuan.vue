<template>
  <div class="space-y-6 animate-fade-in">
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-blue-600 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h3 class="text-sm font-black text-gray-800 uppercase tracking-widest">Pengurusan Bantuan Kebajikan</h3>
        <p class="text-xs text-gray-500 font-medium mt-1">Sahkan permohonan dan dokumen tuntutan ahli mengikut pekeliling kelab.</p>
      </div>
      <button @click="fetchKebajikan" class="p-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg border border-gray-200 transition-colors shadow-sm flex items-center gap-2 outline-none" title="Muat Semula Senarai">
        <svg :class="{'animate-spin text-blue-600': loading}" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        <span class="text-[10px] font-black uppercase tracking-widest">Muat Semula</span>
      </button>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left text-sm whitespace-nowrap">
          <thead class="bg-gray-50 border-b border-gray-200 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <tr>
              <th class="px-6 py-4">Pemohon</th>
              <th class="px-6 py-4">Jenis Tuntutan</th>
              <th class="px-6 py-4 text-center">Status</th>
              <th class="px-6 py-4 text-center">Tindakan Kelulusan</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            
            <tr v-if="loading">
              <td colspan="4" class="p-10 text-center">
                <div class="flex flex-col items-center justify-center gap-3">
                  <span class="w-6 h-6 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin"></span>
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
                  <p class="text-gray-500 font-black tracking-widest text-xs uppercase">Tiada Rekod Permohonan</p>
                  <p class="text-gray-400 text-[10px] uppercase tracking-wider">Belum ada tuntutan baharu dikemukakan.</p>
                </div>
              </td>
            </tr>
            
            <tr v-else v-for="b in senarai" :key="b.id" class="hover:bg-blue-50/30 transition-colors group">
              
              <td class="px-6 py-4">
                <p class="font-black text-gray-900 uppercase">{{ b.nama_pegawai }}</p>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-[10px] text-gray-400 font-mono font-bold border border-gray-200 px-1.5 rounded">{{ b.no_kp }}</span>
                  <span class="text-[9px] font-bold text-gray-500 uppercase">{{ b.penempatan }}</span>
                </div>
                <p class="text-[9px] text-gray-400 font-bold mt-2 tracking-widest">TARIKH: {{ formatTarikh(b.tarikh_mohon) }}</p>
              </td>
              
              <td class="px-6 py-4">
                <span class="text-[10px] font-black text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded uppercase shadow-sm">
                  {{ b.jenis_bantuan }}
                </span>
                <p class="text-xs text-gray-600 font-medium mt-2 max-w-xs whitespace-normal line-clamp-2" :title="b.keterangan">
                  "{{ b.keterangan || 'Tiada keterangan tambahan' }}"
                </p>
                
                <a v-if="b.dokumen_sokongan" :href="`http://localhost:5000/uploads/images/${b.dokumen_sokongan}`" target="_blank" class="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-[#E30613] hover:underline">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>
                  Lihat Dokumen
                </a>
              </td>
              
              <td class="px-6 py-4 text-center">
                <span v-if="b.status_permohonan === 'MENUNGGU'" class="px-2.5 py-1 bg-orange-100 text-orange-700 text-[9px] font-black uppercase tracking-widest rounded shadow-sm border border-orange-200">Menunggu</span>
                <span v-else-if="b.status_permohonan === 'LULUS'" class="px-2.5 py-1 bg-green-100 text-green-700 text-[9px] font-black uppercase tracking-widest rounded shadow-sm border border-green-200">Diluluskan</span>
                <span v-else class="px-2.5 py-1 bg-red-100 text-red-700 text-[9px] font-black uppercase tracking-widest rounded shadow-sm border border-red-200">Ditolak</span>
              </td>
              
              <td class="px-6 py-4 text-center">
                <div v-if="b.status_permohonan === 'MENUNGGU'" class="flex justify-center items-center gap-2">
                  <button 
                    @click="kemaskiniStatus(b.id, 'LULUS')" 
                    :disabled="isProcessing === b.id"
                    class="px-4 py-2 bg-[#0F4C3A] text-white text-[9px] font-black uppercase tracking-widest rounded-md shadow-md hover:bg-[#0b3b28] active:scale-95 transition-all disabled:opacity-50"
                  >
                    LULUSKAN
                  </button>
                  <button 
                    @click="kemaskiniStatus(b.id, 'DITOLAK')" 
                    :disabled="isProcessing === b.id"
                    class="px-4 py-2 bg-white border border-red-200 text-red-600 text-[9px] font-black uppercase tracking-widest rounded-md hover:bg-red-50 active:scale-95 transition-all disabled:opacity-50"
                  >
                    TOLAK
                  </button>
                </div>
                <div v-else>
                  <span class="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Telah Diproses</span>
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

const fetchKebajikan = async () => {
  loading.value = true;
  try {
    const res = await api.get('/admin/kebajikan');
    senarai.value = res.data.data;
  } catch (error) {
    alert("Gagal memuatkan senarai permohonan kebajikan.");
  } finally {
    loading.value = false;
  }
};

const kemaskiniStatus = async (id, status_permohonan) => {
  if(!confirm(`Adakah anda pasti untuk menukar status tuntutan ini kepada ${status_permohonan}?`)) return;
  
  isProcessing.value = id;
  try {
    const res = await api.put(`/admin/kebajikan/${id}`, { status_permohonan });
    alert(res.data.message);
    fetchKebajikan(); // Refresh jadual
  } catch (error) {
    alert("Ralat mengemas kini status.");
  } finally {
    isProcessing.value = null;
  }
};

const formatTarikh = (tarikh) => {
  if(!tarikh) return '';
  const d = new Date(tarikh);
  return d.toLocaleDateString('ms-MY', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

onMounted(fetchKebajikan);
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
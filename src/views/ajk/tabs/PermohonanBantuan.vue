<template>
  <div class="flex flex-col h-full space-y-4">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200 shrink-0 border-l-8 border-[#E30613]">
      <div>
        <h1 class="text-2xl font-black text-gray-900 uppercase italic">Bantuan <span class="text-[#E30613]">Kebajikan</span></h1>
        <p class="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Jumlah Permohonan: {{ senarai.length }} Rekod</p>
      </div>
      <button @click="fetchKebajikan" class="px-6 py-2.5 bg-white hover:bg-[#060d0b] hover:text-white border border-gray-300 hover:border-black text-gray-700 text-[9px] font-black uppercase tracking-widest rounded-lg shadow-sm transition-all inline-flex items-center gap-2 active:scale-95">
        <svg :class="{'animate-spin text-[#E30613]': loading}" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        Muat Semula
      </button>
    </div>

    <div class="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[400px]">
      <div class="overflow-y-auto flex-1 custom-scrollbar">
        <table class="w-full text-left text-sm relative border-collapse">
          <thead class="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 shadow-sm">
            <tr class="text-[9px] font-black uppercase text-gray-500 tracking-widest">
              <th class="px-6 py-4">Pemohon</th>
              <th class="px-6 py-4">Jenis Tuntutan</th>
              <th class="px-6 py-4 text-center">Status</th>
              <th class="px-6 py-4 text-right">Tindakan Kelulusan</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="loading" class="animate-pulse"><td colspan="4" class="px-6 py-10 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">Menarik Data Pemain...</td></tr>
            <tr v-else-if="senarai.length === 0"><td colspan="4" class="px-6 py-10 text-center text-[#E30613] font-bold uppercase tracking-widest text-xs">Tiada rekod permohonan.</td></tr>

            <tr v-for="b in senarai" :key="b.id" class="hover:bg-gray-50 transition-colors group">
              <td class="px-6 py-4">
                <p class="font-black text-gray-900 group-hover:text-[#E30613] uppercase">{{ b.nama_pegawai }}</p>
                <p class="text-[11px] text-gray-400 font-mono font-bold mt-0.5">IC: {{ b.no_kp }}</p>
                <p class="text-[9px] font-bold text-gray-500 uppercase mt-1">{{ b.penempatan }}</p>
                <p class="text-[9px] text-gray-400 font-bold mt-1 tracking-widest">TARIKH: {{ formatTarikh(b.tarikh_mohon) }}</p>
              </td>
              <td class="px-6 py-4">
                <span class="text-[9px] font-black text-gray-700 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded uppercase">{{ b.jenis_bantuan }}</span>
                <p class="text-xs text-gray-600 font-medium mt-2 max-w-xs whitespace-normal line-clamp-2 italic">"{{ b.keterangan || 'Tiada keterangan' }}"</p>
                <a v-if="b.dokumen_sokongan" :href="`${apiBase}/uploads/images/${b.dokumen_sokongan}`" target="_blank" class="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-[#E30613] hover:underline uppercase tracking-widest">Lihat Dokumen</a>
              </td>
              <td class="px-6 py-4 text-center">
                <span v-if="b.status_permohonan === 'MENUNGGU'" class="px-2 py-1 text-amber-700 bg-amber-50 border-amber-200 text-[9px] font-black uppercase tracking-widest rounded border shadow-sm inline-block">Menunggu</span>
                <span v-else-if="b.status_permohonan === 'LULUS'" class="px-2 py-1 text-[#70B130] bg-green-50 border-green-200 text-[9px] font-black uppercase tracking-widest rounded border shadow-sm inline-block">Diluluskan</span>
                <span v-else class="px-2 py-1 text-red-700 bg-red-50 border-red-200 text-[9px] font-black uppercase tracking-widest rounded border shadow-sm inline-block">Ditolak</span>
              </td>
              <td class="px-6 py-4 text-right">
                <div v-if="b.status_permohonan === 'MENUNGGU'" class="flex justify-end gap-2">
                  <button @click="kemaskiniStatus(b.id, 'LULUS')" :disabled="isProcessing === b.id" class="px-4 py-2 bg-[#E30613] hover:bg-red-700 text-white text-[9px] font-black uppercase tracking-widest rounded shadow-sm transition-all disabled:opacity-50 italic active:scale-95">Luluskan</button>
                  <button @click="kemaskiniStatus(b.id, 'DITOLAK')" :disabled="isProcessing === b.id" class="px-4 py-2 bg-white border border-gray-300 hover:border-black text-gray-700 text-[9px] font-black uppercase tracking-widest rounded shadow-sm transition-all disabled:opacity-50 active:scale-95">Tolak</button>
                </div>
                <span v-else class="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Telah Diproses</span>
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

const apiBase = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5001';
const senarai = ref([]);
const loading = ref(true);
const isProcessing = ref(null);

const fetchKebajikan = async () => {
  loading.value = true;
  try {
    const res = await api.get('/admin/kebajikan');
    senarai.value = res.data.data;
  } catch {
    alert('Gagal memuatkan senarai permohonan kebajikan.');
  } finally {
    loading.value = false;
  }
};

const kemaskiniStatus = async (id, status_permohonan) => {
  if (!confirm(`Adakah anda pasti untuk menukar status tuntutan ini kepada ${status_permohonan}?`)) return;
  isProcessing.value = id;
  try {
    const res = await api.put(`/admin/kebajikan/${id}`, { status_permohonan });
    alert(res.data.message);
    fetchKebajikan();
  } catch {
    alert('Ralat mengemas kini status.');
  } finally {
    isProcessing.value = null;
  }
};

const formatTarikh = (tarikh) => {
  if (!tarikh) return '';
  return new Date(tarikh).toLocaleDateString('ms-MY', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

onMounted(fetchKebajikan);
</script>

<template>
  <div class="flex flex-col h-full space-y-4">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200 shrink-0 border-l-8 border-[#E30613]">
      <div>
        <h1 class="text-2xl font-black text-gray-900 uppercase italic">Rekod Transaksi <span class="text-[#E30613]">FPX</span></h1>
        <p class="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Jumlah Rekod: {{ filteredSenarai.length }} Transaksi</p>
      </div>
      <div class="relative w-full sm:w-64">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </span>
        <input v-model="searchQuery" type="text" placeholder="Cari Nama, IC atau Kod Bil..." class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-xs font-bold focus:ring-2 focus:ring-[#E30613] outline-none transition-all shadow-inner">
      </div>
    </div>

    <div v-if="fetchError" class="bg-white border border-red-200 rounded-xl p-12 text-center shadow-sm">
      <p class="text-[10px] font-black text-[#E30613] uppercase tracking-widest">{{ fetchError }}</p>
      <button @click="fetchSemuaResit" class="mt-4 px-6 py-2.5 bg-[#E30613] hover:bg-red-700 text-white text-[9px] font-black uppercase tracking-widest rounded-lg transition-all italic">Cuba Semula</button>
    </div>

    <div v-else class="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[400px]">
      <div class="overflow-y-auto flex-1 custom-scrollbar">
        <table class="w-full text-left text-sm relative border-collapse">
          <thead class="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 shadow-sm">
            <tr class="text-[9px] font-black uppercase text-gray-500 tracking-widest">
              <th class="px-6 py-4">Maklumat Ahli</th>
              <th class="px-6 py-4">Rujukan / Tarikh</th>
              <th class="px-6 py-4">Amaun</th>
              <th class="px-6 py-4 text-center">Status</th>
              <th class="px-6 py-4 text-right">Tindakan</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="isLoading" class="animate-pulse"><td colspan="5" class="px-6 py-10 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">Menarik Rekod Transaksi...</td></tr>
            <tr v-else-if="paginatedSenarai.length === 0"><td colspan="5" class="px-6 py-10 text-center text-[#E30613] font-bold uppercase tracking-widest text-xs">Tiada rekod ditemui.</td></tr>

            <tr v-for="resit in paginatedSenarai" :key="resit.id" class="hover:bg-gray-50 transition-colors group">
              <td class="px-6 py-4">
                <p class="font-black text-gray-900 group-hover:text-[#E30613] uppercase">{{ resit.nama_penuh || 'N/A' }}</p>
                <p class="text-[11px] text-gray-400 font-mono font-bold mt-0.5">IC: {{ resit.no_kp }} <span v-if="resit.no_ahli" class="text-[#0F4C3A] ml-1">[{{ resit.no_ahli }}]</span></p>
              </td>
              <td class="px-6 py-4">
                <p class="text-[11px] font-mono font-black text-gray-700">{{ resit.billCode }}</p>
                <p class="text-[9px] font-bold text-gray-400 mt-0.5 uppercase tracking-widest">{{ resit.tarikh }}</p>
              </td>
              <td class="px-6 py-4 text-sm font-black text-gray-900 font-mono">RM{{ parseFloat(resit.amaun).toFixed(2) }}</td>
              <td class="px-6 py-4 text-center">
                <span class="px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest border shadow-sm inline-block"
                      :class="resit.status === 'BERJAYA' ? 'text-[#70B130] bg-green-50 border-green-200' : (resit.status === 'PENDING' ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-red-700 bg-red-50 border-red-200')">
                  {{ resit.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <button @click="bukaInvois(resit)" class="px-4 py-2 bg-white hover:bg-[#060d0b] hover:text-white border border-gray-300 hover:border-black text-gray-700 text-[9px] font-black uppercase tracking-widest rounded shadow-sm transition-all inline-flex active:scale-95">
                  Lihat Resit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between shrink-0">
        <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest">HALAMAN {{ currentPage }} DRP {{ totalPages }}</div>
        <div class="flex gap-2">
          <button @click="currentPage--" :disabled="currentPage === 1" class="p-2 rounded bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-all">&lt;</button>
          <button @click="currentPage++" :disabled="currentPage === totalPages" class="p-2 rounded bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-all">&gt;</button>
        </div>
      </div>
    </div>

    <div v-if="modalInvois.show" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div class="bg-[#060d0b] p-5 flex justify-between items-center shrink-0 border-l-8 border-[#E30613]">
          <h2 class="text-white font-black italic tracking-widest uppercase">Dokumen Resit Rasmi</h2>
          <div class="flex gap-2 items-center">
            <button @click="cetakInvois" class="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[9px] font-black uppercase tracking-widest rounded-lg transition-all">Cetak PDF</button>
            <button @click="tutupInvois" class="text-gray-400 hover:text-[#E30613] transition-colors">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>

        <div id="print-area" class="p-8 overflow-y-auto flex-1 bg-white text-gray-800 custom-scrollbar">
          <div class="flex flex-col sm:flex-row justify-between items-start gap-6 border-b-2 border-[#060d0b] pb-6 mb-6">
            <div class="max-w-sm">
              <h1 class="text-lg font-black text-gray-900 uppercase leading-tight mb-2">Kelab Sukan dan Kebajikan Jabatan Perlindungan Hidupan Liar dan Taman Negara</h1>
              <p class="text-[10px] font-bold text-gray-600 mb-1">No. Pertubuhan: <span class="font-black text-gray-900">PPM-006-14-27071985</span></p>
              <p class="text-[9px] font-bold text-gray-500 leading-relaxed">Ibu Pejabat Jabatan PERHILITAN,<br>KM.10 Jalan Cheras, 56100 Cheras, Kuala Lumpur.</p>
              <p class="text-[9px] font-bold text-[#E30613] mt-1">kelabperhilitan@gmail.com</p>
            </div>
            <div class="text-left sm:text-right w-full sm:w-auto">
              <h2 class="text-3xl font-black uppercase tracking-tighter mb-2" :class="modalInvois.data?.status === 'BERJAYA' ? 'text-green-200' : 'text-gray-200'">INVOIS</h2>
              <div class="inline-block bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 w-full sm:w-auto text-left sm:text-right">
                <p class="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">No. Rujukan Bil</p>
                <p class="text-xs font-mono font-black text-gray-900">{{ modalInvois.data?.billCode }}</p>
              </div>
              <p class="text-[9px] font-bold text-gray-500 mt-2 uppercase">Tarikh: <span class="font-black text-gray-800">{{ modalInvois.data?.tarikh }}</span></p>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
            <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2 mb-2">Ditagihkan Kepada:</p>
            <h3 class="text-sm font-black text-gray-900 uppercase">{{ modalInvois.data?.nama_penuh || 'Ahli Kelab' }}</h3>
            <div class="grid grid-cols-2 gap-4 mt-3">
              <div><p class="text-[8px] text-gray-500 font-bold uppercase tracking-widest">No. K/P</p><p class="text-[11px] font-mono font-black text-gray-800 mt-0.5">{{ modalInvois.data?.no_kp }}</p></div>
              <div v-if="modalInvois.data?.no_ahli"><p class="text-[8px] text-gray-500 font-bold uppercase tracking-widest">No. Ahli</p><p class="text-[11px] font-mono font-black text-gray-800 mt-0.5">{{ modalInvois.data?.no_ahli }}</p></div>
              <div v-if="modalInvois.data?.no_tel"><p class="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Telefon</p><p class="text-[11px] font-mono font-black text-gray-800 mt-0.5">{{ modalInvois.data?.no_tel }}</p></div>
              <div v-if="modalInvois.data?.email"><p class="text-[8px] text-gray-500 font-bold uppercase tracking-widest">E-mel</p><p class="text-[11px] font-black text-gray-800 mt-0.5">{{ modalInvois.data?.email }}</p></div>
            </div>
          </div>

          <table class="w-full mb-6">
            <thead>
              <tr class="bg-[#060d0b] text-white">
                <th class="py-2.5 px-4 text-left text-[9px] font-black uppercase tracking-widest rounded-l-lg">Keterangan Item</th>
                <th class="py-2.5 px-4 text-right text-[9px] font-black uppercase tracking-widest rounded-r-lg">Jumlah (RM)</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-100">
                <td class="py-4 px-4 text-[11px] font-black text-gray-800">{{ modalInvois.data?.keterangan || 'Yuran Sesi Tahunan' }}</td>
                <td class="py-4 px-4 text-right text-sm font-mono font-black text-gray-900">{{ parseFloat(modalInvois.data?.amaun || 0).toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>

          <div class="flex flex-col sm:flex-row justify-between items-end gap-6">
            <div class="relative w-full sm:w-40 h-16 flex items-center justify-center sm:justify-start">
              <div class="absolute inset-0 flex items-center justify-center sm:justify-start rotate-[-15deg] opacity-20 pointer-events-none">
                <span class="text-4xl font-black uppercase tracking-tighter whitespace-nowrap"
                      :class="modalInvois.data?.status === 'BERJAYA' ? 'text-[#70B130]' : (modalInvois.data?.status === 'PENDING' ? 'text-amber-500' : 'text-[#E30613]')">
                  {{ modalInvois.data?.status === 'BERJAYA' ? 'TELAH DIBAYAR' : modalInvois.data?.status }}
                </span>
              </div>
            </div>
            <div class="w-full sm:w-1/2 max-w-xs text-right">
              <div class="flex justify-between py-2 border-b border-gray-100"><span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Subtotal</span><span class="text-xs font-mono font-black text-gray-800">RM {{ parseFloat(modalInvois.data?.amaun || 0).toFixed(2) }}</span></div>
              <div class="flex justify-between py-2 border-b-2 border-[#060d0b]"><span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Caj Transaksi</span><span class="text-xs font-mono font-black text-gray-800">RM 0.00</span></div>
              <div class="flex justify-between py-3 bg-gray-50 px-3 rounded-b-lg"><span class="text-[11px] font-black text-gray-900 uppercase tracking-widest">Jumlah Bersih</span><span class="text-xl font-mono font-black text-[#E30613]">RM {{ parseFloat(modalInvois.data?.amaun || 0).toFixed(2) }}</span></div>
            </div>
          </div>

          <div class="mt-12 pt-4 border-t border-gray-200 text-center">
            <p class="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Ini adalah resit janaan komputer. Tiada tandatangan fizikal diperlukan.</p>
            <p class="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Transaksi disulitkan dan diuruskan oleh ToyyibPay Gateway.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import api from '../../../services/api';

const senaraiResit = ref([]);
const isLoading = ref(true);
const fetchError = ref('');
const searchQuery = ref('');
const modalInvois = ref({ show: false, data: null });
const currentPage = ref(1);
const itemsPerPage = 10;

const fetchSemuaResit = async () => {
  isLoading.value = true;
  fetchError.value = '';
  try {
    const res = await api.get('/admin/sejarah-bayaran');
    if (res.data.success) senaraiResit.value = res.data.data;
  } catch (error) {
    fetchError.value = error.response?.data?.message || 'Gagal memuatkan senarai resit. Sila cuba lagi.';
  } finally {
    isLoading.value = false;
  }
};

const filteredSenarai = computed(() => {
  if (!searchQuery.value) return senaraiResit.value;
  const query = searchQuery.value.toLowerCase();
  return senaraiResit.value.filter(item =>
    (item.nama_penuh && item.nama_penuh.toLowerCase().includes(query)) ||
    (item.no_kp && item.no_kp.toLowerCase().includes(query)) ||
    (item.billCode && item.billCode.toLowerCase().includes(query))
  );
});

const totalPages = computed(() => Math.ceil(filteredSenarai.value.length / itemsPerPage) || 1);
const paginatedSenarai = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredSenarai.value.slice(start, start + itemsPerPage);
});

watch(searchQuery, () => { currentPage.value = 1; });

const bukaInvois = (resit) => { modalInvois.value = { show: true, data: resit }; };
const tutupInvois = () => { modalInvois.value = { show: false, data: null }; };

const cetakInvois = () => {
  const printArea = document.getElementById('print-area');
  if (!printArea) return;
  const win = window.open('', '_blank', 'noopener,noreferrer');
  if (!win) return;
  win.document.write(`<!DOCTYPE html><html><head><title>Resit ${modalInvois.value.data?.billCode || ''}</title><style>body{font-family:system-ui,sans-serif;margin:24px;color:#1f2937}</style></head><body>${printArea.innerHTML}</body></html>`);
  win.document.close();
  win.focus();
  win.print();
  win.close();
};

onMounted(fetchSemuaResit);
</script>

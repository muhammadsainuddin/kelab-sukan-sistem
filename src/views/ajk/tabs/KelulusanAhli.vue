<template>
  <div class="flex flex-col h-full space-y-4">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200 shrink-0 border-l-8 border-[#E30613]">
      <div>
        <h1 class="text-2xl font-black text-gray-900 uppercase italic">Pengesahan <span class="text-[#E30613]">Manual</span></h1>
        <p class="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Menunggu Override: {{ senarai.length }} Rekod</p>
      </div>
      <button @click="fetchMenunggu" class="px-6 py-2.5 bg-white hover:bg-[#060d0b] hover:text-white border border-gray-300 hover:border-black text-gray-700 text-[9px] font-black uppercase tracking-widest rounded-lg shadow-sm transition-all inline-flex items-center gap-2 active:scale-95">
        <svg :class="{'animate-spin text-[#E30613]': loading}" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        Muat Semula
      </button>
    </div>

    <div class="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[400px]">
      <div class="overflow-y-auto flex-1 custom-scrollbar">
        <table class="w-full text-left text-sm relative border-collapse">
          <thead class="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 shadow-sm">
            <tr class="text-[9px] font-black uppercase text-gray-500 tracking-widest">
              <th class="px-6 py-4">Maklumat Kakitangan</th>
              <th class="px-6 py-4">Jawatan / PTJ</th>
              <th class="px-6 py-4 text-center">Yuran & Saluran</th>
              <th class="px-6 py-4 text-right">Tindakan (Override)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="loading" class="animate-pulse"><td colspan="4" class="px-6 py-10 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">Menarik Data Pemain...</td></tr>
            <tr v-else-if="senarai.length === 0"><td colspan="4" class="px-6 py-10 text-center text-[#E30613] font-bold uppercase tracking-widest text-xs">Tiada rekod menunggu — Sistem FPX berjalan lancar.</td></tr>

            <tr v-for="a in senarai" :key="a.no_kp" class="hover:bg-gray-50 transition-colors group">
              <td class="px-6 py-4">
                <p class="font-black text-gray-900 group-hover:text-[#E30613] uppercase">{{ a.nama_pegawai }}</p>
                <p class="text-[11px] text-gray-400 font-mono font-bold mt-0.5">IC: {{ a.no_kp }}</p>
                <p class="text-[10px] text-gray-500 font-medium mt-1">{{ a.email }}</p>
              </td>
              <td class="px-6 py-4">
                <span class="text-[9px] font-bold text-[#0F4C3A] uppercase tracking-widest bg-green-50 px-2 py-0.5 rounded border border-green-100">GRED: {{ a.gred_sspa || 'TIADA' }}</span>
                <p class="text-[10px] text-gray-600 font-bold uppercase mt-2 max-w-[200px] truncate" :title="a.penempatan || a.nama_ptj">{{ a.penempatan || a.nama_ptj || 'TIADA PENEMPATAN' }}</p>
              </td>
              <td class="px-6 py-4 text-center">
                <span class="text-xs font-black text-gray-800 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded shadow-sm">RM {{ a.yuran_bulanan ? parseFloat(a.yuran_bulanan).toFixed(2) : '0.00' }}</span>
                <div class="mt-2">
                  <span v-if="a.pilihan_potongan === 'Tunai / Transfer' || a.pilihan_potongan === 'Potongan FPX (ToyyibPay)'" class="inline-flex px-2 py-0.5 bg-gray-100 text-gray-700 border border-gray-200 rounded text-[9px] font-black uppercase tracking-widest">FPX Gateway</span>
                  <span v-else class="inline-flex px-2 py-0.5 bg-green-50 text-[#0F4C3A] border border-green-100 rounded text-[9px] font-black uppercase tracking-widest">Biro Angkasa</span>
                </div>
              </td>
              <td class="px-6 py-4 text-right space-x-2">
                <button @click="sahkan(a.no_kp, 'Aktif')" :disabled="isProcessing === a.no_kp" class="px-4 py-2 bg-[#E30613] hover:bg-red-700 text-white text-[9px] font-black uppercase tracking-widest rounded shadow-sm transition-all disabled:opacity-50 inline-flex active:scale-95 italic">Lulus Manual</button>
                <button @click="sahkan(a.no_kp, 'Ditolak')" :disabled="isProcessing === a.no_kp" class="px-4 py-2 bg-white border border-gray-300 hover:border-black text-gray-700 text-[9px] font-black uppercase tracking-widest rounded shadow-sm transition-all disabled:opacity-50 inline-flex active:scale-95">Tolak</button>
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
    senarai.value = res.data.data;
  } catch (e) {
    emit('show-alert', { msg: 'Gagal memuatkan senarai dari pelayan.', type: 'error' });
  } finally {
    loading.value = false;
  }
};

const sahkan = async (no_kp, status_keputusan) => {
  const confirmMsg = status_keputusan === 'Aktif'
    ? 'AMARAN MANUAL OVERRIDE:\n\nSistem FPX sepatutnya meluluskan akaun ini secara automatik. Adakah anda pasti ingin MELULUSKAN akaun ini secara manual?\n\nSila pastikan bayaran telah disemak di penyata bank kelab.'
    : 'Adakah anda pasti untuk MENOLAK permohonan pendaftaran ini?';
  if (!confirm(confirmMsg)) return;

  isProcessing.value = no_kp;
  try {
    const res = await api.put(`/admin/pengesahan/${no_kp}`, { status_keputusan });
    alert(res.data.message);
    fetchMenunggu();
  } catch {
    alert('Ralat semasa pengesahan sistem.');
  } finally {
    isProcessing.value = null;
  }
};

onMounted(fetchMenunggu);
</script>

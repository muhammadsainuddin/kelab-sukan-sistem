<template>
  <div class="flex flex-col h-full space-y-4">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200 shrink-0 border-l-8 border-[#E30613]">
      <div>
        <h1 class="text-2xl font-black text-gray-900 uppercase italic">Senarai Ahli <span class="text-[#E30613]">Berdaftar</span></h1>
        <p class="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Jumlah Pemain: {{ filteredAhli.length }} Orang</p>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <div class="relative w-full sm:w-64">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input v-model="searchQuery" type="text" placeholder="Cari Nama atau No. IC..." class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-xs font-bold focus:ring-2 focus:ring-[#E30613] outline-none transition-all shadow-inner">
        </div>
      </div>
    </div>

    <div class="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[400px]">
      <div class="overflow-y-auto flex-1 custom-scrollbar">
        <table class="w-full text-left text-sm relative border-collapse">
          <thead class="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 shadow-sm">
            <tr class="text-[9px] font-black uppercase text-gray-500 tracking-widest">
              <th class="px-6 py-4">Butiran Pemain</th>
              <th class="px-6 py-4">Penempatan & Data</th>
              <th class="px-6 py-4 text-center">Status & Potongan</th>
              <th class="px-6 py-4 text-right">Tindakan</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="isLoading" class="animate-pulse"><td colspan="4" class="px-6 py-10 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">Menarik Data Pemain...</td></tr>
            <tr v-else-if="paginatedAhli.length === 0"><td colspan="4" class="px-6 py-10 text-center text-[#E30613] font-bold uppercase tracking-widest text-xs">Tiada rekod ditemui.</td></tr>
            
            <tr v-for="a in paginatedAhli" :key="a.no_kp" class="hover:bg-gray-50 transition-colors group">
              
              <td class="px-6 py-4">
                <p class="font-black text-gray-900 group-hover:text-[#E30613] uppercase">{{ a.nama_penuh }}</p>
                <p class="text-[11px] text-gray-400 font-mono font-bold mt-0.5">IC: {{ a.no_kp }}</p>
              </td>

              <td class="px-6 py-4">
                <p class="text-[10px] font-black text-gray-600 uppercase tracking-wider">{{ a.penempatan || a.nama_majikan }}</p>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-[9px] font-bold text-[#0F4C3A] uppercase tracking-widest bg-green-50 px-2 py-0.5 rounded border border-green-100">
                    GRED: {{ a.gred_sspa || '-' }}
                  </span>
                  <span class="text-[9px] font-bold text-orange-600 uppercase tracking-widest bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                    SAIZ: {{ a.saiz_baju || 'N/A' }}
                  </span>
                </div>
              </td>

              <td class="px-6 py-4 text-center">
                <span :class="a.status_ahli === 'A - Aktif' ? 'text-[#70B130] bg-green-50 border-green-200' : 'text-red-700 bg-red-50 border-red-200'" class="px-2 py-1 rounded text-[9px] font-black uppercase border tracking-widest shadow-sm inline-block">
                  {{ a.status_ahli === 'A - Aktif' ? 'AKTIF' : 'DEAKTIF' }}
                </span>
                <p class="text-[9px] mt-1.5 font-bold text-gray-400 uppercase tracking-widest">
                  Mula Gaji: <span class="text-gray-700 font-black">{{ formatTarikh(a.mula_potongan) }}</span>
                </p>
              </td>

              <td class="px-6 py-4 text-right">
                <button @click="bukaModalKemaskini(a)" class="px-4 py-2 bg-white hover:bg-[#060d0b] hover:text-white border border-gray-300 hover:border-black text-gray-700 text-[9px] font-black uppercase tracking-widest rounded shadow-sm transition-all flex items-center gap-2 inline-flex active:scale-95">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  Pengurusan
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

    <div v-if="showModalUpdate" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        
        <div class="bg-[#060d0b] p-5 flex justify-between items-center shrink-0 border-l-8 border-[#E30613]">
          <h2 class="text-white font-black italic tracking-widest uppercase">Kad Maklumat Pemain</h2>
          <button @click="showModalUpdate = false" class="text-gray-400 hover:text-[#E30613] transition-colors">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        
        <div class="p-8 overflow-y-auto flex-1 bg-gray-50 custom-scrollbar">
          <form @submit.prevent="simpanKemaskini" class="space-y-8">
            
            <section class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm border-t-4 border-t-gray-800 relative">
              <div class="absolute -top-3 right-6 bg-gray-800 text-white text-[8px] font-black px-3 py-1 rounded uppercase tracking-widest">PROFIL DARI INDUK</div>
              <h3 class="text-[10px] font-black text-gray-800 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Profil Peribadi</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="md:col-span-2"><label class="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">Nama Penuh</label><p class="text-sm font-black text-gray-900 uppercase mt-1">{{ formUpdate.nama_penuh }}</p></div>
                <div><label class="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">No. Kad Pengenalan</label><p class="text-sm font-black text-gray-900 mt-1 font-mono">{{ formUpdate.no_kp }}</p></div>
                
                <div class="md:col-span-2"><label class="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">Cawangan / Penempatan</label><p class="text-sm font-bold text-gray-700 uppercase mt-1">{{ formUpdate.penempatan || formUpdate.nama_majikan }}</p></div>
                <div><label class="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">Gred SSPA</label><p class="text-sm font-black text-[#0F4C3A] uppercase mt-1">{{ formUpdate.gred_sspa || 'TIADA REKOD' }}</p></div>

                <div><label class="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">No. Telefon</label><p class="text-sm font-bold text-gray-700 mt-1 font-mono">{{ formUpdate.no_tel || 'TIADA' }}</p></div>
                <div><label class="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">E-mel</label><p class="text-sm font-bold text-gray-700 mt-1">{{ formUpdate.email || 'TIADA' }}</p></div>
                <div><label class="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">Saiz Jersi Sukan</label><p class="text-sm font-black text-orange-600 mt-1 uppercase">{{ formUpdate.saiz_baju || 'BELUM SET' }}</p></div>
              </div>
            </section>

            <section class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm border-t-4 border-t-orange-500">
              <h3 class="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Akaun & Kewangan Kelab</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div><label class="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">No. Ahli Kelab</label><input v-model="formUpdate.no_ahli" type="text" class="w-full border border-gray-300 rounded p-2.5 text-sm font-bold focus:ring-[#E30613] transition-all"></div>
                <div><label class="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">Mula Potongan / Gaji</label><p class="text-sm font-black text-gray-900 mt-3">{{ formatTarikh(formUpdate.mula_potongan) }}</p></div>
                <div><label class="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">Yuran & Kaedah</label><p class="text-sm font-black text-gray-900 mt-3">RM {{ formUpdate.yuran_bulanan }} ({{ formUpdate.pilihan_potongan }})</p></div>
              </div>
            </section>

            <section class="bg-red-50 p-6 rounded-xl border border-red-100 shadow-sm border-t-4 border-t-[#E30613]">
              <h3 class="text-[10px] font-black text-[#E30613] uppercase tracking-widest mb-4 border-b border-red-200 pb-2 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Kawalan Sistem Aplikasi
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-2">Status Keahlian</label>
                  <select v-model="formUpdate.status_ahli" class="w-full border border-gray-300 rounded p-2.5 text-sm font-bold bg-white focus:ring-[#E30613] transition-all">
                    <option value="A - Aktif">🟢 AKTIF (Ahli Penuh)</option>
                    <option value="TIDAK AKTIF / BERHENTI">🔴 DEAKTIF / BERHENTI (Sekat Akses)</option>
                    <option value="Menunggu Kelulusan">🟠 MENUNGGU KELULUSAN</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-2">Peranan Sistem (Role)</label>
                  <select v-model="formUpdate.role" class="w-full border border-gray-300 rounded p-2.5 text-sm font-bold bg-white focus:ring-[#E30613] transition-all" :disabled="!formUpdate.hasSystemAccount">
                    <option value="Ahli">AHLI BIASA</option>
                    <option value="Admin">ADMIN / URUSETIA AJK</option>
                  </select>
                  <p v-if="!formUpdate.hasSystemAccount" class="text-[8px] text-[#E30613] mt-2 font-black tracking-widest">*Pengguna ini belum pernah mendaftar masuk aplikasi.</p>
                </div>
              </div>
            </section>
          </form>
        </div>
        
        <div class="bg-white p-5 border-t border-gray-200 flex justify-end gap-3 shrink-0">
          <button @click="showModalUpdate = false" class="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 text-[10px] font-black tracking-widest uppercase rounded-lg transition-colors">Batal</button>
          <button @click="simpanKemaskini" :disabled="isSaving" class="px-8 py-2.5 bg-[#E30613] hover:bg-red-700 text-white text-[10px] font-black tracking-[0.2em] uppercase rounded-lg shadow-lg transition-colors disabled:opacity-50 italic">
            {{ isSaving ? 'MENYIMPAN...' : 'SIMPAN MAKLUMAT' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import api from '../../../services/api';

const emit = defineEmits(['show-alert']);

const senaraiAhli = ref([]);
const isLoading = ref(true);
const isSaving = ref(false);

const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;

const showModalUpdate = ref(false);
const formUpdate = ref({});

// API: Tarik Senarai
const fetchAhli = async () => {
  isLoading.value = true;
  try {
    const res = await api.get('/admin/semua-ahli');
    senaraiAhli.value = res.data.data;
  } catch (error) {
    emit('show-alert', { msg: 'Gagal menarik senarai data pemain kelab.', type: 'error' });
  } finally {
    isLoading.value = false;
  }
};

const formatTarikh = (tarikh) => {
  if (!tarikh) return 'TIADA MAKLUMAT';
  const d = new Date(tarikh);
  return d.toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' });
};

const bukaModalKemaskini = (ahli) => {
  formUpdate.value = { ...ahli, hasSystemAccount: !!ahli.role, role: ahli.role || 'Ahli' };
  showModalUpdate.value = true;
};

const simpanKemaskini = async () => {
  isSaving.value = true;
  try {
    await api.put(`/admin/kemaskini-ahli/${formUpdate.value.no_kp}`, {
      no_ahli: formUpdate.value.no_ahli,
      status_ahli: formUpdate.value.status_ahli,
      role: formUpdate.value.role
    });
    
    emit('show-alert', { msg: 'Rekod pemain berjaya dikemas kini!', type: 'success' });
    showModalUpdate.value = false;
    fetchAhli();
  } catch (error) {
    emit('show-alert', { msg: 'Gagal mengemas kini maklumat.', type: 'error' });
  } finally {
    isSaving.value = false;
  }
};

const filteredAhli = computed(() => {
  if (!searchQuery.value) return senaraiAhli.value;
  const q = searchQuery.value.toLowerCase();
  return senaraiAhli.value.filter(a => a.nama_penuh.toLowerCase().includes(q) || (a.no_kp && a.no_kp.includes(q)));
});

const totalPages = computed(() => Math.ceil(filteredAhli.value.length / itemsPerPage) || 1);
const paginatedAhli = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredAhli.value.slice(start, start + itemsPerPage);
});

watch(searchQuery, () => currentPage.value = 1);

onMounted(fetchAhli);
</script>
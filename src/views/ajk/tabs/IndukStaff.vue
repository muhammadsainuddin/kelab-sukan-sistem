<template>
  <div class="flex flex-col h-full space-y-4 relative">
    
    <transition name="slide-down">
      <div v-if="notifikasi.show" 
           :class="notifikasi.type === 'success' ? 'bg-[#70B130]' : 'bg-[#E30613]'"
           class="fixed top-8 right-8 z-[200] px-6 py-4 rounded-xl shadow-2xl text-white flex items-center gap-4 border border-white/20">
        <svg v-if="notifikasi.type === 'success'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
        <div>
          <p class="text-[10px] font-black uppercase tracking-widest opacity-80">{{ notifikasi.type === 'success' ? 'BERJAYA' : 'RALAT' }}</p>
          <p class="text-sm font-bold">{{ notifikasi.message }}</p>
        </div>
      </div>
    </transition>

    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200 shrink-0 border-l-8 border-[#0F4C3A]">
      <div>
        <h1 class="text-2xl font-black text-gray-900 uppercase italic">Senarai Kakitangan <span class="text-[#E30613]">PERHILITAN</span></h1>
        <p class="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Jumlah Rekod: {{ filteredStaff.length }} Orang</p>
      </div>
      <button @click="bukaModalBulk" class="w-full md:w-auto px-8 py-3 bg-[#060d0b] hover:bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-lg transition-all whitespace-nowrap italic active:scale-95 flex items-center justify-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        Kemasukan Pukal (Bulk)
      </button>
    </div>

    <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 shrink-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
      <div>
        <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Status Keahlian</label>
        <select v-model="filterStatus" class="w-full border border-gray-300 rounded-lg bg-gray-50 text-xs font-bold text-gray-700 px-3 py-2.5 focus:ring-2 focus:ring-[#E30613] outline-none transition-all">
          <option value="semua">Semua Kakitangan</option>
          <option value="berdaftar">Ahli Berbayar</option>
          <option value="belum">Ahli Tidak Berbayar</option>
        </select>
      </div>
      <div>
        <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Penempatan</label>
        <select v-model="filterPenempatan" class="w-full border border-gray-300 rounded-lg bg-gray-50 text-xs font-bold text-gray-700 px-3 py-2.5 focus:ring-2 focus:ring-[#E30613] outline-none">
          <option value="">-- Semua Cawangan --</option>
          <option v-for="t in senaraiPenempatanUnik" :key="t" :value="t">{{ t }}</option>
        </select>
      </div>
      <div>
        <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Gred Jawatan</label>
        <select v-model="filterGred" class="w-full border border-gray-300 rounded-lg bg-gray-50 text-xs font-bold text-gray-700 px-3 py-2.5 focus:ring-2 focus:ring-[#E30613] outline-none">
          <option value="">-- Semua Gred --</option>
          <option v-for="g in senaraiGredUnik" :key="g" :value="g">{{ g }}</option>
        </select>
      </div>
      <div>
        <label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Carian Nama / IC</label>
        <input v-model="searchQuery" type="text" placeholder="Taip di sini..." class="w-full border border-gray-300 rounded-lg bg-white text-xs font-bold px-3 py-2.5 focus:ring-2 focus:ring-[#E30613] outline-none shadow-inner">
      </div>
    </div>

    <div class="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[400px]">
      <div class="overflow-y-auto flex-1 custom-scrollbar">
        <table class="w-full text-left text-sm relative border-collapse">
          <thead class="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 shadow-sm">
            <tr class="text-[9px] font-black uppercase text-gray-500 tracking-widest">
              <th class="px-6 py-4">Nama Kakitangan</th>
              <th class="px-6 py-4">Gred & Cawangan</th>
              <th class="px-6 py-4 text-center">Status Yuran</th>
              <th class="px-6 py-4 text-right">Tindakan</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="isLoading" class="animate-pulse"><td colspan="4" class="px-6 py-10 text-center text-gray-400 font-black uppercase text-[10px]">Memproses Data Jabatan...</td></tr>
            <tr v-else-if="paginatedStaff.length === 0"><td colspan="4" class="px-6 py-10 text-center text-[#E30613] font-bold uppercase text-[10px]">Tiada rekod kakitangan ditemui.</td></tr>
            
            <tr v-for="s in paginatedStaff" :key="s.no_kp" 
                :class="s.is_ahli === 1 ? 'hover:bg-gray-50 bg-white' : 'bg-red-50/40 hover:bg-red-100/50'" 
                class="transition-colors border-l-4"
                :style="s.is_ahli === 0 ? 'border-left-color: #E30613;' : 'border-left-color: transparent;'">
              
              <td class="px-6 py-4">
                <p :class="s.is_ahli === 0 ? 'text-red-900' : 'text-gray-900'" class="font-black uppercase leading-tight">{{ s.nama_pegawai }}</p>
                <p :class="s.is_ahli === 0 ? 'text-red-400' : 'text-gray-400'" class="text-[10px] font-mono font-bold mt-1 tracking-tighter">IC: {{ s.no_kp }}</p>
              </td>
              
              <td class="px-6 py-4">
                <p :class="s.is_ahli === 0 ? 'text-red-700' : 'text-[#0F4C3A]'" class="text-[10px] font-black uppercase">{{ s.gred_sspa || '-' }}</p>
                <p :class="s.is_ahli === 0 ? 'text-red-500' : 'text-gray-500'" class="text-[9px] font-bold mt-1 uppercase tracking-widest">{{ s.penempatan }}</p>
              </td>
              
              <td class="px-6 py-4 text-center">
                <span v-if="s.is_ahli === 1" class="px-3 py-1 bg-green-50 text-[#70B130] border border-green-200 text-[9px] font-black uppercase rounded shadow-sm whitespace-nowrap">AHLI BERBAYAR</span>
                <span v-else class="px-3 py-1 bg-[#E30613] text-white text-[9px] font-black uppercase rounded shadow-md whitespace-nowrap tracking-widest">TIDAK BERBAYAR</span>
              </td>
              
              <td class="px-6 py-4 text-right">
                <button @click="lihatButiran(s)" 
                        :class="s.is_ahli === 0 ? 'bg-white border-red-200 hover:border-[#E30613] hover:text-[#E30613] text-red-600' : 'bg-white border-gray-300 hover:border-[#0F4C3A] hover:text-[#0F4C3A] text-gray-700'"
                        class="px-4 py-1.5 border text-[9px] font-black uppercase rounded shadow-sm transition-all italic">
                  Profil
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between shrink-0">
        <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Halaman {{ currentPage }} / {{ totalPages }}</div>
        <div class="flex gap-2">
          <button @click="currentPage--" :disabled="currentPage === 1" class="p-2 rounded bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-all">&lt;</button>
          <button @click="currentPage++" :disabled="currentPage === totalPages" class="p-2 rounded bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-all">&gt;</button>
        </div>
      </div>
    </div>

    <div v-if="showModalDetails" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border-t-8" :class="selectedStaff.is_ahli === 0 ? 'border-[#E30613]' : 'border-[#0F4C3A]'">
        <div class="p-8 space-y-6">
          <div class="text-center">
            <div class="w-24 h-24 bg-gray-100 rounded-full mx-auto flex items-center justify-center text-4xl font-black border-4 border-white shadow-lg mb-4" :class="selectedStaff.is_ahli === 0 ? 'text-red-500' : 'text-gray-400'">{{ selectedStaff.nama_pegawai.charAt(0) }}</div>
            <h3 class="text-xl font-black text-gray-900 uppercase leading-tight">{{ selectedStaff.nama_pegawai }}</h3>
            <p class="text-sm font-bold text-gray-500 font-mono mt-1 tracking-widest italic">Kakitangan Kerajaan</p>
          </div>
          
          <div class="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4 relative overflow-hidden">
            <div class="absolute top-0 right-0 px-4 py-1 text-[8px] font-black uppercase tracking-widest text-white" 
                 :class="selectedStaff.is_ahli === 0 ? 'bg-[#E30613]' : 'bg-[#70B130]'">
              {{ selectedStaff.is_ahli === 0 ? 'AHLI TIDAK BERBAYAR' : 'AHLI BERBAYAR' }}
            </div>

            <div class="grid grid-cols-2 gap-4 mt-2">
              <div><p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">No. KP</p><p class="text-xs font-black text-gray-800 font-mono">{{ selectedStaff.no_kp }}</p></div>
              <div><p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Gred</p><p class="text-xs font-black text-[#0F4C3A] uppercase">{{ selectedStaff.gred_sspa || '-' }}</p></div>
              <div class="col-span-2"><p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Cawangan</p><p class="text-xs font-black text-gray-800 uppercase">{{ selectedStaff.penempatan }}</p></div>
            </div>
          </div>

          <div class="flex gap-3">
            <button @click="showModalDetails = false" class="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[10px] font-black uppercase rounded-xl transition-all">Tutup</button>
            <button v-if="selectedStaff.is_ahli === 0" @click="mulaDaftarAhli" class="flex-[2] py-3 bg-[#E30613] hover:bg-red-700 text-white text-[10px] font-black uppercase rounded-xl italic shadow-lg active:scale-95 transition-all">Daftar Jadi Ahli Berbayar</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModalBulk" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col max-h-[90vh]">
        <div class="bg-[#060d0b] p-6 flex justify-between items-center border-b-4 border-[#E30613]">
          <div>
            <h2 class="text-white font-black italic tracking-widest uppercase text-lg">Import Data Kakitangan (Pukal)</h2>
            <p class="text-[9px] text-gray-500 font-bold uppercase mt-1">Sila masukkan data penjawat baharu ke dalam senarai induk jabatan</p>
          </div>
          <button @click="showModalBulk = false" class="text-gray-400 hover:text-white"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
        </div>
        
        <div class="p-6 overflow-y-auto flex-1 bg-gray-50 custom-scrollbar">
          <div class="space-y-3">
            <div v-for="(row, index) in bulkForm" :key="index" class="flex flex-col md:flex-row gap-3 items-end bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative group">
              <span class="absolute -left-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white shadow-md">{{ index + 1 }}</span>
              
              <div class="flex-1 w-full">
                <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block ml-1">Nama Penuh</label>
                <input v-model="row.nama_pegawai" type="text" required placeholder="NAMA SEPERTI DI KAD PENGENALAN" class="w-full border-2 border-gray-200 rounded-lg p-2.5 text-xs font-bold uppercase focus:border-[#E30613] outline-none transition-all">
              </div>
              <div class="w-full md:w-44">
                <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block ml-1">No. IC (Tanpa -)</label>
                <input v-model="row.no_kp" type="text" required maxlength="12" placeholder="89041312XXXX" class="w-full border-2 border-gray-200 rounded-lg p-2.5 text-xs font-mono font-bold focus:border-[#E30613] outline-none">
              </div>
              <div class="w-full md:w-40">
                <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block ml-1">Gred SSPA</label>
                <input v-model="row.gred_sspa" list="gred-list" required placeholder="PILIH/TAIP" class="w-full border-2 border-gray-200 rounded-lg p-2.5 text-xs font-bold uppercase focus:border-[#E30613] outline-none">
              </div>
              <div class="flex-1 w-full">
                <label class="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block ml-1">Cawangan</label>
                <input v-model="row.penempatan" list="penempatan-list" required placeholder="CAWANGAN PERHILITAN" class="w-full border-2 border-gray-200 rounded-lg p-2.5 text-xs font-bold uppercase focus:border-[#E30613] outline-none">
              </div>
              
              <button @click="buangBarisBulk(index)" v-if="bulkForm.length > 1" class="p-3 text-gray-300 hover:text-red-600 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
          
          <button @click="tambahBarisBulk" class="mt-4 w-full py-3 border-2 border-dashed border-gray-300 text-gray-400 hover:text-[#0F4C3A] hover:border-[#0F4C3A] hover:bg-green-50 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
            + TAMBAH BARIS KAKITANGAN
          </button>
        </div>

        <div class="bg-white p-6 border-t border-gray-100 flex justify-end gap-3">
          <button @click="showModalBulk = false" class="px-6 py-2.5 text-gray-500 font-black uppercase text-[10px] tracking-widest">Batal</button>
          <button @click="simpanBulkStaff" :disabled="isSubmitting" class="px-10 py-3 bg-[#E30613] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-lg disabled:opacity-50 italic">
            {{ isSubmitting ? 'MENYIMPAN DATA...' : 'SIMPAN SEMUA REKOD' }}
          </button>
        </div>
      </div>
    </div>

    <datalist id="gred-list"><option v-for="g in senaraiGredUnik" :key="g" :value="g"></option></datalist>
    <datalist id="penempatan-list"><option v-for="t in senaraiPenempatanUnik" :key="t" :value="t"></option></datalist>

    <div v-if="showModalDaftar" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        <div class="bg-[#E30613] p-5 flex justify-between items-center border-l-8 border-red-900">
          <h2 class="text-white font-black italic tracking-widest uppercase">Daftar Ahli Berbayar</h2>
          <button @click="showModalDaftar = false" class="text-red-200 hover:text-white"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
        </div>
        <div class="p-8 space-y-6">
          <div class="p-4 bg-gray-50 rounded-xl border-l-4 border-gray-800">
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kakitangan Dipilih</p>
            <p class="text-sm font-black text-gray-800 uppercase mt-1">{{ selectedStaff.nama_pegawai }}</p>
            <p class="text-[9px] font-bold text-gray-500 uppercase mt-0.5">IC: {{ selectedStaff.no_kp }} | {{ selectedStaff.penempatan }}</p>
          </div>
          <form @submit.prevent="simpanAhliBaru" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div><label class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Yuran (RM)</label><input v-model="formDaftar.yuran_bulanan" type="number" step="0.01" required class="w-full border-2 border-gray-200 rounded-lg p-3 text-sm font-bold focus:border-[#E30613] outline-none"></div>
              <div><label class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Kaedah Potongan</label><select v-model="formDaftar.pilihan_potongan" required class="w-full border-2 border-gray-200 rounded-lg p-3 text-sm font-bold bg-white focus:border-[#E30613] outline-none"><option value="Biro Angkasa">Biro Angkasa</option><option value="Potongan Gaji / Jabatan">Potongan Gaji Jabatan</option><option value="Tunai / Transfer">Tunai / Transfer</option></select></div>
              <div class="col-span-2"><label class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Mula Potongan</label><input v-model="formDaftar.mula_potongan" type="date" required class="w-full border-2 border-gray-200 rounded-lg p-3 text-sm font-bold focus:border-[#E30613] outline-none"></div>
            </div>
            <button type="submit" :disabled="isRegistering" class="w-full py-4 bg-[#060d0b] hover:bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl italic shadow-lg active:scale-95 transition-all">SAHKAN PENDAFTARAN</button>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import api from '../../../services/api';

const emit = defineEmits(['show-alert']);

const senaraiStaff = ref([]);
const isLoading = ref(true);
const isSubmitting = ref(false);
const isRegistering = ref(false);

const showModalDetails = ref(false);
const showModalDaftar = ref(false);
const showModalBulk = ref(false);

const selectedStaff = ref({});
const bulkForm = ref([{ nama_pegawai: '', no_kp: '', gred_sspa: '', penempatan: '' }]);
const formDaftar = ref({ yuran_bulanan: '', pilihan_potongan: 'Potongan Gaji / Jabatan', mula_potongan: '', no_ahli: '' });

const searchQuery = ref('');
const filterStatus = ref('semua');
const filterGred = ref('');
const filterPenempatan = ref('');
const currentPage = ref(1);
const itemsPerPage = 15;

const notifikasi = ref({ show: false, message: '', type: 'success' });

const paparNotifikasi = (message, type = 'success') => {
  notifikasi.value = { show: true, message, type };
  setTimeout(() => notifikasi.value.show = false, 4000);
};

const fetchStaff = async () => {
  isLoading.value = true;
  try {
    const res = await api.get('/admin/semua-staff');
    senaraiStaff.value = res.data.data;
  } catch (error) {
    paparNotifikasi('Gagal menarik data kakitangan.', 'error');
  } finally {
    isLoading.value = false;
  }
};

const bukaModalBulk = () => {
  bulkForm.value = [{ nama_pegawai: '', no_kp: '', gred_sspa: '', penempatan: '' }];
  showModalBulk.value = true;
};

const tambahBarisBulk = () => bulkForm.value.push({ nama_pegawai: '', no_kp: '', gred_sspa: '', penempatan: '' });
const buangBarisBulk = (idx) => bulkForm.value.splice(idx, 1);

const simpanBulkStaff = async () => {
  if (bulkForm.value.some(s => s.no_kp.length < 10)) return paparNotifikasi('Sila pastikan No. IC ditaip dengan betul.', 'error');
  
  isSubmitting.value = true;
  try {
    const res = await api.post('/admin/tambah-staff-pukal', { staffList: bulkForm.value });
    paparNotifikasi(res.data.message);
    showModalBulk.value = false;
    fetchStaff();
  } catch (error) {
    paparNotifikasi('Gagal menyimpan data pukal.', 'error');
  } finally {
    isSubmitting.value = false;
  }
};

const lihatButiran = (s) => { selectedStaff.value = s; showModalDetails.value = true; };
const mulaDaftarAhli = () => { showModalDetails.value = false; showModalDaftar.value = true; };

const simpanAhliBaru = async () => {
  isRegistering.value = true;
  try {
    const res = await api.post('/admin/daftar-ahli', { no_kp: selectedStaff.value.no_kp, ...formDaftar.value });
    paparNotifikasi(res.data.message);
    showModalDaftar.value = false;
    fetchStaff();
  } catch (error) {
    paparNotifikasi('Gagal mendaftar ahli kelab.', 'error');
  } finally {
    isRegistering.value = false;
  }
};

const senaraiGredUnik = computed(() => [...new Set(senaraiStaff.value.map(s => s.gred_sspa).filter(Boolean))].sort());
const senaraiPenempatanUnik = computed(() => [...new Set(senaraiStaff.value.map(s => s.penempatan).filter(Boolean))].sort());

const filteredStaff = computed(() => {
  let res = senaraiStaff.value;
  if (filterStatus.value === 'berdaftar') res = res.filter(s => s.is_ahli === 1);
  else if (filterStatus.value === 'belum') res = res.filter(s => s.is_ahli === 0);
  if (filterPenempatan.value) res = res.filter(s => s.penempatan === filterPenempatan.value);
  if (filterGred.value) res = res.filter(s => s.gred_sspa === filterGred.value);
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    res = res.filter(s => s.nama_pegawai.toLowerCase().includes(q) || s.no_kp.includes(q));
  }
  return res;
});

const totalPages = computed(() => Math.ceil(filteredStaff.value.length / itemsPerPage) || 1);
const paginatedStaff = computed(() => {
  const s = (currentPage.value - 1) * itemsPerPage;
  return filteredStaff.value.slice(s, s + itemsPerPage);
});

watch([searchQuery, filterStatus, filterGred, filterPenempatan], () => currentPage.value = 1);
onMounted(fetchStaff);
</script>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.4s ease; }
.slide-down-enter-from { opacity: 0; transform: translateY(-20px); }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
</style>
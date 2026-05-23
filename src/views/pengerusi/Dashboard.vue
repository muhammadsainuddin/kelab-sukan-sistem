<template>
  <div class="min-h-screen bg-gray-900 font-sans text-gray-200">
    
    <nav class="bg-gray-800 border-b border-orange-500/50 sticky top-0 z-50 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-black italic">
              AJK
            </div>
            <span class="text-white font-black italic tracking-wider uppercase drop-shadow-md">
              PORTAL <span class="text-orange-500">URUSETIA</span>
            </span>
          </div>
          
          <div class="flex items-center gap-4">
            <div class="hidden md:block text-right">
              <p class="text-sm font-bold text-white">{{ user.name }}</p>
              <p class="text-xs text-orange-400 font-medium tracking-wide uppercase">Admin Kelab</p>
            </div>
            <button @click="handleLogout" class="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Log Keluar">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div class="flex space-x-2 overflow-x-auto mb-6 pb-2 scrollbar-hide">
        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id; fetchTabData()"
          :class="['px-5 py-2.5 rounded-lg text-sm font-bold tracking-widest uppercase whitespace-nowrap transition-all', 
          activeTab === tab.id ? 'bg-orange-600 text-white shadow-[0_0_15px_rgba(234,88,12,0.5)]' : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white']">
          {{ tab.label }}
        </button>
      </div>

      <div v-if="activeTab === 'pengesahan'" class="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
        <div class="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 class="text-lg font-black text-white italic tracking-widest uppercase">Pengesahan Ahli Baharu</h2>
          <button @click="fetchMenunggu" class="text-sm text-green-500 hover:text-white flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> Refresh
          </button>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-gray-300">
            <thead class="text-xs text-gray-400 uppercase bg-gray-900/50">
              <tr>
                <th class="px-6 py-4">Nama & Penempatan</th>
                <th class="px-6 py-4">Gred & Yuran</th>
                <th class="px-6 py-4">Kaedah</th>
                <th class="px-6 py-4 text-center">Tindakan</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-700">
              <tr v-if="isLoading" class="animate-pulse"><td colspan="4" class="px-6 py-8 text-center">Memuatkan data...</td></tr>
              <tr v-else-if="senaraiMenunggu.length === 0"><td colspan="4" class="px-6 py-8 text-center text-gray-500">Tiada permohonan baharu.</td></tr>
              <tr v-for="ahli in senaraiMenunggu" :key="ahli.no_kp" class="hover:bg-gray-700/50 transition-colors">
                <td class="px-6 py-4">
                  <p class="font-bold text-white">{{ ahli.nama_pegawai }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ ahli.penempatan }} | {{ ahli.no_kp }}</p>
                </td>
                <td class="px-6 py-4">
                  <p class="font-bold text-green-400">{{ ahli.gred_sspa }}</p>
                  <p class="text-xs">RM {{ ahli.yuran_bulanan }}</p>
                </td>
                <td class="px-6 py-4"><span class="px-2 py-1 text-[10px] font-bold uppercase bg-gray-900 text-gray-300 rounded border border-gray-600">{{ ahli.pilihan_potongan }}</span></td>
                <td class="px-6 py-4 text-center space-x-2">
                  <button @click="sahkanAhli(ahli.no_kp, 'Aktif')" class="px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors">Lulus</button>
                  <button @click="sahkanAhli(ahli.no_kp, 'Ditolak')" class="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors">Tolak</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="activeTab === 'pertandingan'" class="space-y-6">
        
        <div class="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-6">
          <h2 class="text-lg font-black text-white italic tracking-widest uppercase mb-4 border-b border-gray-700 pb-2">Buka Pertandingan Baharu</h2>
          <form @submit.prevent="bukaAcara" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="md:col-span-2">
              <label class="block text-xs font-bold text-gray-400 uppercase">Nama Pertandingan</label>
              <input v-model="formSukan.nama_pertandingan" type="text" required class="mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-orange-500 outline-none">
            </div>
            <div class="md:col-span-2">
              <label class="block text-xs font-bold text-gray-400 uppercase">Keterangan / Kategori Tersedia</label>
              <input v-model="formSukan.keterangan" type="text" class="mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-orange-500 outline-none">
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase">Tarikh Kejohanan</label>
              <input v-model="formSukan.tarikh_kejohanan" type="date" required class="mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-orange-500 outline-none">
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase">Tarikh Tutup Daftar</label>
              <input v-model="formSukan.tarikh_tutup_pendaftaran" type="date" required class="mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-orange-500 outline-none">
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase">No. Tel Urusetia</label>
              <input v-model="formSukan.no_tel_urusetia" type="text" class="mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-orange-500 outline-none">
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase">E-mel Urusetia</label>
              <input v-model="formSukan.emel_urusetia" type="email" class="mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-orange-500 outline-none">
            </div>
            <div class="md:col-span-2 flex justify-end mt-2">
              <button type="submit" :disabled="isSubmitting" class="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest rounded-lg transition-colors">
                {{ isSubmitting ? 'Menyimpan...' : 'Buka Pendaftaran Acara' }}
              </button>
            </div>
          </form>
        </div>

        <div class="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
          <div class="p-6 border-b border-gray-700">
            <h2 class="text-lg font-black text-white italic tracking-widest uppercase">Acara Sukan Aktif</h2>
          </div>
          <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
             <div v-if="senaraiSukan.length === 0" class="col-span-2 text-center py-4 text-gray-500">Tiada acara aktif.</div>
             <div v-for="sukan in senaraiSukan" :key="sukan.id" class="p-4 border border-gray-700 bg-gray-900/50 rounded-xl flex justify-between items-center group hover:border-orange-500 transition-colors">
                <div>
                  <h3 class="font-bold text-white uppercase">{{ sukan.nama_pertandingan }}</h3>
                  <p class="text-xs text-gray-400 mt-1">Kejohanan: {{ formatDate(sukan.tarikh_kejohanan) }}</p>
                </div>
                <button @click="lihatPeserta(sukan.id, sukan.nama_pertandingan)" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold uppercase rounded transition-colors">
                  Lihat Peserta
                </button>
             </div>
          </div>
        </div>

      </div>

      <div v-if="activeTab === 'kebajikan' || activeTab === 'berhenti'" class="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-10 text-center">
         <svg class="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
         <h2 class="text-xl font-bold text-white mb-2">Modul Sedang Dikemas Kini</h2>
         <p class="text-gray-400">Data untuk modul {{ activeTab }} akan dipaparkan di sini.</p>
      </div>

    </main>

    <div v-if="showModalPeserta" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div class="bg-gray-800 border border-orange-500 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div class="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-900">
          <h2 class="text-xl font-black text-white uppercase italic">Peserta: {{ modalTitle }}</h2>
          <button @click="showModalPeserta = false" class="text-gray-400 hover:text-white"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
        </div>
        <div class="p-0 overflow-auto">
          <table class="w-full text-left text-sm text-gray-300">
            <thead class="text-xs text-gray-400 uppercase bg-gray-900/50 sticky top-0">
              <tr>
                <th class="px-6 py-4">Nama & Penempatan</th>
                <th class="px-6 py-4">E-mel / No. Tel</th>
                <th class="px-6 py-4">Tarikh Daftar</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-700">
              <tr v-if="pesertaSukan.length === 0"><td colspan="3" class="px-6 py-8 text-center">Belum ada peserta.</td></tr>
              <tr v-for="(p, index) in pesertaSukan" :key="index" class="hover:bg-gray-700/50">
                <td class="px-6 py-4">
                  <p class="font-bold text-white">{{ p.nama_pegawai }}</p>
                  <p class="text-xs text-gray-500">{{ p.penempatan }}</p>
                </td>
                <td class="px-6 py-4">
                  <p>{{ p.email }}</p>
                  <p class="text-xs text-green-400">{{ p.no_tel || 'Tiada rekod tel' }}</p>
                </td>
                <td class="px-6 py-4 text-xs text-gray-400">{{ formatDate(p.tarikh_daftar) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../services/api';

const router = useRouter();
const user = ref(JSON.parse(localStorage.getItem('user')) || {});

const activeTab = ref('pengesahan');
const tabs = [
  { id: 'pengesahan', label: 'Pengesahan Ahli' },
  { id: 'pertandingan', label: 'Urus Pertandingan' },
  { id: 'kebajikan', label: 'Bantuan Kebajikan' },
  { id: 'berhenti', label: 'Kelulusan Berhenti' }
];

const isLoading = ref(false);
const isSubmitting = ref(false);

// State Data
const senaraiMenunggu = ref([]);
const senaraiSukan = ref([]);
const pesertaSukan = ref([]);

// Modal State
const showModalPeserta = ref(false);
const modalTitle = ref('');

// Form Pertandingan
const formSukan = ref({
  nama_pertandingan: '', keterangan: '', tarikh_kejohanan: '', tarikh_tutup_pendaftaran: '', emel_urusetia: '', no_tel_urusetia: ''
});

// Format Tarikh
const formatDate = (dateString) => {
  if (!dateString) return '-';
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('ms-MY', options);
};

const handleLogout = () => {
  localStorage.clear();
  router.push('/login');
};

// =====================================
// FUNGSI API
// =====================================

const fetchTabData = () => {
  if (activeTab.value === 'pengesahan') fetchMenunggu();
  if (activeTab.value === 'pertandingan') fetchSukan();
};

const fetchMenunggu = async () => {
  isLoading.value = true;
  try {
    const res = await api.get('/admin/pengesahan');
    senaraiMenunggu.value = res.data.data;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const sahkanAhli = async (no_kp, status) => {
  if (confirm(`Pasti untuk tandakan ahli ini sebagai ${status}?`)) {
    try {
      await api.put(`/admin/pengesahan/${no_kp}`, { status_keputusan: status });
      alert('Berjaya dikemas kini.');
      fetchMenunggu(); // Refresh table
    } catch (error) {
      alert('Gagal mengemas kini.');
    }
  }
};

const fetchSukan = async () => {
  try {
    const res = await api.get('/pertandingan/aktif');
    senaraiSukan.value = res.data.data;
  } catch (error) {
    console.error(error);
  }
};

const bukaAcara = async () => {
  isSubmitting.value = true;
  try {
    await api.post('/pertandingan/admin/buka', formSukan.value);
    alert('Pertandingan baharu berjaya dibuka!');
    formSukan.value = { nama_pertandingan: '', keterangan: '', tarikh_kejohanan: '', tarikh_tutup_pendaftaran: '', emel_urusetia: '', no_tel_urusetia: '' };
    fetchSukan(); // Refresh senarai acara
  } catch (error) {
    alert('Gagal membuka pertandingan.');
  } finally {
    isSubmitting.value = false;
  }
};

const lihatPeserta = async (id, nama) => {
  modalTitle.value = nama;
  pesertaSukan.value = [];
  try {
    const res = await api.get(`/pertandingan/admin/peserta/${id}`);
    pesertaSukan.value = res.data.data;
    showModalPeserta.value = true;
  } catch (error) {
    alert('Gagal memuat turun senarai peserta.');
  }
};

onMounted(() => {
  fetchTabData();
});
</script>
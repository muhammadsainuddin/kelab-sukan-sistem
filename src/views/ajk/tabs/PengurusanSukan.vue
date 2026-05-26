<template>
  <div class="space-y-6 animate-fade-in">
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-l-4 border-l-[#0F4C3A]">
      <div>
        <h3 class="text-sm font-black text-gray-800 uppercase tracking-widest">Pengurusan Sukan & Acara</h3>
        <p class="text-xs text-gray-500 font-medium mt-1">Promosikan acara, buka pendaftaran, dan pantau penyertaan ahli kelab.</p>
      </div>
      <button @click="showForm = !showForm" class="px-6 py-3 bg-[#0F4C3A] hover:bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-2 outline-none">
        <svg v-if="!showForm" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        {{ showForm ? 'Tutup Borang' : 'Promosi Acara Baharu' }}
      </button>
    </div>

    <div v-if="showForm" class="bg-white p-8 rounded-xl shadow-lg border-t-4 border-t-[#E30613] animate-fade-in">
      <div class="mb-6 border-b border-gray-100 pb-4">
        <h4 class="text-xs font-black text-[#E30613] uppercase tracking-widest">Borang Hebahan Acara</h4>
        <p class="text-[10px] text-gray-400 font-bold uppercase mt-1">Isi butiran maklumat sukan dan muat naik poster promosi.</p>
      </div>
      
      <form @submit.prevent="simpanAcara" class="grid grid-cols-1 md:grid-cols-2 gap-6" enctype="multipart/form-data">
        <div class="space-y-2 md:col-span-2">
          <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest">Nama Pertandingan / Acara</label>
          <input v-model="form.nama_pertandingan" required type="text" placeholder="Cth: Kejohanan SAKOM 2026" class="w-full border border-gray-300 rounded-lg p-3 text-sm font-bold focus:border-[#0F4C3A] focus:ring-1 focus:ring-[#0F4C3A] outline-none transition-all uppercase text-gray-800">
        </div>
        
        <div class="space-y-2 md:col-span-2">
          <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest">Keterangan & Syarat</label>
          <textarea v-model="form.keterangan" required rows="3" placeholder="Nyatakan syarat-syarat ringkas, tempat, atau yuran (jika ada)..." class="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-[#0F4C3A] focus:ring-1 focus:ring-[#0F4C3A] outline-none transition-all resize-none text-gray-800"></textarea>
        </div>

        <div class="space-y-2 md:col-span-2">
          <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest">Poster Sukan (.JPG, .PNG / Max 20MB)</label>
          <div class="flex flex-col sm:flex-row items-center gap-4 p-4 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
            <div class="w-24 h-24 shrink-0 rounded-lg border bg-white flex items-center justify-center overflow-hidden shadow-inner">
              <img v-if="imagePreview" :src="imagePreview" class="w-full h-full object-cover" />
              <svg v-else class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <div class="flex-1 w-full text-center sm:text-left">
              <input type="file" ref="fileInput" accept="image/*" @change="onFileChange" class="hidden" id="poster-file">
              <label for="poster-file" class="inline-block px-4 py-2.5 bg-white border border-gray-300 hover:border-[#0F4C3A] text-gray-700 text-[10px] font-black uppercase tracking-wider rounded-lg shadow-sm cursor-pointer transition-colors">
                Pilih Gambar Poster
              </label>
              <p class="text-[10px] text-gray-400 mt-2 font-medium truncate max-w-xs" v-if="selectedFile">{{ selectedFile.name }}</p>
              <p class="text-[10px] text-gray-400 mt-2 font-medium" v-else>Tiada fail dipilih.</p>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest">Tarikh Kejohanan</label>
          <input v-model="form.tarikh_kejohanan" required type="date" class="w-full border border-gray-300 rounded-lg p-3 text-sm font-bold focus:border-[#0F4C3A] outline-none text-gray-700">
        </div>
        <div class="space-y-2">
          <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest text-[#E30613]">Tarikh Tutup Pendaftaran</label>
          <input v-model="form.tarikh_tutup_pendaftaran" required type="date" class="w-full border border-red-300 rounded-lg p-3 text-sm font-bold focus:border-[#E30613] outline-none text-red-600 bg-red-50/30">
        </div>

        <div class="space-y-2">
          <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest">E-mel Urusetia</label>
          <input v-model="form.emel_urusetia" type="email" placeholder="urusetia@wildlife.gov.my" class="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-[#0F4C3A] outline-none">
        </div>
        <div class="space-y-2">
          <label class="block text-[10px] font-black text-gray-500 uppercase tracking-widest">No. Telefon Urusetia</label>
          <input v-model="form.no_tel_urusetia" type="text" placeholder="0123456789" class="w-full border border-gray-300 rounded-lg p-3 text-sm font-mono focus:border-[#0F4C3A] outline-none">
        </div>

        <div class="md:col-span-2 flex justify-end pt-4 border-t border-gray-100">
          <button type="button" @click="showForm = false" class="px-6 py-3 text-gray-500 text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 rounded-lg mr-3 transition-colors outline-none">Batal</button>
          <button type="submit" :disabled="isSaving" class="px-8 py-3 bg-[#E30613] text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg hover:bg-red-700 active:scale-95 transition-all disabled:opacity-50 outline-none">
            {{ isSaving ? 'MENYIARKAN...' : 'HEBAHKAN SEKARANG' }}
          </button>
        </div>
      </form>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div v-if="loading" class="col-span-full flex justify-center p-10"><span class="w-8 h-8 border-4 border-gray-200 border-t-[#0F4C3A] rounded-full animate-spin"></span></div>
      
      <div v-else-if="senaraiAcara.length === 0" class="col-span-full bg-white p-12 rounded-xl border border-gray-200 text-center">
        <p class="text-gray-400 font-black uppercase tracking-widest text-xs">Tiada Acara Aktif</p>
        <p class="text-[10px] text-gray-400 mt-1">Klik "Promosi Acara Baharu" untuk mula.</p>
      </div>

      <div v-for="acara in senaraiAcara" :key="acara.id" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col group hover:shadow-md transition-all">
        
        <div v-if="acara.poster" class="w-full h-48 bg-gray-100 border-b overflow-hidden relative">
          <img :src="`http://localhost:5000/uploads/images/${acara.poster}`" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Poster Acara" />
        </div>

        <div class="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-start flex-1">
          <div>
            <h4 class="text-sm font-black text-gray-900 uppercase tracking-tight">{{ acarasNameClean(acara.nama_pertandingan) }}</h4>
            <p class="text-[9px] font-bold text-[#E30613] uppercase tracking-widest mt-1">TUTUP: {{ formatTarikh(acara.tarikh_tutup) }}</p>
          </div>
          <span class="px-2 py-1 bg-green-100 text-green-700 text-[8px] font-black uppercase tracking-widest rounded shadow-sm">Aktif</span>
        </div>
        
        <div class="p-5 text-xs text-gray-600 leading-relaxed min-h-[60px]">
          {{ acara.keterangan }}
        </div>
        
        <div class="p-4 bg-white border-t border-gray-100">
          <button @click="lihatPeserta(acara.id, acara.nama_pertandingan)" class="w-full py-2.5 bg-gray-50 hover:bg-[#0F4C3A] hover:text-white text-[#0F4C3A] text-[10px] font-black uppercase tracking-[0.2em] rounded-lg transition-colors flex justify-center items-center gap-2 shadow-sm border border-gray-100 outline-none">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            Lihat Senarai Peserta
          </button>
        </div>
      </div>
    </div>

    <div v-if="showModalPeserta" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border-t-8 border-t-[#0F4C3A]">
        <div class="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div>
            <h2 class="text-sm font-black text-gray-900 uppercase tracking-widest">{{ tajukModal }}</h2>
            <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Jumlah Peserta: <span class="text-[#E30613]">{{ senaraiPeserta.length }} Orang</span></p>
          </div>
          <button @click="showModalPeserta = false" class="p-2 text-gray-400 hover:text-red-600 transition-colors bg-white rounded-lg border border-gray-200 shadow-sm outline-none"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
        </div>
        <div class="flex-1 overflow-y-auto p-0 custom-scrollbar bg-white">
          <table class="w-full text-left text-sm whitespace-nowrap">
            <thead class="bg-gray-100 border-b border-gray-200 text-[9px] font-black uppercase tracking-widest text-gray-500 sticky top-0 z-10">
              <tr>
                <th class="px-6 py-3">Nama Atlet</th>
                <th class="px-6 py-3">Cawangan</th>
                <th class="px-6 py-3">Kategori</th>
                <th class="px-6 py-3">No. Telefon</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="isFetchingPeserta"><td colspan="4" class="p-8 text-center text-gray-400 text-xs font-bold uppercase tracking-widest animate-pulse">Memuatkan peserta...</td></tr>
              <tr v-else-if="senaraiPeserta.length === 0"><td colspan="4" class="p-8 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">Belum ada penyertaan dari ahli.</td></tr>
              <tr v-else v-for="(p, index) in senaraiPeserta" :key="index" class="hover:bg-green-50/50 transition-colors">
                <td class="px-6 py-3">
                  <p class="font-bold text-gray-900 uppercase text-xs">{{ p.nama_pegawai }}</p>
                  <p class="text-[9px] text-gray-400 mt-0.5">{{ p.email }}</p>
                </td>
                <td class="px-6 py-3 text-[10px] font-bold text-gray-600 uppercase">{{ p.penempatan }}</td>
                <td class="px-6 py-3"><span class="px-2 py-1 bg-gray-100 text-gray-700 text-[9px] font-black uppercase rounded border border-gray-200">{{ p.kategori }}</span></td>
                <td class="px-6 py-3 text-xs font-mono font-bold text-[#0F4C3A]">{{ p.no_tel || '-' }}</td>
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
import api from '../../../services/api';

const emit = defineEmits(['show-alert']);

const showForm = ref(false);
const isSaving = ref(false);
const loading = ref(true);
const senaraiAcara = ref([]);

// Fail Upload states
const selectedFile = ref(null);
const imagePreview = ref(null);

// Modal states
const showModalPeserta = ref(false);
const isFetchingPeserta = ref(false);
const senaraiPeserta = ref([]);
const tajukModal = ref('');

const form = ref({
  nama_pertandingan: '', keterangan: '', tarikh_kejohanan: '', tarikh_tutup_pendaftaran: '', emel_urusetia: '', no_tel_urusetia: ''
});

// Menangkap fail baru & janakan prebiu gambar lokal
const onFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  selectedFile.value = file;
  imagePreview.value = URL.createObjectURL(file);
};

const fetchAcara = async () => {
  loading.value = true;
  try {
    const res = await api.get('/pertandingan/aktif'); 
    senaraiAcara.value = res.data.data;
  } catch (error) {
    alert("Gagal menarik senarai acara dari pelayan.");
  } finally {
    loading.value = false;
  }
};

const simpanAcara = async () => {
  isSaving.value = true;
  
  // WAJIB: Tukar payload kepada FormData kerana mempunyai objek fail imej
  const formData = new FormData();
  formData.append('nama_pertandingan', form.value.nama_pertandingan);
  formData.append('keterangan', form.value.keterangan);
  formData.append('tarikh_kejohanan', form.value.tarikh_kejohanan);
  formData.append('tarikh_tutup_pendaftaran', form.value.tarikh_tutup_pendaftaran);
  formData.append('emel_urusetia', form.value.emel_urusetia);
  formData.append('no_tel_urusetia', form.value.no_tel_urusetia);
  
  if (selectedFile.value) {
    formData.append('poster', selectedFile.value); // 'poster' sepadan dengan upload.single('poster') di backend
  }

  try {
    const res = await api.post('/pertandingan/admin/buka', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    alert(res.data.message);
    
    // Reset Form & state gambar
    form.value = { nama_pertandingan: '', keterangan: '', tarikh_kejohanan: '', tarikh_tutup_pendaftaran: '', emel_urusetia: '', no_tel_urusetia: '' };
    selectedFile.value = null;
    imagePreview.value = null;
    showForm.value = false;
    
    fetchAcara();
  } catch (error) {
    alert(error.response?.data?.message || "Gagal menghebahkan acara.");
  } finally {
    isSaving.value = false;
  }
};

const lihatPeserta = async (id, nama) => {
  tajukModal.value = nama;
  showModalPeserta.value = true;
  isFetchingPeserta.value = true;
  senaraiPeserta.value = [];
  try {
    const res = await api.get(`/pertandingan/admin/peserta/${id}`);
    senaraiPeserta.value = res.data.data;
  } catch (error) {
    alert("Gagal memuatkan senarai peserta sukan.");
  } finally {
    isFetchingPeserta.value = false;
  }
};

const acarasNameClean = (name) => {
  if(!name) return '';
  // Regex yang betul untuk membuang teks pelik seperti jika ada
  return name.replace(/\/+/gi, '').trim();
};

const formatTarikh = (tarikh) => {
  if(!tarikh) return '';
  const d = new Date(tarikh);
  return d.toLocaleDateString('ms-MY', { day: '2-digit', month: 'short', year: 'numeric' });
};

onMounted(fetchAcara);
</script>
<style scoped>
.animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
</style>

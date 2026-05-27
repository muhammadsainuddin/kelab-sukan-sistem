<template>
  <div class="max-w-md mx-auto p-4 space-y-4 animate-fade-in pb-24 font-sans bg-[#F8FAFC] min-h-screen">
    
    <div class="bg-gradient-to-br from-[#0A192F] to-[#162C4E] text-white p-5 rounded-[20px] shadow-lg relative overflow-hidden border border-white/5">
      <div class="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
      <div class="relative z-10 flex justify-between items-start">
        <div>
          <h2 class="text-base font-black tracking-tight uppercase leading-none">Bantuan Kebajikan</h2>
          <p class="text-[9px] text-blue-300/80 font-bold tracking-[0.15em] mt-1.5 uppercase flex items-center gap-1.5">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            Sesi {{ tahunSemasa }} - {{ tahunSemasa + 2 }}
          </p>
        </div>
        <div class="bg-blue-500/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-blue-500/20 flex items-center gap-1.5">
           <div class="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
           <span class="text-[8px] font-black text-blue-400 uppercase tracking-widest">Sistem Aktif</span>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="flex flex-col justify-center items-center py-16 space-y-3">
      <div class="relative w-8 h-8">
        <div class="absolute inset-0 border-2 border-blue-50 rounded-full"></div>
        <div class="absolute inset-0 border-2 border-t-[#0A192F] rounded-full animate-spin"></div>
      </div>
      <span class="text-[9px] text-gray-400 font-black tracking-[0.2em] uppercase">Memuatkan Rekod...</span>
    </div>

    <div v-else class="space-y-4">
      
      <div class="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-3">
          <div>
            <p class="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mb-0.5">Status Kelayakan</p>
            <h3 class="text-sm font-black uppercase tracking-tight" :class="isAhliAktif ? 'text-emerald-600' : 'text-rose-600'">
              {{ isAhliAktif ? 'LAYAK MEMOHON' : 'TIDAK LAYAK' }}
            </h3>
          </div>
          <div class="h-10 w-10 rounded-xl flex items-center justify-center border transition-all duration-700 shadow-inner" 
               :class="isAhliAktif ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'">
            <svg v-if="isAhliAktif" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
        </div>
        <div class="p-3 rounded-xl text-[9px] font-bold leading-relaxed border" 
             :class="isAhliAktif ? 'bg-emerald-50/40 text-emerald-800 border-emerald-100' : 'bg-rose-50/40 text-rose-800 border-rose-100'">
           {{ isAhliAktif ? 'Keahlian anda aktif. Anda layak menikmati kemudahan bantuan kelab untuk kejadian luar jangka.' : 'Keahlian belum aktif / luput. Sumbangan adalah TERHAD kepada ahli yang telah membuat bayaran yuran Kelab PERHILITAN.' }}
        </div>
      </div>

      <div v-if="isAhliAktif" class="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
        <div class="bg-gray-50/50 border-b border-gray-100 px-4 py-3 flex justify-between items-center">
          <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Borang Permohonan Baru</span>
        </div>

        <form @submit.prevent="hantarPermohonan" class="p-4 space-y-3">
          
          <div class="bg-[#F1F5F9] p-3 rounded-xl border border-gray-200">
            <label class="block text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Kategori Sumbangan</label>
            <select v-model="formData.jenis_bantuan" required class="w-full bg-white border border-gray-200 text-[10px] font-bold rounded-lg p-2 outline-none focus:ring-1 focus:ring-blue-500">
              <option value="" disabled>-- Pilih Kategori --</option>
              <optgroup label="1. Kematian">
                <option value="Khairat Kematian">Khairat Kematian</option>
              </optgroup>
              <optgroup label="2. Kemalangan">
                <option value="Kemalangan (Rawatan Luar)">Rawatan Luar (Tidak Dimasukkan Wad)</option>
                <option value="Kemalangan (Warded)">Dimasukkan Wad (Warded)</option>
              </optgroup>
              <optgroup label="3. Bencana Alam">
                <option value="Bencana Alam (Banjir)">Banjir</option>
                <option value="Bencana Alam (Kebakaran)">Kebakaran</option>
                <option value="Bencana Alam (Lain-lain)">Apa-apa bencana yang lain</option>
              </optgroup>
              <optgroup label="4. Sumbangan Kritikal & Luar Jangka">
                <option value="Kes Kritikal / Luar Jangka">Kakitangan Hilang/Sesat, Koma dan lain-lain</option>
              </optgroup>
              <optgroup label="5. Persaraan">
                <option value="Persaraan">Saguhati Penghargaan Persaraan</option>
              </optgroup>
            </select>
          </div>

          <div class="bg-[#F1F5F9] p-3 rounded-xl border border-gray-200">
            <label class="block text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Butiran Lanjut / Tarikh Kejadian</label>
            <textarea v-model="formData.keterangan" rows="2" required placeholder="Nyatakan butiran ringkas..." class="w-full bg-white border border-gray-200 text-[10px] font-bold rounded-lg p-2 outline-none focus:ring-1 focus:ring-blue-500 resize-none"></textarea>
          </div>

          <div class="bg-[#F1F5F9] p-3 rounded-xl border border-gray-200">
            <label class="flex justify-between items-center text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1.5">
              <span>Dokumen Sokongan (PDF Sahaja)</span>
              <span class="text-blue-500">{{ selectedFiles.length }} / 20 Fail</span>
            </label>
            
            <div class="relative w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-white transition-colors group">
              <input type="file" multiple accept=".pdf,application/pdf" @change="handleFileUpload" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <svg class="w-5 h-5 text-gray-400 mx-auto mb-1 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              <span class="text-[9px] font-bold text-gray-500 group-hover:text-blue-600">Tekan atau lepaskan fail ke sini</span>
            </div>

            <div v-if="selectedFiles.length > 0" class="mt-2 space-y-1.5 max-h-32 overflow-y-auto custom-scrollbar pr-1">
              <div v-for="(file, index) in selectedFiles" :key="index" class="flex justify-between items-center bg-white px-2.5 py-1.5 rounded-lg border border-gray-100 shadow-sm">
                <div class="flex items-center gap-2 truncate pr-2">
                  <svg class="w-3.5 h-3.5 text-rose-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
                  <span class="text-[9px] font-bold text-gray-700 truncate">{{ file.name }}</span>
                </div>
                <button type="button" @click="removeFile(index)" class="p-1 hover:bg-rose-50 text-gray-400 hover:text-rose-500 rounded-md transition-colors shrink-0">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
            </div>
          </div>

          <div class="pt-1">
            <button type="submit" :disabled="isProcessing"
              class="w-full py-3 bg-[#0A192F] text-white rounded-xl active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 shadow-md transition-all">
              <span v-if="isProcessing" class="text-[9px] font-black uppercase tracking-widest animate-pulse">Memuat Naik...</span>
              <template v-else>
                 <span class="text-[10px] font-black uppercase tracking-widest">Hantar Permohonan</span>
                 <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              </template>
            </button>
          </div>
          <p class="text-[8px] text-center font-bold text-gray-400 mt-1 uppercase">Sumbangan kes kemalangan / bencana adalah secara lump-sum.</p>
        </form>
      </div>

      <div class="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
          <h3 class="text-[10px] font-black text-gray-700 uppercase tracking-widest flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
            Rekod Permohonan
          </h3>
          <button @click="fetchSejarahBantuan" class="p-1.5 hover:bg-white rounded-full active:scale-90" title="Muat Semula">
            <svg :class="{'animate-spin': isSyncing}" class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          </button>
        </div>
        
        <div class="divide-y divide-gray-50">
          <div v-if="sejarahBantuan.length === 0" class="text-center py-6 text-[9px] text-gray-400 font-bold uppercase tracking-widest">Tiada rekod permohonan.</div>
          <div v-else v-for="rekod in sejarahBantuan" :key="rekod.id" 
               @click="bukaDetails(rekod)"
               class="px-4 py-3 flex justify-between items-center active:bg-gray-50 cursor-pointer">
            <div class="flex items-center gap-3 min-w-0 pr-2">
              <div class="w-1 h-7 rounded-full shrink-0" 
                   :class="rekod.status === 'LULUS' ? 'bg-emerald-500' : (rekod.status === 'DITOLAK' ? 'bg-rose-500' : 'bg-amber-500')"></div>
              <div class="min-w-0">
                <p class="font-black text-gray-900 text-[10px] uppercase truncate">{{ rekod.jenis_bantuan }}</p>
                <span class="text-[8px] font-bold text-gray-400 block mt-0.5">{{ rekod.tarikh_mohon }}</span>
              </div>
            </div>
            <div class="text-right shrink-0">
              <span class="text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border inline-block"
                    :class="rekod.status === 'LULUS' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : (rekod.status === 'DITOLAK' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-amber-50 text-amber-700 border-amber-100')">
                {{ rekod.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      
      <Transition name="toast-fade">
        <div v-if="notification.show" class="fixed top-6 left-0 right-0 z-[10000] px-4 flex justify-center pointer-events-none">
          <div class="w-full max-w-[340px] p-4 rounded-[20px] shadow-2xl border border-gray-100 flex flex-col gap-3 animate-slide-down bg-white pointer-events-auto">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-inner"
                   :class="notification.type === 'BERJAYA' ? 'bg-emerald-500 text-white shadow-emerald-500/20' : (notification.type === 'RALAT' ? 'bg-rose-500 text-white shadow-rose-500/20' : 'bg-blue-500 text-white shadow-blue-500/20')">
                <svg v-if="notification.type === 'BERJAYA'" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                <svg v-else-if="notification.type === 'RALAT'" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-xs font-black uppercase tracking-wider" :class="notification.type === 'BERJAYA' ? 'text-emerald-800' : (notification.type === 'RALAT' ? 'text-rose-800' : 'text-blue-800')">
                  {{ notification.type === 'RALAT' ? 'Makluman Ralat' : 'Makluman Sistem' }}
                </h4>
                <p class="text-[10px] text-gray-500 font-bold leading-snug mt-0.5">{{ notification.message }}</p>
              </div>
              <button @click="notification.show = false" class="text-gray-400 hover:text-gray-600 p-1 bg-gray-50 rounded-full"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            </div>
          </div>
        </div>
      </Transition>

      <div v-if="modalDetails.show" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
         <div class="absolute inset-0 bg-[#0A192F]/80 backdrop-blur-sm" @click="modalDetails.show = false"></div>
         <div class="bg-white rounded-[20px] w-full max-w-[280px] shadow-2xl relative z-10 animate-pop-in flex flex-col overflow-hidden">
           
           <div class="px-4 py-3 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <span class="text-[9px] font-black text-gray-500 uppercase tracking-widest">Butiran Permohonan</span>
              <button @click="modalDetails.show = false" class="p-1 bg-white text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all border border-gray-200">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
           </div>

           <div class="p-4 space-y-3">
              <div class="text-center pb-2 border-b border-dashed border-gray-200">
                 <p class="text-[11px] font-black text-[#0A192F] uppercase tracking-tight leading-tight">{{ modalDetails.data.jenis_bantuan }}</p>
                 <div class="mt-2 flex justify-center">
                    <span class="px-2.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border"
                          :class="modalDetails.data.status === 'LULUS' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : (modalDetails.data.status === 'DITOLAK' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-amber-50 text-amber-700 border-amber-100')">
                      {{ modalDetails.data.status === 'PENDING' ? 'DALAM PROSES' : modalDetails.data.status }}
                    </span>
                 </div>
              </div>
              
              <div class="space-y-2.5 px-1 py-1">
                 <div>
                   <span class="text-[8px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Tarikh Mohon</span>
                   <span class="text-[10px] font-black text-gray-800 block">{{ modalDetails.data.tarikh_mohon }}</span>
                 </div>
                 <div>
                   <span class="text-[8px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Keterangan Ahli</span>
                   <span class="text-[10px] font-bold text-gray-800 block p-2 bg-gray-50 rounded-lg border border-gray-100 leading-snug">{{ modalDetails.data.keterangan || 'Tiada butiran' }}</span>
                 </div>
                 <div v-if="modalDetails.data.catatan_admin">
                   <span class="text-[8px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Ulasan Urusetia</span>
                   <span class="text-[10px] font-black text-blue-800 block p-2 bg-blue-50 rounded-lg border border-blue-100 leading-snug">{{ modalDetails.data.catatan_admin }}</span>
                 </div>
                 
                 <div v-if="modalDetails.data.dokumen_sokongan" class="mt-2 flex items-center gap-1.5 text-[9px] text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"></path></svg>
                    Dokumen dilampirkan
                 </div>
              </div>

              <div class="pt-2">
                 <button @click="modalDetails.show = false" class="w-full py-2.5 bg-[#0A192F] text-white rounded-xl font-black text-[9px] uppercase tracking-widest active:scale-95 transition-all">Tutup Paparan</button>
              </div>
           </div>
         </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '../../../services/api'; 

const profil = ref({});
const sejarahBantuan = ref([]); 
const isLoading = ref(true);
const isProcessing = ref(false);
const isSyncing = ref(false);

const formData = ref({
  jenis_bantuan: '',
  keterangan: ''
});
const selectedFiles = ref([]);

const notification = ref({ show: false, type: '', message: '' });
const modalDetails = ref({ show: false, data: null });

const d = new Date();
const tahunSemasa = d.getFullYear();

const isAhliAktif = computed(() => profil.value.status_ahli === 'A - Aktif' || profil.value.pilihan_potongan === 'Potongan Gaji / Jabatan');

const fetchProfilAhli = async () => {
  try {
    const response = await api.get('/ahli/profil');
    profil.value = response.data.data;
  } catch (error) { console.error(error); } finally { isLoading.value = false; }
};

const fetchSejarahBantuan = async () => {
  isSyncing.value = true;
  try {
    const response = await api.get('/bantuan/sejarah');
    sejarahBantuan.value = response.data.data || [];
  } catch (error) { console.error(error); } finally { isSyncing.value = false; }
};

// Logik Kendali Muat Naik Dokumen PDF
const handleFileUpload = (event) => {
  const files = Array.from(event.target.files);
  
  // Semak had 20 fail
  if (selectedFiles.value.length + files.length > 20) {
    notification.value = { show: true, type: 'RALAT', message: 'Maksimum 20 dokumen sahaja dibenarkan.' };
    setTimeout(() => { notification.value.show = false; }, 4000);
    return;
  }

  // Tapis hanya fail PDF
  const validFiles = files.filter(f => f.type === 'application/pdf');
  
  if (validFiles.length !== files.length) {
    notification.value = { show: true, type: 'RALAT', message: 'Hanya fail berformat PDF (.pdf) dibenarkan.' };
    setTimeout(() => { notification.value.show = false; }, 4000);
  }

  selectedFiles.value.push(...validFiles);
  
  // Reset input file supaya boleh pilih fail yang sama lagi jika dipadam
  event.target.value = '';
};

const removeFile = (index) => {
  selectedFiles.value.splice(index, 1);
};

const hantarPermohonan = async () => {
  isProcessing.value = true;
  try {
    // Membina objek FormData untuk penghantaran teks + fail ke backend
    const uploadData = new FormData();
    uploadData.append('jenis_bantuan', formData.value.jenis_bantuan);
    uploadData.append('keterangan', formData.value.keterangan);
    
    selectedFiles.value.forEach((file) => {
      uploadData.append('dokumen', file); // 'dokumen' adalah key yang akan dibaca oleh multer di backend
    });

    // Menghantar POST dengan content-type multipart
    const response = await api.post('/bantuan/mohon', uploadData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    if (response.data.success) {
      notification.value = {
        show: true, type: 'BERJAYA',
        message: 'Permohonan bantuan dan dokumen sokongan anda telah berjaya dihantar.'
      };
      
      formData.value.jenis_bantuan = '';
      formData.value.keterangan = '';
      selectedFiles.value = [];
      
      await fetchSejarahBantuan();
    }
  } catch (error) {
    const errMessage = error.response?.data?.message || "Gagal menghantar permohonan. Sila cuba lagi.";
    notification.value = { show: true, type: 'RALAT', message: errMessage };
  } finally {
    isProcessing.value = false;
    setTimeout(() => { notification.value.show = false; }, 5000);
  }
};

const bukaDetails = (rekod) => {
  modalDetails.value = { show: true, data: rekod };
};

onMounted(() => {
  fetchProfilAhli();
  // fetchSejarahBantuan(); // Buka komen jika API sedia ada
});
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

.animate-pop-in { animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

.animate-slide-down { animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes slideDown { 
  from { opacity: 0; transform: translateY(-40px); } 
  to { opacity: 1; transform: translateY(0); } 
}

/* Membuang gaya lalai untuk elemen form */
select, textarea { -webkit-appearance: none; -moz-appearance: none; appearance: none; }

/* Custom scrollbar untuk senarai fail */
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
</style>
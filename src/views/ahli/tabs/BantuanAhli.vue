<template>
  <div class="p-4 max-w-2xl mx-auto space-y-6 pb-24 animate-fade-in">
    
    <div class="text-left mt-2 mb-6">
      <h2 class="text-2xl font-black text-gray-900 tracking-tight uppercase">Bantuan Kebajikan</h2>
      <p class="text-xs text-gray-500 font-medium mt-0.5">Permohonan sumbangan dan tuntutan ahli kelab.</p>
    </div>

    <div v-if="!loading && !profil.is_paid" class="bg-red-50 p-8 rounded-[32px] border border-red-100 flex flex-col items-center text-center shadow-sm">
      <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-5">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
      </div>
      <h3 class="text-base font-black text-red-800 uppercase tracking-widest">Akses Disekat</h3>
      <p class="text-xs text-red-600 mt-2 font-medium leading-relaxed max-w-xs">
        Borang permohonan bantuan dikunci kerana anda mempunyai tunggakan yuran atau belum mengaktifkan keahlian. Sila buat pembayaran di tab Yuran terlebih dahulu.
      </p>
    </div>

    <div v-else-if="!loading" class="space-y-6">
      <div class="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm">
        <h3 class="text-sm font-black text-blue-800 uppercase tracking-widest border-b border-gray-100 pb-3 mb-5">Borang Permohonan</h3>
        <form @submit.prevent="submitBantuan" class="space-y-5">
          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Jenis Tuntutan / Bantuan</label>
            <select v-model="form.jenis_bantuan" required class="w-full border border-gray-300 rounded-2xl px-4 py-3.5 text-sm font-bold bg-white outline-none focus:border-blue-500 shadow-sm">
              <option value="" disabled>Pilih Jenis</option>
              <option value="Kematian Ahli">Sumbangan Kematian Ahli</option>
              <option value="Kematian Pasangan/Anak/Ibu Bapa">Sumbangan Kematian Tanggungan</option>
              <option value="Kemasukan Wad (Lebih 3 Hari)">Sumbangan Masuk Wad</option>
              <option value="Bencana Alam">Bantuan Bencana Alam</option>
              <option value="Anak Cemerlang">Hadiah Kecemerlangan Anak</option>
            </select>
          </div>
          
          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Keterangan / Butiran</label>
            <textarea v-model="form.keterangan" required placeholder="Nyatakan tarikh kejadian atau butiran ringkas..." class="w-full border border-gray-300 rounded-2xl px-4 py-4 text-sm font-medium h-24 resize-none outline-none focus:border-blue-500 shadow-sm"></textarea>
          </div>
          
          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Dokumen Sokongan (Resit/Sijil)</label>
            <input type="file" @change="onFileChange" accept="image/*,.pdf" class="w-full text-xs file:mr-3 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-blue-50 file:text-blue-700 bg-white border border-gray-200 rounded-2xl p-1.5 cursor-pointer">
          </div>
          
          <button type="submit" :disabled="isSubmitting" class="w-full bg-blue-700 hover:bg-blue-800 text-white text-xs font-black uppercase tracking-widest py-4 rounded-full shadow-lg shadow-blue-700/20 active:scale-95 transition-all mt-2">
            {{ isSubmitting ? 'Menghantar Data...' : 'Hantar Permohonan Bantuan' }}
          </button>
        </form>
      </div>

      <div class="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm">
        <h3 class="text-sm font-black text-gray-800 uppercase tracking-widest border-b border-gray-100 pb-3 mb-5">Rekod Tuntutan Saya</h3>
        <div v-if="sejarah.length === 0" class="text-center py-6 text-xs text-gray-400 font-bold uppercase tracking-widest">Tiada rekod tuntutan.</div>
        <div v-else class="space-y-3">
          <div v-for="rekod in sejarah" :key="rekod.id" class="p-4 border border-gray-100 rounded-2xl bg-gray-50/50">
            <div class="flex justify-between items-start mb-2">
              <span class="text-xs font-black text-gray-900 uppercase">{{ rekod.jenis_bantuan }}</span>
              <span class="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md"
                    :class="rekod.status_permohonan === 'LULUS' ? 'bg-green-100 text-green-700' : (rekod.status_permohonan === 'DITOLAK' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700')">
                {{ rekod.status_permohonan }}
              </span>
            </div>
            <p class="text-[11px] text-gray-500 font-medium line-clamp-2 leading-relaxed">{{ rekod.keterangan }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../../services/api';

const profil = ref({});
const sejarah = ref([]);
const loading = ref(true);
const isSubmitting = ref(false);

const form = ref({ jenis_bantuan: '', keterangan: '' });
const dokumenFile = ref(null);

const fetchProfilDanSejarah = async () => {
  try {
    const resProfil = await api.get('/ahli/profil');
    profil.value = resProfil.data.data;
    
    // Jika berbayar, tarik sejarah
    if (profil.value.is_paid) {
      const resSejarah = await api.get('/ahli/bantuan/sejarah');
      sejarah.value = resSejarah.data.data || [];
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const onFileChange = (e) => dokumenFile.value = e.target.files[0];

const submitBantuan = async () => {
  isSubmitting.value = true;
  try {
    const formData = new FormData();
    formData.append('jenis_bantuan', form.value.jenis_bantuan);
    formData.append('keterangan', form.value.keterangan);
    if (dokumenFile.value) formData.append('dokumen', dokumenFile.value);

    await api.post('/ahli/bantuan', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    alert("Permohonan berjaya dihantar kepada Urusetia Kelab.");
    form.value = { jenis_bantuan: '', keterangan: '' };
    dokumenFile.value = null;
    fetchProfilDanSejarah();
  } catch (error) {
    alert("Gagal menghantar permohonan.");
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(fetchProfilDanSejarah);
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
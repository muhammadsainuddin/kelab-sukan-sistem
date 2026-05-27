<template>
  <div class="p-4 sm:p-6 bg-gray-50/50 min-h-screen animate-fade-in font-sans">
    
    <div class="max-w-7xl mx-auto space-y-6">
      
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-[20px] shadow-sm border border-gray-100">
        <div>
          <h1 class="text-xl font-black text-gray-800 uppercase tracking-tight flex items-center gap-2">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            Direktori Bersepadu
          </h1>
          <p class="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Master Kakitangan & Status Kelab ({{ senaraiData.length }} Rekod)</p>
        </div>
        
        <button @click="eksportKeExcel" class="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Eksport Data
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="relative">
          <input v-model="searchQuery" type="text" placeholder="Cari nama atau no. kad pengenalan..." 
                 class="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-[16px] text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm transition-all"/>
          <svg class="w-4 h-4 text-gray-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        
        <div>
          <select v-model="filterStatus" class="w-full px-4 py-3 bg-white border border-gray-200 rounded-[16px] text-xs font-bold text-gray-600 focus:outline-none shadow-sm cursor-pointer appearance-none">
            <option value="SEMUA">Semua Status Keahlian</option>
            <option value="A - Aktif">Aktif (Telah Membayar)</option>
            <option value="TIDAK BERBAYAR">Tidak Berbayar / Expired</option>
            <option value="BELUM MENDAFTAR">Belum Mendaftar Kelab</option>
          </select>
        </div>

        <div>
          <select v-model="filterPotongan" class="w-full px-4 py-3 bg-white border border-gray-200 rounded-[16px] text-xs font-bold text-gray-600 focus:outline-none shadow-sm cursor-pointer appearance-none">
            <option value="SEMUA">Semua Jenis Potongan</option>
            <option value="Biro Angkasa">Biro Angkasa</option>
            <option value="Potongan FPX">FPX (ToyyibPay)</option>
            <option value="Gaji / Jabatan">Potongan Gaji / Jabatan</option>
            <option value="TIADA">Tiada Potongan (Belum Daftar)</option>
          </select>
        </div>
      </div>

      <div class="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden relative">
        <div v-if="isLoading" class="p-20 flex flex-col items-center justify-center space-y-3">
           <svg class="w-8 h-8 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
           <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Menyusun Data...</span>
        </div>
        
        <div v-else class="overflow-x-auto">
          <table class="w-full whitespace-nowrap">
            <thead class="bg-gray-50/80 border-b border-gray-100">
              <tr>
                <th class="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Maklumat Kakitangan</th>
                <th class="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Jabatan & Gred</th>
                <th class="px-6 py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Status Kelab</th>
                <th class="px-6 py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Mod Bayaran</th>
                <th class="px-6 py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Tindakan</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="ahli in filteredSenarai" :key="ahli.no_kp" class="hover:bg-blue-50/20 transition-colors">
                
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-black text-gray-500 border border-gray-200">
                      {{ ahli.nama_penuh.charAt(0) }}
                    </div>
                    <div class="flex flex-col">
                      <span class="text-xs font-black text-gray-800 uppercase">{{ ahli.nama_penuh }}</span>
                      <div class="flex items-center gap-2 mt-0.5">
                        <span class="text-[10px] text-gray-500 font-mono font-bold">{{ ahli.no_kp }}</span>
                        <span v-if="ahli.no_ahli" class="text-[9px] font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">{{ ahli.no_ahli }}</span>
                      </div>
                    </div>
                  </div>
                </td>
                
                <td class="px-6 py-4">
                  <div class="flex flex-col">
                    <span class="text-[11px] font-bold text-gray-700">{{ ahli.penempatan || 'Tidak Dinyatakan' }}</span>
                    <span class="text-[9px] font-black text-gray-400 mt-0.5 uppercase tracking-widest">{{ ahli.gred_sspa || 'GRED N/A' }} | {{ ahli.kategori_staf || 'STAFF' }}</span>
                  </div>
                </td>
                
                <td class="px-6 py-4 text-center">
                  <span class="px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border inline-block"
                        :class="ahli.status_sebenar.includes('Aktif') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : (ahli.status_sebenar === 'BELUM MENDAFTAR' ? 'bg-gray-100 text-gray-500 border-gray-200' : 'bg-rose-50 text-rose-700 border-rose-200')">
                    {{ ahli.status_sebenar }}
                  </span>
                </td>
                
                <td class="px-6 py-4 text-center">
                  <span v-if="ahli.potongan_sebenar !== 'TIADA'" class="px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-1.5"
                        :class="ahli.potongan_sebenar.includes('Biro') ? 'bg-purple-50 text-purple-700' : (ahli.potongan_sebenar.includes('FPX') ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700')">
                    {{ ahli.potongan_sebenar.includes('Biro') ? 'Biro Angkasa' : (ahli.potongan_sebenar.includes('FPX') ? 'FPX' : 'Gaji Jabatan') }}
                  </span>
                  <span v-else class="text-[9px] font-bold text-gray-400">-</span>
                </td>
                
                <td class="px-6 py-4 text-center">
                  <button @click="bukaDetails(ahli)" class="p-2 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-xl transition-all border border-gray-100">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  </button>
                </td>

              </tr>
              <tr v-if="filteredSenarai.length === 0">
                <td colspan="5" class="px-6 py-16 text-center">
                  <p class="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Tiada rekod ditemui berdasarkan carian.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="modalDetails.show" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-[#0A192F]/80 backdrop-blur-sm" @click="modalDetails.show = false"></div>
        
        <div class="bg-white rounded-[24px] w-full max-w-lg shadow-2xl relative z-10 animate-pop-in flex flex-col max-h-[90vh] overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
             <span class="text-[10px] font-black text-gray-500 uppercase tracking-widest">Maklumat Ahli & Kakitangan</span>
             <button @click="modalDetails.show = false" class="p-1.5 bg-gray-200 text-gray-600 hover:bg-rose-500 hover:text-white rounded-full transition-all">
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
             </button>
          </div>

          <div class="p-6 overflow-y-auto space-y-6 bg-white">
             <div class="flex gap-4 items-center">
               <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-black border border-blue-100 shrink-0">
                 {{ modalDetails.data.nama_penuh.charAt(0) }}
               </div>
               <div>
                 <h2 class="text-lg font-black text-gray-900 leading-tight uppercase">{{ modalDetails.data.nama_penuh }}</h2>
                 <p class="text-xs font-mono font-bold text-gray-500 mt-0.5">{{ modalDetails.data.no_kp }}</p>
                 <div class="mt-2 flex gap-2">
                   <span class="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase rounded border border-emerald-100">{{ modalDetails.data.status_sebenar }}</span>
                   <span v-if="modalDetails.data.no_ahli" class="px-2 py-0.5 bg-blue-50 text-blue-700 text-[9px] font-black uppercase rounded border border-blue-100">ID: {{ modalDetails.data.no_ahli }}</span>
                 </div>
               </div>
             </div>

             <div class="bg-gray-50 p-5 rounded-2xl border border-gray-100 grid grid-cols-2 gap-y-4 gap-x-4">
               <div>
                 <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Jabatan / Penempatan</p>
                 <p class="text-[11px] font-black text-gray-800 leading-snug">{{ modalDetails.data.penempatan || 'N/A' }}</p>
               </div>
               <div>
                 <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Gred SSPA</p>
                 <p class="text-[11px] font-black text-gray-800">{{ modalDetails.data.gred_sspa || 'N/A' }}</p>
               </div>
               <div>
                 <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">No Telefon</p>
                 <p class="text-[11px] font-mono font-black text-gray-800">{{ modalDetails.data.no_tel || 'Tiada Rekod' }}</p>
               </div>
               <div>
                 <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">E-Mel</p>
                 <p class="text-[11px] font-black text-gray-800 break-all">{{ modalDetails.data.email || 'Tiada Rekod' }}</p>
               </div>
               <div class="col-span-2 border-t border-gray-200 pt-3 mt-1">
                 <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Kaedah Bayaran / Potongan</p>
                 <p class="text-xs font-black" :class="modalDetails.data.potongan_sebenar === 'TIADA' ? 'text-rose-600' : 'text-blue-700'">{{ modalDetails.data.potongan_sebenar }}</p>
               </div>
             </div>

             <div v-if="modalDetails.data.status_sebenar === 'BELUM MENDAFTAR'" class="bg-amber-50 p-4 rounded-xl border border-amber-100 flex gap-3">
                <svg class="w-5 h-5 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                <p class="text-[10px] text-amber-800 font-bold leading-relaxed">Kakitangan ini terdapat di dalam pengkalan data induk staf (HR) tetapi belum pernah log masuk dan mendaftarkan diri di dalam portal Kelab PERHILITAN.</p>
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
// import * as XLSX from 'xlsx'; // Buka komen ini jika anda menggunakan library xlsx untuk muat turun Excel

const senaraiData = ref([]);
const isLoading = ref(true);

// Filters
const searchQuery = ref('');
const filterStatus = ref('SEMUA');
const filterPotongan = ref('SEMUA');

const modalDetails = ref({ show: false, data: null });

const fetchDirektori = async () => {
    isLoading.value = true;
    try {
        // Gantikan url endpoint dengan route backend sebenar jika berbeza
        const res = await api.get('/admin/direktori-bersepadu');
        if (res.data.success) {
            senaraiData.value = res.data.data;
        }
    } catch (error) {
        console.error("Gagal menarik rekod bersepadu:", error);
    } finally {
        isLoading.value = false;
    }
};

const filteredSenarai = computed(() => {
    return senaraiData.value.filter(item => {
        // 1. Tapis Carian
        const matchesSearch = !searchQuery.value || 
            item.nama_penuh.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            item.no_kp.toLowerCase().includes(searchQuery.value.toLowerCase());
            
        // 2. Tapis Status Keahlian
        const matchesStatus = filterStatus.value === 'SEMUA' || 
            (filterStatus.value === 'A - Aktif' && item.status_sebenar.includes('Aktif')) ||
            item.status_sebenar === filterStatus.value;
            
        // 3. Tapis Jenis Potongan
        const matchesPotongan = filterPotongan.value === 'SEMUA' || 
            item.potongan_sebenar.includes(filterPotongan.value);

        return matchesSearch && matchesStatus && matchesPotongan;
    });
});

const bukaDetails = (ahli) => {
    modalDetails.value = { show: true, data: ahli };
};

const eksportKeExcel = () => {
    alert("Fungsi muat turun senarai berformat CSV/Excel akan disambungkan.");
    /* CONTOH PENGGUNAAN JIKA MENGGUNAKAN LIBRARY XLSX:
    const ws = XLSX.utils.json_to_sheet(filteredSenarai.value);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Direktori Bersepadu");
    XLSX.writeFile(wb, `Direktori_Ahli_Kelab_${new Date().getTime()}.xlsx`);
    */
};

onMounted(() => {
    fetchDirektori();
});
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

.animate-pop-in { animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

/* Custom select styling for dropdown arrows */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
}
</style>
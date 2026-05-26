<template>
    <div class="p-4 sm:p-6 bg-gray-50/50 min-h-screen animate-fade-in font-sans">
      
      <div class="max-w-7xl mx-auto space-y-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-[20px] shadow-sm border border-gray-100">
          <div>
            <h1 class="text-xl font-black text-gray-800 uppercase tracking-tight flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              Rekod Transaksi FPX
            </h1>
            <p class="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Senarai invois dan resit yuran kelab</p>
          </div>
          <div class="w-full sm:w-80 relative">
            <input v-model="searchQuery" type="text" placeholder="Cari nama, IC atau kod bil..." 
                   class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all"/>
            <svg class="w-4 h-4 text-gray-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
        </div>
  
        <div class="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden relative">
          <div v-if="isLoading" class="p-20 flex flex-col items-center justify-center space-y-3">
             <svg class="w-8 h-8 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
             <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Memuatkan Data...</span>
          </div>
          
          <div v-else class="overflow-x-auto">
            <table class="w-full whitespace-nowrap">
              <thead class="bg-gray-50/80 border-b border-gray-100">
                <tr>
                  <th class="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Maklumat Ahli</th>
                  <th class="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Rujukan / Tarikh</th>
                  <th class="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Amaun</th>
                  <th class="px-6 py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th class="px-6 py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Tindakan</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-for="resit in filteredSenarai" :key="resit.id" class="hover:bg-blue-50/20 transition-colors">
                  <td class="px-6 py-4">
                    <div class="flex flex-col">
                      <span class="text-xs font-black text-gray-800 uppercase">{{ resit.nama_penuh || 'N/A' }}</span>
                      <span class="text-[10px] text-gray-500 font-bold mt-0.5">{{ resit.no_kp }} <span v-if="resit.no_ahli" class="text-blue-500 ml-1">[{{ resit.no_ahli }}]</span></span>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex flex-col">
                      <span class="text-[11px] font-mono font-black text-gray-700">{{ resit.billCode }}</span>
                      <span class="text-[9px] font-bold text-gray-400 mt-0.5 uppercase">{{ resit.tarikh }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm font-black text-[#0A192F] font-mono">RM{{ parseFloat(resit.amaun).toFixed(2) }}</td>
                  <td class="px-6 py-4 text-center">
                    <span class="px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border inline-block"
                          :class="resit.status === 'BERJAYA' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : (resit.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-rose-50 text-rose-700 border-rose-100')">
                      {{ resit.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <button @click="bukaInvois(resit)" class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all active:scale-95">Lihat Resit</button>
                  </td>
                </tr>
                <tr v-if="filteredSenarai.length === 0">
                  <td colspan="5" class="px-6 py-12 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tiada rekod ditemui berdasarkan carian.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      <Teleport to="body">
        <div v-if="modalInvois.show" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-[#0A192F]/90 backdrop-blur-sm" @click="tutupInvois"></div>
          
          <div class="bg-white rounded-[24px] w-full max-w-2xl shadow-2xl relative z-10 animate-pop-in flex flex-col max-h-[90vh] overflow-hidden">
            
            <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 print:hidden">
               <span class="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                 <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                 Dokumen Resit Rasmi
               </span>
               <div class="flex gap-2">
                 <button @click="cetakInvois" class="px-4 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all active:scale-95">Cetak PDF</button>
                 <button @click="tutupInvois" class="p-1.5 bg-gray-200 text-gray-600 hover:bg-rose-500 hover:text-white rounded-full transition-all active:scale-95">
                   <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                 </button>
               </div>
            </div>
  
            <div id="print-area" class="p-8 overflow-y-auto bg-white text-gray-800">
               
               <div class="flex flex-col sm:flex-row justify-between items-start gap-6 border-b-2 border-[#0A192F] pb-6 mb-6">
                  <div class="max-w-sm">
                    <h1 class="text-lg font-black text-[#0A192F] uppercase leading-tight mb-2">Kelab Sukan dan Kebajikan Jabatan Perlindungan Hidupan Liar dan Taman Negara</h1>
                    <p class="text-[10px] font-bold text-gray-600 mb-1">No. Pertubuhan: <span class="font-black text-gray-900">PPM-006-14-27071985</span></p>
                    <p class="text-[9px] font-bold text-gray-500 leading-relaxed">
                      Ibu Pejabat Jabatan PERHILITAN,<br>
                      KM.10 Jalan Cheras, 56100 Cheras, Kuala Lumpur.
                    </p>
                    <p class="text-[9px] font-bold text-blue-600 mt-1">kelabperhilitan@gmail.com</p>
                  </div>
                  <div class="text-left sm:text-right w-full sm:w-auto">
                    <h2 class="text-3xl font-black text-gray-200 uppercase tracking-tighter mb-2" :class="modalInvois.data?.status === 'BERJAYA' ? 'text-emerald-100' : ''">INVOIS</h2>
                    <div class="inline-block bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 w-full sm:w-auto text-left sm:text-right">
                      <p class="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">No. Rujukan Bil</p>
                      <p class="text-xs font-mono font-black text-gray-900">{{ modalInvois.data?.billCode }}</p>
                    </div>
                    <p class="text-[9px] font-bold text-gray-500 mt-2 uppercase">Tarikh: <span class="font-black text-gray-800">{{ modalInvois.data?.tarikh }}</span></p>
                  </div>
               </div>
  
               <div class="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                  <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2 mb-2">Ditagihkan Kepada:</p>
                  <h3 class="text-sm font-black text-gray-900 uppercase">{{ modalInvois.data?.nama_penuh || 'Ahli Kelab' }}</h3>
                  <div class="grid grid-cols-2 gap-4 mt-3">
                     <div>
                       <p class="text-[8px] text-gray-500 font-bold uppercase tracking-widest">No. K/P</p>
                       <p class="text-[11px] font-mono font-black text-gray-800 mt-0.5">{{ modalInvois.data?.no_kp }}</p>
                     </div>
                     <div v-if="modalInvois.data?.no_ahli">
                       <p class="text-[8px] text-gray-500 font-bold uppercase tracking-widest">No. Ahli</p>
                       <p class="text-[11px] font-mono font-black text-gray-800 mt-0.5">{{ modalInvois.data?.no_ahli }}</p>
                     </div>
                     <div v-if="modalInvois.data?.no_tel">
                       <p class="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Telefon</p>
                       <p class="text-[11px] font-mono font-black text-gray-800 mt-0.5">{{ modalInvois.data?.no_tel }}</p>
                     </div>
                     <div v-if="modalInvois.data?.email">
                       <p class="text-[8px] text-gray-500 font-bold uppercase tracking-widest">E-mel</p>
                       <p class="text-[11px] font-black text-gray-800 mt-0.5">{{ modalInvois.data?.email }}</p>
                     </div>
                  </div>
               </div>
  
               <table class="w-full mb-6">
                  <thead>
                    <tr class="bg-[#0A192F] text-white">
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
                              :class="modalInvois.data?.status === 'BERJAYA' ? 'text-emerald-600' : (modalInvois.data?.status === 'PENDING' ? 'text-amber-500' : 'text-rose-600')">
                           {{ modalInvois.data?.status === 'BERJAYA' ? 'TELAH DIBAYAR' : modalInvois.data?.status }}
                        </span>
                     </div>
                  </div>
                  
                  <div class="w-full sm:w-1/2 max-w-xs text-right">
                     <div class="flex justify-between py-2 border-b border-gray-100">
                       <span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Subtotal</span>
                       <span class="text-xs font-mono font-black text-gray-800">RM {{ parseFloat(modalInvois.data?.amaun || 0).toFixed(2) }}</span>
                     </div>
                     <div class="flex justify-between py-2 border-b-2 border-[#0A192F]">
                       <span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Caj Transaksi</span>
                       <span class="text-xs font-mono font-black text-gray-800">RM 0.00</span>
                     </div>
                     <div class="flex justify-between py-3 bg-gray-50 px-3 rounded-b-lg">
                       <span class="text-[11px] font-black text-[#0A192F] uppercase tracking-widest">Jumlah Bersih</span>
                       <span class="text-xl font-mono font-black text-[#0A192F]">RM {{ parseFloat(modalInvois.data?.amaun || 0).toFixed(2) }}</span>
                     </div>
                  </div>
               </div>
  
               <div class="mt-12 pt-4 border-t border-gray-200 text-center">
                  <p class="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Ini adalah resit janaan komputer. Tiada tandatangan fizikal diperlukan.</p>
                  <p class="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Transaksi disulitkan dan diuruskan oleh ToyyibPay Gateway.</p>
               </div>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  // Sila ubah laluan ini jika api.js anda berada di lokasi berbeza
  import api from '../../../services/api'; 
  
  const senaraiResit = ref([]);
  const isLoading = ref(true);
  const searchQuery = ref('');
  const modalInvois = ref({ show: false, data: null });
  
  const fetchSemuaResit = async () => {
      isLoading.value = true;
      try {
          const res = await api.get('/admin/senarai-resit');
          if (res.data.success) {
              senaraiResit.value = res.data.data;
          }
      } catch (error) {
          console.error("Gagal menarik rekod:", error);
      } finally {
          isLoading.value = false;
      }
  };
  
  const filteredSenarai = computed(() => {
      if (!searchQuery.value) return senaraiResit.value;
      const query = searchQuery.value.toLowerCase();
      return senaraiResit.value.filter(item => {
          return (item.nama_penuh && item.nama_penuh.toLowerCase().includes(query)) ||
                 (item.no_kp && item.no_kp.toLowerCase().includes(query)) ||
                 (item.billCode && item.billCode.toLowerCase().includes(query));
      });
  });
  
  const bukaInvois = (resit) => {
      modalInvois.value = { show: true, data: resit };
  };
  
  const tutupInvois = () => {
      modalInvois.value = { show: false, data: null };
  };
  
  const cetakInvois = () => {
      const printContent = document.getElementById('print-area').innerHTML;
      const originalContent = document.body.innerHTML;
      
      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      
      window.location.reload(); 
  };
  
  onMounted(() => {
      fetchSemuaResit();
  });
  </script>
  
  <style scoped>
  .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
  
  .animate-pop-in { animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  @keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  
  @media print {
      body { background-color: white !important; margin: 0; padding: 0; }
      .print\:hidden { display: none !important; }
  }
  </style>
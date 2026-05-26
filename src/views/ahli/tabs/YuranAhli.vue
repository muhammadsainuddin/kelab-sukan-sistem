<template>
    <div class="p-4 space-y-5 animate-slide-up pb-24 font-sans bg-[#F4F6F8] min-h-screen">
      
      <div class="flex justify-between items-center bg-[#0A192F] text-white p-5 rounded-[20px] shadow-lg shadow-[#0A192F]/20 relative overflow-hidden">
        <div class="absolute -right-6 -top-6 w-24 h-24 border-[4px] border-white/5 rounded-full pointer-events-none"></div>
        <div class="absolute right-4 -bottom-8 w-24 h-24 border-[4px] border-white/5 rounded-full pointer-events-none"></div>
        
        <div class="relative z-10">
          <h2 class="text-base font-black tracking-widest uppercase text-white shadow-sm">Yuran Kelab</h2>
          <p class="text-[9px] text-[#8892B0] font-bold tracking-widest mt-1 uppercase">Sesi Kewangan {{ tahunSemasa }}</p>
        </div>
        <div class="relative z-10 flex items-center space-x-1.5 bg-[#112240] px-3 py-1.5 rounded-full border border-white/10">
          <svg class="w-3 h-3 text-[#64FFDA]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          <span class="text-[8px] font-black text-[#64FFDA] uppercase tracking-widest">Disulitkan</span>
        </div>
      </div>
  
      <div v-if="isLoading" class="flex flex-col justify-center items-center py-20 space-y-3">
        <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0A192F]"></div>
        <span class="text-[9px] text-gray-500 font-black tracking-widest uppercase">Mengesahkan Akaun...</span>
      </div>
  
      <div v-else class="space-y-5">
        
        <div class="bg-white rounded-[20px] p-5 shadow-sm border border-gray-200/60 relative overflow-hidden">
          <div class="flex items-center justify-between mb-4 whitespace-nowrap">
            <div>
              <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Status Akaun</p>
              <h3 class="text-sm font-black uppercase tracking-tight" :class="isAhliAktif ? 'text-green-600' : 'text-red-600'">
                {{ isAhliAktif ? 'AHLI BERBAYAR' : 'BELUM DIJELASKAN' }}
              </h3>
            </div>
            <div class="h-10 w-10 rounded-full flex items-center justify-center border-2" :class="isAhliAktif ? 'bg-green-50 border-green-200 text-green-600' : 'bg-red-50 border-red-200 text-red-600'">
              <svg v-if="isAhliAktif" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
            </div>
          </div>
  
          <div class="h-px bg-gray-100 mb-4"></div>
  
          <div>
            <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 whitespace-nowrap">Saluran Pengurusan Dana</p>
            
            <div v-if="isAhliAktif" class="flex items-center space-x-2 bg-[#F6FBF9] p-3 rounded-xl border border-[#D5EBE1]">
              <div class="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping shrink-0"></div>
              <span class="text-[10px] font-bold text-green-800 uppercase tracking-wide whitespace-nowrap">Potongan / Bayaran Aktif</span>
            </div>
            
            <div v-else class="flex items-center space-x-2 bg-red-50/50 p-3 rounded-xl border border-red-100">
              <svg class="w-3.5 h-3.5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>
              <div class="flex-1 min-w-0">
                <span class="block text-[10px] font-black text-red-800 uppercase tracking-wide whitespace-nowrap truncate">Perbankan Atas Talian (FPX)</span>
              </div>
            </div>
          </div>
        </div>
  
        <div class="bg-white rounded-[20px] shadow-sm border border-gray-200/60 overflow-hidden">
          <div class="bg-[#F8F9FA] border-b border-gray-200/60 p-4 flex items-center justify-between">
            <h3 class="text-[10px] font-black text-[#0A192F] uppercase tracking-widest flex items-center whitespace-nowrap">
              <svg class="w-3.5 h-3.5 mr-1.5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              Penyata Invois
            </h3>
            <span class="text-[9px] font-bold text-gray-400 font-mono tracking-widest">INV-{{ tahunSemasa }}</span>
          </div>
  
          <div class="p-5 space-y-3">
            
            <div class="flex justify-between items-center border-b border-dashed border-gray-200 pb-2.5 whitespace-nowrap">
              <span class="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Gred Jawatan</span>
              <span class="text-[10px] font-black text-gray-900">{{ profil.gred_sspa || 'N/A' }}</span>
            </div>
  
            <div v-if="!isAhliAktif" class="border-b border-dashed border-gray-200 pb-2.5">
              <div class="flex justify-between items-center whitespace-nowrap mb-2.5">
                <span class="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Kategori Kakitangan</span>
                <span class="text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest" :class="isStaffBaru ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-700'">
                  {{ isStaffBaru ? 'STAF BAHARU' : 'STAF SEDIA ADA' }}
                </span>
              </div>
  
              <div v-if="isStaffBaru" class="bg-[#F8F9FA] p-3 rounded-xl border border-gray-200/50 mt-1">
                <label class="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Bulan Lapor Diri</label>
                <select v-model="bulanLaporDiri" class="w-full bg-white border border-gray-300 text-gray-800 text-[10px] font-bold rounded-lg focus:ring-[#0A192F] focus:border-[#0A192F] block p-2 shadow-sm outline-none">
                  <option v-for="(bulan, index) in senaraiBulan" :key="index" :value="index + 1">{{ bulan }}</option>
                </select>
              </div>
            </div>
  
            <div class="flex justify-between items-center border-b border-dashed border-gray-200 pb-2.5 whitespace-nowrap pt-1">
              <span class="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Kadar Bulanan</span>
              <span class="text-[11px] font-mono font-black text-gray-900">RM {{ kadarYuran.toFixed(2) }}</span>
            </div>
  
            <div class="flex justify-between items-center border-b border-dashed border-gray-200 pb-2.5 whitespace-nowrap pt-1">
              <span class="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Mula Kuatkuasa</span>
              <span class="text-[10px] font-black text-gray-900">{{ namaBulanMulaCaj }}</span>
            </div>
  
            <div class="flex justify-between items-center border-b border-dashed border-gray-200 pb-2.5 whitespace-nowrap pt-1">
              <span class="text-[10px] text-gray-500 font-bold uppercase tracking-wide">Kuantiti Bulan</span>
              <span class="text-[11px] font-mono font-black text-gray-900">{{ jumlahBulanKira }}x</span>
            </div>
            
            <div class="flex justify-between items-center pt-2 whitespace-nowrap">
              <span class="text-[11px] font-black text-[#0A192F] uppercase tracking-widest">Jumlah Perlu Dibayar</span>
              <span class="text-lg font-mono font-black text-[#0A192F]">RM {{ jumlahPerluBayar.toFixed(2) }}</span>
            </div>
  
          </div>
        </div>
  
        <div class="pt-2">
          <template v-if="!isAhliAktif">
            <button 
              @click="bayarYuranFPX" 
              :disabled="jumlahPerluBayar <= 0 || isProcessing"
              class="w-full relative py-3.5 px-4 bg-[#0A192F] hover:bg-[#112240] text-white rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#0A192F]/20 flex items-center justify-between overflow-hidden"
            >
              <div class="flex items-center space-x-2 whitespace-nowrap">
                <span v-if="isProcessing" class="text-[10px] font-black uppercase tracking-widest ml-2">Menyambung Ke FPX...</span>
                <span v-else class="text-[11px] font-black uppercase tracking-widest ml-2">Pay By</span>
                
                <div v-if="!isProcessing" class="bg-white px-2 py-0.5 rounded-sm flex items-center shadow-inner ml-2">
                  <span class="text-red-600 font-black italic text-[11px] leading-none tracking-tighter">F</span>
                  <span class="text-blue-800 font-black italic text-[11px] leading-none tracking-tighter">P</span>
                  <span class="text-yellow-500 font-black italic text-[11px] leading-none tracking-tighter">X</span>
                </div>
              </div>
  
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
            
            <div class="flex items-center justify-center space-x-1.5 mt-3">
              <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              <p class="text-center text-[9px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                Pembayaran selamat menerusi ToyyibPay
              </p>
            </div>
          </template>
  
          <div v-else class="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start space-x-3 shadow-sm">
            <svg class="w-4 h-4 text-green-600 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
            <div class="text-[10px] text-green-800 leading-relaxed font-medium">
              <span class="font-black block mb-0.5 uppercase tracking-wide">Komitmen Aktif</span>
              Rekod keahlian anda diuruskan secara automatik. Tiada bayaran manual diperlukan untuk tahun semasa.
            </div>
          </div>
        </div>
      </div>
  
      <div v-if="modalResit.show" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="modalResit.show = false"></div>
        <div class="bg-white rounded-[24px] w-full max-w-sm shadow-2xl relative z-10 overflow-hidden animate-slide-up">
          
          <div class="p-6 text-center" :class="modalResit.status === '1' ? 'bg-green-50 border-b border-green-100' : (modalResit.status === '3' ? 'bg-amber-50 border-b border-amber-100' : 'bg-red-50 border-b border-red-100')">
            <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm" :class="modalResit.status === '1' ? 'bg-green-500 text-white' : (modalResit.status === '3' ? 'bg-amber-500 text-white' : 'bg-red-500 text-white')">
              <svg v-if="modalResit.status === '1'" class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
              <svg v-else-if="modalResit.status === '3'" class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <svg v-else class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
            </div>
            <h3 class="text-lg font-black uppercase tracking-tight" :class="modalResit.status === '1' ? 'text-green-800' : (modalResit.status === '3' ? 'text-amber-800' : 'text-red-800')">
              {{ modalResit.status === '1' ? 'Transaksi Berjaya' : (modalResit.status === '3' ? 'Menunggu Pengesahan' : 'Transaksi Gagal') }}
            </h3>
          </div>
  
          <div class="p-6 space-y-4">
            <p class="text-xs text-center text-gray-600 font-medium leading-relaxed">
              {{ modalResit.msg }}
            </p>
            <div class="bg-gray-50 rounded-xl p-3 border border-gray-200/50 flex justify-between items-center">
              <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">No Rujukan FPX</span>
              <span class="text-xs font-mono font-bold text-gray-800">{{ modalResit.ref || '-' }}</span>
            </div>
            
            <button @click="tutupModalResit" class="w-full py-3.5 bg-gray-900 hover:bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-md mt-4">
              Tutup & Muat Semula
            </button>
          </div>
  
        </div>
      </div>
  
    </div>
  </template>
  

    <script setup>
    import { ref, onMounted, computed } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import api from '../../../services/api';
    
    const route = useRoute();
    const router = useRouter();
    const profil = ref({});
    const isLoading = ref(true);
    const isProcessing = ref(false);
    const modalResit = ref({ show: false, status: '', ref: '', msg: '' });
    
    const d = new Date();
    const tahunSemasa = d.getFullYear();
    const bulanLaporDiri = ref(1); 
    const senaraiBulan = ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"];
    
    const isAhliAktif = computed(() => profil.value.status_ahli === 'A - Aktif');
    const isStaffBaru = computed(() => profil.value.kategori_staf === 'BARU');
    
    const fetchProfilAhli = async () => {
      console.log("[UI] Menarik profil ahli...");
      try {
        const response = await api.get('/ahli/profil');
        profil.value = response.data.data;
        console.log("[UI] Profil diterima:", profil.value.status_ahli);
      } catch (error) {
        console.error("[UI ERROR] Gagal tarik profil:", error);
      } finally {
        isLoading.value = false;
      }
    };
    
    const kadarYuran = computed(() => {
      const gred = (profil.value.gred_sspa || '');
      const match = gred.match(/\d+/);
      if (match) {
        const num = parseInt(match[0], 10);
        if (num >= 1 && num <= 8) return 5.00;
        if (num >= 9 && num <= 14) return 10.00;
      }
      return 15.00;
    });
    
    const jumlahBulanKira = computed(() => {
      if (isAhliAktif.value) return 0; 
      if (!isStaffBaru.value) return 12; 
      const mula = bulanLaporDiri.value + 1;
      return mula > 12 ? 0 : (12 - mula) + 1;
    });
    
    const jumlahPerluBayar = computed(() => jumlahBulanKira.value * kadarYuran.value);
    
    const bayarYuranFPX = async () => {
      console.log("[UI] Memulakan proses bayaran FPX...");
      isProcessing.value = true;
      try {
        const payload = {
          keterangan: `Yuran Kelab Sukan Perhilitan ${tahunSemasa}`,
          amaun: jumlahPerluBayar.value
        };
        const response = await api.post('/bayaran/cipta-bil', payload);
        if (response.data.success && response.data.bill_url) {
          console.log("[UI] Melencongkan pengguna ke ToyyibPay:", response.data.bill_url);
          window.location.href = response.data.bill_url;
        }
      } catch (error) {
        console.error("[UI ERROR] Proses FPX gagal:", error);
        alert("Gagal menyambung ke gerbang bayaran.");
      } finally {
        isProcessing.value = false;
      }
    };
    
    onMounted(() => {
      console.log("[UI] Tab Yuran Dimuatkan.");
      const statusId = route.query.status_id;
      if (statusId) {
        console.log("[UI] Respons bank dikesan. StatusID:", statusId);
        modalResit.value = {
          show: true,
          status: statusId,
          ref: route.query.transaction_id || route.query.billcode,
          msg: statusId === '1' ? 'Pembayaran Berjaya!' : 'Pembayaran Gagal/Tertangguh.'
        };
        router.replace({ path: '/ahli/yuran' });
      }
      fetchProfilAhli();
    });
    </script>
  
  <style scoped>
  .animate-slide-up {
    animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  </style>
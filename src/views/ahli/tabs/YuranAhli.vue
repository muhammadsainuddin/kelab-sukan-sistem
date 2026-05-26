<template>
    <div class="max-w-md mx-auto p-4 space-y-4 animate-fade-in pb-24 font-sans bg-[#F8FAFC] min-h-screen">
      
      <div class="bg-gradient-to-br from-[#0A192F] to-[#162C4E] text-white p-5 rounded-[20px] shadow-lg relative overflow-hidden border border-white/5">
        <div class="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
        <div class="relative z-10 flex justify-between items-start">
          <div>
            <h2 class="text-base font-black tracking-tight uppercase leading-none">Yuran Kelab</h2>
            <p class="text-[9px] text-blue-300/80 font-bold tracking-[0.15em] mt-1.5 uppercase flex items-center gap-1.5">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              Sesi Kewangan {{ tahunSemasa }}
            </p>
          </div>
          <div class="bg-emerald-500/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
             <div class="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
             <span class="text-[8px] font-black text-emerald-400 uppercase tracking-widest">SSL Secure</span>
          </div>
        </div>
      </div>
  
      <div v-if="isLoading" class="flex flex-col justify-center items-center py-16 space-y-3">
        <div class="relative w-8 h-8">
          <div class="absolute inset-0 border-2 border-blue-50 rounded-full"></div>
          <div class="absolute inset-0 border-2 border-t-[#0A192F] rounded-full animate-spin"></div>
        </div>
        <span class="text-[9px] text-gray-400 font-black tracking-[0.2em] uppercase">Mengesahkan...</span>
      </div>
  
      <div v-else class="space-y-4">
        
        <div class="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-3">
            <div>
              <p class="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mb-0.5">Status Semasa</p>
              <h3 class="text-sm font-black uppercase tracking-tight" :class="isAhliAktif ? 'text-emerald-600' : 'text-rose-600'">
                {{ isAhliAktif ? 'AHLI BERBAYAR' : 'BELUM DIJELASKAN' }}
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
             {{ isAhliAktif ? 'Profil aktif. Akses penuh keahlian dibuka untuk sesi ini.' : 'Keahlian belum aktif / telah luput. Sila bayar yuran tahunan.' }}
          </div>
        </div>
  
        <div v-if="!isAhliAktif" class="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
          <div class="bg-gray-50/50 border-b border-gray-100 px-4 py-3 flex justify-between items-center">
            <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest">{{ isRenewal ? 'Invois Pembaharuan' : 'Invois Pendaftaran' }}</span>
            <span class="text-[8px] font-mono font-bold text-gray-500 bg-white border px-1.5 py-0.5 rounded">INV-{{ tahunSemasa }}-{{ profil.no_kp?.slice(-4) }}</span>
          </div>
  
          <div class="p-4 space-y-3">
            <div class="flex justify-between items-center"><span class="text-[9px] text-gray-400 font-bold uppercase">Kategori</span><span class="text-[10px] font-black text-gray-900 uppercase">{{ profil.gred_sspa }} / {{ isStaffBaru ? 'Baru' : 'Lama / Pembaharuan' }}</span></div>
            
            <div v-if="isStaffBaru" class="bg-[#F1F5F9] p-3 rounded-xl border border-gray-200">
              <label class="block text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Bulan Lapor Diri</label>
              <select v-model="bulanLaporDiri" class="w-full bg-white border border-gray-200 text-[10px] font-bold rounded-lg p-2 outline-none">
                <option v-for="(bulan, index) in senaraiBulan" :key="index" :value="index + 1">{{ bulan }}</option>
              </select>
            </div>
  
            <div class="flex justify-between items-center"><span class="text-[9px] text-gray-400 font-bold uppercase">Kadar</span><span class="text-[10px] font-mono font-black text-gray-900">RM {{ kadarYuran.toFixed(2) }} x {{ jumlahBulanKira }} Bln</span></div>
            <div class="h-px bg-gray-100 border-t border-dashed my-1"></div>
            <div class="flex justify-between items-end"><span class="text-[10px] font-black text-[#0A192F] uppercase tracking-widest">Jumlah</span><span class="text-xl font-mono font-black text-[#0A192F]">RM {{ jumlahPerluBayar.toFixed(2) }}</span></div>
  
            <button @click="bayarYuranFPX" :disabled="jumlahPerluBayar <= 0 || isProcessing"
              class="w-full mt-2 py-3 bg-[#0A192F] text-white rounded-xl active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 shadow-md transition-all">
              <span v-if="isProcessing" class="text-[9px] font-black uppercase tracking-widest animate-pulse">Menghubungi...</span>
              <template v-else>
                 <span class="text-[10px] font-black uppercase tracking-widest">Bayar Sekarang</span>
                 <div class="bg-white px-1.5 py-0.5 rounded flex items-center">
                    <span class="text-rose-600 font-black italic text-[9px]">F</span>
                    <span class="text-blue-800 font-black italic text-[9px]">P</span>
                    <span class="text-amber-500 font-black italic text-[9px]">X</span>
                 </div>
              </template>
            </button>
          </div>
        </div>
  
        <div class="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
          <div class="px-4 py-3 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <h3 class="text-[10px] font-black text-gray-700 uppercase tracking-widest flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Sejarah Bayaran
            </h3>
            <button @click="fetchSejarahBayaran" class="p-1.5 hover:bg-white rounded-full active:scale-90" title="Muat Semula">
              <svg :class="{'animate-spin': isSyncing}" class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            </button>
          </div>
          
          <div class="divide-y divide-gray-50">
            <div v-if="sejarahBayaran.length === 0" class="text-center py-6 text-[9px] text-gray-400 font-bold uppercase tracking-widest">Tiada rekod.</div>
            <div v-else v-for="tx in sejarahBayaran" :key="tx.billCode" 
                 @click="bukaDetailsHistory(tx)"
                 class="px-4 py-3 flex justify-between items-center active:bg-gray-50 cursor-pointer">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-1 h-7 rounded-full" :class="tx.status === 'BERJAYA' ? 'bg-emerald-500' : (tx.status === 'PENDING' ? 'bg-amber-500 animate-pulse' : 'bg-rose-500')"></div>
                <div class="min-w-0">
                  <p class="font-black text-gray-900 text-[10px] uppercase truncate">{{ tx.keterangan || 'Yuran' }}</p>
                  <span class="text-[8px] font-bold text-gray-400 block mt-0.5">{{ tx.tarikh }}</span>
                </div>
              </div>
              <div class="text-right shrink-0">
                <p class="font-mono font-black text-gray-900 text-[11px]">RM{{ parseFloat(tx.amaun).toFixed(2) }}</p>
                
                <div class="flex justify-end mt-1">
                   <span v-if="tx.status === 'PENDING'" class="text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border inline-flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-100">
                     <svg class="w-2 h-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                     Semakan Auto...
                   </span>
                   <span v-else class="text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border inline-block"
                         :class="tx.status === 'BERJAYA' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'">
                     {{ tx.status }}
                   </span>
                </div>
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
                     :class="notification.type === 'BERJAYA' ? 'bg-emerald-500 text-white shadow-emerald-500/20' : (notification.type === 'RALAT' ? 'bg-rose-500 text-white shadow-rose-500/20' : 'bg-amber-500 text-white shadow-amber-500/20')">
                  <svg v-if="notification.type === 'BERJAYA'" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                  <svg v-else-if="notification.type === 'RALAT'" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                  <svg v-else class="w-6 h-6 animate-spin" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="text-xs font-black uppercase tracking-wider" :class="notification.type === 'BERJAYA' ? 'text-emerald-800' : (notification.type === 'RALAT' ? 'text-rose-800' : 'text-amber-800')">
                    {{ notification.type === 'RALAT' ? 'Makluman Sistem' : 'Semakan: ' + notification.type }}
                  </h4>
                  <p class="text-[10px] text-gray-500 font-bold leading-snug mt-0.5">{{ notification.message }}</p>
                </div>
                <button @click="notification.show = false" class="text-gray-400 hover:text-gray-600 p-1 bg-gray-50 rounded-full"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg></button>
              </div>
              
              <div v-if="notification.type === 'BERJAYA' && notification.details" class="bg-emerald-50/50 border border-emerald-100 p-3 rounded-xl space-y-2 text-[10px]">
                <div class="flex justify-between"><span class="text-gray-400 font-bold uppercase tracking-widest">Amaun Sah</span><span class="font-mono font-black text-gray-800 text-[11px]">RM{{ parseFloat(notification.details.amaun).toFixed(2) }}</span></div>
                <div class="flex justify-between"><span class="text-gray-400 font-bold uppercase tracking-widest">Rujukan Bil</span><span class="font-mono font-black text-gray-800 break-all">{{ notification.details.billcode }}</span></div>
                <div class="pt-2 border-t border-emerald-200/50 mt-1"><p class="text-gray-400 font-bold uppercase tracking-widest mb-1">Butiran Servis</p><p class="font-black text-gray-700 leading-tight">{{ notification.details.keterangan || 'Yuran Tahunan Kelab' }}</p></div>
              </div>
            </div>
          </div>
        </Transition>
  
        <div v-if="modalResit.show" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-[#0A192F]/90 backdrop-blur-md" @click="tutupModalResit"></div>
          <div class="bg-white rounded-[20px] w-full max-w-[280px] shadow-2xl relative z-10 animate-pop-in flex flex-col">
            <div class="p-5 text-center border-b border-gray-50" :class="modalResit.status === '1' ? 'bg-emerald-50/30' : 'bg-rose-50/30'">
               <div class="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md" 
                    :class="modalResit.status === '1' ? 'bg-emerald-500 text-white shadow-emerald-500/30' : 'bg-rose-500 text-white shadow-rose-500/30'">
                  <svg v-if="modalResit.status === '1'" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                  <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
               </div>
               <h3 class="text-[13px] font-black uppercase" :class="modalResit.status === '1' ? 'text-emerald-900' : 'text-rose-900'">
                 {{ modalResit.status === '1' ? 'Berjaya Disahkan' : 'Transaksi Gagal' }}
               </h3>
               <p class="text-[9px] font-bold text-gray-500 mt-1.5 leading-tight">{{ modalResit.msg }}</p>
            </div>
            <div class="p-4">
               <button @click="tutupModalResit" class="w-full py-2.5 bg-[#0A192F] text-white text-[10px] font-black uppercase tracking-widest rounded-lg active:scale-95 transition-all">Tutup</button>
            </div>
          </div>
        </div>
  
        <div v-if="modalDetails.show" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
           <div class="absolute inset-0 bg-[#0A192F]/80 backdrop-blur-sm" @click="modalDetails.show = false"></div>
           <div class="bg-white rounded-[20px] w-full max-w-[280px] shadow-2xl relative z-10 animate-pop-in flex flex-col">
             <div class="px-4 py-3 border-b border-gray-50 flex justify-between items-center">
                <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Resit Digital</span>
                <button @click="modalDetails.show = false" class="p-1 bg-gray-50 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
             </div>
             <div class="p-4 space-y-3">
                <div class="text-center">
                   <p class="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Jumlah Bayaran</p>
                   <h2 class="text-2xl font-mono font-black text-[#0A192F] tracking-tight leading-none">RM{{ parseFloat(modalDetails.data.amaun).toFixed(2) }}</h2>
                   <div class="mt-2 flex justify-center">
                      <span class="px-2.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border"
                            :class="modalDetails.data.status === 'BERJAYA' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'">
                        {{ modalDetails.data.status }}
                      </span>
                   </div>
                </div>
                <div class="space-y-1.5 bg-gray-50 p-3 rounded-lg border border-gray-100">
                   <div class="flex justify-between items-center"><span class="text-[9px] font-bold text-gray-400 uppercase">Tarikh</span><span class="text-[9px] font-black text-gray-800">{{ modalDetails.data.tarikh }}</span></div>
                   <div class="flex justify-between items-center"><span class="text-[9px] font-bold text-gray-400 uppercase">Rujukan</span><span class="text-[9px] font-black text-gray-800 font-mono">{{ modalDetails.data.billCode }}</span></div>
                   <div class="pt-1.5 border-t border-gray-200 mt-1.5"><p class="text-[8px] font-bold text-gray-400 uppercase mb-0.5">Butiran</p><p class="text-[9px] font-black text-gray-800 leading-tight">{{ modalDetails.data.keterangan }}</p></div>
                </div>
  
                <div class="flex flex-col gap-1.5 pt-1">
                   <button v-if="modalDetails.data.status === 'PENDING'" @click="semakStatusBil(modalDetails.data.billCode)"
                           class="w-full py-2 bg-amber-500 text-white rounded-lg font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-1.5 active:scale-95 transition-all">
                      <svg :class="{'animate-spin': isSyncing}" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                      Sahkan Di Bank Sekarang
                   </button>
                   <button @click="modalDetails.show = false" class="w-full py-2 bg-gray-100 text-gray-600 rounded-lg font-black text-[9px] uppercase tracking-widest active:scale-95 transition-all">Tutup</button>
                </div>
             </div>
           </div>
        </div>
      </Teleport>
  
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import api from '../../../services/api';
  
  const route = useRoute();
  const router = useRouter();
  
  // States
  const profil = ref({});
  const sejarahBayaran = ref([]); 
  const isLoading = ref(true);
  const isProcessing = ref(false);
  const isSyncing = ref(false);
  
  const notification = ref({ show: false, type: '', message: '', details: null });
  const modalResit = ref({ show: false, status: '', ref: '', msg: '' });
  const modalDetails = ref({ show: false, data: null });
  
  const d = new Date();
  const tahunSemasa = d.getFullYear();
  const bulanLaporDiri = ref(1); 
  const senaraiBulan = ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"];
  
  let autoPollInterval = null;
  
  // =========================================================
  // COMPUTED LOGIC: KEAHLIAN & YURAN & ROADTAX
  // =========================================================
  const isAhliAktif = computed(() => profil.value.status_ahli === 'A - Aktif' || profil.value.pilihan_potongan === 'Potongan Gaji / Jabatan');
  
  const isRenewal = computed(() => {
    return profil.value.tahun_daftar && profil.value.tahun_daftar < tahunSemasa;
  });
  
  const isStaffBaru = computed(() => {
    return profil.value.kategori_staf === 'BARU' && !isRenewal.value;
  });
  
  const kadarYuran = computed(() => {
    const gred = (profil.value.gred_sspa || '').toUpperCase();
    const match = gred.match(/\d+/);
    if (match) {
      const num = parseInt(match[0], 10);
      if (num >= 1 && num <= 8) return 5.00;
      if (num >= 9 && num <= 14) return 10.00;
    }
    return 15.00; // Kadar lalai (default)
  });
  
  const jumlahBulanKira = computed(() => {
    if (isAhliAktif.value) return 0; 
    if (!isStaffBaru.value) return 12; // Staff Lama atau Renew wajib 12 bulan
    const mula = bulanLaporDiri.value + 1;
    return mula > 12 ? 0 : (12 - mula) + 1;
  });
  
  const jumlahPerluBayar = computed(() => jumlahBulanKira.value * kadarYuran.value);
  
  // =========================================================
  // FETCH DATA API
  // =========================================================
  const fetchProfilAhli = async () => {
    try {
      const response = await api.get('/ahli/profil');
      profil.value = response.data.data;
    } catch (error) { console.error(error); } finally { isLoading.value = false; }
  };
  
  const fetchSejarahBayaran = async () => {
    isSyncing.value = true;
    try {
      const response = await api.get('/bayaran/sejarah');
      sejarahBayaran.value = response.data.data || [];
      
      // Auto Polling Trigger
      const hasPending = sejarahBayaran.value.some(tx => tx.status === 'PENDING');
      if (hasPending) {
          mulakanAutoPolling();
      } else {
          hentikanAutoPolling();
      }
    } catch (error) { console.error(error); } finally { isSyncing.value = false; }
  };
  
  // =========================================================
  // BACKGROUND AUTO-POLLING LOGIC (SEMAKAN SENYAP)
  // =========================================================
  const mulakanAutoPolling = () => {
      if (autoPollInterval) return; 
      
      autoPollInterval = setInterval(async () => {
          const pendings = sejarahBayaran.value.filter(tx => tx.status === 'PENDING');
          if (pendings.length === 0) {
              hentikanAutoPolling();
              return;
          }
  
          for (let tx of pendings) {
              try {
                  const res = await api.get(`/bayaran/semak-status/${tx.billCode}`);
                  if (res.data.status === 'BERJAYA') {
                      hentikanAutoPolling(); 
                      await fetchProfilAhli();
                      await fetchSejarahBayaran();
                      
                      notification.value = {
                          show: true, type: 'BERJAYA',
                          message: 'Sistem berjaya mengesahkan bayaran anda secara automatik. Profil kini aktif.',
                          details: { amaun: tx.amaun, billcode: tx.billCode, keterangan: tx.keterangan }
                      };
                      setTimeout(() => { notification.value.show = false; }, 8000);
                      break;
                  } else if (res.data.status === 'GAGAL' || res.data.status === 'DIBATALKAN') {
                      await fetchSejarahBayaran();
                  }
              } catch (e) { /* Silent fail pada background poll */ }
          }
      }, 10000); // Poll setiap 10 saat
  };
  
  const hentikanAutoPolling = () => {
      if (autoPollInterval) {
          clearInterval(autoPollInterval);
          autoPollInterval = null;
      }
  };
  
  // =========================================================
  // ACTIONS
  // =========================================================
  const semakStatusBil = async (billcode) => {
    isSyncing.value = true;
    const currentTx = sejarahBayaran.value.find(t => t.billCode === billcode) || {};
  
    try {
      const res = await api.get(`/bayaran/semak-status/${billcode}`);
      if(modalDetails.value.show) modalDetails.value.show = false;
      
      await fetchProfilAhli();
      await fetchSejarahBayaran();
      
      if (res.data.status === 'BERJAYA') {
        notification.value = {
          show: true, type: 'BERJAYA',
          message: 'Pengesahan bank selesai. Dana yuran kelab berjaya disahkan.',
          details: { amaun: currentTx.amaun || 0, billcode: billcode, keterangan: currentTx.keterangan || `Yuran Kelab PERHILITAN ${tahunSemasa}` }
        };
      } else {
        notification.value = {
          show: true, type: 'PENDING',
          message: 'Pihak bank memaklumkan transaksi ini masih dalam proses semakan.',
          details: null
        };
      }
      setTimeout(() => { notification.value.show = false; }, 6000);
    } catch (error) { console.error(error); } finally { isSyncing.value = false; }
  };
  
  const bayarYuranFPX = async () => {
    if (jumlahPerluBayar.value <= 0) return;
    isProcessing.value = true;
    try {
      const jenisKeterangan = isRenewal.value ? 'Pembaharuan' : 'Pendaftaran';
      const payload = {
        keterangan: `${jenisKeterangan} Yuran Kelab PERHILITAN Sesi ${tahunSemasa}`,
        amaun: jumlahPerluBayar.value
      };
      
      const response = await api.post('/bayaran/cipta-bil', payload);
      if (response.data.success && response.data.bill_url) {
        window.location.href = response.data.bill_url;
      }
    } catch (error) {
      // Tangkap 15 Minutes Blocker dari backend API
      const errMessage = error.response?.data?.message || "Gagal menyambung ke bank. Sila cuba lagi.";
      notification.value = { show: true, type: 'RALAT', message: errMessage, details: null };
      setTimeout(() => { notification.value.show = false; }, 6000);
      isProcessing.value = false;
    }
  };
  
  const bukaDetailsHistory = (tx) => { modalDetails.value = { show: true, data: tx }; };
  
  const tutupModalResit = () => {
    modalResit.value.show = false;
    isLoading.value = true;
    fetchProfilAhli();
    fetchSejarahBayaran();
  };
  
  // =========================================================
  // LIFECYCLE
  // =========================================================
  onMounted(async () => {
    const statusId = route.query.status_id;
    const billCode = route.query.billcode;
    
    if (statusId && billCode) {
      isLoading.value = true;
      notification.value = { show: true, type: 'PENDING', message: 'Mengesahkan respons dari bank...', details: null };
      
      // Tunggu semakan selesai untuk kemas kini data UI
      await semakStatusBil(billCode);
      
      // Tunjuk popup resit selepas selesai
      modalResit.value = {
        show: true, status: statusId,
        ref: route.query.transaction_id || billCode,
        msg: statusId === '1' ? 'Pembayaran FPX anda berjaya diproses.' : 'Transaksi bank gagal atau dibatalkan.'
      };
      router.replace({ path: '/ahli/yuran' });
    } else {
      fetchProfilAhli();
      fetchSejarahBayaran();
    }
  });
  
  onUnmounted(() => {
      hentikanAutoPolling();
  });
  </script>
  
  <style scoped>
  .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
  
  .animate-pop-in { animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  @keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  
  /* Toast Animasi dari Top yang Smooth */
  .animate-slide-down { animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  @keyframes slideDown { 
    from { opacity: 0; transform: translateY(-40px); } 
    to { opacity: 1; transform: translateY(0); } 
  }
  
  /* Hilangkan Spinners HTML standard */
  select { -webkit-appearance: none; -moz-appearance: none; appearance: none; }
  </style>
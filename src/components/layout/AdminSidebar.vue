<template>
  <transition name="fade">
    <div 
      v-if="isOpen" 
      @click="$emit('close')" 
      class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] md:hidden transition-opacity"
    ></div>
  </transition>

  <aside 
    :class="isOpen ? 'translate-x-0 shadow-[8px_0_30px_rgba(0,0,0,0.5)]' : '-translate-x-full'"
    class="fixed md:static inset-y-0 left-0 w-64 bg-[#0B1120] text-slate-300 flex flex-col z-[70] border-r border-slate-800 transition-transform duration-500 ease-out md:translate-x-0 overflow-hidden font-sans"
  >
    <div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none"></div>
    
    <div class="p-6 flex items-center justify-between shrink-0 relative z-10">
      <div class="flex items-center gap-3.5">
        <div class="w-11 h-11 shrink-0 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 p-1.5 shadow-lg backdrop-blur-md">
          <img src="/logo.png" alt="Logo" class="w-full h-full object-contain drop-shadow-md" />
        </div>
        <div class="flex flex-col justify-center">
          <h1 class="text-base font-extrabold tracking-tight text-white leading-tight">
            PORTAL <span class="text-emerald-400">ADMIN</span>
          </h1>
          <p class="text-[10px] text-slate-400 font-bold tracking-widest mt-0.5 uppercase">
            Kelab Perhilitan
          </p>
        </div>
      </div>
      <button @click="$emit('close')" class="p-2 md:hidden text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    
    <nav class="flex-1 px-4 py-2 space-y-6 overflow-y-auto custom-scrollbar relative z-10">
      <div v-for="group in menuGroups" :key="group.name" class="space-y-1.5">
        <h3 class="px-3 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
          {{ group.name }}
        </h3>
        
        <button 
          v-for="item in group.items" 
          :key="item.id" 
          @click="navigasiKe(item.id)"
          :class="route.name === item.id 
            ? 'bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 shadow-[inset_3px_0_0_#10b981]' 
            : 'text-slate-400 hover:text-emerald-100 hover:bg-emerald-500/5 font-medium border border-transparent'"
          class="group relative w-full flex items-center gap-3.5 px-4 py-3 text-sm rounded-xl transition-all duration-300 ease-out active:scale-[0.98] overflow-hidden"
        >
          <span 
            class="transition-all duration-300 z-10"
            :class="route.name === item.id 
              ? 'w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)] scale-100' 
              : 'w-1 h-1 rounded-full bg-slate-600 scale-75 group-hover:bg-emerald-600 group-hover:scale-100'"
          ></span>
          <span class="z-10 tracking-wide">{{ item.label }}</span>
        </button>
      </div>
    </nav>

    <div class="p-5 border-t border-slate-800 bg-[#060913] space-y-5 shrink-0 relative z-10">
      <button 
        @click="handleLogout" 
        class="flex items-center justify-center gap-2 w-full py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 active:scale-[0.98] border border-rose-500/10"
      >
        Sistem Keluar
      </button>

      <div class="flex items-center justify-center">
        <button @click="showAbout = true" class="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors duration-300">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span class="text-[10px] font-bold uppercase tracking-wider">Maklumat Sistem</span>
        </button>
      </div>

      <div class="pt-4 border-t border-slate-800/60 text-center">
        <a href="https://developer.geowild.com.my" target="_blank" class="block group">
          <p class="text-[8px] text-slate-500 font-bold uppercase tracking-widest mb-1">Architect & Developer</p>
          <p class="text-xs text-emerald-400 font-black uppercase tracking-widest group-hover:text-emerald-300 transition-colors">GeoWild</p>
          <p class="text-[7.5px] text-slate-500 font-bold mt-1 tracking-[0.15em] uppercase">Powered by Ai Geo</p>
        </a>
      </div>
    </div>
  </aside>

  <teleport to="body">
    <transition name="slide-up">
      <div v-if="showAbout" class="fixed inset-0 z-[100] bg-[#F8FAF9] flex flex-col overflow-y-auto">
        <div class="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-xl border-b border-emerald-100 shadow-sm">
          <h2 class="text-[11px] font-black text-emerald-900 uppercase tracking-[0.2em]">Profil Sistem</h2>
          <button @click="showAbout = false" class="p-2.5 bg-rose-50 text-rose-600 rounded-full active:scale-95 transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div class="flex-1 flex flex-col items-center px-5 py-8 max-w-lg mx-auto w-full">
          <img src="/logo.png" class="w-20 h-20 object-contain drop-shadow-xl mb-5" />
          <div class="text-center mb-8">
            <h1 class="text-slate-800 font-extrabold text-[16px] leading-snug uppercase mb-2">
              Kelab Sukan dan Kebajikan<br><span class="text-emerald-600 text-[18px]">Jabatan PERHILITAN</span>
            </h1>
            <span class="inline-block px-4 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">KS Management v1.0</span>
          </div>

          <div class="w-full bg-white rounded-[2rem] p-6 border border-emerald-100 space-y-5 shadow-sm mb-6">
            <div>
              <p class="text-[10px] text-emerald-600 font-black uppercase tracking-widest mb-1.5">No. Pertubuhan</p>
              <p class="text-sm text-slate-800 font-bold">PPM-006-14-27071985</p>
            </div>
            <div class="w-full h-px bg-emerald-50"></div>
            <div>
              <p class="text-[10px] text-emerald-600 font-black uppercase tracking-widest mb-1.5">Alamat Rasmi</p>
              <p class="text-[12px] text-slate-700 font-medium leading-relaxed italic">Ibu Pejabat Jabatan PERHILITAN, KM.10 Jalan Cheras, 56100 Kuala Lumpur.</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps({ isOpen: Boolean });
const emit = defineEmits(['close']);

const router = useRouter();
const route = useRoute(); // Mengesan route aktif (/admin/...)
const showAbout = ref(false);

const menuGroups = [
  { 
    name: 'Kelulusan & Master', 
    items: [
      { id: 'pengesahan', label: 'Pengesahan Ahli' },
      { id: 'staff', label: 'Induk Staff (HR)' }
    ] 
  },
  { 
    name: 'Pengurusan Data', 
    items: [
      { id: 'ahli', label: 'Direktori Semua Ahli' },
      { id: 'laporan', label: 'Laporan Tunggakan' },
      { id: 'SenaraiResit', label: 'Resit & Kewangan' },
      { id: 'pertandingan', label: 'Sukan & Acara' }
    ] 
  },
  { 
    name: 'Kebajikan', 
    items: [
      { id: 'kebajikan', label: 'Permohonan Bantuan' }, 
      { id: 'berhenti', label: 'Proses Penamatan' }
    ] 
  },
  { 
    name: 'Tetapan Sistem', 
    items: [
      { id: 'profil', label: 'Profil Pentadbir' }
    ] 
  }
];

const navigasiKe = (namaRoute) => {
  router.push({ name: namaRoute });
  emit('close'); // Tutup sidebar pada mobile selepas klik
};

const handleLogout = () => { localStorage.clear(); router.push('/login'); };
</script>

<style scoped>
/* Scrollbar evergreen dark theme */
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { 
  background: rgba(16, 185, 129, 0.1); 
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover { 
  background: rgba(16, 185, 129, 0.3); 
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
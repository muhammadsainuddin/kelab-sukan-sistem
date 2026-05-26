<template>
  <transition name="fade">
    <div 
      v-if="isOpen" 
      @click="$emit('close')" 
      class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] md:hidden transition-opacity"
    ></div>
  </transition>

  <aside 
    :class="isOpen ? 'translate-x-0 shadow-[4px_0_24px_rgba(156,163,175,0.15)]' : '-translate-x-full'"
    class="fixed md:static inset-y-0 left-0 w-64 bg-white text-slate-700 flex flex-col z-[70] border-r border-gray-100 transition-transform duration-500 ease-out md:translate-x-0 overflow-hidden"
  >
    
    <div class="p-6 flex items-center justify-between shrink-0">
      <div class="flex items-center gap-3.5">
        <div class="w-11 h-11 shrink-0 flex items-center justify-center">
          <img src="/logo.png" alt="Logo" class="w-full h-full object-contain drop-shadow-sm" />
        </div>
        <div class="flex flex-col justify-center">
          <h1 class="text-base font-extrabold tracking-tight text-slate-800 leading-tight">
            PORTAL <span class="text-emerald-600">ADMIN</span>
          </h1>
          <p class="text-[10px] text-slate-500 font-bold tracking-widest mt-0.5 uppercase">
            Kelab Perhilitan
          </p>
        </div>
      </div>
      <button @click="$emit('close')" class="p-2 md:hidden text-slate-400 hover:text-slate-700 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    
    <nav class="flex-1 px-4 py-2 space-y-6 overflow-y-auto custom-scrollbar">
      <div v-for="group in menuGroups" :key="group.name" class="space-y-1.5">
        <h3 class="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          {{ group.name }}
        </h3>
        
        <button 
          v-for="item in group.items" 
          :key="item.id" 
          @click="$emit('change-tab', item.id); $emit('close')"
          :class="activeTab === item.id 
            ? 'bg-emerald-50 text-emerald-700 font-bold' 
            : 'text-slate-500 hover:text-slate-800 hover:bg-gray-50 font-medium'"
          class="w-full flex items-center gap-3.5 px-4 py-2.5 text-sm rounded-xl transition-all duration-300 ease-out active:scale-[0.98]"
        >
          <span 
            class="transition-all duration-300"
            :class="activeTab === item.id 
              ? 'w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)] scale-100' 
              : 'w-1 h-1 rounded-full bg-slate-300 scale-75'"
          ></span>
          {{ item.label }}
        </button>
      </div>
    </nav>

    <div class="p-5 border-t border-gray-100 bg-gray-50/50 space-y-5 shrink-0">
      
      <button 
        @click="handleLogout" 
        class="flex items-center justify-center gap-2 w-full py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 active:scale-[0.98]"
      >
        Sistem Keluar
      </button>

      <div class="flex items-center justify-center">
        <button 
          @click="showAbout = true" 
          class="flex items-center gap-2 text-slate-400 hover:text-emerald-600 transition-colors duration-300"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span class="text-[10px] font-bold uppercase tracking-wider">Maklumat Kelab</span>
        </button>
      </div>

      <div class="pt-3 border-t border-gray-200/60 text-center">
        <p class="text-[9px] text-slate-400 font-medium uppercase tracking-widest">Architect & Developer</p>
        <p class="text-xs text-emerald-600 font-bold uppercase mt-1 tracking-wider">{{ creatorName }}</p>
      </div>
    </div>
  </aside>

  <teleport to="body">
    <transition name="slide-up">
      <div v-if="showAbout" class="fixed inset-0 z-[100] bg-white flex flex-col overflow-y-auto">
        
        <div class="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-md border-b border-gray-100">
          <h2 class="text-xs font-bold text-slate-800 uppercase tracking-widest">Profil Pertubuhan</h2>
          <button @click="showAbout = false" class="p-2.5 bg-gray-50 hover:bg-gray-100 text-slate-600 rounded-full transition-colors active:scale-95">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div class="flex-1 flex flex-col items-center px-6 py-10 max-w-lg mx-auto w-full">
          
          <div class="w-24 h-24 flex items-center justify-center mb-6">
            <img src="/logo.png" class="w-full h-full object-contain drop-shadow-xl" />
          </div>
          
          <div class="text-center mb-10 w-full">
            <h1 class="text-slate-800 font-extrabold text-[18px] leading-snug uppercase mb-3">
              Kelab Sukan dan Kebajikan<br>
              <span class="text-emerald-600 text-[20px]">Jabatan PERHILITAN</span>
            </h1>
            <div class="inline-block px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
              <p class="text-[10px] text-emerald-700 uppercase tracking-widest font-black">KS Management v1.0</p>
            </div>
          </div>

          <div class="w-full bg-gray-50 rounded-[2rem] p-7 border border-gray-100 space-y-6 text-left shadow-sm">
            <div>
              <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">No. Pertubuhan</p>
              <p class="text-sm text-slate-800 font-bold tracking-wide">PPM-006-14-27071985</p>
            </div>
            
            <div class="w-full h-px bg-gray-200/50"></div>

            <div>
              <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">Alamat Rasmi</p>
              <p class="text-[13px] text-slate-700 font-medium leading-relaxed">
                Ibu Pejabat Jabatan Perlindungan Hidupan Liar dan Taman Negara (PERHILITAN),<br>
                KM.10 Jalan Cheras,<br>
                56100 Cheras, Kuala Lumpur.
              </p>
            </div>

            <div class="w-full h-px bg-gray-200/50"></div>

            <div>
              <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">E-mel Pejabat</p>
              <a href="mailto:kelabperhilitan@gmail.com" class="text-sm text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
                kelabperhilitan@gmail.com
              </a>
            </div>
          </div>

          <div class="pb-12"></div>
          
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({ activeTab: String, isOpen: Boolean, creatorName: String });
const emit = defineEmits(['change-tab', 'close']);
const router = useRouter();
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
      { id: 'laporan', label: 'Laporan Yuran' },
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

const handleLogout = () => { localStorage.clear(); router.push('/login'); };
</script>

<style scoped>
/* Scrollbar moden untuk Light Mode */
.custom-scrollbar::-webkit-scrollbar { 
  width: 4px; 
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb { 
  background: rgba(0, 0, 0, 0.1); 
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover { 
  background: rgba(0, 0, 0, 0.2); 
}

/* Animasi Fade standard untuk background dim */
.fade-enter-active, .fade-leave-active { 
  transition: opacity 0.4s ease; 
}
.fade-enter-from, .fade-leave-to { 
  opacity: 0; 
}

/* Animasi Slide-up untuk paparan Full Screen */
.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
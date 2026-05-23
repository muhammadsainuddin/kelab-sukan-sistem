<template>
  <transition name="fade">
    <div 
      v-if="isOpen" 
      @click="$emit('close')" 
      class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] md:hidden"
    ></div>
  </transition>

  <aside 
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    class="fixed md:static inset-y-0 left-0 w-60 bg-[#060d0b] text-white flex flex-col z-[70] border-r border-white/5 transition-transform duration-300 ease-in-out md:translate-x-0 overflow-hidden"
  >
    
    <div class="p-5 flex items-center justify-between border-b border-white/5 shrink-0">
      <div class="flex items-center gap-3">
        <div class="w-10 shrink-0 rounded-lg bg-white p-0 flex items-center justify-center">
          <img src="/logo.png" alt="Logo" class="w-full h-full object-contain" />
        </div>
        <div class="overflow-hidden">
          <h1 class="text-[18px] font-black tracking-tighter uppercase leading-none">
            PORTAL <span class="text-[#E30613] italic">ADMIN</span>
          </h1>
          <p class="text-[8px] text-gray-500 font-bold tracking-[0.2em] mt-1 uppercase">Kelab Sukan Perhilitan</p>
        </div>
      </div>
      <button @click="$emit('close')" class="p-2 md:hidden text-gray-500 hover:text-white">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    
    <nav class="flex-1 px-3 py-4 space-y-5 overflow-y-auto custom-scrollbar">
      <div v-for="group in menuGroups" :key="group.name" class="space-y-1">
        <h3 class="px-3 text-[9px] font-black text-gray-600 uppercase tracking-[0.25em] mb-2">{{ group.name }}</h3>
        <button 
          v-for="item in group.items" 
          :key="item.id" 
          @click="$emit('change-tab', item.id); $emit('close')"
          :class="activeTab === item.id 
            ? 'bg-white/5 text-white border-r-2 border-[#E30613]' 
            : 'text-gray-500 hover:text-gray-200 hover:bg-white/[0.02] border-r-2 border-transparent'"
          class="w-full flex items-center gap-3 px-3 py-2 text-[10.5px] font-bold uppercase tracking-widest text-left transition-all"
        >
          <span :class="activeTab === item.id ? 'bg-[#70B130] scale-125 shadow-[0_0_8px_#70B130]' : 'bg-gray-700'" class="w-1 h-1 rounded-full"></span>
          {{ item.label }}
        </button>
      </div>
    </nav>

    <div class="p-4 border-t border-white/5 bg-black/20 space-y-4">
      <button @click="handleLogout" class="flex items-center justify-center gap-2 w-full py-2.5 bg-[#E30613] hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg transition-all">
        Sistem Keluar
      </button>

      <div class="flex items-center justify-center">
        <button @click="showAbout = true" class="flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span class="text-[9px] font-bold uppercase tracking-widest">Tentang Sistem</span>
        </button>
      </div>

      <div class="pt-2 border-t border-white/5 text-center">
        <p class="text-[7px] text-gray-600 font-bold uppercase tracking-[0.2em]">Architect & Developer</p>
        <p class="text-[9px] text-[#70B130] font-black uppercase mt-0.5 tracking-tighter italic">{{ creatorName }}</p>
      </div>
    </div>

    <div v-if="showAbout" class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
      <div class="bg-[#0b1412] border border-white/10 p-8 rounded-2xl max-w-xs w-full text-center shadow-2xl">
        <div class="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 p-2 shadow-xl"><img src="/logo.png" class="w-full h-full object-contain" /></div>
        <h2 class="text-white font-black uppercase italic tracking-widest text-sm font-sans">KS Management v2.0</h2>
        <p class="text-[10px] text-gray-500 mt-4 leading-relaxed">Sistem digitalisasi pengurusan keahlian Kelab Sukan Perhilitan.</p>
        <button @click="showAbout = false" class="mt-8 w-full py-2 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase rounded-lg border border-white/10 transition-all">Tutup</button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({ activeTab: String, isOpen: Boolean, creatorName: String });
const emit = defineEmits(['change-tab', 'close']);
const router = useRouter();
const showAbout = ref(false);

// Di dalam AdminSidebar.vue, bahagian script setup menuGroups:

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
.custom-scrollbar::-webkit-scrollbar { width: 2px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
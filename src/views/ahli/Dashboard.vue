<template>
  <div class="flex flex-col h-screen bg-[#FDFDFD] font-sans text-[#191C1A] overflow-hidden select-none pb-[env(safe-area-inset-bottom)]">
    
    <header class="h-16 flex items-center justify-between px-6 shrink-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100/50 transition-all">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl from-[#0F4C3A] to-[#2D312E] p-1.5 shadow-sm">
          <img src="/logo.png" alt="Logo" class="w-full h-full" />
        </div>
        <div>
          <h1 class="text-[18px] font-black tracking-tight text-[#191C1A] uppercase">{{ activeTabName }}</h1>
          <div class="h-0.5 w-6 bg-[#70B130] rounded-full mt-0.5"></div>
        </div>
      </div>
      
      <button @click="logKeluar" class="w-10 h-10 rounded-full hover:bg-red-50 text-gray-400 hover:text-[#E30613] flex items-center justify-center transition-all active:scale-90 outline-none">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
      </button>
    </header>

    <main class="flex-1 overflow-y-auto overscroll-y-contain custom-scrollbar relative">
      <div class="pb-[100px]">
        <transition name="md-fade-through" mode="out-in">
          <component :is="activeComponent" @tukarTab="activeTab = $event" />
        </transition>
      </div>
    </main>

    <nav class="fixed bottom-0 inset-x-0 z-50 h-[80px] bg-[#F2F4F1] flex items-center justify-around px-2 border-t border-gray-200/30">
      
      <button 
        v-for="tab in tabs" :key="tab.id" 
        @click="activeTab = tab.id" 
        class="flex-1 flex flex-col items-center justify-center h-full relative outline-none tap-transparent"
      >
        <div class="w-16 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-10"
             :class="activeTab === tab.id ? 'bg-[#C2E8D3] text-[#052115]' : 'bg-transparent text-[#404943] hover:bg-black/5'">
          <svg class="w-6 h-6 transition-transform duration-300" :class="activeTab === tab.id ? 'fill-current scale-105' : 'fill-none'" stroke="currentColor" viewBox="0 0 24 24" v-html="tab.icon"></svg>
        </div>
        
        <span class="text-[11px] mt-1.5 transition-all duration-300 z-10"
              :class="activeTab === tab.id ? 'text-[#052115] font-black uppercase tracking-tighter' : 'text-[#404943] font-medium'">
          {{ tab.label }}
        </span>
      </button>
      
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import HomeAhli from './tabs/HomeAhli.vue';
import AktivitiAhli from './tabs/AktivitiAhli.vue';
import BantuanAhli from './tabs/BantuanAhli.vue';
import ProfilAhli from './tabs/ProfilAhli.vue';

const activeTab = ref('home');

const componentsMap = {
  'home': { component: HomeAhli, name: 'Dashboard' },
  'aktiviti': { component: AktivitiAhli, name: 'Aktiviti' },
  'bantuan': { component: BantuanAhli, name: 'Kebajikan' },
  'profil': { component: ProfilAhli, name: 'Profil' }
};

const tabs = [
  { id: 'home', label: 'Utama', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>' },
  { id: 'aktiviti', label: 'Sukan', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>' },
  { id: 'bantuan', label: 'Bantuan', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>' },
  { id: 'profil', label: 'Profil', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>' }
];

const activeComponent = computed(() => componentsMap[activeTab.value].component);
const activeTabName = computed(() => componentsMap[activeTab.value].name);

const logKeluar = () => { 
  if (confirm('Adakah anda pasti untuk log keluar?')) {
    // 1. Buang kunci sesi dari browser
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    // 2. Halakan ke halaman log masuk
    window.location.href = '/login'; 
  } 
};
</script>

<style scoped>
.tap-transparent { -webkit-tap-highlight-color: transparent; }
.custom-scrollbar::-webkit-scrollbar { display: none; }

/* MD3 Fade Through Animation */
.md-fade-through-enter-active, .md-fade-through-leave-active {
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.2, 0, 0, 1);
}
.md-fade-through-enter-from { opacity: 0; transform: scale(0.96); }
.md-fade-through-leave-to { opacity: 0; }
</style>
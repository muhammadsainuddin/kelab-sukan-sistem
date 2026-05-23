<template>
  <nav class="fixed bottom-0 inset-x-0 z-50 md:static md:w-24 lg:w-64 md:h-screen bg-[#060d0b] border-t md:border-t-0 md:border-r border-white/10 flex md:flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.2)] md:shadow-none transition-all">
    
    <div class="hidden md:flex flex-col items-center justify-center p-6 border-b border-white/10 shrink-0">
      <div class="w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-2xl p-1 shadow-lg border-2 border-white/10 mb-3">
        <img src="/logo.png" alt="Logo" class="w-full h-full object-contain" />
      </div>
      <h2 class="hidden lg:block text-white font-black italic uppercase tracking-widest text-xs">AHLI <span class="text-[#E30613]">KS PERHILITAN</span></h2>
    </div>

    <div class="flex-1 flex md:flex-col justify-around md:justify-start items-center md:items-stretch px-2 py-2 md:p-4 gap-1 md:gap-4 overflow-y-auto custom-scrollbar">
      
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="$emit('change-tab', tab.id)"
        :class="activeTab === tab.id ? 'text-[#E30613] md:bg-white/5 md:border-r-4 border-[#E30613]' : 'text-gray-500 hover:text-gray-300'"
        class="flex-1 md:flex-none flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-4 p-2 md:p-3 rounded-xl lg:rounded-none transition-all group relative"
      >
        <div :class="activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'" class="transition-transform duration-300">
          <svg class="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="tab.icon"></svg>
        </div>
        
        <span class="text-[9px] lg:text-[11px] font-black uppercase tracking-widest text-center lg:text-left leading-tight" 
              :class="activeTab === tab.id ? 'text-white' : ''">
          {{ tab.label }}
        </span>

        <span v-if="activeTab === tab.id" class="absolute top-1 right-2 w-1.5 h-1.5 bg-[#E30613] rounded-full md:hidden shadow-[0_0_8px_#E30613]"></span>
      </button>

    </div>

    <div class="hidden md:block p-4 border-t border-white/10">
      <button @click="handleLogout" class="w-full py-3 flex items-center justify-center lg:justify-start gap-3 text-gray-500 hover:text-[#E30613] transition-colors group">
        <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
        <span class="hidden lg:block text-[10px] font-black uppercase tracking-widest">Log Keluar</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';

defineProps({ activeTab: String });
const emit = defineEmits(['change-tab']);
const router = useRouter();

// Konfigurasi Tab dengan Ikon SVG
const tabs = [
  { id: 'home', label: 'Utama', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>' },
  { id: 'aktiviti', label: 'Aktiviti', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>' },
  { id: 'bantuan', label: 'Kebajikan', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>' },
  { id: 'profil', label: 'Profil Saya', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>' }
];

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/login');
};
</script>
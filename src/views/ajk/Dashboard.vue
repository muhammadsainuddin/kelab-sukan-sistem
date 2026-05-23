<template>
  <div class="flex min-h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
    
    <AdminSidebar 
      :activeTab="activeTab" 
      :isOpen="isSidebarOpen"
      creatorName="MUHAMMAD.S"
      @change-tab="activeTab = $event"
      @close="isSidebarOpen = false"
    />

    <div class="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
      
      <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shrink-0">
        <div class="flex items-center gap-4">
          <button @click="isSidebarOpen = true" class="p-2 -ml-2 text-gray-500 hover:text-[#E30613] md:hidden transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          
          <h2 class="text-[10px] md:text-sm font-black text-gray-400 uppercase tracking-[0.2em] truncate">
            {{ activeTabName }}
          </h2>
        </div>

        <div class="flex items-center gap-3">
          <div class="text-right hidden sm:block">
            <p class="text-xs font-black text-gray-900 leading-none">{{ user.name || 'PENTADBIR' }}</p>
            <p class="text-[10px] text-[#70B130] font-bold uppercase mt-1">Sistem Urusetia</p>
          </div>
          <div class="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 font-black text-[#E30613] text-xs uppercase shadow-sm">
            {{ user.name ? user.name.charAt(0) : 'A' }}
          </div>
        </div>
      </header>

      <main class="flex-1 p-4 md:p-8 overflow-y-auto bg-gray-50 custom-scrollbar">
        <transition name="page" mode="out-in">
          <component :is="activeComponent" @show-alert="handleAlert" />
        </transition>
      </main>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import AdminSidebar from '../../components/layout/AdminSidebar.vue';

// Import Komponen Modul Sebenar
import PengurusanAhli from './tabs/PengurusanAhli.vue';
import KelulusanAhli from './tabs/KelulusanAhli.vue'; // Komponen Sahkan Akaun
import IndukStaff from './tabs/IndukStaff.vue';
import ProfilSaya from './tabs/ProfilSaya.vue';
import LaporanTunggakan from './tabs/LaporanTunggakan.vue';
import PengurusanSukan from './tabs/PengurusanSukan.vue';
import PermohonanBantuan from './tabs/PermohonanBantuan.vue';
import PermohonanBerhenti from './tabs/PermohonanBerhenti.vue';

const isSidebarOpen = ref(false);
const user = ref(JSON.parse(localStorage.getItem('user')) || {});

// Default tab yang dibuka mula-mula
const activeTab = ref('pengesahan'); 

// Peta Komponen (Map Menu ID to Component & Title)
const moduleMap = {
  'ahli': { component: PengurusanAhli, label: 'Direktori Ahli Kelab' },
  'laporan': { component: LaporanTunggakan, label: 'Statistik & Laporan' },
  'pengesahan': { component: KelulusanAhli, label: 'Sahkan Akaun & No. Ahli' },
  'staff': { component: IndukStaff, label: 'Pangkalan Data Master HR' },
  'profil': { component: ProfilSaya, label: 'Profil Admin' },
  'pertandingan': { component: PengurusanSukan, label: 'Pengurusan Sukan & Acara' },
  'kebajikan': { component: PermohonanBantuan, label: 'Modul Bantuan Kebajikan' },
  'berhenti': { component: PermohonanBerhenti, label: 'Pengurusan Penamatan Keahlian' }
};

const activeTabName = computed(() => moduleMap[activeTab.value]?.label || 'Sistem Admin');
const activeComponent = computed(() => moduleMap[activeTab.value]?.component);

const handleAlert = (payload) => {
  // Boleh digantikan dengan notifikasi Toast jika mahu
  alert(payload.msg || payload); 
};
</script>

<style>
.page-enter-active, .page-leave-active { transition: all 0.2s ease; }
.page-enter-from { opacity: 0; transform: translateY(10px); }
.page-leave-to { opacity: 0; transform: translateY(-10px); }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
</style>
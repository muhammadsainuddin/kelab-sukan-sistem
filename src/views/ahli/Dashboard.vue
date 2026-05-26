<template>
  <div class="min-h-screen bg-[#FDF8F5] font-sans pb-24 pt-24">
    
    <div 
      class="fixed z-50 top-0 left-0 right-0 w-full transition-transform duration-300 ease-in-out"
      :class="showHeader ? 'translate-y-0' : '-translate-y-full'"
    >
      <header class="w-full bg-white/85 backdrop-blur-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border-b border-gray-100/50 rounded-b-[2rem]">
        <div class="max-w-lg mx-auto px-6 py-4 flex items-center space-x-3">
          
          <img 
            src="/logo.png" 
            alt="Logo Kelab Perhilitan" 
            class="w-11 h-11 object-contain drop-shadow-sm"
          />
          
          <div class="flex-1">
            <h1 class="text-[15px] font-extrabold text-gray-800 leading-tight tracking-tight uppercase">
              Kelab Perhilitan
            </h1>
            <p class="text-[10px] text-green-600 font-bold uppercase tracking-widest mt-0.5">
              Portal Kebajikan & Sukan
            </p>
          </div>
          
        </div>
      </header>
    </div>

    <main class="w-full max-w-lg mx-auto">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <UserTabbar />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import UserTabbar from '../../components/layout/UserTabbar.vue';

// Logik untuk Header Hide/Show pada Scroll
const showHeader = ref(true);
let lastScrollY = 0;

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  
  // Sembunyi jika scroll ke bawah melebihi 50px, tunjuk semula jika scroll ke atas
  if (currentScrollY > lastScrollY && currentScrollY > 50) {
    showHeader.value = false;
  } else {
    showHeader.value = true;
  }
  
  lastScrollY = currentScrollY;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>
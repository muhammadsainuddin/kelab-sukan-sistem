<template>
  <div class="fixed bottom-0 left-0 z-50 w-full h-20 bg-white/95 backdrop-blur-md border-t border-gray-200/60 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] px-2">
    <div class="grid h-full max-w-lg grid-cols-5 mx-auto">
      
      <router-link to="/ahli/home" class="flex flex-col items-center justify-center group pt-2">
        <div class="px-5 py-1.5 rounded-full transition-all duration-200" 
             :class="isActive('/ahli/home') ? 'bg-green-100 text-green-900 font-bold shadow-sm' : 'text-gray-500 group-hover:bg-gray-100'">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
        </div>
        <span class="text-[10px] tracking-wide mt-1 font-bold" :class="isActive('/ahli/home') ? 'text-green-900' : 'text-gray-400'">Utama</span>
      </router-link>

      <router-link to="/ahli/aktiviti" class="flex flex-col items-center justify-center group pt-2">
        <div class="px-5 py-1.5 rounded-full transition-all duration-200" 
             :class="isActive('/ahli/aktiviti') ? 'bg-green-100 text-green-900 font-bold shadow-sm' : 'text-gray-500 group-hover:bg-gray-100'">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <span class="text-[10px] tracking-wide mt-1 font-bold" :class="isActive('/ahli/aktiviti') ? 'text-green-900' : 'text-gray-400'">Aktiviti</span>
      </router-link>

      <router-link to="/ahli/yuran" class="flex flex-col items-center justify-center group pt-2">
        <div class="px-5 py-1.5 rounded-full transition-all duration-200" 
             :class="isActive('/ahli/yuran') ? 'bg-green-100 text-green-900 font-bold shadow-sm' : 'text-gray-500 group-hover:bg-gray-100'">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>
        <span class="text-[10px] tracking-wide mt-1 font-bold" :class="isActive('/ahli/yuran') ? 'text-green-900' : 'text-gray-400'">Yuran</span>
      </router-link>

      <router-link to="/ahli/bantuan" class="flex flex-col items-center justify-center group pt-2">
        <div class="px-5 py-1.5 rounded-full transition-all duration-200" 
             :class="isActive('/ahli/bantuan') ? 'bg-green-100 text-green-900 font-bold shadow-sm' : 'text-gray-500 group-hover:bg-gray-100'">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </div>
        <span class="text-[10px] tracking-wide mt-1 font-bold" :class="isActive('/ahli/bantuan') ? 'text-green-900' : 'text-gray-400'">Bantuan</span>
      </router-link>

      <router-link to="/ahli/profil" class="flex flex-col items-center justify-center group pt-2">
        <div class="px-5 py-1.5 rounded-full transition-all duration-200" 
             :class="isActive('/ahli/profil') ? 'bg-green-100 text-green-900 font-bold shadow-sm' : 'text-gray-500 group-hover:bg-gray-100'">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
        <span class="text-[10px] tracking-wide mt-1 font-bold" :class="isActive('/ahli/profil') ? 'text-green-900' : 'text-gray-400'">Profil</span>
      </router-link>

    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const isActive = (path) => route.path === path;
</script>
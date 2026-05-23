<template>
  <div class="antialiased text-gray-900">
    <router-view />
  </div>
</template>

<script setup>
/**
 * Logik global atau pemantauan sesi (session) boleh diletakkan di sini 
 * pada masa akan datang jika perlu.
 */
</script>

<style>
/* Memastikan aplikasi memenuhi ketinggian skrin peranti, 
   sangat berguna untuk aplikasi CapacitorJS.
*/
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
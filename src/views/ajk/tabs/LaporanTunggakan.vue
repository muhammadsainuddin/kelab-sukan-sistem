<template>
  <div class="space-y-6 animate-fade-in">
    
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-t-4" 
         :class="tabAktif === 'tidak_berbayar' ? 'border-t-[#E30613]' : 'border-t-[#0F4C3A]'">
      
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 class="text-sm font-black text-gray-800 uppercase tracking-widest">Laporan & Statistik Keahlian</h3>
          <p class="text-xs text-gray-500 font-medium mt-1">Pilih kategori di sebelah kanan untuk melihat taburan data kakitangan.</p>
        </div>

        <div class="flex bg-gray-100 p-1 rounded-lg border border-gray-200 w-full md:w-auto">
          <button 
            @click="tabAktif = 'tidak_berbayar'"
            :class="tabAktif === 'tidak_berbayar' ? 'bg-white text-[#E30613] shadow-sm font-black' : 'text-gray-500 font-bold hover:text-gray-700'"
            class="flex-1 md:px-6 py-2.5 rounded-md text-[10px] uppercase tracking-widest transition-all outline-none"
          >
            BELUM BAYAR
          </button>
          <button 
            @click="tabAktif = 'berbayar'"
            :class="tabAktif === 'berbayar' ? 'bg-white text-[#0F4C3A] shadow-sm font-black' : 'text-gray-500 font-bold hover:text-gray-700'"
            class="flex-1 md:px-6 py-2.5 rounded-md text-[10px] uppercase tracking-widest transition-all outline-none"
          >
            TELAH BAYAR
          </button>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-between p-4 rounded-xl border"
           :class="tabAktif === 'tidak_berbayar' ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'">
        <p class="text-[10px] font-black uppercase tracking-widest"
           :class="tabAktif === 'tidak_berbayar' ? 'text-red-500' : 'text-green-600'">
          Jumlah Keseluruhan ({{ tabAktif === 'tidak_berbayar' ? 'Tunggakan / Belum Daftar' : 'Ahli Aktif' }})
        </p>
        <p class="text-3xl font-black" :class="tabAktif === 'tidak_berbayar' ? 'text-[#E30613]' : 'text-[#0F4C3A]'">
          {{ dataSemasa?.total || 0 }} <span class="text-xs font-bold text-gray-500">ORANG</span>
        </p>
      </div>

    </div>

    <div v-if="loading" class="flex justify-center p-12">
      <span class="w-8 h-8 border-4 border-gray-200 border-t-[#0F4C3A] rounded-full animate-spin"></span>
    </div>

    <div v-else-if="dataSemasa" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[500px]">
        <div class="bg-gray-50 px-5 py-4 border-b border-gray-200">
          <h4 class="text-xs font-black text-gray-800 uppercase tracking-widest">Mengikut Kumpulan</h4>
        </div>
        <div class="overflow-y-auto flex-1 custom-scrollbar p-0">
          <table class="w-full text-left text-sm">
            <tbody class="divide-y divide-gray-100">
              <tr v-for="item in dataSemasa.kumpulan" :key="item.label" class="hover:bg-gray-50">
                <td class="px-5 py-3 font-bold text-gray-700 uppercase text-[11px]">{{ item.label }}</td>
                <td class="px-5 py-3 text-right font-black" :class="tabAktif === 'tidak_berbayar' ? 'text-[#E30613]' : 'text-[#0F4C3A]'">{{ item.jumlah }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[500px]">
        <div class="bg-gray-50 px-5 py-4 border-b border-gray-200">
          <h4 class="text-xs font-black text-gray-800 uppercase tracking-widest">Mengikut Gred SSPA</h4>
        </div>
        <div class="overflow-y-auto flex-1 custom-scrollbar p-0">
          <table class="w-full text-left text-sm">
            <tbody class="divide-y divide-gray-100">
              <tr v-for="item in dataSemasa.gred" :key="item.label" class="hover:bg-gray-50">
                <td class="px-5 py-3 font-bold text-gray-700 uppercase text-[11px]">GRED {{ item.label }}</td>
                <td class="px-5 py-3 text-right font-black" :class="tabAktif === 'tidak_berbayar' ? 'text-[#E30613]' : 'text-[#0F4C3A]'">{{ item.jumlah }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[500px]">
        <div class="bg-gray-50 px-5 py-4 border-b border-gray-200">
          <h4 class="text-xs font-black text-gray-800 uppercase tracking-widest">Mengikut Cawangan</h4>
        </div>
        <div class="overflow-y-auto flex-1 custom-scrollbar p-0">
          <table class="w-full text-left text-sm">
            <tbody class="divide-y divide-gray-100">
              <tr v-for="item in dataSemasa.cawangan" :key="item.label" class="hover:bg-gray-50">
                <td class="px-5 py-3 font-bold text-gray-700 uppercase text-[10px] leading-tight">{{ item.label }}</td>
                <td class="px-5 py-3 text-right font-black" :class="tabAktif === 'tidak_berbayar' ? 'text-[#E30613]' : 'text-[#0F4C3A]'">{{ item.jumlah }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '../../../services/api';

const statistikRaw = ref(null);
const loading = ref(true);
const tabAktif = ref('tidak_berbayar'); // Default tab

// Data berubah secara automatik apabila tabAktif ditukar
const dataSemasa = computed(() => {
  if (!statistikRaw.value) return null;
  return tabAktif.value === 'tidak_berbayar' ? statistikRaw.value.tidak_berbayar : statistikRaw.value.berbayar;
});

const fetchStatistik = async () => {
  loading.value = true;
  try {
    const res = await api.get('/admin/statistik-tunggakan');
    if (res.data.success) {
      statistikRaw.value = res.data.data;
    }
  } catch (error) {
    alert("Gagal menarik data statistik keahlian.");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchStatistik);
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
</style>
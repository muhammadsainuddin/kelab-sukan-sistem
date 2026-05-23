<template>
  <div class="flex flex-col h-full space-y-6 relative">
    
    <transition name="slide-down">
      <div v-if="notifikasi.show" 
           :class="notifikasi.type === 'success' ? 'bg-[#70B130]' : 'bg-[#E30613]'"
           class="fixed top-8 right-8 z-[200] px-6 py-4 rounded-xl shadow-2xl text-white flex items-center gap-4 border border-white/20">
        
        <svg v-if="notifikasi.type === 'success'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
        
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>
        
        <div>
          <p class="text-[10px] font-black uppercase tracking-widest opacity-80">{{ notifikasi.type === 'success' ? 'BERJAYA' : 'RALAT' }}</p>
          <p class="text-sm font-bold">{{ notifikasi.message }}</p>
        </div>
      </div>
    </transition>

    <div class="relative bg-[#060d0b] rounded-2xl overflow-hidden shadow-2xl shrink-0 border-l-8 border-[#E30613]">
      <div class="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%,rgba(255,255,255,0.1)_100%)] bg-[length:20px_20px]"></div>
      
      <div class="relative p-8 flex flex-col md:flex-row md:items-center justify-between z-10 gap-4">
        <div>
          <h1 class="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter">
            PROFIL <span class="text-[#E30613]">ATLET</span>
          </h1>
          <p class="text-xs text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Urus Maklumat Pemain & Akaun</p>
        </div>
        <div v-if="form.saiz_baju" class="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-xl border border-white/10 backdrop-blur-sm">
          <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Saiz Jersi</span>
          <span class="text-2xl font-black text-[#70B130] italic">{{ form.saiz_baju }}</span>
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto custom-scrollbar pb-10">
      <div v-if="isLoading" class="text-center py-20 text-gray-400 animate-pulse font-black text-xl italic uppercase tracking-widest">
        MEMUATKAN DATA PEMAIN...
      </div>
      
      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <div class="lg:col-span-4 space-y-6">
          
          <div class="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden text-center relative group">
            <div class="h-24 bg-[#060d0b]"></div>
            
            <div class="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden border-4 border-[#E30613] shadow-xl bg-gray-100 cursor-pointer z-10" @click="triggerFileInput">
              <img v-if="form.gambar" :src="form.gambar" class="w-full h-full object-cover" alt="Profile" />
              <span v-else class="text-5xl font-black text-gray-300 flex items-center justify-center h-full">{{ form.nama_penuh ? form.nama_penuh.charAt(0) : '?' }}</span>
              <div class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span class="text-white text-[10px] font-black uppercase tracking-widest">TUKAR</span>
              </div>
            </div>
            
            <div class="pt-16 pb-8 px-6 relative z-0 mt-2">
              <h2 class="text-xl font-black text-gray-900 uppercase leading-tight">{{ form.nama_penuh }}</h2>
              <p class="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">NO ID: {{ form.no_kp }}</p>
              
              <div class="mt-6 flex justify-center gap-4 border-t border-gray-100 pt-6">
                <div class="text-center">
                  <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Gred</p>
                  <p class="text-lg font-black text-[#0F4C3A] uppercase italic">{{ form.gred_sspa || '-' }}</p>
                </div>
                <div class="w-px bg-gray-200"></div>
                <div class="text-center">
                  <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Status</p>
                  <p class="text-lg font-black text-[#E30613] uppercase italic">{{ form.status_ahli || 'AKTIF' }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" class="hidden" />

          <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 class="text-xs font-black text-gray-800 uppercase tracking-widest border-b border-gray-200 pb-3 mb-5 flex items-center gap-2">
              <svg class="w-4 h-4 text-[#E30613]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              Keselamatan Akses
            </h3>
            <form @submit.prevent="simpanKatalaluan" class="space-y-4">
              <div>
                <label class="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Kata Laluan Lama</label>
                <input v-model="passForm.kata_laluan_lama" type="password" required class="w-full border border-gray-300 rounded p-2.5 text-sm font-bold focus:ring-2 focus:ring-[#E30613] outline-none transition-all">
              </div>
              <div>
                <label class="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Kata Laluan Baharu</label>
                <input v-model="passForm.kata_laluan_baru" type="password" required minlength="6" class="w-full border border-gray-300 rounded p-2.5 text-sm font-bold focus:ring-2 focus:ring-[#E30613] outline-none transition-all">
              </div>
              <div>
                <label class="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Sahkan Kata Laluan Baharu</label>
                <input v-model="passForm.sahkan_kata_laluan" type="password" required minlength="6" class="w-full border border-gray-300 rounded p-2.5 text-sm font-bold focus:ring-2 focus:ring-[#E30613] outline-none transition-all">
              </div>
              <button type="submit" :disabled="isPassSaving" class="w-full py-3 bg-[#060d0b] hover:bg-black text-white text-[10px] font-black tracking-widest uppercase rounded shadow-lg transition-all disabled:opacity-50 italic">
                {{ isPassSaving ? 'MENYIMPAN...' : 'TUKAR KATA LALUAN' }}
              </button>
            </form>
          </div>

        </div>

        <div class="lg:col-span-8 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div class="bg-gray-50 border-b border-gray-200 p-6">
            <h3 class="text-sm font-black text-[#0F4C3A] uppercase tracking-[0.2em] italic">Statistik Peribadi Pemain</h3>
          </div>
          
          <form @submit.prevent="simpanProfil" class="p-6 md:p-8 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div class="md:col-span-2 group">
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-[#E30613] transition-colors">Nama Penuh</label>
                <input v-model="form.nama_penuh" type="text" class="w-full border-2 border-gray-200 rounded-xl p-4 text-sm uppercase font-black text-gray-800 focus:border-[#E30613] focus:ring-0 outline-none transition-all">
              </div>

              <div class="md:col-span-2 group">
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-[#E30613] transition-colors">Cawangan / Penempatan</label>
                <input v-model="form.nama_majikan" type="text" class="w-full border-2 border-gray-200 rounded-xl p-4 text-sm uppercase font-black text-gray-800 focus:border-[#E30613] focus:ring-0 outline-none transition-all">
              </div>

              <div class="group">
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-[#E30613] transition-colors">E-mel Peribadi / Rasmi</label>
                <input v-model="form.email" type="email" class="w-full border-2 border-gray-200 rounded-xl p-4 text-sm font-bold text-gray-800 focus:border-[#E30613] focus:ring-0 outline-none transition-all">
              </div>

              <div class="group">
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-[#E30613] transition-colors">No. Telefon</label>
                <input v-model="form.no_tel" type="text" class="w-full border-2 border-gray-200 rounded-xl p-4 text-sm font-mono font-bold text-gray-800 focus:border-[#E30613] focus:ring-0 outline-none transition-all">
              </div>

              <div class="group md:col-span-2">
                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-[#E30613] transition-colors">Saiz Jersi</label>
                <div class="relative">
                  <select v-model="form.saiz_baju" class="w-full border-2 border-gray-200 rounded-xl p-4 text-lg font-black uppercase text-gray-800 focus:border-[#E30613] focus:ring-0 outline-none transition-all appearance-none bg-white italic cursor-pointer">
                    <option value="" disabled>-- PILIH SAIZ --</option>
                    <option value="XS">XS - Extra Small</option>
                    <option value="S">S - Small</option>
                    <option value="M">M - Medium</option>
                    <option value="L">L - Large</option>
                    <option value="XL">XL - Extra Large</option>
                    <option value="2XL">2XL (XXL)</option>
                    <option value="3XL">3XL</option>
                    <option value="4XL">4XL</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-500">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

            </div>

            <div class="pt-8 mt-8 border-t border-gray-100 flex justify-end">
              <button type="submit" :disabled="isSaving" class="w-full md:w-auto px-10 py-4 bg-[#E30613] hover:bg-red-700 text-white text-xs font-black tracking-[0.2em] uppercase rounded-xl shadow-[0_10px_20px_rgba(227,6,19,0.3)] transition-all disabled:opacity-50 flex justify-center items-center gap-3 transform hover:-translate-y-1 active:translate-y-0 italic">
                <svg v-if="!isSaving" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                <span v-if="isSaving" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                {{ isSaving ? 'MEREKOD DATA...' : 'KEMAS KINI PROFIL' }}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../../services/api';

const isLoading = ref(true);
const isSaving = ref(false);
const isPassSaving = ref(false);

const form = ref({});
const passForm = ref({ kata_laluan_lama: '', kata_laluan_baru: '', sahkan_kata_laluan: '' });
const fileInput = ref(null);

// STATE NOTIFIKASI TEMPATAN (TOAST)
const notifikasi = ref({ show: false, message: '', type: 'success' });

// FUNGSI PAPAR NOTIFIKASI
const paparNotifikasi = (message, type = 'success') => {
  notifikasi.value = { show: true, message, type };
  // Hilangkan notifikasi secara automatik selepas 4 saat
  setTimeout(() => {
    notifikasi.value.show = false;
  }, 4000);
};

// Tarik Data
const fetchProfil = async () => {
  isLoading.value = true;
  try {
    const res = await api.get('/admin/profil-saya');
    form.value = res.data.data;
  } catch (error) {
    paparNotifikasi('Gagal menarik data profil pemain.', 'error');
  } finally {
    isLoading.value = false;
  }
};

const triggerFileInput = () => fileInput.value.click();

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    paparNotifikasi('Saiz gambar mesti kurang dari 2MB.', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => { form.value.gambar = e.target.result; };
  reader.readAsDataURL(file);
};

// Simpan Profil Kelab
const simpanProfil = async () => {
  isSaving.value = true;
  try {
    const res = await api.put('/admin/profil-saya', form.value);
    paparNotifikasi(res.data.message || 'Profil berjaya dikemas kini!', 'success');
    
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
      user.name = form.value.nama_penuh;
      localStorage.setItem('user', JSON.stringify(user));
    }
  } catch (error) {
    paparNotifikasi('Gagal menyimpan rekod peribadi.', 'error');
  } finally {
    isSaving.value = false;
  }
};

// Simpan Kata Laluan Baharu
const simpanKatalaluan = async () => {
  if (passForm.value.kata_laluan_baru !== passForm.value.sahkan_kata_laluan) {
    paparNotifikasi('Pengesahan kata laluan baharu tidak sepadan.', 'error');
    return;
  }

  isPassSaving.value = true;
  try {
    const res = await api.put('/admin/tukar-katalaluan', passForm.value);
    paparNotifikasi(res.data.message || 'Kata laluan berjaya ditukar.', 'success');
    passForm.value = { kata_laluan_lama: '', kata_laluan_baru: '', sahkan_kata_laluan: '' };
  } catch (error) {
    const errorMsg = error.response?.data?.message || 'Gagal menukar kata laluan. Pastikan kata laluan lama tepat.';
    paparNotifikasi(errorMsg, 'error');
  } finally {
    isPassSaving.value = false;
  }
};

onMounted(fetchProfil);
</script>

<style scoped>
input:focus, select:focus { outline: none; box-shadow: 4px 4px 0px 0px rgba(227, 6, 19, 0.1); }

/* Animasi Notifikasi Meluncur Dari Atas */
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
.slide-down-enter-from { opacity: 0; transform: translateY(-30px) scale(0.9); }
.slide-down-leave-to { opacity: 0; transform: translateY(-20px) scale(0.95); }
</style>
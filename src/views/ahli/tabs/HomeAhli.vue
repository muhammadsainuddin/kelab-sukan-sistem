<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 pb-32 font-sans">

    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[-120px] right-[-80px] w-[300px] h-[300px] bg-emerald-200/30 blur-3xl rounded-full"></div>
      <div class="absolute bottom-[-120px] left-[-80px] w-[280px] h-[280px] bg-teal-100/40 blur-3xl rounded-full"></div>
    </div>

    <div class="relative z-10 max-w-md mx-auto px-4 pt-5 space-y-6">

      <div class="flex items-center justify-between">
        <div>
          <p class="text-[11px] uppercase tracking-[0.25em] text-slate-400 font-bold">Selamat Datang</p>
          <h1 class="text-2xl font-black text-slate-800 mt-1 leading-tight">
            {{ getGreeting() }},
            <span class="text-emerald-700">{{ firstName }}</span>
          </h1>
        </div>

        <button class="w-11 h-11 rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-slate-100 flex items-center justify-center active:scale-95 transition-all">
          <svg class="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
      </div>

      <div v-if="!loading && !profil.is_paid" class="bg-amber-50/90 border border-amber-100 rounded-3xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl animate-fade-in">
        <div class="flex gap-4">
          <div class="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
            <svg class="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.33 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-sm font-black text-amber-900">Yuran Tahunan Belum Dijelaskan</h3>
            <p class="text-xs text-amber-700 mt-1 leading-relaxed">Akses pendaftaran acara dan bantuan kebajikan akan dihadkan sementara sehingga pembayaran dibuat.</p>
            <button @click="$router.push('/ahli/yuran')" class="mt-4 h-11 px-5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black tracking-wide shadow-lg shadow-amber-500/20 transition-all active:scale-95">Bayar Sekarang</button>
          </div>
        </div>
      </div>

      <div class="relative overflow-hidden rounded-[32px] p-7 text-white shadow-[0_20px_60px_rgba(16,56,45,0.3)] border border-white/10 bg-gradient-to-br from-[#081C15] via-[#10382D] to-[#145C45] min-h-[200px] flex flex-col justify-between">
        
        <img src="/logo.png" class="absolute -bottom-10 -right-10 w-64 opacity-[0.07] grayscale invert pointer-events-none rotate-12" />

        <div class="absolute top-[-80px] right-[-50px] w-[240px] h-[240px] rounded-full bg-white/10 blur-3xl"></div>

        <div class="relative z-10">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-white p-2 shadow-lg">
                <img src="/logo.png" alt="logo" class="w-full h-full object-contain" />
              </div>
              <div>
                <p class="text-[9px] uppercase tracking-[0.3em] text-emerald-200 font-black">Digital Membership</p>
                <h2 class="text-base font-black mt-0.5">Kelab PERHILITAN</h2>
              </div>
            </div>
            <div class="px-3 py-1 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-[9px] font-black uppercase tracking-widest">
              {{ profil.is_paid ? 'Aktif' : 'Tidak Aktif' }}
            </div>
          </div>

          <div class="mt-10 flex items-center gap-5">
            <div class="w-20 h-20 rounded-[28px] overflow-hidden bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-2xl font-black shadow-inner">
              <img v-if="profil.gambar" :src="`http://localhost:5000/uploads/images/${profil.gambar}`" class="w-full h-full object-cover" />
              <span v-else class="text-emerald-100">{{ profil.nama_penuh?.charAt(0) || '?' }}</span>
            </div>

            <div class="flex-1 min-w-0">
              <h2 class="text-xl font-black leading-tight truncate tracking-tight">
                {{ profil.nama_penuh || 'Nama Pengguna' }}
              </h2>
              <div class="mt-2 flex items-center gap-2">
                <div class="px-3 py-1 rounded-full bg-black/20 border border-white/10 text-[10px] font-black tracking-widest uppercase">
                  ID: {{ profil.no_ahli || 'PENDING' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest px-1">Menu Utama</h3>

        <div @click="$router.push('/ahli/aktiviti')" class="relative overflow-hidden rounded-[30px] p-6 bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-[0_15px_40px_rgba(16,185,129,0.25)] active:scale-[0.98] transition-all cursor-pointer group">
          <div class="absolute right-[-30px] top-[-30px] w-40 h-40 rounded-full bg-white/10 blur-3xl group-hover:scale-110 transition-transform"></div>
          <div class="relative z-10 flex items-center justify-between">
            <div class="max-w-[70%]">
              <p class="text-[10px] uppercase tracking-[0.2em] text-emerald-100 font-black">Sukan & Sosial</p>
              <h3 class="text-xl font-black mt-1 leading-tight">Acara & Aktiviti</h3>
              <p class="text-xs text-emerald-50/80 mt-2 leading-relaxed">Sertai aktiviti rekreasi dan program rasmi kelab.</p>
            </div>
            <div class="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/10 shadow-lg">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div @click="$router.push('/ahli/yuran')" class="bg-white rounded-[28px] p-5 border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] active:scale-[0.98] transition-all cursor-pointer">
            <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 class="text-sm font-black text-slate-800 mt-4 tracking-tight">Yuran Kelab</h3>
            <p class="text-[10px] text-slate-500 mt-1 font-bold uppercase">Pembayaran Tahunan</p>
          </div>

          <div @click="$router.push('/ahli/bantuan')" class="bg-white rounded-[28px] p-5 border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] active:scale-[0.98] transition-all cursor-pointer">
            <div class="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="text-sm font-black text-slate-800 mt-4 tracking-tight">Kebajikan</h3>
            <p class="text-[10px] text-slate-500 mt-1 font-bold uppercase">Bantuan & Tabung</p>
          </div>

          <div @click="bukaMerchandize" class="col-span-2 relative overflow-hidden bg-[#1A1A1A] rounded-[30px] p-6 text-white shadow-xl active:scale-[0.98] transition-all cursor-pointer border border-white/5">
            <div class="absolute right-[-20px] bottom-[-20px] w-32 h-32 rounded-full bg-emerald-500/10 blur-3xl"></div>
            <div class="relative z-10 flex items-center justify-between">
              <div>
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/20 text-[9px] uppercase tracking-widest font-black text-emerald-400">Akan Dilancarkan</div>
                <h3 class="text-lg font-black mt-3 tracking-tight uppercase">Merchandise Kelab</h3>
                <p class="text-xs text-slate-400 mt-1">Koleksi eksklusif Sampul Raya, Baju & Topi.</p>
              </div>
              <div class="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl flex items-center justify-center border border-white/10 shadow-lg">
                <svg class="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4 pb-10">
        <div class="flex items-center justify-between px-1">
          <h3 class="text-sm font-black text-slate-800 uppercase tracking-widest">Acara Terkini</h3>
          <button @click="$router.push('/ahli/aktiviti')" class="text-[11px] font-black text-emerald-700 uppercase tracking-widest">Semua</button>
        </div>

        <div v-if="loadingAcara" class="h-[180px] rounded-[32px] bg-white animate-pulse border border-slate-100"></div>

        <div v-else-if="senaraiAcara.length === 0" class="bg-white rounded-[32px] p-10 text-center border border-slate-100 shadow-sm">
          <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Tiada acara aktif.</p>
        </div>

        <div v-else class="flex overflow-x-auto gap-5 pb-4 hide-scrollbar snap-x snap-mandatory">
          <div v-for="acara in senaraiAcara" :key="acara.id" @click="$router.push('/ahli/aktiviti')" class="min-w-[280px] rounded-[30px] overflow-hidden bg-white border border-slate-100 shadow-sm snap-center active:scale-[0.98] transition-all cursor-pointer">
            <div class="relative h-32 bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center">
              <div class="absolute inset-0 opacity-10 bg-[url('/logo.png')] bg-center bg-no-repeat bg-contain scale-75"></div>
              <div class="absolute top-3 left-4 px-3 py-1.5 rounded-2xl bg-white/90 shadow-sm text-center">
                <p class="text-[9px] uppercase font-black text-emerald-800 leading-none">{{ getBulan(acara.tarikh_mula) }}</p>
                <p class="text-lg font-black text-slate-900 leading-none mt-1">{{ getHari(acara.tarikh_mula) }}</p>
              </div>
              <h2 class="text-white font-black text-lg px-6 text-center leading-tight z-10">{{ acara.nama_pertandingan }}</h2>
            </div>
            <div class="p-4 flex items-center justify-between bg-white">
              <div class="flex items-center gap-2 text-slate-500 truncate mr-2">
                <svg class="w-4 h-4 shrink-0 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span class="text-[11px] font-bold truncate">{{ acara.lokasi || 'TBA' }}</span>
              </div>
              <div class="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[9px] font-black uppercase">Daftar</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showMerchModal" class="fixed inset-0 z-[100] flex items-center justify-center p-5 backdrop-blur-md bg-black/60">
          <div class="bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl animate-pop-in">
            <div class="relative h-32 bg-slate-900 flex items-center justify-center overflow-hidden">
               <div class="absolute inset-0 opacity-20 bg-[url('/logo.png')] bg-center bg-contain scale-125 rotate-12"></div>
               <h2 class="text-white text-xl font-black uppercase tracking-widest relative z-10">Koleksi Kelab</h2>
               <button @click="showMerchModal = false" class="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
            </div>
            
            <div class="p-6 space-y-6">
              <div class="text-center">
                <span class="px-4 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest border border-emerald-100">Akan Datang 2026</span>
                <p class="text-slate-500 text-xs mt-3 leading-relaxed">Miliki barangan eksklusif rasmi Kelab PERHILITAN yang akan dibuka untuk tempahan tidak lama lagi.</p>
              </div>

              <div class="grid grid-cols-1 gap-3">
                <div v-for="item in merchItems" :key="item.name" class="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-lg">{{ item.icon }}</div>
                  <div class="flex-1">
                    <h4 class="text-xs font-black text-slate-800 uppercase tracking-tight">{{ item.name }}</h4>
                    <p class="text-[10px] text-slate-500 font-bold uppercase">{{ item.desc }}</p>
                  </div>
                </div>
              </div>

              <button @click="showMerchModal = false" class="w-full h-12 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all mt-2">Faham & Tutup</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../../services/api';

const router = useRouter();
const profil = ref({});
const loading = ref(true);
const senaraiAcara = ref([]);
const loadingAcara = ref(true);
const showMerchModal = ref(false);

const merchItems = [
  { name: 'Sampul Raya Eksklusif', desc: 'Set Limited Edition 2026', icon: '🧧' },
  { name: 'T-Shirt Rasmi Kelab', desc: 'Microfiber Dry-Fit Premium', icon: '👕' },
  { name: 'Topi (Cap) Kelab', desc: 'Sulaman 3D High Quality', icon: '🧢' },
  { name: 'Lanyard & Kad ID', desc: 'Aksesori Korporat Ahli', icon: '🆔' }
];

const firstName = computed(() => {
  if (!profil.value.nama_penuh) return 'Ahli';
  return profil.value.nama_penuh.split(' ')[0];
});

const fetchProfil = async () => {
  try {
    const res = await api.get('/ahli/profil');
    profil.value = res.data.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const fetchAcaraTerkini = async () => {
  loadingAcara.value = true;
  try {
    const res = await api.get('/pertandingan');
    if (res.data.success) {
      senaraiAcara.value = res.data.data.filter(a => a.status === 'BUKA').slice(0, 5);
    }
  } catch (error) {
    console.error(error);
    senaraiAcara.value = [
      { id: 1, nama_pertandingan: 'Futsal Perhilitan', tarikh_mula: '2026-06-15', lokasi: 'Kompleks Sukan Cheras', status: 'BUKA' },
      { id: 2, nama_pertandingan: 'Hari Keluarga', tarikh_mula: '2026-08-20', lokasi: 'Taman Tasik Titiwangsa', status: 'BUKA' }
    ];
  } finally {
    loadingAcara.value = false;
  }
};

const bukaMerchandize = () => {
  showMerchModal.value = true;
};

const getHari = (tarikh) => tarikh ? new Date(tarikh).getDate() : '--';
const getBulan = (tarikh) => {
  if (!tarikh) return '---';
  return ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogo', 'Sep', 'Okt', 'Nov', 'Dis'][new Date(tarikh).getMonth()];
};

const getGreeting = () => {
  const hour = new Date().getHours();
  return hour < 12 ? 'Selamat Pagi' : hour < 18 ? 'Selamat Petang' : 'Selamat Malam';
};

onMounted(() => {
  fetchProfil();
  fetchAcaraTerkini();
});
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.animate-pop-in { animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes popIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
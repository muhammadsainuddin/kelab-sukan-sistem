<template>
  <div class="p-4 max-w-2xl mx-auto space-y-6 animate-fade-in pb-32">
    
    <!-- ========================================== -->
    <!-- 1. MD3 HERO CARD (KAD IDENTITI KELAB)      -->
    <!-- ========================================== -->
    <div class="relative overflow-hidden rounded-[32px] p-7 shadow-lg transition-all duration-500"
         :class="profil.is_paid || profil.status_ahli === 'A - Aktif' ? 'bg-gradient-to-br from-[#0F4C3A] via-[#0F4C3A] to-[#1A6D52] text-white shadow-[#0F4C3A]/20' : 'bg-gradient-to-br from-gray-800 to-gray-900 text-white'">
      
      <!-- Kesan Pantulan Kaca Gelap (Glassmorphism effect) -->
      <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div class="flex justify-between items-start mb-8 relative z-10">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white rounded-xl p-1 flex items-center justify-center shadow-sm">
            <img src="/logo.png" alt="Logo" class="w-full h-full object-contain" />
          </div>
          <div>
            <h3 class="font-black tracking-widest text-[10px] text-green-200 uppercase">Kelab Sukan</h3>
            <p class="text-white text-xs font-bold tracking-wider mt-0.5">PERHILITAN</p>
          </div>
        </div>

        <div class="text-right">
          <span class="inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-2 border"
               :class="profil.is_paid || profil.status_ahli === 'A - Aktif' ? 'bg-[#70B130]/20 text-green-200 border-green-400/30' : 'bg-red-500/20 text-red-200 border-red-500/30 animate-pulse'">
            {{ profil.status_ahli || 'MENUNGGU KELULUSAN' }}
          </span>
          <p class="text-white font-mono font-bold text-base tracking-widest mt-1">{{ profil.no_ahli || 'PROSES ID' }}</p>
        </div>
      </div>

      <div class="flex items-center gap-4 relative z-10">
        <div @click="triggerUpload" class="relative w-16 h-16 shrink-0 rounded-2xl bg-white/10 border border-white/20 overflow-hidden flex items-center justify-center font-black text-xl text-white cursor-pointer group backdrop-blur-sm">
          <img v-if="profil.gambar" :src="`http://localhost:5000/uploads/images/${profil.gambar}`" class="w-full h-full object-cover" />
          <span v-else>{{ profil.nama_penuh ? profil.nama_penuh.charAt(0) : '?' }}</span>
          <div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
          </div>
        </div>
        <input type="file" ref="fileInput" accept="image/*" class="hidden" @change="onFileChange" />
        <div class="min-w-0 flex-1">
          <h2 class="text-lg font-black uppercase tracking-tight truncate text-white leading-tight">{{ profil.nama_penuh }}</h2>
          <p class="text-[10px] font-medium text-green-100/70 mt-1 uppercase tracking-widest">NO KP: {{ profil.no_kp }}</p>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- 2. MD3 LOCAL TABBAR (SUB-NAVIGATION)       -->
    <!-- ========================================== -->
    <div class="flex border-b border-gray-200 bg-white rounded-2xl p-1.5 shadow-sm">
      <button @click="subTab = 'butiran'" 
              :class="subTab === 'butiran' ? 'bg-[#0F4C3A] text-white font-black shadow-sm' : 'text-gray-500 font-bold hover:bg-gray-50'"
              class="flex-1 text-center py-3 rounded-xl text-xs uppercase tracking-wider transition-all duration-200">
        👤 Butiran Profil
      </button>
      <button @click="subTab = 'sejarah'" 
              :class="subTab === 'sejarah' ? 'bg-[#0F4C3A] text-white font-black shadow-sm' : 'text-gray-500 font-bold hover:bg-gray-50'"
              class="flex-1 text-center py-3 rounded-xl text-xs uppercase tracking-wider transition-all duration-200">
        📜 Sejarah Bayaran
      </button>
    </div>

    <!-- ========================================== -->
    <!-- PANEL A: KANDUNGAN BUTIRAN PROFIL          -->
    <!-- ========================================== -->
    <div v-if="subTab === 'butiran'" class="space-y-6">
      
      <!-- Pengurusan Akaun Actions (MD3 Buttons Grid) -->
      <div class="bg-white rounded-[32px] border border-gray-100 p-6 space-y-4 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-1.5 h-5 bg-[#0F4C3A] rounded-full"></div>
          <h3 class="text-xs font-black text-gray-800 uppercase tracking-widest">Pengurusan Akaun</h3>
        </div>
        <div class="flex flex-col sm:flex-row gap-3">
          <button v-if="profil.is_paid || profil.status_ahli === 'A - Aktif'" 
                  @click="modalEdit.show = true" 
                  class="flex-1 py-4 rounded-full bg-[#E8DEF8] text-[#21005D] hover:bg-[#D0BCFF] font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">
            Kemaskini Data
          </button>
          <button @click="modalBerhenti.show = true" 
                  :disabled="!profil.is_paid || profil.status_ahli === 'PROSES BERHENTI'" 
                  class="flex-1 py-4 rounded-full font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2" 
                  :class="profil.is_paid ? 'bg-[#F9DEDC] text-[#410E0B] hover:bg-[#F2B8B5]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'">
            {{ profil.status_ahli === 'PROSES BERHENTI' ? 'Berhenti Diproses' : 'Mohon Penamatan' }}
          </button>
        </div>
      </div>

      <!-- Paparan Maklumat Berdaftar Lengkap (Ahli Berdaftar & Aktif) -->
      <div v-if="profil.is_paid || profil.status_ahli === 'A - Aktif' || profil.status_ahli === 'Menunggu Kelulusan'" class="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
        <div class="flex justify-between items-center border-b border-gray-100 pb-4">
          <h3 class="text-sm font-black text-gray-800 uppercase tracking-widest">Maklumat Rekod</h3>
          <span class="text-[9px] font-black bg-green-50 text-[#0F4C3A] px-3 py-1 rounded-full uppercase tracking-widest">Gred {{ profil.gred_sspa }}</span>
        </div>
        
        <!-- Grid Maklumat Diri -->
        <div class="grid grid-cols-2 gap-6 text-xs">
          <div class="space-y-1"><p class="text-gray-400 font-bold uppercase tracking-widest text-[9px]">PTJ / Bahagian</p><p class="font-black text-gray-800 uppercase text-[11px]">{{ profil.penempatan || '-' }}</p></div>
          <div class="space-y-1"><p class="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Negeri Bertugas</p><p class="font-black text-gray-800 uppercase text-[11px]">{{ profil.negeri_bertugas || '-' }}</p></div>
          <div class="space-y-1"><p class="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Saiz Baju</p><p class="font-black text-[#0F4C3A] uppercase text-sm">{{ profil.saiz_baju || 'N/A' }}</p></div>
          <div class="space-y-1"><p class="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Kaedah Yuran</p><p class="font-black text-red-600 uppercase text-[11px]">{{ profil.pilihan_potongan || '-' }} (RM {{ profil.yuran_bulanan }})</p></div>
        </div>

        <!-- REKOD PAPARAN SEMUE DATA WARIS -->
        <div class="bg-gray-50/60 p-5 rounded-[24px] border border-gray-100 space-y-4 mt-4">
          <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">Kecemasan / Maklumat Waris</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div class="space-y-1">
              <p class="text-gray-400 font-bold uppercase tracking-widest text-[8px]">Nama Waris</p>
              <p class="font-black text-gray-800 uppercase text-[11px]">{{ profil.nama_waris || '-' }}</p>
            </div>
            <div class="space-y-1">
              <p class="text-gray-400 font-bold uppercase tracking-widest text-[8px]">Hubungan</p>
              <p class="font-black text-gray-800 uppercase text-[11px]">{{ profil.hubungan_waris || '-' }}</p>
            </div>
            <div class="space-y-1 sm:col-span-2">
              <p class="text-gray-400 font-bold uppercase tracking-widest text-[8px]">No. Telefon Waris</p>
              <p class="font-mono font-black text-gray-800 text-[11px]">{{ profil.no_tel_waris || '-' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Borang Pendaftaran Awal (Hanya untuk Kakitangan yang belum mendaftar kelab) -->
      <div v-else class="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
        <div class="border-b border-gray-100 pb-4">
          <h3 class="text-sm font-black text-[#0F4C3A] uppercase tracking-widest">Borang Keahlian Baharu</h3>
        </div>

        <form @submit.prevent="hantarBorangDaftar" class="space-y-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Negeri Bertugas</label>
              <select v-model="form.negeri_bertugas" required class="w-full border border-gray-300 rounded-2xl p-3.5 text-sm font-medium outline-none bg-white focus:border-[#0F4C3A]">
                <option value="" disabled>Pilih Negeri</option>
                <option v-for="n in senaraiNegeri" :key="n" :value="n">{{ n }}</option>
              </select>
            </div>
            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Saiz Baju</label>
              <select v-model="form.saiz_baju" required class="w-full border border-gray-300 rounded-2xl p-3.5 text-sm font-black outline-none bg-white focus:border-[#0F4C3A]">
                <option value="" disabled>Pilih Saiz</option>
                <option v-for="s in senaraiSaiz" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">No. Telefon Peribadi</label>
              <input v-model="form.no_tel" type="text" required class="w-full border border-gray-300 rounded-2xl p-3.5 text-sm outline-none focus:border-[#0F4C3A]">
            </div>
            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">E-mel Peribadi</label>
              <input v-model="form.email" type="email" required class="w-full border border-gray-300 rounded-2xl p-3.5 text-sm outline-none focus:border-[#0F4C3A]">
            </div>
          </div>

          <div class="bg-[#F2F4F1] p-5 rounded-[24px] space-y-4">
            <p class="text-[10px] font-black text-[#0F4C3A] uppercase tracking-widest">Maklumat Waris Kecemasan</p>
            <input v-model="form.nama_waris" type="text" required placeholder="Nama Penuh Waris" class="w-full border-none rounded-xl p-3.5 text-sm font-bold uppercase shadow-sm">
            <div class="grid grid-cols-2 gap-3">
              <select v-model="form.hubungan_waris" required class="w-full border-none rounded-xl p-3.5 text-sm font-bold bg-white shadow-sm">
                <option value="Suami / Isteri">Suami / Isteri</option>
                <option value="Ibu / Bapa">Ibu / Bapa</option>
                <option value="Adik Beradik">Adik Beradik</option>
                <option value="Anak">Anak</option>
              </select>
              <input v-model="form.no_tel_waris" type="text" required placeholder="No. Tel Waris" class="w-full border-none rounded-xl p-3.5 text-sm font-mono font-bold shadow-sm">
            </div>
          </div>

          <div class="p-5 bg-green-50/80 rounded-[24px] border border-green-100">
            <div class="flex justify-between items-center mb-3">
              <div>
                <p class="text-[9px] font-black text-gray-500 uppercase tracking-widest">Yuran Bulanan (SSPA)</p>
                <p class="text-2xl font-black text-[#0F4C3A] mt-1">RM {{ yuranBulanan.toFixed(2) }}</p>
              </div>
              <div class="text-right">
                <label class="text-[9px] font-black text-gray-500 uppercase tracking-widest">Kaedah Bayaran</label>
                <select v-model="form.pilihan_potongan" :disabled="isPotonganWajib" class="block w-full mt-1 border border-gray-300 rounded-xl p-2 text-xs font-bold bg-white">
                  <option value="Potongan Gaji / Jabatan">Potongan Gaji</option>
                  <option value="Tunai / Transfer">Tunai / Transfer</option>
                </select>
              </div>
            </div>
            <transition name="fade">
              <div v-if="form.pilihan_potongan === 'Tunai / Transfer'" class="pt-3 border-t border-green-200">
                <label class="text-[9px] font-black text-[#0F4C3A] uppercase tracking-widest block mb-2">Muat Naik Resit Bukti Slip Bank</label>
                <input type="file" @change="onResitChange" accept="image/*,.pdf" required class="w-full text-xs file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-[#0F4C3A] file:text-white bg-white border border-gray-200 rounded-2xl p-1 cursor-pointer">
              </div>
            </transition>
          </div>

          <button type="submit" :disabled="loading" class="w-full bg-[#0F4C3A] hover:bg-black text-white font-black py-4 rounded-full shadow-md active:scale-95 transition-all text-xs uppercase tracking-widest">
            {{ loading ? 'Sila Tunggu...' : 'Hantar Borang Pendaftaran' }}
          </button>
        </form>
      </div>

    </div>

    <!-- ========================================== -->
    <!-- PANEL B: SEJARAH PEMBAYARAN MANUAL         -->
    <!-- ========================================== -->
    <div v-if="subTab === 'sejarah'" class="space-y-4">
      <div class="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm space-y-4">
        <div class="flex items-center justify-between border-b pb-3">
          <h3 class="text-xs font-black text-gray-800 uppercase tracking-widest">Sejarah Bayaran Kaedah Slip/Tunai</h3>
          <span class="text-[9px] font-black bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full uppercase">Rekod Manual</span>
        </div>
        
        <div v-if="sejarahBayaran.length === 0" class="text-center py-10 text-gray-400 text-xs font-bold uppercase tracking-wider">
          Tiada sejarah transaksi manual ditemui.
        </div>
        <div v-else class="space-y-3">
          <div v-for="bayaran in sejarahBayaran" :key="bayaran.id" class="p-4 border border-gray-100 rounded-2xl bg-gray-50/50 flex justify-between items-center">
            <div class="space-y-1">
              <p class="text-xs font-black text-gray-800 uppercase">{{ bayaran.keterangan || 'Yuran Bulanan Kelab' }}</p>
              <p class="text-[9px] text-gray-400 font-bold">Tarikh Proses: {{ formatTarikh(bayaran.tarikh_cipta) }}</p>
            </div>
            <div class="text-right space-y-1">
              <p class="text-sm font-black text-[#0F4C3A]">RM {{ parseFloat(bayaran.amaun).toFixed(2) }}</p>
              <span :class="bayaran.status === 'LULUS' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'" class="inline-block px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest">
                {{ bayaran.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- MODAL 1: EDIT PROFILE (MD3 DIALOG STANDARD)-->
    <!-- ========================================== -->
    <div v-if="modalEdit.show" class="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" @click="modalEdit.show = false"></div>
      <div class="bg-[#FDFDFD] rounded-t-[32px] sm:rounded-[32px] w-full max-w-md shadow-2xl relative z-10 animate-slide-up overflow-hidden flex flex-col max-h-[90vh]">
        
        <!-- Modal Header -->
        <div class="p-7 border-b border-gray-100 shrink-0">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-full bg-[#E8DEF8] text-[#21005D] flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
            </div>
            <h3 class="text-xl font-black text-gray-900">Kemaskini Profil</h3>
          </div>
          <p class="text-xs font-medium text-gray-500">Kemas kini penempatan, maklumat bertugas atau kata laluan anda.</p>
        </div>
        
        <!-- Modal Scrollable Body -->
        <div class="p-7 overflow-y-auto custom-scrollbar space-y-6">
          
          <!-- 1. Maklumat Asas -->
          <div class="space-y-4">
            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Saiz Baju Baru</label>
              <select v-model="form.saiz_baju" class="w-full border border-gray-300 rounded-2xl px-4 py-3.5 text-sm font-black bg-white outline-none focus:border-[#6750A4] focus:ring-1 focus:ring-[#6750A4]">
                <option v-for="s in senaraiSaiz" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>
            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">No. Telefon</label>
              <input v-model="form.no_tel" type="text" class="w-full border border-gray-300 rounded-2xl px-4 py-3.5 text-sm font-bold outline-none focus:border-[#6750A4]">
            </div>
            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">E-mel</label>
              <input v-model="form.email" type="email" class="w-full border border-gray-300 rounded-2xl px-4 py-3.5 text-sm font-bold outline-none focus:border-[#6750A4]">
            </div>
          </div>

          <hr class="border-gray-100">

          <!-- 2. Maklumat Penempatan -->
          <div class="space-y-4">
            <h4 class="text-[10px] font-black text-[#6750A4] uppercase tracking-widest ml-2">Maklumat Pekerjaan</h4>
            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">PTJ / Cawangan Bertugas</label>
              <input v-model="form.penempatan" type="text" placeholder="Nama Bahagian / Pejabat Negeri" class="w-full border border-gray-300 rounded-2xl px-4 py-3.5 text-sm font-bold outline-none uppercase focus:border-[#6750A4]">
            </div>
            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Negeri Bertugas</label>
              <select v-model="form.negeri_bertugas" class="w-full border border-gray-300 rounded-2xl px-4 py-3.5 text-sm font-black bg-white outline-none focus:border-[#6750A4]">
                <option v-for="n in senaraiNegeri" :key="n" :value="n">{{ n }}</option>
              </select>
            </div>
          </div>

          <hr class="border-gray-100">

          <!-- 3. Tukar Kata Laluan -->
          <div class="space-y-4">
            <h4 class="text-[10px] font-black text-[#6750A4] uppercase tracking-widest ml-2">Keselamatan</h4>
            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Kata Laluan Baru (Pilihan)</label>
              <input v-model="form.kata_laluan_baru" type="password" placeholder="Biarkan kosong jika tidak mahu tukar" class="w-full border border-gray-300 rounded-2xl px-4 py-3.5 text-sm font-bold outline-none focus:border-[#6750A4]">
            </div>
            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Sahkan Kata Laluan Baru</label>
              <input v-model="form.sahkan_kata_laluan" type="password" placeholder="Taip semula kata laluan baru" class="w-full border border-gray-300 rounded-2xl px-4 py-3.5 text-sm font-bold outline-none focus:border-[#6750A4]">
            </div>
          </div>
        </div>
        
        <!-- Modal Footer Actions -->
        <div class="p-6 bg-gray-50 flex justify-end gap-3 border-t border-gray-100 shrink-0">
          <button @click="modalEdit.show = false" class="px-6 py-2.5 text-xs font-black text-gray-500 uppercase tracking-widest hover:bg-gray-200 rounded-full transition-colors">Batal</button>
          <button @click="hantarKemaskini" :disabled="loading" class="px-8 py-2.5 bg-[#6750A4] text-white text-xs font-black uppercase tracking-widest rounded-full shadow-md active:scale-95 transition-all">
            {{ loading ? 'Sila Tunggu...' : 'Simpan' }}
          </button>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- MODAL 2: PENAMATAN KEAHLIAN (MD3 ERROR)    -->
    <!-- ========================================== -->
    <div v-if="modalBerhenti.show" class="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" @click="modalBerhenti.show = false"></div>
      <div class="bg-[#FDFDFD] rounded-t-[32px] sm:rounded-[32px] w-full max-w-md shadow-2xl relative z-10 animate-slide-up overflow-hidden">
        
        <div class="p-7 bg-[#F9DEDC]">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-full bg-[#B3261E] text-white flex items-center justify-center shadow-sm">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
            <h3 class="text-xl font-black text-[#410E0B]">Penamatan Keahlian</h3>
          </div>
          <p class="text-xs font-semibold text-[#410E0B]/80 mt-2">Perhatian: Tindakan ini akan melucutkan segala faedah sukan & kebajikan kelab anda serta-merta.</p>
        </div>
        
        <form @submit.prevent="hantarBerhenti" class="p-7 space-y-5">
          <div class="space-y-3">
            <label class="text-[10px] font-black text-[#B3261E] uppercase tracking-widest ml-1">Pilih Alasan Utama</label>
            <div class="grid grid-cols-1 gap-2">
              <label v-for="sebab in senaraiSebabBerhenti" :key="sebab" 
                     class="relative flex items-center p-4 rounded-2xl border transition-all cursor-pointer"
                     :class="formBerhenti.sebab_utama === sebab ? 'bg-[#F9DEDC] border-[#B3261E] text-[#410E0B]' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'">
                <input type="radio" v-model="formBerhenti.sebab_utama" :value="sebab" class="hidden">
                <span class="text-xs font-bold uppercase tracking-tight">{{ sebab }}</span>
                <div v-if="formBerhenti.sebab_utama === sebab" class="ml-auto w-4 h-4 bg-[#B3261E] rounded-full flex items-center justify-center">
                  <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                </div>
              </label>
            </div>
          </div>
          
          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Ulasan / Tarikh Berkuatkuasa</label>
            <textarea v-model="formBerhenti.ulasan" required placeholder="Cth: Bertukar ke Jabatan lain mulai 1 Jun..." class="w-full border border-gray-300 rounded-2xl p-4 text-sm h-24 resize-none outline-none focus:border-[#B3261E] focus:ring-1 focus:ring-[#B3261E] bg-gray-50 focus:bg-white"></textarea>
          </div>

          <div class="flex justify-end gap-3 pt-3">
            <button type="button" @click="modalBerhenti.show = false" class="px-6 py-3 text-xs font-black text-[#B3261E] uppercase tracking-widest hover:bg-[#B3261E]/10 rounded-full transition-colors">Batal</button>
            <button type="submit" :disabled="loading || !formBerhenti.sebab_utama" class="px-8 py-3 bg-[#B3261E] text-white text-xs font-black uppercase tracking-widest rounded-full shadow-md active:scale-95 transition-all">
              Sahkan Berhenti
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '../../../services/api';

const profil = ref({});
const loading = ref(true);
const isUploading = ref(false);
const fileInput = ref(null);
const resitFile = ref(null);

// Sesi Tab & Sejarah
const subTab = ref('butiran'); 
const sejarahBayaran = ref([]);

const senaraiNegeri = ['Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Selangor', 'Terengganu', 'WP Kuala Lumpur', 'WP Labuan', 'WP Putrajaya'];
const senaraiSaiz = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];
const senaraiSebabBerhenti = ['Berhenti Kerja', 'Bersara (Pencen)', 'Bertukar Jabatan', 'Lain-lain'];

const modalEdit = ref({ show: false });
const modalBerhenti = ref({ show: false });

const form = ref({
  negeri_bertugas: '', saiz_baju: '', email: '', no_tel: '',
  nama_waris: '', hubungan_waris: 'Suami / Isteri', no_tel_waris: '', pilihan_potongan: 'Tunai / Transfer',
  penempatan: '', // Ditambah: PTJ/Cawangan Bertugas
  kata_laluan_baru: '', sahkan_kata_laluan: '' // Ditambah: Tukar Kata Laluan
});
const formBerhenti = ref({ sebab_utama: '', ulasan: '' });

const fetchProfil = async () => {
  loading.value = true;
  try {
    const res = await api.get('/ahli/profil');
    profil.value = res.data.data;
    
    // Auto-prefill form untuk Edit Modal
    form.value = {
      negeri_bertugas: profil.value.negeri_bertugas || '',
      penempatan: profil.value.penempatan || '', // Masukkan PTJ
      saiz_baju: profil.value.saiz_baju || '',
      email: profil.value.email || '',
      no_tel: profil.value.no_tel || '',
      nama_waris: profil.value.nama_waris || '',
      hubungan_waris: profil.value.hubungan_waris || 'Suami / Isteri',
      no_tel_waris: profil.value.no_tel_waris || '',
      pilihan_potongan: profil.value.pilihan_potongan || 'Tunai / Transfer',
      kata_laluan_baru: '',
      sahkan_kata_laluan: ''
    };

    if(profil.value.pilihan_potongan === 'Tunai / Transfer') {
      fetchSejarahBayaran();
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const fetchSejarahBayaran = async () => {
  try {
    const res = await api.get('/ahli/sejarah-pembayaran'); 
    sejarahBayaran.value = res.data.data || [];
  } catch (e) {
    // Fallback data simulasi jika endpoint API belum dicipta
    sejarahBayaran.value = [
      { id: 1, keterangan: 'Yuran Bulanan Pertama Kelab', amaun: yuranBulanan.value, status: 'LULUS', tarikh_cipta: new Date() }
    ];
  }
};

const yuranBulanan = computed(() => {
  const gred = (profil.value.gred_sspa || '').toUpperCase();
  if (gred.includes('JUSA') || gred.includes('VU') || gred.includes('VK') || gred.includes('UTAMA')) return 15.00;
  const match = gred.match(/\d+/);
  if (match) {
    const num = parseInt(match[0], 10);
    if (num >= 9 && num <= 14) return 10.00;
    if (num >= 1 && num <= 8) return 5.00;
  }
  return 5.00;
});

const isPotonganWajib = computed(() => {
  const gred = (profil.value.gred_sspa || '').toUpperCase();
  return gred.includes('JUSA') || gred.includes('VU') || gred.includes('VK') || gred.includes('UTAMA') || gred.startsWith('G');
});

const triggerUpload = () => fileInput.value.click();
const onFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const formData = new FormData();
  formData.append('gambar', file);
  isUploading.value = true;
  try {
    await api.put('/ahli/kemaskini-gambar', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    fetchProfil();
  } catch (error) {
    alert("Gagal memuat naik gambar.");
  } finally {
    isUploading.value = false;
  }
};

const onResitChange = (e) => {
  resitFile.value = e.target.files[0];
};

// ACTIONS A: DAFTAR AWAL (GUNA MULTIPART FORM-DATA)
const hantarBorangDaftar = async () => {
  loading.value = true;
  try {
    const formData = new FormData();
    formData.append('negeri_bertugas', form.value.negeri_bertugas);
    formData.append('saiz_baju', form.value.saiz_baju);
    formData.append('email', form.value.email);
    formData.append('no_tel', form.value.no_tel);
    formData.append('nama_waris', form.value.nama_waris);
    formData.append('hubungan_waris', form.value.hubungan_waris);
    formData.append('no_tel_waris', form.value.no_tel_waris);
    formData.append('pilihan_potongan', form.value.pilihan_potongan);
    formData.append('nama_ptj', profil.value.penempatan); // Gunakan original dari pangkalan master
    formData.append('yuran_bulanan', yuranBulanan.value);
    formData.append('klasifikasi_jawatan', profil.value.gred_sspa.includes('JUSA') ? 'JUSA / PENGURUSAN TERTINGGI' : `KUMPULAN ${profil.value.gred_sspa.charAt(0)}`);

    if (form.value.pilihan_potongan === 'Tunai / Transfer' && resitFile.value) {
      formData.append('resit_pembayaran', resitFile.value);
    }

    await api.put('/ahli/kemaskini-profil', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    alert("Pendaftaran berjaya dihantar!");
    fetchProfil();
  } catch (error) {
    alert("Ralat pendaftaran.");
  } finally {
    loading.value = false;
  }
};

// ACTIONS B: KEMASKINI STANDARD & TUKAR KATA LALUAN (JSON STANDARD)
const hantarKemaskini = async () => {
  // Pengesahan Keselamatan Kata Laluan Baru
  if (form.value.kata_laluan_baru) {
    if (form.value.kata_laluan_baru !== form.value.sahkan_kata_laluan) {
      alert("Kata laluan baru tidak sepadan. Sila semak dan taip semula.");
      return;
    }
  }

  loading.value = true;
  try {
    const dataHantar = {
      saiz_baju: form.value.saiz_baju,
      no_tel: form.value.no_tel,
      email: form.value.email,
      nama_ptj: form.value.penempatan, // PTJ baharu
      negeri_bertugas: form.value.negeri_bertugas, // Negeri baharu
      yuran_bulanan: profil.value.yuran_bulanan,
      is_update_only: true
    };

    // Masukkan kata laluan dalam payload (hanya jika pengguna isi)
    if (form.value.kata_laluan_baru) {
      dataHantar.kata_laluan = form.value.kata_laluan_baru;
    }

    await api.put('/ahli/kemaskini-profil', dataHantar); 
    modalEdit.value.show = false;
    alert("Profil dan rekod berjaya dikemas kini.");
    
    // Refresh UI Profile
    fetchProfil();
  } catch (error) {
    alert("Gagal mengemaskini maklumat.");
  } finally {
    loading.value = false;
  }
};

const hantarBerhenti = async () => {
  loading.value = true;
  try {
    const payload = { sebab_berhenti: `${formBerhenti.value.sebab_utama}: ${formBerhenti.value.ulasan}` };
    await api.post('/ahli/mohon-berhenti', payload);
    modalBerhenti.value.show = false;
    fetchProfil();
  } catch (error) {
    alert("Gagal memproses permohonan berhenti.");
  } finally {
    loading.value = false;
  }
};

const formatTarikh = (t) => {
  if(!t) return '-';
  return new Date(t).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' });
};

onMounted(() => {
  fetchProfil();
  if (isPotonganWajib.value) form.value.pilihan_potongan = 'Potongan Gaji / Jabatan';
});
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.animate-slide-up { animation: slideUpMobile 0.4s cubic-bezier(0.2, 0, 0, 1) forwards; }
@keyframes slideUpMobile { from { transform: translateY(100%); } to { transform: translateY(0); } }

/* Scrollbar Moden untuk Modal yang Panjang */
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #D1D5DB; }
</style>
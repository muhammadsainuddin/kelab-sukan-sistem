<template>
  <div class="p-4 max-w-2xl mx-auto space-y-6 animate-fade-in pb-32">
    
    <div class="relative overflow-hidden rounded-[32px] p-7 shadow-lg transition-all duration-500"
         :class="profil.is_paid || profil.status_ahli === 'A - Aktif' ? 'bg-gradient-to-br from-[#0F4C3A] via-[#0F4C3A] to-[#1A6D52] text-white shadow-[#0F4C3A]/20' : 'bg-gradient-to-br from-gray-800 to-gray-900 text-white'">
      
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

    <div class="space-y-6">
      
      <div class="bg-white rounded-[24px] border border-gray-100 p-4 shadow-sm flex flex-col sm:flex-row gap-3">
        <button v-if="profil.is_paid || profil.status_ahli === 'A - Aktif' || profil.status_ahli === 'Menunggu Kelulusan'" 
                @click="bukaModalEdit" 
                class="flex-1 py-3.5 rounded-2xl bg-[#0F4C3A]/10 text-[#0F4C3A] hover:bg-[#0F4C3A]/20 font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
          Kemaskini Profil
        </button>
        <button @click="modalBerhenti.show = true" 
                :disabled="!profil.is_paid || profil.status_ahli === 'PROSES BERHENTI'" 
                class="flex-1 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2" 
                :class="profil.is_paid ? 'bg-red-50 text-red-700 hover:bg-red-100' : 'bg-gray-100 text-gray-400 cursor-not-allowed'">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          {{ profil.status_ahli === 'PROSES BERHENTI' ? 'Berhenti Diproses' : 'Penamatan Kelab' }}
        </button>
      </div>

      <div v-if="profil.is_paid || profil.status_ahli === 'A - Aktif' || profil.status_ahli === 'Menunggu Kelulusan'" class="space-y-6">
        
        <div class="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm">
          <div class="flex items-center gap-3 mb-5 border-b border-gray-100 pb-4">
            <div class="w-8 h-8 rounded-full bg-green-50 text-green-700 flex items-center justify-center"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div>
            <div>
              <h3 class="text-sm font-black text-gray-800 uppercase tracking-widest">Maklumat Ahli</h3>
              <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Pekerjaan & Peribadi</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-y-5 gap-x-4 text-xs">
            <div class="space-y-1 sm:col-span-2">
              <p class="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Cawangan / PTJ Terkini</p>
              <p class="font-black text-gray-900 uppercase text-xs">{{ profil.penempatan || profil.nama_ptj || 'SILA KEMAS KINI' }}</p>
            </div>
            <div class="space-y-1"><p class="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Gred Jawatan</p><p class="font-black text-[#0F4C3A] uppercase text-xs">{{ profil.gred_sspa || '-' }}</p></div>
            <div class="space-y-1"><p class="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Negeri</p><p class="font-black text-gray-800 uppercase text-xs">{{ profil.negeri_bertugas || '-' }}</p></div>
            <div class="space-y-1"><p class="text-gray-400 font-bold uppercase tracking-widest text-[9px]">No. Telefon</p><p class="font-black text-gray-800 uppercase text-xs">{{ profil.no_tel || '-' }}</p></div>
            <div class="space-y-1"><p class="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Saiz Baju</p><p class="font-black text-gray-800 uppercase text-xs">{{ profil.saiz_baju || 'N/A' }}</p></div>
            
            <div class="space-y-1 sm:col-span-2 bg-gray-50 p-4 rounded-xl border border-gray-100 mt-2">
              <p class="text-gray-500 font-bold uppercase tracking-widest text-[9px]">Akaun Bank Ahli (Untuk Tuntutan)</p>
              <div class="flex items-center gap-2 mt-1.5">
                <p class="font-black text-[#0F4C3A] uppercase text-sm">{{ profil.bank_ahli || 'N/A' }} -</p>
                <p class="font-mono font-black text-gray-900 text-sm">{{ profil.no_acc_bank || 'BELUM DIKEMAS KINI' }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm">
          <div class="flex items-center gap-3 mb-5 border-b border-gray-100 pb-4">
            <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg></div>
            <div>
              <h3 class="text-sm font-black text-gray-800 uppercase tracking-widest">Maklumat Waris</h3>
              <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Kecemasan & Kebajikan</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-y-5 gap-x-4 text-xs">
            <div class="space-y-1 sm:col-span-2">
              <p class="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Nama Penuh Waris</p>
              <p class="font-black text-gray-900 uppercase text-xs">{{ profil.nama_waris || 'SILA KEMAS KINI' }}</p>
            </div>
            <div class="space-y-1"><p class="text-gray-400 font-bold uppercase tracking-widest text-[9px]">Hubungan</p><p class="font-black text-gray-800 uppercase text-xs">{{ profil.hubungan_waris || '-' }}</p></div>
            <div class="space-y-1"><p class="text-gray-400 font-bold uppercase tracking-widest text-[9px]">No. Telefon</p><p class="font-mono font-black text-gray-800 text-xs">{{ profil.no_tel_waris || '-' }}</p></div>
            
            <div class="space-y-1 sm:col-span-2 bg-blue-50/40 p-4 rounded-xl border border-blue-100 mt-2">
              <p class="text-gray-500 font-bold uppercase tracking-widest text-[9px]">Akaun Bank Waris</p>
              <div class="flex items-center gap-2 mt-1.5">
                <p class="font-black text-blue-900 uppercase text-sm">{{ profil.bank_waris || 'N/A' }} -</p>
                <p class="font-mono font-black text-gray-900 text-sm">{{ profil.no_acc_waris || 'BELUM DIKEMAS KINI' }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div v-else class="bg-white p-7 rounded-[32px] border border-gray-100 shadow-sm space-y-8">
        <div class="border-b border-gray-100 pb-4 text-center">
          <h3 class="text-base font-black text-[#0F4C3A] uppercase tracking-widest">Pendaftaran Ahli</h3>
          <p class="text-xs text-gray-500 mt-1 font-medium">Lengkapkan 3 bahagian di bawah untuk mengaktifkan keahlian.</p>
        </div>

        <form @submit.prevent="hantarBorangDaftar" class="space-y-8">
          
          <div class="space-y-4">
            <h4 class="text-[11px] font-black text-gray-400 uppercase tracking-widest">1. Maklumat Peribadi & Jabatan</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5 sm:col-span-2">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">PTJ / Cawangan Terkini</label>
                <select v-model="form.nama_ptj" required class="w-full border border-gray-300 rounded-2xl p-3.5 text-sm font-bold outline-none bg-white focus:border-[#0F4C3A] shadow-sm">
                  <option value="" disabled>Pilih PTJ Anda</option>
                  <option v-for="ptj in senaraiPTJ" :key="ptj.nama_ptj" :value="ptj.nama_ptj">{{ ptj.nama_ptj }}</option>
                </select>
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Negeri Bertugas</label>
                <select v-model="form.negeri_bertugas" required class="w-full border border-gray-300 rounded-2xl p-3.5 text-sm font-bold outline-none bg-white focus:border-[#0F4C3A] shadow-sm">
                  <option value="" disabled>Pilih Negeri</option>
                  <option v-for="n in senaraiNegeri" :key="n" :value="n">{{ n }}</option>
                </select>
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Saiz Baju</label>
                <select v-model="form.saiz_baju" required class="w-full border border-gray-300 rounded-2xl p-3.5 text-sm font-black outline-none bg-white focus:border-[#0F4C3A] shadow-sm">
                  <option value="" disabled>Pilih Saiz</option>
                  <option v-for="s in senaraiSaiz" :key="s" :value="s">{{ s }}</option>
                </select>
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">No. Telefon</label>
                <input v-model="form.no_tel" type="text" required class="w-full border border-gray-300 rounded-2xl p-3.5 text-sm font-bold outline-none focus:border-[#0F4C3A] shadow-sm">
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">E-mel</label>
                <input v-model="form.email" type="email" required class="w-full border border-gray-300 rounded-2xl p-3.5 text-sm font-bold outline-none focus:border-[#0F4C3A] shadow-sm">
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Nama Bank (Ahli)</label>
                <input v-model="form.bank_ahli" type="text" placeholder="Cth: Maybank, CIMB" required class="w-full border border-gray-300 rounded-2xl p-3.5 text-sm font-bold outline-none uppercase focus:border-[#0F4C3A] shadow-sm">
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">No. Akaun Bank (Ahli)</label>
                <input v-model="form.no_acc_bank" type="text" placeholder="No Akaun" required class="w-full border border-gray-300 rounded-2xl p-3.5 text-sm font-mono font-bold outline-none focus:border-[#0F4C3A] shadow-sm">
              </div>
            </div>
          </div>

          <hr class="border-gray-100">

          <div class="space-y-4">
            <h4 class="text-[11px] font-black text-gray-400 uppercase tracking-widest">2. Maklumat Waris / Kecemasan</h4>
            <div class="bg-blue-50/50 p-5 rounded-[24px] border border-blue-100 space-y-4">
              <input v-model="form.nama_waris" type="text" required placeholder="Nama Penuh Waris" class="w-full border border-gray-200 rounded-xl p-3.5 text-sm font-bold uppercase shadow-sm outline-none focus:border-blue-400">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select v-model="form.hubungan_waris" required class="w-full border border-gray-200 rounded-xl p-3.5 text-sm font-bold bg-white shadow-sm outline-none focus:border-blue-400">
                  <option value="Suami / Isteri">Suami / Isteri</option>
                  <option value="Ibu / Bapa">Ibu / Bapa</option>
                  <option value="Adik Beradik">Adik Beradik</option>
                  <option value="Anak">Anak</option>
                </select>
                <input v-model="form.no_tel_waris" type="text" required placeholder="No. Tel Waris" class="w-full border border-gray-200 rounded-xl p-3.5 text-sm font-mono font-bold shadow-sm outline-none focus:border-blue-400">
                <input v-model="form.bank_waris" type="text" required placeholder="Nama Bank Waris (Cth: BSN)" class="w-full border border-gray-200 rounded-xl p-3.5 text-sm font-bold uppercase shadow-sm outline-none focus:border-blue-400">
                <input v-model="form.no_acc_waris" type="text" required placeholder="No Akaun Bank Waris" class="w-full border border-gray-200 rounded-xl p-3.5 text-sm font-mono font-bold shadow-sm outline-none focus:border-blue-400">
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h4 class="text-[11px] font-black text-gray-400 uppercase tracking-widest">3. Pengesahan Yuran</h4>
            <div class="p-5 bg-green-50 rounded-[24px] border border-green-200">
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-[9px] font-black text-gray-500 uppercase tracking-widest">Yuran Bulanan (Ikut Gred)</p>
                  <p class="text-2xl font-black text-[#0F4C3A] mt-1">RM {{ yuranBulanan.toFixed(2) }}</p>
                </div>
                <div class="text-right">
                  <label class="text-[9px] font-black text-gray-500 uppercase tracking-widest">Kaedah Bayaran</label>
                  <select v-model="form.pilihan_potongan" :disabled="isPotonganWajib" class="block w-full mt-1 border border-gray-300 rounded-xl p-2.5 text-xs font-bold bg-white">
                    <option value="Potongan Gaji / Jabatan">Potongan Gaji</option>
                    <option value="Tunai / Transfer">Potongan FPX (ToyyibPay)</option>
                  </select>
                </div>
              </div>
              <p v-if="form.pilihan_potongan === 'Tunai / Transfer'" class="text-[10px] text-gray-500 font-medium mt-3 border-t border-green-200 pt-3">
                * Pembayaran akan diuruskan secara automatik di tab <b>Yuran</b> menggunakan FPX. Tiada resit manual diperlukan.
              </p>
            </div>
          </div>

          <button type="submit" :disabled="loading" class="w-full bg-[#0F4C3A] hover:bg-black text-white font-black py-4.5 rounded-full shadow-lg shadow-[#0F4C3A]/20 active:scale-95 transition-all text-xs uppercase tracking-widest mt-4">
            {{ loading ? 'Sila Tunggu...' : 'Hantar Borang Pendaftaran' }}
          </button>
        </form>
      </div>

    </div>

    <div v-if="modalEdit.show" class="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" @click="modalEdit.show = false"></div>
      <div class="bg-[#FDFDFD] rounded-t-[32px] sm:rounded-[32px] w-full max-w-md shadow-2xl relative z-10 animate-slide-up overflow-hidden flex flex-col max-h-[90vh]">
        
        <div class="p-7 border-b border-gray-100 shrink-0 bg-white">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#E8DEF8] text-[#21005D] flex items-center justify-center">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
              </div>
              <div>
                <h3 class="text-xl font-black text-gray-900 leading-tight">Kemaskini</h3>
                <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400">Profil & Waris</p>
              </div>
            </div>
            <button @click="modalEdit.show = false" class="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
          </div>
        </div>
        
        <div class="p-6 overflow-y-auto custom-scrollbar space-y-8 bg-gray-50/50">
          
          <div class="space-y-4">
            <h4 class="text-[10px] font-black text-[#0F4C3A] uppercase tracking-widest border-b border-gray-200 pb-2">1. Pekerjaan & Peribadi</h4>
            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">PTJ / Cawangan Terkini</label>
              <select v-model="form.nama_ptj" class="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm font-bold bg-white outline-none focus:border-[#0F4C3A] shadow-sm">
                <option v-for="ptj in senaraiPTJ" :key="ptj.nama_ptj" :value="ptj.nama_ptj">{{ ptj.nama_ptj }}</option>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Negeri</label>
                <select v-model="form.negeri_bertugas" class="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm font-bold bg-white outline-none focus:border-[#0F4C3A] shadow-sm">
                  <option v-for="n in senaraiNegeri" :key="n" :value="n">{{ n }}</option>
                </select>
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Saiz Baju</label>
                <select v-model="form.saiz_baju" class="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm font-black bg-white outline-none focus:border-[#0F4C3A] shadow-sm">
                  <option v-for="s in senaraiSaiz" :key="s" :value="s">{{ s }}</option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">No. Telefon</label>
                <input v-model="form.no_tel" type="text" class="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-[#0F4C3A] shadow-sm">
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">E-mel</label>
                <input v-model="form.email" type="email" class="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-[#0F4C3A] shadow-sm">
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Nama Bank (Ahli)</label>
                <input v-model="form.bank_ahli" type="text" placeholder="Maybank" class="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm font-bold uppercase outline-none focus:border-[#0F4C3A] shadow-sm">
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">No. Akaun (Ahli)</label>
                <input v-model="form.no_acc_bank" type="text" placeholder="12345678" class="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm font-mono font-bold outline-none focus:border-[#0F4C3A] shadow-sm">
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h4 class="text-[10px] font-black text-[#0F4C3A] uppercase tracking-widest border-b border-gray-200 pb-2">2. Maklumat Waris</h4>
            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Nama Penuh Waris</label>
              <input v-model="form.nama_waris" type="text" class="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm font-bold outline-none uppercase focus:border-[#0F4C3A] shadow-sm">
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Hubungan</label>
                <select v-model="form.hubungan_waris" class="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm font-bold bg-white outline-none focus:border-[#0F4C3A] shadow-sm">
                  <option value="Suami / Isteri">Suami / Isteri</option>
                  <option value="Ibu / Bapa">Ibu / Bapa</option>
                  <option value="Adik Beradik">Adik Beradik</option>
                  <option value="Anak">Anak</option>
                </select>
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">No. Telefon</label>
                <input v-model="form.no_tel_waris" type="text" class="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-[#0F4C3A] shadow-sm">
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Nama Bank (Waris)</label>
                <input v-model="form.bank_waris" type="text" placeholder="CIMB" class="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm font-bold uppercase outline-none focus:border-[#0F4C3A] shadow-sm">
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">No Akaun (Waris)</label>
                <input v-model="form.no_acc_waris" type="text" placeholder="12345678" class="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm font-mono font-bold outline-none focus:border-[#0F4C3A] shadow-sm">
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h4 class="text-[10px] font-black text-red-600 uppercase tracking-widest border-b border-gray-200 pb-2">3. Keselamatan</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Kata Laluan Baru</label>
                <input v-model="form.kata_laluan_baru" type="password" placeholder="Biar kosong jika tak tukar" class="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-red-400 shadow-sm">
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Sahkan Kata Laluan</label>
                <input v-model="form.sahkan_kata_laluan" type="password" placeholder="Taip semula" class="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-red-400 shadow-sm">
              </div>
            </div>
          </div>

        </div>
        
        <div class="p-6 bg-white flex justify-end gap-3 border-t border-gray-100 shrink-0">
          <button @click="modalEdit.show = false" class="px-6 py-3 text-xs font-black text-gray-500 uppercase tracking-widest hover:bg-gray-100 rounded-full transition-colors">Batal</button>
          <button @click="hantarKemaskini" :disabled="loading" class="px-8 py-3 bg-[#0F4C3A] text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg shadow-[#0F4C3A]/20 active:scale-95 transition-all">
            {{ loading ? 'Menyimpan...' : 'Simpan Profil' }}
          </button>
        </div>
      </div>
    </div>

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
          <p class="text-xs font-semibold text-[#410E0B]/80 mt-2">Tindakan ini akan melucutkan segala faedah kelab anda serta-merta.</p>
        </div>
        <form @submit.prevent="hantarBerhenti" class="p-7 space-y-5">
          <div class="space-y-3">
            <label class="text-[10px] font-black text-[#B3261E] uppercase tracking-widest ml-1">Pilih Alasan Utama</label>
            <div class="grid grid-cols-1 gap-2">
              <label v-for="sebab in senaraiSebabBerhenti" :key="sebab" 
                     class="relative flex items-center p-4 rounded-2xl border transition-all cursor-pointer"
                     :class="formBerhenti.sebab_utama === sebab ? 'bg-[#F9DEDC] border-[#B3261E] text-[#410E0B]' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'">
                <input type="radio" v-model="formBerhenti.sebab_utama" :value="sebab" class="hidden">
                <span class="text-xs font-bold uppercase tracking-tight">{{ sebab }}</span>
                <div v-if="formBerhenti.sebab_utama === sebab" class="ml-auto w-4 h-4 bg-[#B3261E] rounded-full flex items-center justify-center">
                  <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                </div>
              </label>
            </div>
          </div>
          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Ulasan</label>
            <textarea v-model="formBerhenti.ulasan" required placeholder="Sebab terperinci..." class="w-full border border-gray-300 rounded-2xl p-4 text-sm h-24 resize-none outline-none focus:border-[#B3261E] bg-gray-50 focus:bg-white"></textarea>
          </div>
          <div class="flex justify-end gap-3 pt-3">
            <button type="button" @click="modalBerhenti.show = false" class="px-6 py-3 text-xs font-black text-[#B3261E] uppercase tracking-widest hover:bg-[#B3261E]/10 rounded-full transition-colors">Batal</button>
            <button type="submit" :disabled="loading || !formBerhenti.sebab_utama" class="px-8 py-3 bg-[#B3261E] text-white text-xs font-black uppercase tracking-widest rounded-full shadow-md active:scale-95 transition-all">Sahkan Berhenti</button>
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
const senaraiPTJ = ref([]);
const loading = ref(true);
const isUploading = ref(false);
const fileInput = ref(null);

const senaraiNegeri = ['Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Selangor', 'Terengganu', 'WP Kuala Lumpur', 'WP Labuan', 'WP Putrajaya'];
const senaraiSaiz = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];
const senaraiSebabBerhenti = ['Berhenti Kerja', 'Bersara (Pencen)', 'Bertukar Jabatan', 'Lain-lain'];

const modalEdit = ref({ show: false });
const modalBerhenti = ref({ show: false });

const form = ref({
  negeri_bertugas: '', saiz_baju: '', email: '', no_tel: '',
  nama_waris: '', hubungan_waris: 'Suami / Isteri', no_tel_waris: '', 
  no_acc_waris: '', bank_waris: '',
  pilihan_potongan: 'Tunai / Transfer',
  nama_ptj: '', 
  no_acc_bank: '', bank_ahli: '',
  kata_laluan_baru: '', sahkan_kata_laluan: '' 
});

const formBerhenti = ref({ sebab_utama: '', ulasan: '' });

const fetchSenaraiPTJ = async () => {
  try {
    const res = await api.get('/ahli/senarai-ptj');
    senaraiPTJ.value = res.data.data || [];
  } catch (error) {
    console.error("Gagal menarik senarai PTJ", error);
  }
};

const bukaModalEdit = () => {
  form.value = {
    negeri_bertugas: profil.value.negeri_bertugas || '',
    nama_ptj: profil.value.penempatan || profil.value.nama_ptj || '', 
    saiz_baju: profil.value.saiz_baju || '',
    email: profil.value.email || '',
    no_tel: profil.value.no_tel || '',
    nama_waris: profil.value.nama_waris || '',
    hubungan_waris: profil.value.hubungan_waris || 'Suami / Isteri',
    no_tel_waris: profil.value.no_tel_waris || '',
    no_acc_waris: profil.value.no_acc_waris || '',
    bank_waris: profil.value.bank_waris || '',
    pilihan_potongan: profil.value.pilihan_potongan || 'Tunai / Transfer',
    no_acc_bank: profil.value.no_acc_bank || '',
    bank_ahli: profil.value.bank_ahli || '',
    kata_laluan_baru: '',
    sahkan_kata_laluan: ''
  };
  modalEdit.value.show = true;
};

const fetchProfil = async () => {
  loading.value = true;
  try {
    const res = await api.get('/ahli/profil');
    profil.value = res.data.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
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

const hantarBorangDaftar = async () => {
  loading.value = true;
  try {
    // Kita hantar sebagai JSON biasa sebab dah tak perlukan FormData untuk resit
    const dataHantar = {
      negeri_bertugas: form.value.negeri_bertugas,
      saiz_baju: form.value.saiz_baju,
      email: form.value.email,
      no_tel: form.value.no_tel,
      nama_waris: form.value.nama_waris,
      hubungan_waris: form.value.hubungan_waris,
      no_tel_waris: form.value.no_tel_waris,
      no_acc_waris: form.value.no_acc_waris,
      bank_waris: form.value.bank_waris,
      pilihan_potongan: form.value.pilihan_potongan,
      no_acc_bank: form.value.no_acc_bank,
      bank_ahli: form.value.bank_ahli,
      nama_ptj: form.value.nama_ptj, 
      yuran_bulanan: yuranBulanan.value,
      klasifikasi_jawatan: (profil.value.gred_sspa || '').includes('JUSA') ? 'JUSA / PENGURUSAN TERTINGGI' : `KUMPULAN ${(profil.value.gred_sspa || '').charAt(0)}`,
      is_update_only: false 
    };

    await api.put('/ahli/kemaskini-profil', dataHantar);
    alert("Pendaftaran berjaya dihantar! Sila bayar yuran secara FPX di tab Yuran.");
    fetchProfil();
  } catch (error) {
    alert("Ralat pendaftaran.");
  } finally {
    loading.value = false;
  }
};

const hantarKemaskini = async () => {
  if (form.value.kata_laluan_baru) {
    if (form.value.kata_laluan_baru !== form.value.sahkan_kata_laluan) {
      alert("Kata laluan baru tidak sepadan. Sila semak semula.");
      return;
    }
  }

  loading.value = true;
  try {
    const dataHantar = {
      saiz_baju: form.value.saiz_baju,
      no_tel: form.value.no_tel,
      email: form.value.email,
      nama_ptj: form.value.nama_ptj, 
      negeri_bertugas: form.value.negeri_bertugas, 
      no_acc_bank: form.value.no_acc_bank, 
      bank_ahli: form.value.bank_ahli,
      nama_waris: form.value.nama_waris,
      hubungan_waris: form.value.hubungan_waris,
      no_tel_waris: form.value.no_tel_waris,
      no_acc_waris: form.value.no_acc_waris, 
      bank_waris: form.value.bank_waris, 
      yuran_bulanan: profil.value.yuran_bulanan,
      is_update_only: true
    };

    if (form.value.kata_laluan_baru) {
      dataHantar.kata_laluan = form.value.kata_laluan_baru;
    }

    await api.put('/ahli/kemaskini-profil', dataHantar); 
    modalEdit.value.show = false;
    alert("Profil berjaya dikemas kini.");
    
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

onMounted(() => {
  fetchProfil();
  fetchSenaraiPTJ();
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

.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #D1D5DB; }
</style>
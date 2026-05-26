import { createRouter, createWebHistory } from 'vue-router';

// ==========================================
// 1. IMPORT KOMPONEN 
// ==========================================
// Komponen Auth
const Login = () => import('../components/Login.vue');
const Register = () => import('../components/Register.vue');
const ForgotPassword = () => import('../components/ForgotPassword.vue');
const ResetPassword = () => import('../components/ResetPassword.vue');

// Komponen Dashboard Utama
const DashboardAhli = () => import('../views/ahli/Dashboard.vue');
const DashboardAJK = () => import('../views/ajk/Dashboard.vue');
const DashboardPengerusi = () => import('../views/pengerusi/Dashboard.vue');
const DashboardSuperAdmin = () => import('../views/superadmin/Dashboard.vue');

// Komponen Tab Ahli
const HomeAhli = () => import('../views/ahli/tabs/HomeAhli.vue');
const AktivitiAhli = () => import('../views/ahli/tabs/AktivitiAhli.vue');
const YuranAhli = () => import('../views/ahli/tabs/YuranAhli.vue');
const BantuanAhli = () => import('../views/ahli/tabs/BantuanAhli.vue');
const ProfilAhli = () => import('../views/ahli/tabs/ProfilAhli.vue');

// Komponen Tab Admin / AJK (Diselaraskan dengan nama fail anda)
const KelulusanAhli = () => import('../views/ajk/tabs/KelulusanAhli.vue'); // Tadi PengesahanAhli
const IndukStaff = () => import('../views/ajk/tabs/IndukStaff.vue'); // Tadi Staff
const PengurusanAhli = () => import('../views/ajk/tabs/PengurusanAhli.vue'); // Tadi DirektoriAhli
const LaporanTunggakan = () => import('../views/ajk/tabs/LaporanTunggakan.vue'); // Tadi LaporanYuran
const PengurusanSukan = () => import('../views/ajk/tabs/PengurusanSukan.vue'); // Tadi Pertandingan
const PermohonanBantuan = () => import('../views/ajk/tabs/PermohonanBantuan.vue'); // Tadi Kebajikan
const PermohonanBerhenti = () => import('../views/ajk/tabs/PermohonanBerhenti.vue'); 
const ProfilSaya = () => import('../views/ajk/tabs/ProfilSaya.vue'); // Tadi ProfilPentadbir
const SenaraiResit = () => import('../views/ajk/tabs/SenaraiResit.vue'); // Modul Kewangan FPX

// ==========================================
// 2. KONFIGURASI LALUAN (ROUTES)
// ==========================================
const routes = [
  { path: '/', redirect: '/login' },
  
  // --- Auth Routes ---
  { path: '/login', name: 'Login', component: Login, meta: { requiresGuest: true } },
  { path: '/register', name: 'Register', component: Register, meta: { requiresGuest: true } },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword, meta: { requiresGuest: true } },
  { path: '/reset-password/:token', name: 'ResetPassword', component: ResetPassword, meta: { requiresGuest: true } },
  
  // --- Dashboard Ahli ---
  { 
    path: '/ahli', 
    component: DashboardAhli, 
    meta: { requiresAuth: true, roleAllowed: ['Ahli', 'Admin', 'Pengerusi', 'Super Admin'] },
    children: [
      { path: '', redirect: '/ahli/home' },
      { path: 'home', name: 'AhliHome', component: HomeAhli },
      { path: 'aktiviti', name: 'AhliAktiviti', component: AktivitiAhli },
      { path: 'yuran', name: 'AhliYuran', component: YuranAhli },
      { path: 'bantuan', name: 'AhliBantuan', component: BantuanAhli },
      { path: 'profil', name: 'AhliProfil', component: ProfilAhli }
    ]
  },
  
  // --- Dashboard Admin / AJK ---
  {
    path: '/admin', 
    component: DashboardAJK,
    meta: { requiresAuth: true, roleAllowed: ['Admin', 'Super Admin'] }, 
    children: [
      { path: '', redirect: '/admin/pengesahan' }, // URL lalai
      
      // Senarai nested routes admin, "name" wajib sama dengan ID di Sidebar
      { path: 'pengesahan', name: 'pengesahan', component: KelulusanAhli },
      { path: 'staff', name: 'staff', component: IndukStaff },
      { path: 'ahli', name: 'ahli', component: PengurusanAhli },
      { path: 'laporan', name: 'laporan', component: LaporanTunggakan },
      { path: 'resit', name: 'SenaraiResit', component: SenaraiResit }, 
      { path: 'pertandingan', name: 'pertandingan', component: PengurusanSukan },
      { path: 'kebajikan', name: 'kebajikan', component: PermohonanBantuan },
      { path: 'berhenti', name: 'berhenti', component: PermohonanBerhenti },
      { path: 'profil', name: 'profil', component: ProfilSaya }
    ]
  },

  // --- Dashboard Lain ---
  { 
    path: '/pengerusi', 
    name: 'Pengerusi', 
    component: DashboardPengerusi, 
    meta: { requiresAuth: true, roleAllowed: ['Pengerusi', 'Super Admin'] } 
  },
  { 
    path: '/superadmin', 
    name: 'SuperAdmin', 
    component: DashboardSuperAdmin, 
    meta: { requiresAuth: true, roleAllowed: ['Super Admin'] } 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// ==========================================
// 3. FUNGSI SEMAKAN TOKEN (JWT)
// ==========================================
const isTokenValid = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = (payload.exp * 1000) < Date.now();
    
    if (isExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  } catch (e) {
    localStorage.clear();
    return false;
  }
};

// ==========================================
// 4. PENGAWAL NAVIGASI (NAVIGATION GUARDS)
// ==========================================
const getRoleDashboard = (role, isMobile) => {
  if (isMobile) return '/ahli/home';
  
  switch (role) {
    case 'Admin':
    case 'Super Admin': return '/admin';
    case 'Pengerusi': return '/pengerusi';
    case 'Ahli':
    default: return '/ahli/home';
  }
};

router.beforeEach((to, from, next) => {
  const loggedIn = isTokenValid();
  const userRole = localStorage.getItem('role'); 
  
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
  const roleAllowed = to.meta.roleAllowed || to.matched.find(r => r.meta.roleAllowed)?.meta.roleAllowed;

  const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (loggedIn && (requiresGuest || to.path === '/')) {
    return next(getRoleDashboard(userRole, isMobile));
  }

  if (requiresAuth && !loggedIn) {
    localStorage.clear();
    return next('/login'); 
  } 
  
  if (requiresAuth && roleAllowed && !roleAllowed.includes(userRole)) {
    return next(getRoleDashboard(userRole, isMobile));
  } 
  
  next(); 
});

export default router;
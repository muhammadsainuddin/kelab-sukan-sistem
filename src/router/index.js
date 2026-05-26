import { createRouter, createWebHistory } from 'vue-router';

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

// Komponen Tab Kanak-kanak Ahli (Child Tabs)
const HomeAhli = () => import('../views/ahli/tabs/HomeAhli.vue');
const AktivitiAhli = () => import('../views/ahli/tabs/AktivitiAhli.vue');
const YuranAhli = () => import('../views/ahli/tabs/YuranAhli.vue');
const BantuanAhli = () => import('../views/ahli/tabs/BantuanAhli.vue');
const ProfilAhli = () => import('../views/ahli/tabs/ProfilAhli.vue');

const routes = [
  { path: '/', redirect: '/login' },
  
  // Auth Routes
  { path: '/login', name: 'Login', component: Login, meta: { requiresGuest: true } },
  { path: '/register', name: 'Register', component: Register, meta: { requiresGuest: true } },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword, meta: { requiresGuest: true } },
  { path: '/reset-password/:token', name: 'ResetPassword', component: ResetPassword, meta: { requiresGuest: true } },
  
  // Dashboard Ahli Bersama Seni Bina Child Routes
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
  
  // Dashboard Peranan Lain
  { 
    path: '/ajk', 
    name: 'AJK', 
    component: DashboardAJK, 
    meta: { requiresAuth: true, roleAllowed: ['Admin', 'Super Admin'] } 
  },
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

// Semakan Validasi Token JWT
const isTokenValid = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = (payload.exp * 1000) < Date.now();
    
    if (isExpired) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('user');
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};

// Navigation Guard
router.beforeEach((to, from, next) => {
  const loggedIn = isTokenValid();
  const userRole = localStorage.getItem('role'); 
  
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
  const roleAllowed = to.meta.roleAllowed || to.matched.find(r => r.meta.roleAllowed)?.meta.roleAllowed;

  const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // 1. SITUASI: Sudah log masuk, cuba buka login/register atau path akar
  if (loggedIn && (requiresGuest || to.path === '/')) {
    if (isMobile) {
      return next('/ahli/home');
    }
    if (userRole === 'Admin' || userRole === 'Super Admin') return next('/ajk');
    if (userRole === 'Pengerusi') return next('/pengerusi');
    return next('/ahli/home');
  }

  // 2. SITUASI: Belum log masuk tapi cuba akses modul dalam
  if (requiresAuth && !loggedIn) {
    localStorage.clear();
    return next('/login'); 
  } 
  
  // 3. SITUASI: Halangan semakan peranan (Role Protection)
  if (requiresAuth && roleAllowed && !roleAllowed.includes(userRole)) {
    if (isMobile) return next('/ahli/home');
    
    if (userRole === 'Admin' || userRole === 'Super Admin') return next('/ajk');
    if (userRole === 'Pengerusi') return next('/pengerusi');
    return next('/ahli/home');
  } 
  
  next(); 
});

export default router;
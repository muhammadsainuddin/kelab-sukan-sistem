import { createRouter, createWebHistory } from 'vue-router';

// Komponen Auth
const Login = () => import('../components/Login.vue');
const Register = () => import('../components/Register.vue');
const ForgotPassword = () => import('../components/ForgotPassword.vue');
const ResetPassword = () => import('../components/ResetPassword.vue');

// Komponen Dashboard
const DashboardAhli = () => import('../views/ahli/Dashboard.vue');
const DashboardAJK = () => import('../views/ajk/Dashboard.vue');
const DashboardPengerusi = () => import('../views/pengerusi/Dashboard.vue');
const DashboardSuperAdmin = () => import('../views/superadmin/Dashboard.vue');

const routes = [
  { path: '/', redirect: '/login' },
  
  // Auth Routes (Tambah requiresGuest supaya user yang dah login tak boleh masuk)
  { path: '/login', name: 'Login', component: Login, meta: { requiresGuest: true } },
  { path: '/register', name: 'Register', component: Register, meta: { requiresGuest: true } },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword, meta: { requiresGuest: true } },
  { path: '/reset-password/:token', name: 'ResetPassword', component: ResetPassword, meta: { requiresGuest: true } },
  
  // Dashboard Routes
  { 
    path: '/ahli', 
    name: 'Ahli', 
    component: DashboardAhli, 
    meta: { requiresAuth: true, roleAllowed: ['Ahli', 'Admin', 'Pengerusi', 'Super Admin'] } 
  },
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

// FUNGSI SEMAKAN JWT (Menyemak adakah token sudah tamat tempoh)
const isTokenValid = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = (payload.exp * 1000) < Date.now();
    
    if (isExpired) {
      // Jika tamat tempoh, bersihkan storage secara automatik
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      return false;
    }
    return true;
  } catch (e) {
    return false; // Jika token rosak/invalid format
  }
};

// Pengawal Navigasi (Navigation Guard)
router.beforeEach((to, from, next) => {
  const loggedIn = isTokenValid();
  const userRole = localStorage.getItem('role'); 
  
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
  const roleAllowed = to.meta.roleAllowed;

  // 1. SITUASI: Sudah log masuk, tapi cuba buka page Login / Register
  if (loggedIn && (requiresGuest || to.path === '/')) {
    // Tendang terus ke dashboard masing-masing
    if (userRole === 'Admin' || userRole === 'Super Admin') return next('/ajk');
    if (userRole === 'Pengerusi') return next('/pengerusi');
    return next('/ahli'); // Default untuk Ahli
  }

  // 2. SITUASI: Cuba buka page dalam (requiresAuth) tapi belum login / token dah expired
  if (requiresAuth && !loggedIn) {
    localStorage.removeItem('token'); // Langkah berjaga-jaga bersihkan sisa data
    localStorage.removeItem('role');
    
    // Jangan tunjuk alert jika baru buka sistem pertama kali, 
    // tunjuk alert hanya jika mereka ditendang keluar
    if (localStorage.getItem('token')) {
        alert("Sesi keselamatan anda telah tamat. Sila log masuk semula.");
    }
    return next('/login'); 
  } 
  
  // 3. SITUASI: Cuba akses halaman yang bukan peranan dia (Contoh: Ahli cuba masuk /ajk)
  if (requiresAuth && roleAllowed && !roleAllowed.includes(userRole)) {
    console.warn(`Akses Ditolak: Peranan anda ialah ${userRole}, tetapi halaman ini perlukan ${roleAllowed}`);
    
    // Halakan semula ke tempat yang betul mengikut peranan dia
    if (userRole === 'Admin' || userRole === 'Super Admin') {
        return next('/ajk');
    } else if (userRole === 'Pengerusi') {
        return next('/pengerusi');
    } else if (userRole === 'Ahli') {
        return next('/ahli');
    } else {
        // Jika role rosak atau tidak sah
        localStorage.clear();
        return next('/login');
    }
  } 
  
  // 4. SITUASI: Semuanya mematuhi syarat, benarkan navigasi diteruskan
  next(); 
});

export default router;
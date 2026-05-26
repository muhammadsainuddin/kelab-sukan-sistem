/** Kongsi logik navigasi selepas log masuk / guard router */
export const isMobileDevice = () =>
  window.innerWidth <= 768 ||
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export const getRoleDashboard = (role, isMobile) => {
  if (isMobile) return '/ahli/home';

  switch (role) {
    case 'Admin':
    case 'Super Admin':
      return '/admin';
    case 'Pengerusi':
      return '/pengerusi';
    case 'Ahli':
    default:
      return '/ahli/home';
  }
};

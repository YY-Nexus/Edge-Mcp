export function getUserRole() {
  const token = localStorage.getItem('jwt-token');
  if (!token) return 'guest';
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.role;
}
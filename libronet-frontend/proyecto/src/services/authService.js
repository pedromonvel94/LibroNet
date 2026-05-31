// =============================================
// authService.js — Login y Registro
// =============================================

const BASE_URL = '/api/auth';

export async function login(correo, contrasena) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, contrasena }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Error ${res.status}: Credenciales incorrectas`);
  }
  return res.json();
}

export async function register(data) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/registro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Error ${res.status}: No se pudo completar el registro`);
  }
  return res.json();
}

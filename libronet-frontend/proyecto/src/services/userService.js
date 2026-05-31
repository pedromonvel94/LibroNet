// =============================================
// userService.js
// =============================================

const BASE_URL = '/api/users';

// Helper para obtener cabeceras con autenticación Bearer Token
function getHeaders(extraHeaders = {}) {
  const token = localStorage.getItem('token');
  return {
    ...extraHeaders,
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
}

// Obtiene todos los usuarios
export async function getAllUsers() {
  const res = await fetch(BASE_URL, {
    headers: getHeaders()
  });
  if (!res.ok) throw new Error(`Error ${res.status}: No se pudieron cargar los usuarios`);
  return res.json();
}

// Actualiza los datos del usuario (como rol o estado)
export async function updateUser(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Error ${res.status}: No se pudo actualizar el usuario`);
}

// Elimina lógicamente al usuario (pone su estado en INACTIVO)
export async function deleteUser(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (!res.ok) throw new Error(`Error ${res.status}: No se pudo eliminar el usuario`);
}

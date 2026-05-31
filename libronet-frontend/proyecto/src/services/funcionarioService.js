// =============================================
// funcionarioService.js — API calls
// =============================================

const BASE_URL = '/api/funcionarios';

// Helper para obtener las cabeceras incluyendo el token JWT de forma automática
function getHeaders(extraHeaders = {}) {
  const token = localStorage.getItem('token');
  return {
    ...extraHeaders,
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
}

export async function getFuncionarioById(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: getHeaders()
  });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Error ${res.status}: No se pudo obtener el funcionario`);
  }
  return res.json();
}

export async function getAllFuncionarios() {
  const res = await fetch(BASE_URL, {
    headers: getHeaders()
  });
  if (!res.ok) throw new Error(`Error ${res.status}: No se pudieron cargar los funcionarios`);
  return res.json();
}

export async function createFuncionario(data) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Error ${res.status}: No se pudo crear el funcionario`);
}

export async function updateFuncionario(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Error ${res.status}: No se pudo actualizar el funcionario`);
  return res.json();
}

export async function deleteFuncionario(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (!res.ok) throw new Error(`Error ${res.status}: No se pudo eliminar el funcionario`);
  return res.json();
}

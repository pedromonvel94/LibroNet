// =============================================
// funcionarioService.js — API calls
// Base URL apunta al proxy de Vite → Spring Boot
// =============================================

const BASE_URL = '/api/funcionarios';

/**
 * Obtener un funcionario por número de documento
 * @param {number} id
 * @returns {Promise<Object>}
 */
export async function getFuncionarioById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Error ${res.status}: No se pudo obtener el funcionario`);
  }
  return res.json();
}

/**
 * Obtener todos los funcionarios
 * @returns {Promise<Array>}
 */
export async function getAllFuncionarios() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error(`Error ${res.status}: No se pudieron cargar los funcionarios`);
  return res.json();
}

/**
 * Crear un nuevo funcionario
 * @param {Object} data - FuncionarioRequest
 * @returns {Promise<void>}
 */
export async function createFuncionario(data) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Error ${res.status}: No se pudo crear el funcionario`);
}

/**
 * Actualizar un funcionario existente
 * @param {number} id
 * @param {Object} data - FuncionarioRequest
 * @returns {Promise<boolean>}
 */
export async function updateFuncionario(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Error ${res.status}: No se pudo actualizar el funcionario`);
  return res.json();
}

/**
 * Eliminar un funcionario
 * @param {number} id
 * @returns {Promise<boolean>}
 */
export async function deleteFuncionario(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Error ${res.status}: No se pudo eliminar el funcionario`);
  return res.json();
}

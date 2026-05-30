// =============================================
// catalogoService.js
// =============================================

const BASE = '/api/catalogos';

async function fetchCatalog(url, fallback) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('no catalog endpoint');
    return res.json();
  } catch {
    return fallback;
  }
}

export function getEstadosCiviles() {
  return fetchCatalog(`${BASE}/estados-civiles`, [
    { id: 1, nombre: 'Soltero/a' },
    { id: 2, nombre: 'Casado/a' },
    { id: 3, nombre: 'Divorciado/a' },
    { id: 4, nombre: 'Viudo/a' },
    { id: 5, nombre: 'Unión libre' },
  ]);
}

export function getTiposDocumento() {
  return fetchCatalog(`${BASE}/tipos-documento`, [
    { id: 1, nombre: 'Cédula de Ciudadanía' },
    { id: 2, nombre: 'Cédula de Extranjería' },
    { id: 3, nombre: 'Pasaporte' },
    { id: 4, nombre: 'Tarjeta de Identidad' },
  ]);
}

export function getFormacionesAcademicas() {
  return fetchCatalog(`${BASE}/formaciones`, [
    { id: 1, nombre: 'Primaria' },
    { id: 2, nombre: 'Secundaria' },
    { id: 3, nombre: 'Técnico' },
    { id: 4, nombre: 'Tecnólogo' },
    { id: 5, nombre: 'Profesional' },
    { id: 6, nombre: 'Especialización' },
    { id: 7, nombre: 'Maestría' },
    { id: 8, nombre: 'Doctorado' },
  ]);
}

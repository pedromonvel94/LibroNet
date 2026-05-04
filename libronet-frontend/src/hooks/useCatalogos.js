// =============================================
// useCatalogos.js — Carga EstadoCivil, TipoDoc, Formacion
// =============================================

import { useState, useEffect } from 'react';
import {
  getEstadosCiviles,
  getTiposDocumento,
  getFormacionesAcademicas,
} from '../services/catalogoService';

export function useCatalogos() {
  const [catalogos, setCatalogos] = useState({
    estadosCiviles: [],
    tiposDocumento: [],
    formaciones: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    Promise.all([
      getEstadosCiviles(),
      getTiposDocumento(),
      getFormacionesAcademicas(),
    ])
      .then(([estadosCiviles, tiposDocumento, formaciones]) => {
        setCatalogos({ estadosCiviles, tiposDocumento, formaciones });
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { catalogos, loading, error };
}

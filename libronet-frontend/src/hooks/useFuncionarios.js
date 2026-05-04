// =============================================
// useFuncionarios.js — Custom Hook
// =============================================

import { useState, useEffect, useCallback } from 'react';
import { getAllFuncionarios, deleteFuncionario } from '../services/funcionarioService';

export function useFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllFuncionarios();
      setFuncionarios(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const remove = useCallback(async (id) => {
    await deleteFuncionario(id);
    setFuncionarios(prev => prev.filter(f => f.numeroDocumento !== id));
  }, []);

  return { funcionarios, loading, error, refetch: fetch, remove };
}

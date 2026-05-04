// =============================================
// useFuncionario.js — Custom Hook (single)
// =============================================

import { useState, useEffect } from 'react';
import { getFuncionarioById } from '../services/funcionarioService';

export function useFuncionario(id) {
  const [funcionario, setFuncionario] = useState(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getFuncionarioById(id)
      .then(data => {
        if (!data) setError('Funcionario no encontrado');
        else setFuncionario(data);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { funcionario, loading, error };
}

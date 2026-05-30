// =============================================
// useFuncionarios.js — Custom Hook (lista)
// =============================================

import { useState, useEffect } from 'react';
import { getAllFuncionarios } from '../services/funcionarioService';

export function useFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  useEffect(() => {
    setLoading(true);
    getAllFuncionarios()
      .then(data => setFuncionarios(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { funcionarios, setFuncionarios, loading, error };
}

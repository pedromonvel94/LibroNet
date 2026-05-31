// =============================================
// FuncionariosPage.jsx
// =============================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFuncionarios } from '../hooks/useFuncionarios';
import { deleteFuncionario } from '../services/funcionarioService';
import FuncionarioTable from '../components/FuncionarioTable';
import ConfirmDialog    from '../components/ConfirmDialog';
import './FuncionariosPage.css';

export default function FuncionariosPage() {
  const navigate = useNavigate();
  const { funcionarios, setFuncionarios, loading, error } = useFuncionarios();
  const [deleteId, setDeleteId] = useState(null);

  async function handleConfirmDelete() {
    try {
      await deleteFuncionario(deleteId);
      setFuncionarios(prev => prev.filter(f => f.numeroDocumento !== deleteId));
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleteId(null);
    }
  }

  return (
    <main className="page">
      <div className="page__header">
        <div>
          <h1 className="page__title">Funcionarios</h1>
          <p className="page__sub">Gestión del registro de funcionarios</p>
        </div>
        <button className="btn btn--primary" onClick={() => navigate('/funcionarios/nuevo')}>
          + Nuevo Funcionario
        </button>
      </div>

      {error && <div className="error-box">⚠️ {error}</div>}

      <FuncionarioTable
        funcionarios={funcionarios}
        loading={loading}
        onDelete={id => setDeleteId(id)}
      />

      {deleteId && (
        <ConfirmDialog
          title="Eliminar funcionario"
          message={`¿Estás seguro de que deseas eliminar el funcionario con documento ${deleteId}? Esta acción no se puede deshacer.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </main>
  );
}

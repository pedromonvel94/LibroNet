// =============================================
// FuncionariosPage.jsx — Lista completa
// =============================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFuncionarios } from '../hooks/useFuncionarios';
import FuncionarioTable from '../components/FuncionarioTable';
import ConfirmDialog from '../components/ConfirmDialog';
import './FuncionariosPage.css';

export default function FuncionariosPage() {
  const navigate = useNavigate();
  const { funcionarios, loading, error, remove } = useFuncionarios();

  const [pendingDelete, setPendingDelete] = useState(null); // id a confirmar

  async function handleConfirmDelete() {
    try {
      await remove(pendingDelete);
    } catch {
      alert('No se pudo eliminar el funcionario.');
    } finally {
      setPendingDelete(null);
    }
  }

  return (
    <main className="page">
      <div className="page__header">
        <div>
          <h1 className="page__title">Funcionarios</h1>
          <p className="page__sub">Directorio del personal registrado</p>
        </div>
        <button
          className="btn btn--primary"
          onClick={() => navigate('/funcionarios/nuevo')}
        >
          + Nuevo Funcionario
        </button>
      </div>

      {error ? (
        <div className="error-box">
          ⚠️ {error}
        </div>
      ) : (
        <FuncionarioTable
          funcionarios={funcionarios}
          loading={loading}
          onDelete={id => setPendingDelete(id)}
        />
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="¿Eliminar funcionario?"
          message={`Esta acción eliminará permanentemente el registro con documento ${pendingDelete}.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </main>
  );
}

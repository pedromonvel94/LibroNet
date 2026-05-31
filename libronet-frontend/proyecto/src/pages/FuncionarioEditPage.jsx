// =============================================
// FuncionarioEditPage.jsx
// =============================================

import { useParams } from 'react-router-dom';
import { useFuncionario } from '../hooks/useFuncionario';
import FuncionarioForm from '../components/FuncionarioForm';
import { Spinner } from '../components/Loader';
import './FuncionariosPage.css';

export default function FuncionarioEditPage() {
  const { id } = useParams();
  const { funcionario, loading, error } = useFuncionario(Number(id));

  return (
    <main className="page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div className="page__header">
        <div>
          <h1 className="page__title">Editar Funcionario</h1>
          <p className="page__sub">Modifica los datos del registro seleccionado</p>
        </div>
      </div>
      {loading && <Spinner label="Cargando datos..." />}
      {error   && <div className="error-box">⚠️ {error}</div>}
      {funcionario && <FuncionarioForm funcionario={funcionario} />}
    </main>
  );
}

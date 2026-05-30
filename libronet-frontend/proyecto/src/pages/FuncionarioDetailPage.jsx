// =============================================
// FuncionarioDetailPage.jsx
// =============================================

import { useParams } from 'react-router-dom';
import { useFuncionario } from '../hooks/useFuncionario';
import FuncionarioDetail from '../components/FuncionarioDetail';
import { Spinner } from '../components/Loader';
import './FuncionariosPage.css';

export default function FuncionarioDetailPage() {
  const { id } = useParams();
  const { funcionario, loading, error } = useFuncionario(Number(id));

  return (
    <main className="page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div className="page__header">
        <div>
          <h1 className="page__title">Detalle del Funcionario</h1>
          <p className="page__sub">Información completa del registro</p>
        </div>
      </div>
      {loading && <Spinner label="Cargando funcionario..." />}
      {error   && <div className="error-box">⚠️ {error}</div>}
      {funcionario && <FuncionarioDetail funcionario={funcionario} />}
    </main>
  );
}

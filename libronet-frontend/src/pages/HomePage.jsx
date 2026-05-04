// =============================================
// HomePage.jsx
// =============================================

import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <main className="home">
      <span className="home__tag">Sistema de Gestión RRHH</span>
      <h1 className="home__title">
        Bienvenido a<br /><span>Libronet</span>
      </h1>
      <p className="home__desc">
        Gestiona el personal de tu organización de forma eficiente.
        Consulta, crea y administra funcionarios, su grupo familiar y
        formación académica desde un solo lugar.
      </p>
      <div className="home__cta">
        <button
          className="btn btn--primary"
          onClick={() => navigate('/funcionarios')}
        >
          Ver Funcionarios
        </button>
        <button
          className="btn btn--secondary"
          onClick={() => navigate('/funcionarios/nuevo')}
        >
          + Nuevo Funcionario
        </button>
      </div>
      <div className="home__stats">
        <div className="home__stat">
          <div className="home__stat-value">∞</div>
          <div className="home__stat-label">Registros</div>
        </div>
        <div className="home__stat">
          <div className="home__stat-value">CRUD</div>
          <div className="home__stat-label">Operaciones</div>
        </div>
        <div className="home__stat">
          <div className="home__stat-value">REST</div>
          <div className="home__stat-label">API</div>
        </div>
      </div>
    </main>
  );
}

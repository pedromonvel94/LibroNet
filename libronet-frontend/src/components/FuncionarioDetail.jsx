// =============================================
// FuncionarioDetail.jsx
// =============================================

import { useNavigate } from 'react-router-dom';
import Badge from './Badge';
import './FuncionarioDetail.css';

function initials(name = '') {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

export default function FuncionarioDetail({ funcionario }) {
  const navigate = useNavigate();
  const f = funcionario;

  return (
    <div className="detail-card">
      {/* Hero */}
      <div className="detail-hero">
        <div className="detail-avatar">{initials(f.nombreCompleto)}</div>
        <div className="detail-hero__info">
          <h2>{f.nombreCompleto}</h2>
          <p className="detail-hero__doc">
            <Badge variant="blue">{f.tipoDocumento ?? 'Doc'}</Badge>
            &nbsp; {f.numeroDocumento}
          </p>
        </div>
      </div>

      <div className="detail-body">
        {/* Información general */}
        <div className="detail-section">
          <p className="detail-section__title">Información General</p>
          <div className="detail-grid">
            <div className="detail-field">
              <span className="detail-field__label">Fecha de Ingreso</span>
              <span className="detail-field__value">{formatDate(f.fechaIngreso)}</span>
            </div>
            <div className="detail-field">
              <span className="detail-field__label">Estado Civil</span>
              <span className="detail-field__value">
                {f.estadoCivil
                  ? <Badge variant="purple">{f.estadoCivil}</Badge>
                  : '—'}
              </span>
            </div>
            <div className="detail-field">
              <span className="detail-field__label">Formación Académica</span>
              <span className="detail-field__value">
                {f.formacionAcademica
                  ? <Badge variant="green">{f.formacionAcademica}</Badge>
                  : '—'}
              </span>
            </div>
          </div>
        </div>

        {/* Grupo Familiar */}
        <div className="detail-section">
          <p className="detail-section__title">Grupo Familiar</p>
          {f.grupoFamiliar?.length > 0 ? (
            <div className="familiar-list">
              {f.grupoFamiliar.map((gf, i) => (
                <div key={i} className="familiar-item">
                  <span className="familiar-item__name">{gf.nombreFamiliar}</span>
                  <Badge variant="default">{gf.parentesco}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="familiar-empty">Sin grupo familiar registrado.</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="detail-actions">
        <button
          className="btn btn--primary"
          onClick={() => navigate(`/funcionarios/${f.numeroDocumento}/editar`)}
        >
          ✏️ Editar
        </button>
        <button
          className="btn btn--secondary"
          onClick={() => navigate('/funcionarios')}
        >
          ← Volver
        </button>
      </div>
    </div>
  );
}

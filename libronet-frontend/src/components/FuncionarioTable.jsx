// =============================================
// FuncionarioTable.jsx
// =============================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from './Badge';
import { TableSkeleton } from './Loader';
import './FuncionarioTable.css';

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

export default function FuncionarioTable({ funcionarios, loading, onDelete }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = funcionarios.filter(f =>
    f.nombreCompleto?.toLowerCase().includes(search.toLowerCase()) ||
    String(f.numeroDocumento).includes(search)
  );

  return (
    <div className="table-card">
      <div className="table-card__header">
        <span className="table-card__title">Funcionarios</span>
        <span className="table-card__count">{funcionarios.length} registros</span>
      </div>

      <div className="table-search">
        <input
          className="table-search__input"
          type="text"
          placeholder="Buscar por nombre o documento..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="table-wrap">
        {loading ? (
          <div style={{ padding: '0 var(--space-xl)' }}>
            <TableSkeleton rows={6} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="table-empty">
            <span className="table-empty__icon">📋</span>
            {search ? 'Sin resultados para la búsqueda.' : 'No hay funcionarios registrados.'}
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>N° Documento</th>
                <th>Tipo Doc</th>
                <th>Nombre Completo</th>
                <th>Fecha Ingreso</th>
                <th>Estado Civil</th>
                <th>Formación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((f, idx) => (
                <tr key={f.numeroDocumento} style={{ animationDelay: `${idx * 40}ms` }}>
                  <td className="td-doc">{f.numeroDocumento}</td>
                  <td>
                    <Badge variant="blue">{f.tipoDocumento ?? '—'}</Badge>
                  </td>
                  <td className="td-name">{f.nombreCompleto}</td>
                  <td className="td-date">{formatDate(f.fechaIngreso)}</td>
                  <td>
                    <Badge variant="purple">{f.estadoCivil ?? '—'}</Badge>
                  </td>
                  <td>
                    <Badge variant="green">{f.formacionAcademica ?? '—'}</Badge>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn-icon"
                        title="Ver detalle"
                        onClick={() => navigate(`/funcionarios/${f.numeroDocumento}`)}
                      >
                        👁
                      </button>
                      <button
                        className="btn-icon"
                        title="Editar"
                        onClick={() => navigate(`/funcionarios/${f.numeroDocumento}/editar`)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-icon btn-icon--danger"
                        title="Eliminar"
                        onClick={() => onDelete(f.numeroDocumento)}
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

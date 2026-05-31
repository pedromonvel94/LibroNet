// =============================================
// Loader.jsx
// =============================================

import './Loader.css';

export function Spinner({ label = 'Cargando...' }) {
  return (
    <div className="loader-wrap">
      <div className="loader__ring" />
      <span>{label}</span>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton skeleton-row" />
      ))}
    </>
  );
}

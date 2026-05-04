// =============================================
// ConfirmDialog.jsx
// =============================================

import './ConfirmDialog.css';

export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div className="dialog-box" onClick={e => e.stopPropagation()}>
        <span className="dialog-box__icon">⚠️</span>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="dialog-actions">
          <button className="btn btn--secondary" onClick={onCancel}>Cancelar</button>
          <button className="btn btn--danger"    onClick={onConfirm}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}

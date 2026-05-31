// =============================================
// RegisterPage.jsx
// =============================================

import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { register } from '../services/authService';
import './AuthPage.css';

const ROLES = [
  { value: 'ADMINISTRADOR', label: 'Administrador' },
  { value: 'RRHH',          label: 'RRHH'          },
];

function validate(values) {
  const e = {};
  if (!values.nombreCompleto.trim()) e.nombreCompleto = 'El nombre es requerido';
  if (!values.correo.trim())         e.correo         = 'El correo es requerido';
  else if (!/\S+@\S+\.\S+/.test(values.correo)) e.correo = 'Correo inválido';
  if (!values.contrasena)            e.contrasena     = 'La contraseña es requerida';
  else if (values.contrasena.length < 6) e.contrasena = 'Mínimo 6 caracteres';
  if (!values.rol)                   e.rol            = 'Selecciona un rol';
  return e;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ nombreCompleto: '', correo: '', contrasena: '', rol: '' });
  const [errors,  setErrors]  = useState({});
  const [status,  setStatus]  = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(values);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    setStatus(null);
    try {
      await register(values);
      setStatus('success');
      setMessage('¡Cuenta creada! Redirigiendo al inicio de sesión...');
      setTimeout(() => navigate('/login'), 1400);
    } catch (err) {
      setStatus('error');
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-card__brand">
          <div className="auth-card__logo">LN</div>
          <span className="auth-card__app">Libronet</span>
        </div>

        <h1 className="auth-card__title">Crear cuenta</h1>
        <p className="auth-card__sub">Completa los datos para registrarte</p>

        {status && (
          <div className={`form-alert form-alert--${status}`}>
            {status === 'success' ? '✓' : '⚠'} {message}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="auth-form">
          <div className="form-field">
            <label htmlFor="nombreCompleto">Nombre completo</label>
            <input
              id="nombreCompleto" name="nombreCompleto" type="text"
              placeholder="Ej: María García López"
              value={values.nombreCompleto} onChange={handleChange}
              className={errors.nombreCompleto ? 'error' : ''}
              autoComplete="name"
            />
            {errors.nombreCompleto && <span className="form-field__error">{errors.nombreCompleto}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              id="correo" name="correo" type="email"
              placeholder="ejemplo@correo.com"
              value={values.correo} onChange={handleChange}
              className={errors.correo ? 'error' : ''}
              autoComplete="email"
            />
            {errors.correo && <span className="form-field__error">{errors.correo}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              id="contrasena" name="contrasena" type="password"
              placeholder="Mínimo 6 caracteres"
              value={values.contrasena} onChange={handleChange}
              className={errors.contrasena ? 'error' : ''}
              autoComplete="new-password"
            />
            {errors.contrasena && <span className="form-field__error">{errors.contrasena}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="rol">Rol</label>
            <select
              id="rol" name="rol"
              value={values.rol} onChange={handleChange}
              className={errors.rol ? 'error' : ''}
            >
              <option value="">-- Seleccionar rol --</option>
              {ROLES.map(r => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
            {errors.rol && <span className="form-field__error">{errors.rol}</span>}
          </div>

          <button type="submit" className="btn btn--primary auth-submit" disabled={loading}>
            {loading ? 'Registrando…' : 'Crear cuenta'}
          </button>
        </form>

        <p className="auth-card__footer">
          ¿Ya tienes cuenta?{' '}
          <NavLink to="/login" className="auth-link">Inicia sesión</NavLink>
        </p>
      </div>
    </main>
  );
}

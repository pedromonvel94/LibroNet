// =============================================
// LoginPage.jsx
// =============================================

import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { login } from '../services/authService';
import './AuthPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ correo: '', contrasena: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  function validate() {
    const e = {};
    if (!values.correo.trim())     e.correo     = 'El correo es requerido';
    else if (!/\S+@\S+\.\S+/.test(values.correo)) e.correo = 'Correo inválido';
    if (!values.contrasena)        e.contrasena = 'La contraseña es requerida';
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    setStatus(null);
    try {
      const data = await login(values.correo, values.contrasena);
      if (data.token) localStorage.setItem('token', data.token);
      setStatus('success');
      setMessage('¡Bienvenido! Redirigiendo...');
      setTimeout(() => navigate('/funcionarios'), 1200);
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

        <h1 className="auth-card__title">Iniciar sesión</h1>
        <p className="auth-card__sub">Ingresa tus credenciales para continuar</p>

        {status && (
          <div className={`form-alert form-alert--${status}`}>
            {status === 'success' ? '✓' : '⚠'} {message}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="auth-form">
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
              placeholder="••••••••"
              value={values.contrasena} onChange={handleChange}
              className={errors.contrasena ? 'error' : ''}
              autoComplete="current-password"
            />
            {errors.contrasena && <span className="form-field__error">{errors.contrasena}</span>}
          </div>

          <button type="submit" className="btn btn--primary auth-submit" disabled={loading}>
            {loading ? 'Verificando…' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="auth-card__footer">
          ¿No tienes cuenta?{' '}
          <NavLink to="/registro" className="auth-link">Regístrate aquí</NavLink>
        </p>
      </div>
    </main>
  );
}

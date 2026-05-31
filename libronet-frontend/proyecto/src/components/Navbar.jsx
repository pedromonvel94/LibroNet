// =============================================
// Navbar.jsx
// =============================================

import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__brand">
        <div className="navbar__logo">LN</div>
        <span className="navbar__name">Libro<span>net</span></span>
      </NavLink>

      <div className="navbar__nav">
        <button
          className="btn btn--secondary navbar__btn"
          onClick={() => navigate('/login')}
        >
          Iniciar sesión
        </button>
        <button
          className="btn btn--primary navbar__btn"
          onClick={() => navigate('/registro')}
        >
          Registro
        </button>
      </div>
    </nav>
  );
}

// =============================================
// Navbar.jsx
// =============================================

import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <div className="navbar__logo">LN</div>
        <span className="navbar__name">Libro<span>net</span></span>
      </div>
      <div className="navbar__nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
        >
          Inicio
        </NavLink>
        <NavLink
          to="/funcionarios"
          className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
        >
          Funcionarios
        </NavLink>
        <NavLink
          to="/funcionarios/nuevo"
          className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
        >
          + Nuevo
        </NavLink>
      </div>
    </nav>
  );
}

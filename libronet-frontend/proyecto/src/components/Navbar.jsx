import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Obliga a re-renderizar el Navbar cada vez que cambia la ruta

  const token = localStorage.getItem('token');
  const nombre = localStorage.getItem('nombre');
  const rol = localStorage.getItem('rol');

  // Función para cerrar la sesión limpiando el almacenamiento
  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('rol');
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__brand">
        <div className="navbar__logo">LN</div>
        <span className="navbar__name">Libro<span>net</span></span>
      </NavLink>

      <div className="navbar__nav">
        {token ? (
          <>
            {/* Saludo amigable con el nombre del usuario logueado */}
            <span className="navbar__user-greeting">Hola, {nombre}</span>

            {/* Todo usuario autenticado puede ver la lista de Funcionarios */}
            <NavLink to="/funcionarios" className="navbar__link">Funcionarios</NavLink>

            {/* Solo los administradores pueden ver la gestión de usuarios y registrar nuevos */}
            {rol === 'ADMIN' && (
              <>
                <NavLink to="/usuarios" className="navbar__link">Usuarios</NavLink>
                <NavLink to="/registro" className="navbar__link">Registro</NavLink>
              </>
            )}

            <button className="btn btn--secondary navbar__btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            {/* Si no está autenticado, solo mostramos el botón para Iniciar sesión */}
            <button
              className="btn btn--secondary navbar__btn"
              onClick={() => navigate('/login')}
            >
              Iniciar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}


import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAllUsers, updateUser, deleteUser } from '../services/userService';
import ConfirmDialog from '../components/ConfirmDialog';
import Badge from '../components/Badge';
import { TableSkeleton } from '../components/Loader';
import './FuncionariosPage.css'; // Reutilizamos los estilos del listado de funcionarios

export default function UsersPage() {
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  // Si no está autenticado o no es ADMIN, redirigimos a la página de inicio
  if (!token || rol !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  // Estados para controlar la edición en línea (Inline Editing)
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ nombre: '', correo: '', rol: '', estado: '' });

  // Estado para la confirmación de la desactivación del usuario
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  // Carga todos los usuarios desde el backend
  async function loadUsers() {
    try {
      setLoading(true);
      setError('');
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message || 'Ocurrió un error al cargar los usuarios.');
    } finally {
      setLoading(false);
    }
  }

  // Prepara los campos del formulario en línea con los datos del usuario seleccionado
  function handleStartEdit(u) {
    setEditingId(u.id);
    setEditForm({
      nombre: u.nombre,
      correo: u.correo,
      rol: u.rol,
      estado: u.estado
    });
  }

  // Guarda las modificaciones del usuario (como rol o estado)
  async function handleSaveEdit(id) {
    try {
      await updateUser(id, editForm);
      setUsers(prev => prev.map(u => u.id === id ? { ...u, ...editForm } : u));
      setEditingId(null);
    } catch (err) {
      alert(err.message || 'No se pudo actualizar el usuario.');
    }
  }

  // Elimina lógicamente al usuario marcándolo como INACTIVO
  async function handleConfirmDelete() {
    try {
      await deleteUser(deleteId);
      setUsers(prev => prev.map(u => u.id === deleteId ? { ...u, estado: 'INACTIVO' } : u));
    } catch (err) {
      alert(err.message || 'No se pudo desactivar el usuario.');
    } finally {
      setDeleteId(null);
    }
  }

  const filtered = users.filter(u =>
    u.nombre?.toLowerCase().includes(search.toLowerCase()) ||
    u.correo?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="page">
      <div className="page__header">
        <div>
          <h1 className="page__title">Gestión de Usuarios</h1>
          <p className="page__sub">Administración de credenciales, roles y accesos del sistema</p>
        </div>
      </div>

      {error && <div className="error-box">⚠️ {error}</div>}

      <div className="table-card">
        <div className="table-card__header">
          <span className="table-card__title">Usuarios Registrados</span>
          <span className="table-card__count">{users.length} registros</span>
        </div>

        <div className="table-search">
          <input
            className="table-search__input"
            type="text"
            placeholder="Buscar por nombre o correo electrónico..."
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
              <span className="table-empty__icon">👥</span>
              {search ? 'Sin resultados para la búsqueda.' : 'No hay usuarios registrados.'}
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Nombre completo</th>
                  <th>Correo electrónico</th>
                  <th>Rol administrativo</th>
                  <th>Estado de cuenta</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, idx) => {
                  const isEditing = editingId === u.id;
                  return (
                    <tr key={u.id} style={{ animationDelay: `${idx * 40}ms` }}>
                      <td>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.nombre}
                            onChange={e => setEditForm({ ...editForm, nombre: e.target.value })}
                            style={{
                              padding: '6px',
                              width: '90%',
                              borderRadius: '4px',
                              border: '1px solid var(--color-border)',
                              background: 'var(--color-surface)',
                              color: 'var(--color-text)',
                              fontFamily: 'inherit'
                            }}
                          />
                        ) : (
                          u.nombre
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            type="email"
                            value={editForm.correo}
                            onChange={e => setEditForm({ ...editForm, correo: e.target.value })}
                            style={{
                              padding: '6px',
                              width: '90%',
                              borderRadius: '4px',
                              border: '1px solid var(--color-border)',
                              background: 'var(--color-surface)',
                              color: 'var(--color-text)',
                              fontFamily: 'inherit'
                            }}
                          />
                        ) : (
                          u.correo
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <select
                            value={editForm.rol}
                            onChange={e => setEditForm({ ...editForm, rol: e.target.value })}
                            style={{
                              padding: '6px',
                              borderRadius: '4px',
                              border: '1px solid var(--color-border)',
                              background: 'var(--color-surface)',
                              color: 'var(--color-text)',
                              fontFamily: 'inherit'
                            }}
                          >
                            <option value="ADMIN">ADMIN</option>
                            <option value="RRHH">RRHH</option>
                          </select>
                        ) : (
                          <Badge variant={u.rol === 'ADMIN' ? 'blue' : 'purple'}>{u.rol}</Badge>
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <select
                            value={editForm.estado}
                            onChange={e => setEditForm({ ...editForm, estado: e.target.value })}
                            style={{
                              padding: '6px',
                              borderRadius: '4px',
                              border: '1px solid var(--color-border)',
                              background: 'var(--color-surface)',
                              color: 'var(--color-text)',
                              fontFamily: 'inherit'
                            }}
                          >
                            <option value="ACTIVO">ACTIVO</option>
                            <option value="INACTIVO">INACTIVO</option>
                          </select>
                        ) : (
                          <Badge variant={u.estado === 'ACTIVO' ? 'green' : 'red'}>{u.estado}</Badge>
                        )}
                      </td>
                      <td>
                        <div className="table-actions">
                          {isEditing ? (
                            <>
                              <button className="btn-icon" title="Guardar cambios" onClick={() => handleSaveEdit(u.id)}>💾</button>
                              <button className="btn-icon" title="Cancelar" onClick={() => setEditingId(null)}>❌</button>
                            </>
                          ) : (
                            <>
                              <button className="btn-icon" title="Editar atributos" onClick={() => handleStartEdit(u)}>✏️</button>
                              <button
                                className="btn-icon btn-icon--danger"
                                title="Desactivar usuario"
                                onClick={() => setDeleteId(u.id)}
                                disabled={u.estado === 'INACTIVO'}
                              >
                                🗑
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {deleteId && (
        <ConfirmDialog
          title="Desactivar usuario"
          message="¿Estás seguro de que deseas desactivar este usuario? No podrá volver a iniciar sesión hasta que un administrador lo active de nuevo."
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </main>
  );
}

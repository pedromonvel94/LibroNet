// =============================================
// FuncionarioCreatePage.jsx
// =============================================

import FuncionarioForm from '../components/FuncionarioForm';
import './FuncionariosPage.css';

export default function FuncionarioCreatePage() {
  return (
    <main className="page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div className="page__header">
        <div>
          <h1 className="page__title">Nuevo Funcionario</h1>
          <p className="page__sub">Completa el formulario para agregar un registro</p>
        </div>
      </div>
      <FuncionarioForm />
    </main>
  );
}

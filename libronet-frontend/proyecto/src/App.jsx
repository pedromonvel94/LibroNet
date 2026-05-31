// =============================================
// App.jsx — Router
// =============================================

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar                from './components/Navbar';
import HomePage              from './pages/HomePage';
import LoginPage             from './pages/LoginPage';
import RegisterPage          from './pages/RegisterPage';
import FuncionariosPage      from './pages/FuncionariosPage';
import FuncionarioDetailPage from './pages/FuncionarioDetailPage';
import FuncionarioCreatePage from './pages/FuncionarioCreatePage';
import FuncionarioEditPage   from './pages/FuncionarioEditPage';
import UsersPage             from './pages/UsersPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"         element={<HomePage />} />
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />

        <Route path="/funcionarios"            element={<FuncionariosPage />} />
        <Route path="/funcionarios/nuevo"      element={<FuncionarioCreatePage />} />
        <Route path="/funcionarios/:id"        element={<FuncionarioDetailPage />} />
        <Route path="/funcionarios/:id/editar" element={<FuncionarioEditPage />} />
        <Route path="/usuarios"                element={<UsersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

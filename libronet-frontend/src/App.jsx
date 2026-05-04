// =============================================
// App.jsx — Router
// =============================================

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage              from './pages/HomePage';
import FuncionariosPage      from './pages/FuncionariosPage';
import FuncionarioDetailPage from './pages/FuncionarioDetailPage';
import FuncionarioCreatePage from './pages/FuncionarioCreatePage';
import FuncionarioEditPage   from './pages/FuncionarioEditPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"                                   element={<HomePage />} />
        <Route path="/funcionarios"                       element={<FuncionariosPage />} />
        <Route path="/funcionarios/nuevo"                 element={<FuncionarioCreatePage />} />
        <Route path="/funcionarios/:id"                   element={<FuncionarioDetailPage />} />
        <Route path="/funcionarios/:id/editar"            element={<FuncionarioEditPage />} />
      </Routes>
    </BrowserRouter>
  );
}

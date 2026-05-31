// =============================================
// HomePage.jsx
// =============================================

import './HomePage.css';

export default function HomePage() {
  return (
    <main className="home-page">
      <div className="home-hero">
        <div className="home-hero__badge">Sistema de Gestión</div>
        <h1 className="home-hero__title">
          Gestiona tu equipo<br />
          <span>con Libronet</span>
        </h1>
        <p className="home-hero__sub">
          Plataforma centralizada para administrar la información de funcionarios,
          documentos y grupos familiares de tu organización.
        </p>
      </div>
    </main>
  );
}

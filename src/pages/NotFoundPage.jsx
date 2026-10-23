import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <span className="not-found-code">404</span>
        <h1>Página no encontrada</h1>
        <p>La ruta que intentas abrir no existe en Sonido Vivo.</p>
        <Link to="/" className="btn-primary">Volver al inicio</Link>
      </div>
    </main>
  );
}

export default NotFoundPage;

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Seccion from '../components/Seccion';
import { useAuth } from '../context/AuthContext';
import { itemsMenu } from '../data/menu';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(username, password);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate(result.user.role === 'admin' ? '/admin/clientes' : '/mi-cuenta', { replace: true });
  };

  return (
    <>
      <Header itemsMenu={itemsMenu} />
      <main>
        <Seccion clase="catalog-header">
          <h1>Iniciar sesión</h1>
          <p>Accede a tu cuenta de Sonido Vivo.</p>
        </Seccion>
        <Seccion clase="catalog-container">
          <form onSubmit={handleSubmit} className="card border-secondary p-4 bg-dark text-light mx-auto" style={{ maxWidth: '480px' }}>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label className="form-label" htmlFor="username">Usuario o correo</label>
              <input id="username" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="password">Contraseña</label>
              <input id="password" type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </div>

            <button type="submit" className="btn btn-primary">Entrar</button>

            <div className="mt-3 text-secondary">
              <small>Administrador: <strong>admin</strong> / <strong>admin123</strong></small><br />
              <small>Cliente demo: <strong>cliente</strong> / <strong>cliente123</strong></small>
            </div>

            <p className="mt-3 mb-0">¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
          </form>
        </Seccion>
      </main>
      <Footer />
    </>
  );
}

export default Login;

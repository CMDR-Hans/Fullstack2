import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Seccion from '../components/Seccion';
import BookService from '../service/BookService';
import { useAuth } from '../context/AuthContext';
import { itemsMenu } from '../data/menu';

function Registro() {
  const [form, setForm] = useState({ primerNombre: '', primerApellido: '', email: '', telefono: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await BookService.createCliente({
        primerNombre: form.primerNombre.trim(),
        primerApellido: form.primerApellido.trim(),
        segundoNombre: null,
        segundoApellido: null,
        emails: [form.email.trim()],
        telefonos: form.telefono.trim() ? [form.telefono.trim()] : [],
      });

      const result = register({
        username: form.email,
        password: form.password,
        nombre: `${form.primerNombre.trim()} ${form.primerApellido.trim()}`,
      });

      if (!result.ok) {
        setError(result.message);
        return;
      }

      navigate('/mi-cuenta', { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || 'No se pudo completar el registro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header itemsMenu={itemsMenu} />
      <main>
        <Seccion clase="catalog-header">
          <h1>Crear cuenta</h1>
          <p>Regístrate para identificarte como cliente en Sonido Vivo.</p>
        </Seccion>
        <Seccion clase="catalog-container">
          <form onSubmit={handleSubmit} className="card border-secondary p-4 bg-dark text-light mx-auto" style={{ maxWidth: '620px' }}>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label" htmlFor="primerNombre">Nombre</label>
                <input id="primerNombre" name="primerNombre" className="form-control" value={form.primerNombre} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="primerApellido">Apellido</label>
                <input id="primerApellido" name="primerApellido" className="form-control" value={form.primerApellido} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="email">Correo</label>
                <input id="email" name="email" type="email" className="form-control" value={form.email} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="telefono">Teléfono</label>
                <input id="telefono" name="telefono" type="tel" className="form-control" value={form.telefono} onChange={handleChange} placeholder="Ej: 9 6123 4567" />
              </div>
              <div className="col-12">
                <label className="form-label" htmlFor="password">Contraseña</label>
                <input id="password" name="password" type="password" minLength="6" className="form-control" value={form.password} onChange={handleChange} required />
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-4" disabled={loading}>{loading ? 'Registrando...' : 'Crear cuenta'}</button>
            <p className="mt-3 mb-0">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
          </form>
        </Seccion>
      </main>
      <Footer />
    </>
  );
}

export default Registro;

import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BookService from '../service/BookService';

const initialForm = { nombre: '', precio: '', stock: '', descripcion: '', imagen: 'fender' };

function FormularioProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    let active = true;
    BookService.getProductoById(id)
      .then(({ data }) => active && setForm({
        nombre: data.nombre || '',
        precio: data.precio ?? '',
        stock: data.stock ?? '',
        descripcion: data.descripcion || '',
        imagen: data.imagen || 'fender',
      }))
      .catch((err) => active && setError(err?.response?.data?.message || 'No se pudo cargar el producto.'))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [id]);

  const handleChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const payload = {
      nombre: form.nombre.trim(),
      precio: Number(form.precio),
      stock: Number(form.stock),
      descripcion: form.descripcion.trim() || null,
      imagen: form.imagen,
    };

    try {
      if (id) await BookService.updateProducto(id, payload);
      else await BookService.createProducto(payload);
      navigate('/admin/productos', { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || 'No se pudo guardar el producto.');
    }
  };

  if (loading) return <p className="text-muted">Cargando producto...</p>;

  return (
    <>
      <h1>{id ? 'Editar producto' : 'Nuevo producto'}</h1>
      <Link to="/admin/productos" className="btn btn-secondary mt-3">Volver</Link>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      <form onSubmit={handleSubmit} className="card border-secondary p-4 bg-dark text-light mt-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label" htmlFor="nombre">Nombre</label>
            <input id="nombre" name="nombre" className="form-control" value={form.nombre} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="precio">Precio CLP</label>
            <input id="precio" name="precio" type="number" min="1" className="form-control" value={form.precio} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="stock">Stock</label>
            <input id="stock" name="stock" type="number" min="0" className="form-control" value={form.stock} onChange={handleChange} required />
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="descripcion">Descripción</label>
            <textarea id="descripcion" name="descripcion" rows="3" className="form-control" value={form.descripcion} onChange={handleChange} />
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="imagen">Imagen del catálogo</label>
            <select id="imagen" name="imagen" className="form-select" value={form.imagen} onChange={handleChange}>
              <option value="fender">Fender</option>
              <option value="bajo">Bajo</option>
              <option value="bateria">Batería</option>
              <option value="roland">Roland</option>
              <option value="marshall">Marshall</option>
              <option value="microfono">Micrófono</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-4">{id ? 'Actualizar producto' : 'Guardar producto'}</button>
      </form>
    </>
  );
}

export default FormularioProducto;

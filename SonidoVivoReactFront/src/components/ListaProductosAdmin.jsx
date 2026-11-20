import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookService from '../service/BookService';

function ListaProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    BookService.getAllProductos()
      .then(({ data }) => active && setProductos(Array.isArray(data) ? data : []))
      .catch((err) => active && setError(err?.response?.data?.message || 'No se pudo cargar el catálogo.'))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const eliminar = async (producto) => {
    if (!window.confirm(`¿Eliminar ${producto.nombre}?`)) return;
    try {
      await BookService.deleteProducto(producto.id);
      setProductos((actual) => actual.filter((item) => item.id !== producto.id));
    } catch (err) {
      setError(err?.response?.data?.message || 'No se pudo eliminar el producto.');
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
        <h1>Productos</h1>
        <Link to="/admin/productos/nuevo" className="btn btn-primary">Nuevo producto</Link>
      </div>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {loading ? <p className="mt-4 text-muted">Cargando productos...</p> : (
        <div className="table-responsive mt-4">
          <table className="table table-dark table-striped align-middle">
            <thead><tr><th>Nombre</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr></thead>
            <tbody>{productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>${Number(producto.precio).toLocaleString('es-CL')} CLP</td>
                <td>{producto.stock}</td>
                <td className="d-flex gap-2">
                  <Link to={`/admin/productos/${producto.id}/editar`} className="btn btn-sm btn-outline-light">Editar</Link>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => eliminar(producto)}>Eliminar</button>
                </td>
              </tr>
            ))}</tbody>
          </table>
          {!productos.length && <div className="alert alert-secondary">No hay productos registrados.</div>}
        </div>
      )}
    </>
  );
}

export default ListaProductosAdmin;

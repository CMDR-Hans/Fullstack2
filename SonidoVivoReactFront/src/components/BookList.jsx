import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookService from '../service/BookService';

const getApiError = (error, fallback) => {
  const message = error?.response?.data?.message;
  const details = error?.response?.data?.details;

  if (details && typeof details === 'object') {
    const detailMessages = Object.values(details).filter(Boolean);
    if (detailMessages.length) return detailMessages.join(' ');
  }

  if (!error?.response) {
    return 'No hay conexión con el backend. Verifica que Spring Boot esté ejecutándose en el puerto 8080.';
  }

  return message || fallback;
};

const BookList = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    BookService.getAllClientes()
      .then(response => {
        if (active) {
          setClientes(Array.isArray(response.data) ? response.data : []);
          setError('');
        }
      })
      .catch(error => {
        if (active) {
          setError(getApiError(error, 'No se pudo cargar la lista de clientes desde el backend.'));
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const deleteCliente = (cliente) => {
    const nombreCompleto = [
      cliente.primerNombre,
      cliente.segundoNombre,
      cliente.primerApellido,
      cliente.segundoApellido,
    ].filter(Boolean).join(' ');

    if (!window.confirm(`¿Eliminar al cliente ${nombreCompleto || `ID ${cliente.id}`}?`)) {
      return;
    }

    BookService.deleteCliente(cliente.id)
      .then(() => {
        setClientes(prevClientes => prevClientes.filter(c => c.id !== cliente.id));
      })
      .catch(error => {
        setError(getApiError(error, 'No se pudo eliminar el cliente.'));
      });
  };

  return (
    <div>
      <h2>Listado de clientes</h2>
      <p>Administra los clientes registrados en el backend de Spring.</p>
      <Link to="/admin/clientes/nuevo" className="btn btn-primary mt-3">
        Agregar cliente
      </Link>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {loading ? (
        <p className="text-center text-muted mt-4">Cargando clientes...</p>
      ) : clientes.length === 0 ? (
        <div className="alert alert-secondary text-center mt-4">No hay clientes registrados.</div>
      ) : (
        <div className="table-responsive mt-4">
          <table className="table table-dark table-striped align-middle">
            <thead>
              <tr>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Emails</th>
                <th>Teléfonos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => (
                <tr key={cliente.id ?? `${cliente.primerNombre}-${cliente.primerApellido}`}>
                  <td>{[cliente.primerNombre, cliente.segundoNombre].filter(Boolean).join(' ') || 'Sin nombre'}</td>
                  <td>{[cliente.primerApellido, cliente.segundoApellido].filter(Boolean).join(' ') || 'Sin apellido'}</td>
                  <td>
                    {cliente.emails?.length
                      ? <ul className="mb-0 ps-3">{cliente.emails.map((email, index) => <li key={`${email}-${index}`}>{email}</li>)}</ul>
                      : 'Sin email'}
                  </td>
                  <td>
                    {cliente.telefonos?.length
                      ? <ul className="mb-0 ps-3">{cliente.telefonos.map((telefono, index) => <li key={`${telefono}-${index}`}>{telefono}</li>)}</ul>
                      : 'Sin teléfono'}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link
                        to={`/admin/clientes/${cliente.id}/editar`}
                        className="btn btn-sm btn-outline-light"
                      >
                        Editar
                      </Link>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteCliente(cliente)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookList;
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BookService from '../service/BookService';

const initialForm = {
  primerNombre: '',
  segundoNombre: '',
  primerApellido: '',
  segundoApellido: '',
  emails: [''],
  telefonos: [''],
};

const getApiError = (error, fallback) => {
  const data = error?.response?.data;

  if (data?.details && typeof data.details === 'object') {
    const detailMessages = Object.values(data.details).filter(Boolean);
    if (detailMessages.length) return detailMessages.join(' ');
  }

  return data?.message || fallback;
};

function BookForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const loadCliente = async () => {
      try {
        const { data } = await BookService.getClienteById(id);
        setForm({
          primerNombre: data.primerNombre ?? '',
          segundoNombre: data.segundoNombre ?? '',
          primerApellido: data.primerApellido ?? '',
          segundoApellido: data.segundoApellido ?? '',
          emails: Array.isArray(data.emails) && data.emails.length ? data.emails : [''],
          telefonos: Array.isArray(data.telefonos) && data.telefonos.length ? data.telefonos : [''],
        });
      } catch (err) {
        setError(getApiError(err, 'No se pudo cargar el cliente seleccionado.'));
      } finally {
        setLoading(false);
      }
    };

    loadCliente();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setForm((currentForm) => {
      const nextValues = [...currentForm[field]];
      nextValues[index] = value;
      return { ...currentForm, [field]: nextValues };
    });
  };

  const addArrayItem = (field) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: [...currentForm[field], ''],
    }));
  };

  const removeArrayItem = (field, index) => {
    setForm((currentForm) => {
      const remaining = currentForm[field].filter((_, itemIndex) => itemIndex !== index);
      return { ...currentForm, [field]: field === 'emails' && remaining.length === 0 ? [''] : remaining };
    });
  };

  const buildPayload = () => ({
    primerNombre: form.primerNombre.trim(),
    segundoNombre: form.segundoNombre?.trim() || null,
    primerApellido: form.primerApellido.trim(),
    segundoApellido: form.segundoApellido?.trim() || null,
    emails: form.emails.map((email) => email.trim()).filter(Boolean),
    telefonos: form.telefonos.map((telefono) => telefono.trim()).filter(Boolean),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const payload = buildPayload();

      if (id) {
        await BookService.updateCliente(id, payload);
      } else {
        await BookService.createCliente(payload);
      }

      navigate('/admin/clientes');
    } catch (err) {
      setError(getApiError(err, 'No se pudo guardar el cliente. Revisa la conexión con el backend.'));
    }
  };

  if (loading) {
    return <p className="text-center mt-5 text-muted">Cargando cliente...</p>;
  }

  return (
    <main className="catalog-container">
      <section className="catalog-header">
        <h1>{id ? 'Editar cliente' : 'Nuevo cliente'}</h1>
        <Link to="/admin/clientes" className="btn btn-secondary mt-3">
          Volver
        </Link>
      </section>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card border-secondary p-4 bg-dark text-light">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label" htmlFor="primerNombre">Primer nombre</label>
            <input id="primerNombre" type="text" name="primerNombre" className="form-control" value={form.primerNombre} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="segundoNombre">Segundo nombre</label>
            <input id="segundoNombre" type="text" name="segundoNombre" className="form-control" value={form.segundoNombre} onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="primerApellido">Primer apellido</label>
            <input id="primerApellido" type="text" name="primerApellido" className="form-control" value={form.primerApellido} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="segundoApellido">Segundo apellido</label>
            <input id="segundoApellido" type="text" name="segundoApellido" className="form-control" value={form.segundoApellido} onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Emails</label>
            {form.emails.map((email, index) => (
              <div className="d-flex gap-2 mb-2" key={`email-${index}`}>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(event) => handleArrayChange('emails', index, event.target.value)}
                  required={index === 0}
                />
                {form.emails.length > 1 && (
                  <button type="button" className="btn btn-outline-danger" onClick={() => removeArrayItem('emails', index)} aria-label="Eliminar email">
                    ×
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="btn btn-sm btn-outline-light" onClick={() => addArrayItem('emails')}>
              Agregar email
            </button>
          </div>

          <div className="col-md-6">
            <label className="form-label">Teléfonos</label>
            {form.telefonos.map((telefono, index) => (
              <div className="d-flex gap-2 mb-2" key={`telefono-${index}`}>
                <input
                  type="tel"
                  className="form-control"
                  value={telefono}
                  onChange={(event) => handleArrayChange('telefonos', index, event.target.value)}
                  placeholder="Ej: 9 6123 4567"
                />
                {form.telefonos.length > 1 && (
                  <button type="button" className="btn btn-outline-danger" onClick={() => removeArrayItem('telefonos', index)} aria-label="Eliminar teléfono">
                    ×
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="btn btn-sm btn-outline-light" onClick={() => addArrayItem('telefonos')}>
              Agregar teléfono
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          {id ? 'Actualizar cliente' : 'Guardar cliente'}
        </button>
      </form>
    </main>
  );
}

export default BookForm;
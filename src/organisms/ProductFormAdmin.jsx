import { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import defaultProductImage from '../assets/img/SuperTierra.png';

const emptyForm = {
  nombre: '',
  descripcion: '',
  precio: '',
  categoria: 'Instrumentos',
  marca: '',
};

function ProductFormAdmin({ onSave, productToEdit, onCancel }) {
  const [form, setForm] = useState(() => productToEdit ? {
    nombre: productToEdit.nombre,
    descripcion: productToEdit.descripcion,
    precio: String(productToEdit.precio),
    categoria: productToEdit.categoria || 'Instrumentos',
    marca: productToEdit.marca || '',
  } : emptyForm);
  const [validationError, setValidationError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setValidationError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.nombre.trim() || !form.descripcion.trim() || !form.marca.trim() ||
        !Number.isFinite(Number(form.precio)) || Number(form.precio) < 1) {
      setValidationError('Completa todos los campos con valores válidos antes de guardar.');
      return;
    }

    const product = {
      id: productToEdit?.id ?? Date.now(),
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      precio: Number(form.precio),
      categoria: form.categoria || 'Instrumentos',
      marca: form.marca.trim(),
      imagen: productToEdit?.imagen || defaultProductImage,
    };

    onSave(product);
    if (!productToEdit) setForm(emptyForm);
  };

  return (
    <Form className="admin-form" onSubmit={handleSubmit}>
      <h3>{productToEdit ? 'Editar producto' : 'Crear producto'}</h3>
      {validationError && <Alert variant="danger">{validationError}</Alert>}
      <Row className="g-3">
        <Col xs={12} md={6}>
          <Form.Group controlId="product-name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name="nombre" value={form.nombre} onChange={handleChange} minLength={2} required />
            <Form.Control.Feedback type="invalid">Ingresa un nombre de al menos 2 caracteres.</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group controlId="product-brand">
            <Form.Label>Marca</Form.Label>
            <Form.Control type="text" name="marca" value={form.marca} onChange={handleChange} required />
          </Form.Group>
        </Col>
        <Col xs={12}>
          <Form.Group controlId="product-description">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" name="descripcion" value={form.descripcion} onChange={handleChange} rows={4} minLength={5} required />
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group controlId="product-price">
            <Form.Label>Precio (CLP)</Form.Label>
            <Form.Control type="number" name="precio" value={form.precio} onChange={handleChange} min="1" step="1" required />
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group controlId="product-category">
            <Form.Label>Categoría</Form.Label>
            <Form.Select name="categoria" value={form.categoria} onChange={handleChange}>
              <option value="Instrumentos">Instrumentos</option>
              <option value="Amplificadores">Amplificadores</option>
              <option value="Accesorios">Accesorios</option>
              <option value="Bajos">Bajos</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <div className="d-flex flex-wrap gap-2 mt-3">
        <Button type="submit" variant="primary">{productToEdit ? 'Guardar cambios' : 'Guardar producto'}</Button>
        {onCancel && <Button type="button" variant="outline-secondary" onClick={onCancel}>Cancelar</Button>}
      </div>
    </Form>
  );
}

export default ProductFormAdmin;

import { useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

const initialValues = {
  nombre: '',
  correo: '',
  descripcion: '',
};

function FormularioContacto() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [enviado, setEnviado] = useState(false);

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setEnviado(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!formData.nombre.trim() || formData.nombre.trim().length < 2) {
      nextErrors.nombre = 'El nombre es obligatorio y debe tener al menos 2 caracteres.';
    }

    if (!validateEmail(formData.correo.trim())) {
      nextErrors.correo = 'Debe ingresar un correo válido.';
    }

    if (!formData.descripcion.trim()) {
      nextErrors.descripcion = 'La descripción del motivo es obligatoria.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setEnviado(true);
      setFormData(initialValues);
    }
  };

  return (
    <Container fluid="xl" className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <Card className="border-0 shadow-sm rounded-4">
            <Card.Body className="p-4 p-md-5">
              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3" controlId="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    id="nombre"
                    name="nombre"
                    type="text"
                    isInvalid={Boolean(errors.nombre)}
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ingrese su nombre"
                  />
                  <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="correo">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    id="correo"
                    name="correo"
                    type="email"
                    isInvalid={Boolean(errors.correo)}
                    value={formData.correo}
                    onChange={handleChange}
                    placeholder="correo@ejemplo.com"
                  />
                  <Form.Control.Feedback type="invalid">{errors.correo}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="descripcion">
                  <Form.Label>Motivo del contacto</Form.Label>
                  <Form.Control
                    as="textarea"
                    id="descripcion"
                    name="descripcion"
                    rows="5"
                    isInvalid={Boolean(errors.descripcion)}
                    value={formData.descripcion}
                    onChange={handleChange}
                    placeholder="Escriba el motivo de su consulta"
                  />
                  <Form.Control.Feedback type="invalid">{errors.descripcion}</Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100 rounded-pill">
                  Enviar mensaje
                </Button>

                {enviado && (
                  <Alert variant="success" className="mt-3 mb-0">
                    Mensaje enviado correctamente. Pronto nos contactaremos contigo.
                  </Alert>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default FormularioContacto;

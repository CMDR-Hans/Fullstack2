import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Form, Image, Table } from 'react-bootstrap';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import ProductFormAdmin from '../organisms/ProductFormAdmin';
import { useAuth } from '../hooks/useAuth';
import { itemsMenu } from '../data/menu';

function Administrador({ products, onAddProduct, onUpdateProduct, onDeleteProduct }) {
  const { currentUser, loginUser, logoutUser } = useAuth();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [feedback, setFeedback] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const isAdmin = currentUser?.role === 'admin';

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((current) => ({ ...current, [name]: value }));
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const result = loginUser(loginForm);
    setFeedback(result.message);
    if (result.ok) {
      setLoginForm({ email: '', password: '' });
    }
  };

  const handleLogout = () => {
    logoutUser();
    setFeedback('');
  };

  const handleSaveProduct = (product) => {
    if (editingProduct) {
      onUpdateProduct(product);
      setEditingProduct(null);
      return;
    }

    onAddProduct(product);
  };

  return (
    <>
      <Header itemsMenu={itemsMenu} />
      <main className="admin-page">
        <section className="admin-panel">
          {isAdmin ? (
            <>
              <h1>Administración</h1>
              <p>Sesión iniciada como {currentUser.email}.</p>
              <Button type="button" variant="outline-light" className="mb-4" onClick={handleLogout}>
                Cerrar sesión
              </Button>
              <ProductFormAdmin
                key={editingProduct?.id ?? 'new-product'}
                onSave={handleSaveProduct}
                productToEdit={editingProduct}
                onCancel={editingProduct ? () => setEditingProduct(null) : undefined}
              />
              <h2 className="h4 mt-4">Productos creados</h2>
              {products.length > 0 ? (
                <Table responsive bordered hover variant="dark" className="admin-products-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Marca</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <Image src={product.imagen} alt="" width={54} height={54} rounded className="me-2" />
                          {product.nombre}
                        </td>
                        <td>{product.marca}</td>
                        <td>{product.categoria}</td>
                        <td>${product.precio.toLocaleString('es-CL')} CLP</td>
                        <td>
                          <div className="d-flex flex-wrap gap-2">
                            <Button type="button" size="sm" variant="outline-warning" onClick={() => setEditingProduct(product)}>
                              Editar
                            </Button>
                            <Button type="button" size="sm" variant="outline-danger" onClick={() => onDeleteProduct(product.id)}>
                              Eliminar
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Alert variant="secondary" className="mt-3">Aún no has creado productos.</Alert>
              )}
            </>
          ) : (
            <>
              <h1>Acceso de administración</h1>
              <p>Ingresa con las credenciales de administrador para crear productos.</p>
              {currentUser && (
                <Alert variant="warning">
                  La sesión actual no tiene permisos de administración.{' '}
                  <Button type="button" variant="link" className="p-0" onClick={handleLogout}>
                    Cerrar sesión
                  </Button>
                </Alert>
              )}
              {feedback && <Alert variant="danger">{feedback}</Alert>}
              <Form className="admin-form" onSubmit={handleLoginSubmit}>
                <Form.Group controlId="admin-login-email">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    autoComplete="username"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="admin-login-password">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    autoComplete="current-password"
                    required
                  />
                </Form.Group>
                <Button type="submit" variant="primary">Ingresar</Button>
              </Form>
              <Link to="/login">Volver al inicio de sesión de usuarios</Link>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Administrador;

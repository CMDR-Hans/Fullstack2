import { useState } from 'react';
import { Alert, Button, ButtonGroup, Card, Form } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';

const initialLogin = { email: '', password: '' };
const initialRegister = { nombre: '', email: '', password: '' };

function AuthForms() {
  const { loginUser, registerUser, currentUser } = useAuth();
  const [mode, setMode] = useState('login');
  const [loginForm, setLoginForm] = useState(initialLogin);
  const [registerForm, setRegisterForm] = useState(initialRegister);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const result = loginUser(loginForm);
    setFeedback({
      type: result.ok ? 'success' : 'danger',
      message: result.message,
    });
    if (result.ok) {
      setLoginForm(initialLogin);
    }
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    const result = registerUser(registerForm);
    setFeedback({
      type: result.ok ? 'success' : 'danger',
      message: result.message,
    });
    if (result.ok) {
      setRegisterForm(initialRegister);
      setMode('login');
    }
  };

  return (
    <div className="auth-wrapper">
      <Card className="shadow border-0 rounded-4 auth-card">
        <Card.Body className="p-4 p-md-5">
          <ButtonGroup className="d-flex justify-content-center gap-2 mb-4">
            <Button
              type="button"
              variant={mode === 'login' ? 'primary' : 'outline-primary'}
              className="rounded-pill px-4"
              onClick={() => setMode('login')}
            >
              Iniciar sesión
            </Button>
            <Button
              type="button"
              variant={mode === 'register' ? 'primary' : 'outline-primary'}
              className="rounded-pill px-4"
              onClick={() => setMode('register')}
            >
              Registrarse
            </Button>
          </ButtonGroup>

          {currentUser && (
            <Alert variant="success" className="mb-4">
              Sesión activa para <strong>{currentUser.nombre}</strong>.
            </Alert>
          )}

          {feedback.message && (
            <Alert variant={feedback.type} className="mb-4">
              {feedback.message}
            </Alert>
          )}

          {mode === 'login' ? (
            <Form onSubmit={handleLoginSubmit}>
              <Form.Group className="mb-3" controlId="login-email">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="login-password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  id="login-password"
                  name="password"
                  type="password"
                  placeholder="********"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100 rounded-pill">
                Entrar
              </Button>
            </Form>
          ) : (
            <Form onSubmit={handleRegisterSubmit}>
              <Form.Group className="mb-3" controlId="register-name">
                <Form.Label>Nombre completo</Form.Label>
                <Form.Control
                  id="register-name"
                  name="nombre"
                  type="text"
                  placeholder="Juan Pérez"
                  value={registerForm.nombre}
                  onChange={handleRegisterChange}
                  minLength={2}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="register-email">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  id="register-email"
                  name="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="register-password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  id="register-password"
                  name="password"
                  type="password"
                  placeholder="********"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  minLength={8}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="success" className="w-100 rounded-pill">
                Crear cuenta
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default AuthForms;

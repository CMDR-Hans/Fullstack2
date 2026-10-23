import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AuthProvider } from './AuthContext';
import { useAuth } from '../hooks/useAuth';

function AuthProbe() {
  const { currentUser, loginUser, registerUser, logoutUser } = useAuth();
  const [feedback, setFeedback] = useState('');

  const showResult = (result) => setFeedback(`${result.ok ? 'success' : 'error'}: ${result.message}`);

  return (
    <div>
      <p data-testid="current-user">{currentUser ? `${currentUser.nombre}:${currentUser.role}` : 'sin sesión'}</p>
      <p data-testid="feedback">{feedback}</p>
      <button onClick={() => showResult(loginUser({ email: 'admin@admin.cl', password: 'admin123' }))}>
        Iniciar como administrador
      </button>
      <button onClick={() => showResult(loginUser({ email: 'usuario@usuario.cl', password: 'usuario123' }))}>
        Iniciar como usuario
      </button>
      <button onClick={() => showResult(loginUser({ email: 'admin@admin.cl', password: 'incorrecta' }))}>
        Iniciar con contraseña incorrecta
      </button>
      <button onClick={() => showResult(registerUser({
        nombre: 'Ana Pérez',
        email: 'ana@example.cl',
        password: 'clave123',
      }))}>
        Registrar usuario
      </button>
      <button onClick={() => showResult(registerUser({
        nombre: 'Otra persona',
        email: 'admin@admin.cl',
        password: 'clave123',
      }))}>
        Registrar correo reservado
      </button>
      <button onClick={logoutUser}>Cerrar sesión</button>
    </div>
  );
}

function renderAuthProbe() {
  return render(
    <AuthProvider>
      <AuthProbe />
    </AuthProvider>
  );
}

describe('Autenticación de usuarios y administración', () => {
  it('permite iniciar sesión como administrador con el rol correcto', () => {
    renderAuthProbe();

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar como administrador' }));

    expect(screen.getByTestId('current-user')).toHaveTextContent('Administrador:admin');
    expect(screen.getByTestId('feedback')).toHaveTextContent('success: Bienvenido, Administrador.');
  });

  it('permite iniciar sesión con la cuenta regular sin permisos de administrador', () => {
    renderAuthProbe();

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar como usuario' }));

    expect(screen.getByTestId('current-user')).toHaveTextContent('Usuario:user');
    expect(screen.getByTestId('feedback')).toHaveTextContent('success: Bienvenido, Usuario.');
  });

  it('registra una cuenta nueva y la deja con sesión iniciada como usuario', () => {
    renderAuthProbe();

    fireEvent.click(screen.getByRole('button', { name: 'Registrar usuario' }));

    expect(screen.getByTestId('current-user')).toHaveTextContent('Ana Pérez:user');
    expect(screen.getByTestId('feedback')).toHaveTextContent('success: Usuario registrado correctamente.');
  });

  it('cierra la sesión activa', () => {
    renderAuthProbe();
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar como usuario' }));

    fireEvent.click(screen.getByRole('button', { name: 'Cerrar sesión' }));

    expect(screen.getByTestId('current-user')).toHaveTextContent('sin sesión');
  });

  it('rechaza credenciales incorrectas y no inicia una sesión', () => {
    renderAuthProbe();

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar con contraseña incorrecta' }));

    expect(screen.getByTestId('current-user')).toHaveTextContent('sin sesión');
    expect(screen.getByTestId('feedback')).toHaveTextContent('error: Correo o contraseña incorrectos.');
  });

  it('rechaza el registro usando el correo reservado de administración', () => {
    renderAuthProbe();

    fireEvent.click(screen.getByRole('button', { name: 'Registrar correo reservado' }));

    expect(screen.getByTestId('current-user')).toHaveTextContent('sin sesión');
    expect(screen.getByTestId('feedback')).toHaveTextContent(
      'error: Este correo está reservado para una cuenta del sistema.'
    );
  });
});

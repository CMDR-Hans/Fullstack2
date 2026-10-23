import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FormularioContacto from './FormularioContacto';

describe('FormularioContacto', () => {
  it('valida y muestra errores para campos incompletos', () => {
    render(<FormularioContacto />);

    fireEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }));

    expect(screen.getByText('El nombre es obligatorio y debe tener al menos 2 caracteres.')).toBeInTheDocument();
    expect(screen.getByText('Debe ingresar un correo válido.')).toBeInTheDocument();
    expect(screen.getByText('La descripción del motivo es obligatoria.')).toBeInTheDocument();
  });

  it('confirma el envío con información de contacto válida', () => {
    render(<FormularioContacto />);

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Ana Pérez' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'ana@example.cl' } });
    fireEvent.change(screen.getByLabelText('Motivo del contacto'), { target: { value: 'Consulta por una guitarra.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }));

    expect(screen.getByText('Mensaje enviado correctamente. Pronto nos contactaremos contigo.')).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ProductFormAdmin from './ProductFormAdmin';

function fillValidProductForm() {
  fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Guitarra eléctrica' } });
  fireEvent.change(screen.getByLabelText('Marca'), { target: { value: 'Fender' } });
  fireEvent.change(screen.getByLabelText('Descripción'), { target: { value: 'Guitarra eléctrica de prueba.' } });
  fireEvent.change(screen.getByLabelText('Precio (CLP)'), { target: { value: '250000' } });
}

describe('ProductFormAdmin', () => {
  it('crea un producto con marca, categoría e imagen genérica', () => {
    const onSave = vi.fn();
    render(<ProductFormAdmin onSave={onSave} />);

    fillValidProductForm();
    fireEvent.click(screen.getByRole('button', { name: 'Guardar producto' }));

    expect(onSave).toHaveBeenCalledWith(expect.objectContaining({
      nombre: 'Guitarra eléctrica',
      marca: 'Fender',
      categoria: 'Instrumentos',
      precio: 250000,
      imagen: expect.any(String),
    }));
  });

  it('carga los datos del producto seleccionado para editar', () => {
    const product = {
      id: 15,
      nombre: 'Bajo',
      marca: 'Ibanez',
      descripcion: 'Bajo de cuatro cuerdas.',
      categoria: 'Bajos',
      precio: 180000,
      imagen: '/bajo.png',
    };
    render(<ProductFormAdmin onSave={vi.fn()} productToEdit={product} />);

    expect(screen.getByLabelText('Nombre')).toHaveValue('Bajo');
    expect(screen.getByLabelText('Marca')).toHaveValue('Ibanez');
    expect(screen.getByLabelText('Categoría')).toHaveValue('Bajos');
    expect(screen.getByRole('button', { name: 'Guardar cambios' })).toBeInTheDocument();
  });

  it('guarda los cambios de edición sin cambiar el id ni la imagen', () => {
    const onSave = vi.fn();
    const product = {
      id: 15,
      nombre: 'Bajo',
      marca: 'Ibanez',
      descripcion: 'Bajo de cuatro cuerdas.',
      categoria: 'Bajos',
      precio: 180000,
      imagen: '/bajo.png',
    };
    render(<ProductFormAdmin onSave={onSave} productToEdit={product} />);

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Bajo actualizado' } });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }));

    expect(onSave).toHaveBeenCalledWith(expect.objectContaining({
      id: 15,
      nombre: 'Bajo actualizado',
      imagen: '/bajo.png',
    }));
  });

  it('no crea un producto cuando no se completan los datos obligatorios', () => {
    const onSave = vi.fn();
    render(<ProductFormAdmin onSave={onSave} />);

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Guitarra' } });
    fireEvent.change(screen.getByLabelText('Descripción'), { target: { value: 'Descripción válida del producto.' } });
    fireEvent.change(screen.getByLabelText('Precio (CLP)'), { target: { value: '50000' } });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar producto' }));

    expect(onSave).not.toHaveBeenCalled();
  });
});

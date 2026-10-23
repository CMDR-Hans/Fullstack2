import { useState } from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import Administrador from './Administrador';

function AdminHarness() {
  const { loginUser } = useAuth();
  const [products, setProducts] = useState([]);

  return (
    <>
      <button type="button" onClick={() => loginUser({ email: 'admin@admin.cl', password: 'admin123' })}>
        Iniciar como Admin para prueba
      </button>
      <Administrador
        products={products}
        onAddProduct={(product) => setProducts((current) => [...current, product])}
        onUpdateProduct={(updatedProduct) => setProducts((current) => current.map(
          (product) => product.id === updatedProduct.id ? updatedProduct : product
        ))}
        onDeleteProduct={(id) => setProducts((current) => current.filter((product) => product.id !== id))}
      />
    </>
  );
}

function renderAdmin() {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <CartProvider>
          <AuthProvider>
            <AdminHarness />
          </AuthProvider>
        </CartProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
}

describe('Administración del catálogo', () => {
  beforeEach(() => localStorage.clear());

  it('permite crear, editar y eliminar productos del catálogo', () => {
    renderAdmin();
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar como Admin para prueba' }));

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Producto de prueba' } });
    fireEvent.change(screen.getByLabelText('Marca'), { target: { value: 'Marca sonora' } });
    fireEvent.change(screen.getByLabelText('Descripción'), { target: { value: 'Descripción de producto válida.' } });
    fireEvent.change(screen.getByLabelText('Precio (CLP)'), { target: { value: '90000' } });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar producto' }));

    const productRow = screen.getByRole('row', { name: /Producto de prueba/ });
    expect(within(productRow).getByText('Marca sonora')).toBeInTheDocument();

    fireEvent.click(within(productRow).getByRole('button', { name: 'Editar' }));
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Producto editado' } });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }));

    const editedRow = screen.getByRole('row', { name: /Producto editado/ });
    expect(within(editedRow).getByText('Marca sonora')).toBeInTheDocument();

    fireEvent.click(within(editedRow).getByRole('button', { name: 'Eliminar' }));

    expect(screen.queryByRole('row', { name: /Producto editado/ })).not.toBeInTheDocument();
    expect(screen.getByText('Aún no has creado productos.')).toBeInTheDocument();
  });
});

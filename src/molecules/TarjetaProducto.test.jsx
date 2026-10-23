import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CartProvider } from '../context/CartContext';
import { useCart } from '../hooks/useCart';
import TarjetaProducto from './TarjetaProducto';

function CartCount() {
  const { cartCount } = useCart();
  return <output aria-label="Cantidad en el carrito">{cartCount}</output>;
}

function renderProductCard() {
  return render(
    <CartProvider>
      <TarjetaProducto
        imagen="/guitarra.png"
        nombre="Guitarra prueba"
        descripcion="Guitarra de prueba para validación."
        precio={120000}
        onOpenDetail={() => {}}
      />
      <CartCount />
    </CartProvider>
  );
}

describe('TarjetaProducto', () => {
  it('muestra el nombre y el precio del instrumento', () => {
    renderProductCard();

    expect(screen.getByRole('heading', { name: 'Guitarra prueba' })).toBeInTheDocument();
    expect(screen.getByText('$120.000 CLP')).toBeInTheDocument();
  });

  it('agrega el producto al carrito e incrementa su cantidad', () => {
    renderProductCard();

    fireEvent.click(screen.getByRole('button', { name: '🛒 Agregar al carrito' }));

    expect(screen.getByRole('button', { name: '✅ Agregado' })).toBeInTheDocument();
    expect(screen.getByLabelText('Cantidad en el carrito')).toHaveTextContent('1');
  });
});

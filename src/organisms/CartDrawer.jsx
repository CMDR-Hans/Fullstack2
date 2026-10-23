import { useCart } from '../context/CartContext';
import { Alert, Button, Image } from 'react-bootstrap';

function CartDrawer() {
  const { cart, total, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-backdrop" onClick={() => setIsCartOpen(false)} />

      <aside className="cart-drawer" aria-label="Carrito de compras">
        <div className="cart-drawer-header">
          <h3>Tu carrito</h3>
          <Button type="button" variant="link" className="cart-close" onClick={() => setIsCartOpen(false)} aria-label="Cerrar carrito">
            ×
          </Button>
        </div>

        {cart.length === 0 ? (
          <Alert variant="secondary" className="cart-empty">
            <p>Tu carrito está vacío.</p>
            <span>Agrega productos para continuar.</span>
          </Alert>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <Image src={item.imagen} alt={item.nombre} className="cart-item-image" />

                  <div className="cart-item-info">
                    <h4>{item.nombre}</h4>
                    <p>${Number(item.precio).toLocaleString('es-CL')} CLP</p>

                    <div className="cart-item-controls">
                      <Button type="button" variant="outline-secondary" onClick={() => updateQuantity(item.id, -1)} aria-label={`Disminuir cantidad de ${item.nombre}`}>
                        −
                      </Button>
                      <span>{item.quantity}</span>
                      <Button type="button" variant="outline-secondary" onClick={() => updateQuantity(item.id, 1)} aria-label={`Aumentar cantidad de ${item.nombre}`}>
                        +
                      </Button>
                    </div>
                  </div>

                  <Button type="button" variant="link" className="cart-remove" onClick={() => removeFromCart(item.id)} aria-label={`Eliminar ${item.nombre}`}>
                    Eliminar
                  </Button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total-row">
                <span>Total</span>
                <strong>${total.toLocaleString('es-CL')} CLP</strong>
              </div>
              <Button type="button" variant="primary" className="cart-checkout">Finalizar compra</Button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;

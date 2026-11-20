import { useCart } from '../context/CartContext';

function CartDrawer() {
  const { cart, total, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-backdrop" onClick={() => setIsCartOpen(false)} />

      <aside className="cart-drawer" aria-label="Carrito de compras">
        <div className="cart-drawer-header">
          <h3>Tu carrito</h3>
          <button type="button" className="cart-close" onClick={() => setIsCartOpen(false)} aria-label="Cerrar carrito">
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Tu carrito está vacío.</p>
            <span>Agrega productos para continuar.</span>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.imagen} alt={item.nombre} className="cart-item-image" />

                  <div className="cart-item-info">
                    <h4>{item.nombre}</h4>
                    <p>${Number(item.precio).toLocaleString('es-CL')} CLP</p>

                    <div className="cart-item-controls">
                      <button type="button" onClick={() => updateQuantity(item.id, -1)} aria-label={`Disminuir cantidad de ${item.nombre}`}>
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, 1)} aria-label={`Aumentar cantidad de ${item.nombre}`}>
                        +
                      </button>
                    </div>
                  </div>

                  <button type="button" className="cart-remove" onClick={() => removeFromCart(item.id)} aria-label={`Eliminar ${item.nombre}`}>
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total-row">
                <span>Total</span>
                <strong>${total.toLocaleString('es-CL')} CLP</strong>
              </div>
              <button type="button" className="btn-primary cart-checkout">Finalizar compra</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;

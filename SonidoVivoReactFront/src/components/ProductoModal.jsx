import { useCart } from '../context/CartContext';

function ProductoModal({ isOpen, onClose, product }) {
  const { addToCart } = useCart();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar detalle del producto">
          ×
        </button>

        <div className="product-modal-content">
          <img src={product.imagen} alt={product.nombre} className="product-modal-image" />

          <div className="product-modal-info">
            <span className="stock-tag">{product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock'}</span>
            <h3 id="product-modal-title">{product.nombre}</h3>
            <p className="detail-price">${Number(product.precio).toLocaleString('es-CL')} CLP</p>
            <p className="detail-description">{product.descripcion}</p>

            <ul className="specs-list">
              <li><strong>Categoria:</strong> Instrumentos y equipos</li>
              <li><strong>Envio:</strong> A todo Chile</li>
              <li><strong>Garantía:</strong> 12 meses</li>
            </ul>

            <div className="purchase-controls">
              <button type="button" className="btn-primary btn-cart" onClick={handleAddToCart}>
                🛒 Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductoModal;

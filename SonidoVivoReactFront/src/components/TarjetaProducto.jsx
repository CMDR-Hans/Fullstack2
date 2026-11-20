import { useState } from 'react';
import { useCart } from '../context/CartContext';

function TarjetaProducto({ id, imagen, nombre, descripcion, precio, stock, onOpenDetail }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ id, imagen, nombre, descripcion, precio, stock });
    setIsAdded(true);
    window.setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <article className="product-card">
      <img src={imagen} alt={nombre} className="product-img" />

      <div className="product-content">
        <h3>{nombre}</h3>
        <p className="product-desc">{descripcion}</p>
        <p className="product-price">${Number(precio).toLocaleString('es-CL')} CLP</p>
        <small className="text-secondary">Stock: {stock}</small>
      </div>

      <div className="card-controls">
        <button 
          type="button" 
          className="btn-primary btn-cart" 
          onClick={handleAddToCart}
          style={{
            backgroundColor: isAdded ? '#f33587' : '#e2e2e2',
            color: isAdded ? 'white' : '#333',
            border: 'none',
            padding: '8px',
            borderRadius: '4px',

            fontWeight: 'bold'
          }}
        >
          {isAdded ? '✅ Agregado' : '🛒 Agregar al carrito'}
        </button>

        <button 
          type="button" 
          className="btn-detail-link" 
          onClick={onOpenDetail}
        >
          Ver detalle
        </button>
      </div>
    </article>
  );
}

export default TarjetaProducto;
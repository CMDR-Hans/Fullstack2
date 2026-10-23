import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

function TarjetaProducto({ imagen, nombre, descripcion, precio, onOpenDetail }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ id: nombre, imagen, nombre, descripcion, precio });
    setIsAdded(true);
    window.setTimeout(() => setIsAdded(false), 1200);
  };

  const precioFormateado = Number(precio).toLocaleString('es-CL');

  return (
    <Card as="article" className="product-card h-100">
      <Card.Img variant="top" src={imagen} alt={nombre} className="product-img" />

      <Card.Body className="product-content">
        <Card.Title as="h3">{nombre}</Card.Title>
        <Card.Text className="product-desc">{descripcion}</Card.Text>
        <Card.Text className="product-price">${precioFormateado} CLP</Card.Text>
      </Card.Body>

      <div className="card-controls">
        <Button 
          type="button" 
          variant={isAdded ? 'success' : 'primary'}
          className="btn-cart" 
          onClick={handleAddToCart}
        >
          {isAdded ? '✅ Agregado' : '🛒 Agregar al carrito'}
        </Button>

        <Button 
          type="button" 
          variant="link"
          className="btn-detail-link" 
          onClick={onOpenDetail}
        >
          Ver detalle
        </Button>
      </div>
    </Card>
  );
}

export default TarjetaProducto;
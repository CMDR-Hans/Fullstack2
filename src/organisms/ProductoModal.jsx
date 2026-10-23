import { useCart } from '../context/CartContext';
import { Button, Modal, Row, Col, Image, Badge } from 'react-bootstrap';

function ProductoModal({ isOpen, onClose, product }) {
  const { addToCart } = useCart();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  const precioFormateado = Number(product.precio).toLocaleString('es-CL');

  return (
    <Modal show={isOpen} onHide={onClose} centered size="lg" aria-labelledby="product-modal-title">
      <Modal.Header closeButton>
        <Modal.Title id="product-modal-title">{product.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="g-4 align-items-center">
          <Col xs={12} md={6}>
            <Image src={product.imagen} alt={product.nombre} fluid rounded className="product-modal-image" />
          </Col>
          <Col xs={12} md={6}>
            <Badge bg="success" className="mb-2">Disponible</Badge>
            <h3>{product.nombre}</h3>
            <p className="detail-price">${precioFormateado} CLP</p>
            <p className="detail-description">{product.descripcion}</p>
            <ul className="specs-list">
              <li><strong>Categoría:</strong> {product.categoria || 'Instrumentos y equipos'}</li>
              {product.marca && <li><strong>Marca:</strong> {product.marca}</li>}
              <li><strong>Envío:</strong> A todo Chile</li>
              <li><strong>Garantía:</strong> 12 meses</li>
            </ul>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="outline-secondary" onClick={onClose}>Cerrar</Button>
        <Button type="button" variant="primary" onClick={handleAddToCart}>🛒 Agregar al carrito</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductoModal;

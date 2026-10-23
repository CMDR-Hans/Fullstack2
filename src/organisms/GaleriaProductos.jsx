import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import TarjetaProducto from '../molecules/TarjetaProducto';
import ProductoModal from './ProductoModal';

function GaleriaProductos({ productos }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <Row className="catalog-grid g-4">
        {productos.map((producto) => (
          <Col key={producto.id} xs={12} sm={6} lg={4} xl={3}>
            <TarjetaProducto
              imagen={producto.imagen}
              nombre={producto.nombre}
              descripcion={producto.descripcion}
              precio={producto.precio}
              onOpenDetail={() => setSelectedProduct(producto)}
            />
          </Col>
        ))}
      </Row>

      <ProductoModal
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />
    </>
  );
}

export default GaleriaProductos;
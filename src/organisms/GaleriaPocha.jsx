import TarjetaProductoPocha from '../molecules/TarjetaProductoPocha';
import { Col, Row } from 'react-bootstrap';

function GaleriaProductos({ productosPocho }) {
  return (
    <Row className="categories-grid g-4">
      {productosPocho.map((productosPocho) => (
        <Col key={productosPocho.id} xs={12} sm={6} lg={4}>
          <TarjetaProductoPocha
            imagen={productosPocho.imagen}
            nombre={productosPocho.nombre}
            descripcion={productosPocho.descripcion}
          />
        </Col>
      ))}
    </Row>
  );
}

export default GaleriaProductos;
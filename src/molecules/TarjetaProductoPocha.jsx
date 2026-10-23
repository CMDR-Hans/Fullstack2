import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function TarjetaProductoPocha({ imagen, nombre, descripcion}) {

    return (
    <Card as="article" className="category-card h-100">
      <Card.Img variant="top" className="category-img" src={imagen} alt={nombre} />
      
      <Card.Body className="category-info">
        <Card.Title as="h3">{nombre}</Card.Title>
        <Card.Text className="descripcion">{descripcion}</Card.Text>
        <Button as={Link} to="/productos" variant="outline-primary" className="btn-category">
          Ver {nombre}
        </Button>
      </Card.Body>
      
    </Card>
  );
}

export default TarjetaProductoPocha;

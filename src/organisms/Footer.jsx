import SuperTierra from '../assets/img/SuperTierra.png'
import { Col, Container, Image, Row } from 'react-bootstrap';


function Footer() {
  return (
    <footer className="main-footer">
      <Container fluid="xl" className="footer-container">
        <Row className="g-4">

        <Col xs={12} md={6} lg={5} className="footer-column">
            <h3>Sonido Vivo</h3>
            <p className="footer-desc">
              Más de 11 años ofreciendo los mejores instrumentos musicales y equipos de sonido para músicos de Viña del Mar y todo Chile.
            </p>
          <div className="repair-badge">
            <p>🛠️ <strong>¡Atención!</strong> También hacemos servicio de reparaciones y mantención de instrumentos de cuerda.</p>
          </div>
        </Col>


        <Col xs={12} md={6} lg={3} className="footer-column">
          <h4>Ubicación</h4>
          <p>📍 Arlegui #450, Viña del Mar</p>
          <p>Región de Valparaíso, Chile</p>
          <p>📧 contacto@sonidovivo.cl</p>
        
        </Col>


        <Col xs={12} lg={4} className="footer-column approval-box">
          <Image src={SuperTierra} alt="Garantía de calidad" className="approval-img"/>
          <span className="approval-text">¡Aprobado por el ministerio de seguridad de super tierra!</span>
        </Col>

        </Row>
      </Container>
      <div className="footer-bottom">
        <p>&copy; 2026 Sonido Vivo. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
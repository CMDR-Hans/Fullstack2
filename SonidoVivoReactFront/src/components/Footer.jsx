import SuperTierra from '../assets/img/SuperTierra.png'


function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">

        <div className="footer-column">
            <h3>Sonido Vivo</h3>
            <p className="footer-desc">
              Más de 11 años ofreciendo los mejores instrumentos musicales y equipos de sonido para músicos de Viña del Mar y todo Chile.
            </p>
          <div className="repair-badge">
            <p>🛠️ <strong>¡Atención!</strong> También hacemos servicio de reparaciones y mantención de instrumentos de cuerda.</p>
          </div>
        </div>


        <div className="footer-column">
          <h4>Ubicación</h4>
          <p>📍 Arlegui #450, Viña del Mar</p>
          <p>Región de Valparaíso, Chile</p>
          <p>📧 contacto@sonidovivo.cl</p>
        
        </div>


        <div className="footer-column approval-box">
          <img src={SuperTierra} alt="Garantía de calidad" className="approval-img"/>
          <span className="approval-text">¡Aprobado por el ministerio de seguridad de super tierra!</span>
        </div>


      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Sonido Vivo. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
import video from '../assets/video/banner-video.mp4';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Hero(){
    return(
<>
        <section className="hero-section">
           
            <video autoPlay loop muted playsInline className="hero-video">
            <source src= {video} type="video/mp4"/>
            Tu navegador no soporta el formato de video.
            </video>

           
            <div className="hero-overlay"></div>

            
            <div className="hero-content">
            <h1>Pasión por la Música en Viña del Mar</h1>
            <p>Instrumentos, equipos de sonido y taller de reparación especializado. Envíos directos a todo Chile.</p>
            <Button as={Link} to="/productos" variant="primary" className="hero-catalog-link">
                Explorar Catálogo
            </Button>
            </div>
        </section>
</>
    );
}

export default Hero;
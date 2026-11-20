import video from '../assets/video/banner-video.mp4';



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
            <a href="/productos" className="btn-primary">Explorar Catálogo</a>
            </div>
        </section>
</>
    );
}

export default Hero;
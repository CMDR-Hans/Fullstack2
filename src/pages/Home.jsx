import Header from '../organisms/Header';
import Hero from '../organisms/Hero';
import Seccion from '../atoms/Seccion';
import GaleriaProductoPocha from '../organisms/GaleriaPocha'
import Footer from '../organisms/Footer';
import { Container } from 'react-bootstrap';

import { itemsMenu } from '../data/menu';
import { productosPocho } from '../data/productosPocho';



function Home() {
  
    return (
    <>
        <Header
            titulo="SonidoVivo.exe"
            subtitulo="Arte de la musica"
            itemsMenu={itemsMenu}
        />
        
            <Hero/>
            <Container fluid="xl">
                <Seccion clase="categories-section" titulo="Nuestros Productos">
                    <p className="section-subtitle">Explora las principales categorías de instrumentos y equipos disponibles en Sonido Vivo.</p>
                    <GaleriaProductoPocha productosPocho={productosPocho.slice(0,6)}/>
                </Seccion>
            </Container>


        
        <Footer/>

    </>
    )
}

export default Home
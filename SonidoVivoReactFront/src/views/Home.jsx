import Header from '../components/Header';
import Hero from '../components/Hero';
import Seccion from '../components/Seccion';
import GaleriaProductoPocha from '../components/GaleriaPocha'
import Footer from '../components/Footer';

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
            <Seccion clase="categories-section" titulo="Nuestros Productos">
                <p class="section-subtitle">Explora las principales categorías de instrumentos y equipos disponibles en Sonido Vivo.</p>
                <GaleriaProductoPocha productosPocho={productosPocho.slice(0,6)}/>
                
                
            </Seccion>


        
        <Footer/>

    </>
    )
}

export default Home
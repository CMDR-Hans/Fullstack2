import Header from '../components/Header';
import Footer from '../components/Footer';
import Seccion from '../components/Seccion';

import { itemsMenu } from '../data/menu';

function Ofertas() {
  return (
    <>
        <Header
            titulo="Confetis.exe"
            subtitulo="¡Ejecuta tu antojo con los mejores dulces!"
            itemsMenu={itemsMenu}
        />

        <main id="contenido">

            <Seccion id="productos" titulo="Pronto nuevas ofertas">
                <p>Pronto ...</p>
            </Seccion>

        </main>

        <Footer
            anio={2026}
            nombreTienda="Confetis.exe"
            eslogan="Ejecuta tu antojo"
        />

    </>
  )
}

export default Ofertas
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import Seccion from '../atoms/Seccion';

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
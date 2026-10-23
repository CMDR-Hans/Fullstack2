import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import Seccion from '../atoms/Seccion';
import FormularioContacto from '../organisms/FormularioContacto';

import { itemsMenu } from '../data/menu';

function Contacto() {
  return (
    <>
        <Header
            titulo="Confetis.exe"
            subtitulo="¡Ejecuta tu antojo con los mejores dulces!"
            itemsMenu={itemsMenu}
        />

        <main id="contenido">

            <Seccion id="contacto" titulo="Formulario de contacto">
                <FormularioContacto />
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

export default Contacto
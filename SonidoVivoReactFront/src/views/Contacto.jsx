import Header from '../components/Header';
import Footer from '../components/Footer';
import Seccion from '../components/Seccion';
import FormularioContacto from '../components/FormularioContacto';

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
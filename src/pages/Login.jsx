import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import Seccion from '../atoms/Seccion';
import AuthForms from '../molecules/AuthForms';
import { itemsMenu } from '../data/menu';

function Login() {
  return (
    <>
      <Header
        titulo="Sonido Vivo"
        subtitulo="Tu tienda de música y equipos"
        itemsMenu={itemsMenu}
      />

      <main id="contenido">
        <Seccion id="login" titulo="Acceso de usuarios">
          <AuthForms />
        </Seccion>
      </main>

      <Footer
        anio={2026}
        nombreTienda="Sonido Vivo"
        eslogan="Tu sonido, nuestra pasión"
      />
    </>
  );
}

export default Login;

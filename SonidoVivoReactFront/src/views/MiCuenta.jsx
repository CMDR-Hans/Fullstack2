import Header from '../components/Header';
import Footer from '../components/Footer';
import Seccion from '../components/Seccion';
import { itemsMenu } from '../data/menu';
import { useAuth } from '../context/AuthContext';

function MiCuenta() {
  const { user } = useAuth();

  return (
    <>
      <Header itemsMenu={itemsMenu} />
      <main>
        <Seccion clase="catalog-header">
          <h1>Mi cuenta</h1>
          <p>Sesión iniciada como cliente.</p>
        </Seccion>
        <Seccion clase="catalog-container">
          <div className="card border-secondary p-4 bg-dark text-light mx-auto" style={{ maxWidth: '620px' }}>
            <h2>{user?.nombre}</h2>
            <p className="mb-2">Usuario: {user?.username}</p>
            <p className="text-secondary">Este perfil tiene permisos limitados. Puedes navegar el catálogo y usar el carrito de compras.</p>
          </div>
        </Seccion>
      </main>
      <Footer />
    </>
  );
}

export default MiCuenta;

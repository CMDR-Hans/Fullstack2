import Header from './Header';
import Footer from './Footer';
import { itemsMenu } from '../data/menu';

function AdminLayout({ children }) {
  return (
    <>
      <Header itemsMenu={itemsMenu} />
      <main className="catalog-container">{children}</main>
      <Footer />
    </>
  );
}

export default AdminLayout;

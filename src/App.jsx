import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import Home from './pages/Home';
import Productos from './pages/Productos';
import Login from './pages/Login';
import Administrador from './pages/Administrador';
import Contacto from './pages/Contacto';
import CartDrawer from './organisms/CartDrawer';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (product) => setProducts((current) => [...current, product]);

  const handleUpdateProduct = (updatedProduct) => setProducts((current) => (
    current.map((product) => (
      product.id === updatedProduct.id ? updatedProduct : product
    ))
  ));

  const handleDeleteProduct = (productId) => setProducts((current) => (
    current.filter((product) => product.id !== productId)
  ));

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos extraProducts={products} onAddProduct={handleAddProduct} />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/administrador"
          element={(
            <Administrador
              products={products}
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          )}
        />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <CartDrawer />
    </>
  );
}

export default App

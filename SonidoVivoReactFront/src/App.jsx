import { Navigate, Route, Routes } from 'react-router-dom';

import Home from './views/Home';
import Productos from './views/Productos';
import Login from './views/Login';
import Registro from './views/Registro';
import MiCuenta from './views/MiCuenta';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import CartDrawer from './components/CartDrawer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import ListaProductosAdmin from './components/ListaProductosAdmin';
import FormularioProducto from './components/FormularioProducto';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/mi-cuenta" element={<ProtectedRoute><MiCuenta /></ProtectedRoute>} />
        <Route path="/admin/clientes" element={<ProtectedRoute role="admin"><AdminLayout><BookList /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/clientes/nuevo" element={<ProtectedRoute role="admin"><AdminLayout><BookForm /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/clientes/:id/editar" element={<ProtectedRoute role="admin"><AdminLayout><BookForm /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/productos" element={<ProtectedRoute role="admin"><AdminLayout><ListaProductosAdmin /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/productos/nuevo" element={<ProtectedRoute role="admin"><AdminLayout><FormularioProducto /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/productos/:id/editar" element={<ProtectedRoute role="admin"><AdminLayout><FormularioProducto /></AdminLayout></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <CartDrawer />
    </>
  );
}

export default App;

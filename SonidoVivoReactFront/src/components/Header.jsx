import logo from '../assets/img/logo.svg';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Header({ itemsMenu }) {
    const { cartCount, setIsCartOpen } = useCart();
    const { user, logout } = useAuth();

    return (
        <>
            <div className="top-bar">
                <p>Envíos a todo Chile | 11 años de experiencia</p>
            </div>

            <header className="main-header">
                <nav className="navbar">
                    <Link to="/" className="nav-brand text-decoration-none">
                        <img src={logo} alt="logo" width="60px" />
                        <span className="brand-name">Sonido Vivo</span>
                    </Link>

                    <ul className="nav-menu">
                        {itemsMenu.map((item) => (
                            <li key={item.href || item.label}>
                                <Link to={item.href} className="nav-link">{item.label}</Link>
                            </li>
                        ))}

                        {user?.role === 'admin' && (
                            <>
                                <li><Link to="/admin/clientes" className="nav-link">Clientes</Link></li>
                                <li><Link to="/admin/productos" className="nav-link">Productos admin</Link></li>
                            </>
                        )}

                        {user ? (
                            <li>
                                <Link to="/mi-cuenta" className="nav-link">{user.nombre}</Link>
                            </li>
                        ) : (
                            <li><Link to="/login" className="nav-link">Iniciar sesión</Link></li>
                        )}

                        {user && (
                            <li>
                                <button type="button" className="btn btn-sm btn-outline-light" onClick={logout}>Salir</button>
                            </li>
                        )}

                        <li>
                            <button type="button" className="cart-indicator" aria-label={`Carrito con ${cartCount} productos`} onClick={() => setIsCartOpen(true)}>
                                <span className="cart-icon">🛒</span>
                                <span className="cart-count">{cartCount}</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default Header;
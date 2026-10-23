import logo from '../assets/img/logo.svg';
import { useCart } from '../hooks/useCart';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap';
import ThemeSelector from '../molecules/ThemeSelector';

function Header({ itemsMenu }) {
    const { cartCount, setIsCartOpen } = useCart();
    const { theme, setTheme } = useTheme();
    const { currentUser } = useAuth();

    return (
        <>
            <div className="top-bar">
                <p>Envíos a todo Chile | 11 años de experiencia</p>
            </div>

            <Navbar expand="xl" className="main-header site-navbar">
                <Container fluid="xxl">
                    <Navbar.Brand as={Link} to="/" className="nav-brand">
                        <img src={logo} alt="" width="60" height="60" />
                        <span className="brand-name">Sonido Vivo</span>
                    </Navbar.Brand>
                    {currentUser && (
                        <Badge bg="warning" text="dark" pill className="user-bubble" title={currentUser.email}>
                            {currentUser.nombre}
                        </Badge>
                    )}
                    <Navbar.Toggle aria-controls="storefront-navbar" />
                    <Navbar.Collapse id="storefront-navbar">
                        <Nav className="nav-menu ms-auto align-items-xl-center">
                          {itemsMenu.map((item) => (
                            <Nav.Link as={Link} to={item.href} key={item.href || item.label} className="nav-link">
                                {item.label}
                            </Nav.Link>
                          ))}
                          <div className="nav-menu-control">
                              <ThemeSelector theme={theme} setTheme={setTheme} />
                          </div>
                          <div className="nav-menu-control">
                            <Button
                              type="button"
                              variant="outline-primary"
                              className="cart-indicator"
                              aria-label={`Carrito con ${cartCount} productos`}
                              onClick={() => setIsCartOpen(true)}
                            >
                                <span className="cart-icon">🛒</span>
                                <span className="cart-count">{cartCount}</span>
                            </Button>
                          </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
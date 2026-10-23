import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import Seccion from '../atoms/Seccion';
import GaleriaProductos from '../organisms/GaleriaProductos';
import ProductFormAdmin from '../organisms/ProductFormAdmin';
import { useAuth } from '../context/AuthContext';
import { productos } from '../data/productos';
import { itemsMenu } from '../data/menu';

function Productos({ extraProducts = [], onAddProduct }) {
    const { currentUser } = useAuth();
    const [showProductForm, setShowProductForm] = useState(false);
    const allProducts = [...productos, ...extraProducts];
    const isAdmin = currentUser?.role === 'admin';

    return (
    <>
        <Header itemsMenu={itemsMenu} />
        
        
        
        <main>
            <Seccion clase="catalog-header">
                <h1>Catálogo de Productos</h1>
                <p>Selecciona la cantidad que necesitas y agrégala directamente a tu carrito de compras.</p>
                {isAdmin && (
                    <Button
                        type="button"
                        variant="primary"
                        onClick={() => setShowProductForm((visible) => !visible)}
                    >
                        {showProductForm ? 'Cancelar' : 'Crear producto'}
                    </Button>
                )}
            </Seccion>
            <Seccion clase="catalog-container">
                {isAdmin && showProductForm && (
                    <ProductFormAdmin
                        onSave={(product) => {
                            onAddProduct(product);
                            setShowProductForm(false);
                        }}
                    />
                )}
                <GaleriaProductos productos={allProducts}/>
            </Seccion>
            
        </main>

        <Footer/>

    </>
    )
}

export default Productos
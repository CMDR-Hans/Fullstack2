import Header from '../components/Header';
import Footer from '../components/Footer';
import Seccion from '../components/Seccion';
import GaleriaProductos from '../components/GaleriaProductos';
import BookService from '../service/BookService';
import imgFender from '../assets/img/fenderStocoalgo.jpg';
import imgBajo from '../assets/img/bajo-ibanez.webp';
import imgBateria from '../assets/img/bateriaYamahua.webp';
import imgRoland from '../assets/img/ROLAND_XPS10_RD.jpg';
import imgMarshall from '../assets/img/amp_marshal.jpg';
import imgMicrofono from '../assets/img/mic_shure.webp';

import { itemsMenu } from '../data/menu';
import { useEffect, useState } from 'react';

const imagenes = { fender: imgFender, bajo: imgBajo, bateria: imgBateria, roland: imgRoland, marshall: imgMarshall, microfono: imgMicrofono };

function Productos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;
        BookService.getAllProductos()
            .then(({ data }) => {
                if (!active) return;
                const disponibles = (Array.isArray(data) ? data : []).filter((producto) => producto.stock > 0);
                setProductos(disponibles.map((producto) => ({
                    ...producto,
                    imagen: imagenes[producto.imagen] || imgMicrofono,
                })));
            })
            .catch((err) => {
                if (active) setError(err?.response?.data?.message || 'No se pudo cargar el catálogo desde el backend.');
            })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, []);

    return (
    <>
        <Header itemsMenu={itemsMenu} />
        <main>
            <Seccion clase="catalog-header">
                <h1>Catálogo de Productos</h1>
                <p>Selecciona la cantidad que necesitas y agrégala directamente a tu carrito de compras.</p>
            </Seccion>
            <Seccion clase="catalog-container">
                {loading && <p className="text-center text-muted">Cargando productos...</p>}
                {error && <div className="alert alert-danger">{error}</div>}
                {!loading && !error && !productos.length && <div className="alert alert-secondary text-center">No hay productos disponibles.</div>}
                {!loading && productos.length > 0 && <GaleriaProductos productos={productos}/>}
            </Seccion>
        </main>
        <Footer/>
    </>
    );
}

export default Productos;
import { useState } from 'react';
import TarjetaProducto from './TarjetaProducto';
import ProductoModal from './ProductoModal';

function GaleriaProductos({ productos }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <div className="catalog-grid">
        {productos.map((producto) => (
          <TarjetaProducto
            key={producto.id}
            id={producto.id}
            imagen={producto.imagen}
            nombre={producto.nombre}
            descripcion={producto.descripcion}
            precio={producto.precio}
            stock={producto.stock}
            onOpenDetail={() => setSelectedProduct(producto)}
          />
        ))}
      </div>

      <ProductoModal
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />
    </>
  );
}

export default GaleriaProductos;
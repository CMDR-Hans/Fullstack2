import TarjetaProductoPocha from './TarjetaProductoPocha';

function GaleriaProductos({ productosPocho }) {
  return (
    <div className="categories-grid">
      {productosPocho.map((productosPocho) => (
        <TarjetaProductoPocha
          key={productosPocho.id}
          imagen={productosPocho.imagen}
          nombre={productosPocho.nombre}
          descripcion={productosPocho.descripcion}

        />
      ))}
    </div>
  );
}

export default GaleriaProductos;
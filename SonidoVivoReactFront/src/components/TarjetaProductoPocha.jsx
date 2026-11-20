

function TarjetaProductoPocha({ imagen, nombre, descripcion}) {

    return (
    <article className="category-card">
      <div className="category-img">
        <img className="category-img" src={imagen} alt={nombre} />
      </div>
      
      <div className="category-info">
        <h3>{nombre}</h3>
        <p className="descripcion">{descripcion}</p>
        <a href="/Productos" class="btn-category">Ver {nombre}</a>
        
      </div>
      
    </article>
  );
}

export default TarjetaProductoPocha;

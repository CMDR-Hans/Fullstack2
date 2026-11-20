package cl.duoc.SonidoVivoReact.repository;

import cl.duoc.SonidoVivoReact.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    // Buscar productos que tengan stock disponible (stock mayor a cero)
    List<Producto> findByStockGreaterThan(Integer stock);

    // Buscar productos por coincidencia parcial de nombre (ignorando mayúsculas/minúsculas)
    List<Producto> findByNombreContainingIgnoreCase(String nombre);
}
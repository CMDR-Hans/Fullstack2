package cl.duoc.SonidoVivoReact.repository;

import cl.duoc.SonidoVivoReact.model.Venta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface VentaRepository extends JpaRepository<Venta, Long> {

    // Obtener todo el historial de compras de un cliente específico
    List<Venta> findByClienteId(Long clienteId);

    // Filtrar ventas realizadas en un rango de fechas
    List<Venta> findByFechaVentaBetween(LocalDateTime inicio, LocalDateTime fin);

    //Lo dejo por que quiero probarlo
    // Consulta personalizada con JPQL para traer las ventas con sus detalles y cliente (evita problema N+1)
    @Query("SELECT DISTINCT v FROM Venta v JOIN FETCH v.detalles d JOIN FETCH v.cliente c WHERE v.id = :id")
    Optional<Venta> findVentaConDetallesById(@Param("id") Long id);
}
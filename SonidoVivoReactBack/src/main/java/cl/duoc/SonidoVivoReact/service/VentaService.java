package cl.duoc.SonidoVivoReact.service;

import cl.duoc.SonidoVivoReact.dto.VentaRequestDTO;
import cl.duoc.SonidoVivoReact.exception.BadRequestException;
import cl.duoc.SonidoVivoReact.exception.ConflictException;
import cl.duoc.SonidoVivoReact.exception.ResourceNotFoundException;
import cl.duoc.SonidoVivoReact.model.Cliente;
import cl.duoc.SonidoVivoReact.model.DetalleVenta;
import cl.duoc.SonidoVivoReact.model.Producto;
import cl.duoc.SonidoVivoReact.model.Venta;
import cl.duoc.SonidoVivoReact.repository.ClienteRepository;
import cl.duoc.SonidoVivoReact.repository.ProductoRepository;
import cl.duoc.SonidoVivoReact.repository.VentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class VentaService {

    private final VentaRepository ventaRepository;
    private final ClienteRepository clienteRepository;
    private final ProductoRepository productoRepository;

    @Autowired
    public VentaService(VentaRepository ventaRepository,
                        ClienteRepository clienteRepository,
                        ProductoRepository productoRepository) {
        this.ventaRepository = ventaRepository;
        this.clienteRepository = clienteRepository;
        this.productoRepository = productoRepository;
    }

    @Transactional
    public Venta procesarVenta(VentaRequestDTO request) {
        // 1. Validar existencia del cliente
        Cliente cliente = clienteRepository.findById(request.getClienteId())
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con ID: " + request.getClienteId()));

        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new BadRequestException("La venta debe contener al menos un producto.");
        }

        // 2. Instanciar objeto Venta
        Venta venta = new Venta();
        venta.setCliente(cliente);
        venta.setFechaVenta(LocalDateTime.now());

        long totalVenta = 0L;

        // 3. Procesar cada ítem del pedido
        for (VentaRequestDTO.ItemVentaDTO item : request.getItems()) {
            Producto producto = productoRepository.findById(item.getProductoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + item.getProductoId()));

            // Validación de stock disponible
            if (producto.getStock() < item.getCantidad()) {
                throw new ConflictException("Stock insuficiente para el producto: " + producto.getNombre() +
                        ". Stock disponible: " + producto.getStock() + ", solicitado: " + item.getCantidad());
            }

            // Descontar inventario y guardar cambio en BD
            producto.setStock(producto.getStock() - item.getCantidad());
            productoRepository.save(producto);

            // Crear el detalle de la venta
            DetalleVenta detalle = new DetalleVenta();
            detalle.setProducto(producto);
            detalle.setCantidad(item.getCantidad());
            detalle.setPrecioUnitario(producto.getPrecio()); // Foto del precio al momento de comprar

            // Agregar a la relación bidireccional
            venta.agregarDetalle(detalle);


            totalVenta += detalle.getSubtotal();
        }

        venta.setTotal(totalVenta);

        // 4. Guardar Venta (Guarda también sus DetalleVenta gracias a CascadeType.ALL)
        return ventaRepository.save(venta);
    }

    @Transactional(readOnly = true)
    public List<Venta> obtenerVentasPorCliente(Long clienteId) {
        return ventaRepository.findByClienteId(clienteId);
    }

    @Transactional(readOnly = true)
    public Venta obtenerPorId(Long id) {
        return ventaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Venta no encontrada con ID: " + id));
    }
    @Transactional
    public void cancelarOVenta(Long id) {
        Venta venta = obtenerPorId(id);

        // Opcional: Al eliminar/anular la venta, devolver el stock a los productos
        for (DetalleVenta detalle : venta.getDetalles()) {
            Producto producto = detalle.getProducto();
            producto.setStock(producto.getStock() + detalle.getCantidad());
            productoRepository.save(producto);
        }

        // Elimina la venta (y sus detalles en cascada por orphanRemoval = true)
        ventaRepository.delete(venta);
    }
}
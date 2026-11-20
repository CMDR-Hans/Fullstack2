package cl.duoc.SonidoVivoReact.service;

import cl.duoc.SonidoVivoReact.dto.VentaRequestDTO;
import cl.duoc.SonidoVivoReact.exception.ConflictException;
import cl.duoc.SonidoVivoReact.model.Cliente;
import cl.duoc.SonidoVivoReact.model.DetalleVenta;
import cl.duoc.SonidoVivoReact.model.Producto;
import cl.duoc.SonidoVivoReact.model.Venta;
import cl.duoc.SonidoVivoReact.repository.ClienteRepository;
import cl.duoc.SonidoVivoReact.repository.ProductoRepository;
import cl.duoc.SonidoVivoReact.repository.VentaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class VentaServiceTests {

    @Mock
    private VentaRepository ventaRepository;
    @Mock
    private ClienteRepository clienteRepository;
    @Mock
    private ProductoRepository productoRepository;

    private VentaService ventaService;

    @BeforeEach
    void setUp() {
        ventaService = new VentaService(ventaRepository, clienteRepository, productoRepository);
    }

    @Test
    void procesaVentaDescuentaStockYConservaPrecio() {
        Cliente cliente = new Cliente();
        cliente.setId(1L);

        Producto producto = new Producto();
        producto.setId(2L);
        producto.setNombre("Guitarra");
        producto.setPrecio(780000L);
        producto.setStock(10);

        VentaRequestDTO request = new VentaRequestDTO();
        request.setClienteId(1L);
        VentaRequestDTO.ItemVentaDTO item = new VentaRequestDTO.ItemVentaDTO();
        item.setProductoId(2L);
        item.setCantidad(3);
        request.setItems(java.util.List.of(item));

        when(clienteRepository.findById(1L)).thenReturn(Optional.of(cliente));
        when(productoRepository.findById(2L)).thenReturn(Optional.of(producto));
        when(productoRepository.save(any(Producto.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(ventaRepository.save(any(Venta.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Venta resultado = ventaService.procesarVenta(request);

        assertThat(producto.getStock()).isEqualTo(7);
        assertThat(resultado.getTotal()).isEqualTo(2340000L);
        assertThat(resultado.getDetalles()).hasSize(1);
        assertThat(resultado.getDetalles().get(0).getPrecioUnitario()).isEqualTo(780000L);
        verify(ventaRepository).save(resultado);
    }

    @Test
    void rechazaVentaCuandoNoHayStockSuficiente() {
        Cliente cliente = new Cliente();
        cliente.setId(1L);
        Producto producto = new Producto();
        producto.setId(2L);
        producto.setNombre("Bajo");
        producto.setPrecio(320000L);
        producto.setStock(1);

        VentaRequestDTO request = new VentaRequestDTO();
        request.setClienteId(1L);
        VentaRequestDTO.ItemVentaDTO item = new VentaRequestDTO.ItemVentaDTO();
        item.setProductoId(2L);
        item.setCantidad(5);
        request.setItems(java.util.List.of(item));

        when(clienteRepository.findById(1L)).thenReturn(Optional.of(cliente));
        when(productoRepository.findById(2L)).thenReturn(Optional.of(producto));

        assertThatThrownBy(() -> ventaService.procesarVenta(request))
                .isInstanceOf(ConflictException.class)
                .hasMessageContaining("Stock insuficiente")
                .hasMessageContaining("Bajo");
    }

    @Test
    void cancelarVentaRestauraElStock() {
        Producto producto = new Producto();
        producto.setId(2L);
        producto.setNombre("Teclado");
        producto.setPrecio(490000L);
        producto.setStock(4);

        Venta venta = new Venta();
        venta.setId(10L);
        DetalleVenta detalle = new DetalleVenta();
        detalle.setProducto(producto);
        detalle.setCantidad(2);
        detalle.setPrecioUnitario(490000L);
        venta.agregarDetalle(detalle);

        when(ventaRepository.findById(10L)).thenReturn(Optional.of(venta));
        when(productoRepository.save(any(Producto.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ventaService.cancelarOVenta(10L);

        assertThat(producto.getStock()).isEqualTo(6);
        verify(productoRepository).save(producto);
        verify(ventaRepository).delete(venta);
    }
}

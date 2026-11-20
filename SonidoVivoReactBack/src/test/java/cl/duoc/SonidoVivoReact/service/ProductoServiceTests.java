package cl.duoc.SonidoVivoReact.service;

import cl.duoc.SonidoVivoReact.exception.ResourceNotFoundException;
import cl.duoc.SonidoVivoReact.model.Producto;
import cl.duoc.SonidoVivoReact.repository.ProductoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductoServiceTests {

    @Mock
    private ProductoRepository productoRepository;

    private ProductoService productoService;

    @BeforeEach
    void setUp() {
        productoService = new ProductoService(productoRepository);
    }

    @Test
    void devuelveSoloProductosDisponibles() {
        Producto producto = crearProducto(1L, "Guitarra", 5);
        when(productoRepository.findByStockGreaterThan(0)).thenReturn(List.of(producto));

        List<Producto> resultado = productoService.obtenerDisponibles();

        assertThat(resultado).containsExactly(producto);
        verify(productoRepository).findByStockGreaterThan(0);
    }

    @Test
    void creaProductoMedianteRepositorio() {
        Producto producto = crearProducto(null, "Batería", 3);
        when(productoRepository.save(producto)).thenAnswer(invocation -> {
            Producto guardado = invocation.getArgument(0);
            guardado.setId(10L);
            return guardado;
        });

        Producto resultado = productoService.guardar(producto);

        assertThat(resultado.getId()).isEqualTo(10L);
        verify(productoRepository).save(producto);
    }

    @Test
    void actualizaLosDatosDeUnProductoExistente() {
        Producto existente = crearProducto(1L, "Nombre anterior", 2);
        Producto datos = crearProducto(null, "Nombre nuevo", 8);
        datos.setPrecio(500000L);
        datos.setDescripcion("Nueva descripción");
        datos.setImagen("nueva-imagen");

        when(productoRepository.findById(1L)).thenReturn(Optional.of(existente));
        when(productoRepository.save(any(Producto.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Producto resultado = productoService.actualizar(1L, datos);

        assertThat(resultado.getNombre()).isEqualTo("Nombre nuevo");
        assertThat(resultado.getStock()).isEqualTo(8);
        assertThat(resultado.getDescripcion()).isEqualTo("Nueva descripción");
        verify(productoRepository).save(existente);
    }

    @Test
    void lanzaNotFoundCuandoElProductoNoExiste() {
        when(productoRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> productoService.obtenerPorId(99L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Producto no encontrado con ID: 99");
    }

    private Producto crearProducto(Long id, String nombre, Integer stock) {
        Producto producto = new Producto();
        producto.setId(id);
        producto.setNombre(nombre);
        producto.setPrecio(100000L);
        producto.setStock(stock);
        return producto;
    }
}

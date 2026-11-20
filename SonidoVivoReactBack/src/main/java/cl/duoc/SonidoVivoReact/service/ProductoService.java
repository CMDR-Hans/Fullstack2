package cl.duoc.SonidoVivoReact.service;

import cl.duoc.SonidoVivoReact.model.Producto;
import cl.duoc.SonidoVivoReact.exception.ResourceNotFoundException;
import cl.duoc.SonidoVivoReact.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    @Autowired
    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }


    //Transcactional si hay un error en la BD hace un rollback automatico
    @Transactional(readOnly = true)
    public List<Producto> obtenerTodos() {
        return productoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Producto> obtenerDisponibles() {
        return productoRepository.findByStockGreaterThan(0);
    }

    @Transactional(readOnly = true)
    public Producto obtenerPorId(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + id));
    }

    @Transactional
    public Producto guardar(Producto producto) {
        return productoRepository.save(producto);
    }

    @Transactional
    public void eliminarProducto(Long id) {
        // Validar que el producto exista antes de eliminar
        Producto producto = obtenerPorId(id);
        productoRepository.delete(producto);
    }

    @Transactional
    public Producto actualizar(Long id, Producto datos) {
        Producto producto = obtenerPorId(id);
        producto.setNombre(datos.getNombre());
        producto.setPrecio(datos.getPrecio());
        producto.setStock(datos.getStock());
        producto.setDescripcion(datos.getDescripcion());
        producto.setImagen(datos.getImagen());
        return productoRepository.save(producto);
    }
}
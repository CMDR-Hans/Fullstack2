package cl.duoc.SonidoVivoReact.controller;

import cl.duoc.SonidoVivoReact.model.Producto;
import cl.duoc.SonidoVivoReact.service.ProductoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productos")
@Validated
@Tag(name = "Productos", description = "Consulta y administración del catálogo de instrumentos y equipos")
public class ProductoController {

    private final ProductoService productoService;

    @Autowired
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @Operation(summary = "Listar todos los productos", description = "Devuelve el catálogo completo, incluyendo productos sin stock.")
    @ApiResponse(responseCode = "200", description = "Catálogo obtenido correctamente")
    @GetMapping
    public ResponseEntity<List<Producto>> obtenerTodos() {
        return ResponseEntity.ok(productoService.obtenerTodos());
    }

    @Operation(summary = "Listar productos disponibles", description = "Devuelve únicamente productos cuyo stock es mayor que cero. Ideal para cargar el catálogo público.")
    @ApiResponse(responseCode = "200", description = "Productos disponibles obtenidos correctamente")
    @GetMapping("/disponibles")
    public ResponseEntity<List<Producto>> obtenerDisponibles() {
        return ResponseEntity.ok(productoService.obtenerDisponibles());
    }

    @Operation(summary = "Consultar producto por ID", description = "Obtiene el detalle de un producto mediante su identificador.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Producto encontrado"),
        @ApiResponse(responseCode = "404", description = "Producto no encontrado", content = @Content),
        @ApiResponse(responseCode = "400", description = "ID inválido", content = @Content)
    })
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerPorId(
            @Parameter(description = "ID del producto", example = "1", required = true)
            @PathVariable @Positive Long id) {
        return ResponseEntity.ok(productoService.obtenerPorId(id));
    }

    @Operation(summary = "Crear producto", description = "Agrega un producto al catálogo. Precio y stock deben ser valores válidos.")
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Producto creado"),
        @ApiResponse(responseCode = "400", description = "Campos inválidos o incompletos", content = @Content),
        @ApiResponse(responseCode = "409", description = "Conflicto al guardar el producto", content = @Content)
    })
    @PostMapping
    public ResponseEntity<Producto> guardar(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Datos del producto", required = true,
                    content = @Content(schema = @Schema(implementation = Producto.class)))
            @Valid @RequestBody Producto producto) {
        Producto nuevoProducto = productoService.guardar(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoProducto);
    }

    @Operation(summary = "Actualizar producto", description = "Actualiza el nombre, precio, stock, descripción e imagen de un producto.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Producto actualizado"),
        @ApiResponse(responseCode = "400", description = "Datos inválidos", content = @Content),
        @ApiResponse(responseCode = "404", description = "Producto no encontrado", content = @Content)
    })
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizar(
            @Parameter(description = "ID del producto", example = "1", required = true)
            @PathVariable @Positive Long id,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Datos actualizados del producto", required = true)
            @Valid @RequestBody Producto producto) {
        return ResponseEntity.ok(productoService.actualizar(id, producto));
    }

    @Operation(summary = "Eliminar producto", description = "Elimina el producto si no existe una restricción de integridad con ventas u otros registros.")
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Producto eliminado"),
        @ApiResponse(responseCode = "404", description = "Producto no encontrado", content = @Content),
        @ApiResponse(responseCode = "409", description = "El producto está asociado a otros registros", content = @Content)
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @Parameter(description = "ID del producto", example = "1", required = true)
            @PathVariable @Positive Long id) {
        productoService.eliminarProducto(id);
        return ResponseEntity.noContent().build();
    }
}
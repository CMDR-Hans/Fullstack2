package cl.duoc.SonidoVivoReact.controller;

import cl.duoc.SonidoVivoReact.dto.VentaRequestDTO;
import cl.duoc.SonidoVivoReact.model.Venta;
import cl.duoc.SonidoVivoReact.service.VentaService;
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
@RequestMapping("/ventas")
@Validated
@Tag(name = "Ventas", description = "Procesamiento, consulta e cancelación de ventas")
public class VentaController {

    private final VentaService ventaService;

    @Autowired
    public VentaController(VentaService ventaService) {
        this.ventaService = ventaService;
    }

    @Operation(summary = "Procesar una venta", description = "Crea una venta, verifica el stock, desconta las unidades y conserva el precio unitario vigente de cada producto.")
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Venta creada correctamente"),
        @ApiResponse(responseCode = "400", description = "Datos inválidos o cantidad incorrecta", content = @Content),
        @ApiResponse(responseCode = "404", description = "Cliente o producto no encontrado", content = @Content),
        @ApiResponse(responseCode = "409", description = "Stock insuficiente o conflicto de venta", content = @Content)
    })
    @PostMapping
    public ResponseEntity<Venta> procesarVenta(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "ID del cliente e items con producto y cantidad", required = true,
                    content = @Content(schema = @Schema(implementation = VentaRequestDTO.class)))
            @Valid @RequestBody VentaRequestDTO request) {
        Venta ventaRealizada = ventaService.procesarVenta(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ventaRealizada);
    }

    @Operation(summary = "Consultar venta por ID", description = "Devuelve una venta con sus detalles, cantidades y precios unitarios.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Venta encontrada"),
        @ApiResponse(responseCode = "404", description = "Venta no encontrada", content = @Content)
    })
    @GetMapping("/{id}")
    public ResponseEntity<Venta> obtenerPorId(
            @Parameter(description = "ID de la venta", example = "1", required = true)
            @PathVariable @Positive Long id) {
        return ResponseEntity.ok(ventaService.obtenerPorId(id));
    }

    @Operation(summary = "Consultar historial de un cliente", description = "Lista todas las ventas asociadas a un cliente específico.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Historial obtenido correctamente"),
        @ApiResponse(responseCode = "404", description = "Cliente no encontrado", content = @Content)
    })
    @GetMapping("/historial/{clienteId}")
    public ResponseEntity<List<Venta>> obtenerPorCliente(
            @Parameter(description = "ID del cliente", example = "1", required = true)
            @PathVariable @Positive Long clienteId) {
        return ResponseEntity.ok(ventaService.obtenerVentasPorCliente(clienteId));
    }

    @Operation(summary = "Cancelar venta", description = "Cancela la venta y restaura automáticamente el stock de sus productos.")
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Venta cancelada y stock restaurado"),
        @ApiResponse(responseCode = "404", description = "Venta no encontrada", content = @Content),
        @ApiResponse(responseCode = "409", description = "La venta no puede cancelarse", content = @Content)
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelarVenta(
            @Parameter(description = "ID de la venta a cancelar", example = "1", required = true)
            @PathVariable @Positive Long id) {
        ventaService.cancelarOVenta(id);
        return ResponseEntity.noContent().build();
    }
}
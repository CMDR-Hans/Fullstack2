package cl.duoc.SonidoVivoReact.controller;

import cl.duoc.SonidoVivoReact.dto.ClienteRequestDTO;
import cl.duoc.SonidoVivoReact.dto.ClienteResponseDTO;
import cl.duoc.SonidoVivoReact.service.ClienteService;
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
@RequestMapping("/clientes")
@Validated
@Tag(name = "Clientes", description = "Gestión completa de clientes: registro, consulta, actualización y eliminación")
public class ClienteController {

    private final ClienteService clienteService;

    @Autowired
    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @Operation(summary = "Listar clientes", description = "Devuelve todos los clientes registrados, junto con sus correos y teléfonos normalizados.")
    @ApiResponse(responseCode = "200", description = "Lista obtenida correctamente")
    @GetMapping
    public ResponseEntity<List<ClienteResponseDTO>> obtenerTodos() {
        return ResponseEntity.ok(clienteService.obtenerTodos());
    }

    @Operation(summary = "Consultar cliente por ID", description = "Busca un cliente mediante su identificador positivo.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Cliente encontrado"),
        @ApiResponse(responseCode = "404", description = "No existe un cliente con ese ID", content = @Content),
        @ApiResponse(responseCode = "400", description = "El ID no es válido", content = @Content)
    })
    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponseDTO> obtenerPorId(
            @Parameter(description = "Identificador único del cliente", example = "1", required = true)
            @PathVariable @Positive Long id) {
        return ResponseEntity.ok(clienteService.obtenerPorId(id));
    }

    @Operation(summary = "Registrar cliente", description = "Crea un cliente y normaliza el correo a minúsculas y el teléfono al formato chileno E.164.")
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Cliente creado correctamente"),
        @ApiResponse(responseCode = "400", description = "Datos obligatorios o formatos inválidos", content = @Content),
        @ApiResponse(responseCode = "409", description = "El correo ya está registrado", content = @Content)
    })
    @PostMapping
    public ResponseEntity<ClienteResponseDTO> registrar(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Datos del cliente a registrar", required = true,
                    content = @Content(schema = @Schema(implementation = ClienteRequestDTO.class)))
            @Valid @RequestBody ClienteRequestDTO cliente) {
        ClienteResponseDTO clienteGuardado = clienteService.registrarCliente(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteGuardado);
    }

    @Operation(summary = "Actualizar cliente", description = "Reemplaza los datos editables de un cliente existente.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Cliente actualizado"),
        @ApiResponse(responseCode = "400", description = "Datos inválidos", content = @Content),
        @ApiResponse(responseCode = "404", description = "Cliente no encontrado", content = @Content),
        @ApiResponse(responseCode = "409", description = "Correo duplicado", content = @Content)
    })
    @PutMapping("/{id}")
    public ResponseEntity<ClienteResponseDTO> actualizar(
            @Parameter(description = "ID del cliente a actualizar", example = "1", required = true)
            @PathVariable @Positive Long id,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Datos nuevos del cliente", required = true)
            @Valid @RequestBody ClienteRequestDTO cliente) {
        ClienteResponseDTO clienteActualizado = clienteService.actualizarCliente(id, cliente);
        return ResponseEntity.ok(clienteActualizado);
    }

    @Operation(summary = "Eliminar cliente", description = "Elimina permanentemente el cliente identificado por el ID.")
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Cliente eliminado"),
        @ApiResponse(responseCode = "404", description = "Cliente no encontrado", content = @Content)
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @Parameter(description = "ID del cliente a eliminar", example = "1", required = true)
            @PathVariable @Positive Long id) {
        clienteService.eliminarCliente(id);
        return ResponseEntity.noContent().build();
    }
}

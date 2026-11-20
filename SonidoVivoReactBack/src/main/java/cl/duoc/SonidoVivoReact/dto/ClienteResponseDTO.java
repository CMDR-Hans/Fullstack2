package cl.duoc.SonidoVivoReact.dto;

import java.util.List;

public record ClienteResponseDTO(
        Long id,
        String primerNombre,
        String segundoNombre,
        String primerApellido,
        String segundoApellido,
        List<String> emails,
        List<String> telefonos
) {
}

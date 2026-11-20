package cl.duoc.SonidoVivoReact.dto;

import lombok.Data;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.util.List;

@Data
public class VentaRequestDTO {
    @NotNull
    @Positive
    private Long clienteId;

    @NotEmpty
    private List<@NotNull @Valid ItemVentaDTO> items;

    @Data
    public static class ItemVentaDTO {
        @NotNull
        @Positive
        private Long productoId;

        @NotNull
        @Positive
        private Integer cantidad;
    }
}

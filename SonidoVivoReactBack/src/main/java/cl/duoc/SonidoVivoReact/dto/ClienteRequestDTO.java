package cl.duoc.SonidoVivoReact.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class ClienteRequestDTO {

    @NotBlank
    @Size(max = 100)
    private String primerNombre;

    @Size(max = 100)
    private String segundoNombre;

    @NotBlank
    @Size(max = 100)
    private String primerApellido;

    @Size(max = 100)
    private String segundoApellido;

    @NotEmpty
    private List<@NotBlank @Email @Size(max = 254) String> emails;

    private List<@NotBlank @Size(max = 32) String> telefonos;

    public void setEmails(List<String> emails) {
        this.emails = emails == null
                ? null
                : emails.stream()
                        .map(email -> email == null ? null : email.trim())
                        .toList();
    }
}

package cl.duoc.SonidoVivoReact.service;

import cl.duoc.SonidoVivoReact.dto.ClienteRequestDTO;
import cl.duoc.SonidoVivoReact.dto.ClienteResponseDTO;
import cl.duoc.SonidoVivoReact.exception.BadRequestException;
import cl.duoc.SonidoVivoReact.model.Cliente;
import cl.duoc.SonidoVivoReact.repository.ClienteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ClienteServiceTests {

    @Mock
    private ClienteRepository clienteRepository;

    private ClienteService clienteService;

    @BeforeEach
    void setUp() {
        clienteService = new ClienteService(clienteRepository);
    }

    @Test
    void normalizesEmailAndChileanPhone() {
        when(clienteRepository.saveAndFlush(any(Cliente.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        ClienteRequestDTO request = new ClienteRequestDTO();
        request.setPrimerNombre(" Ana ");
        request.setPrimerApellido(" Pérez ");
        request.setEmails(List.of(" Ana.Perez@Example.COM "));
        request.setTelefonos(List.of("9 6123 4567"));

        ClienteResponseDTO result = clienteService.registrarCliente(request);

        assertThat(result.primerNombre()).isEqualTo("Ana");
        assertThat(result.emails()).containsExactly("ana.perez@example.com");
        assertThat(result.telefonos()).containsExactly("+56961234567");
    }

    @Test
    void rejectsDuplicateEmailsAfterNormalization() {
        ClienteRequestDTO request = new ClienteRequestDTO();
        request.setPrimerNombre("Ana");
        request.setPrimerApellido("Pérez");
        request.setEmails(List.of("ana@example.com", " ANA@example.com "));

        assertThatThrownBy(() -> clienteService.registrarCliente(request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("La lista contiene emails duplicados.");

        verifyNoInteractions(clienteRepository);
    }

    @Test
    void rejectsInvalidPhoneNumbers() {
        ClienteRequestDTO request = new ClienteRequestDTO();
        request.setPrimerNombre("Ana");
        request.setPrimerApellido("Pérez");
        request.setEmails(List.of("ana@example.com"));
        request.setTelefonos(List.of("no-es-un-telefono"));

        assertThatThrownBy(() -> clienteService.registrarCliente(request))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("El teléfono no tiene un formato válido.");

        verifyNoInteractions(clienteRepository);
    }
}

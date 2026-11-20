package cl.duoc.SonidoVivoReact.service;

import cl.duoc.SonidoVivoReact.dto.ClienteRequestDTO;
import cl.duoc.SonidoVivoReact.dto.ClienteResponseDTO;
import cl.duoc.SonidoVivoReact.exception.BadRequestException;
import cl.duoc.SonidoVivoReact.model.Cliente;
import cl.duoc.SonidoVivoReact.exception.ResourceNotFoundException;
import cl.duoc.SonidoVivoReact.repository.ClienteRepository;
import com.google.i18n.phonenumbers.NumberParseException;
import com.google.i18n.phonenumbers.PhoneNumberUtil;
import com.google.i18n.phonenumbers.Phonenumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

@Service
public class ClienteService {

    private static final PhoneNumberUtil PHONE_NUMBER_UTIL = PhoneNumberUtil.getInstance();

    private final ClienteRepository clienteRepository;

    @Autowired
    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @Transactional(readOnly = true)
    public List<ClienteResponseDTO> obtenerTodos() {
        return clienteRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ClienteResponseDTO obtenerPorId(Long id) {
        return toResponse(obtenerEntidadPorId(id));
    }

    @Transactional
    public ClienteResponseDTO registrarCliente(ClienteRequestDTO datos) {
        Cliente cliente = new Cliente();
        aplicarDatos(datos, cliente);
        return toResponse(clienteRepository.saveAndFlush(cliente));
    }

    @Transactional
    public ClienteResponseDTO actualizarCliente(Long id, ClienteRequestDTO datos) {
        Cliente cliente = obtenerEntidadPorId(id);
        aplicarDatos(datos, cliente);
        return toResponse(clienteRepository.saveAndFlush(cliente));
    }

    @Transactional
    public void eliminarCliente(Long id) {
        // Validar que el cliente exista antes de eliminar
        Cliente cliente = obtenerEntidadPorId(id);
        clienteRepository.delete(cliente);
    }

    private Cliente obtenerEntidadPorId(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con ID: " + id));
    }

    private void aplicarDatos(ClienteRequestDTO datos, Cliente cliente) {
        cliente.setPrimerNombre(datos.getPrimerNombre().trim());
        cliente.setSegundoNombre(normalizarNombreOpcional(datos.getSegundoNombre()));
        cliente.setPrimerApellido(datos.getPrimerApellido().trim());
        cliente.setSegundoApellido(normalizarNombreOpcional(datos.getSegundoApellido()));

        if (datos.getEmails() == null || datos.getEmails().isEmpty()) {
            throw new BadRequestException("El cliente debe tener al menos un email.");
        }

        List<String> emails = datos.getEmails().stream()
                .map(email -> email.trim().toLowerCase(Locale.ROOT))
                .toList();
        if (new LinkedHashSet<>(emails).size() != emails.size()) {
            throw new BadRequestException("La lista contiene emails duplicados.");
        }

        List<String> telefonos = datos.getTelefonos() == null
                ? List.of()
                : datos.getTelefonos().stream()
                        .map(this::normalizarTelefono)
                        .toList();
        Set<String> telefonosUnicos = new LinkedHashSet<>(telefonos);
        if (telefonosUnicos.size() != telefonos.size()) {
            throw new BadRequestException("La lista contiene teléfonos duplicados.");
        }

        cliente.getEmails().clear();
        cliente.getEmails().addAll(emails);
        cliente.getTelefonos().clear();
        cliente.getTelefonos().addAll(telefonosUnicos);
    }

    private String normalizarNombreOpcional(String nombre) {
        return nombre == null || nombre.isBlank() ? null : nombre.trim();
    }

    private String normalizarTelefono(String telefono) {
        try {
            Phonenumber.PhoneNumber numero = PHONE_NUMBER_UTIL.parse(telefono, "CL");
            if (!PHONE_NUMBER_UTIL.isValidNumber(numero)) {
                throw new BadRequestException("El teléfono no es válido.");
            }
            return PHONE_NUMBER_UTIL.format(numero, PhoneNumberUtil.PhoneNumberFormat.E164);
        } catch (NumberParseException exception) {
            throw new BadRequestException("El teléfono no tiene un formato válido.");
        }
    }

    private ClienteResponseDTO toResponse(Cliente cliente) {
        return new ClienteResponseDTO(
                cliente.getId(),
                cliente.getPrimerNombre(),
                cliente.getSegundoNombre(),
                cliente.getPrimerApellido(),
                cliente.getSegundoApellido(),
                List.copyOf(cliente.getEmails()),
                List.copyOf(cliente.getTelefonos())
        );
    }
}
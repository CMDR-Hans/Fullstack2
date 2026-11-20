package cl.duoc.SonidoVivoReact.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "clientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    @Column(name = "primer_nombre", nullable = false, length = 100)
    private String primerNombre;

    @Size(max = 100)
    @Column(name = "segundo_nombre", length = 100)
    private String segundoNombre;

    @NotBlank
    @Size(max = 100)
    @Column(name = "primer_apellido", nullable = false, length = 100)
    private String primerApellido;

    @Size(max = 100)
    @Column(name = "segundo_apellido", length = 100)
    private String segundoApellido;

    @ElementCollection
    @CollectionTable(
            name = "cliente_emails",
            joinColumns = @JoinColumn(name = "cliente_id"),
            uniqueConstraints = @UniqueConstraint(name = "uk_cliente_emails_email", columnNames = "email"),
            indexes = @Index(name = "idx_cliente_emails_cliente_id", columnList = "cliente_id")
    )
    @Column(name = "email", nullable = false, length = 254)
    private Set<String> emails = new LinkedHashSet<>();

    @ElementCollection
    @CollectionTable(
            name = "cliente_telefonos",
            joinColumns = @JoinColumn(name = "cliente_id"),
            uniqueConstraints = @UniqueConstraint(
                    name = "uk_cliente_telefonos_cliente_telefono",
                    columnNames = {"cliente_id", "telefono"}
            ),
            indexes = @Index(name = "idx_cliente_telefonos_cliente_id", columnList = "cliente_id")
    )
    @Column(name = "telefono", nullable = false, length = 16)
    private Set<String> telefonos = new LinkedHashSet<>();

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Venta> ventas = new ArrayList<>();
}
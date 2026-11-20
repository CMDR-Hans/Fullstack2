package cl.duoc.SonidoVivoReact.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "productos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 150)
    @Column(nullable = false, length = 150)
    private String nombre;

    // Guardado como valor entero (ej: 1990 para $19.90 o 2000 para CLP/USD en centavos)
    @NotNull
    @Positive
    @Column(nullable = false)
    private Long precio;

    @NotNull
    @PositiveOrZero
    @Column(nullable = false)
    private Integer stock;

    @Size(max = 1000)
    @Column(length = 1000)
    private String descripcion;

    @Size(max = 500)
    @Column(name = "imagen", length = 500)
    private String imagen;
}
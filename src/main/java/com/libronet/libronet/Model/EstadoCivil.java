package com.libronet.libronet.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="estado_civil")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EstadoCivil {

    @Id
    @Column(name = "numero_documento")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idNumDocumento;

    @Column(name = "nombre_estado", nullable = false)
    @NotBlank(message = "El estado civil es obligatorio")
    private String nombreEstado;
}

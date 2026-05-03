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
    @Column(name = "id_estado_civil")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEstadoCivil;

    @Column(name = "nombre_estado", nullable = false)
    @NotBlank(message = "El estado civil es obligatorio")
    private String nombreEstado;

    public EstadoCivil(Long estadoCivilId) {
        this.idEstadoCivil = estadoCivilId;
    }
}

package com.libronet.libronet.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import jakarta.validation.constraints.NotNull;


import java.time.LocalDate;

@Entity
@Table(name="funcionarios")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Funcionario {

    @Id
    @Column(name = "numero_documento")
    @NotNull(message = "El nombre es obligatorio")
    private Long numero_documento;

    @Column(name = "nombre_completo", nullable = false)
    @NotBlank(message = "El nombre es obligatorio")
    private String nombreCompleto;

    @Column(name = "fecha_ingreso")
    private LocalDate fechaIngreso;
}

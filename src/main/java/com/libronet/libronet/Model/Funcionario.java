package com.libronet.libronet.Model;

import com.libronet.libronet.dto.FuncionarioRequest;
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
@NoArgsConstructor
@AllArgsConstructor
public class Funcionario {

    @Id
    @Column(name = "numero_documento")
    @NotNull(message = "El número de documento es obligatorio")
    private Long numeroDocumento;

    @Column(name = "nombre_completo", nullable = false)
    @NotBlank(message = "El nombre es obligatorio")
    private String nombreCompleto;

    @Column(name = "fecha_ingreso")
    private LocalDate fechaIngreso;

    public Funcionario(FuncionarioRequest request) {
        this.numeroDocumento = request.getNumeroDocumento();
        this.nombreCompleto = request.getNombreCompleto();
        this.fechaIngreso = request.getFechaIngreso();
    }
}

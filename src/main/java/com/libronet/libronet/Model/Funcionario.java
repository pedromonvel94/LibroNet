package com.libronet.libronet.Model;

import com.libronet.libronet.dto.FuncionarioRequest;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import jakarta.validation.constraints.NotNull;


import java.time.LocalDate;
import java.util.List;

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

    @ManyToOne
    @JoinColumn(name = "estado_civil_id")
    private EstadoCivil estadoCivil;

    @ManyToOne
    @JoinColumn(name = "tipo_doc_id")
    private TipoDocumento tipoDocumento;

    @ManyToOne
    @JoinColumn(name = "formacion_id")
    private FormacionAcademica formacionAcademica;

    @OneToMany(mappedBy = "funcionario")
    private List<GrupoFamiliar> grupoFamiliar;

    public Funcionario(FuncionarioRequest request) {
        this.numeroDocumento = request.getNumeroDocumento();
        this.nombreCompleto = request.getNombreCompleto();
        this.fechaIngreso = request.getFechaIngreso();
        this.estadoCivil = new EstadoCivil(request.getEstadoCivilId());
        this.tipoDocumento = new TipoDocumento(request.getTipoDocId());
        this.formacionAcademica = new FormacionAcademica(request.getFormacionId());
    }
}

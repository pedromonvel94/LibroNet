package com.libronet.libronet.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class FuncionarioResponse {
    private Long numeroDocumento;
    private String tipoDocumento;
    private String nombreCompleto;
    private LocalDate fechaIngreso;
    private String estadoCivil;
    private String formacionAcademica;
    private List<GrupoFamiliarResponse> grupoFamiliar;
}

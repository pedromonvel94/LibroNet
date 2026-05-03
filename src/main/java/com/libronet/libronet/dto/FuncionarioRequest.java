package com.libronet.libronet.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FuncionarioRequest {
    private Long numeroDocumento;
    private String nombreCompleto;
    private LocalDate fechaIngreso;
    private Long estadoCivilId;
    private Long tipoDocId;
    private Long formacionId;
}

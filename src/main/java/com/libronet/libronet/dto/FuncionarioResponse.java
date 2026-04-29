package com.libronet.libronet.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class FuncionarioResponse {
    private Long numeroDocumento;
    private String nombreCompleto;
    private LocalDate fechaIngreso;
}

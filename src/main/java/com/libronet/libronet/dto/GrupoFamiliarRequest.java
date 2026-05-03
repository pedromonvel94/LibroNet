package com.libronet.libronet.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GrupoFamiliarRequest {
    private String nombreFamiliar;
    private String parentesco;
}

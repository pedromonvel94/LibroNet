package com.libronet.libronet.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="tipo_documento")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TipoDocumento {

    @Id
    @Column(name = "id_tipo_doc")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTipoDoc;

    @Column(name = "nombre_tipo", nullable = false)
    @NotBlank(message = "El tipo de documento es obligatorio")
    private String nombreTipoDoc;
}

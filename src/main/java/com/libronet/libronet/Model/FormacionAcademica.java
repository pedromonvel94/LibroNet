package com.libronet.libronet.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="formacion_academica")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormacionAcademica {
    @Id
    @Column(name = "id_formacion")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idNivelFormacion;

    @Column(name = "nivel_formacion", nullable = false)
    @NotBlank(message = "El nivel de formación es obligatorio")
    private String nivelFormacion;

}

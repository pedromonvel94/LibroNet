package com.libronet.libronet.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="grupo_familiar")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GrupoFamiliar {

    @Id
    @Column(name = "id_grupo_familiar")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idGrupoFamiliar;

    @Column(name = "nombre_familiar", nullable = false)
    @NotBlank(message = "El nombre del familiar obligatorio")
    private String nombreFamiliar;

    @Column(name = "parentesco", nullable = false)
    @NotBlank(message = "El parentesco del familiar obligatorio")
    private String parentesco;

    @ManyToOne
    @JoinColumn(name = "funcionario_id")
    private Funcionario funcionario;
}

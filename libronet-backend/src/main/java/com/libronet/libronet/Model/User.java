package com.libronet.libronet.Model;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails { // Implemento UserDetails para que Spring Security pueda usar mi modelo
                                           // directamente al autenticar (Ya que no sabe que campos son los correctos
                                           // para el login, por ejemplo no sabe si mi campo de usuario se llama correo,
                                           // email, login o usuario, ni si mi contraseña se llama contrasena o
                                           // password)

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String nombre;

    @Column(nullable = false, unique = true, length = 150)
    private String correo;

    @Column(nullable = false, length = 250)
    private String contrasena;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Rol rol;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Estado estado;

    // Métodos obligatorios requeridos por Spring Security (metodos que debo cumplir
    // en el contrato de la interfaz UserDetails)

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Devuelvo el rol del usuario como su autoridad. Spring Security usará
        // esto para el control de accesos
        return List.of(new SimpleGrantedAuthority(rol.name()));
    }

    @Override
    public String getPassword() {
        // Le indico a Spring Security que la contraseña encriptada está en mi atributo
        // contrasena
        return this.contrasena;
    }

    @Override
    public String getUsername() {
        // Le indico a Spring Security que el identificador único para el login será mi
        // atributo correo
        return this.correo;
    }

    @Override
    public boolean isAccountNonExpired() {
        // Retorno true porque mi lógica de negocio no requiere que las cuentas expiren
        // por tiempo
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // Retorno true porque no tengo lógica para bloquear cuentas temporalmente
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // Retorno true porque mis credenciales de sesión no expiran
        return true;
    }

    @Override
    public boolean isEnabled() {
        // El usuario solo podrá loguearse e interactuar en la app si su estado está en
        // ACTIVO
        return this.estado == Estado.ACTIVO;
    }

    // Declaro los Enums correspondientes a Rol y Estado como públicos dentro del
    // mismo archivo para simplificar los imports
    public enum Rol {
        ADMIN,
        RRHH
    }

    public enum Estado {
        ACTIVO,
        INACTIVO
    }
}

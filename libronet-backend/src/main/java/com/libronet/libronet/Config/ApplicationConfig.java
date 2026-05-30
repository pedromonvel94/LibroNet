package com.libronet.libronet.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.libronet.libronet.dao.UserDAO;

import lombok.RequiredArgsConstructor;

// En este archivo configuramos cómo se comportan los "beans" (partes) de nuestra
// Aplicación. Es decir, en lugar de usar etiquetas en cada clase, en un solo
// archivo definimos todo lo relacionado con la configuración de la aplicación,
// lo que facilita el mantenimiento y la lectura del código.

// @Configuration le dice a Spring Boot que este archivo no es de lógica de negocio común; es
// un manual de configuración. Por lo que debe leerlo al iniciar la aplicación
@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    // Inyectamos el DAO de usuarios para poder buscarlo en la base de datos
    // cuando alguien intente iniciar sesión
    private final UserDAO userDAO;

    // El AuthenticationManager es el encargado de controlar la autenticación.
    // Cuando alguien quiere iniciar sesión, este metodo coordina todo el proceso:
    // verifica credenciales, consulta al proveedor, etc.
    // Le pedimos a Spring que nos dé el que ya tiene configurado internamente.
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // El AuthenticationProvider es quien realmente verifica si las credenciales
    // son correctas. Usamos DaoAuthenticationProvider porque nuestros usuarios
    // vienen de una base de datos (DAO = Data Access Object).
    @Bean
    public AuthenticationProvider authenticationProvider() {
        // Le pasamos el servicio que carga al usuario desde la BD.
        // En Spring Security 7 ya no existe setUserDetailsService(), va en el
        // constructor.
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(userDetailsService());
        // Le decimos cómo está encriptada la contraseña para que sepa cómo compararla
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    // Define el algoritmo de encriptación de contraseñas.
    // BCrypt es seguro y recomendado: genera un hash diferente cada vez gracias a
    // un
    // "salt" aleatorio, lo que lo hace muy resistente a ataques de fuerza bruta.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Le enseña a Spring Security cómo cargar a un usuario desde nuestra BD
    // usando su correo. Spring lo llama automáticamente al intentar iniciar sesión.
    // Usamos una lambda que recibe el correo y devuelve el usuario encontrado,
    // o lanza una excepción si no existe. El mensaje es genérico a propósito:
    // no queremos revelarle al atacante si el correo existe o no.
    @Bean
    public UserDetailsService userDetailsService() {
        return correo -> userDAO.findByCorreo(correo)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario o contraseña incorrectos"));
    }
}

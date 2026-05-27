package com.libronet.libronet.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;

import lombok.RequiredArgsConstructor;

@Configuration // Le dice a Spring Boot que este archivo no es de lógica de negocio común; es
               // un manual de configuración. Por lo que debe leerlo al iniciar la aplicación
@EnableWebSecurity // Le dice a Spring Boot que habilite toda la infraestructura de seguridad que
                   // trae por defecto (autenticación, autorización, sesiones, etc.)
@RequiredArgsConstructor
public class SecurityConfig {

    /*
     * La security filter chain sirve para tener toda la cadena de filtros
     * de seguridad, donde vamos a trabajar configuracion relacionadas a los
     * enpoints publicos diferenciandolos de los que van a estar protegidos
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authRequest -> authRequest
                        .requestMatchers("/auth/**").permitAll()
                        .anyRequest().authenticated())
                .formLogin(withDefaults())
                .build();
    }
}

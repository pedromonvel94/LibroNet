package com.libronet.libronet.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.libronet.libronet.Jwt.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration // Le dice a Spring Boot que este archivo no es de lógica de negocio común; es
               // un manual de configuración. Por lo que debe leerlo al iniciar la aplicación
@EnableWebSecurity // Le dice a Spring Boot que habilite toda la infraestructura de seguridad que
                   // trae por defecto (autenticación, autorización, sesiones, etc.)
@RequiredArgsConstructor
public class SecurityConfig {

        private final AuthenticationProvider authProvider;

        private final JwtAuthenticationFilter jwtAuthenticationFilter;

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
                                                .requestMatchers("/api/auth/**").permitAll()
                                                .anyRequest().authenticated())
                                .sessionManagement(
                                                sessionManager -> sessionManager
                                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authenticationProvider(authProvider)
                                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                                .build();
        }
}

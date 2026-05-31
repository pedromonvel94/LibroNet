package com.libronet.libronet.Jwt;

import java.io.IOException;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.libronet.libronet.Service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter { // Hereda de esta clase abstracta ya que se utiliza
                                                                    // para crear filtros personalizados, garantizando
                                                                    // que el filtro se ejecute solo 1 vez por cada
                                                                    // solicitud HTTP
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // La idea es obtener el token
        final String token = getTokenFromRequest(request);
        final String correo;
        // verificar si el token existe
        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        correo = jwtService.getCorreoFromToken(token);

        if (correo != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(correo);
            if (jwtService.isTokenValid(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }

    // Este metodo se encarga de obtener el token desde la solicitud HTTP y le
    // pasamos por parametro el request ya que ahi en el encabezado de la solicitud
    // obtendremos el token
    private String getTokenFromRequest(HttpServletRequest request) {

        // Creamos esta variable con la cual accederemos al encabezado de la solicitud
        // HTTP y obtendremos el token
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer")) {
            // Si se cumple la condicion entonces:
            // Aqui lo que hago es obtener del authHeader los caracteres a partir del
            // Bearer, osea despues del caracter 7
            return authHeader.substring(7);
        }

        return null;
    };

}

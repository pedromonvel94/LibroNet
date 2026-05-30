package com.libronet.libronet.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.function.Function;
import io.jsonwebtoken.Claims;

@Service
public class JwtService {
    // Cree el metodo getToken el cual recibe por parametro UserDetails porque es el
    // tipo de dato que se usa en Spring Security para representar al usuario
    // logueado

    // Esta es nuestra clave secreta para firmar y verificar los tokens JWT.
    // Está codificada en Base64 porque la librería JJWT trabaja con bytes, no con texto plano.
    // En un proyecto real, esto debería vivir en application.properties, no aquí directamente.
    private static final String SECRET_KEY = "bGlicm9uZXRfY2xhdmVfc3VwZXJfc2VjcmV0YV9kZXNhcnJvbGxvX3NlZ3Vyb18yMDI0";

    public String getToken(UserDetails user) {
        return getToken(new HashMap<>(), user);
    }

    private String getToken(Map<String, Object> extraClaims, UserDetails user) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Declaro el metodo private Key getSignInKey() el cual se encarga de 
    // decodificar la clave secreta y convertirla a base 64 para poder 
    // firmar y verificar los tokens JWT. Ademas con hmacShaKeyFor() 
    // se crea la instancia de nuestra secret Key
    private Key getSignInKey() {
        // Decodificamos de Base64 a bytes — ese es el formato que JJWT necesita
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        // Creamos la Key usando HMAC-SHA, que corresponde al algoritmo HS256
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Le pasamos el token y nos devuelve el correo (username) del usuario dueño de
    // ese token.
    // Así sabemos quién está haciendo la solicitud sin necesidad de ir a la base de
    // datos.
    public String getUsernameFromToken(String token) {
        return getClaim(token, Claims::getSubject);
    }

    // Verifica que el token sea válido: que pertenezca al usuario correcto y que no haya expirado
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return getExpiration(token).before(new Date());
    }

    // Método auxiliar para obtener la fecha de expiración
    private Date getExpiration(String token) {
        return getClaim(token, Claims::getExpiration);
    }

    // Método genérico para extraer cualquier dato (claim) del token
    // Recibe una función para ser flexible y reutilizable
    private <T> T getClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Desencripta y lee todos los datos guardados dentro del token
    private Claims getAllClaims(String token) {
    return Jwts
        .parserBuilder()
        .setSigningKey(getSignInKey())
        .build()
        .parseClaimsJws(token)
        .getBody();
}

}

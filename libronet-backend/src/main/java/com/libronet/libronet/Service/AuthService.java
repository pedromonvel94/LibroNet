package com.libronet.libronet.Service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.libronet.libronet.Model.User;
import com.libronet.libronet.dao.UserDAO;
import com.libronet.libronet.dto.AuthResponse;
import com.libronet.libronet.dto.LoginRequest;
import com.libronet.libronet.dto.RegisterRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    // Inyecto la dependencia de UserDAO utilizando el constructor
    private final UserDAO userDAO;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    // Aquí iría la lógica para iniciar sesión
    public AuthResponse login(LoginRequest request) {
        return new AuthResponse();
    }

    // Aquí desarrollo la lógica para registrar un nuevo usuario
    public AuthResponse register(RegisterRequest request) {
        // Construyo el objeto Usuario utilizando el patrón Builder.
        // Esto me permite crear el objeto paso a paso y de forma legible.
        User user = User.builder()
                .correo(request.getCorreo())
                .contrasena(request.getContrasena())
                .nombre(request.getNombre())
                .rol(User.Rol.valueOf(request.getRol().toUpperCase()))
                .estado(User.Estado.ACTIVO)
                .build();

        // Llamo al método del DAO para guardar el usuario
        userDAO.save(user);

        // Construyo la respuesta con el token. En el futuro aquí iría la lógica para
        // generar el JWT.
        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();
    }
}

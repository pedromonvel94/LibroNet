package com.libronet.libronet.Service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.libronet.libronet.Model.User;
import com.libronet.libronet.dao.UserDAO;
import com.libronet.libronet.dto.AuthResponse;
import com.libronet.libronet.dto.LoginRequest;
import com.libronet.libronet.dto.RegisterRequest;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    // Inyecto la dependencia de UserDAO utilizando el constructor
    private final UserDAO userDAO;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    //
    public AuthResponse login(LoginRequest request) {
        // Aquí le entregamos al authenticationManager el correo y contraseña que
        // el usuario escribió en el formulario. Él internamente va a la BD, busca
        // al usuario, encripta la contraseña recibida con BCrypt y las compara.
        // Si las credenciales son incorrectas, lanza una excepción aquí mismo y
        // el proceso se detiene
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getCorreo(), request.getContrasena()));
        // Si las credenciales son correctas entonces lo que hago es obtener al correo
        // en la base de datos para posteriormente generar el token. Aqui se usa
        // orElseThrow() porque si no existe el usuario lanza una excepción.
        User user = userDAO.findByCorreo(request.getCorreo()).orElseThrow();
        // Luego obtengo el token llamando al metodo getToken().
        String token = jwtService.getToken(user);
        // Finalmente retorno la respuesta con el token.
        return AuthResponse.builder()
                .token(token)
                .nombre(user.getNombre())
                .rol(user.getRol().name())
                .build();
    }

    // Aquí desarrollo la lógica para registrar un nuevo usuario
    public AuthResponse register(RegisterRequest request) {
        // Construyo el objeto Usuario utilizando el patrón Builder.
        // Esto me permite crear el objeto paso a paso y de forma legible.
        User user = User.builder()
                .correo(request.getCorreo())
                .contrasena(passwordEncoder.encode(request.getContrasena()))
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
                .nombre(user.getNombre())
                .rol(user.getRol().name())
                .build();
    }
}

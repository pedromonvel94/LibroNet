package com.libronet.libronet.Controller;

import com.libronet.libronet.Service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.libronet.libronet.dto.AuthResponse;
import com.libronet.libronet.dto.LoginRequest;
import com.libronet.libronet.dto.RegisterRequest;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping(value = "login")
    // Recibo los datos de inicio de sesión. Uso @RequestBody para que Spring tome
    // el JSON que viene en el cuerpo de la petición y lo transforme automáticamente
    // en mi objeto LoginRequest.
    // Retorno un ResponseEntity porque me permite estructurar y devolver toda la
    // respuesta HTTP (código de estado, cabeceras y cuerpo) de forma controlada al
    // cliente. En este caso, devolverá un AuthResponse.
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        // Devuelvo una respuesta exitosa (código HTTP 200 OK) y entrego una instancia
        // vacía de mi AuthResponse, la cual más adelante configuraré para que lleve el
        // token real del usuario.
        return ResponseEntity.ok(authService.login(request));
    }

    // Configuro este método para que responda únicamente a peticiones HTTP del tipo
    // POST que vayan a la ruta /auth/register.
    @PostMapping(value = "registro")
    // Recibo los datos de registro del usuario. Uso @RequestBody para convertir el
    // JSON recibido en mi objeto estructurado RegisterRequest.
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        // Devuelvo una respuesta exitosa (código HTTP 200 OK) y entrego un AuthResponse
        // vacío, donde luego enviaré el token generado para que el usuario recién
        // registrado quede autenticado inmediatamente.
        return ResponseEntity.ok(authService.register(request));
    }
}

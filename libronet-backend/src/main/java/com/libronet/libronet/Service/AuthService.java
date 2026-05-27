package com.libronet.libronet.Service;

import org.springframework.stereotype.Service;

import com.libronet.libronet.dto.AuthResponse;
import com.libronet.libronet.dto.LoginRequest;
import com.libronet.libronet.dto.RegisterRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    // Aquí iría la lógica para iniciar sesión
    public AuthResponse login(LoginRequest request) {
        return new AuthResponse();
    }

    // Aquí iría la lógica para registrar un nuevo usuario
    public AuthResponse register(RegisterRequest request) {
        return new AuthResponse();
    }
}

package com.libronet.libronet.dao;

import java.util.List;
import java.util.Optional;

import com.libronet.libronet.Model.User;

// Esta interfaz define las operaciones básicas que podemos hacer con la base de datos para los usuarios.
public interface UserDAO {
    // Busca un usuario por su correo. Devuelve un Optional por si el correo no
    // existe en la base de datos.
    Optional<User> findByCorreo(String correo);

    // Busca un usuario usando su ID único.
    User findById(Long id);

    // Obtiene todos los usuarios.
    List<User> findAll();

    // Guarda un usuario.
    void save(User user);

    // Actualiza un usuario existente.
    void update(User user);

    // Elimina un usuario usando su ID único.
    boolean deleteById(Long id);
}

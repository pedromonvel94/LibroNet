package com.libronet.libronet.dao;

import java.util.List;
import java.util.Optional;

import com.libronet.libronet.Model.User;

public interface UserDAO {
    Optional<User> findByCorreo(String correo);

    User findById(Long id);

    List<User> findAll();

    void save(User user);

    void update(User user);

    void deleteById(Long id);
}

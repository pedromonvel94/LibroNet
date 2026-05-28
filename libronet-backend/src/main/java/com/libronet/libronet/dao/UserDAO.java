package com.libronet.libronet.dao;

import java.util.List;

import com.libronet.libronet.Model.User;

public interface UserDAO {
    User findByCorreo(String correo);

    User findById(Long id);

    List<User> findAll();

    void save(User user);

    void update(User user);

    void deleteById(Long id);
}

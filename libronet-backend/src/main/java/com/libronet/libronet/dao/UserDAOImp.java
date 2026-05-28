package com.libronet.libronet.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.libronet.libronet.Model.User;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
public class UserDAOImp implements UserDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<User> findByCorreo(String correo) {
        try {
            return Optional
                    .ofNullable(this.entityManager.createQuery("FROM User u WHERE u.correo = :correo", User.class)
                            .setParameter("correo", correo)
                            .getSingleResultOrNull());
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public User findById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findById'");
    }

    @Override
    public List<User> findAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }

    @Override
    public void save(User user) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }

    @Override
    public void update(User user) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public void deleteById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteById'");
    }

}

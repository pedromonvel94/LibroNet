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
        try {
            return this.entityManager.createQuery("FROM User u WHERE u.id = :id", User.class)
                .setParameter("id", id)
                .getSingleResultOrNull();
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<User> findAll() {
        try {
            return this.entityManager.createQuery("SELECT u FROM User u", User.class)
                .getResultList();
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }

    @Override
    public void save(User user) {
        try {
            this.entityManager.persist(user);
        } catch(Exception e) {
            System.out.println("Error al guardar el usuario: " + e.getMessage());
        }    
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

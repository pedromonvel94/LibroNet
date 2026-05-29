package com.libronet.libronet.dao;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.libronet.libronet.Model.User;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

// La etiqueta @Repository le dice a Spring que esta clase se encargará del acceso a datos (Base de Datos).
@Repository
public class UserDAOImp implements UserDAO {

    // El EntityManager es la herramienta de JPA que nos permite interactuar
    // directamente con las tablas de la Base de Datos
    // Por eso hay que instanciarlo aqui, para poder usarlo en todos los metodos
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<User> findByCorreo(String correo) {
        // Buscamos al usuario por su correo con una consulta JPQL si no existe,
        // devolvemos un opcional vacío
        try {
            return Optional
                    .ofNullable(this.entityManager.createQuery("FROM User u WHERE u.correo = :correo", User.class)
                            .setParameter("correo", correo)
                            .getSingleResultOrNull());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public User findById(Long id) {
        // Usamos el método find nativo de JPA, que es el más rápido para buscar por la
        // llave primaria (ID)
        try {
            return this.entityManager.find(User.class, id);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<User> findAll() {
        // Consultamos a todos los usuarios usando JPQL.
        try {
            return this.entityManager.createQuery("SELECT u FROM User u", User.class)
                    .getResultList();
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }

    @Override
    public void save(User user) {
        // Guardamos físicamente el nuevo usuario en la base de datos usando el metodo
        // nativo de JPA persist()
        try {
            this.entityManager.persist(user);

        } catch (Exception e) {
            System.out.println("Error al guardar el usuario: " + e.getMessage());
        }
    }

    @Override
    public void update(User user) {
        // Actualizamos los datos del usuario en la base de datos usando el metodo
        // nativo de JPA merge()
        try {
            this.entityManager.merge(user);
        } catch (Exception e) {
            System.out.println("Error al actualizar el usuario: " + e.getMessage());
        }
    }

    @Override
    public boolean deleteById(Long id) {
        // Eliminamos el usuario por su ID usando el metodo nativo de JPA remove()
        try {
            User user = this.entityManager.find(User.class, id);

            if (user == null) {
                return false;
            }

            this.entityManager.remove(user);
            return true;

        } catch (Exception e) {
            return false;
        }
    }

}

package com.libronet.libronet.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.libronet.libronet.Model.User;
import com.libronet.libronet.dao.UserDAO;

import lombok.RequiredArgsConstructor;

// Esta clase expone la API para que el ADMIN pueda listar, actualizar y dar de baja usuarios.
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Transactional // Garantiza que los cambios a la base de datos se ejecuten dentro de una transacción activa
public class UserController {

    private final UserDAO userDAO;

    // Obtiene la lista de todos los usuarios registrados
    @GetMapping
    public ResponseEntity<List<User>> listar() {
        return ResponseEntity.ok(userDAO.findAll());
    }

    // Actualiza los datos de un usuario existente (como su rol o estado de actividad)
    @PutMapping("/{id}")
    public ResponseEntity<Void> actualizar(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userDAO.findById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        // Actualizamos los atributos editables por el administrador
        user.setNombre(userDetails.getNombre());
        user.setCorreo(userDetails.getCorreo());
        user.setRol(userDetails.getRol());
        user.setEstado(userDetails.getEstado());

        userDAO.update(user);
        return ResponseEntity.ok().build();
    }

    // Elimina de forma lógica un usuario cambiando su estado a INACTIVO
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        boolean eliminado = userDAO.deleteById(id);
        return eliminado ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}

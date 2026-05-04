package com.libronet.libronet.Controller;

import com.libronet.libronet.Model.EstadoCivil;
import com.libronet.libronet.Model.FormacionAcademica;
import com.libronet.libronet.Model.TipoDocumento;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * CatalogoController
 *
 * Expone los catálogos de tablas auxiliares para que el
 * frontend pueda poblar los selects del formulario.
 *
 * Endpoints:
 *   GET /api/catalogos/estados-civiles
 *   GET /api/catalogos/tipos-documento
 *   GET /api/catalogos/formaciones
 */
@RestController
@RequestMapping("/api/catalogos")
@RequiredArgsConstructor
public class CatalogoController {

    @PersistenceContext
    private EntityManager entityManager;

    @GetMapping("/estados-civiles")
    public ResponseEntity<List<Map<String, Object>>> estadosCiviles() {
        List<EstadoCivil> lista = entityManager
                .createQuery("FROM EstadoCivil", EstadoCivil.class)
                .getResultList();

        List<Map<String, Object>> result = lista.stream()
                .map(e -> Map.<String, Object>of(
                        "id",     e.getIdEstadoCivil(),
                        "nombre", e.getNombreEstado()
                ))
                .toList();

        return ResponseEntity.ok(result);
    }

    @GetMapping("/tipos-documento")
    public ResponseEntity<List<Map<String, Object>>> tiposDocumento() {
        List<TipoDocumento> lista = entityManager
                .createQuery("FROM TipoDocumento", TipoDocumento.class)
                .getResultList();

        List<Map<String, Object>> result = lista.stream()
                .map(t -> Map.<String, Object>of(
                        "id",     t.getIdTipoDoc(),
                        "nombre", t.getNombreTipoDoc()
                ))
                .toList();

        return ResponseEntity.ok(result);
    }

    @GetMapping("/formaciones")
    public ResponseEntity<List<Map<String, Object>>> formaciones() {
        List<FormacionAcademica> lista = entityManager
                .createQuery("FROM FormacionAcademica", FormacionAcademica.class)
                .getResultList();

        List<Map<String, Object>> result = lista.stream()
                .map(f -> Map.<String, Object>of(
                        "id",     f.getIdNivelFormacion(),
                        "nombre", f.getNivelFormacion()
                ))
                .toList();

        return ResponseEntity.ok(result);
    }
}

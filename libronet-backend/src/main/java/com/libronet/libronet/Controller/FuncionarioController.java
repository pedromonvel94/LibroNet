package com.libronet.libronet.Controller;

import com.libronet.libronet.Service.FuncionarioService;
import com.libronet.libronet.dto.FuncionarioRequest;
import com.libronet.libronet.dto.FuncionarioResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/funcionarios")
@RequiredArgsConstructor
public class FuncionarioController {

    private final FuncionarioService funcionarioService;

    @GetMapping
    public ResponseEntity<List<FuncionarioResponse>> listar() {
        return ResponseEntity.ok(funcionarioService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FuncionarioResponse> obtener(@PathVariable Long id) {
        return funcionarioService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Void> guardar(@RequestBody FuncionarioRequest request) {
        funcionarioService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> actualizar(@PathVariable Long id, @RequestBody FuncionarioRequest request) {
        boolean actualizado = funcionarioService.update(id, request);
        return actualizado ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        boolean eliminado = funcionarioService.deleteById(id);
        return eliminado ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
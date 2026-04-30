package com.libronet.libronet.Controller;

import com.libronet.libronet.dao.FuncionarioDAO;
import com.libronet.libronet.dto.FuncionarioResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController {

    @Autowired
    private FuncionarioDAO funcionarioDAO;

    @GetMapping("/{id}")
    public FuncionarioResponse obtener(@PathVariable Long id) {
        return funcionarioDAO.findById(id);
    }
}

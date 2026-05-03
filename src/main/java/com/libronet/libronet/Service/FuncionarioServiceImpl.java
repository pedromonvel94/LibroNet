package com.libronet.libronet.Service;

import com.libronet.libronet.Model.Funcionario;
import com.libronet.libronet.dao.FuncionarioDAO;
import com.libronet.libronet.dto.FuncionarioRequest;
import com.libronet.libronet.dto.FuncionarioResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FuncionarioServiceImpl implements FuncionarioService {
    private final FuncionarioDAO funcionarioDAO;

    @Override
    public Optional<FuncionarioResponse> findById(Long numeroDocumento) {
        FuncionarioResponse response = this.funcionarioDAO.findById(numeroDocumento);
        return response == null ? Optional.empty() : Optional.of(response);
    }

    @Override
    public List<FuncionarioResponse> findAll() {
        return this.funcionarioDAO.findAll();
    }

    @Override
    public void save(FuncionarioRequest request) {

    }

    @Override
    public boolean update(Long numeroDocumento, FuncionarioRequest request) {
        return false;
    }

    @Override
    public boolean deleteById(Long numeroDocumento) {
        return false;
    }
}

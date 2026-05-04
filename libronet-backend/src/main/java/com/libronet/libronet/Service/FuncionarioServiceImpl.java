package com.libronet.libronet.Service;

import com.libronet.libronet.dao.FuncionarioDAO;
import com.libronet.libronet.dto.FuncionarioRequest;
import com.libronet.libronet.dto.FuncionarioResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FuncionarioServiceImpl implements FuncionarioService {

    private final FuncionarioDAO funcionarioDAO;

    @Override
    @Transactional   // ← necesario para cargar grupoFamiliar (lazy)
    public Optional<FuncionarioResponse> findById(Long numeroDocumento) {
        FuncionarioResponse response = this.funcionarioDAO.findById(numeroDocumento);
        return response == null ? Optional.empty() : Optional.of(response);
    }

    @Override
    @Transactional   // ← necesario para cargar grupoFamiliar (lazy)
    public List<FuncionarioResponse> findAll() {
        return this.funcionarioDAO.findAll();
    }

    @Override
    @Transactional
    public void save(FuncionarioRequest request) {
        this.funcionarioDAO.save(request);
    }

    @Override
    @Transactional
    public boolean update(Long numeroDocumento, FuncionarioRequest request) {
        return this.funcionarioDAO.update(numeroDocumento, request);
    }

    @Override
    @Transactional
    public boolean deleteById(Long numeroDocumento) {
        return this.funcionarioDAO.deleteById(numeroDocumento);
    }
}

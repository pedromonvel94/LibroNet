package com.libronet.libronet.Service;

import com.libronet.libronet.dto.FuncionarioRequest;
import com.libronet.libronet.dto.FuncionarioResponse;

import java.util.List;
import java.util.Optional;

public interface FuncionarioService {
    Optional<FuncionarioResponse> findById(Long numeroDocumento);
    List<FuncionarioResponse> findAll();
    void save(FuncionarioRequest request);
    boolean update(Long numeroDocumento, FuncionarioRequest request);
    boolean deleteById(Long numeroDocumento);
}

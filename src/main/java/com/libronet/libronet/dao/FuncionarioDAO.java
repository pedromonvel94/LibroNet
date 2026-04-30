package com.libronet.libronet.dao;

import com.libronet.libronet.dto.FuncionarioRequest;
import com.libronet.libronet.dto.FuncionarioResponse;

import java.util.List;

public interface FuncionarioDAO {
    FuncionarioResponse findById(Long numeroDocumento);
    List<FuncionarioResponse> findAll();
    void save(FuncionarioRequest request);
    boolean update(Long numeroDocumento, FuncionarioRequest request);
    boolean deleteById(Long numeroDocumento);
}

package com.libronet.libronet.dao;

import com.libronet.libronet.Model.EstadoCivil;
import com.libronet.libronet.Model.FormacionAcademica;
import com.libronet.libronet.Model.Funcionario;
import com.libronet.libronet.Model.TipoDocumento;
import com.libronet.libronet.dto.FuncionarioRequest;
import com.libronet.libronet.dto.FuncionarioResponse;
import com.libronet.libronet.dto.GrupoFamiliarResponse;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FuncionarioDAOImp implements FuncionarioDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public FuncionarioResponse findById(Long numeroDocumento) {
        try {
            Funcionario f = this.entityManager.find(Funcionario.class, numeroDocumento);

            if (f == null)
                return null;

            List<GrupoFamiliarResponse> familiares = f.getGrupoFamiliar()
                    .stream()
                    .map(gf -> new GrupoFamiliarResponse(
                            gf.getNombreFamiliar(),
                            gf.getParentesco()))
                    .toList();

            return new FuncionarioResponse(
                    f.getNumeroDocumento(),
                    f.getTipoDocumento().getNombreTipoDoc(),
                    f.getNombreCompleto(),
                    f.getFechaIngreso(),
                    f.getEstadoCivil().getNombreEstado(),
                    f.getFormacionAcademica().getNivelFormacion(),
                    familiares);
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener el funcionario: " + numeroDocumento, e);
        }
    }

    @Override
    public List<FuncionarioResponse> findAll() {
        List<Funcionario> funcionarios = this.entityManager
                .createQuery("FROM Funcionario f", Funcionario.class)
                .getResultList();

        return funcionarios.stream()
                .map(f -> {
                    List<GrupoFamiliarResponse> familiares = f.getGrupoFamiliar()
                            .stream()
                            .map(gf -> new GrupoFamiliarResponse(
                                    gf.getNombreFamiliar(),
                                    gf.getParentesco()))
                            .toList();

                    return new FuncionarioResponse(
                            f.getNumeroDocumento(),
                            f.getTipoDocumento().getNombreTipoDoc(),
                            f.getNombreCompleto(),
                            f.getFechaIngreso(),
                            f.getEstadoCivil().getNombreEstado(),
                            f.getFormacionAcademica().getNivelFormacion(),
                            familiares);
                })
                .toList();
    }

    @Override
    public void save(FuncionarioRequest request) {
        Funcionario funcionario = new Funcionario(request);

        this.entityManager.persist(funcionario);
    }

    @Override
    public boolean update(Long numeroDocumento, FuncionarioRequest request) {
        Funcionario funcionario = this.entityManager.find(Funcionario.class, numeroDocumento);

        if (funcionario == null) {
            return false;
        }

        funcionario.setNombreCompleto(request.getNombreCompleto());
        funcionario.setFechaIngreso(request.getFechaIngreso());
        funcionario.setEstadoCivil(new EstadoCivil(request.getEstadoCivilId()));
        funcionario.setTipoDocumento(new TipoDocumento(request.getTipoDocId()));
        funcionario.setFormacionAcademica(new FormacionAcademica(request.getFormacionId()));

        this.entityManager.merge(funcionario);

        return true;
    }

    @Override
    public boolean deleteById(Long numeroDocumento) {
        Funcionario funcionario = this.entityManager.find(Funcionario.class, numeroDocumento);

        if (funcionario == null) {
            return false;
        }

        this.entityManager.remove(funcionario);

        return true;
    }
}

package com.libronet.libronet.dao;

import com.libronet.libronet.Model.Funcionario;
import com.libronet.libronet.dto.FuncionarioRequest;
import com.libronet.libronet.dto.FuncionarioResponse;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FuncionarioDAOImp implements FuncionarioDAO{
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public FuncionarioResponse findById(Long numeroDocumento) {
        String jpql = "SELECT new com.libronet.libronet.dto.FuncionarioResponse(f.numeroDocumento, f.tipoDocumento.nombreTipoDoc, f.nombreCompleto, f.fechaIngreso, f.estadoCivil.nombreEstado, f.formacionAcademica.nivelFormacion) FROM Funcionario f WHERE f.numeroDocumento = :numeroDocumento";

        System.out.println("JPQL: " + jpql);

        try {
            return this.entityManager.createQuery(jpql, FuncionarioResponse.class)
                    .setParameter("numeroDocumento", numeroDocumento)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }catch (Exception e){
            throw new RuntimeException("Error al obtener el funcionario con número de documento: " + numeroDocumento, e);
        }
    }

    @Override
    public List<FuncionarioResponse> findAll() {
        String jpql = "SELECT new com.libronet.libronet.dto.FuncionarioResponse(f.numeroDocumento, f.tipoDocumento.nombreTipoDoc, f.nombreCompleto, f.fechaIngreso, f.estadoCivil.nombreEstado, f.formacionAcademica.nivelFormacion) FROM Funcionario f";

        return this.entityManager.createQuery(jpql, FuncionarioResponse.class)
                .getResultList();
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

package com.Granja.Back.DAO.Impl;

import com.Granja.Back.DAO.PorcinoDAO;
import com.Granja.Back.Entities.Porcino;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * Implementación DAO para Porcino usando JPA/Hibernate con PostgreSQL
 */
@Repository
@Transactional
public class PorcinoDAOImpl implements PorcinoDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Porcino save(Porcino porcino) {
        if (existsByIdentificacion(porcino.getIdentificacion())) {
            return entityManager.merge(porcino);
        } else {
            entityManager.persist(porcino);
            return porcino;
        }
    }

    @Override
    public Optional<Porcino> findByIdentificacion(String identificacion) {
        try {
            TypedQuery<Porcino> query = entityManager.createQuery(
                "SELECT p FROM Porcino p WHERE p.identificacion = :identificacion", Porcino.class);
            query.setParameter("identificacion", identificacion);
            Porcino porcino = query.getSingleResult();
            return Optional.of(porcino);
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }

    @Override
    public List<Porcino> findAll() {
        TypedQuery<Porcino> query = entityManager.createQuery(
            "SELECT p FROM Porcino p ORDER BY p.identificacion", Porcino.class);
        return query.getResultList();
    }

    @Override
    public List<Porcino> findByClienteCedula(String cedula) {
        TypedQuery<Porcino> query = entityManager.createQuery(
            "SELECT p FROM Porcino p WHERE p.cliente.cedula = :cedula", Porcino.class);
        query.setParameter("cedula", cedula);
        return query.getResultList();
    }

    @Override
    public Porcino update(Porcino porcino) {
        return entityManager.merge(porcino);
    }

    @Override
    public boolean deleteByIdentificacion(String identificacion) {
        try {
            Porcino porcino = entityManager.find(Porcino.class, identificacion);
            if (porcino != null) {
                entityManager.remove(porcino);
                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean existsByIdentificacion(String identificacion) {
        TypedQuery<Long> query = entityManager.createQuery(
            "SELECT COUNT(p) FROM Porcino p WHERE p.identificacion = :identificacion", Long.class);
        query.setParameter("identificacion", identificacion);
        return query.getSingleResult() > 0;
    }

    @Override
    public long count() {
        TypedQuery<Long> query = entityManager.createQuery(
            "SELECT COUNT(p) FROM Porcino p", Long.class);
        return query.getSingleResult();
    }

    @Override
    public Double getAverageWeight() {
        TypedQuery<Double> query = entityManager.createQuery(
            "SELECT AVG(p.peso) FROM Porcino p", Double.class);
        Double result = query.getSingleResult();
        return result != null ? result : 0.0;
    }
}

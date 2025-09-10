package com.Granja.Back.DAO.Impl;

import com.Granja.Back.DAO.AlimentacionDAO;
import com.Granja.Back.Entities.Alimentacion;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * Implementación DAO para Alimentacion usando JPA/Hibernate con PostgreSQL
 */
@Repository
@Transactional
public class AlimentacionDAOImpl implements AlimentacionDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Alimentacion save(Alimentacion alimentacion) {
        if (existsByTipo(alimentacion.getTipo())) {
            return entityManager.merge(alimentacion);
        } else {
            entityManager.persist(alimentacion);
            return alimentacion;
        }
    }

    @Override
    public Optional<Alimentacion> findByTipo(Integer tipo) {
        try {
            TypedQuery<Alimentacion> query = entityManager.createQuery(
                "SELECT a FROM Alimentacion a WHERE a.tipo = :tipo", Alimentacion.class);
            query.setParameter("tipo", tipo);
            Alimentacion alimentacion = query.getSingleResult();
            return Optional.of(alimentacion);
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }

    @Override
    public List<Alimentacion> findAll() {
        TypedQuery<Alimentacion> query = entityManager.createQuery(
            "SELECT a FROM Alimentacion a ORDER BY a.tipo", Alimentacion.class);
        return query.getResultList();
    }

    @Override
    public Alimentacion update(Alimentacion alimentacion) {
        return entityManager.merge(alimentacion);
    }

    @Override
    public boolean deleteByTipo(Integer tipo) {
        try {
            Alimentacion alimentacion = entityManager.find(Alimentacion.class, tipo);
            if (alimentacion != null) {
                entityManager.remove(alimentacion);
                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean existsByTipo(Integer tipo) {
        TypedQuery<Long> query = entityManager.createQuery(
            "SELECT COUNT(a) FROM Alimentacion a WHERE a.tipo = :tipo", Long.class);
        query.setParameter("tipo", tipo);
        return query.getSingleResult() > 0;
    }

    @Override
    public long count() {
        TypedQuery<Long> query = entityManager.createQuery(
            "SELECT COUNT(a) FROM Alimentacion a", Long.class);
        return query.getSingleResult();
    }
}

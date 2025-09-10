package com.Granja.Back.DAO.Impl;

import com.Granja.Back.DAO.ClienteDAO;
import com.Granja.Back.Entities.Cliente;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * Implementación DAO para Cliente usando JPA/Hibernate con PostgreSQL
 */
@Repository
@Transactional
public class ClienteDAOImpl implements ClienteDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Cliente save(Cliente cliente) {
        if (existsByCedula(cliente.getCedula())) {
            return entityManager.merge(cliente);
        } else {
            entityManager.persist(cliente);
            return cliente;
        }
    }

    @Override
    public Optional<Cliente> findByCedula(String cedula) {
        try {
            TypedQuery<Cliente> query = entityManager.createQuery(
                "SELECT c FROM Cliente c WHERE c.cedula = :cedula", Cliente.class);
            query.setParameter("cedula", cedula);
            Cliente cliente = query.getSingleResult();
            return Optional.of(cliente);
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }

    @Override
    public List<Cliente> findAll() {
        TypedQuery<Cliente> query = entityManager.createQuery(
            "SELECT c FROM Cliente c ORDER BY c.nombre", Cliente.class);
        return query.getResultList();
    }

    @Override
    public Cliente update(Cliente cliente) {
        return entityManager.merge(cliente);
    }

    @Override
    public boolean deleteByCedula(String cedula) {
        try {
            Cliente cliente = entityManager.find(Cliente.class, cedula);
            if (cliente != null) {
                entityManager.remove(cliente);
                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean existsByCedula(String cedula) {
        TypedQuery<Long> query = entityManager.createQuery(
            "SELECT COUNT(c) FROM Cliente c WHERE c.cedula = :cedula", Long.class);
        query.setParameter("cedula", cedula);
        return query.getSingleResult() > 0;
    }

    @Override
    public long count() {
        TypedQuery<Long> query = entityManager.createQuery(
            "SELECT COUNT(c) FROM Cliente c", Long.class);
        return query.getSingleResult();
    }
}

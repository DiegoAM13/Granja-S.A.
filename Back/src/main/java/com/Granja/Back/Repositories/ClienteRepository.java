package com.Granja.Back.Repositories;

import com.Granja.Back.Entities.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, String> {
    boolean existsById(String Id);

    Optional<Cliente> findById(String cedula);
}

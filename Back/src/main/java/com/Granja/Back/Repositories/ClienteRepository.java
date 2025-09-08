package com.Granja.Back.Repositories;

import ch.qos.logback.core.net.server.Client;
import com.Granja.Back.Entities.Alimentacion;
import com.Granja.Back.Entities.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, String> {
    boolean existsById(String Id);

    Optional<Cliente> findById(String cedula);
}

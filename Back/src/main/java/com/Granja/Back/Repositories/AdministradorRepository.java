package com.Granja.Back.Repositories;

import com.Granja.Back.Entities.Administrador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdministradorRepository extends JpaRepository<Administrador, Long> {

    boolean existsByUsuario (String usuario);


    Optional<Administrador> findByUsuario(String usuario);
}

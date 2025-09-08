package com.Granja.Back.Repositories;

import com.Granja.Back.Entities.Alimentacion;
import com.Granja.Back.Entities.Porcino;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PorcinoRepository extends JpaRepository<Porcino, String> {

    boolean existsByIdentificacion(String identificacion);

    Optional<Porcino> findByIdentificacion(String identificacion);
}

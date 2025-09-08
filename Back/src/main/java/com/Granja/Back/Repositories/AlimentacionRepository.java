package com.Granja.Back.Repositories;

import com.Granja.Back.Entities.Alimentacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlimentacionRepository extends JpaRepository<Alimentacion, Integer> {

    boolean existsByTipo(Integer tipo);

    Optional<Alimentacion> findByTipo(Integer tipo);


}

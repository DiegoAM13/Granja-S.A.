package com.Granja.Back.Repositories;

import com.Granja.Back.Entities.Porcino;
import com.Granja.Back.Entities.Raza;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RazaRepository extends JpaRepository<Raza, Integer> {



    boolean existsById(Integer id);

    boolean existsByraza(String raza);

    Optional<Raza> findById(Integer id);


}

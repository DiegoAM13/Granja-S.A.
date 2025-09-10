package com.Granja.Back.DAO;

import com.Granja.Back.Entities.Porcino;
import java.util.List;
import java.util.Optional;

/**
 * Interface DAO para Porcino - Patrón DAO para acceso a base de datos PostgreSQL
 */
public interface PorcinoDAO {
    
    /**
     * Guardar un porcino en la base de datos
     * @param porcino Porcino a guardar
     * @return Porcino guardado
     */
    Porcino save(Porcino porcino);
    
    /**
     * Buscar porcino por identificación
     * @param identificacion Identificación del porcino
     * @return Optional con el porcino si existe
     */
    Optional<Porcino> findByIdentificacion(String identificacion);
    
    /**
     * Obtener todos los porcinos
     * @return Lista de todos los porcinos
     */
    List<Porcino> findAll();
    
    /**
     * Buscar porcinos por cédula del cliente
     * @param cedula Cédula del cliente
     * @return Lista de porcinos del cliente
     */
    List<Porcino> findByClienteCedula(String cedula);
    
    /**
     * Actualizar un porcino existente
     * @param porcino Porcino con datos actualizados
     * @return Porcino actualizado
     */
    Porcino update(Porcino porcino);
    
    /**
     * Eliminar porcino por identificación
     * @param identificacion Identificación del porcino a eliminar
     * @return true si se eliminó correctamente
     */
    boolean deleteByIdentificacion(String identificacion);
    
    /**
     * Verificar si existe un porcino con la identificación dada
     * @param identificacion Identificación a verificar
     * @return true si existe
     */
    boolean existsByIdentificacion(String identificacion);
    
    /**
     * Contar total de porcinos
     * @return Número total de porcinos
     */
    long count();
    
    /**
     * Calcular peso promedio de todos los porcinos
     * @return Peso promedio
     */
    Double getAverageWeight();
}

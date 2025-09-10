package com.Granja.Back.DAO;

import com.Granja.Back.Entities.Alimentacion;
import java.util.List;
import java.util.Optional;

/**
 * Interface DAO para Alimentacion - Patrón DAO para acceso a base de datos PostgreSQL
 */
public interface AlimentacionDAO {
    
    /**
     * Guardar una alimentación en la base de datos
     * @param alimentacion Alimentación a guardar
     * @return Alimentación guardada
     */
    Alimentacion save(Alimentacion alimentacion);
    
    /**
     * Buscar alimentación por tipo
     * @param tipo Tipo de alimentación
     * @return Optional con la alimentación si existe
     */
    Optional<Alimentacion> findByTipo(Integer tipo);
    
    /**
     * Obtener todas las alimentaciones
     * @return Lista de todas las alimentaciones
     */
    List<Alimentacion> findAll();
    
    /**
     * Actualizar una alimentación existente
     * @param alimentacion Alimentación con datos actualizados
     * @return Alimentación actualizada
     */
    Alimentacion update(Alimentacion alimentacion);
    
    /**
     * Eliminar alimentación por tipo
     * @param tipo Tipo de alimentación a eliminar
     * @return true si se eliminó correctamente
     */
    boolean deleteByTipo(Integer tipo);
    
    /**
     * Verificar si existe una alimentación con el tipo dado
     * @param tipo Tipo a verificar
     * @return true si existe
     */
    boolean existsByTipo(Integer tipo);
    
    /**
     * Contar total de alimentaciones
     * @return Número total de alimentaciones
     */
    long count();
}

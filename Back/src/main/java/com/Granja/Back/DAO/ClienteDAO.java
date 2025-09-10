package com.Granja.Back.DAO;

import com.Granja.Back.Entities.Cliente;
import java.util.List;
import java.util.Optional;

/**
 * Interface DAO para Cliente - Patrón DAO para acceso a base de datos PostgreSQL
 */
public interface ClienteDAO {
    
    /**
     * Guardar un cliente en la base de datos
     * @param cliente Cliente a guardar
     * @return Cliente guardado
     */
    Cliente save(Cliente cliente);
    
    /**
     * Buscar cliente por cédula
     * @param cedula Cédula del cliente
     * @return Optional con el cliente si existe
     */
    Optional<Cliente> findByCedula(String cedula);
    
    /**
     * Obtener todos los clientes
     * @return Lista de todos los clientes
     */
    List<Cliente> findAll();
    
    /**
     * Actualizar un cliente existente
     * @param cliente Cliente con datos actualizados
     * @return Cliente actualizado
     */
    Cliente update(Cliente cliente);
    
    /**
     * Eliminar cliente por cédula
     * @param cedula Cédula del cliente a eliminar
     * @return true si se eliminó correctamente
     */
    boolean deleteByCedula(String cedula);
    
    /**
     * Verificar si existe un cliente con la cédula dada
     * @param cedula Cédula a verificar
     * @return true si existe
     */
    boolean existsByCedula(String cedula);
    
    /**
     * Contar total de clientes
     * @return Número total de clientes
     */
    long count();
}

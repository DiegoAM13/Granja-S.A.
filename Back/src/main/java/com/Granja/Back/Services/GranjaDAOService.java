package com.Granja.Back.Services;

import com.Granja.Back.DAO.ClienteDAO;
import com.Granja.Back.DAO.PorcinoDAO;
import com.Granja.Back.DAO.AlimentacionDAO;
import com.Granja.Back.Entities.Cliente;
import com.Granja.Back.Entities.Porcino;
import com.Granja.Back.Entities.Alimentacion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Servicio que utiliza el patrón DAO para acceder a la base de datos PostgreSQL 'granja'
 * Demuestra el uso de DAOs para operaciones de base de datos
 */
@Service
public class GranjaDAOService {

    @Autowired
    private ClienteDAO clienteDAO;
    
    @Autowired
    private PorcinoDAO porcinoDAO;
    
    @Autowired
    private AlimentacionDAO alimentacionDAO;

    // ================ OPERACIONES CON CLIENTES ================
    
    /**
     * Obtener todos los clientes usando DAO
     */
    public List<Cliente> obtenerTodosLosClientesDAO() {
        return clienteDAO.findAll();
    }
    
    /**
     * Buscar cliente por cédula usando DAO
     */
    public Optional<Cliente> buscarClientePorCedulaDAO(String cedula) {
        return clienteDAO.findByCedula(cedula);
    }
    
    /**
     * Guardar cliente usando DAO
     */
    public Cliente guardarClienteDAO(Cliente cliente) {
        return clienteDAO.save(cliente);
    }
    
    /**
     * Eliminar cliente usando DAO
     */
    public boolean eliminarClienteDAO(String cedula) {
        return clienteDAO.deleteByCedula(cedula);
    }

    // ================ OPERACIONES CON PORCINOS ================
    
    /**
     * Obtener todos los porcinos usando DAO
     */
    public List<Porcino> obtenerTodosLosPorcinosDAO() {
        return porcinoDAO.findAll();
    }
    
    /**
     * Buscar porcino por identificación usando DAO
     */
    public Optional<Porcino> buscarPorcinoPorIdentificacionDAO(String identificacion) {
        return porcinoDAO.findByIdentificacion(identificacion);
    }
    
    /**
     * Buscar porcinos de un cliente usando DAO
     */
    public List<Porcino> buscarPorcinosPorClienteDAO(String cedula) {
        return porcinoDAO.findByClienteCedula(cedula);
    }
    
    /**
     * Guardar porcino usando DAO
     */
    public Porcino guardarPorcinoDAO(Porcino porcino) {
        return porcinoDAO.save(porcino);
    }
    
    /**
     * Calcular peso promedio usando DAO
     */
    public Double calcularPesoPromedioDAO() {
        return porcinoDAO.getAverageWeight();
    }

    // ================ OPERACIONES CON ALIMENTACIÓN ================
    
    /**
     * Obtener todas las alimentaciones usando DAO
     */
    public List<Alimentacion> obtenerTodasLasAlimentacionesDAO() {
        return alimentacionDAO.findAll();
    }
    
    /**
     * Buscar alimentación por tipo usando DAO
     */
    public Optional<Alimentacion> buscarAlimentacionPorTipoDAO(Integer tipo) {
        return alimentacionDAO.findByTipo(tipo);
    }
    
    /**
     * Guardar alimentación usando DAO
     */
    public Alimentacion guardarAlimentacionDAO(Alimentacion alimentacion) {
        return alimentacionDAO.save(alimentacion);
    }

    // ================ ESTADÍSTICAS USANDO DAO ================
    
    /**
     * Obtener estadísticas generales usando DAOs
     */
    public EstadisticasGranja obtenerEstadisticasDAO() {
        EstadisticasGranja stats = new EstadisticasGranja();
        stats.totalClientes = clienteDAO.count();
        stats.totalPorcinos = porcinoDAO.count();
        stats.totalAlimentaciones = alimentacionDAO.count();
        stats.pesoPromedio = porcinoDAO.getAverageWeight();
        return stats;
    }
    
    /**
     * Clase interna para estadísticas
     */
    public static class EstadisticasGranja {
        public long totalClientes;
        public long totalPorcinos;
        public long totalAlimentaciones;
        public Double pesoPromedio;
        
        @Override
        public String toString() {
            return String.format(
                "Estadísticas Granja - Clientes: %d, Porcinos: %d, Alimentaciones: %d, Peso Promedio: %.2f kg", 
                totalClientes, totalPorcinos, totalAlimentaciones, pesoPromedio
            );
        }
    }
}

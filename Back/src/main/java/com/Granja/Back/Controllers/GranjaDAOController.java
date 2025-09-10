package com.Granja.Back.Controllers;

import com.Granja.Back.Services.GranjaDAOService;
import com.Granja.Back.Entities.Cliente;
import com.Granja.Back.Entities.Porcino;
import com.Granja.Back.Entities.Alimentacion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Controlador que demuestra el uso del patrón DAO para acceso a PostgreSQL
 */
@RestController
@RequestMapping("/dao")
@CrossOrigin(origins = {"http://localhost:4200", "file://", "null"})
public class GranjaDAOController {

    @Autowired
    private GranjaDAOService granjaDAOService;

    /**
     * Obtener todos los clientes usando DAO
     */
    @GetMapping("/clientes")
    public ResponseEntity<List<Cliente>> obtenerClientesDAO() {
        List<Cliente> clientes = granjaDAOService.obtenerTodosLosClientesDAO();
        return ResponseEntity.ok(clientes);
    }

    /**
     * Buscar cliente por cédula usando DAO
     */
    @GetMapping("/clientes/{cedula}")
    public ResponseEntity<Cliente> obtenerClienteDAO(@PathVariable String cedula) {
        Optional<Cliente> cliente = granjaDAOService.buscarClientePorCedulaDAO(cedula);
        return cliente.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Obtener todos los porcinos usando DAO
     */
    @GetMapping("/porcinos")
    public ResponseEntity<List<Porcino>> obtenerPorcinosDAO() {
        List<Porcino> porcinos = granjaDAOService.obtenerTodosLosPorcinosDAO();
        return ResponseEntity.ok(porcinos);
    }

    /**
     * Buscar porcinos por cliente usando DAO
     */
    @GetMapping("/porcinos/cliente/{cedula}")
    public ResponseEntity<List<Porcino>> obtenerPorcinosPorClienteDAO(@PathVariable String cedula) {
        List<Porcino> porcinos = granjaDAOService.buscarPorcinosPorClienteDAO(cedula);
        return ResponseEntity.ok(porcinos);
    }

    /**
     * Obtener todas las alimentaciones usando DAO
     */
    @GetMapping("/alimentaciones")
    public ResponseEntity<List<Alimentacion>> obtenerAlimentacionesDAO() {
        List<Alimentacion> alimentaciones = granjaDAOService.obtenerTodasLasAlimentacionesDAO();
        return ResponseEntity.ok(alimentaciones);
    }

    /**
     * Obtener estadísticas usando DAO
     */
    @GetMapping("/estadisticas")
    public ResponseEntity<GranjaDAOService.EstadisticasGranja> obtenerEstadisticasDAO() {
        GranjaDAOService.EstadisticasGranja stats = granjaDAOService.obtenerEstadisticasDAO();
        return ResponseEntity.ok(stats);
    }

    /**
     * Calcular peso promedio usando DAO
     */
    @GetMapping("/peso-promedio")
    public ResponseEntity<Double> calcularPesoPromedioDAO() {
        Double pesoPromedio = granjaDAOService.calcularPesoPromedioDAO();
        return ResponseEntity.ok(pesoPromedio != null ? pesoPromedio : 0.0);
    }

    /**
     * Endpoint de prueba para verificar conexión DAO con PostgreSQL
     */
    @GetMapping("/test-conexion")
    public ResponseEntity<Object> testConexionDAO() {
        try {
            GranjaDAOService.EstadisticasGranja stats = granjaDAOService.obtenerEstadisticasDAO();
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "✅ Conexión DAO a PostgreSQL exitosa!",
                "estadisticas", stats
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of(
                        "status", "error",
                        "message", "❌ Error de conexión DAO: " + e.getMessage()
                    ));
        }
    }
}

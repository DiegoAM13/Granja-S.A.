package com.Granja.Back.Controllers;

import com.Granja.Back.DTOS.ReporteClientePorcinoDTO;
import com.Granja.Back.Services.ReporteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Reportes")
@CrossOrigin(origins = {"http://localhost:4200", "file://", "null"})
public class ReporteController {

    @Autowired
    private ReporteService reporteService;

    @GetMapping("/clientes-porcinos")
    public ResponseEntity<List<ReporteClientePorcinoDTO>> obtenerReporteClientesPorcinos() {
        try {
            List<ReporteClientePorcinoDTO> reporte = reporteService.obtenerReporteClientesPorcinos();
            return ResponseEntity.ok(reporte);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/clientes-porcinos/{cedula}")
    public ResponseEntity<List<ReporteClientePorcinoDTO>> obtenerReportePorCliente(@PathVariable String cedula) {
        try {
            List<ReporteClientePorcinoDTO> reporte = reporteService.obtenerReportePorCliente(cedula);
            return ResponseEntity.ok(reporte);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}

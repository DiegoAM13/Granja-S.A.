package com.Granja.Back.Controllers;

import com.Granja.Back.Entities.Alimentacion;
import com.Granja.Back.Entities.Cliente;
import com.Granja.Back.Services.AlimentacionService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/Alimentacion")
@CrossOrigin(origins = "http://localhost:4200")
public class AlimentacionController {

    @Autowired
    AlimentacionService alimentacionService;

    @PostMapping("/Guardar")
    public ResponseEntity<?>GuardarAlimento(@Valid @RequestBody Alimentacion alimentacion, BindingResult bindingResult )
    {
        if (bindingResult.hasErrors()){
            return ResponseEntity.badRequest().body("Revise los campos");
        }
        try {
            alimentacionService.CrearAlimentacion(alimentacion);
            return  ResponseEntity.status(HttpStatus.CREATED).body("Registrado");
        }catch (IllegalArgumentException e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/Eliminar/{Tipo}")
    public ResponseEntity<?> EliminarAlimento(@PathVariable  Integer Tipo)
    {
        try{
            Alimentacion alimentacion= alimentacionService.EliminarAlimentacion(Tipo);
            return ResponseEntity.ok().body("Alimentacion  eliminada");
        }catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar el Alimento");
        }
    }

    @PutMapping("/Actualizar/{Tipo}")
    public ResponseEntity<?> ActualizarAlimento(@PathVariable Integer Tipo, @RequestBody Alimentacion alimentacionActualizar)
    {
        try {
            Alimentacion alimentacionActualizado = alimentacionService.ActualizarAlimentacion(Tipo, alimentacionActualizar);
            return  ResponseEntity.ok(alimentacionActualizado);
        }catch(EntityNotFoundException e){
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al actualizar el alimento " + e.getMessage());
        }
    }

    @GetMapping("")
    public List<Alimentacion> ObtenerAlimentacion()
    {
        return alimentacionService.ObtenerAlimentacion();
    }



}

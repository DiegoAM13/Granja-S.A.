package com.Granja.Back.Controllers;

import com.Granja.Back.DTOS.PorcinoDTO;
import com.Granja.Back.Entities.Cliente;
import com.Granja.Back.Entities.Porcino;
import com.Granja.Back.Services.PorcinoService;
import com.fasterxml.jackson.core.SerializableString;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/Porcino")
@CrossOrigin(origins = "http://localhost:4200")

public class PorcinoController {

    @Autowired
    private PorcinoService porcinoService;

    @PostMapping("/Guardar")
    public ResponseEntity<?>CrearPorcino(@Valid @RequestBody PorcinoDTO porcinoDTO, BindingResult bindingResult)
    {
        if (bindingResult.hasErrors()){
            return ResponseEntity.badRequest().body("Revise los campos");
        }
        try {
            porcinoService.CrearPorcino(porcinoDTO);
            return  ResponseEntity.status(HttpStatus.CREATED).body("Registrado");
        }catch (IllegalArgumentException e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/Actualizar/{identificacion}")
    public ResponseEntity<?>ActualizarPorcino(@PathVariable String identificacion, @RequestBody  PorcinoDTO porcinoDTO)
    {
        try {
            PorcinoDTO porcinoActualizado = porcinoService.ActualizarPorcino(identificacion, porcinoDTO);
            return  ResponseEntity.ok(porcinoActualizado);
        }catch(EntityNotFoundException e){
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al actualizar el cliente " + e.getMessage());
        }
    }
    @DeleteMapping("/Eliminar/{identificacion}")
    public ResponseEntity<?>EliminarPorcino(@PathVariable String identificacion)
    {
        try{
            PorcinoDTO porcinoDTO= porcinoService.EliminarPorcino(identificacion);
            return ResponseEntity.ok().body("Porcino eliminado");
        }catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar el Porcino");
        }
    }

    @GetMapping("")
    public List<PorcinoDTO>ObtenerPorcinos()
    {
        return porcinoService.ObtenerPorcino();
    }
}

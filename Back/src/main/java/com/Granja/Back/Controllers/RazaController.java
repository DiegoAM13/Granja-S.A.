package com.Granja.Back.Controllers;


import com.Granja.Back.Entities.Alimentacion;
import com.Granja.Back.Entities.Raza;
import com.Granja.Back.Repositories.RazaRepository;
import com.Granja.Back.Services.RazaService;
import jakarta.persistence.EntityNotFoundException;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/Raza")
@CrossOrigin(origins = "http://localhost:4200")
public class RazaController {

    @Autowired
    private RazaService razaService;

    @PostMapping("/Guardar")
    public ResponseEntity<?>GuardarRaza(@Valid @RequestBody Raza raza, BindingResult bindingResult )
    {
        if (bindingResult.hasErrors()){
            return ResponseEntity.badRequest().body("Revise los campos");
        }
        try {
            razaService.CrearRaza(raza);
            return  ResponseEntity.status(HttpStatus.CREATED).body("Registrado");
        }catch (IllegalArgumentException e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping("/Eliminar/{id}")
    public ResponseEntity<?> EliminarRaza(@PathVariable  Integer id)
    {
        try{
            Raza raza= razaService.EliminarRaza(id);
            return ResponseEntity.ok().body("Raza  eliminada");
        }catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar la raza");
        }
    }



    @GetMapping("")
    public List<Raza> ObtenerRaza()
    {
        return razaService.ObtenerRaza();
    }


}

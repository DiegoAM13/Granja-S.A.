package com.Granja.Back.Controllers;

import com.Granja.Back.DTOS.LoginDTO;
import com.Granja.Back.DTOS.PorcinoDTO;
import com.Granja.Back.Services.AuthService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/Admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AutenticacionController {

    @Autowired
    private AuthService authService;

    @PostMapping("/Crear")
    public ResponseEntity<?>CrearAdmin(@Valid @RequestBody LoginDTO loginDTO, BindingResult bindingResult)
    {
        if (bindingResult.hasErrors()){
            return ResponseEntity.badRequest().body("Revise los campos");
        }
        try {
            authService.CrearAdmin(loginDTO);
            return  ResponseEntity.status(HttpStatus.CREATED).body("Registrado");
        }catch (IllegalArgumentException e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO)
    {
        try {
            boolean valido = authService.Validar(loginDTO);
            if (valido) {
                return ResponseEntity.ok("Usuario y contraseña válidos");
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @DeleteMapping("Eliminar/{usuario}")
    public ResponseEntity<?> EliminarAdmin(@PathVariable String usuario)
    {
        try{
           authService.EliminarAdmin(usuario);
            return ResponseEntity.ok().body("Admin eliminado");
        }catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar el Porcino");
        }
    }
}

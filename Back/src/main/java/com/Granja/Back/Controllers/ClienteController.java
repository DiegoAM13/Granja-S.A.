package com.Granja.Back.Controllers;

import com.Granja.Back.Entities.Cliente;
import com.Granja.Back.Services.ClienteService;
import jakarta.persistence.EntityNotFoundException;
//import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/Clientes")
@CrossOrigin(origins = {"http://localhost:4200", "file://", "null"})
public class ClienteController {

    @Autowired
    ClienteService clienteService;

    @PostMapping("/Guardar")
    public ResponseEntity<String> GuardarCliente(@Valid @RequestBody Cliente cliente, BindingResult bindingResult)
    {
        if (bindingResult.hasErrors()){
            return ResponseEntity.badRequest().body("Revise los campos");
        }
        try {
            clienteService.GuardarCliente(cliente);
            return  ResponseEntity.status(HttpStatus.CREATED).body("Registrado");
        }catch (IllegalArgumentException e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/Eliminar/{Cedula}")
    public ResponseEntity<?> EliminarCliente(@PathVariable String Cedula)
    {
        try{
            //Cliente cliente= clienteService.EliminarCliente(Cedula);
            return ResponseEntity.ok().body("Cliente eliminado");
        }catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar el cliente");
        }
    }

    @GetMapping("")
    public List<Cliente> ObtenerClientes()
    {
        return clienteService.ObtenerClientes();
    }

    @PutMapping("/Actualizar/{Cedula}")
    public ResponseEntity<?> ActualizarCliente(@PathVariable String Cedula, @RequestBody Cliente clienteActualizar)
    {
        try {
            Cliente clienteActualizado = clienteService.ActualizarCliente(Cedula, clienteActualizar);
            return  ResponseEntity.ok(clienteActualizado);
        }catch(EntityNotFoundException e){
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al actualizar el cliente " + e.getMessage());
        }
    }



}

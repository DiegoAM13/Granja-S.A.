package com.Granja.Back.Services;

import com.Granja.Back.Entities.Cliente;
import com.Granja.Back.Repositories.ClienteRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public void GuardarCliente(Cliente cliente){
        if (clienteRepository.existsById(cliente.getCedula()))
        {
                   throw  new IllegalArgumentException("El cliente ya existe");
        }
        clienteRepository.save(cliente);


    }public Cliente EliminarCliente(String Cedula)
    {
        Cliente cliente = clienteRepository.findById(Cedula)
                .orElseThrow(() -> new EntityNotFoundException("Cliente con cedula: " + Cedula + " no encontrado"));



        clienteRepository.delete(cliente);
        return cliente;
    }

    public List<Cliente> ObtenerClientes(){return clienteRepository.findAll();}

    public Cliente ActualizarCliente( String Cedula, Cliente clienteActualizar)
    {
        Cliente clienteexiste = clienteRepository.findById(Cedula)
                .orElseThrow(()-> new EntityNotFoundException("Cliente con cedula: " + Cedula+ " no encontrado"));

        if (clienteActualizar.getCedula() != null && !clienteActualizar.getCedula().isBlank())
        {
            clienteexiste.setCedula(clienteActualizar.getCedula());
        }
        if (clienteActualizar.getApellido() != null && !clienteActualizar.getApellido().isBlank())
        {
            clienteexiste.setApellido(clienteActualizar.getApellido());
        }
        if (clienteActualizar.getDireccion() != null && !clienteActualizar.getDireccion().isBlank())
        {
            clienteexiste.setDireccion(clienteActualizar.getDireccion());
        }
        if (clienteActualizar.getNombre() != null && !clienteActualizar.getNombre().isBlank())
        {
            clienteexiste.setNombre(clienteActualizar.getNombre());
        }
        if (clienteActualizar.getTelefono() != null && ! clienteActualizar.getTelefono().isBlank())
        {
            clienteexiste.setTelefono(clienteActualizar.getTelefono());
        }
        return clienteRepository.save(clienteexiste);
    }
}

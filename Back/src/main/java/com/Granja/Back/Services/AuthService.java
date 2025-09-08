package com.Granja.Back.Services;

import com.Granja.Back.DTOS.LoginDTO;
import com.Granja.Back.Entities.Administrador;
import com.Granja.Back.Repositories.AdministradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AdministradorRepository administradorRepository;

    public  void CrearAdmin(LoginDTO loginDTO)
    {
        if (administradorRepository.existsByUsuario(loginDTO.getUsuario()))
        {
            new IllegalArgumentException("El usuario ya existe");
        }

        Administrador administrador = new Administrador();

        administrador.setUsuario(loginDTO.getUsuario());
        administrador.setContrasena(loginDTO.getContrasena());
        administradorRepository.save(administrador);

    }

    public boolean Validar(LoginDTO loginDTO)
    {
        Administrador administrador = administradorRepository.findByUsuario(loginDTO.getUsuario())
                .orElseThrow(()-> new IllegalArgumentException("Usuario no encontrado"));

        if (!administrador.getContrasena().equals(loginDTO.getContrasena()))
        {
            throw  new IllegalArgumentException("Contraseña incorrecta");
        }

        return true;
    }

    public void EliminarAdmin(String usuario)
    {
        Administrador administrador = administradorRepository.findByUsuario(usuario)
                .orElseThrow(()-> new IllegalArgumentException("El usuario no existe"));

        administradorRepository.delete(administrador);
    }


}

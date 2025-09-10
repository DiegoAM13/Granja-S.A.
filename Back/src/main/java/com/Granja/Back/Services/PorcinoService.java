package com.Granja.Back.Services;

import com.Granja.Back.DTOS.PorcinoDTO;
import com.Granja.Back.Entities.Alimentacion;
import com.Granja.Back.Entities.Cliente;
import com.Granja.Back.Entities.Porcino;
import com.Granja.Back.Entities.Raza;
import com.Granja.Back.Mappers.PorcinoMapper;
import com.Granja.Back.Repositories.AlimentacionRepository;
import com.Granja.Back.Repositories.ClienteRepository;
import com.Granja.Back.Repositories.PorcinoRepository;
import com.Granja.Back.Repositories.RazaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PorcinoService {

    @Autowired
    private PorcinoRepository porcinoRepository;
    @Autowired
    private RazaRepository razaRepository;
    @Autowired
    private AlimentacionRepository alimentacionRepository;
    @Autowired
    private ClienteRepository clienteRepository;

    public void CrearPorcino(PorcinoDTO porcinoDTO)
    {
        if (porcinoRepository.existsByIdentificacion(porcinoDTO.getIdentificacion()))
        {
            throw new IllegalArgumentException("El porcino con esa identifiación ya existe");
        }

        Raza raza = razaRepository.findById(porcinoDTO.getRazaId())
                .orElseThrow(() -> new IllegalArgumentException("Raza no encontrada"));
        Alimentacion alimentacion = alimentacionRepository.findByTipo(porcinoDTO.getAlimentacionTipo())
                .orElseThrow(() -> new IllegalArgumentException("Alimentacion no encontrada"));
        Cliente cliente = clienteRepository.findById(porcinoDTO.getClienteCedula())
                .orElseThrow(() -> new IllegalArgumentException("Cliente no encontrado"));


        Porcino porcino = PorcinoMapper.toEntity(porcinoDTO,raza,alimentacion,cliente);

        porcinoRepository.save(porcino);
    }

    public PorcinoDTO EliminarPorcino(String Identificacion)
    {
        Porcino porcino = porcinoRepository.findByIdentificacion(Identificacion)
                .orElseThrow(()-> new EntityNotFoundException("Porcino con identificacion: "+Identificacion+" no fue encontrado"));

        porcinoRepository.delete(porcino);
        return PorcinoMapper.toDTO(porcino);
    }

    public PorcinoDTO ActualizarPorcino(String Identificacion, PorcinoDTO porcinoDTO)
    {
        Porcino porcino = porcinoRepository.findByIdentificacion(Identificacion)
                .orElseThrow(()-> new EntityNotFoundException("Porcino con identificacion: "+Identificacion+" no fue encontrado"));

        if (porcinoDTO.getEdad() != null) {porcino.setEdad(porcinoDTO.getEdad());}
        if(porcinoDTO.getPeso() != null && !porcinoDTO.getPeso().isNaN()){porcino.setPeso(porcinoDTO.getPeso());}
        if (porcinoDTO.getRazaId() != null)
        {
            Raza raza = razaRepository.findById(porcinoDTO.getRazaId())
                            .orElseThrow(()-> new IllegalArgumentException("Raza no encontrada"));
            porcino.setRaza(raza);
        }
        if (porcinoDTO.getAlimentacionTipo() != null )
        {
            Alimentacion alimentacion = alimentacionRepository.findByTipo(porcinoDTO.getAlimentacionTipo())
                            .orElseThrow(()-> new IllegalArgumentException("Alimentacion no encontrada"));
            porcino.setAlimentacion(alimentacion);
        }
        if (porcinoDTO.getClienteCedula() != null)
        {
            Cliente cliente = clienteRepository.findById(porcinoDTO.getClienteCedula())
                            .orElseThrow(()-> new IllegalArgumentException("Cliente no encontrado"));
            porcino.setCliente(cliente);
        }

        Porcino guardado = porcinoRepository.save(porcino);
        return PorcinoMapper.toDTO(guardado);

    }

    public List<PorcinoDTO>ObtenerPorcino()
    {
       return porcinoRepository.findAll()
               .stream()
               .map(PorcinoMapper::toDTO)
               .collect(Collectors.toList());

    }

}

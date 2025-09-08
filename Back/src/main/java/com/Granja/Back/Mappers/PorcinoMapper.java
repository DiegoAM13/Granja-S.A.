package com.Granja.Back.Mappers;

import com.Granja.Back.DTOS.PorcinoDTO;
import com.Granja.Back.Entities.Alimentacion;
import com.Granja.Back.Entities.Cliente;
import com.Granja.Back.Entities.Porcino;
import com.Granja.Back.Entities.Raza;

public class PorcinoMapper {

    public static PorcinoDTO toDTO(Porcino porcino)
    {
        PorcinoDTO porcinoDTO = new PorcinoDTO();
        porcinoDTO.setIdentificacion(porcino.getIdentificacion());
        porcinoDTO.setEdad(porcino.getEdad());
        porcinoDTO.setPeso(porcino.getPeso());

        if (porcino.getRaza() != null)
        {
            porcinoDTO.setRazaId(porcino.getRaza().getId());
        }
        if (porcino.getAlimentacion() != null)
        {
            porcinoDTO.setAlimentacionTipo(porcino.getAlimentacion().getTipo());
        }
        if (porcino.getCliente() != null)
        {
            porcinoDTO.setClienteCedula(porcino.getCliente().getCedula());
        }
        return  porcinoDTO;
    }

    public static Porcino toEntity(PorcinoDTO porcinoDTO, Raza raza, Alimentacion alimentacion, Cliente cliente)
    {
        Porcino porcino = new Porcino();

        porcino.setIdentificacion(porcinoDTO.getIdentificacion());
        porcino.setEdad(porcinoDTO.getEdad());
        porcino.setPeso(porcinoDTO.getPeso());
        porcino.setRaza(raza);
        porcino.setAlimentacion(alimentacion);
        porcino.setCliente(cliente);

        return  porcino;
    }
}

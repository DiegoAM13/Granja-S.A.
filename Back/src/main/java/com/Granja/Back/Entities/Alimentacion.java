package com.Granja.Back.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Alimentacion")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Alimentacion {

    @Id
    @Column(nullable = false,length =2)
    private Integer tipo;

    @Column(nullable = false,length = 100)
    private String descripcion;

    @Column(nullable = false)
    private Float dosis;
}

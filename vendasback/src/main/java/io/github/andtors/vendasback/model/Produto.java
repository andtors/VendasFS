package io.github.andtors.vendasback.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "produto")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100)
    private String nome;

    @Column(length = 255)
    private String descricao;

    @Column(precision = 16, scale = 2)
    private BigDecimal preco;

    @Column
    private String sku;


}

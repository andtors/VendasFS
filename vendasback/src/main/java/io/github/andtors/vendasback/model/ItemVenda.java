package io.github.andtors.vendasback.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="item_venda")
public class ItemVenda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="id_venda")
    private Venda venda;

    @ManyToOne
    @JoinColumn(name="id_produto")
    private Produto produto;

    @Column
    private Integer quantidade;
}

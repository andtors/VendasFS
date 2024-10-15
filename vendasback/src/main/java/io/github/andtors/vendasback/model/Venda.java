package io.github.andtors.vendasback.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Data
@Table(name = "venda")
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="id_cliente")
    private Cliente cliente;

    @Enumerated(EnumType.STRING)
    @Column(name = "forma_pagamento")
    private FormaPagamento formaPagamento;

    @OneToMany(mappedBy = "venda") //correlaciona o nome venda dentro do ItemVenda
    private List<ItemVenda> itens;

    @Column
    private BigDecimal total;
}

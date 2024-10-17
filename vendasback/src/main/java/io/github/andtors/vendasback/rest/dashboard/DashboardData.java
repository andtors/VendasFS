package io.github.andtors.vendasback.rest.dashboard;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardData {

    private Long produtos;
    private Long clientes;
    private Long vendas;


}

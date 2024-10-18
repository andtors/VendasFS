package io.github.andtors.vendasback.rest.dashboard;

import io.github.andtors.vendasback.model.repository.projections.VendaPorMes;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class DashboardData {

    private Long produtos;
    private Long clientes;
    private Long vendas;
    private List<VendaPorMes> vendaPorMes;

    public void preencherMesesFaltantes() {

    }
}

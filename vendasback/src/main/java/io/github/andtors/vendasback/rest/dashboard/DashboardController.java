package io.github.andtors.vendasback.rest.dashboard;

import io.github.andtors.vendasback.model.repository.ClienteRepository;
import io.github.andtors.vendasback.model.repository.ProdutoRepository;
import io.github.andtors.vendasback.model.repository.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private VendaRepository vendas;

    @Autowired
    private ClienteRepository clientes;

    @Autowired
    private ProdutoRepository produtos;

    @GetMapping
    public DashboardData getDashboard() {
        long vendasCount = vendas.count();
        long clientesCount = clientes.count();
        long produtosCount = produtos.count();

        return new DashboardData(produtosCount, clientesCount, vendasCount);
    }
}

package io.github.andtors.vendasback.rest.vendas;

import io.github.andtors.vendasback.model.Venda;
import io.github.andtors.vendasback.model.repository.VendaRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vendas")
@CrossOrigin("*")
public class VendasController {

    private VendaRepository repository;

    @PostMapping
    public void realizarVenda(@RequestBody Venda venda){

    }
}

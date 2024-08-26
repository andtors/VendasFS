package io.github.andtors.vendasback.rest.produtos;

import io.github.andtors.vendasback.model.Produto;
import io.github.andtors.vendasback.model.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin("*")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @PostMapping
    public ProdutoFormRequest salvar( @RequestBody ProdutoFormRequest produto ){

        Produto entidadeProduto = produto.ToModel();

        produtoRepository.save(entidadeProduto);

        return ProdutoFormRequest.fromModel(entidadeProduto);
    }
}

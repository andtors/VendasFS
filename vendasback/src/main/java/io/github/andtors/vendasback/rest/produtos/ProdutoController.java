package io.github.andtors.vendasback.rest.produtos;

import io.github.andtors.vendasback.model.Produto;
import io.github.andtors.vendasback.model.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @PostMapping
    public Produto salvar( @RequestBody Produto produto ){

        /*
        Produto entidadeProduto = new Produto(
                produto.getNome(),
                produto.getDescricao(),
                produto.getPreco(),
                produto.getSku()
        );
        */

        /*
        Produto.builder()
                .nome(produto.getNome())
                .preco(produto.getPreco())
                .descricao(produto.getDescricao())
                .sku(produto.getSku())
                .build();

         */

        produtoRepository.save(produto);

        System.out.println(produto);
        return produto;
    }
}

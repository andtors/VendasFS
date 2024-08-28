package io.github.andtors.vendasback.rest.produtos;

import io.github.andtors.vendasback.model.Produto;
import io.github.andtors.vendasback.model.exception.ValidationException;
import io.github.andtors.vendasback.model.repository.ProdutoRepository;
import io.github.andtors.vendasback.model.service.ProdutoService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.format.TextStyle;
import java.util.Optional;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin("*")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    private  ProdutoService produtoService;

    @PostMapping
    public ProdutoFormRequest salvar( @RequestBody ProdutoFormRequest produto ){

        Produto entidadeProduto = produto.toModel();

        produtoRepository.save(entidadeProduto);

        return ProdutoFormRequest.fromModel(entidadeProduto);
    }

    @PutMapping("{id}")
    public ResponseEntity atualizar(@PathVariable("id") Long id, @RequestBody ProdutoFormRequest produto){

        Optional<Produto> produtoExistente = produtoRepository.findById(id);

        if(produtoExistente.isEmpty()){
            System.out.println("Produto não encotrado.");
            return ResponseEntity.notFound().build();
        }

        Produto entidade = produto.toModel();

        entidade.setId(id);

        produtoRepository.save(entidade);

        return ResponseEntity.ok().build();


    }
}

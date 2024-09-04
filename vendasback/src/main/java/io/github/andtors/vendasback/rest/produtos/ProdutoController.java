package io.github.andtors.vendasback.rest.produtos;

import io.github.andtors.vendasback.model.Produto;
import io.github.andtors.vendasback.model.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin("*")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @GetMapping
    public List<ProdutoFormRequest> getLista() {
        return produtoRepository.findAll().stream()
                .map(ProdutoFormRequest::fromModel)
                .collect(Collectors.toList());
    }

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

        entidade.prePersist();

        produtoRepository.save(entidade);

        return ResponseEntity.ok().build();
    }

    @GetMapping("{id}")
    public ResponseEntity getById(@PathVariable("id") Long id) {
        Optional<Produto> produtoExistente = produtoRepository.findById(id);

        if(produtoExistente.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        var produto = produtoExistente.map(ProdutoFormRequest::fromModel).get();

        return ResponseEntity.ok(produto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void>deletar(@PathVariable("id") Long id){
        Optional<Produto> produtoExistente = produtoRepository.findById(id);

        if(produtoExistente.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        produtoRepository.delete(produtoExistente.get());
        return ResponseEntity.noContent().build();
    }

}

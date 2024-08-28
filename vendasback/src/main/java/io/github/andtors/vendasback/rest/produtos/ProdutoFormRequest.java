package io.github.andtors.vendasback.rest.produtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.github.andtors.vendasback.model.Produto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProdutoFormRequest {

    private Long id;
    private String descricao;
    private String nome;
    private BigDecimal preco;
    private String sku;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate cadastro;

    public Produto toModel(){
        return new Produto(id, nome, descricao, preco, sku, cadastro);
    }

    public static ProdutoFormRequest fromModel(Produto produto){
        return new ProdutoFormRequest(
                produto.getId(),
                produto.getDescricao(),
                produto.getNome(),
                produto.getPreco(),
                produto.getSku(),
                produto.getDataCadastro()
                );
    }
}

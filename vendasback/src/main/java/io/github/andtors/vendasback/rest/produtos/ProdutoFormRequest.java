package io.github.andtors.vendasback.rest.produtos;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class ProdutoFormRequest {

    private String descricao;
    private String nome;
    private BigDecimal preco;
    private String sku;
}

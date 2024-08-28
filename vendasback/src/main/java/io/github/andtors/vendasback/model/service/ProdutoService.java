package io.github.andtors.vendasback.model.service;

import io.github.andtors.vendasback.model.Produto;

import java.util.Optional;

public interface ProdutoService {

    Optional<Produto> getById(Long id);
}

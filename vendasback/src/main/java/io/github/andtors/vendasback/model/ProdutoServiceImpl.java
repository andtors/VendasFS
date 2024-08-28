package io.github.andtors.vendasback.model;

import io.github.andtors.vendasback.model.repository.ProdutoRepository;
import io.github.andtors.vendasback.model.service.ProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProdutoServiceImpl implements ProdutoService {

    private final ProdutoRepository produtoRepository;

    @Override
    public Optional<Produto> getById(Long id) {
        return produtoRepository.findById(id);
    }
}

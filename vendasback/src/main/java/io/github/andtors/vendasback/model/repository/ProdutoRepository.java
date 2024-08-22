package io.github.andtors.vendasback.model.repository;

import io.github.andtors.vendasback.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {


}

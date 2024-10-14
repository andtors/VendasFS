package io.github.andtors.vendasback.model.repository;

import io.github.andtors.vendasback.model.Venda;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendaRepository extends JpaRepository<Venda, Long> {
}

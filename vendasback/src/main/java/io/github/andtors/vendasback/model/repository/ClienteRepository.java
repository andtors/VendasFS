package io.github.andtors.vendasback.model.repository;

import io.github.andtors.vendasback.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}

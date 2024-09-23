package io.github.andtors.vendasback.rest.clientes;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.github.andtors.vendasback.model.Cliente;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClienteFormRequest {

    private Long id;
    private String nome;
    private String cpf;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataNascimento;
    private String endereco;
    private String email;
    private String telefone;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate cadastro;

    public Cliente toModel() {
        return new Cliente(id, dataNascimento, cpf, nome, endereco, telefone, email, cadastro);
    }

    public static ClienteFormRequest fromModel(Cliente cliente) {
        return new ClienteFormRequest(cliente.getId(), cliente.getNome(),
                cliente.getCpf(), cliente.getNascimento(),
                cliente.getEndereco(), cliente.getEmail(),
                cliente.getTelefone(), cliente.getDataCadastro());
    }
}

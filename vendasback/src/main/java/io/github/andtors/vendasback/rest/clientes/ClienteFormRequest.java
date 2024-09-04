package io.github.andtors.vendasback.rest.clientes;

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
    private LocalDate dataNascimento;
    private String endereco;
    private String email;
    private String telefone;
    private LocalDate cadastro;

    public Cliente toModel(){
        return new Cliente(id, dataNascimento,cpf, nome,email,telefone,endereco, cadastro);
    }

    public static ClienteFormRequest fromModel(Cliente cliente){
        return new ClienteFormRequest(cliente.getId(),  cliente.getNome(), cliente.getCpf(),cliente.getNascimento(), cliente.getEmail(), cliente.getTelefone(), cliente.getEndereco(), cliente.getDataCadastro());
    }
}

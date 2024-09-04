package io.github.andtors.vendasback.rest.clientes;

import io.github.andtors.vendasback.model.Cliente;
import io.github.andtors.vendasback.model.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin("*")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping
    public ResponseEntity salvar(@RequestBody ClienteFormRequest request){
        Cliente cliente = request.toModel();
        clienteRepository.save(cliente);
        return ResponseEntity.ok(ClienteFormRequest.fromModel(cliente));
    }

    @PostMapping("{id}")
    public ResponseEntity<Void> salvar(@PathVariable("id") Long id, @RequestBody ClienteFormRequest request){

        Optional<Cliente> clienteExistente = clienteRepository.findById(id);

        if(clienteExistente.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        Cliente cliente = request.toModel();
        cliente.setId(id);
        clienteRepository.save(cliente);
        return ResponseEntity.noContent().build();
    }
}

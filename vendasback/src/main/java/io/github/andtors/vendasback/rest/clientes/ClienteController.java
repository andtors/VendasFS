package io.github.andtors.vendasback.rest.clientes;

import io.github.andtors.vendasback.model.Cliente;
import io.github.andtors.vendasback.model.repository.ClienteRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    @PutMapping("{id}")
    public ResponseEntity<Void> atualizar(@PathVariable("id") Long id, @RequestBody ClienteFormRequest request){

        Optional<Cliente> clienteExistente = clienteRepository.findById(id);

        if(clienteExistente.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        Cliente cliente = request.toModel();
        cliente.setId(id);
        clienteRepository.save(cliente);
        return ResponseEntity.noContent().build();
    }

    //Forma funcional de pegar o usuario pelo ID
    @GetMapping("{id}")
    public ResponseEntity<ClienteFormRequest> getById(@PathVariable("id") Long id){
        return clienteRepository.findById(id)
                .map( ClienteFormRequest::fromModel)
                .map( clienteFR -> ResponseEntity.ok(clienteFR))
                .orElseGet( () -> ResponseEntity.notFound().build());
    }

    //Forma funcional de deletar o usuario pelo ID
    @DeleteMapping("{id}")
    public ResponseEntity<Object> delete(@PathVariable("id") Long id){
        return clienteRepository.findById(id)
                .map( cliente -> {
                    clienteRepository.delete(cliente);
                    return ResponseEntity.noContent().build();
                })
                .orElseGet( () -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<ClienteFormRequest> getLista(){
        return clienteRepository
                .findAll()
                .stream()
                .map(ClienteFormRequest::fromModel)
                .collect(Collectors.toList());
    }
}

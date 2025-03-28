package com.cauaalves.backend.ComercioSA.controller;

import com.cauaalves.backend.ComercioSA.dto.ClienteDTO;
import com.cauaalves.backend.ComercioSA.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/cliente")
@CrossOrigin(origins = "*")
public class ClienteController {
    @Autowired
    private ClienteService clienteService;

    @PostMapping
    public ResponseEntity<ClienteDTO> postCliente(@Valid @RequestBody ClienteDTO clienteDTO) {
        ClienteDTO cliente = clienteService.clientePost(clienteDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/id/{id}")
                .buildAndExpand(cliente.getId()).toUri();
        return ResponseEntity.created(uri).body(cliente);
    }
    @GetMapping(value = "/id/{id}")
    public ResponseEntity<ClienteDTO> getIdCliente(@PathVariable Integer id) {
        ClienteDTO cliente = clienteService.clienteGetById(id);
        return ResponseEntity.ok().body(cliente);
    }
    @GetMapping
    public ResponseEntity<List<ClienteDTO>> getAllCliente() {
        List<ClienteDTO> clientes = clienteService.clienteGetAll();
        return ResponseEntity.ok().body(clientes);
    }
    @GetMapping(value = "/nome/{nome}")
    public ResponseEntity<ClienteDTO> getNomeCliente(@PathVariable String nome) {
        ClienteDTO cliente = clienteService.clienteGetByNome(nome);
        return ResponseEntity.ok().body(cliente);
    }
    @GetMapping(value = "/cpf/{cpf}")
    public ResponseEntity<ClienteDTO> getCpfCliente(@PathVariable String cpf) {
        ClienteDTO cliente = clienteService.clienteGetByCpf(cpf);
        return ResponseEntity.ok().body(cliente);
    }
    @PutMapping(value = "/id/{id}")
    public ResponseEntity<ClienteDTO> updateCliente(@Valid @PathVariable Integer id, @RequestBody ClienteDTO clienteDTO) {
        ClienteDTO cliente = clienteService.clientePut(id, clienteDTO);
        return ResponseEntity.ok().body(cliente);
    }
    @DeleteMapping(value = "/id/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable Integer id) {
        clienteService.clienteDelete(id);
        return ResponseEntity.noContent().build();
    }
}

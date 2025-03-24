package com.cauaalves.backend.ComercioSA.controller;

import com.cauaalves.backend.ComercioSA.dto.ContatoDTO;
import com.cauaalves.backend.ComercioSA.service.ContatoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/contato")
@CrossOrigin(origins = "*")
public class ContatoController {
    @Autowired
    private ContatoService contatoService;
    
    @PostMapping
    public ResponseEntity<ContatoDTO> postContato(@Valid @RequestBody ContatoDTO contatoDTO) {
        ContatoDTO contato = contatoService.contatoPost(contatoDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/id/{id}")
                .buildAndExpand(contato.getId()).toUri();
        return ResponseEntity.created(uri).body(contato);
    }
    @GetMapping(value = "/id/{id}")
    public ResponseEntity<ContatoDTO> getIdContato(@PathVariable Integer id) {
        ContatoDTO contato = contatoService.contatoGetById(id);
        return ResponseEntity.ok().body(contato);
    }
    @GetMapping
    public ResponseEntity<List<ContatoDTO>> getAllContato() {
        List<ContatoDTO> contatos = contatoService.contatoGetAll();
        return ResponseEntity.ok().body(contatos);
    }
    @GetMapping(value = "/nome/{nome}")
    public ResponseEntity<List<ContatoDTO>> getClienteContato(@PathVariable Integer clienteId) {
        List<ContatoDTO> contatos = contatoService.contatoGetByCliente(clienteId);
        return ResponseEntity.ok().body(contatos);
    }
    @PutMapping(value = "/id/{id}")
    public ResponseEntity<ContatoDTO> updateContato(@Valid @PathVariable Integer id, @RequestBody ContatoDTO contatoDTO) {
        ContatoDTO contato = contatoService.contatoPut(id, contatoDTO);
        return ResponseEntity.ok().body(contato);
    }
    @DeleteMapping(value = "/id/{id}")
    public ResponseEntity<Void> deleteContato(@PathVariable Integer id) {
        contatoService.contatoDelete(id);
        return ResponseEntity.noContent().build();
    }

}

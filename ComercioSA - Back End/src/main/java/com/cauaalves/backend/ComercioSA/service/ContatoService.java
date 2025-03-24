package com.cauaalves.backend.ComercioSA.service;

import com.cauaalves.backend.ComercioSA.dto.ContatoDTO;
import com.cauaalves.backend.ComercioSA.model.Cliente;
import com.cauaalves.backend.ComercioSA.model.Contato;
import com.cauaalves.backend.ComercioSA.repository.ClienteRepository;
import com.cauaalves.backend.ComercioSA.repository.ContatoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContatoService {
    @Autowired
    private final ContatoRepository repository;
    @Autowired
    private final ClienteRepository clienteRepository;

    public ContatoService(ContatoRepository repository, ClienteRepository clienteRepository) {
        this.repository = repository;
        this.clienteRepository = clienteRepository;
    }

    public ContatoDTO contatoPost(ContatoDTO contatoDTO) {
        Cliente cliente = clienteRepository.findById(contatoDTO.getClienteId())
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado"));
        Contato contato = convertToEntity(contatoDTO, cliente);
        return getDTOfromEntity(repository.save(contato));
    }
    public ContatoDTO contatoGetById (Integer id) { return getDTOfromEntity(repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Contato não encontrado!"))); }
    public List<ContatoDTO> contatoGetAll() { return repository.findAll().stream().map(this::getDTOfromEntity).collect(Collectors.toList());}
    public List<ContatoDTO> contatoGetByCliente (Integer clienteId) { return repository.findByClienteId(clienteId).stream().map(this::getDTOfromEntity).collect(Collectors.toList()); }

    public ContatoDTO contatoPut(Integer id, ContatoDTO contatoDTO) {
        Cliente cliente = clienteRepository.findById(contatoDTO.getClienteId())
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado"));
        Contato contato = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Contato não encontrado!"));
        Contato contatoUpdate = convertToEntity(contatoDTO, cliente);

        contato.setCliente(contatoUpdate.getCliente());
        contato.setTipo(contatoUpdate.getTipo());
        contato.setValor(contatoUpdate.getValor());
        contato.setObservacao(contatoUpdate.getObservacao());

        return getDTOfromEntity(repository.save(contato));
    }
    public void contatoDelete(Integer id) {
        if (!repository.existsById(id)) throw new EntityNotFoundException("Contato não encontrado!");
        repository.deleteById(id);
    }

    public ContatoDTO getDTOfromEntity(Contato contato) {
        return ContatoDTO.toDto(contato);
    }
    public Contato convertToEntity(ContatoDTO contatoDTO, Cliente cliente) {
        return contatoDTO.toEntity(cliente);
    }
}

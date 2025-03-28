package com.cauaalves.backend.ComercioSA.service;

import com.cauaalves.backend.ComercioSA.dto.ClienteDTO;
import com.cauaalves.backend.ComercioSA.model.Cliente;
import com.cauaalves.backend.ComercioSA.repository.ClienteRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClienteService {
    @Autowired
    private final ClienteRepository repository;

    public ClienteService(ClienteRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public ClienteDTO clientePost(ClienteDTO clienteDTO) {
        validarCpfUnico(clienteDTO.getCpf());
        Cliente cliente = convertToEntity(clienteDTO);
        return getDTOfromEntity(repository.save(cliente));
    }
    public ClienteDTO clienteGetById (Integer id) { return getDTOfromEntity(repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado!"))); }
    public List<ClienteDTO> clienteGetAll() { return repository.findAll().stream().map(this::getDTOfromEntity).collect(Collectors.toList());}
    public ClienteDTO clienteGetByNome (String nome) { return getDTOfromEntity(repository.findByNome(nome).orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado!"))); }
    public ClienteDTO clienteGetByCpf (String cpf) { return getDTOfromEntity(repository.findByCpf(cpf).orElseThrow(() -> new EntityNotFoundException("Cpf não encontrado!"))); }

    @Transactional
    public ClienteDTO clientePut(Integer id, ClienteDTO clienteDTO) {
        Cliente cliente = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado!"));
        Cliente clienteUpdate = convertToEntity(clienteDTO);

        cliente.setNome(clienteUpdate.getNome());
        cliente.setCpf(clienteUpdate.getCpf());
        cliente.setDataNascimento(clienteUpdate.getDataNascimento());
        cliente.setEndereco(clienteUpdate.getEndereco());

        return getDTOfromEntity(repository.save(cliente));
    }

    @Transactional
    public void clienteDelete(Integer id) {
        if (!repository.existsById(id)) throw new EntityNotFoundException("Cliente não encontrado!");
        repository.deleteById(id);
    }

    private void validarCpfUnico(String cpf) {
        if (repository.existsByCpf(cpf)) {
            throw new EntityExistsException("CPF já cadastrado!");
        }
    }

    public ClienteDTO getDTOfromEntity(Cliente cliente) {
        return ClienteDTO.toDto(cliente);
    }

    public Cliente convertToEntity(ClienteDTO clienteDTO) {
        return clienteDTO.toEntity();
    }
}

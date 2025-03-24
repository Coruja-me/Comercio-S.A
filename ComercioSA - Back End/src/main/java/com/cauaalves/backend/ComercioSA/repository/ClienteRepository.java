package com.cauaalves.backend.ComercioSA.repository;

import com.cauaalves.backend.ComercioSA.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
  Optional<Cliente> findByNome(String nome);
  Optional<Cliente> findByCpf(String cpf);
  boolean existsByCpf(String cpf);
}
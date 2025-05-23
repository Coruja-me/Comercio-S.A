package com.cauaalves.backend.ComercioSA.repository;

import com.cauaalves.backend.ComercioSA.model.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContatoRepository extends JpaRepository<Contato, Integer> {
  List<Contato> findByClienteId(Integer clienteId);
}
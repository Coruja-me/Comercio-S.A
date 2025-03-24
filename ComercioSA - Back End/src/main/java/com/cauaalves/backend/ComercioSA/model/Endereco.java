package com.cauaalves.backend.ComercioSA.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class Endereco {
  private String logradouro;
  private String numero;

  @Pattern(regexp = "^\\d{5}-\\d{3}$|^\\d{8}$")
  private String cep;

  private String bairro;
  private String cidade;

  @Column(length = 2)
  private String estado;
}
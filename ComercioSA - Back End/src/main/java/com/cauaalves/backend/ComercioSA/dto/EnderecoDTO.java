package com.cauaalves.backend.ComercioSA.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class EnderecoDTO {
    @Schema(example = "Rua Lorem Ipsum", description = "Logradouro do endereço")
    private String logradouro;

    @Schema(example = "123", description = "Número do endereço")
    private String numero;

    @Schema(example = "12345-000", description = "CEP no formato XXXXX-XXX")
    @Pattern(regexp = "^\\d{5}-\\d{3}$|^\\d{8}$")
    private String cep;

    @Schema(example = "Centro", description = "Bairro do endereço")
    private String bairro;

    @Schema(example = "São Paulo", description = "Cidade do endereço")
    private String cidade;

    @Schema(example = "SP", description = "Estado do endereço (sigla)")
    @Size(min = 2, max = 2)
    private String estado;
}

package com.cauaalves.backend.ComercioSA.dto;

import com.cauaalves.backend.ComercioSA.model.Cliente;
import com.cauaalves.backend.ComercioSA.model.Endereco;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ClienteDTO {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Integer id;

    @NotNull(message = "O nome não pode ser vazio!")
    @NotBlank
    @Schema(example = "Fulano de Tal", description = "Nome completo do cliente")
    private String nome;

    @NotNull(message = "O CPF não pode ser nulo")
    @Pattern(regexp = "(^\\d{3}\\.\\d{3}\\.\\d{3}\\-\\d{2}$)", message = "O CPF deve estar no formato XXX.XXX.XXX-XX")
    @Schema(example = "123.456.789-00", description = "CPF do cliente no formato XXX.XXX.XXX-XX")
    private String cpf;

    @NotNull(message = "A data de nascimento não pode ser nula!")
    @Schema(example = "2025-05-24", description = "Data de nascimento no formato yyyy-MM-dd")
    @Past(message = "A data deve ser antes da atual!")
    private LocalDate dataNascimento;

    @Schema(description = "Endereço do cliente")
    private EnderecoDTO endereco;

    public static ClienteDTO toDto(Cliente cliente) {
        ClienteDTO dto = new ClienteDTO();
        dto.setId(cliente.getId());
        dto.setNome(cliente.getNome());
        dto.setCpf(cliente.getCpf());
        dto.setDataNascimento(cliente.getDataNascimento());

        if (cliente.getEndereco() != null) {
            EnderecoDTO enderecoDTO = new EnderecoDTO();
            enderecoDTO.setLogradouro(cliente.getEndereco().getLogradouro());
            enderecoDTO.setNumero(cliente.getEndereco().getNumero());
            enderecoDTO.setCep(cliente.getEndereco().getCep());
            enderecoDTO.setBairro(cliente.getEndereco().getBairro());
            enderecoDTO.setCidade(cliente.getEndereco().getCidade());
            enderecoDTO.setEstado(cliente.getEndereco().getEstado());
            dto.setEndereco(enderecoDTO);
        }

        return dto;
    }

    public Cliente toEntity() {
        Cliente cliente = new Cliente();
        cliente.setId(this.getId());
        cliente.setNome(this.getNome());
        cliente.setCpf(this.getCpf());
        cliente.setDataNascimento(this.getDataNascimento());

        if (this.getEndereco() != null) {
            Endereco endereco = new Endereco();
            endereco.setLogradouro(this.getEndereco().getLogradouro());
            endereco.setNumero(this.getEndereco().getNumero());
            endereco.setCep(this.getEndereco().getCep());
            endereco.setBairro(this.getEndereco().getBairro());
            endereco.setCidade(this.getEndereco().getCidade());
            endereco.setEstado(this.getEndereco().getEstado());
            cliente.setEndereco(endereco);
        }

        return cliente;
    }
}

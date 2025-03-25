package com.cauaalves.backend.ComercioSA.dto;

import com.cauaalves.backend.ComercioSA.enums.TipoContato;
import com.cauaalves.backend.ComercioSA.model.Cliente;
import com.cauaalves.backend.ComercioSA.model.Contato;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Schema(
        name = "ContatoDTO",
        example = """
                {
                  "clienteId": "1",
                  "Tipo": "TELEFONE",
                  "Valor": "(11) 98765-4321",
                  "Observacao": "Contato de emergência",
                }"""
)
public class ContatoDTO {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Integer id;

    @NotNull
    @Schema(example = "1", description = "Identificador do cliente")
    private Integer clienteId;

    @NotNull
    @Schema(example = "TELEFONE", description = "Tipo de contato do cliente, podendo ser um telefone ou um email")
    private String tipo;

    @NotNull
    @Schema(example = "(11) 98765-4321", description = "Valor do contato do cliente")
    private String valor;

    @Schema(example = "Contato de emergência", description = "Observações ao entrar em contato com o cliente")
    private String observacao;

    public static ContatoDTO toDto(Contato contato) {
        ContatoDTO dto = new ContatoDTO();
        dto.setClienteId(contato.getCliente() != null ? contato.getCliente().getId() : null );
        dto.setTipo(contato.getTipo().name());
        dto.setValor(contato.getValor());
        dto.setObservacao(contato.getObservacao());

        return dto;
    }
    public Contato toEntity(Cliente cliente) {
        Contato contato = new Contato();
        contato.setCliente(cliente);
        contato.setTipo(TipoContato.valueOf(this.getTipo()));
        contato.setValor(this.getValor());
        contato.setObservacao(this.getObservacao());

        return contato;
    }

}

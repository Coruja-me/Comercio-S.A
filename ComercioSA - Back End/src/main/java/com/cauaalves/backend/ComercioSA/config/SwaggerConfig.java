package com.cauaalves.backend.ComercioSA.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Comércio S.A. API")
                        .description("Projeto de integração de Angular, Spring e MySQL")
                        .version("1.0")
                ).externalDocs(new ExternalDocumentation()
                        .description("Cauã Vieira Alves")
                        .url("https://github.com/Coruja-me"));
    }
}

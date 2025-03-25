package com.cauaalves.backend.ComercioSA.config;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.util.Scanner;

@Configuration
public class DataSourceConfig {

    @Bean
    public DataSource dataSource() {
        Scanner scanner = new Scanner(System.in);

        System.out.print("MySQL username: ");
        String username = scanner.nextLine();

        System.out.print("MySQL password: ");
        String password = scanner.nextLine();

        return DataSourceBuilder.create()
                .url("jdbc:mysql://localhost:3306/comercio_sa?"
                + "createDatabaseIfNotExist=true")
                .username(username)
                .password(password)
                .build();
    }
}
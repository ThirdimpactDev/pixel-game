package com.thirdimpactdev.pixel_game_server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(req -> req
                        .requestMatchers("/", "/login", "/oauth2/**","index").permitAll() // Allow public access to login and OAuth2 endpoints
                        .anyRequest().authenticated() // Other requests need authentication
                )
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl("/home", true)  // Redirect to home after successful login
                )
                .logout(logout -> logout
                        .logoutSuccessUrl("/").permitAll()  // Redirect to login after logout
                );

        return http.build();
    }
}



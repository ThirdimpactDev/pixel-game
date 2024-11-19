package com.thirdimpactdev.pixel_game_server.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(registry -> {
                    registry.requestMatchers("/","/game","/color").permitAll();
                    registry.anyRequest().authenticated();
                })
                .formLogin(form -> form
                       //.loginPage("/login")
                        .loginPage("http://localhost:5173/login")
                        .permitAll())
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/login")
                        .defaultSuccessUrl("/home.html", true))
                .logout(logout -> logout
                        .logoutSuccessUrl("/")
                        .permitAll());

        return http.build();
    }

}

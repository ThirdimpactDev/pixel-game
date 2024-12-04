package com.thirdimpactdev.pixel_game_server.configs.jwt;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.crypto.SecretKey;
import java.security.Key;
import java.security.Principal;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {
    @Autowired
    private JwtUtil jwtUtil;



    public Map<String, String> getToken(@AuthenticationPrincipal OAuth2User principal) {
        System.out.println(principal);

        // Extract user information from the principal
        String username = principal.getAttribute("name");
        String email = principal.getAttribute("email");

        // Create claims for the JWT
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("email", email);

        // Generate JWT
        String token = jwtUtil.generateToken(email, claims);
        // Token Validation


        // Return token and user information
        Map<String, String> response = new HashMap<>();
        response.put("username", username);
        response.put("email", email);
        response.put("token", token);

        System.out.println("response = " + response);
        return response;
    }




}

package com.thirdimpactdev.pixel_game_server.configs.jwt;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import java.io.IOException;
import java.security.Key;
import java.util.*;

@Service
public class JwtService {
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private Long jwtExpiration;

    public Map<String, String> getToken(OAuth2User oauth2User) {
        String token = generateToken(oauth2User);
        return Map.of("token", token);
    }

    public String generateToken(OAuth2User oauth2User) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", oauth2User.getAttribute("email"));
        claims.put("name", oauth2User.getAttribute("name"));

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(oauth2User.getAttribute("email"))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public UserDetails validateTokenAndGetUserDetails(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));

            return new User(claims.getSubject(), "", authorities);
        } catch (Exception e) {
            return null;
        }
    }

    private Key getSigningKey() {
        byte[] keyBytes = Base64.getDecoder().decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
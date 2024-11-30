package com.thirdimpactdev.pixel_game_server.configs.jwt;



import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;


@Component
public class JwtUtil {




    @Value("${secret.key}")
    private String secretKey;
    private static final long EXPIRATION_TIME = 3600000; // 1 hour in milliseconds

    public String generateToken(String subject, Map<String, Object> claims) {
        System.out.println(secretKey);


        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256,secretKey )
                .compact();
    }



    public static String generateTokenStatic(JwtUtil jwtUtil, String subject, Map<String, Object> claims) {
        return jwtUtil.generateToken(subject, claims);

    }


}


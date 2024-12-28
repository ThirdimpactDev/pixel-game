package com.thirdimpactdev.pixel_game_server.controllers.rest;

import com.thirdimpactdev.pixel_game_server.configs.jwt.JwtService;
import com.thirdimpactdev.pixel_game_server.configs.jwt.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.Principal;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    JwtService jwtService;

    @GetMapping("/token.grant")
    public ResponseEntity<Map<String, String>> tokenGrant(
            @AuthenticationPrincipal OAuth2User principal,
            HttpServletRequest request) {
        logger.info("Token grant endpoint called");
        logger.info("Session ID: {}", request.getSession(false) != null ?
                request.getSession(false).getId() : "No session");
        logger.info("Principal: {}", principal);

        if (principal == null) {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            logger.info("Authentication from SecurityContext: {}", auth);

            if (auth != null && auth.getPrincipal() instanceof OAuth2User) {
                principal = (OAuth2User) auth.getPrincipal();
                logger.info("Principal recovered from SecurityContext: {}", principal);
            } else {
                logger.warn("No authentication found");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        Map.of("error", "No authentication found")
                );
            }
        }

        try {
            Map<String, String> tokenResponse = jwtService.getToken(principal);
            logger.info("Token generated successfully");
            return ResponseEntity.ok(tokenResponse);
        } catch (Exception e) {
            logger.error("Error generating token", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    Map.of("error", "Error generating token: " + e.getMessage())
            );
        }

    }
    @GetMapping("/oauth2/redirect")
    public void handleOAuthRedirect(HttpServletResponse response,
                                    @AuthenticationPrincipal OAuth2User principal) throws IOException {
        try {
            Map<String, String> tokenResponse = jwtService.getToken(principal);
            String token = tokenResponse.get("token");
            String redirectUrl = String.format("http://localhost:5173/oauth2/redirect?token=%s", token);
            response.sendRedirect(redirectUrl);
        } catch (Exception e) {
            logger.error("Error in OAuth redirect", e);
            response.sendRedirect("http://localhost:5173/login?error=authentication_failed");
        }
    }

}
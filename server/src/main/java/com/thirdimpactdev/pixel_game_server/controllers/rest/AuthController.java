package com.thirdimpactdev.pixel_game_server.controllers.rest;

import com.thirdimpactdev.pixel_game_server.configs.jwt.JwtService;
import com.thirdimpactdev.pixel_game_server.configs.jwt.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@Controller
public class AuthController {


    @Autowired
    JwtService jwtService;


    @GetMapping("/login")
    public Map<String, String> login(@AuthenticationPrincipal OAuth2User principal) {
        return jwtService.getToken(principal);
    }






}

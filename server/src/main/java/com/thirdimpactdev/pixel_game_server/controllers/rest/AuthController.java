package com.thirdimpactdev.pixel_game_server.controllers.rest;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AuthController {

    @GetMapping("/login")
    public String login() {
        return "login.html";
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/home")
    public String home(@AuthenticationPrincipal OAuth2User principal, Model model) {
        System.out.println(principal);
        String username = principal.getAttribute("name");
        model.addAttribute("username", username);
        return "home";
    }

}

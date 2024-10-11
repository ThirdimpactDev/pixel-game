package com.thirdimpactdev.pixel_game_server.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AuthController {

    @GetMapping("/login")
    public String login() {
        return "login.html";
    }

    @GetMapping("/home")
    public String home() {
        return "home";
    }

}

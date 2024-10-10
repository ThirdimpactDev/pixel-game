package com.thirdimpactdev.pixel_game_server.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class AuthController {

        @GetMapping("/index")
        public String index() {
            return "index"; // Your homepage or login page
        }

        @GetMapping("/home")
        public String home() {
            return "home"; // Redirected after successful login
        }


}

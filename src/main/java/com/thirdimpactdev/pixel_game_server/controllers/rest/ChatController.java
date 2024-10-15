package com.thirdimpactdev.pixel_game_server.controllers.rest;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import com.thirdimpactdev.pixel_game_server.models.Pixel;

@Controller
public class ChatController {

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public Pixel sendMessage(Pixel pixel) {
        return pixel;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public Pixel addUser(Pixel pixel, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("pixel", pixel.getX());
        return pixel;
    }

}
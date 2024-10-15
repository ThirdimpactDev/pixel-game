package com.thirdimpactdev.pixel_game_server.controllers.rest;

import com.thirdimpactdev.pixel_game_server.models.Grid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import com.thirdimpactdev.pixel_game_server.models.Pixel;

@Controller
public class ChatController {

    @Autowired
   private Grid grilla;

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public Grid sendMessage(Pixel pixel) {
        grilla.setValue(pixel);
        return grilla;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public Grid addUser(Pixel pixel, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("pixel", pixel.getX());

        grilla.setValue(pixel);
        return grilla;
    }

}
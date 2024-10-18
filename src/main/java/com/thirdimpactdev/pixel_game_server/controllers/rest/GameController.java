package com.thirdimpactdev.pixel_game_server.controllers.rest;

import com.thirdimpactdev.pixel_game_server.models.Grid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.thirdimpactdev.pixel_game_server.models.Pixel;

@Controller
public class GameController {

    @Autowired
   private Grid grilla;

    @MessageMapping("/game.sendPixel")
    @SendTo("/topic/public")
    public Grid sendPixel(Pixel pixel) {
        grilla.setValue(pixel);
        return grilla;
    }


}
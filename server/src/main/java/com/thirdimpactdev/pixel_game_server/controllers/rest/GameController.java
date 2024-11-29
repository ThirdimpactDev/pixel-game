package com.thirdimpactdev.pixel_game_server.controllers.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.thirdimpactdev.pixel_game_server.models.Grid;
import com.thirdimpactdev.pixel_game_server.models.Pixel;

@Controller
public class GameController {

    @Autowired
    private Grid grid;

    @MessageMapping("/game.sendPixel")
    @SendTo("/topic/grid")
    public int[][] getGrid(@Payload Pixel pixel) {
        grid.setGrid(pixel);
        return grid.getGrid();
    }

    @MessageMapping("/game.subscribeGrid")
    @SendTo("/topic/grid")
    public int[][] subscribeToGrid() {
        return grid.getGrid();
    }

}
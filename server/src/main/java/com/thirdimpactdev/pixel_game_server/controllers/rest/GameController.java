package com.thirdimpactdev.pixel_game_server.controllers.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import com.thirdimpactdev.pixel_game_server.models.Grid;
import com.thirdimpactdev.pixel_game_server.models.Pixel;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GameController {

    @Autowired
    private Grid grid;

    @PreAuthorize("isAuthenticated()")
    @MessageMapping("/game.sendPixel")
    @SendTo("/topic/grid")
    public int[][] getGrid(@Payload Pixel pixel) {
        grid.setGrid(pixel);
        System.out.println(pixel);
        return grid.getGrid();
    }


    @MessageMapping("/game.subscribeGrid")
    @SendTo("/topic/grid")
    public int[][] subscribeToGrid() {
        return grid.getGrid();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/test")
    public String test(){
        return "Oeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee!";
    }

}
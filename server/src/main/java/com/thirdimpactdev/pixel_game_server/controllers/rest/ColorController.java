package com.thirdimpactdev.pixel_game_server.controllers.rest;

import com.thirdimpactdev.pixel_game_server.models.Color;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class ColorController {

    @Autowired
    private Color color;

    @GetMapping("/color/{colorId}")
    public String getColor(@RequestParam String colorId){
        Map<String,String> colors=color.getColorList();
        return colors.get(colorId);
    }

    @GetMapping("/color")
    public Map<String,String> getAllColors(){
        //Map<String,String> colors=color.getColorList();
        return color.getColorList();
    }


}

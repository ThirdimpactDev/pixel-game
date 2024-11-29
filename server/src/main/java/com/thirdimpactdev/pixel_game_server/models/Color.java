package com.thirdimpactdev.pixel_game_server.models;


import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class Color {
    private Map<String, String> colorList = Map.of(
            "1", "E34234", // red
            "2", "26619C", // blue
            "3", "50C878", // green
            "4", "800080", // violet
            "5", "FFD700", // yellow 
            "6", "4CDCE4", // cyan
            "7", "8D8F8F"  // gray
    );

    public Map<String, String> getColorList() {
        return colorList;
    }

    public void setColorList(Map<String, String> colorList) {
        this.colorList = colorList;
    }
}

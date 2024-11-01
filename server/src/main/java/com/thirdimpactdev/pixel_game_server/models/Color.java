package com.thirdimpactdev.pixel_game_server.models;


import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class Color {
    private Map<String, String> colorList = Map.of(
            "1", "E34234",
            "2", "26619C",
            "3", "50C878",
            "4", "800080",
            "5", "FFD700",
            "6", "4CDCE4",
            "7", "8D8F8F"
    );

    public Map<String, String> getColorList() {
        return colorList;
    }

    public void setColorList(Map<String, String> colorList) {
        this.colorList = colorList;
    }
}

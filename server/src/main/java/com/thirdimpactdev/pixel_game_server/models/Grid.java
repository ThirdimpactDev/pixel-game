package com.thirdimpactdev.pixel_game_server.models;


import org.springframework.stereotype.Component;

@Component
public class Grid {

    private int[][] value = new int[10][10];

    public int[][] getValue() {
        return this.value;
    }

    public void setValue(Pixel pixel) {
        this.value[pixel.getX()][pixel.getY()] = pixel.getColor();
    }

    public Pixel getPixel(int x, int y) {
        return new Pixel(x, y, this.value[x][y]);
    }
}
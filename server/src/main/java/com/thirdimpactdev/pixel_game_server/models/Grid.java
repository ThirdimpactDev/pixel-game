package com.thirdimpactdev.pixel_game_server.models;

import org.springframework.stereotype.Component;

@Component
public class Grid {

    private int[][] grid = new int[10][10];

    public int[][] getGrid() {
        return this.grid;
    }

    public void setGrid(Pixel pixel) {
        this.grid[pixel.getX()][pixel.getY()] = pixel.getColor();
    }

    public Pixel getPixel(int x, int y) {
        return new Pixel(x, y, this.grid[x][y]);
    }
}

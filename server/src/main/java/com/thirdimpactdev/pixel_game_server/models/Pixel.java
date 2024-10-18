package com.thirdimpactdev.pixel_game_server.models;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pixel {

    private int x;
    private int y;
    private int color;

}
package com.thirdimpactdev.pixel_game_server.models;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Data
@AllArgsConstructor
@ToString
@NoArgsConstructor
public class Pixel {

    private int x;
    private int y;
    private int color;

}
package com.thirdimpactdev.pixel_game_server.models;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Grid {

    private int[] value = new int[5];
    
}

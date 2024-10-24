package com.thirdimpactdev.pixel_game_server.services;

import com.thirdimpactdev.pixel_game_server.entities.Color;
import com.thirdimpactdev.pixel_game_server.repository.ColorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class ColorService {

    @Autowired
    private ColorRepo colorRepo;

    private void save(Color color){
           colorRepo.save(color);
    }
    public Color findColorByName(String colorName) {
        return colorRepo.findByColorEnum(colorName.toUpperCase());
    }
}

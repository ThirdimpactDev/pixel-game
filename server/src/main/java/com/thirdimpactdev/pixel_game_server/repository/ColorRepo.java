package com.thirdimpactdev.pixel_game_server.repository;

import com.thirdimpactdev.pixel_game_server.entities.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ColorRepo extends JpaRepository<Color, Integer> {

    // Busca un color por el nombre del color (que corresponde al valor del enum)
    Color findByColorEnum(String colorEnum);
}

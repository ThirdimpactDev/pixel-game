package com.thirdimpactdev.pixel_game_server.entities;


import com.thirdimpactdev.pixel_game_server.enums.ColorEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Color")
public class Color {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer colorId;

    @Enumerated(EnumType.STRING)
    @Column(name = "color_enum", length = 20)
    private ColorEnum colorEnum;
}

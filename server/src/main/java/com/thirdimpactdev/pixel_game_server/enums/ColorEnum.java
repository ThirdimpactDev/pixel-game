package com.thirdimpactdev.pixel_game_server.enums;

public enum ColorEnum {
    VERMILLON("#E34234"),
    LAPIS_LAZULI("#26619C"),
    EMERALD("#50C878"),
    PURPLE("#800080"),
    GOLD("#FFD700"),
    SAPPHIRE("#0F52BA"),
    RAT_GRAY("#8D8F8F");

    private final String hexCode;

    ColorEnum(String hexCode) {
        this.hexCode = hexCode;
    }

    public String getHexCode() {
        return hexCode;
    }
}


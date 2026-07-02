export class Level {
    enemies;
    coins;
    clouds;
    backgroundObjects;
    level_end_x = 2200;

    constructor(enemies, clouds, coins, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
    }
}
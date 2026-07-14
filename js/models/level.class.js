/**
 * Represents a game level.
 * Stores all objects that belong to a level.
*/
export class Level {
    enemies;
    clouds;
    coins;
    bottles;
    backgroundObjects;
    level_end_x = 2250;

/**
 * Creates a new game level.
 *
 * @param {Array} enemies - The enemies in the level.
 * @param {Array} clouds - The background clouds.
 * @param {Array} coins - The collectible coins.
 * @param {Array} bottles - The collectible bottles.
 * @param {Array} backgroundObjects - The background images.
*/
    constructor(enemies, clouds, coins, bottles, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.coins = coins;
    this.bottles = bottles;
    this.backgroundObjects = backgroundObjects;
    }
}
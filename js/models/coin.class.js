import { MoveableObject } from "./moveable-object.class.js";

/**
 * @class
 * Represents a collectible coin.
 * Handles the coin animation.
*/
export class Coin extends MoveableObject {
    height = 130;
    width = 130;

    COIN_IMAGES = [
    'assets/img/8_coin/coin_1.png',
    'assets/img/8_coin/coin_2.png'
    ];

    offset = {
        top: 45,
        bottom: 90,
        left: 45,
        right: 45,
    };

/**
 * Creates a new coin.
 *
 * @param {number} x - The horizontal position.
 * @param {number} y - The vertical position.
*/
    constructor(x) {
        super();
        this.loadImage('assets/img/8_coin/coin_2.png');
        this.loadImages(this.COIN_IMAGES);
        this.x = x;
        this.y = 30 + Math.random() * 200;
        this.animate();
        this.getRealFrame();
    }

/**
 * Starts the coin animation.
*/
    animate() {
        setInterval(() => {
            this.playAnimation(this.COIN_IMAGES);
        }, 400);
    }
}
import { MoveableObject } from "./moveable-object.class.js";

export class Coin extends MoveableObject {
    height = 130;
    width = 130;

    COIN_IMAGES = [
    'assets/img/8_coin/coin_1.png',
    'assets/img/8_coin/coin_2.png'
    ];

    constructor(x, y) {
        super();
        this.loadImage('assets/img/8_coin/coin_2.png');
        this.loadImages(this.COIN_IMAGES);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.COIN_IMAGES);
        }, 400);
    }
}
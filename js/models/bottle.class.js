import { MoveableObject } from "./moveable-object.class.js";

/**
 * @class
 * Represents a collectible salsa bottle.
*/
export class Bottle extends MoveableObject {

    IMAGES_BOTTLE_GROUND = [
        'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    offset = {
        top: 5,
        bottom: 5,
        left: 10,
        right: 10,
    };

/**
 * Creates a new collectible bottle.
 *
 * @param {number} x - The horizontal position.
 * @param {number} y - The vertical position.
*/
    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_BOTTLE_GROUND[0]);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 70;
        this.getRealFrame();
    }
}
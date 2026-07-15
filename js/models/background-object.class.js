import { MoveableObject } from "./moveable-object.class.js";

/**
 * @class
 * Represents a static background image.
*/
export class BackgroundObject extends MoveableObject {
    width = 720;
    height = 480;

/**
 * Creates a new background object.
 *
 * @param {string} imagePath - The path to the background image.
 * @param {number} x - The horizontal position.
*/
    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
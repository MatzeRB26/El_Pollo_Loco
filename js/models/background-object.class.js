import { MoveableObject } from "./moveable-object.class.js";

export class BackgroundObject extends MoveableObject {
    width = 720;
    height = 480;

    /**
     * Sets all start conditions for the object.
     * @param {string} imagePath is the path from the image.
     * @param {number} x is the start coordinate from the image.
     */

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}

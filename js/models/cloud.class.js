import { MoveableObject } from "./moveable-object.class.js";

/**
 * @class
 * Represents a background cloud.
 * Moves continuously across the level.
*/
export class Cloud extends MoveableObject {
    y = 50;
    width = 500;
    height = 250;

/**
 * Creates a new cloud with a random
 * position and movement speed.
*/
    constructor() {
        super();
        this.loadImage('assets/img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 3000;
        this.y = 20 + Math.random() * 120;
        this.width = 500;
        this.height = 250;
        this.speed = 0.15 + Math.random() * 0.2;
        this.animate();
    }

/**
 * Starts the cloud movement.
*/
    animate() { 
        this.moveLeft();
    }

/**
 * Moves the cloud to the left.
*/
    moveLeft() {
        setInterval(() => {
            if (this.world?.gameOver) return;
            this.x -= this.speed;
        }, 1000 / 60);
    }
}

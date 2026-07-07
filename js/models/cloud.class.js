import { MoveableObject } from "./moveable-object.class.js";

export class Cloud extends MoveableObject {
    y = 50;
    width = 500;
    height = 250;

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

    animate() { // Wolken bewegen sich im Spiel nach links
        this.moveLeft();
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}

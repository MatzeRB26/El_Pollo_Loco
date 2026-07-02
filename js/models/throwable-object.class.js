import { MoveableObject } from "./moveable-object.class.js";

export class ThrowableObject extends MoveableObject {

    constructor(x, y) {
        super().loadImage('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.throw(x, y);
    }

    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 20;
        this.applyGravity();

        setInterval(() => {this.x += 10;
        }, 25);
    }

    isAboveGround() {
        return true;
    }
}
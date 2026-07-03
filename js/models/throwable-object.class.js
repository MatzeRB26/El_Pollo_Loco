import { MoveableObject } from "./moveable-object.class.js";

export class ThrowableObject extends MoveableObject {

    IMAGES_BOTTLE_ROTATION = [
    'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y) {
        super().loadImage('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.throw(x, y);
        this.animate();
    }

    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 20;
        this.applyGravity();

        setInterval(() => {this.x += 10;
        }, 25);
    }

    animate() {
    setInterval(() => {
        this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
    }, 60);
}

    isAboveGround() {
        return true;
    }
}

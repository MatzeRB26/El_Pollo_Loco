import { MoveableObject } from "./moveable-object.class.js";

export class Bottle extends MoveableObject {

    IMAGES_BOTTLE_GROUND = [
        'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    offset = {
        top: 15,
        bottom: 25,
        left: 25,
        right: 25,
    };

    constructor(x, y) {
        super().loadImage(this.IMAGES_BOTTLE_GROUND[0]);
        this.loadImages(this.IMAGES_BOTTLE_GROUND);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 70;
        this.animate();
        this.getRealFrame();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_GROUND);
        }, 500);
    }
}
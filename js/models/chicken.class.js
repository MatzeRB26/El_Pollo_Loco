import { MoveableObject } from "./moveable-object.class.js";

export class Chicken extends MoveableObject {
    height = 60;
    width = 80;
    y = 360;
    showHitBox = true;
    markedForDeletion = false;

    IMAGES_WALKING = [
        "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];

    IMAGE_DEAD = [
        "assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
    ];

    offset = {
        top: 0,
        bottom: 0,
        left: 5,
        right: 5,
    };

    constructor() {
        super().loadImage(
            "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        );
        this.loadImages(this.IMAGES_WALKING);
        this.x = 400 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
        this.getRealFrame();
        this.dead = false;
    }

    animate() {
        this.moveInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    die() {
        if (this.dead) return;
        this.dead = true;
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
        this.loadImage(this.IMAGE_DEAD[0]);
        setTimeout(() => {
            this.markedForDeletion = true;
        }, 1000);
    }
}

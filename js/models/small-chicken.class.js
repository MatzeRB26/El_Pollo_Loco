import { MoveableObject } from "./moveable-object.class.js";

export class SmallChicken extends MoveableObject {
    height = 50;
    width = 50;
    y = 390;
    markedForDeletion = false;

    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGE_DEAD = [
        'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];

    offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5,
    };

    constructor() { // mini Hünchen erscheinen random im spiel und laufen nach links 
        super();
        this.loadImage('assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 1000 + Math.random() * 800;
        this.y = 400 + Math.random() * 15;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
        this.getRealFrame();
        this.dead = false;
    }

    animate() {
        this.moveInterval = setInterval(() => {
            if (this.world?.gameOver) return;
            this.moveLeft();
        }, 1000 / 60);
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    die() {
        if (this.dead) return;
        this.dead = true;
        this.world.sound.play('chickenDead2');
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
        this.loadImage(this.IMAGE_DEAD[0]);
        setTimeout(() => {
            this.markedForDeletion = true;
        }, 1000);
    }
}

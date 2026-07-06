import { MoveableObject } from "./moveable-object.class.js";

export class Chicken extends MoveableObject {
    
    height = 60;
    width = 80;
    y = 365;
    showHitBox = true;

    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    offset = {
        top: 0,
        bottom: 0,
        left: 5,
        right: 5,
    };

    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 400 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
        this.getRealFrame();
    }

    animate(){
        setInterval(() => {
        this.moveLeft();
        }, 1000 / 60);

    setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
    }, 200);
    }
}

import { MoveableObject } from "./moveable-object.class.js";

export class Endboss extends MoveableObject{

    height = 400;
    width = 250;
    y = 60;
    showHitBox = true;


    IMAGES_WALKING = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    offset = {
        top: 20,
        bottom: 40,
        left: 40,
        right: 40,
    };

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2500;
        this.animate();
        this.getRealFrame();
    }

    animate(){
    setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
    }, 200);
    }
}
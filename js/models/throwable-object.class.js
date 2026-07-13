import { MoveableObject } from "./moveable-object.class.js";

export class ThrowableObject extends MoveableObject {
    width = 80;
    height = 80;
    speedX = 10;
    isSplashing = false;
    markedForDeletion = false;

    IMAGES_BOTTLE_ROTATION = [
        "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    IMAGES_BOTTLE_SPLASH = [
        "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];

    constructor(x, y, otherDirection) {
        super();
        this.loadImage(this.IMAGES_BOTTLE_ROTATION[0]);
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.otherDirection = otherDirection;
        this.throw();
        this.animate();
    }

    throw() {
    this.speedY = 25;
    this.applyGravity();
    this.throwInterval = setInterval(() => {
        if (this.isGameStopped()) return;
        if (this.isSplashing) return;
        if (this.otherDirection) {
            this.x -= this.speedX;
        } else {
            this.x += this.speedX;
        }
    }, 1000 / 25);
}

    animate() {
        this.animationInterval = setInterval(() => {
            if (this.isGameStopped()) return;
            if (this.isSplashing) return;
            this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
            this.checkGroundHit();
        }, 100);
    }

    checkGroundHit() {
        if (!this.isAboveGround() && this.speedY <= 0) {
            this.splash();
        }
    }

    splash() {
        if (this.isSplashing) return;
        this.isSplashing = true;
        this.world.sound.play("bottleBreak");
        clearInterval(this.throwInterval);
        clearInterval(this.animationInterval);
        clearInterval(this.gravityInterval);
        this.playSplash();
    }

    playSplash() {
        let image = 0;
        let interval = setInterval(() => {
            this.img = this.imageCache[this.IMAGES_BOTTLE_SPLASH[image]];
            image++;
            if (image >= this.IMAGES_BOTTLE_SPLASH.length) {
                clearInterval(interval);
                this.markedForDeletion = true;
            }
        }, 60);
    }

    isAboveGround() {
        return this.y < 360;
    }
}

import { MoveableObject } from "./moveable-object.class.js";

/**
 * @class
 * Represents a throwable salsa bottle.
 * Handles movement, rotation, gravity,
 * splash animation, and collisions.
*/
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

/**
 * Creates a new throwable bottle.
 *
 * @param {number} x - The initial x position.
 * @param {number} y - The initial y position.
 * @param {boolean} otherDirection - Indicates whether the bottle is thrown to the left.
*/
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

/**
 * Throws the bottle and applies gravity.
*/
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

/**
 * Starts the bottle animation.
*/
    animate() {
        this.animationInterval = setInterval(() => {
            if (this.isGameStopped()) return;
            if (this.isSplashing) return;
            this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
            this.checkGroundHit();
        }, 100);
    }

/**
 * Checks whether the bottle has hit the ground.
*/
    checkGroundHit() {
        if (!this.isAboveGround() && this.speedY <= 0) {
            this.splash();
        }
    }

/**
 * Starts the bottle splash animation
 * and stops all bottle movement.
*/
    splash() {
        if (this.isSplashing) return;
        this.isSplashing = true;
        this.world.sound.play("bottleBreak");
        clearInterval(this.throwInterval);
        clearInterval(this.animationInterval);
        clearInterval(this.gravityInterval);
        this.playSplash();
    }

/**
 * Plays the bottle splash animation
 * and marks the bottle for deletion.
*/
    playSplash() {
        let image = 0;
        const interval = setInterval(() => {
            this.img = this.imageCache[this.IMAGES_BOTTLE_SPLASH[image]];
            image++;
            if (image >= this.IMAGES_BOTTLE_SPLASH.length) {
                clearInterval(interval);
                this.markedForDeletion = true;
            }
        }, 60);
    }

/**
 * Checks whether the bottle is still above the ground.
 *
 * @returns {boolean} True if the bottle is in the air.
*/
    isAboveGround() {
        return this.y < 360;
    }
}


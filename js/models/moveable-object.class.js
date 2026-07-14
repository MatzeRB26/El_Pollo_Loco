import { DrawableObject } from "./drawable-object.class.js";

/**
 * Base class for all movable game objects.
 * Provides movement, gravity, collisions,
 * animations, and health management.
*/
export class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    showHitBox = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    currentAnimation = "";
    currentImage = 0;

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    };

/**
 * Applies gravity to the object.
*/
    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 30);
    }

/**
 * Checks whether the object is above the ground.
 *
 * @returns {boolean} True if the object is in the air.
*/
    isAboveGround() {
        return this.y < 185;
    }

/**
 * Calculates the object's collision frame
 * using its offsets.
*/
    getRealFrame() {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }

/**
 * Checks whether this object collides with another object.
 *
 * @param {MoveableObject} mo - The object to check against.
 * @returns {boolean} True if both objects collide.
*/
    isColliding(mo) {
        this.getRealFrame();
        mo.getRealFrame();
        return (
            this.rX + this.rW > mo.rX &&
            this.rY + this.rH > mo.rY &&
            this.rX < mo.rX + mo.rW &&
            this.rY < mo.rY + mo.rH
        );
    }

/**
 * Reduces the object's health by the given damage value.
 *
 * @param {number} [damage=20] - The amount of damage to apply.
*/
    hit(damage = 20) {
        if (this.isHurt() || this.isDead()) return;
        this.world.sound.play('damage');
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        }
        this.lastHit = Date.now();
    }

/**
 * Checks whether the object is currently hurt.
 *
 * @returns {boolean} True if the hurt animation is active.
*/
    isHurt() {
        let timepassed = (Date.now() - this.lastHit) / 500;
        return timepassed < 1;
    }

/**
 * Checks whether the object is dead.
 *
 * @returns {boolean} True if the object's health is zero.
*/
    isDead() {
        return this.energy == 0;
    }

/**
 * Plays an animation.
 *
 * @param {string[]} images - The animation frames.
 * @param {boolean} [loop=true] - Whether the animation should loop.
*/
    playAnimation(images, loop = true) {
    if (this.currentAnimation !== images) {
        this.currentAnimation = images;
        this.currentImage = 0;
    }
    let index = this.currentImage;
    if (loop) index = this.currentImage % images.length;
    else if (this.currentImage >= images.length) index = images.length - 1;
    this.img = this.imageCache[images[index]];
    if (loop) this.currentImage++;
    else if (this.currentImage < images.length - 1) this.currentImage++;
    }

/**
 * Moves the object to the right.
*/
    moveRight() {
        this.x += this.speed;
    }

/**
 * Moves the object to the left.
*/
    moveLeft() {
        this.x -= this.speed;
    }

/**
 * Makes the object jump.
*/
    jump() {
        this.speedY = 30;
        this.world.sound.play('jump');
    }

/**
 * Checks whether the game has ended.
 *
 * @returns {boolean} True if the game is over.
*/
    isGameStopped() {
    return this.world?.gameOver;
    }
}

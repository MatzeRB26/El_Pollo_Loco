import { DrawableObject } from "./drawable-object.class.js";

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

    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 185;
    }

    getRealFrame() {
        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
    }

    isColliding(mo) {// Character collidiert mit dem Hünchen
        this.getRealFrame();
        mo.getRealFrame();
        return (
            this.rX + this.rW > mo.rX &&
            this.rY + this.rH > mo.rY &&
            this.rX < mo.rX + mo.rW &&
            this.rY < mo.rY + mo.rH
        );
    }

    hit() {
        if (this.isHurt() || this.isDead()) return;
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        }
        this.lastHit = Date.now();
    }

    isHurt() {
        let timepassed = (Date.now() - this.lastHit) / 500;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images, loop = true) {
        if (this.currentAnimation !== images) {
            this.currentAnimation = images;
            this.currentImage = 0;
        }
        let index = loop
            ? this.currentImage % images.length
            : Math.min(this.currentImage, images.length - 1);
        this.img = this.imageCache[images[index]];
        if (loop || this.currentImage < images.length - 1) {
            this.currentImage++;
        }
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

    isGameStopped() {
    return this.world?.gameOver;
    }
}

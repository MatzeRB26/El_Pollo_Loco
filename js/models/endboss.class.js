import { MoveableObject } from "./moveable-object.class.js";

export class Endboss extends MoveableObject {
    height = 400;
    width = 250;
    y = 60;
    x = 2450;
    speed = 2;
    energy = 100;
    showHitBox = true;
    activated = false;
    alertPlayed = false;
    markedForDeletion = false;
    deadAnimationFinished = false;

    IMAGES_WALKING = [
        "assets/img/4_enemie_boss_chicken/1_walk/G1.png",
        "assets/img/4_enemie_boss_chicken/1_walk/G2.png",
        "assets/img/4_enemie_boss_chicken/1_walk/G3.png",
        "assets/img/4_enemie_boss_chicken/1_walk/G4.png",
    ];

    IMAGES_ALERT = [
        "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
        "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    IMAGES_ATTACK = [
        "assets/img/4_enemie_boss_chicken/3_attack/G13.png",
        "assets/img/4_enemie_boss_chicken/3_attack/G14.png",
        "assets/img/4_enemie_boss_chicken/3_attack/G15.png",
        "assets/img/4_enemie_boss_chicken/3_attack/G16.png",
        "assets/img/4_enemie_boss_chicken/3_attack/G17.png",
        "assets/img/4_enemie_boss_chicken/3_attack/G18.png",
        "assets/img/4_enemie_boss_chicken/3_attack/G19.png",
        "assets/img/4_enemie_boss_chicken/3_attack/G20.png",
    ];

    IMAGES_HURT = [
        "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
        "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
        "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    IMAGES_DEAD = [
        "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
        "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
        "assets/img/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    offset = {
        top: 20,
        bottom: 40,
        left: 40,
        right: 40,
    };

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.activated && !this.isDead()) this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            if (this.isDead()) return this.playDeadAnimation();
            if (this.isHurt()) return this.playAnimation(this.IMAGES_HURT);
            if (!this.activated) return this.playAnimation(this.IMAGES_WALKING);
            if (
                !this.alertPlayed &&
                this.currentImage >= this.IMAGES_ALERT.length
            ) {
                this.alertPlayed = true;
                this.currentImage = 0;
            }
            this.playAnimation(
                this.alertPlayed ? this.IMAGES_WALKING : this.IMAGES_ALERT,
            );
        }, 120);
    }

    activate() {
        this.activated = true;
        this.currentImage = 0;
    }

    hit() {
        if (this.isDead()) return;
        this.energy -= 20;
        this.lastHit = new Date().getTime();
        if (this.energy < 0) {
            this.energy = 0;
        }
    }

    die() {
        this.dead = true;
        setTimeout(() => {
            this.markedForDeletion = true;
        }, 1000);
    }

    playDeadAnimation() {
        if (this.deadAnimationFinished) return;
        if (this.currentAnimation !== this.IMAGES_DEAD) {
            this.currentAnimation = this.IMAGES_DEAD;
            this.currentImage = 0;
        }
        if (this.currentImage < this.IMAGES_DEAD.length) {
            this.img = this.imageCache[this.IMAGES_DEAD[this.currentImage]];
            this.currentImage++;
        } else {
            this.deadAnimationFinished = true;
            this.img =
                this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]];
            setTimeout(() => {
                this.markedForDeletion = true;
            }, 600);
        }
    }
}

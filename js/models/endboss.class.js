import { MoveableObject } from "./moveable-object.class.js";

/**
 * Represents the endboss enemy.
 * Handles movement, animations,
 * damage, and death behavior.
*/
export class Endboss extends MoveableObject {
    height = 400;
    width = 250;
    y = 60;
    x = 2450;
    speed = 2;
    energy = 100;
    activated = false;
    alertPlayed = false;
    markedForDeletion = false;

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
        top: 30,
        bottom: 50,
        left: 50,
        right: 50,
    };

/**
 * Creates a new endboss and loads all animations.
*/
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

/**
 * Starts the endboss movement and animation loops.
*/
    animate() {
    setInterval(() => {
        if (this.world?.gameOver) return;
        if (this.activated && !this.isDead()) this.moveLeft();
    }, 1000 / 60);
    setInterval(() => {
        if (this.isGameStopped()) return;
        if (this.isDead()) return this.playAnimation(this.IMAGES_DEAD, false);
        if (this.isHurt()) return this.playAnimation(this.IMAGES_HURT);
        if (!this.activated) return this.playAnimation(this.IMAGES_WALKING);
        if (!this.alertPlayed && this.currentImage >= this.IMAGES_ALERT.length) {this.alertPlayed = true;
            this.currentImage = 0;
        }
        this.playAnimation(this.alertPlayed ? this.IMAGES_WALKING : this.IMAGES_ALERT);
    }, 120);
    }

/**
 * Activates the endboss when the player
 * reaches the boss area.
*/
    activate() {
        this.activated = true;
        this.currentImage = 0;
    }

/**
 * Reduces the endboss's health.
*/
    hit() {
    if (this.isDead()) return;
    this.energy -= 20;
    this.lastHit = Date.now();
    if (this.energy <= 0) {this.energy = 0;
        this.die();
        }
    }

/**
 * Marks the endboss as dead.
*/
    die() {
        this.dead = true;
    }
}

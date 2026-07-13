import { MoveableObject } from "./moveable-object.class.js";

export class Character extends MoveableObject {
    x = 0;
    y = 180;
    width = 130;
    height = 250;
    speed = 10;


    world;
    dead = false;
    lastAction = Date.now();

    offset = {
        top: 70,
        bottom: 20,
        left: 20,
        right: 20,
    };

    IMAGES_WALKING = [
        "assets/img/2_character_pepe/2_walk/W-21.png",
        "assets/img/2_character_pepe/2_walk/W-22.png",
        "assets/img/2_character_pepe/2_walk/W-23.png",
        "assets/img/2_character_pepe/2_walk/W-24.png",
        "assets/img/2_character_pepe/2_walk/W-25.png",
        "assets/img/2_character_pepe/2_walk/W-26.png",
    ];

    IMAGES_JUMPING = [
        "assets/img/2_character_pepe/3_jump/J-31.png",
        "assets/img/2_character_pepe/3_jump/J-32.png",
        "assets/img/2_character_pepe/3_jump/J-33.png",
        "assets/img/2_character_pepe/3_jump/J-34.png",
        "assets/img/2_character_pepe/3_jump/J-35.png",
        "assets/img/2_character_pepe/3_jump/J-36.png",
        "assets/img/2_character_pepe/3_jump/J-37.png",
        "assets/img/2_character_pepe/3_jump/J-38.png",
        "assets/img/2_character_pepe/3_jump/J-39.png",
    ];

    IMAGES_HURT = [
        "assets/img/2_character_pepe/4_hurt/H-41.png",
        "assets/img/2_character_pepe/4_hurt/H-42.png",
        "assets/img/2_character_pepe/4_hurt/H-43.png",
    ];

    IMAGES_DEAD = [
        "assets/img/2_character_pepe/5_dead/D-51.png",
        "assets/img/2_character_pepe/5_dead/D-52.png",
        "assets/img/2_character_pepe/5_dead/D-53.png",
        "assets/img/2_character_pepe/5_dead/D-54.png",
        "assets/img/2_character_pepe/5_dead/D-55.png",
        "assets/img/2_character_pepe/5_dead/D-56.png",
        "assets/img/2_character_pepe/5_dead/D-57.png",
    ];

    IMAGES_IDLE = [
        "assets/img/2_character_pepe/1_idle/idle/I-1.png",
        "assets/img/2_character_pepe/1_idle/idle/I-2.png",
        "assets/img/2_character_pepe/1_idle/idle/I-3.png",
        "assets/img/2_character_pepe/1_idle/idle/I-4.png",
        "assets/img/2_character_pepe/1_idle/idle/I-5.png",
        "assets/img/2_character_pepe/1_idle/idle/I-6.png",
        "assets/img/2_character_pepe/1_idle/idle/I-7.png",
        "assets/img/2_character_pepe/1_idle/idle/I-8.png",
        "assets/img/2_character_pepe/1_idle/idle/I-9.png",
        "assets/img/2_character_pepe/1_idle/idle/I-10.png",
    ];

    IMAGES_SLEEP = [
        "assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
        "assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        [this.IMAGES_WALKING, this.IMAGES_JUMPING, this.IMAGES_HURT, this.IMAGES_DEAD, this.IMAGES_IDLE, this.IMAGES_SLEEP,]
        .forEach((images) => this.loadImages(images));
        this.applyGravity();
        this.animate();
        this.getRealFrame();
        this.collectedBottles = 0;
        this.collectedCoins = 0;
    }

    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.playCharacterAnimation(), 100);
    }

    moveCharacter() {
    if (this.world?.gameOver) return this.world.sound.stop("run");
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
    } else if (this.world.keyboard.LEFT && this.x > 0) {this.moveLeft();
        this.otherDirection = true;
    }
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {this.updateLastAction();
        if (this.world.sound.sounds.run.paused) this.world.sound.play("run");
    } else this.world.sound.stop("run");
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        this.updateLastAction();
    } this.world.camera_x = -this.x + 100;
    }

    playCharacterAnimation() {
        if (this.isGameStopped()) return;
        if (this.isDead()) return this.handleDeath();
        if (this.isHurt()) return this.playAnimation(this.IMAGES_HURT);
        if (this.isAboveGround()) return this.playAnimation(this.IMAGES_JUMPING);
        if (this.isSleeping()) {
        if (this.world.sound.sounds.snoring.paused) {this.world.sound.play("snoring");
        }
        return this.playAnimation(this.IMAGES_SLEEP);
        }
        this.world.sound.stop("snoring");
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {return this.playAnimation(this.IMAGES_WALKING);}
        this.playAnimation(this.IMAGES_IDLE);
    }

    updateLastAction() {
        this.lastAction = Date.now();
    }

    isSleeping() {
        return Date.now() - this.lastAction >= 10000;
    }

    handleDeath() {
        this.playAnimation(this.IMAGES_DEAD, false);
        if (this.dead) return;
        this.dead = true;
        this.world.stopGame();
        setTimeout(() => {
            document.getElementById("game-over").classList.remove("hidden");
            this.world.gameOver = true;
        }, 500);
        this.world.sound.play('dead');
    }
}

import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { SmallChicken } from "./small-chicken.class.js";
import { Endboss } from "./endboss.class.js";
import { Cloud } from "./cloud.class.js";
import { BackgroundObject } from "./background-object.class.js";
import { createLevel1 } from "../levels/level1.js";
import { StatusBar } from "./statusbar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { Coin } from "./coin.class.js";
import { CoinStatusBar } from "./statusbar-coin.class.js";
import { BottleStatusBar } from "./statusbar-bottle.class.js";
import { EndbossStatusBar } from "./statusbar-endboss.class.js";
import { SoundManager } from "./sound-manager.class.js";

export class World {
    character = new Character();
    level = createLevel1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObjects = [];
    canThrow = true;
    statusBar = new StatusBar();
    coinStatusBar = new CoinStatusBar();
    bottleStatusBar = new BottleStatusBar();
    endbossStatusBar = new EndbossStatusBar();
    collectedCoins = 0;
    maxCoins = 10;
    maxBottles = 10;
    gameWon = false;
    gameOver = false;
    interval = [];

    constructor(canvas, keyboard, level, sound) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.sound = sound;
        this.setWorld();
        this.draw();
        this.run();
    }

    setWorld() {
    this.character.world = this;
    this.level.enemies.forEach(enemy => {
        enemy.world = this;
    });
    }

    run() {
        setInterval(() => {
            if (this.gameOver)return;
            this.activateEndboss();
            this.checkCollisions();
            this.checkCoinCollisions();
            this.checkThrowObjects();
            this.checkBottleCollisions();
            this.checkBottlePickup();
            this.level.enemies = this.level.enemies.filter(
                (enemy) => !enemy.markedForDeletion,
            );
        }, 1000 / 60);
    }

    checkThrowObjects() {
    if (this.keyboard.D && this.canThrow && this.character.collectedBottles > 0) {
    this.throwBottle();
    this.canThrow = false;
        setTimeout(() => {
        this.canThrow = true;
        }, 300);
        }
    }

    throwBottle(){
        let x;
        if(this.character.otherDirection){
            x = this.character.x - 20;
        } else {
            x = this.character.x + 50;
        }
        let bottle = new ThrowableObject(x, this.character.y + 100, this.character.otherDirection);
        bottle.world = this
        this.throwableObjects.push(bottle);
        this.character.collectedBottles--;
        let p = (this.character.collectedBottles / this.maxBottles) * 100;
        this.bottleStatusBar.setPercentage(p);
    }

    activateEndboss() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && !enemy.activated && this.character.x > 2000) {
                enemy.activate();
                this.sound.play('endbossApproach');
            }
        });
    }

    isJumpAttack(enemy) {
    const feet = this.character.rY + this.character.rH;
    const tolerance = enemy instanceof SmallChicken ? 18 : 25;
    return ( this.character.speedY < 0 && feet >= enemy.rY && feet <= enemy.rY + tolerance);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.dead || enemy.markedForDeletion) return;
            if (!this.character.isColliding(enemy)) return;
            if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
                this.handleChicken(enemy);
            } else {
                this.handleEndboss(enemy);
            }
        });
    }

    handleChicken(enemy) {
        if (this.character.isHurt()) return;
        const feet = this.character.rY + this.character.rH;
        if (this.isJumpAttack(enemy)) {enemy.die();
            this.character.jump();
            return;
        }
        if (enemy instanceof SmallChicken){
            this.character.hit(10);
        } else {
            this.character.hit(15);
        }
        this.statusBar.setPercentage(this.character.energy);
    }

    handleEndboss(enemy) {
        this.character.hit(20);
        this.statusBar.setPercentage(this.character.energy);
    }

//     checkBottleCollisions() {
//     this.throwableObjects.forEach(bottle => {this.level.enemies.forEach(enemy => {
//             if (!bottle.isColliding(enemy) || bottle.isSplashing) return;
//             bottle.splash();
//             if (!(enemy instanceof Endboss)) return enemy.die();
//             enemy.hit();
//             this.endbossStatusBar.setPercentage(enemy.energy);
//             if (!enemy.isDead() || this.gameWon) return;
//             this.gameWon = true;
//             this.sound.stopMusic();
//             this.sound.play("win");
//             setTimeout(() => {
//                 this.gameOver = true;
//                 document.getElementById("you-win").classList.remove("hidden");
//             }, 1000);
//         });
//     });
//     this.throwableObjects = this.throwableObjects.filter(bottle => !bottle.markedForDeletion);
// }

checkBottleCollisions() {
    this.throwableObjects.forEach(bottle => {
        this.level.enemies.forEach(enemy => {
            if (!bottle.isColliding(enemy) || bottle.isSplashing) return;
            bottle.splash();
            this.handleBottleHit(enemy);
        });
    });
    this.throwableObjects = this.throwableObjects.filter(
        bottle => !bottle.markedForDeletion
    );
}

handleBottleHit(enemy) {
    if (!(enemy instanceof Endboss)) return enemy.die();
    enemy.hit();
    this.endbossStatusBar.setPercentage(enemy.energy);
    if (!enemy.isDead() || this.gameWon) return;
    this.gameWon = true;
    this.sound.stopMusic();
    this.sound.play("win");
    setTimeout(() => {
        this.gameOver = true;
        document.getElementById("you-win").classList.remove("hidden");
    }, 1000);
}

    checkCoinCollisions() {
        for (let i = this.level.coins.length - 1; i >= 0; i--) {
            if (this.character.isColliding(this.level.coins[i])) {
                this.level.coins.splice(i, 1);
                this.collectedCoins++;
                let percentage = (this.collectedCoins / this.maxCoins) * 100;
                this.coinStatusBar.setPercentage(percentage);
                this.sound.play('coin');
            }
        }
    }

    checkBottlePickup() {
    for (let i = this.level.bottles.length - 1; i >= 0; i--) {
        let bottle = this.level.bottles[i];
        if (this.character.isColliding(bottle)) {
            this.sound.play('bottleCollect');
            this.level.bottles.splice(i, 1);
            this.character.collectedBottles++;
            let p = (this.character.collectedBottles / this.maxBottles) * 100;
            this.bottleStatusBar.setPercentage(p);
        }
        }
    }

    draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.drawBackground();
    this.ctx.translate(-this.camera_x, 0);
    this.drawStatusBars();
    this.ctx.translate(this.camera_x, 0);
    this.drawGameObjects();
    this.ctx.translate(-this.camera_x, 0);
    requestAnimationFrame(() => this.draw());
    }

    drawBackground() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    }

    drawStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.coinStatusBar);
    this.addToMap(this.bottleStatusBar);
    this.addToMap(this.endbossStatusBar);
    }

    drawGameObjects() {
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    }

    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save(); // context wird gespeichert mit den jeweiligen Bildern
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    stopGame(){
    this.gameOver = true;
    this.sound.stop("run");
    this.sound.stop("snoring");
    this.sound.stopMusic();
    }

    addInterval(fn, time) {
    const id = setInterval(fn, time);
    this.interval.push(id);
    }
}

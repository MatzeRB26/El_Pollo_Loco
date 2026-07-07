import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { SmallChicken } from "./small-chicken.class.js";
import { Endboss } from "./endboss.class.js";
import { Cloud } from "./cloud.class.js";
import { BackgroundObject } from "./background-object.class.js";
import { level1 } from "../levels/level1.js";
import { StatusBar } from "./statusbar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { Coin } from "./coin.class.js";
import { CoinStatusBar } from "./statusbar-coin.class.js";
import { BottleStatusBar } from "./statusbar-bottle.class.js";
import { EndbossStatusBar } from "./statusbar-endboss.class.js";

export class World {
    character = new Character();
    level = level1;
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
    collectedBottles = 0;
    maxBottles = 10;
    gameOver = false;

    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.setWorld();
        this.draw();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
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
        if (this.keyboard.D && this.canThrow && this.collectedBottles > 0) {
            this.throwBottle();
            this.canThrow = false;
            setTimeout(() => {
                this.canThrow = true;
            }, 300);
        }
    }

    throwBottle() {
        let x = this.character.otherDirection
            ? this.character.x - 20
            : this.character.x + 50;
        let bottle = new ThrowableObject(
            x,
            this.character.y + 100,
            this.character.otherDirection,
        );
        this.throwableObjects.push(bottle);
        this.collectedBottles--;
        let p = (this.collectedBottles / this.maxBottles) * 100;
        this.bottleStatusBar.setPercentage(p);
    }

    activateEndboss() {
        // Endboss aktivieren sobald man im näher kommt
        this.level.enemies.forEach((enemy) => {
            if (
                enemy instanceof Endboss &&
                !enemy.activated &&
                this.character.x > 2200
            ) {
                enemy.activate();
            }
        });
    }

    isJumpAttack(enemy) {
        let feet = this.character.rY + this.character.rH;
        return this.character.speedY < 0 && feet < enemy.rY + 20;
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
        if (this.character.speedY < 0 && feet < enemy.rY + 25) {
            enemy.die();
            this.character.jump();
            return;
        }
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }

    handleEndboss(enemy) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }

    checkBottleCollisions() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !bottle.isSplashing) {
                    bottle.splash();
                    if (enemy instanceof Endboss) {
                        enemy.hit();
                        this.endbossStatusBar.setPercentage(enemy.energy);
                    } else {
                        enemy.die();
                    }
                }
            });
        });
        this.throwableObjects = this.throwableObjects.filter(
            (bottle) => !bottle.markedForDeletion,
        );
    }

    checkCoinCollisions() {
        for (let i = this.level.coins.length - 1; i >= 0; i--) {
            if (this.character.isColliding(this.level.coins[i])) {
                this.level.coins.splice(i, 1);
                this.collectedCoins++;
                let percentage = (this.collectedCoins / this.maxCoins) * 100;
                this.coinStatusBar.setPercentage(percentage);
            }
        }
    }

    checkBottlePickup() {
        for (let i = this.level.bottles.length - 1; i >= 0; i--) {
            let bottle = this.level.bottles[i];
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(i, 1);
                this.collectedBottles++;
                let percent = (this.collectedBottles / this.maxBottles) * 100;
                this.bottleStatusBar.setPercentage(percent);
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0); // StatusBar geht mit zurück wenn die Camera sich bewegt
        this.addToMap(this.statusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.bottleStatusBar);
        this.addToMap(this.endbossStatusBar);
        this.ctx.translate(this.camera_x, 0); // StatusBar geht mit vorwärts wenn die Camera sich bewegt
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        let self = this; // diese function arbeitet erst dann wenn alles vorgezeichnet ist aus dem DrawImage(draw wird immer wieder aufgerufen)
        requestAnimationFrame(function () {
            self.draw();
        });
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
        if (mo.otherDirection) {
            this.flipImageBack(mo);
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
}

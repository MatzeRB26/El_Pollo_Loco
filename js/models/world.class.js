import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { BackgroundObject } from "./background-object.class.js";
import { level1 } from "../levels/level1.js";
import { StatusBar } from "./status-bar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { Coin } from "./coin.class.js";
import { CoinStatusBar } from "./status-bar-coin.class.js";
import { BottleStatusBar } from "./status-bar-bottle.class.js";

export class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObjects = [];
    statusBar = new StatusBar();
    coinStatusBar = new CoinStatusBar();
    bottleStatusBar = new BottleStatusBar();
    collectedCoins = 0;
    maxCoins = 10;
    collectedBottles = 0;
    maxBottles = 10;

    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.draw();
        this.setWorld();
        this.run();
        this.checkCoinCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCoinCollisions();
            this.checkThrowObjects();
            this.checkBottleCollisions();
            this.checkBottlePickup();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0) {
            let x = this.character.otherDirection
                ? this.character.x - 20
                : this.character.x + 50;
            let bottle = new ThrowableObject(
                x,
                this.character.y + 100,
                this.character.otherDirection,);
            this.throwableObjects.push(bottle);
            this.collectedBottles--;
            let percentage = (this.collectedBottles / this.maxBottles) * 100;
            this.bottleStatusBar.setPercentage(percentage);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCoinCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.collectedCoins++;
                let percentage = (this.collectedCoins / this.maxCoins) * 100;
                this.coinStatusBar.setPercentage(percentage);
            }
        });
    }

    checkBottleCollisions() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !bottle.isSplashing) {
                    bottle.splash();
                    enemy.hit();
                }
            });
        });
        this.throwableObjects = this.throwableObjects.filter(
            (bottle) => !bottle.markedForDeletion,
        );
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

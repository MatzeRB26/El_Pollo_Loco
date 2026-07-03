import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";
import { BackgroundObject } from "./background-object.class.js";
import { level1 } from "../levels/level1.js";
import { StatusBar } from "./status-bar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { Coin } from "./coin.class.js";
import { CoinStatusBar } from "./coin-status-bar.class.js";


export class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinStatusBar = new CoinStatusBar();
    throwableObjects = [];
    collectedCoins = 0;
    maxCoins = 10;

    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.draw();
        this.setWorld();
        this.run();
        this.maxCoins = this.level.coins.length;
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
    setInterval(() => {
        this.checkCollisions();
        this.checkCoinCollisions();
        this.checkThrowObjects();
    }, 200);
}

    checkThrowObjects(){
        if(this.keyboard.D){
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
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
    for (let i = this.level.coins.length - 1; i >= 0; i--) {
        if (this.character.isColliding(this.level.coins[i])) {
            this.level.coins.splice(i, 1);
            this.collectedCoins++;
            let percentage = this.collectedCoins / this.maxCoins * 100;
            this.coinStatusBar.setPercentage(percentage);
        }
    }
}
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0); // StatusBar geht mit zurück wenn die Camera sich bewegt
        this.addToMap(this.statusBar);
        this.addToMap(this.coinStatusBar);
        this.ctx.translate(this.camera_x, 0); // StatusBar geht mit vorwärts wenn die Camera sich bewegt
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
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
